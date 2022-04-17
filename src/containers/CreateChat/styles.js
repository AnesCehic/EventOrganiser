import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.Colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    padding: 16,
  },
  searchUser: {
    flexGrow: 1,
    padding: 0,
    paddingHorizontal: 5,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  userItemText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#0A121A',
  },
  userItemImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  itemSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: '#F2F2F2',
  },
  selectedUser: {
    alignItems: 'center',
    padding: 5,
    minWidth: 100,
    backgroundColor: Styles.Colors.white,
    borderWidth: 1,
    borderColor: Styles.Colors.black,
    elevation: 1,
  },
});

export default styles;
