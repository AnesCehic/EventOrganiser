import {StyleSheet} from 'react-native';

import {Styles} from '@common';

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomColor: Styles.Colors.grayBorder,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  menuItemDark: {
    borderColor: Styles.Colors.grayBorderDark,
  },
  menuItemText: {
    fontSize: 18,
  },
});

export default styles;
