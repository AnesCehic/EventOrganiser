import React, {useState, useLayoutEffect, useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Platform,
  useColorScheme,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {LoadingIndicator, TextInput} from '@components';
import {toast} from '@utils';
import {askForPermissions} from '@utils/permissions';
import {UserContext} from '@contexts';
import UserIcon from '@assets/ImageComponents/UserIcon';
import {Styles} from '@common';

import {UsersService} from '@services/apiClient';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const PersonalDetails = ({navigation, route}) => {
  const {userData, setUserData} = useContext(UserContext);

  const colorScheme = useColorScheme();
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [isLoading, setIsLoading] = useState(false);
  const [upload, setUpload] = useState({});

  const loadCamera = async () => {
    try {
      // await hasPermission();
      const isGranted = await askForPermissions(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
          : PERMISSIONS.IOS.PHOTO_LIBRARY,
      );

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
            <Text
              style={[
                styles.headerSaveButton,
                colorScheme === 'dark' && {color: Styles.Colors.white},
              ]}>
              Save
            </Text>
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
              color={Styles.Colors.white}
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
              color={Styles.Colors.white}
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
          <Text
            style={[
              styles.inputFieldLabel,
              colorScheme === 'dark' && {color: Styles.Colors.white},
            ]}>
            First name
          </Text>
          <TextInput
            style={[
              styles.inputField,
              colorScheme === 'dark' && {
                backgroundColor: '#273038',
                borderWidth: 0,
                color: Styles.Colors.white,
              },
            ]}
            onChangeText={setFirstName}
            value={firstName}
          />
        </View>
        <View style={styles.fieldWrapper}>
          <Text
            style={[
              styles.inputFieldLabel,
              colorScheme === 'dark' && {color: Styles.Colors.white},
            ]}>
            Last name
          </Text>
          <TextInput
            style={[
              styles.inputField,
              colorScheme === 'dark' && {
                backgroundColor: '#273038',
                borderWidth: 0,
                color: Styles.Colors.white,
              },
            ]}
            onChangeText={setLastName}
            value={lastName}
          />
        </View>
        <View style={styles.fieldWrapper}>
          <Text
            style={[
              styles.inputFieldLabel,
              colorScheme === 'dark' && {color: Styles.Colors.white},
            ]}>
            Your email
          </Text>
          <TextInput
            value={userData.email}
            editable={false}
            style={[
              styles.inputField,
              styles.disabledInput,
              colorScheme === 'dark' && {
                backgroundColor: '#141C24',
                borderWidth: 0,
                color: Styles.Colors.white,
              },
            ]}
          />
          <View
            style={[
              styles.disabledInputBottomTextWrapper,
              colorScheme === 'dark' && {
                backgroundColor: '#141C24',
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderBottomWidth: 0,
                borderColor: Styles.Colors.grayBorderDark,
              },
            ]}>
            <Text
              style={[
                styles.disabledInputBottomText,
                colorScheme === 'dark' && {color: Styles.Colors.white},
              ]}>
              To request an email change please{' '}
              <Text
                style={[
                  styles.disabledInputBottomTextLink,
                  colorScheme === 'dark' && {color: Styles.Colors.white},
                ]}
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
    <View
      style={[
        styles.container,
        colorScheme === 'dark' && {backgroundColor: '#0A121A'},
      ]}>
      <View
        style={[
          styles.topImage,
          {
            backgroundColor:
              colorScheme === 'dark'
                ? Styles.Colors.headerBackgroundDark
                : Styles.Colors.headerBackground,
          },
        ]}>
        <Text
          style={[
            styles.headerText,
            colorScheme === 'dark' && {color: Styles.Colors.white},
          ]}>
          Personal details
        </Text>
      </View>
      {renderAvatar()}
      {renderInputFields()}
    </View>
  );
};

export default PersonalDetails;
