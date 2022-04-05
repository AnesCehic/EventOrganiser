import React, {useState, useEffect} from 'react';
import {FlatList, View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-remix-icon';
import IconFeathers from 'react-native-vector-icons/Feather';
import IconMAC from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar} from 'react-native-elements';

import {LoadingIndicator, HeaderBack} from '@components';
import {GroupService, UsersService} from '@services/apiClient';
import {toast} from '@utils';
import {Styles} from '@common';

import styles from '../Groups/styles';
import userCardStyle from './styles';

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
      <View style={userCardStyle.container}>
        <View style={userCardStyle.userInfo}>
          <Avatar
            source={{
              uri: 'https://api.uifaces.co/our-content/donated/KtCFjlD4.jpg',
            }}
            rounded
            size={48}
          />
          <View style={{marginLeft: 14}}>
            <Text style={userCardStyle.name}>{member.text}</Text>
            <Text style={userCardStyle.email}>{member.text}</Text>
          </View>
        </View>

        <Icon
          name="ri-arrow-right-s-line"
          size={30}
          color={Styles.Colors.grayText}
          // style={styles.arrowIcon}
        />
        {/* <MenuItem
          key={member._id}
          groupId={member._id}
          onPress={() => {
            navigation.push('ProfileScreen', {
              userId: member._id,
            });
          }}
          menuText={`${member.firstName} ${member.lastName}`}
        /> */}
      </View>
    );
  };

  useEffect(() => {
    fetchGroupMembers();
    navigation.setOptions({
      title: route.params.name,
    });
  }, []);

  const renderHeader = () => {
    return (
      <View
        style={{
          backgroundColor: Styles.Colors.gold,
          paddingTop: 48,
          paddingHorizontal: 16,
          paddingBottom: 20,
          marginBottom: 20,
        }}>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <HeaderBack onPress={() => navigation.goBack()} />
            <TouchableOpacity
              onPress={() => null}
              style={{
                backgroundColor: Styles.Colors.white,
                borderRadius: 50,
                height: 35,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 16,
              }}>
              <IconMAC
                name="checkbox-marked-circle-outline"
                size={16}
                style={{marginRight: 9}}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '700',
                }}>
                Joined
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 16}}>
            <Text style={{fontSize: 28, fontWeight: '700'}}>Lincoln 2022</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <IconFeathers name="user" size={13} style={{marginRight: 6}} />
              <Text style={{fontSize: 13, fontWeight: '400'}}>71,000</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={[styles.container, userCardStyle.paddingOverride]}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={[
          {id: 1, text: '123'},
          {id: 2, text: '345'},
        ]}
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
