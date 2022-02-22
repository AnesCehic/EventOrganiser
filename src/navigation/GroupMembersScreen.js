import React from 'react';
import { Text, View } from 'react-native';

const GroupMembersScreen = ({navigation, route}) => {
  return (
    <View>
      <Text>{route.params.id}</Text>
    </View>
  );
};

export default GroupMembersScreen;
