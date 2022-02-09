import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Styles.Colors.white,
    marginHorizontal: 5,
    marginVertical: 2,
    borderRadius: 10,
    padding: 10,
  },
  leftContent: {},
  img: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },

  rightContent: {
    flex: 1,
    marginHorizontal: 15,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Styles.Colors.grayBorder,
    paddingBottom: 10,
  },
  topRightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  time: {
    textAlign: 'right',
    color: Styles.Colors.lightGrayText,
  },
  headline: {
    fontSize: 20,
  },
  content: {},
});

export default styles;
