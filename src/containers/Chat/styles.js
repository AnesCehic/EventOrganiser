import {StyleSheet, Appearance} from 'react-native';

import {Styles} from '@common';

const colorScheme = Appearance.getColorScheme();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    padding: 18,
    paddingTop: 48,
    width: '100%',
    backgroundColor: Styles.Colors.darkBgGold,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '600',
    fontSize: 28,
    color: Styles.Colors.white,
    fontFamily: Styles.Fonts.headerBold,
  },
  createMessageIcon: {
    padding: 8,
    borderRadius: 100,
    backgroundColor:
      colorScheme === 'light' ? 'rgba(45, 43, 13, 0.7)' : '#b5b5b5',
  },
  messageContainer: {
    width: '100%',
    flexDirection: 'row',
    borderColor: '#B7BFC7',
    padding: 10,
  },
  infoContainer: {
    width: '80%',
    paddingLeft: 10,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
  },
  nameAndTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    backgroundColor:
      colorScheme === 'light' ? 'rgba(0, 0, 0, 0.12)' : '#1C2329',
    width: '100%',
    height: 1,
  },
  eventsHeaderIcon: {
    marginRight: 16,
    color: Styles.Colors.white,
  },
});

export default styles;
