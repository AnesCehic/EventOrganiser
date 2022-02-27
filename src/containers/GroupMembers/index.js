import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';

import { LoadingIndicator } from '@components';
import { GroupService, UsersService } from '../../services/apiClient';

const GroupMembers = ({navigation, route}) => {
  const [groupMembers, setGroupMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGroupMembers = async () => {
    try {
      setIsLoading(true);
      let group = await GroupService.get(route.params.id);
      console.log(group);
      let members = await UsersService.find({query: { _id: { $in: ["620a9de1c8ec5100103aca38"] } } });
      console.log(members);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('[Error fetch group members]', error);
    }
  };

  useEffect(() => {
    fetchGroupMembers();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View>
      <Text>{route.params.id}</Text>
    </View>
  );
};

export default GroupMembers;
