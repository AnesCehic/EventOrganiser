import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  topImage: {
    justifyContent: 'center',
    height: 200,
    width: '100%',
    backgroundColor: Styles.Colors.topBackground,
  },
  headerText: {
    fontSize: 26,
    marginTop: 40,
    color: 'white',
    marginLeft: 20,
  },

  eventsListItemContainer: {
    backgroundColor: Styles.Colors.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Styles.Colors.grayBorder,
    marginTop: 5,
    padding: 10,
  },
  eventsListItemImageWrapper: {
    maxHeight: 150,
  },
  eventsListItemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  eventsListItemTopWrapper: {
    overflow: 'hidden',
    maxHeight: 70,
    marginTop: 15,
  },
  eventListItemTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  eventListItemDateAndTimeWrapper: {
    marginTop: 10,
  },
  eventListItemDateAndTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  eventListDateAndTimeText: {
    color: Styles.Colors.grayText,
    fontSize: 12,
    marginLeft: 5,
  },
});

export default styles;
