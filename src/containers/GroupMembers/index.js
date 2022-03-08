import React, {useState, useEffect} from 'react';
import {FlatList, View} from 'react-native';

import {LoadingIndicator, MenuItem} from '@components';
import {GroupService, UsersService} from '@services/apiClient';
import {toast} from '@utils';

import styles from '../Groups/styles';

const GroupMembers = ({navigation, route}) => {
  const [groupMembers, setGroupMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchGroupMembers = async () => {
    try {
      setIsLoading(true);
      let group = await GroupService.get(route.params.id);
      let {data} = await UsersService.find({
        query: {
          _id: {
            $in: [...group.members],
          },
        },
      });
      setGroupMembers(data);
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error fetch group members]', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (refreshing) {
      fetchGroupMembers();
      setRefreshing(false);
    }
  }, [refreshing]);

  const renderGroupMember = ({item: member}) => {
    return (
      <View>
        <MenuItem
          key={member._id}
          groupId={member._id}
          onPress={() => {
            navigation.navigate('ProfileScreen', {
              userId: member._id,
            });
          }}
          menuText={`${member.firstName} ${member.lastName}`}
        />
      </View>
    );
  };

  useEffect(() => {
    fetchGroupMembers();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={groupMembers}
        keyExtractor={item => item._id}
        renderItem={renderGroupMember}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
        }}
      />
    </View>
  );
};

export default GroupMembers;
