import React, {useEffect} from 'react';
import {Text} from 'react-native';

import {PostDetails} from '@containers';
import {Styles} from '@common';

const PostDetailsSCreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTintColor: Styles.Colors.white,
    });
  }, []);

  return <PostDetails navigation={navigation} route={route} />;
};

export default PostDetailsSCreen;
