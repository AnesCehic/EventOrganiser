import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  contentContainer: {
    marginTop: 'auto',
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 5,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20,
  },
});

export default styles;
