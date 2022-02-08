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
    color: '#007FFF',
    fontSize: 13,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
    color: '#120D26',
  },
  location: {
    fontSize: 12,
    color: '#747688',
  },
});

export default styles;
