import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';

import {Constants, Styles} from '@common';

import styles from './styles';

const data = {
  firstName: 'Bruce',
  lastName: 'Dickinson',
  email: 'example@gmail.com',
  avatarImg:
    'https://i.guim.co.uk/img/media/e77ac13b8aceb59e21b20e8d1fd4e618e74f51cb/0_432_2806_1682/master/2806.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=2040fdb94c9c37bc139c8f55c61cc67f',
};

const EditProfile = ({navigation}) => {
  const renderAvatar = () => {
    return (
      <View style={styles.avatarContainer}>
        <Avatar
          size={Styles.Sizes.avatar}
          rounded
          containerStyle={{}}
          source={data.avatarImg ? {uri: data.avatarImg} : {}}>
          <Avatar.Accessory
            onPress={() => console.log('edit profile pic')}
            size={20}
            style={styles.avatarIcon}
            name="vertical-align-top"
          />
        </Avatar>
      </View>
    );
  };

  const renderUserInfo = () => {
    return (
      <View style={styles.userInfo}>
        <Text style={styles.userName}>
          {data.firstName} {data.lastName}
          <Icon
            onPress={() => console.log('edit username')}
            name="mode-edit"
            size={24}
            color={Styles.Colors.primaryText}
            // eslint-disable-next-line react-native/no-inline-styles
            style={[styles.icon, {bottom: 1}]}
          />
        </Text>
        <Text style={styles.userEmail}>
          {data.email}
          <Icon
            onPress={() => console.log('edit email')}
            name="mode-edit"
            size={18}
            color={Styles.Colors.grayText}
            // eslint-disable-next-line react-native/no-inline-styles
            style={[styles.icon, {top: 2}]}
          />
        </Text>
      </View>
    );
  };

  const navigateTo = screen => {
    const {navigate} = navigation;
    navigate(screen);
  };

  const renderMenu = () => {
    return (
      <View style={styles.menu}>
        <TouchableOpacity
          onPress={() => navigateTo(Constants.NavigationScreens.ProfileScreen)}
          style={styles.menuItem}>
          <Text style={styles.menuItemText}>Profile</Text>
          <Icon
            name="keyboard-arrow-right"
            size={24}
            color={Styles.Colors.grayText}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Change password</Text>
          <Icon
            onPress={() => console.log('')}
            name="keyboard-arrow-right"
            size={24}
            color={Styles.Colors.grayText}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Groups</Text>
          <Icon
            onPress={() => console.log('')}
            name="keyboard-arrow-right"
            size={24}
            color={Styles.Colors.grayText}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Preferences</Text>
          <Icon
            onPress={() => console.log('')}
            name="keyboard-arrow-right"
            size={24}
            color={Styles.Colors.grayText}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Log out</Text>
          <Icon
            onPress={() => console.log('')}
            name="keyboard-arrow-right"
            size={24}
            color={Styles.Colors.grayText}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderAvatar()}
      {renderUserInfo()}
      {renderMenu()}
    </View>
  );
};

export default EditProfile;
