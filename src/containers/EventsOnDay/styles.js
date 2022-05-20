import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    // justifyContent: 'center',
  },
  topImage: {
    justifyContent: 'center',
    height: 200,
    width: '100%',
    backgroundColor: Styles.Colors.topBackground,
  },
  headerText: {
    fontSize: 26,
    marginTop: 15,
    color: 'white',
    marginLeft: 20,
  },
  noEvents: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEventsText: {
    fontSize: 22,
  },
});

export default styles;
