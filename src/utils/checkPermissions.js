import {PERMISSIONS, check, RESULTS} from 'react-native-permissions';

const hasPermission = async () => {
  try {
    let res = await check(PERMISSIONS.ANDROID.CAMERA);

    if (!res) {
      throw new Error('You do not have permissions to use camera!');
    }

    if (res === RESULTS.GRANTED) {
      return res;
    } else {
      throw new Error('Camera not available');
    }
  } catch (error) {
    console.log(error);
  }
};

export default hasPermission;
