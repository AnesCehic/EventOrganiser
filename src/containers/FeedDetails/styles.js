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
  imageContainer: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
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
    color: '#413F21',
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    padding: 9,
    paddingLeft: 14,
    paddingRight: 14,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Styles.Colors.grayBorder,
    backgroundColor: Styles.Colors.white,
    ...Styles.Shadows.textBox,
  },
  centeredIconVertically: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePlaceIcon: {
    color: '#684BA6',
  },
  dateTextContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  dateText: {
    marginLeft: 14,
    fontSize: 14,
    color: '#273038',
  },
  dateTextBigger: {
    fontWeight: '600',
    fontSize: 14,
    color: '#273038',
  },
  dateText2: {},
  header: {
    fontSize: 28,
    lineHeight: 42,
    marginVertical: 10,
    color: Styles.Colors.black,
  },
  description: {
    padding: 15,
    paddingLeft: 20,
  },

  modalContainer: {
    padding: 16,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    alignItems: 'center',
  },
  modalTextAraea: {
    width: '100%',
    height: 100,
    textAlignVertical: 'top',
    ...Styles.Shadows.textBox,
  },
  modalTextInput: {
    width: '100%',
    height: 150,
    ...Styles.Shadows.textBox,
  },
  modalConfirmBtn: {
    marginTop: 10,
    width: '100%',
    marginBottom: 18,
  },
  modalIcon: {
    margin: 20,
  },
  joinText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#413F21',
  },
  rsvpInfo: {
    width: '100%',
    alignItems: 'flex-start',
    paddingBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 99,
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
