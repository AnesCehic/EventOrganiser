import {StyleSheet} from 'react-native';

import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
  },

  circleContainer: {
    marginVertical: 35,
    alignItems: 'center',
  },
  title: {
    marginVertical: 25,
    fontSize: 20,
  },

  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: Styles.Colors.grayBorder,
    paddingBottom: 15,
  },

  barContainerleftListItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expensesList: {},
  circle: {
    width: 15,
    height: 15,
    borderRadius: 15,
    marginRight: 10,
  },
});

export default styles;
