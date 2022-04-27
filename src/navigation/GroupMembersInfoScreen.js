import React, {useEffect} from 'react';
import {Appearance} from 'react-native';

import {Profile} from '@containers';
import {Styles} from '@common';

const GroupMembersScreenInfo = ({navigation, route}) => {
  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    const headerBg =
      colorScheme === 'light' ? Styles.Colors.gold : Styles.Colors.white;
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return <Profile navigation={navigation} route={route} />;
};

export default GroupMembersScreenInfo;
