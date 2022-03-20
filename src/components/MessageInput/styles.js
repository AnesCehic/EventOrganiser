import {StyleSheet} from 'react-native';

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
    flexGrow: 1,
    paddingTop: 7,
    paddingBottom: 7,
    fontSize: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#E6EBF0',
    borderRadius: 50,
  },
});

export default styles;
