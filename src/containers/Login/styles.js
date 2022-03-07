import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 50,
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
  logInWithGoogle: {
    backgroundColor: 'white',
    elevation: 3,
    borderColor: 'black',
    borderWidth: 1,
  },
  logInWithGoogleText: {
    color: 'black',
  },
});

export default styles;
