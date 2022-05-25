import React, {useEffect} from 'react';

import {ChangeGroupName} from '@containers';
import {HeaderBack} from '@components';
import {Styles} from '@common';
import {useColorScheme} from 'react-native';

const ChangeGroupNameScreen = ({navigation, route}) => {
  const colorScheme = useColorScheme();
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: 'Change group name',
      headerTintColor: '#fff',
      headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
      headerStyle: {
        backgroundColor:
          colorScheme === 'dark'
            ? Styles.Colors.headerBackgroundDark
            : Styles.Colors.headerBackground,
      },
    });
  }, []);

  return <ChangeGroupName navigation={navigation} route={route} />;
};

export default ChangeGroupNameScreen;
