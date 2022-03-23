/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';

import {LoadingIndicator} from '@components';
import {Constants, Styles} from '@common';
import {UsersService} from '@services/apiClient';
import {UserContext} from '@contexts';
import {toast} from '@utils';

import {client, ChangeEmail} from '@services/apiClient';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

// Add menuScreen from Constants.NavigationScreens when ready
const MenuItems = [
  {
    id: 1,
    menuText: 'Edit info',
    menuScreen: Constants.NavigationScreens.PersonalDetailsScreen,
  },
  {
    id: 6,
    menuText: 'Create post',
    menuScreen: Constants.NavigationScreens.CreatePostScreen,
  },
  {
    id: 2,
    menuText: 'Notifications',
    menuScreen: null,
  },
  {
    id: 3,
    menuText: 'Chat',
    menuScreen: 'Messages',
  },
  {
    id: 4,
    menuText: 'Groups',
    menuScreen: 'GroupsScreen',
  },
];

const EditProfile = ({navigation}) => {
  const {setAuthenticated, userData} = useContext(UserContext);
  const handleLogout = () => setAuthenticated(false);

  // const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [data, setUserData] = useState({
    firstName: 'Bruce',
    lastName: 'Dickinson',
    email: 'example@gmail.com',
    avatarImg:
      'https://i.guim.co.uk/img/media/e77ac13b8aceb59e21b20e8d1fd4e618e74f51cb/0_432_2806_1682/master/2806.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=2040fdb94c9c37bc139c8f55c61cc67f',
  });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      setIsLoading(true);
      const userId = await AsyncStorageLib.getItem('@userId');
      const {firstName, lastName, email, _id, ...res} = await UsersService.get(
        userId,
      );
      console.log(firstName, lastName, email, _id, res);
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

  const renderUser = () => {
    return (
      <TouchableOpacity
        style={styles.user}
        onPress={() => {
          navigation.navigate(Constants.NavigationScreens.ProfileScreen, {
            hideListHeader: true,
          });
        }}>
        <Avatar
          size={70}
          rounded
          containerStyle={{}}
          source={data.avatarImg ? {uri: data.avatarImg} : {}}>
          <Avatar.Accessory
            onPress={() => console.log('edit profile pic')}
            size={20}
            style={styles.avatarIcon}
            name="vertical-align-top"
            color="white"
          />
        </Avatar>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {data.firstName} {data.lastName}
          </Text>
          <Text style={styles.userEmail}>{data.email}</Text>
        </View>
        <Icon
          name="keyboard-arrow-right"
          size={34}
          style={styles.userArrowIcon}
          color="#000"
        />
      </TouchableOpacity>
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
      <>
        <View style={styles.menu}>
          {MenuItems.map((menuItem, i) => {
            return (
              <TouchableOpacity
                key={menuItem.id}
                style={[
                  styles.menuItem,
                  {borderBottomWidth: i === MenuItems.length - 1 ? 0 : 1},
                  {borderTopLeftRadius: i === 0 ? 10 : 0},
                  {borderTopRightRadius: i === 0 ? 10 : 0},
                  {borderBottomLeftRadius: i === MenuItems.length - 1 ? 10 : 0},
                  {
                    borderBottomRightRadius:
                      i === MenuItems.length - 1 ? 10 : 0,
                  },
                ]}
                onPress={() => {
                  menuItem.menuScreen
                    ? navigation.navigate(menuItem.menuScreen, {
                        userId: data._id,
                        userData: data,
                        hideSendMessage: true,
                      })
                    : menuItem?.menuPressHandle
                    ? handleMenuItemPress(menuItem.menuPressHandle)
                    : null;
                }}>
                <Text style={styles.menuItemText}>{menuItem.menuText}</Text>
                <Icon
                  name="keyboard-arrow-right"
                  size={24}
                  color={Styles.Colors.grayText}
                  style={styles.arrowIcon}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          onPress={() => logout()}
          style={[styles.menuItem, styles.logoutItem]}>
          <Text style={styles.menuItemText}>Log out</Text>
          <Icon
            name="keyboard-arrow-right"
            size={24}
            color={Styles.Colors.grayText}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </>
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
            await ChangeEmail.create({
              type: 'change-email',
              email: 'anesssanw@gmail.com',
            });
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
    <ScrollView style={styles.container}>
      <ImageBackground
        style={styles.topImage}
        source={require('../../assets/headerBackground.png')}
        resizeMode="cover">
        <Text style={styles.headerText}>My account</Text>
      </ImageBackground>
      <View style={styles.content}>
        {renderUser()}
        <View style={styles.settings}>
          <Text style={styles.settingsText}>Settings</Text>
        </View>
        {renderMenu()}
      </View>
    </ScrollView>
  );
};

export default EditProfile;
