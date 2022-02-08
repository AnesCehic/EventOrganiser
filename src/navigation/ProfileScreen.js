import React, {useEffect} from 'react';

import {Styles} from '@common';

import {Profile} from '@containers';
import {Header} from '@components';

const ProfileScreen = ({navigation}) => {
  useEffect(() => {
    const {setOptions} = navigation;

    setOptions({
      header: ({navigation: {goBack}}) => (
        <Header
          goBack={goBack}
          backgroundColor={Styles.Colors.white}
          title="Profile"
        />
      ),
    });
  }, []);

  return <Profile navigation={navigation} />;
};

export default ProfileScreen;
