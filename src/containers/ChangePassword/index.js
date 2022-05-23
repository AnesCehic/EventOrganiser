/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useContext} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Keyboard,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import {TextInput, SubmitButton, LoadingIndicator} from '@components';
import {Styles} from '@common';
import {UserContext} from '@contexts';

import {UsersService} from '@services/apiClient';
import {toast} from '@utils';

import styles from './styles';

const ChangePassword = ({navigation}) => {
  const {userData} = useContext(UserContext);

  const newPassRef = useRef(null);
  const confirmNewPassRef = useRef(null);
  const colorScheme = useColorScheme();

  const [passwordHidden, setPasswordHidden] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newPassErr, setNewPassErr] = useState(false);

  const renderInputFields = () => {
    return (
      <View style={styles.inputFieldsContainer}>
        <View style={styles.fieldWrapper}>
          <Text style={styles.inputFieldLabel}>New password</Text>
          <TextInput
            style={[
              styles.inputField,
              newPassErr
                ? {
                    borderColor: 'red',
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }
                : {},
              colorScheme === 'dark' && {
                backgroundColor: '#273038',
                borderWidth: 0,
              },
            ]}
            onChangeText={setNewPassword}
            value={newPassword}
            ref={newPassRef}
            placeholder="Type new password here"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              confirmNewPassRef.current.focus();
            }}
            secureTextEntry={passwordHidden}
            autoCapitalize="none"
          />
          {newPassErr ? (
            <View style={styles.errorWrapper}>
              <Icon
                name="ri-close-circle-line"
                size={16}
                color={Styles.Colors.error}
              />
              <Text style={styles.errorText}>Fields must match</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.inputFieldLabel}>Confirm new password</Text>
          <TextInput
            style={[
              styles.inputField,
              newPassErr
                ? {
                    borderColor: 'red',
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }
                : {},
              colorScheme === 'dark' && {
                backgroundColor: '#273038',
                borderWidth: 0,
              },
            ]}
            onChangeText={setConfirmNewPassword}
            value={confirmNewPassword}
            placeholder="Type new password here"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            ref={confirmNewPassRef}
            secureTextEntry={passwordHidden}
            autoCapitalize="none"
          />
          {newPassErr ? (
            <View style={styles.errorWrapper}>
              <Icon
                name="ri-close-circle-line"
                size={16}
                color={Styles.Colors.error}
              />
              <Text style={styles.errorText}>Fields must match</Text>
            </View>
          ) : null}
        </View>
        <AntDesignIcon
          style={styles.passwordHiddenIcon}
          name={passwordHidden ? 'eyeo' : 'eye'}
          size={20}
          onPress={() => {
            setPasswordHidden(!passwordHidden);
          }}
        />
      </View>
    );
  };

  const handleSubmit = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        setNewPassErr(true);
        return;
      }
      setIsLoading(true);
      await UsersService.patch(userData._id, {
        password: newPassword,
      });
      setNewPassErr(false);
      setIsLoading(false);
      toast('success', 'Success', 'Password changed successfully!');
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      toast('error', 'Error', error.message);
      console.log('[Error reset password]', error);
    }
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
      <View style={styles.topImage}>
        <Text style={styles.headerText}>Password</Text>
      </View>
      {renderInputFields()}
      <SubmitButton
        style={[
          styles.submitButton,
          colorScheme === 'dark' && {
            backgroundColor: '#141C24',
          },
        ]}
        titleStyle={colorScheme === 'dark' && {color: Styles.Colors.white}}
        onPress={handleSubmit}
        title="Update password"
        isLoading={isLoading}
      />
    </View>
  );
};

export default ChangePassword;
