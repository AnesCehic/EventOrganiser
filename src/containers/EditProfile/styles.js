import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.Colors.white,
    padding: 20,
  },

  avatarContainer: {
    marginVertical: 10,
  },
  avatarIcon: {
    width: 26,
    height: 26,
    borderRadius: 24,
    backgroundColor: Styles.Colors.primaryBlue,
    top: -5,
    right: -2,
  },

  userInfo: {},
  userName: {
    fontSize: 32,
    color: Styles.Colors.primaryText,
    marginVertical: 7,
  },
  userEmail: {
    fontSize: 16,
    color: Styles.Colors.grayText,
  },
  icon: {
    marginLeft: 20,
  },

  menu: {
    marginTop: 30,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomColor: Styles.Colors.grayBorder,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  menuItemText: {
    fontSize: 18,
  },
  arrowIcon: {},
});

export default styles;
