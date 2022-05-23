import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Platform,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {Styles} from '@common';

import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import Icon from 'react-native-vector-icons/AntDesign';
import {Photo as PhotoIcon, Galery as GaleryIcon} from '@assets/SvgIcons';

import styles from './styles';

const MessageInput = ({
  onPress,
  isDarkMode,
  onTextChange,
  value,
  images,
  setImages,
}) => {
  const loadCamera = async () => {
    try {
      let per;

      if (Platform.OS === 'android') {
        per = await request(PERMISSIONS.ANDROID.CAMERA);
      }

      if (per !== RESULTS.GRANTED) {
        throw new Error('Permission not granted');
      }

      const res = await launchCamera();

      setImages([...images, ...res.assets]);
    } catch (error) {
      console.log('[Error]', error);
    }
  };

  const loadGallery = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: 'photo',
      });

      setImages([...images, ...res.assets]);
    } catch (error) {
      console.log('[Error]', error);
    }
  };

  const removePicture = index => {
    setImages(images.filter((e, i) => i !== index));
  };

  const renderImages = () => {
    if (images.length === 0) {
      return null;
    }

    return images.map((img, index) => {
      return (
        <View key={index} style={{padding: 5}}>
          <TouchableOpacity
            onPress={() => removePicture(index)}
            style={styles.deleteButton}>
            <Icon name="close" size={16} style={{color: '#fff'}} />
          </TouchableOpacity>
          <Image
            source={{uri: img.uri}}
            style={{
              width: 80,
              height: 80,
              backgroundColor: 'black',
              borderRadius: 8,
            }}
          />
        </View>
      );
    });
  };

  return (
    <View style={isDarkMode && {backgroundColor: '#141C24'}}>
      <View
        style={{flexDirection: 'row', flexShrink: 1, paddingHorizontal: 10}}>
        {renderImages()}
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={loadCamera} style={styles.imageLeft}>
          <PhotoIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={loadGallery} style={styles.imageLeft}>
          <GaleryIcon />
        </TouchableOpacity>
        <View
          style={[
            {
              flexGrow: 1,
              flexShrink: 1,
              backgroundColor: '#F5F6F7',
              borderRadius: 100,
              paddingVertical: 5,
              borderColor: '#E6EBF0',
              borderWidth: 1,
              overflow: 'hidden',
            },
            isDarkMode && {
              backgroundColor: '#0A121A',
              borderWidth: 0,
            },
          ]}>
          <TextInput
            onChangeText={onTextChange}
            multiline={true}
            placeholder="Enter message"
            placeholderTextColor={isDarkMode && Styles.Colors.white}
            value={value}
            style={[
              styles.textInput,
              isDarkMode && {backgroundColor: '#0A121A'},
            ]}
          />
        </View>
        {(value && value !== '' && value.trim() !== '') ||
        images.length !== 0 ? (
          <TouchableOpacity
            style={{paddingLeft: 9}}
            onPress={() => {
              onPress();
            }}>
            <Image source={require('../../assets/SendMessage.png')} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default MessageInput;
