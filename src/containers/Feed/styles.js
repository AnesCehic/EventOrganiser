import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.Colors.lightGrayBg,
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
    backgroundColor: Styles.Colors.topBackground,
  },
  welcomeBack: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: Styles.Fonts.header,
    paddingLeft: 16,
    color: Styles.Colors.white,
  },
  postList: {
    marginTop: -50,
  }
});

export default styles;
