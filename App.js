import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const App = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setAnonymousMode();
  }, []);

  const setAnonymousMode = async () => {
    try {
      const value = await AsyncStorage.getItem('@anonymousMode');
      if (!value) {
        AsyncStorage.setItem('@anonymousMode', 'disabled');
        return;
      }
      // eslint-disable-next-line no-shadow
      setUserData(userData => ({
        ...userData,
        anonymousMode: value,
      }));
    } catch (error) {
      console.log('[Error set anon mode to storage]', error);
    }
  };

  return (
    <Provider store={store}>
      <UserContext.Provider value={userData}>
        <View style={styles.container}>
          <Navigation />
        </View>
      </UserContext.Provider>
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
