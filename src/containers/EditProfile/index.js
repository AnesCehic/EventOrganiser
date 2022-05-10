/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-remix-icon';

import {LoadingIndicator} from '@components';
import {Constants, Styles} from '@common';
import {UserContext} from '@contexts';
import {toast} from '@utils';
import UserIcon from '@assets/ImageComponents/UserIcon';
import {
  EditProfilePass,
  Notification as NotificationIcon,
  ChatBubblesMsg,
  Logout as LogoutIcon,
} from '@assets/SvgIcons';

import {client, ChangeEmail, UsersService} from '@services/apiClient';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const MenuItems = [
  {
    id: 1,
    menuText: 'Edit info',
    menuScreen: Constants.NavigationScreens.PersonalDetailsScreen,
  },
  {
    id: 12,
    menuText: 'Password',
    menuScreen: Constants.NavigationScreens.ChangePasswordScreen,
    icon: <EditProfilePass />,
  },
];

const EditProfile = ({navigation}) => {
  const {setAuthenticated, allowMessaging, setAllowMessaging, userData} =
    useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  const [allowMessagingState, setAllowMessagingState] =
    useState(allowMessaging);

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

  const renderUser = () => {
    return (
      <TouchableOpacity
        style={styles.user}
        onPress={() => {
          navigation.navigate(Constants.NavigationScreens.ProfileScreen, {
            hideListHeader: true,
          });
        }}>
        {userData.avatarImg ? (
          <Avatar
            size={70}
            rounded
            containerStyle={{}}
            source={{uri: userData.avatarImg}}>
            {/* <Avatar.Accessory
              onPress={loadCamera}
              size={20}
              style={styles.avatarIcon}
              name="vertical-align-top"
              color="white"
            /> */}
          </Avatar>
        ) : (
          <Avatar
            size={70}
            rounded
            renderPlaceholderContent={() => <UserIcon />}
          />
        )}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {userData.firstName} {userData.lastName}
          </Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
        </View>
        <Icon
          name="ri-arrow-right-s-line"
          size={34}
          style={styles.userArrowIcon}
          color={Styles.Colors.iconGray}
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
                        userId: userData._id,
                        userData: userData,
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
            <ChatBubblesMsg width={18} height={18} viewBox="0 0 12 12" />
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
        <TouchableOpacity
          onPress={() => logout()}
          style={[styles.menuItem, styles.logoutItem, {marginBottom: 16}]}>
          <View style={styles.leftContent}>
            <LogoutIcon />
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
  console.log('asdasdasd', Styles.Colors.iconGray);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topImage}>
        <Text style={styles.headerText}>My account</Text>
      </View>
      <View style={styles.content}>
        {renderUser()}
        <View style={styles.settings}>
          <Icon
            name="ri-sound-module-line"
            size={16}
            color={Styles.Colors.iconGray}
          />
          <Text style={styles.settingsText}>Settings</Text>
        </View>
        {renderMenu()}
      </View>
    </ScrollView>
  );
};

export default EditProfile;
