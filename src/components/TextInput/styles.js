import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  textInput: {
    borderColor: Styles.Colors.grayBorder,
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    width: '80%',
    backgroundColor: Styles.Colors.lightGrayBg,
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default styles;
