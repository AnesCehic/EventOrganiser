import React, {useEffect} from 'react';

import {GroupMembers} from '@containers';
import {Styles} from '@common';

const GroupMembersScreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return <GroupMembers navigation={navigation} route={route} />;
};

export default GroupMembersScreen;
