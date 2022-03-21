import React, {useState, useRef} from 'react';
import {Text, View, ImageBackground, Keyboard} from 'react-native';

import {TextInput, SubmitButton, LoadingIndicator} from '@components';

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
  const [validateError, setValidateError] = useState(null);

  const renderInputFields = () => {
    return (
      <View style={styles.inputFieldsContainer}>
        <View style={styles.fieldWrapper}>
          <Text style={styles.inputFieldLabel}>Current password</Text>
          <TextInput
            style={styles.inputField}
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
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.inputFieldLabel}>New password</Text>
          <TextInput
            style={styles.inputField}
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
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.inputFieldLabel}>Confirm new password</Text>
          <TextInput
            style={styles.inputField}
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
        </View>
        <View style={styles.validateErrorWrapper}>
          {validateError ? (
            <Text style={styles.validateErrorText}>{validateError}</Text>
          ) : null}
        </View>
      </View>
    );
  };

  const handleSubmit = async () => {
    try {
      // if (
      //   currentPassword === '' ||
      //   newPassword === '' ||
      //   confirmNewPassword === ''
      // ) {
      //   setValidateError('Fields should not be blank!');
      //   return;
      // } else if (newPassword !== confirmNewPassword) {
      //   setValidateError('New password and confirm new pasword must be same!');
      //   return;
      // } else {
      //   setValidateError(null);
      // }

      //620a9de1c8ec5100103aca38
      setIsLoading(true);
      const res = await ForgotPasswordService.find('620a9de1c8ec5100103aca38');
      // const res2 = await ForgotPasswordService.update(
      //   '620a9de1c8ec5100103aca38',
      //   {
      //     password: newPassword,
      //   },
      // );
      console.log('res 12', res);

      // toast('success', 'Success', 'Password changed!');
      // navigation.goBack();
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error reset password]', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const resetPassword = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await ForgotPasswordService.create({
  //       email: 'anes.cehic@gmail.com',
  //     });
  //     console.log(res);
  //   } catch (error) {
  //     toast('error', 'Error', error.message);
  //     console.log('[Error forgot password reset]', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
