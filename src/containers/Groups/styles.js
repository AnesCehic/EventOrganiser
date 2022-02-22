import {StyleSheet} from 'react-native';

import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.Colors.white,
    padding: 20,
  },

  switchContentContainer: {
    alignSelf: 'center',
    borderRadius: 100,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Styles.Colors.lightGrayBg,
    maxWidth: 320,
    width: '100%',
    padding: 2,
  },
  switchContent: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: 'transparent',
    paddingVertical: 14,
    justifyContent: 'center',
  },
  switchContentText: {
    textAlign: 'center',
  },
  switchContentActive: {
    shadowColor: '#c1c1c1',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
    backgroundColor: 'white',
  },

  menu: {
    marginTop: 30,
  },
});

export default styles;
