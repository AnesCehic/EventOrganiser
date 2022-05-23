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
    backgroundColor: Styles.Colors.headerBackground,
  },
  headerText: {
    fontSize: 26,
    marginTop: 70,
    marginLeft: 30,
    color: 'white',
  },

  formWrapper: {
    padding: 20,
    marginTop: 50,
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
  errorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderColor: Styles.Colors.error,
  },
  errorText: {
    marginLeft: 5,
    fontSize: 12,
    color: Styles.Colors.error,
  },
  submitButton: {
    marginTop: 10,
    width: '100%',
  },
});

export default styles;
