/**
 * @format
 */

import 'react-native-gesture-handler';

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function (token) {},
  onNotification: function (notification) {},
  onAction: function (notification) {},
  onRegistrationError: function (err) {},
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
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

AppRegistry.registerComponent(appName, () => App);
