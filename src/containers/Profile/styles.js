import {StyleSheet, Appearance} from 'react-native';
import {Styles} from '@common';
const colorScheme = Appearance.getColorScheme();
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.Colors.white,
  },
  contentContainer: {
    flex: 1,
    marginTop: -50,
  },
  topImage: {
    justifyContent: 'center',
    height: 100,
    width: '100%',
    backgroundColor: Styles.Colors.haederBackground,
  },
  settingsIcon: {
    backgroundColor: '#00000075',
    borderRadius: 50,
    padding: 10,
  },

  userWrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    borderRadius: 100,
    width: 100,
    height: 100,
    backgroundColor: '#EDF1F5',
    borderWidth: 5,
    borderColor: 'white',
  },
  userInfo: {
    width: '100%',
    marginTop: 10,
  },
  userName: {
    fontSize: 18,
    color: Styles.Colors.primaryText,
    fontFamily: Styles.Fonts.headerMedium,
  },
  memberSince: {
    fontSize: 14,
    color: Styles.Colors.grayText,
    marginBottom: 10,
    marginTop: 5,
  },
  buttonStyle: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Styles.Colors.primaryBlue,
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonTitle: {
    color: Styles.Colors.primaryBlue,
    fontSize: 16,
  },
  btnIcon: {
    marginRight: '8%',
  },

  switchContentContainer: {
    borderBottomWidth: 3,
    borderBottomColor: Styles.Colors.grayBorder,
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    padding: 2,
    marginBottom: 15,
  },
  switchContent: {
    flex: 1,
    paddingVertical: 14,
  },
  switchContentText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  switchContentActive: {},

  imagesContainer: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageItem: {
    flex: 1,
    borderRadius: 8,
  },
  topRightImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: Styles.Colors.darkBgLight,
  },
  topRightImageText: {
    fontWeight: '600',
    fontSize: 12,
    paddingLeft: 10,
  },
});

export default styles;
