/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Switch,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-remix-icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {LoadingIndicator} from '@components';
import {Constants, Styles} from '@common';
import {UserContext} from '@contexts';
import {toast} from '@utils';

import {client, ChangeEmail, UsersService} from '@services/apiClient';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

// Add menuScreen from Constants.NavigationScreens when ready
const MenuItems = [
  // {
  //   id: 1,
  //   menuText: 'Profile',
  //   menuScreen: Constants.NavigationScreens.ProfileScreen,
  // },
  // {
  //   id: 6,
  //   menuText: 'Create post',
  //   menuScreen: Constants.NavigationScreens.CreatePostScreen,
  // },
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
    id: 12,
    menuText: 'Password',
    menuScreen: Constants.NavigationScreens.ChangePasswordScreen,
    icon: <Ionicons name="eye-outline" size={22} color={Styles.Colors.gold} />,
  },
  {
    id: 2,
    menuText: 'Notifications',
    menuScreen: null,
    icon: (
      <MaterialCommunityIcons
        name="bell-outline"
        size={22}
        color={Styles.Colors.gold}
      />
    ),
  },
  {
    id: 3,
    menuText: 'Chat',
    menuScreen: 'Messages',
    icon: (
      <Ionicons
        name="chatbubbles-outline"
        size={22}
        color={Styles.Colors.gold}
      />
    ),
  },
  {
    id: 4,
    menuText: 'Groups',
    menuScreen: 'GroupsScreen',
  },
];

const EditProfile = ({navigation}) => {
  const {
    setAuthenticated,
    userData,
    allowMessaging,
    setAllowMessaging,
    darkMode,
    setDarkMode,
  } = useContext(UserContext);

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

  const [allowMessagingState, setAllowMessagingState] =
    useState(allowMessaging);
  const [darkModeState, setDarkModeState] = useState(darkMode);

  const handleLogout = () => setAuthenticated(false);

  const setAllowMessagingAsync = async value => {
    try {
      const isAnonMode = value ? 'enabled' : 'disabled';
      await AsyncStorageLib.setItem('@anonymousMode', isAnonMode);
      setAllowMessagingState(value);
      setAllowMessaging(value);
    } catch (error) {
      console.log('[Error set allow messaging / anonomous mode]', error);
    }
  };

  const setDarkModeAsync = async value => {
    try {
      const isDarkMode = value ? 'enabled' : 'disabled';
      await AsyncStorageLib.setItem('@darkMode', isDarkMode);
      setDarkModeState(value);
      setDarkMode(value);
    } catch (error) {
      console.log('[Error set dark mode]', error);
    }
  };

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
          name="ri-arrow-right-s-line"
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
                <View style={styles.leftContent}>
                  {menuItem.icon}
                  <Text style={styles.menuItemText}>{menuItem.menuText}</Text>
                </View>
                <Icon
                  name="ri-arrow-right-s-line"
                  size={24}
                  color={Styles.Colors.grayText}
                  style={styles.arrowIcon}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={[styles.menuItem, styles.logoutItem]}>
          <View style={styles.leftContent}>
            <Ionicons
              name="chatbubbles-outline"
              size={22}
              // color={Styles.Colors.gold}
            />
            <Text style={styles.menuItemText}>Allow messaging</Text>
          </View>
          <Switch
            trackColor={{
              false: Styles.Colors.darkGrayBg,
              true: Styles.Colors.success,
            }}
            thumbColor={Styles.Colors.white}
            ios_backgroundColor={Styles.Colors.darkGrayBg}
            onValueChange={setAllowMessagingAsync}
            value={allowMessagingState}
            style={{transform: [{scaleX: 0.9}, {scaleY: 0.9}]}}
          />
        </View>
        <View style={[styles.menuItem, styles.logoutItem]}>
          <View style={styles.leftContent}>
            <Ionicons
              name="chatbubbles-outline"
              size={22}
              // color={Styles.Colors.gold}
            />
            <Text style={styles.menuItemText}>Dark mode</Text>
          </View>
          <Switch
            trackColor={{
              false: Styles.Colors.darkGrayBg,
              true: Styles.Colors.success,
            }}
            thumbColor={Styles.Colors.white}
            ios_backgroundColor={Styles.Colors.darkGrayBg}
            onValueChange={setDarkModeAsync}
            value={darkModeState}
            style={{transform: [{scaleX: 0.9}, {scaleY: 0.9}]}}
          />
        </View>
        <TouchableOpacity
          onPress={() => logout()}
          style={[styles.menuItem, styles.logoutItem, {marginBottom: 16}]}>
          <View style={styles.leftContent}>
            <Icon
              name="ri-logout-circle-r-line"
              size={22}
              color={Styles.Colors.error}
            />
            <Text style={styles.menuItemText}>Log out</Text>
          </View>
          <Icon
            name="ri-arrow-right-s-line"
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
          <Icon name="ri-sound-module-line" size={16} />
          <Text style={styles.settingsText}>Settings</Text>
        </View>
        {renderMenu()}
      </View>
    </ScrollView>
  );
};

export default EditProfile;
