import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  topImage: {
    justifyContent: 'center',
    height: 150,
    width: '100%',
  },
  headerText: {
    fontSize: 26,
    marginTop: 70,
    marginLeft: 30,
    color: 'white',
  },

  inputFieldsContainer: {
    padding: 20,
  },
  fieldWrapper: {
    marginTop: 15,
  },
  inputFieldLabel: {
    color: Styles.Colors.grayText,
    marginBottom: 3,
    fontSize: 12,
  },
  inputField: {
    width: '100%',
    margin: 0,
    marginTop: 5,
  },

  validateErrorWrapper: {
    marginTop: 10,
    minHeight: 50,
  },
  validateErrorText: {
    color: Styles.Colors.error,
    fontSize: 14,
  },

  submitButton: {
    alignSelf: 'center',
  },
});

export default styles;
