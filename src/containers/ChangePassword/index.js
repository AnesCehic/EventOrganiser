import React, {useState, useRef} from 'react';
import {Text, View, ImageBackground, Keyboard} from 'react-native';
import Icon from 'react-native-remix-icon';

import {TextInput, SubmitButton, LoadingIndicator} from '@components';
import {Styles} from '@common';

import {ForgotPasswordService} from '@services/apiClient';
import {toast} from '@utils';

import styles from './styles';

const ChangePassword = ({navigation}) => {
  const newPassRef = useRef(null);
  const confirmNewPassRef = useRef(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassErr, setCurrentPassErr] = useState(false);
  const [newPassErr, setNewPassErr] = useState(false);

  const renderInputFields = () => {
    return (
      <View style={styles.inputFieldsContainer}>
        <View style={styles.fieldWrapper}>
          <Text style={styles.inputFieldLabel}>Current password</Text>
          <TextInput
            style={[
              styles.inputField,
              currentPassErr
                ? {
                    borderColor: 'red',
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }
                : {},
            ]}
            onChangeText={setCurrentPassword}
            value={currentPassword}
            placeholder="Type your current password"
            onSubmitEditing={() => {
              newPassRef.current.focus();
            }}
            blurOnSubmit={false}
            // secureTextEntry={true}
            autoCapitalize="none"
          />
          {currentPassErr ? (
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
      if (!currentPassword) {
        setCurrentPassErr(true);
        console.log('returned,1');
      } else {
        setCurrentPassErr(false);
      }
      if (
        !newPassword ||
        !confirmNewPassword ||
        newPassword.length < 5 ||
        confirmNewPassword.length < 5 ||
        newPassword !== confirmNewPassword
      ) {
        setNewPassErr(true);
      } else {
        setNewPassErr(false);
      }
      if (currentPassErr || newPassErr) {
        return;
      }

      setIsLoading(true);

      // const res = await ForgotPasswordService.update(
      //   '620a9de1c8ec5100103aca38',
      //   {
      //     password: newPassword,
      //   },
      // );
      // const res = ForgotPasswordService.create({
      //   password: newPassword
      // })

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
