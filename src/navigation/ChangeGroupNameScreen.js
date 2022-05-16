import React, {useEffect} from 'react';

import {ChangeGroupName} from '@containers';
import {HeaderBack} from '@components';
import {Styles} from '@common';

const ChangeGroupNameScreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Change group name',
      headerTintColor: '#fff',
      headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
      headerStyle: {
        backgroundColor: Styles.Colors.gold,
      },
    });
  }, []);

  return <ChangeGroupName navigation={navigation} route={route} />;
};

export default ChangeGroupNameScreen;
