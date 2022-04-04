import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  textInput: {
    borderColor: Styles.Colors.grayBorder,
    borderRadius: 6,
    borderWidth: 1,
    height: 50,
    width: '80%',
    backgroundColor: Styles.Colors.white,
    margin: 5,
    padding: 16,
    shadowColor: '#b8b8b8',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
  },
});

export default styles;
