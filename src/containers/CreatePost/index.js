import AsyncStorageLib from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  PermissionsAndroid,
} from 'react-native';

import {PostsService} from '@services/apiClient';

import {launchImageLibrary} from 'react-native-image-picker';

import styles from './styles';

const CreatePost = ({navigation}) => {
  const [loadedImages, setLoadedImages] = useState(null);
  const [createDisabled, setCreateDisabled] = useState(true);
  const [postData, setPostData] = useState('');

  useEffect(() => {
    // hasAndroidPermission();
    console.log(postData);
  }, [postData]);

  const createPostMethod = async () => {
    console.log(loadedImages, postData);
    try {
      const res = await PostsService.create({
        title: 'Test',
        body: postData,
        uploadId: loadedImages._id,
      });
      console.log(res);
    } catch (error) {
      console.log('[Error creating post]', error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: 'New post',
      headerStyle: {
        backgroundColor: '#BFBB85',
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
  }, []);

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

      console.log('Assets', res.assets);

      if (!res.assets) {
        throw new Error('Image is not selected');
      }

      const token = await AsyncStorageLib.getItem('feathers-jwt');

      const formData = new FormData();
      const {assets} = res;
      for (let i = 0; i < assets.length; i++) {
        const image = assets[i];
        formData.append(`file_${i}`, {
          name: image.fileName,
          type: image.type,
          uri: image.uri,
        });
      }
      const upload = await fetch('https://api.lincolnclub.app/uploads', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }).then(res => res.json());
      setLoadedImages(upload);
      // you should be able to send Post { uploadId: loadedImages._id } to associate the images to the post
    } catch (error) {
      console.log('[Error loading images]', error);
    }
  };

  const renderImages = () => {
    loadedImages &&
      loadedImages.files.map(image => {
        return (
          <View>
            <Image
              source={{uri: image.signedURL}}
              style={{
                width: 88,
                height: 88,
                borderRadius: 8,
                margin: 7,
              }}
            />
          </View>
        );
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userData}>
        <Text style="username">Anes Cehic</Text>
      </View>
      <TextInput
        style={styles.postTextInput}
        placeholder="Post text"
        onChangeText={text => setPostData(text)}
        value={postData}
        multiline
      />

      <View style={{flexDirection: 'row'}}>{renderImages()}</View>

      <TouchableOpacity
        onPress={loadImages}
        style={styles.floatingUploadImageButton}>
        <Text style={styles.uploadPhotoText}>Add a photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePost;
