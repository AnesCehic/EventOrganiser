import React, {useEffect, useState, useContext} from 'react';
import {View, Text, Alert} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';

import {MenuItem, LoadingIndicator} from '@components';
import {Constants, Styles} from '@common';
import {UsersService} from '@services/apiClient';
import {UserContext} from '@contexts';
import {toast} from '@utils';

import {client, ChangeEmail} from '@services/apiClient';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

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
    menuScreen: Constants.NavigationScreens.UpdateUserFormScreen,
  },
  {
    id: 6,
    menuText: 'Create post',
    menuScreen: Constants.NavigationScreens.CreatePostScreen,
  },
  {
    id: 2,
    menuText: 'Change password',
    menuScreen: Constants.NavigationScreens.ChangePasswordScreen,
  },
  {
    id: 3,
    menuText: 'Change email',
    menuScreen: null,
    menuPressHandle: 'email_change',
  },
  {
    id: 4,
    menuText: 'Groups',
    menuScreen: Constants.NavigationScreens.GroupsScreen,
  },
  {
    id: 5,
    menuText: 'Preferences',
    menuScreen: Constants.NavigationScreens.PreferencesScreen,
  },
];

const EditProfile = ({navigation}) => {
  const {setAuthenticated} = useContext(UserContext);
  const handleLogout = () => setAuthenticated(false);

  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      setIsLoading(true);
      const userId = await AsyncStorageLib.getItem('@userId');
      const {firstName, lastName, email, _id} = await UsersService.get(userId);
      const avatarImg =
        'https://i.guim.co.uk/img/media/e77ac13b8aceb59e21b20e8d1fd4e618e74f51cb/0_432_2806_1682/master/2806.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=2040fdb94c9c37bc139c8f55c61cc67f';
      setUserData({
        firstName,
        lastName,
        _id,
        email,
        avatarImg,
      });
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error logout]', error);
    } finally {
      setIsLoading(false);
    }
  };

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
            onPress={() => navigation.navigate('UpdateUserForm')}
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
      setIsLoading(true);
      await client.logout();
      handleLogout();
    } catch (err) {
      toast('error', 'Error', err.message);
      console.log('[Error logout]', err);
    } finally {
      setIsLoading(false);
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
                menuItem.menuScreen
                  ? navigation.navigate(menuItem.menuScreen, {
                      userId: userData._id,
                      hideSendMessage: true,
                    })
                  : menuItem?.menuPressHandle
                  ? handleMenuItemPress(menuItem.menuPressHandle)
                  : null
              }
              menuText={menuItem.menuText}
            />
          );
        })}
        <MenuItem onPress={() => logout()} menuText="Log out" />
      </View>
    );
  };

  const handleMenuItemPress = menuItem => {
    if (menuItem === 'email_change') {
      Alert.alert(
        'Change Email?',
        'Instructions will be sent to your email address.',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'OK', onPress: handleConfirmChangeEmail},
        ],
      );
    }
  };

  const handleConfirmChangeEmail = () => {
    Alert.alert('Instructions was sent to your email address!', '', [
      {
        text: 'OK',
        onPress: async () => {
          try {
            const res = await ChangeEmail.create({
              type: 'change-email',
              email: 'anesssanw@gmail.com',
            });
            console.log(res);
          } catch (error) {
            console.log('[Error resend verification email]', error);
          }
        },
        style: 'plain-text',
      },
    ]);
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      {renderAvatar()}
      {renderUserInfo()}
      {renderMenu()}
    </View>
  );
};

export default EditProfile;
