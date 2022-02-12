import React, {useEffect} from 'react';

import {Chat} from '@containers';


import {Styles} from '@common';

import {Header} from '@components';

const ChatScreen = ({navigation}) => {
  useEffect(() => {
    const {setOptions} = navigation;

    setOptions({
      title: 'Login',
      headerTitleAlign: 'center',
    });
  }, []);

  return <Chat />
};

export default ChatScreen;
