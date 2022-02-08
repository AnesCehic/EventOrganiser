import React, {useState} from 'react';
import {Text, View} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

import styles from './styles';

const CustomCheckBox = ({reference}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.checkBoxInput}>
      <CheckBox
        ref={reference}
        forwardedRef
        value={isChecked}
        onValueChange={newValue => setIsChecked(newValue)}
      />
      <Text>Keep me logged in</Text>
    </View>
  );
};

export default CustomCheckBox;
