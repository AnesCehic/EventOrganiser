import React, {useEffect} from 'react';
import {Text} from 'react-native';

import {PostDetails} from '@containers';
import {Styles} from '@common';
import {HeaderBack} from '@components';

const PostDetailsSCreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});

    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTintColor: Styles.Colors.white,
      headerLeft: () => {
        return <HeaderBack onPress={() => navigation.goBack()} />;
      },
    });
    return () => {
      navigation.getParent()?.setOptions({tabBarStyle: undefined});
    };
  }, []);

  return <PostDetails navigation={navigation} route={route} />;
};

export default PostDetailsSCreen;
