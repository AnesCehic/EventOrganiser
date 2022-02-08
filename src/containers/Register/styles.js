import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loginContainer: {
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
    height: '80%',
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
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0275d8',
    width: '80%',
    height: 40,
    borderRadius: 5,
  },
});

export default styles;
