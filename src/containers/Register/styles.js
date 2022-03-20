import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: Styles.Colors.white,
  },
  loginContainer: {
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
    height: '80%',
    backgroundColor: Styles.Colors.white,
  },
  form: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    paddingTop: 30,
    fontSize: 25,
    textAlign: 'center',
  },
  subHeading: {
    //paddingRight: 40,
    //paddingLeft: 40,
    textAlign: 'center',
  },
  headingSection: {
    alignItems: 'center',
  },
  registerLink: {
    paddingBottom: 10,
  },
  checkbox: {
    width: '80%',
    paddingTop: 6,
    paddingBottom: 6,
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Styles.Colors.primaryBlue,
    width: '80%',
    height: 40,
    borderRadius: 5,
  },
});

export default styles;
