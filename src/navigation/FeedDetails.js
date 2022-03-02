import React, {useEffect} from 'react';
import FeedDetails from '@containers/FeedDetails';
import {View} from 'react-native';

const FeedDetailsScreen = ({navigation, route}) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <FeedDetails navigation={navigation} route={route} />
    </View>
  );
};

export default FeedDetailsScreen;
