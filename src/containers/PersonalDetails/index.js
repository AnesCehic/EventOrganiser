import React, {useState, useLayoutEffect, useContext} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';

import {LoadingIndicator, TextInput} from '@components';
import {toast} from '@utils';
import {UserContext} from '@contexts';

import {UsersService} from '@services/apiClient';

import styles from './styles';

const PersonalDetails = ({navigation, route}) => {
  const {userData, setUserData} = useContext(UserContext);

  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [isLoading, setIsLoading] = useState(false);

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
  }, [firstName, lastName]);

  const saveUserData = async () => {
    try {
      setIsLoading(true);
      const userId = userData._id;
      const newUserData = await UsersService.patch(userId, {
        firstName,
        lastName,
      });
      setUserData({
        ...userData,
        firstName: newUserData.firstName,
        lastName: newUserData.lastName,
      });
      toast('success', 'Success', 'User data changed');
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error save user data]', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderAvatar = () => {
    return (
      <View style={styles.avatarContainer}>
        <Avatar
          size={90}
          rounded
          containerStyle={{}}
          source={userData.avatarImg ? {uri: userData.avatarImg} : {}}>
          <Avatar.Accessory
            onPress={() => console.log('edit profile pic')}
            size={20}
            style={styles.avatarIcon}
            name="vertical-align-top"
            color="white"
          />
        </Avatar>
      </View>
    );
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
      <ImageBackground
        style={styles.topImage}
        source={require('../../assets/headerBackground.png')}
        resizeMode="cover">
        <Text style={styles.headerText}>Personal details</Text>
      </ImageBackground>
      {renderAvatar()}
      {renderInputFields()}
    </View>
  );
};

export default PersonalDetails;
