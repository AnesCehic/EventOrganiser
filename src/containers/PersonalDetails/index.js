import React, {useState, useLayoutEffect, useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {LoadingIndicator, TextInput} from '@components';
import {toast} from '@utils';
import {UserContext} from '@contexts';
import UserIcon from '@assets/ImageComponents/UserIcon';

import {UsersService} from '@services/apiClient';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const PersonalDetails = ({navigation, route}) => {
  const {userData, setUserData} = useContext(UserContext);

  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [isLoading, setIsLoading] = useState(false);
  const [upload, setUpload] = useState({});

  const loadCamera = async () => {
    try {
      // await hasPermission();
      const token = await AsyncStorageLib.getItem('feathers-jwt');

      let per;

      if (Platform.OS === 'android') {
        per = await check(PERMISSIONS.ANDROID.CAMERA);
      }

      if (!per) {
        throw new Error('You do not have permissions to use camera!');
      }

      const res = await launchImageLibrary();
      setUserData({
        ...userData,
        avatarImg: res.assets[0].uri,
      });

      const formData = new FormData();

      const {fileName, type, uri} = res.assets[0];
      formData.append('profile_1', {
        name: fileName,
        type: type,
        uri: uri,
      });
      const uploadRes = await fetch('https://api.lincolnclub.app/uploads', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        // eslint-disable-next-line no-shadow
      }).then(res => res.json());
      setUpload(uploadRes);
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={saveUserData}>
            <Text style={styles.headerSaveButton}>Save</Text>
          </TouchableOpacity>
        );
      },
    });
  }, [firstName, lastName, upload]);

  const saveUserData = async () => {
    try {
      setIsLoading(true);
      const userId = userData._id;
      const newUserData = await UsersService.patch(userId, {
        firstName,
        lastName,
        uploadId: upload?._id,
      });
      setUserData({
        ...userData,
        firstName: newUserData.firstName,
        lastName: newUserData.lastName,
        avatarImg: newUserData?.upload?.files[0]?.signedURL,
      });
      await AsyncStorageLib.setItem('@user', JSON.stringify(newUserData));
      toast('success', 'Success', 'User data changed');
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error save user data]', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderAvatar = () => {
    if (userData.avatarImg) {
      return (
        <View style={styles.avatarContainer}>
          <Avatar
            size={90}
            rounded
            containerStyle={{}}
            source={{uri: userData.avatarImg}}>
            <Avatar.Accessory
              onPress={() => loadCamera()}
              size={20}
              style={styles.avatarIcon}
              name="vertical-align-top"
              color="white"
            />
          </Avatar>
        </View>
      );
    } else {
      return (
        <View style={styles.avatarContainer}>
          <Avatar
            size={90}
            rounded
            containerStyle={{}}
            renderPlaceholderContent={() => <UserIcon />}>
            <Avatar.Accessory
              onPress={() => loadCamera()}
              size={20}
              style={styles.avatarIcon}
              name="vertical-align-top"
              color="white"
            />
          </Avatar>
        </View>
      );
    }
  };

  const renderInputFields = () => {
    return (
      <View style={styles.inputFieldsContainer}>
        <View style={styles.fieldWrapper}>
          <Text style={styles.inputFieldLabel}>First name</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={setFirstName}
            value={firstName}
          />
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.inputFieldLabel}>Last name</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={setLastName}
            value={lastName}
          />
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.inputFieldLabel}>Your email</Text>
          <TextInput
            value={userData.email}
            editable={false}
            style={[styles.inputField, styles.disabledInput]}
          />
          <View style={styles.disabledInputBottomTextWrapper}>
            <Text style={styles.disabledInputBottomText}>
              To request an email change please{' '}
              <Text
                style={styles.disabledInputBottomTextLink}
                onPress={() => console.log('contact us')}>
                contact us
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topImage}>
        <Text style={styles.headerText}>Personal details</Text>
      </View>
      {renderAvatar()}
      {renderInputFields()}
    </View>
  );
};

export default PersonalDetails;
