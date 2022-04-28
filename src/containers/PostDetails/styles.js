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
    borderBottomWidth: 1
  },
  ownerData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerName: {
    marginLeft: 7,
    fontWeight: '800',
  },
  ownerAndTimeInfo: {
    padding: 16,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});

export default styles;
