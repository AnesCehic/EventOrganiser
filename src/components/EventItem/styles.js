import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Styles.Colors.white,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: Styles.Colors.grayBorder,
  },
  img: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  rightContent: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  rightContentTop: {},
  leftContent: {},
  date: {
    color: Styles.Colors.primaryBlue,
    fontSize: 13,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
    color: Styles.Colors.primaryText,
  },
  location: {
    fontSize: 12,
    color: Styles.Colors.grayText,
  },
});

export default styles;
