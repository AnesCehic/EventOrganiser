/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {UserContext} from '@contexts';

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
  const [authenticated, setAuthenticated] = useState(false);
  const [chatForbiden, setChatForbiden] = useState(false);

  useEffect(() => {
    setAnonymousMode();
  }, []);

  const setAnonymousMode = async () => {
    try {
      const value = await AsyncStorage.getItem('@anonymousMode');
      let isAnonEnabled;
      if (value) {
        isAnonEnabled = value === 'enabled';
      }
      if (!value) {
        await AsyncStorage.setItem('@anonymousMode', 'disabled');
        isAnonEnabled = false;
      }
      setChatForbiden(isAnonEnabled);
    } catch (error) {
      console.log('[Error set anon mode to storage]', error);
    }
  };

  return (
    <Provider store={store}>
      <>
        <UserContext.Provider
          value={{
            authenticated,
            setAuthenticated,
            chatForbiden,
            setChatForbiden,
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
