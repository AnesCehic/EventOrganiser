import React, {useEffect} from 'react';
import FeedDetails from '@containers/FeedDetails';
import {View} from 'react-native';

import {Header} from '@components';
import {Styles} from '@common';

const FeedDetailsScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <FeedDetails />
    </View>
  );
};

export default FeedDetailsScreen;
