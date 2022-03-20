import {StyleSheet} from 'react-native';

import {Styles} from '@common';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 80,
  },
  headerContainer: {
    marginTop: 54,
    marginLeft: 30,
    width: '100%',
    alignItems: 'flex-start',
  },
  headers: {
    color: Styles.Colors.white,
    width: '80%',
    fontSize: 44,
  },
  button: {
    backgroundColor: Styles.Colors.white,
    marginTop: 15,
    width: '100%',
  },
  googleButton: {
    marginTop: 15,
    width: '100%',
    backgroundColor: Styles.Colors.grayButtonBackground,
  },
  textStyle: {
    color: Styles.Colors.black,
    fontSize: 14,
  },
  googleTextStyle: {
    color: Styles.Colors.white,
    fontSize: 14,
  },
});

export default styles;
