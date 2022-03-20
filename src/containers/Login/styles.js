import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: 'white',
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
  registerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    backgroundColor: 'rgba(100, 100, 100, 0.5)',
  },
  logInWithGoogle: {
    backgroundColor: 'white',
    width: '80%',
  },
  logInWithGoogleText: {
    color: 'black',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    paddingRight: 40,
  },
  passwordHiddenIcon: {
    position: 'absolute',
    right: 20,
  },
});

export default styles;
