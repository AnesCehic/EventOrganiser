import React, {useState} from 'react';
import {View} from 'react-native';

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
      <TextInput
        name="username"
        placeholder="Username"
        value={username}
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
        title="Login"
        isLoading={isLoading}
      />
    </View>
  );
};

export default Form;
