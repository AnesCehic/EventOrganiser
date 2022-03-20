import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },

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
    alignItems: 'center',
    marginBottom: 3,
    marginTop: 20,
  },
  headerText: {fontWeight: '600'},
});

export default styles;
