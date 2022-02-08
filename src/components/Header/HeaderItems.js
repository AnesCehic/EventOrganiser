import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, Icon} from 'react-native-elements';

import styles from './styles';

export const HeaderTitleText = ({title, style}) => {
  return (
    <Text h4 style={[styles.headerTitle, style]}>
      {title}
    </Text>
  );
};

export const HeaderBackButton = ({onPress, icon}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {icon ? icon : <Icon name="arrow-back" size={30} />}
    </TouchableOpacity>
  );
};
