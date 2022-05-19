import {StyleSheet} from 'react-native';

import {Styles} from '@common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.Colors.white,
  },
  topImage: {
    height: 200,
    width: '100%',
    backgroundColor: Styles.Colors.darkBgGold,
  },
  headerText: {
    fontSize: 32,
    marginTop: 40,
    color: 'white',
    marginLeft: 20,
    top: 0,
    fontFamily: Styles.Fonts.headerBold,
  },

  switchContentContainer: {
    alignSelf: 'center',
    borderRadius: 100,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Styles.Colors.lightGrayBg,
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
  groupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    backgroundColor: Styles.Colors.darkBgLight,
    borderColor: Styles.Colors.lightGrayBg,
    borderWidth: 1,
    margin: 5,
    elevation: 5,
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '700',
    color: Styles.Colors.grey,
  },
  groupMembers: {
    color: Styles.Colors.grey,
    fontSize: 11,
    paddingTop: 5,
  },
  joinGroupButton: {
    backgroundColor: Styles.Colors.gold,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 13,
    paddingRight: 13,
    paddingLeft: 13,
  },
  joinGroupText: {
    fontSize: 14,
    fontWeight: '600',
  },
  allGroupsText: {
    marginTop: 10,
    paddingLeft: 25,
    paddingBottom: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  myGroupInfo: {
    marginLeft: 20,
    width: 160,
    height: 160,
    margin: 5,
    backgroundColor: Styles.Colors.darkBgLight,
    borderRadius: 12,
    elevation: 5,
  },
  halfContainer: {
    flex: 2,
  },
  myGroupData: {
    alignItems: 'center',
  },
  groupNameLogo: {
    width: 64,
    height: 64,
    margin: -40,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 40,
    fontWeight: '700',
    backgroundColor: Styles.Colors.white,
    borderWidth: 4,
    borderColor: Styles.Colors.gold,
    borderRadius: 12,
  },
  privateOpacity: {
    opacity: 0.3,
  },
  myGroupName: {
    marginTop: 45,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default styles;
