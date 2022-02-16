import React, {useState, useRef} from 'react';
import {TouchableHighlight, Text, View} from 'react-native';

import {client} from '../../services/apiClient';

import TextInput from '@components/TextInput';
import CheckBox from '@components/CheckBox';
import {SubmitButton} from '@components';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const Form = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [isChecked, setIsChecked] = useState(false);

  const login = () => {
    client
      .authenticate({
        strategy: 'local',
        email: username,
        password: password,
      })
      .then(res => {
        navigation.navigate('Home');
      })
      .catch(err => {
        console.log(err);
      });
  };

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

      <SubmitButton onPress={login} title="Login" />
    </View>
  );
};

export default Form;
