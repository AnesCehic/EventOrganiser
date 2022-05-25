import React, {useEffect} from 'react';

import {ChatMessages} from '@containers';
import {Styles} from '@common';
import {useColorScheme} from 'react-native';

const ChatMessagesScreen = ({navigation, route}) => {
  const colorScheme = useColorScheme();
  useEffect(() => {
    // navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});

    navigation.setOptions({
      headerStyle: {
        backgroundColor:
          colorScheme === 'dark'
            ? Styles.Colors.darkBgDark
            : Styles.Colors.darkBgGold,
      },
      headerTintColor: Styles.Colors.white,
    });

    // return () => {
    //   navigation.getParent()?.setOptions({tabBarStyle: undefined});
    // };
  }, []);

  return <ChatMessages navigation={navigation} route={route} />;
};

export default ChatMessagesScreen;
