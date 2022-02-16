import {StyleSheet} from 'react-native';

import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.Colors.white,
    padding: 35,
  },

  switches: {},
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchText: {
    fontSize: 16,
  },

  button: {
    backgroundColor: Styles.Colors.error,
    alignSelf: 'center',
  },
  btnTitle: {
    color: Styles.Colors.white,
    fontSize: 16,
  },
});

export default styles;
