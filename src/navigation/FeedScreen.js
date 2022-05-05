import React, {useEffect} from 'react';
import {Text} from 'react-native';

import Feed from '@containers/Feed';

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
