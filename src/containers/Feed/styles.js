import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.Colors.lightGrayBg,
  },
  containerDark: {
    backgroundColor: Styles.Colors.darkGrayText,
  },
  headerLogo: {
    position: 'absolute',
    top: 48,
    alignSelf: 'center',
  },
  imageBackground: {
    justifyContent: 'center',
    height: 250,
    width: '100%',
    backgroundColor: Styles.Colors.darkBgGold,
  },
  welcomeBack: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'IBMPlexSerif-Medium',
    paddingLeft: 16,
    color: Styles.Colors.white,
  },
  postList: {
    marginTop: -50,
  },
});

export default styles;
