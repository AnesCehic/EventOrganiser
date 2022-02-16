import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.Colors.white,
    alignItems: 'center',
    height: '100%',
    padding: 15,
  },
  dateAndLocationWithInfo: {
    width: '100%',
  },
  image: {
    width: '100%',
  },
  rsvpContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
    height: 40,
  },
  rsvpButton: {
    height: '100%',
    width: 107,
    borderRadius: 8,
    backgroundColor: Styles.Colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rsvpText: {
    fontSize: 18,
    color: 'white',
  },
  dateContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 10,
  },
  header: {
    padding: 15,
    paddingLeft: 20,
    fontSize: 25,
  },
  description: {
    padding: 15,
    paddingLeft: 20,
  },

  modalContainer: {
    alignItems: 'center',
  },
  modalTextAraea: {
    width: '100%',
    height: 100,
  },
  modalTextInput: {
    width: '100%',
  },
  modalConfirmBtn: {
    marginTop: 10,
    width: '100%',
  },
  modalIcon: {
    margin: 20,
  },
});

export default styles;
