import React, {useEffect} from 'react';

import {Groups} from '@containers';
import {Styles} from '@common';

const GroupsScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Styles.Colors.gold,
      },
    });
  }, []);

  return <Groups navigation={navigation} />;
};

export default GroupsScreen;
