import React, {useState, useRef} from 'react';
import {TouchableHighlight, Text, View, Alert} from 'react-native';

import TextInput from '@components/TextInput';
import {SubmitButton, CustomCheckBox} from '@components';

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
    }).then(res => {
      navigation.navigate('VerifyAccount', {
        userId: res._id,
        verificationKey: res.verificationKey,
      });
    });
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
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        name="password"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeValue={value => setPassword(value)}
      />

      <View style={styles.checkbox}>
        <CustomCheckBox
          boxType="square"
          text="I would like to receive your newsletter and other promotional information."
          animationDuration={0.1}
          lineWidth={1}
        />
      </View>

      <SubmitButton
        style={{backgroundColor: '#2D2B0D'}}
        onPress={register}
        title="Create account"
      />
      <Text style={{width: '80%', paddingTop: 10}}>
        By signing up you agree to our Terms of Use {'\n'}
        and privacy policy.
      </Text>
    </View>
  );
};

export default Form;
