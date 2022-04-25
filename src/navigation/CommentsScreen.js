import React, {useEffect} from 'react';

import {Comments} from '@containers';
import {Styles} from '@common';

const CommentsScreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Styles.Colors.gold,
      },
    });
  }, []);

  return <Comments navigation={navigation} route={route} />;
};

export default CommentsScreen;
