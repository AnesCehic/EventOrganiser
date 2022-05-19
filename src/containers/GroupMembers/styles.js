import {StyleSheet} from 'react-native';
import {Styles} from '@common';

const userCardStyle = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 2,
    borderColor: Styles.Colors.lightGrayBg,
    backgroundColor: Styles.Colors.lightGrayBg,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    paddingTop: 14,
    paddingBottom: 14,
    marginBottom: 16,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paddingOverride: {
    padding: 0,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
  email: {
    fontSize: 12,
    fontWeight: '400',
  },
  listHeader: {
    width: '90%',
    textAlign: 'left',
    alignSelf: 'center',
    marginBottom: 12,
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    backgroundColor: Styles.Colors.white,
    borderRadius: 50,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  headerContainer: {
    backgroundColor: Styles.Colors.darkBgGold,
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 20,
    marginBottom: 20,
  },
});

export default userCardStyle;
