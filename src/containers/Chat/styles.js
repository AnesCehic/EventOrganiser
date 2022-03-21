import {StyleSheet} from 'react-native';

import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    padding: 18,
    paddingTop: 48,
    width: '100%',
    backgroundColor: Styles.Colors.gold,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '600',
    fontSize: 28,
  },
  createMessageIcon: {
    width: 40,
    height: 40,
    padding: 12,
    borderRadius: 100,
    backgroundColor: 'rgb(45, 43, 13)',
  },
  messageContainer: {
    width: '100%',
    flexDirection: 'row',
    borderColor: '#B7BFC7',
    padding: 10,
    borderBottomWidth: 1,
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
});

export default styles;
