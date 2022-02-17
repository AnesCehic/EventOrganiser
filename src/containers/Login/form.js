import React, {useState, useRef} from 'react';
import {TouchableHighlight, Text, View} from 'react-native';

import {client} from '../../services/apiClient';

import TextInput from '@components/TextInput';
import {SubmitButton} from '@components';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const Form = ({submitLogin, isLoading}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.form}>
      <TextInput
        name="username"
        placeholder="Username"
        value={username}
        setUsername={setUsername}
        onChangeValue={value => setUsername(value)}
      />
      <TextInput
        name="password"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeValue={value => setPassword(value)}
      />

      <SubmitButton
        onPress={() => submitLogin(username, password)}
        title="Login"
        isLoading={isLoading}
      />
    </View>
  );
};

export default Form;
