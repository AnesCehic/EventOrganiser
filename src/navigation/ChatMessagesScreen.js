import React, {useEffect} from 'react';

import {ChatMessages} from '@containers';
import {Styles} from '@common';

const ChatMessagesScreen = ({navigation, route}) => {
  // useEffect(() => {
  //   const parent = navigation.getParent();
  //   console.log(parent);
  //   navigation.setOptions({
  //     headerStyle: {
  //       backgroundColor: Styles.Colors.gold,
  //     },
  //   });
  //   parent.setOptions({
  //     tabBarStyle: {
  //       display: 'none',
  //     },
  //   });

  //   return () => {
  //     console.log('tu');
  //     parent.setOptions({
  //       tabBarStyle: {
  //         display: 'flex',
  //       },
  //     });
  //   };
  // }, []);

  return <ChatMessages navigation={navigation} route={route} />;
};

export default ChatMessagesScreen;
