import React, {Component, useEffect} from 'react';

import Feed from '@containers/Feed';
import {Header} from '@components';
import {Styles} from '@common'

const FeedScreen = ({navigation}) => {
  useEffect(() => {
    const {setOptions} = navigation;

    setOptions({
      header: ({navigation: {goBack}}) => (
        <Header
          goBack={goBack}
          backgroundColor={Styles.Colors.white}
          title="Feed"
        />
      ),
    });
  }, []);

  return <Feed navigation={navigation} />;
};

export default FeedScreen;
