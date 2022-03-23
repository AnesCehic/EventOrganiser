/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

import {UserContext} from '@contexts';
import {UsersService} from '@services/apiClient';

import {LoadingIndicator} from '@components';

import {Provider} from 'react-redux';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
// put localization in different folder
dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%dm',
    h: 'an h',
    hh: '%dh',
    d: 'a day',
    dd: '%dd',
    M: 'a month',
    MM: '%dmonths',
    y: 'a year',
    yy: '%dy',
  },
});

import Navigation from './src/navigation';
import store from './store';

const toastConfig = {
  /* Success message toast config */
  // success: props => (
  //   <BaseToast
  //     {...props}
  //     text1Style={{
  //       fontSize: 15,
  //       fontWeight: '400',
  //     }}
  //   />
  // ),

  /* Error message toast config */
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 16,
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
};

const App = () => {
  // if needed put all states into one object state
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [allowMessaging, setAllowMessaging] = useState(false);
  const [userData, setUserData] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    getUser();
    setDarkModeAsync();
    setAnonymousMode();
  }, []);

  const setDarkModeAsync = async () => {
    try {
      const value = await AsyncStorage.getItem('@darkMode');
      let isDarkModeEnabled;
      if (value) {
        isDarkModeEnabled = value === 'enabled';
      }
      if (!value) {
        await AsyncStorage.setItem('@darkMode', 'disabled');
        isDarkModeEnabled = false;
      }
      setDarkMode(isDarkModeEnabled);
    } catch (error) {
      console.log('[Error set dark mode to storage]', error);
    }
  };

  const setAnonymousMode = async () => {
    try {
      setIsLoading(true);
      const value = await AsyncStorage.getItem('@anonymousMode');
      let isAnonEnabled;
      if (value) {
        isAnonEnabled = value === 'enabled';
      }
      if (!value) {
        await AsyncStorage.setItem('@anonymousMode', 'disabled');
        isAnonEnabled = false;
      }
      setAllowMessaging(isAnonEnabled);
    } catch (error) {
      console.log('[Error set anon mode to storage]', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const userId = await AsyncStorage.getItem('@userId');
      const {firstName, lastName, email, _id} = await UsersService.get(userId);
      setUserData({
        firstName,
        lastName,
        email,
        _id,
        avatarImg:
          'https://i.guim.co.uk/img/media/e77ac13b8aceb59e21b20e8d1fd4e618e74f51cb/0_432_2806_1682/master/2806.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=2040fdb94c9c37bc139c8f55c61cc67f',
      });
    } catch (error) {
      console.log('[Error get user data app]', error);
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Provider store={store}>
      <>
        <UserContext.Provider
          value={{
            authenticated,
            setAuthenticated,
            allowMessaging,
            setAllowMessaging,
            userData,
            setUserData,
            darkMode,
            setDarkMode,
          }}>
          <View style={styles.container}>
            <Navigation />
          </View>
        </UserContext.Provider>
        <Toast config={toastConfig} />
      </>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
