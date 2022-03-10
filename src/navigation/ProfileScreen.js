import React, {useEffect} from 'react';

import {Styles} from '@common';

import {Profile} from '@containers';
import {Header} from '@components';

const ProfileScreen = ({navigation, route}) => {
  return <Profile navigation={navigation} route={route} />;
};

export default ProfileScreen;
