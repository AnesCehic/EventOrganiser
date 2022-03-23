import React, {useEffect} from 'react';

import {GroupMembers} from '@containers';
import {Styles} from '@common';

const GroupMembersScreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Styles.Colors.gold,
      },
    });
  }, []);
  return <GroupMembers navigation={navigation} route={route} />;
};

export default GroupMembersScreen;
