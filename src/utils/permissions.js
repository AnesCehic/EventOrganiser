import {request, RESULTS} from 'react-native-permissions';

const askForPermissions = async permission => {
  const per = await request(permission);

  if (per !== RESULTS.GRANTED) {
    throw new Error('You do not have permissions to use camera!');
  } else {
    return per;
  }
};

export {askForPermissions};
