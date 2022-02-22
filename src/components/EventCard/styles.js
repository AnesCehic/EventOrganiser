import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  eventCardContainer: {
    backgroundColor: '#F0F0F0',
    width: 106,
    height: 98,
    borderRadius: 8,
  },
  statusCirle: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 15,
    height: 15,
    borderRadius: 100,
    backgroundColor: '#c4c4c4',
  },
  dateTime: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 4,
    width: '100%',
    height: 20,
  },
  dateTimeText: {
    color: Styles.Colors.lightGrayText,
  },
});

export default styles;
