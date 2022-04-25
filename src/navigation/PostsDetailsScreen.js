import React, {useEffect} from 'react';
import {Text} from 'react-native';

import {PostDetails} from '@containers';
import {Styles} from '@common';
import {HeaderBack} from '@components';

const PostDetailsSCreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTintColor: Styles.Colors.white,
      headerLeft: () => {
        return <HeaderBack onPress={() => navigation.goBack()} />;
      },
    });
  }, []);

  return <PostDetails navigation={navigation} route={route} />;
};

export default PostDetailsSCreen;
