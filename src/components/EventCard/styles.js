import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  eventCardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    elevation: 3,
    borderColor: '#E6EBF0',
    padding: 12,
    margin: 4,
    minHeight: 100,
  },
  timeContainer: {
    width: 122,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E6EBF0',
    marginLeft: 12,
  },
  time: {
    color: '#684BA6',
    fontWeight: '700',
    fontSize: 13,
  },
  dateTime: {
    flexDirection: 'row',
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 53,
    height: 53,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E6EBF0',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  dateTimeText: {
    color: Styles.Colors.lightGrayText,
  },
});

export default styles;
