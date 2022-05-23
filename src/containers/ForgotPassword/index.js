/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import Icon from 'react-native-remix-icon';

import {Styles} from '@common';
import {TextInput, SubmitButton, LoadingIndicator} from '@components';
import {toast} from '@utils';
import {ForgotPasswordService} from '@services/apiClient';

import styles from './styles';

const ForgotPassword = ({navigation, isDarkMode}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userEmailErr, setUserEmailErr] = useState(false);

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleSubmit = async () => {
    try {
      if (!userEmail || !validateEmail(userEmail)) {
        setUserEmailErr(true);
        return;
      }
      setIsLoading(true);
      await ForgotPasswordService.create({
        email: userEmail,
      });
      setUserEmailErr(false);
      toast(
        'success',
        'Success',
        'Password will be sent to your email address!',
      );
      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      setUserEmailErr(true);
      setIsLoading(false);
      toast('error', 'Error', error.message);
      console.log('[Error forgot password]', error);
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View
      style={[styles.container, isDarkMode && {backgroundColor: '#141C24'}]}>
      <View style={styles.topImage}>
        <Text
          style={[
            styles.headerText,
            isDarkMode && {color: Styles.Colors.white},
          ]}>
          Reset password
        </Text>
      </View>
      <View
        style={[
          styles.formWrapper,
          isDarkMode && {backgroundColor: '#141C24'},
        ]}>
        <View style={styles.fieldWrapper}>
          <Text
            style={[
              styles.inputFieldLabel,
              isDarkMode && {color: Styles.Colors.white},
            ]}>
            Email
          </Text>
          <TextInput
            style={[
              styles.inputField,
              userEmailErr
                ? {
                    borderColor: Styles.Colors.error,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }
                : {},
              isDarkMode && {backgroundColor: '#273038', borderWidth: 0},
            ]}
            onChangeText={setUserEmail}
            value={userEmail}
            placeholder="Type your email here"
            blurOnSubmit={false}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {userEmailErr ? (
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
        <SubmitButton
          style={styles.submitButton}
          onPress={handleSubmit}
          title="Confirm"
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;
