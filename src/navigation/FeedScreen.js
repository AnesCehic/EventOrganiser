import React, {Component, useEffect} from 'react';

import Feed from '@containers/Feed';

const FeedScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Feed',
      headerTitleAlign: 'center',
    });
  }, []);

  return <Feed navigation={navigation} />;
};

export default FeedScreen;
