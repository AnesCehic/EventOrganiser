import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.Colors.white,
  },
  postBody: {
    padding: 16,
    borderColor: '#e7e7e7',
    borderBottomWidth: 1,
    color: '#273038',
    fontSize: 14,
    fontWeight: '400',
  },
  ownerData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerName: {
    color: Styles.Colors.black,
    marginLeft: 7,
    fontSize: 14,
    fontWeight: '500',
  },
  ownerAndTimeInfo: {
    padding: 16,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postedDate: {
    color: '#879099',
    fontSize: 12,
    fontWeight: '400'
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  dots: {
    width: 8,
    height: 8,
    margin: 4,
    marginBottom: 8,
    borderRadius: 100,
    backgroundColor: Styles.Colors.white,
  },
  inactiveStyle: {
    opacity: 0.6,
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 50,
  },
});

export default styles;
