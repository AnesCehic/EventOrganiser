import {StyleSheet} from 'react-native';

import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  postTextInput: {
    paddingBottom: 68,
    height: '60%',
    padding: 16,
    textAlignVertical: 'top',
  },
  userData: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    width: '100%',
  },
  floatingUploadImageButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E6EBF0',
    borderRadius: 99,
  },
  uploadPhotoText: {
    fontSize: 12,
    fontWeight: '600',
  },
  username: {
    height: '90%',
  },
  createPostButton: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 6,
    backgroundColor: Styles.Colors.white,
  },
  text: {
    textAlign: 'center',
  },
  createPostButtonDisabled: {
    opacity: 0.4,
  },
});

export default styles;
