import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Styles.Colors.primaryBlue,
    width: '80%',
    height: 50,
    borderRadius: 9,
  },
  text: {
    color: 'white',
  },
});

export default styles;
