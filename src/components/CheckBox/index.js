import React, {useState} from 'react';
import {View} from 'react-native';
import {CheckBox} from 'react-native-elements';

import styles from './styles';

const CustomCheckBox = ({reference, text}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.container}>
      <CheckBox
        title={text}
        center
        checked={isChecked}
        onPress={() => setIsChecked(!isChecked)}
        containerStyle={styles.checkboxContainer}
        wrapperStyle={styles.checkboxWrapper}
        textStyle={styles.checkboxText}
      />
    </View>
  );
};

export default CustomCheckBox;
