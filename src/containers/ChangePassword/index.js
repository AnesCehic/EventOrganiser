import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {TextInput, SubmitButton} from '@components';

import styles from './styles';

const ChangePassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = email => {
    console.log(email);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    setIsLoading(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        name="email"
        placeholder="Email"
        value={email}
        onChangeValue={value => setEmail(value)}
      />

      <SubmitButton
        onPress={() => resetPassword(email)}
        title="Reset password"
        isLoading={isLoading}
      />
    </View>
  );
};

export default ChangePassword;
