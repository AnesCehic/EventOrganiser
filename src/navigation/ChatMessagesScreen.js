import React from 'react';

import {ChatMessages} from '@containers';

const ChatMessagesScreen = ({navigation, route}) => {
  return <ChatMessages navigation={navigation} route={route} />;
};

export default ChatMessagesScreen;
