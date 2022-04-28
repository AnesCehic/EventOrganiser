import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Styles.Colors.white,
  },
  userImage: {
    padding: 16,
  },
  commentInput: {
    padding: 5,
    margin: 8,
    minHeight: 25,
    backgroundColor: '#E6EBF0',
    borderRadius: 50,
    flexDirection: 'row',
  },
  postSubmitButton: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Styles.Colors.gold,
    borderRadius: 50,
  },
  inputField: {
    flexGrow: 1,
    padding: 0,
    flexShrink: 1,
    paddingLeft: 11,
  },
  headline: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  commentsHeading: {
    fontSize: 14,
    fontWeight: '500',
  },
  commentsCount: {
    fontSize: 14,
    fontWeight: '500',
    width: 24,
    height: 24,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#F2F3F7',
    borderRadius: 50,
    marginLeft: 8,
  },
  commentContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingRight: 8,
  },
  userNameAndDate: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 8,
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 14,
    fontWeight: '500',
  },
  datePosted: {
    fontSize: 12,
    fontWeight: '400',
  },
  commentText: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Styles.Colors.addPhotoBorder,
    backgroundColor: Styles.Colors.white,
    padding: 12,
    ontSize: 12,
    fontWeight: '400',
    ...Styles.Shadows.textBox
  },
  userImageFallback: {
    padding: 6,
    marginTop: 11,
    marginHorizontal: 8,
    borderRadius: 50,
    backgroundColor: Styles.Colors.gold,
  },
});

export default styles;
