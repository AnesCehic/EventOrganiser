import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {CommonActions} from '@react-navigation/native';

import {MenuItem} from '@components';
import {Constants, Styles} from '@common';
import {UsersService} from '@services/apiClient';

import {client} from '@services/apiClient';

import styles from './styles';

const data = {
  firstName: 'Bruce',
  lastName: 'Dickinson',
  email: 'example@gmail.com',
  avatarImg:
    'https://i.guim.co.uk/img/media/e77ac13b8aceb59e21b20e8d1fd4e618e74f51cb/0_432_2806_1682/master/2806.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=2040fdb94c9c37bc139c8f55c61cc67f',
};

// Add menuScreen from Constants.NavigationScreens when ready
const MenuItems = [
  {
    id: 1,
    menuText: 'Profile',
    menuScreen: Constants.NavigationScreens.ProfileScreen,
  },
  {
    id: 2,
    menuText: 'Change password',
    menuScreen: null,
  },
  {
    id: 3,
    menuText: 'Groups',
    menuScreen: Constants.NavigationScreens.GroupsScreen,
  },
  {
    id: 4,
    menuText: 'Preferences',
    menuScreen: Constants.NavigationScreens.PreferencesScreen,
  },
];

const EditProfile = ({navigation}) => {
  const [userData, setUserData] = useState({});

  const {navigate} = navigation;

  useEffect(() => {
    UsersService.get('620a9de1c8ec5100103aca38')
      .then(({firstName, lastName, email}) => {
        setUserData({
          firstName,
          lastName,
          email,
          avatarImg:
            'https://i.guim.co.uk/img/media/e77ac13b8aceb59e21b20e8d1fd4e618e74f51cb/0_432_2806_1682/master/2806.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=2040fdb94c9c37bc139c8f55c61cc67f',
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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
          {userData.firstName} {userData.lastName}
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
          {userData.email}
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

  const logout = async () => {
    try {
      await client.logout();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Start',
            },
          ],
        }),
      );
    } catch (err) {
      console.log('[Error logout]', err);
    }
  };

  const renderMenu = () => {
    return (
      <View style={styles.menu}>
        {MenuItems.map(menuItem => {
          return (
            <MenuItem
              key={menuItem.id}
              onPress={() =>
                menuItem.menuScreen ? navigate(menuItem.menuScreen) : null
              }
              menuText={menuItem.menuText}
            />
          );
        })}
        <MenuItem onPress={() => logout()} menuText="Log out" />
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
