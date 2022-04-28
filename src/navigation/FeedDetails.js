import React, {useEffect} from 'react';
import FeedDetails from '@containers/FeedDetails';
import {View, Text} from 'react-native';

import {HeaderBack} from '@components';

const FeedDetailsScreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    navigation.setOptions({
      headerTitle: () => <Text />,
      headerTintColor: '#fff',
      headerTransparent: true,
      //headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
    });

    return () => {
      navigation.getParent()?.setOptions({tabBarStyle: undefined});
    };
  }, []);
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <FeedDetails navigation={navigation} route={route} />
    </View>
  );
};

export default FeedDetailsScreen;
