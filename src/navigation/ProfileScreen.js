import React, {useEffect} from 'react';

import {Styles} from '@common';

import {Profile} from '@containers';
import {Header} from '@components';

const ProfileScreen = ({navigation}) => {
  return <Profile navigation={navigation} />;
};

export default ProfileScreen;
