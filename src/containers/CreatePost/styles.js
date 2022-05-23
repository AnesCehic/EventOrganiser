import {StyleSheet} from 'react-native';

import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.Colors.darkBgLight,
  },
  postTextInput: {
    paddingBottom: 20,
    height: '60%',
    padding: 16,
    textAlignVertical: 'top',
    backgroundColor: Styles.Colors.darkBgLight,
  },
  userData: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    width: '100%',
    backgroundColor: Styles.Colors.darkBgLight,
  },
  floatingUploadImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Styles.Colors.white,
    position: 'absolute',
    bottom: 16,
    left: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: Styles.Colors.addPhotoBorder,
    borderRadius: 99,
  },
  uploadPhotoText: {
    fontSize: 12,
    fontWeight: '600',
  },
  imageMargin: {
    marginRight: 5,
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
    backgroundColor: Styles.Colors.createPostButton,
  },
  text: {
    textAlign: 'center',
  },
  createPostButtonDisabled: {
    opacity: 0.4,
  },
  loadedImage: {
    width: 88,
    height: 88,
    borderRadius: 8,
    margin: 7,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Styles.Colors.gold,
    borderRadius: 100,
    padding: 5,
    borderWidth: 3,
    borderColor: Styles.Colors.white,
  },
});

export default styles;
