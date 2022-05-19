import PushNotification from 'react-native-push-notification';
import PushNotificationIos from '@react-native-community/push-notification-ios';

const presentNotification = message => {
  PushNotification.localNotification({
    channelId: 'specialid',
    title: `Someone sent you a message.`,
    message: message.text,
  });
};

const presentNotificationIos = message => {
  PushNotificationIos.addNotificationRequest({
    title: 'Someone sent you a message',
    body: message.text,
  });
};

export {presentNotification, presentNotificationIos};
