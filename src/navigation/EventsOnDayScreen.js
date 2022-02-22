import React from 'react';

import {Content} from '@containers';

const ContentScreen = ({route, navigation}) => {
  return <Content navigation={navigation} route={route} />;
};

export default ContentScreen;
