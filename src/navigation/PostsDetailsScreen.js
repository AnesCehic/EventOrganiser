import React, {useEffect} from 'react';
import {Text} from 'react-native';

import {PostDetails} from '@containers';

const PostDetailsSCreen = ({navigation, route}) => {
  return <PostDetails navigation={navigation} route={route} />;
};

export default PostDetailsSCreen;
