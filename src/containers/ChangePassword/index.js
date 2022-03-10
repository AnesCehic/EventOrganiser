import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {TextInput, SubmitButton} from '@components';

import {ForgotPasswordService} from '@services/apiClient';
import {toast} from '@utils';

import styles from './styles';

const ChangePassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async () => {
    try {
      setIsLoading(true);
      const res = await ForgotPasswordService.create({
        email: 'anes.cehic@gmail.com',
      });
      console.log(res);
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error forgot password reset]', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SubmitButton
        onPress={resetPassword}
        title="Send email link for reset password"
        isLoading={isLoading}
      />
    </View>
  );
};

export default ChangePassword;
