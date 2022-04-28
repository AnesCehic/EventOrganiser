import React, {useEffect} from 'react';

import {ChatMessages} from '@containers';
import {Styles} from '@common';

const ChatMessagesScreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});

    navigation.setOptions({
      headerStyle: {
        backgroundColor: Styles.Colors.topBackground,
      },
      headerTintColor: Styles.Colors.white,
    });

    return () => {
      navigation.getParent()?.setOptions({tabBarStyle: undefined});
    };
  }, []);

  return <ChatMessages navigation={navigation} route={route} />;
};

export default ChatMessagesScreen;
