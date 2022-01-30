import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
  },
  img: {
    width: 90,
    height: 100,
    borderRadius: 10,
  },
  rightContent: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  leftContent: {},
  date: {
    color: 'blue',
    fontSize: 14,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
  },
  location: {
    fontSize: 14,
    color: '#A9A9A9',
  },
});

export default styles;
