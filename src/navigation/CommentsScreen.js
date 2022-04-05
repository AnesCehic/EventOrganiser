import React from 'react';

import {Comments} from '@containers';

const CommentsScreen = ({navigation, route}) => {
  return <Comments navigation={navigation} route={route} />;
};

export default CommentsScreen;
