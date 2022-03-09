import Toast from 'react-native-toast-message';

const toast = (type, text1, text2) => {
  Toast.show({
    type,
    text1,
    text2,
  });
};

export default toast;
