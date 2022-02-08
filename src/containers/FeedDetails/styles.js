import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    padding: 15,
  },
  image: {
    width: '100%',
  },
  rsvpContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 40,
  },
  rsvpButton: {
    height: '100%',
    width: 107,
    borderRadius: 8,
    backgroundColor: '#007FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rsvpText: {
    fontSize: 18,
  },
  dateContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 10,
  },
});

export default styles;
