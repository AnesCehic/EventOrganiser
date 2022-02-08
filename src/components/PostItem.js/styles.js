import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
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
    borderBottomColor: '#E7ECF3',
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
    color: '#A7B0C0',
  },
  headline: {
    fontSize: 20,
  },
  content: {},
});

export default styles;
