/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useContext} from 'react';
import {Text, View, ImageBackground, Keyboard} from 'react-native';
import Icon from 'react-native-remix-icon';

import {TextInput, SubmitButton, LoadingIndicator} from '@components';
import {Styles} from '@common';
import {UserContext} from '@contexts';

import {ForgotPasswordService} from '@services/apiClient';
import {toast} from '@utils';

import styles from './styles';

const ChangePassword = ({navigation}) => {
  const {userData} = useContext(UserContext);

  const newPassRef = useRef(null);
  const confirmNewPassRef = useRef(null);

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
            ]}
            onChangeText={setNewPassword}
            value={newPassword}
            ref={newPassRef}
            placeholder="Type new password here"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              confirmNewPassRef.current.focus();
            }}
            // secureTextEntry={true}
            autoCapitalize="none"
          />
          {newPassErr ? (
            <View style={styles.errorWrapper}>
              <Icon
                name="ri-close-circle-line"
                size={16}
                color={Styles.Colors.error}
              />
              <Text style={styles.errorText}>Error</Text>
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
            ]}
            onChangeText={setConfirmNewPassword}
            value={confirmNewPassword}
            placeholder="Type new password here"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            ref={confirmNewPassRef}
            // secureTextEntry={true}
            autoCapitalize="none"
          />
          {newPassErr ? (
            <View style={styles.errorWrapper}>
              <Icon
                name="ri-close-circle-line"
                size={16}
                color={Styles.Colors.error}
              />
              <Text style={styles.errorText}>Error</Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      // const res = await ForgotPasswordService.update(
      //   '620a9de1c8ec5100103aca38',
      //   {
      //     password: newPassword,
      //   },
      // );
      // const res = await ForgotPasswordService.create({
      //   password: newPassword,
      // });

      // setCurrentPassErr(false);
      // setNewPassErr(false);
      // toast('success', 'Success', 'Password changed!');
      // navigation.goBack();
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error reset password]', error);
    } finally {
      setIsLoading(false);
    }
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
        <Text style={styles.headerText}>Password</Text>
      </ImageBackground>
      {renderInputFields()}
      <SubmitButton
        style={styles.submitButton}
        onPress={handleSubmit}
        title="Update password"
        isLoading={isLoading}
      />
    </View>
  );
};

export default ChangePassword;
