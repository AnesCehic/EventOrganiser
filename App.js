/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Appearance,
  useColorScheme,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';

import {UserContext} from '@contexts';
import {MessagesService, DevicesService} from '@services/apiClient';
import {presentNotification, presentNotificationIos} from '@utils/notification';

import {LoadingIndicator} from '@components';

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

  useEffect(() => {
    setAnonymousMode();
    const colorScheme = Appearance.getColorScheme();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      MessagesService.on('created', message => {
        presentNotification(message);
      });
    }    

    if (Platform.OS === 'ios') {
      MessagesService.on('created', message => {
        presentNotificationIos(message);
      });
    }
  }, []);

  const setAnonymousMode = async () => {
    try {
      setIsLoading(true);
      const value = await AsyncStorage.getItem('@anonymousMode');
      let isAnonEnabled;
      if (value) {
        isAnonEnabled = value === 'enabled';
      }
      if (!value) {
        await AsyncStorage.setItem('@anonymousMode', 'enabled');
        isAnonEnabled = true;
      }
      setAllowMessaging(isAnonEnabled);
    } catch (error) {
      console.log('[Error set anon mode to storage]', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <UserContext.Provider
        value={{
          authenticated,
          setAuthenticated,
          allowMessaging,
          setAllowMessaging,
          userData,
          setUserData,
        }}>
        <View style={styles.container}>
          <StatusBar translucent backgroundColor="transparent" />
          <Navigation />
        </View>
      </UserContext.Provider>
      <Toast config={toastConfig} />
    </>
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
