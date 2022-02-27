import {StyleSheet} from 'react-native';

import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  eventItemContainer: {
    borderBottomColor: Styles.Colors.grayBorder,
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
});

export default styles;
