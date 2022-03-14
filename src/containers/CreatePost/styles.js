import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postTextInput: {
    paddingBottom: 68,
    height: '90%',
    padding: 16,
    borderColor: 'black',
    borderWidth: 1,
  },
  userData: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
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
  },
  username: {
    height: '90%',
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default styles;
