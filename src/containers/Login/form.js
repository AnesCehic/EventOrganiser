import React, {useState, useRef} from 'react';
import {TouchableHighlight, Text, View} from 'react-native';

import TextInput from '@components/TextInput';
import CheckBox from '@components/CheckBox';
import {SubmitButton} from '@components';

import styles from './styles';

const Form = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [isChecked, setIsChecked] = useState(false);

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
        onPress={() => {
          navigation.navigate('Home');
        }}
        title="Login"
      />
    </View>
  );
};

export default Form;
