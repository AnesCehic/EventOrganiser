import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.Colors.lightGrayBg,
  },
  topImage: {
    justifyContent: 'center',
    height: 200,
    width: '100%',
  },
  headerText: {
    fontSize: 30,
    marginTop: 30,
    marginLeft: 30,
    color: 'white',
  },

  content: {
    paddingHorizontal: 15,
    marginTop: -50,
  },

  user: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Styles.Colors.grayBorder,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  avatarContainer: {
    marginVertical: 10,
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
  userArrowIcon: {
    color: '#000',
  },

  userInfo: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    color: Styles.Colors.primaryText,
    fontWeight: '600',
  },
  userEmail: {
    marginTop: 5,
    fontSize: 14,
    color: Styles.Colors.grayText,
  },
  icon: {
    marginLeft: 20,
  },

  settings: {
    marginVertical: 25,
    paddingLeft: 20,
  },
  settingsText: {
    color: Styles.Colors.grayText,
  },

  menu: {
    // marginTop: 30,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Styles.Colors.grayBorder,
  },
  menuItem: {
    backgroundColor: Styles.Colors.white,
    paddingHorizontal: 15,
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomColor: Styles.Colors.grayBorder,
    justifyContent: 'space-between',
  },
  menuItemText: {
    fontSize: 18,
  },
  arrowIcon: {},

  logoutItem: {
    borderWidth: 1,
    borderColor: Styles.Colors.grayBorder,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default styles;
