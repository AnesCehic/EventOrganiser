/**
 * @format
 */

import 'react-native-gesture-handler';

import {AppRegistry, Linking} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {DevicesService} from './src/services/apiClient';

import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

PushNotification.configure({
  onRegister: function (token) {},
  onNotification: async function (notification) {
    try {
      await Linking.openURL(`lincoln://events/${notification.group}`);
    } catch (error) {
      console.log('[Error clicking notif]', error);
    }
  },
  onAction: function (notification) {},
  onRegistrationError: function (err) {},
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: 'specialid', // (required)
    channelName: 'Special messasge', // (required)
    channelDescription: 'Notification for special message', // (optional) default: undefined.
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  created => {}, // (optional) callback returns whether the channel was created, false means it already existed.
);

messaging().setBackgroundMessageHandler(async message => {
  await Linking.openURL(`lincoln://events/${message.data?.groupId}`);
});

AppRegistry.registerComponent(appName, () => App);
