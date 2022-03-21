import React, {useEffect} from 'react';
import {Button, View} from 'react-native';

import {VerifyAccountService} from '../../services/apiClient';

import styles from './styles';

const VerifyAccount = ({navigation, route}) => {
  useEffect(() => {
    const {userId, verificationKey} = route.params;
    VerifyAccountService.create(
      {
        user: {
          _id: userId,
          verificationKey,
        },
      },
      {
        user: {
          _id: userId,
          verificationKey,
        },
      },
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Button onPress={() => console.log('Pressed')} title="Verify account!" />
    </View>
  );
};

export default VerifyAccount;
