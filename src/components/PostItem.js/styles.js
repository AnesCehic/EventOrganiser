import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Styles.Colors.darkBgLight,
    marginHorizontal: 12,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: Styles.Colors.grayBorderPost,
    borderRadius: 8,
    padding: 16,
    maxHeight: 300,
    ...Styles.Shadows.textBox
  },
  imageContainer: {
    borderRadius: 8,
    width: '100%',
    height: 132,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  ownerData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerName: {
    fontSize: 12,
    marginLeft: 7,
    fontWeight: '800',
    color: Styles.Colors.black,
  },
  ownerAndTimeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  ownerImageContainer: {
    borderRadius: 100,
    overflow: 'hidden',
  },
  ownerImage: {
    width: 24,
    height: 24,
  },
  timeFromNow: {
    fontSize: 11,
    color: Styles.Colors.darkGrayText
  },
  timeFromNowContainer: {
    paddingTop: 4
  },
  time: {
    textAlign: 'right',
    color: Styles.Colors.lightGrayText,
  },
  headline: {
    marginVertical: 15,
    fontSize: 22,
    fontWeight: '600',
  },
  content: {
    paddingTop: 12,
  },
});

export default styles;
