import {StyleSheet, Appearance} from 'react-native';

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
    marginHorizontal: 30,
    maxWidth: 240,
    minWidth: 90,
    minHeight: 35,
    borderRadius: 12,
  },
  userMessageContainer: {
    backgroundColor: Styles.Colors.gold,
    marginRight: 10,
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
    color: colorScheme === 'dark' ? 'white' : Styles.Colors.grayText,
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
  messageDate: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    textAlign: 'center',
    marginVertical: 12,
  },
  senderImage: {
    width: 25,
    height: 25,
    borderRadius: 50,
    position: 'absolute',
    bottom: 0,
  },
});

export default styles;
