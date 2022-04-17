import React, {useEffect} from 'react';

import {CreateChat} from '@containers';

import {Styles} from '@common';

const CreateChatScreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Styles.Colors.gold,
      },
      title: 'New message',
    });
  }, []);

  return <CreateChat navigation={navigation} route={route} />;
};

export default CreateChatScreen;
