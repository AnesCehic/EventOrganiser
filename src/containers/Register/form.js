import React, {useState, useRef} from 'react';
import {TouchableHighlight, Text, View} from 'react-native';

import TextInput from '@components/TextInput';
import {SubmitButton} from '@components';

import styles from './styles';

const Form = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.form}>
      <TextInput
        name="username"
        placeholder="Name"
        value={username}
        setUsername={setUsername}
        onChangeValue={value => setUsername(value)}
      />
      <TextInput
        name="email"
        placeholder="Email"
        secureTextEntry
        value={email}
        onChangeValue={value => setEmail(value)}
      />

      <TextInput
        name="password"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeValue={value => setPassword(value)}
      />

      <SubmitButton
        onPress={() => navigation.navigate('Login')}
        title="Register"
      />
    </View>
  );
};

export default Form;
