import React, {useState, useRef} from 'react';
import {TouchableHighlight, Text, View} from 'react-native';

import TextInput from '@components/TextInput';
import CheckBox from '@components/CheckBox';

import styles from './styles';

const Form = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [isChecked, setIsChecked] = useState(false);
  const checkBox = useRef(null);

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

      <TouchableHighlight
        onPress={() => {
          console.log('Check', checkBox);
          navigation.navigate('Feed');
        }}
        activeOpacity={0.6}
        underlayColor="rgb(100, 100, 255)"
        style={styles.loginButton}>
        <Text>LOGIN</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Form;
