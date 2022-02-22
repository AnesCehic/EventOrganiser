import {StyleSheet} from 'react-native';

import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 18,
  },

  messageContainer: {
    padding: 15,
    borderRadius: 10,
    marginTop: 8,
  },
  userMessageContainer: {
    backgroundColor: Styles.Colors.primaryBlue,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  userMessageContainerText: {
    color: Styles.Colors.white,
  },
  friendMessageContainer: {
    backgroundColor: Styles.Colors.lightGrayBg,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
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
