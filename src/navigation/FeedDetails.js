import React, {useEffect} from 'react';
import FeedDetails from '@containers/FeedDetails';
import {View} from 'react-native';

import {Header} from '@components';
import {Styles} from '@common';

const FeedDetailsScreen = ({navigation}) => {
  useEffect(() => {
    const {setOptions} = navigation;

    setOptions({
      header: ({navigation: {goBack}}) => (
        <Header
          goBack={goBack}
          backgroundColor={Styles.Colors.white}
          title="Events List"
        />
      ),
    });
  }, []);

  return <View style={{flex: 1}}><FeedDetails /></View>
}

export default FeedDetailsScreen;