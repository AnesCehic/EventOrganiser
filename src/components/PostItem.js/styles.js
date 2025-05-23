import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Styles.Colors.white,
    marginHorizontal: 12,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#E7E7E7',
    elevation: 3,
    borderRadius: 8,
    padding: 12,
    maxHeight: 300,
  },
  imageContainer: {
    borderRadius: 8,
    width: '100%',
    height: 120,
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
    marginTop: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  content: {},
});

export default styles;
