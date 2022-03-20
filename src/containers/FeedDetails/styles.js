import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.Colors.white,
    alignItems: 'center',
    height: '100%',
  },
  scrollViewStyle: {},
  scrollViewContentStyle: {
    padding: 15,
  },
  dateAndLocationWithInfo: {
    width: '100%',
    borderBottomWidth: 1,
    paddingBottom: 20,
    borderBottomColor: Styles.Colors.grayBorder,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    flex: 1,
    aspectRatio: 1,
  },
  rsvpContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: Styles.Colors.grayBorder,
  },
  rsvpButton: {
    height: 48,
    width: 133,
    borderRadius: 8,
    backgroundColor: Styles.Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rsvpText: {
    fontSize: 14,
    color: Styles.Colors.black,
    fontWeight: '600',
  },

  dateContainer: {
    flexDirection: 'row',
    padding: 9,
    paddingLeft: 14,
    paddingRight: 14,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Styles.Colors.grayBorder,
  },
  centeredIconVertically: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTextContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  dateText: {
    marginLeft: 14,
    fontSize: 14,
  },
  dateTextBigger: {
    fontWeight: '600',
    fontSize: 17,
  },
  dateText2: {},
  header: {
    fontSize: 35,
    marginVertical: 10,
  },
  description: {
    padding: 15,
    paddingLeft: 20,
  },

  modalContainer: {
    padding: 16,
    height: '75%',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    alignItems: 'center',
  },
  modalTextAraea: {
    width: '100%',
    height: 100,
    elevation: 2,
  },
  modalTextInput: {
    width: '100%',
  },
  modalConfirmBtn: {
    marginTop: 10,
    width: '100%',
    marginBottom: 18,
    backgroundColor: Styles.Colors.gold,
  },
  modalIcon: {
    margin: 20,
  },
  joinText: {
    fontWeight: '700',
    fontSize: 16,
  },
  rsvpInfo: {
    width: '100%',
    alignItems: 'flex-start',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default styles;
