import React from 'react';
import {View, Text} from 'react-native';

import {SearchInput} from '@components';

import styles from './styles';

const Content = ({route, navigation}) => {
  console.log('route', route);
  return (
    <View style={styles.container}>
      <SearchInput />
      <Text>test content</Text>
    </View>
  );
};

export default Content;
