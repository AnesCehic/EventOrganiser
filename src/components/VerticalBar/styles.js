import {StyleSheet} from 'react-native';

import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  barContainer: {
    width: 15,
    height: 200,
    backgroundColor: '#e3e3e3',
    borderRadius: 15,
    justifyContent: 'flex-end',
  },

  innerContainer: {
    backgroundColor: 'red',
    borderRadius: 15,
    height: '60%',
  },

  text: {
    fontSize: 12,
  },
});

export default styles;
