import React, {useEffect} from 'react';
import FeedDetails from '@containers/FeedDetails';
import {View, useColorScheme} from 'react-native';

import {HeaderBack} from '@components';

const FeedDetailsScreen = ({navigation, route}) => {
  const colorScheme = useColorScheme();
  useEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    navigation.setOptions({
      title: '',
      headerTintColor: '#fff',
      headerTransparent: true,
      headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
    });

    return () => {
      navigation.getParent()?.setOptions({tabBarStyle: undefined});
    };
  }, []);
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <FeedDetails
        navigation={navigation}
        route={route}
        isDarkMode={colorScheme === 'dark'}
      />
    </View>
  );
};

export default FeedDetailsScreen;
