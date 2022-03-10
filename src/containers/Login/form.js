import React, {useState, useRef} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {client} from '../../services/apiClient';

import TextInput from '@components/TextInput';
import {SubmitButton} from '@components';

import Icon from 'react-native-vector-icons/AntDesign';

import styles from './styles';

const Form = ({submitLogin, isLoading}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordHidden, setPasswordHidden] = useState(true);

  return (
    <View style={styles.form}>
      <Text style={stylesHelper.header}>Sign in to your {'\n'}account</Text>
      <TextInput
        name="username"
        placeholder="Username"
        value={username}
        style={stylesHelper.shadow}
        setUsername={setUsername}
        onChangeValue={value => setUsername(value)}
      />
      <View style={styles.passwordWrapper}>
        <TextInput
          style={styles.passwordInput}
          name="password"
          placeholder="Password"
          secureTextEntry={passwordHidden}
          value={password}
          onChangeValue={value => setPassword(value)}
        />
        <Icon
          style={styles.passwordHiddenIcon}
          name={passwordHidden ? 'eyeo' : 'eye'}
          size={20}
          onPress={() => {
            setPasswordHidden(!passwordHidden);
          }}
        />
      </View>

      <SubmitButton
        onPress={() => submitLogin(username, password)}
        title="Sign in"
        style={[stylesHelper.shadow, {marginTop: 16}]}
        isLoading={isLoading}
      />

      <TouchableOpacity onPress={() => null} style={stylesHelper.forgotPassword}>
        <Text>Forgot your password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const stylesHelper = StyleSheet.create({
  shadow: {
    elevation: 5,
  },
  forgotPassword: {
    width: '80%',
    paddingTop: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  header: {
    width: '80%',
    paddingBottom: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontSize: 30,
  }
});

export default Form;
