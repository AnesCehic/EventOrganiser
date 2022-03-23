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
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 30,
    color: 'white',
  },
  eventsListContainer: {
    paddingHorizontal: 10,
    flex: 1,
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
  myEventsButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
  },
  myEventsButtonCount: {
    width: 25,
    height: 25,
    // padding: 5,
    borderRadius: 30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  myEventsButtonText: {
    color: '#fff',
    fontSize: 12,
  },

  // calendar agenda
  eventItem: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  eventItemText: {fontSize: 18},
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
    marginBottom: 3,
    marginTop: 20,
  },
  showAgendaBtn: {
    alignItems: 'flex-end',
  },
});

export default styles;
