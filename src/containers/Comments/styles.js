import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbfbfb',
    flex: 1,
  },
  userImage: {
    padding: 16,
  },
  commentInput: {
    padding: 5,
    margin: 8,
    minHeight: 25,
    borderRadius: 50,
    flexDirection: 'row',
    backgroundColor: Styles.Colors.textInputGrayBg,
  },
  postSubmitButton: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Styles.Colors.gold,
    borderRadius: 50,
  },
  postSubmitButtonText: {
    color: Styles.Colors.white,
    fontWeight: '700',
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
    color: Styles.Colors.darkGrayText,
  },
  commentsCount: {
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    backgroundColor: '#F2F3F6',
    borderRadius: 50,
    marginLeft: 8,
    color: Styles.Colors.darkGrayText,
  },
  commentsCountText: {
    fontSize: 14,
    fontWeight: '500',
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
    ...Styles.Shadows.textBox,
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
