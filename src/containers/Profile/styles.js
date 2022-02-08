import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  contentContainerStyle: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Styles.Colors.white,
  },
  avatar: {
    alignItems: 'center',
    marginVertical: 30,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 32,
    color: '#1D232E',
  },
  memberSince: {
    fontSize: 16,
    color: '#919191',
  },
  buttonStyle: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#007FFF',
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonTitle: {
    color: '#007FFF',
    fontSize: 16,
  },
  btnIcon: {
    marginRight: '8%',
  },

  switchContentContainer: {
    alignSelf: 'center',
    marginVertical: 30,
    borderRadius: 100,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F8FAFD',
    maxWidth: 320,
    width: '100%',
    padding: 2,
  },
  switchContent: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: 'transparent',
    paddingVertical: 14,
    justifyContent: 'center',
  },
  switchContentText: {
    textAlign: 'center',
  },
  switchContentActive: {
    shadowColor: '#c1c1c1',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
    backgroundColor: 'white',
  },
});

export default styles;
