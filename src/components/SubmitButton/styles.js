import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Styles.Colors.gold,
    width: '80%',
    height: 50,
    borderRadius: 9,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#000',
  },
  logo: {
    marginRight: 5,
  },
});

export default styles;
