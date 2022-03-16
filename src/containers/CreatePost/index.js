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

import {launchImageLibrary} from 'react-native-image-picker';

import styles from './styles';

const CreatePost = ({navigation}) => {
  const [loadedImages, setLoadedImages] = useState({
    images: [],
  });
  const [createDisabled, setCreateDisabled] = useState(true);
  const [postData, setPostData] = useState('');

  useEffect(() => {
    // hasAndroidPermission();
    console.log(postData);
  }, [postData]);

  const createPostMethod = async () => {
    console.log(loadedImages, postData);
    return;
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
        includeBase64: true,
      });

      console.log('Assets', res.assets);

      if (!res.assets) {
        throw new Error('Image is not selected');
      }

      let formData = new FormData();

      let image = res.assets[0];

      formData.append('images', [
        {
          name: image.fileName.split('.')[0],
          filename: image.fileName,
          filepath: image.uri,
          filetype: image.type,
        },
      ]);

      console.log(formData);

      const res2 = await fetch('https://api.lincolnclub.app/uploads', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsInR5cGUiOiJhY2Nlc3MifQ.eyJpYXQiOjE2NDc0NTk0MDksImV4cCI6MTY0NzU0NTgwOSwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNjIwYTlkZTFjOGVjNTEwMDEwM2FjYTM4IiwianRpIjoiNDRlYzE5MDktMzUxNi00NDgwLTgyNTgtYTJiMTE4MzU5ZTZjIn0.mIcKzm2x5l33HWWXSjcyi-KYp06UMeTlLWXLllC9z24',
        },
        body: {
          files: formData,
        },
      });
      console.log(res2);
    } catch (error) {
      console.log('[Error loading images]', error);
    }
  };

  const renderImages = () => {
    return loadedImages.images.map(image => {
      return (
        <View>
          <Image
            source={{uri: image.uri}}
            style={{
              width: 88,
              height: 88,
              borderRadius: 8,
              margin: 7,
            }}
          />
          {/* <Image
            source={{uri: require('../../assets/Delete.png')}}
            width={10}
            height={10}
            style={{position: 'absolute', top: 0, right: 0, backgroundColor: 'green'}}
          /> */}
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
