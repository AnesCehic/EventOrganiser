import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.Colors.white,
  },
  contentContainer: {
    flex: 1,
    marginTop: -73,
  },
  topImage: {
    justifyContent: 'center',
    height: 130,
    width: '100%',
    backgroundColor: Styles.Colors.topBackground,
  },
  settingsIcon: {
    backgroundColor: '#00000075',
    borderRadius: 50,
    padding: 10,
  },

  userWrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  avatar: {
    padding: 6,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  userInfo: {
    width: '100%',
    marginTop: 10,
  },
  userName: {
    fontSize: 32,
    color: Styles.Colors.primaryText,
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
});

export default styles;
