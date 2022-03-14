import React, {useEffect} from 'react';

import {Chat} from '@containers';


import {Styles} from '@common';

import {Header} from '@components';
import { Text } from 'react-native';

const ChatScreen = ({navigation}) => {
  useEffect(() => {
    const {setOptions} = navigation;

    setOptions({
      title: 'Messages',
      headerTitleAlign: 'center'
    });
  }, []);

  return <Chat navigation={navigation} />;
};

export default ChatScreen;
