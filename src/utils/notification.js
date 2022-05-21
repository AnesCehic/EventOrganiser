import AsyncStorageLib from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import PushNotificationIos from '@react-native-community/push-notification-ios';

const presentNotification = async message => {
  try {
    const userId = await AsyncStorageLib.getItem('@userId');
    if (userId !== message.ownerId) {
      PushNotification.localNotification({
        channelId: 'specialid',
        title: 'Someone sent you a message.',
        message: message.text,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const presentNotificationIos = async message => {
  try {
    const userId = await AsyncStorageLib.getItem('@userId');
    if (userId !== message.ownerId) {
      PushNotificationIos.presentLocalNotification({
        alertTitle: 'Someone sent you a message',
        alertBody: message.text,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export {presentNotification, presentNotificationIos};
