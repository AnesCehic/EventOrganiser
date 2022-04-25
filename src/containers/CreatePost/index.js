import AsyncStorageLib from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useLayoutEffect, useContext} from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  PermissionsAndroid,
} from 'react-native';

import {PostsService} from '@services/apiClient';
import {UserContext} from '@contexts';
import {Styles} from '@common';
import {toast} from '@utils';

import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFa from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const CreatePost = ({navigation}) => {
  const {userData} = useContext(UserContext);
  const [loadedImages, setLoadedImages] = useState([]);
  const [postData, setPostData] = useState('');

  useEffect(() => {
    // hasAndroidPermission();
  }, [postData]);

  const createPostMethod = async () => {
    try {
      const token = await AsyncStorageLib.getItem('feathers-jwt');

      const formData = new FormData();
      for (let i = 0; i < loadedImages.length; i++) {
        const image = loadedImages[i];
        formData.append(`file_${i}`, {
          name: image.fileName,
          type: image.type,
          uri: image.uri,
        });
      }

      let upload;

      if (loadImages.length !== 0) {
        upload = await fetch('https://api.lincolnclub.app/uploads', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }).then(res => res.json());
      }

      const res = await PostsService.create({
        title: 'Test',
        body: postData,
        uploadId: upload?._id,
      });

      toast('success', 'Success', 'Post created!');
      navigation.goBack();
    } catch (error) {
      console.log('[Error creating post]', error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: 'New post',
      headerStyle: {
        backgroundColor: Styles.Colors.topBackground,
      },
      headerRight: () => {
        return (
          <TouchableHighlight
            style={[
              styles.createPostButton,
              // postData === '' ? styles.createPostButtonDisabled : null,
            ]}
            onPress={() => createPostMethod()}>
            <Text>Post</Text>
          </TouchableHighlight>
        );
      },
    });
  }, [loadedImages, postData]);

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const loadImages = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: 'photo',
      });

      if (!res.assets) {
        throw new Error('Image is not selected');
      }

      setLoadedImages([...loadedImages, ...res.assets]);
      // you should be able to send Post { uploadId: loadedImages._id } to associate the images to the post
    } catch (error) {
      console.log('[Error loading images]', error);
    }
  };

  const renderImages = () => {
    return (
      <ScrollView horizontal style={{flexDirection: 'row'}}>
        {loadedImages &&
          loadedImages.map((image, index) => {
            return (
              <View style={{paddingTop: 10}} key={index}>
                <Image source={{uri: image.uri}} style={styles.loadedImage} />
                <TouchableOpacity
                  onPress={() => removeImage(index)}
                  style={styles.deleteButton}>
                  <Icon name="close" size={16} />
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>
    );
  };

  const removeImage = index => {
    const newImagesArray = loadedImages.filter((e, i) => i !== index);
    setLoadedImages(newImagesArray);
  };

  return (
    <View style={styles.container}>
      <View style={styles.userData}>
        <Text style="username">{`${userData.firstName} ${userData.lastName}`}</Text>
      </View>
      <TextInput
        style={styles.postTextInput}
        placeholder="Write something to share"
        onChangeText={text => setPostData(text)}
        value={postData}
        multiline
      />

      {renderImages()}

      <TouchableOpacity
        onPress={loadImages}
        style={styles.floatingUploadImageButton}>
        <IconFa name="image" size={16} style={styles.imageMargin} />
        <Text style={styles.uploadPhotoText}>Add a photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePost;
