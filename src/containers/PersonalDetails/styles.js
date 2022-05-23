import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerSaveButton: {
    color: 'white',
    fontSize: 18,
  },
  topImage: {
    justifyContent: 'center',
    height: 130,
    width: '100%',
    backgroundColor: Styles.Colors.headerBackground,
  },
  headerText: {
    fontSize: 26,
    marginTop: 80,
    marginLeft: 20,
    color: 'white',
    fontFamily: Styles.Fonts.headerBold,
  },

  avatarContainer: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  avatarIcon: {
    borderWidth: 1,
    borderColor: 'white',
    width: 28,
    height: 28,
    borderRadius: 28,
    backgroundColor: Styles.Colors.gold,
    top: -5,
    right: -5,
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
  disabledInputBottomTextWrapper: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderColor: Styles.Colors.grayBorder,
  },
  disabledInputBottomText: {
    fontSize: 12,
  },
  disabledInputBottomTextLink: {
    color: Styles.Colors.primaryBlue,
    textDecorationLine: 'underline',
  },
  disabledInput: {
    backgroundColor: Styles.Colors.lightGrayBg,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});
export default styles;
