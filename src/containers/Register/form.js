import React, {useState, useRef} from 'react';
import {TouchableHighlight, Text, View, Alert} from 'react-native';

import TextInput from '@components/TextInput';
import {SubmitButton, CustomCheckBox} from '@components';
import {toast} from '@utils';

import {UsersService} from '../../services/apiClient';

import styles from './styles';
import Styles from '../../common/Styles';

const Form = ({navigation, isDarkMode}) => {
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
    })
      .then(res => {
        toast('success', 'Success', 'Successfully registered');
      })
      .catch(err => {
        toast('error', 'Error', err.message);
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
        style={[
          styles.textInput,
          isDarkMode && {backgroundColor: '#273038', borderWidth: 0},
        ]}
      />
      <TextInput
        name="lastName"
        placeholder="Last name"
        value={lastName}
        setUsername={setLastName}
        onChangeValue={value => setLastName(value)}
        style={[
          styles.textInput,
          isDarkMode && {backgroundColor: '#273038', borderWidth: 0},
        ]}
      />

      <TextInput
        name="email"
        placeholder="Email"
        value={email}
        onChangeValue={value => setEmail(value)}
        keyboardType="email-address"
        autoCapitalize="none"
        style={[
          styles.textInput,
          isDarkMode && {backgroundColor: '#273038', borderWidth: 0},
        ]}
      />

      <TextInput
        name="password"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeValue={value => setPassword(value)}
        style={[
          styles.textInput,
          isDarkMode && {backgroundColor: '#273038', borderWidth: 0},
        ]}
      />

      <View style={styles.checkbox}>
        <CustomCheckBox
          boxType="square"
          text="I would like to receive your newsletter and other promotional information."
          animationDuration={0.1}
          isDarkMode={isDarkMode}
          lineWidth={1}
        />
      </View>

      <SubmitButton
        style={{backgroundColor: '#2D2B0D'}}
        onPress={register}
        title="Create account"
        titleStyle={isDarkMode && {color: Styles.Colors.white}}
      />
      <Text style={{width: '80%', paddingTop: 10}}>
        By signing up you agree to our Terms of Use {'\n'}
        and privacy policy.
      </Text>
    </View>
  );
};

export default Form;
