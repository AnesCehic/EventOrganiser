import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  topImage: {
    justifyContent: 'center',
    height: 200,
    width: '100%',
    backgroundColor: Styles.Colors.headerBackground,
  },
  headerText: {
    fontSize: 32,
    color: 'white',
    marginLeft: 20,
    fontFamily: Styles.Fonts.headerBold,
  },

  eventsListItemContainer: {
    backgroundColor: Styles.Colors.darkBgLight,
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
    fontFamily: Styles.Fonts.headerBold,
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
