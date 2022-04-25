import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 7,
    paddingBottom: 7,
  },
  sendIcon: {
    borderRadius: 100,
    backgroundColor: '#007FFF',
    width: 34,
    height: 34,
    marginRight: 8,
  },
  imageLeft: {
    paddingRight: 15,
  },
  textInput: {
    flexShrink: 1,
    flexGrow: 1,
    paddingVertical: 0,
    fontSize: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#F5F6F7',
  },
  deleteButton: {
    backgroundColor: Styles.Colors.gold,
    borderRadius: 50,
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#E6EBF0',
    top: -5,
    right: -5,
    padding: 3,
    zIndex: 10,
  },
});

export default styles;
