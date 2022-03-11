import React from 'react';
import {View, Text} from 'react-native';

import Form from './form';

import styles from './styles';

const UpdateUserForm = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Form />
    </View>
  );
};

export default UpdateUserForm;
