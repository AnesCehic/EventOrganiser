import React, {useState, useRef} from 'react';
import {TouchableHighlight, Text, View, Alert} from 'react-native';

import TextInput from '@components/TextInput';
import {SubmitButton} from '@components';

import {UsersService} from '../../services/apiClient';

import styles from './styles';

const Form = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const register = () => {
    UsersService.create({
      firstName,
      lastName,
      email,
      password,
    }).then(res => console.log('create'));
  };

  return (
    <View style={styles.form}>
      <TextInput
        name="firstName"
        placeholder="First name"
        value={firstName}
        setUsername={setFirstName}
        onChangeValue={value => setFirstName(value)}
      />
      <TextInput
        name="lastName"
        placeholder="Last name"
        value={lastName}
        setUsername={setLastName}
        onChangeValue={value => setLastName(value)}
      />

      <TextInput
        name="email"
        placeholder="Email"
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

      <SubmitButton onPress={register} title="Register" />
    </View>
  );
};

export default Form;
