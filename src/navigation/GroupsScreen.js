import React, {useEffect} from 'react';
import {Appearance} from 'react-native';

import {Groups} from '@containers';
import {Styles} from '@common';

const GroupsScreen = ({navigation}) => {
  const colorScheme = Appearance.getColorScheme();
  const headerBg =
    colorScheme === 'light' ? Styles.Colors.gold : Styles.Colors.white;
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: headerBg,
      },
    });
  }, []);

  return <Groups navigation={navigation} />;
};

export default GroupsScreen;
