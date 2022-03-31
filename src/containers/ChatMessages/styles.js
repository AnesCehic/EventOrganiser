import {StyleSheet} from 'react-native';
import {Appearance} from 'react-native';
const colorScheme = Appearance.getColorScheme();

import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  messageContainer: {
    padding: 8,
    marginTop: 2,
    marginRight: 5,
    width: 100,
    borderRadius: 18,
  },
  userMessageContainer: {
    backgroundColor: colorScheme === 'light' ? Styles.Colors.gold : '#1C2329',
    alignSelf: 'flex-end',
  },
  messageDateTime: {
    textAlign: 'right',
    fontSize: 12,
  },
  userMessageContainerText: {
    color: Styles.Colors.white,
  },
  friendMessageContainer: {
    backgroundColor:
      colorScheme === 'light' ? Styles.Colors.lightGrayBg : '#4C5761',
    alignSelf: 'flex-start',
  },
  friendMessageContainerText: {
    color: Styles.Colors.grayText,
  },

  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderRightColor: 'transparent',
  },

  triangleLeft: {
    borderTopColor: Styles.Colors.lightGrayBg,
  },
  triangleRight: {
    alignSelf: 'flex-end',
    borderTopColor: Styles.Colors.primaryBlue,
    transform: [{rotate: '90deg'}],
  },
});

export default styles;
