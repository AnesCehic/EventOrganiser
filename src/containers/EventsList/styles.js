import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.Colors.lightGrayBg,
  },
  topImage: {
    justifyContent: 'center',
    height: 200,
    width: '100%',
  },
  topImageContent: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 30,
    color: Styles.Colors.white,
    fontFamily: Styles.Fonts.headerMedium,
  },
  topMonthTouch: {
    borderRadius: 20,
    backgroundColor: Styles.Colors.darkBgLight2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventsListContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  eventsListItemContainer: {
    backgroundColor: Styles.Colors.darkBgLight,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Styles.Colors.grayBorder,
    marginTop: 5,
    padding: 10,
    ...Styles.Shadows.textBox,
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
    fontSize: 20,
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
  myEventsButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: Styles.Colors.darkBgLight,
    padding: 15,
    borderRadius: 5,
    top: 20,
  },
  myEventsButtonCount: {
    width: 25,
    height: 25,
    borderRadius: 30,
    backgroundColor: '#595631',
    justifyContent: 'center',
    alignItems: 'center',
  },
  myEventsButtonText: {
    color: '#fff',
    fontSize: 12,
  },

  // calendar agenda
  calendarEmptyData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarEmptyDataText: {
    fontSize: 22,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Styles.Colors.lightGrayBg,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  calendarHeaderText: {
    fontWeight: '600',
  },
  calendarHeaderTextMonth: {
    fontSize: 12,
    marginLeft: 5,
  },
  monthSelected: {
    marginLeft: 5,
    fontWeight: '600',
  },
  eventsHeaderIcon: {
    marginRight: 16,
    color: Styles.Colors.white,
  },
  eventsHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sheetContainer: {
    flex: 1,
    marginTop: 50,
    padding: 125,
  },
});

export default styles;
