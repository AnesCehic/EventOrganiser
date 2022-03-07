import React, {Component, useEffect} from 'react';

import Feed from '@containers/Feed';
import {Text} from 'react-native';

const FeedScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text />,
      headerTintColor: '#fff',
      headerTransparent: true,
    });
  }, []);

  return <Feed navigation={navigation} />;
};

export default FeedScreen;
