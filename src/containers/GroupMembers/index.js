import React, {useState, useEffect, useContext} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import IconFeathers from 'react-native-vector-icons/Feather';
import IconMAC from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar} from 'react-native-elements';

import {LoadingIndicator, HeaderBack} from '@components';
import {
  GroupService,
  UsersService,
  MessageGroupsService,
} from '@services/apiClient';
import {toast} from '@utils';
import {Styles, Constants} from '@common';
import {UserContext} from '@contexts';
import UserIcon from '@assets/ImageComponents/UserIcon';
import {BottomChat} from '@assets/SvgIcons';

import styles from '../Groups/styles';
import userCardStyle from './styles';
import MainIcon from '../../components/ChatMessageIcon/MainIcon';

const GroupMembers = ({navigation, route}) => {
  const {userData} = useContext(UserContext);

  const [groupMembers, setGroupMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [groupData, setGroupData] = useState({});
  const colorScheme = useColorScheme();

  const fetchGroupMembers = async () => {
    try {
      setIsLoading(true);
      let group = await GroupService.get(route.params.id);
      setGroupData(group);
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

  const joinGroup = async () => {
    try {
      const res = await GroupService.update(route.params.id, {});
      fetchGroupMembers();
    } catch (error) {
      console.log('[Error joining group]', error);
    }
  };

  const renderGroupMember = ({item: member}) => {
    const firstName = `${member.firstName} ${member.lastName}`;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('GroupMemberInfo', {
            userId: member._id,
          });
        }}
        style={[
          userCardStyle.container,
          colorScheme === 'dark' && {
            backgroundColor: '#4C5761',
            borderWidth: 0,
          },
        ]}>
        <View style={userCardStyle.userInfo}>
          {member.upload?.files[0]?.signedURL ? (
            <Avatar
              source={{
                uri: member.upload?.files[0]?.signedURL,
              }}
              rounded
              size={48}
            />
          ) : (
            <Avatar
              size={48}
              rounded
              renderPlaceholderContent={() => <UserIcon />}
            />
          )}
          <View style={{marginLeft: 14}}>
            <Text style={userCardStyle.name}>{firstName}</Text>
            <Text style={userCardStyle.email}>{member.email}</Text>
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
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    fetchGroupMembers();
    navigation.setOptions({
      title: route.params.name,
    });
  }, []);

  const leaveGroup = async () => {
    try {
      if (groupData.leavable) {
        const res = await GroupService.update(route.params.id, {
          leave: true,
        });

        fetchGroupMembers();
      } else {
        throw new Error('You cannot leave group!');
      }
    } catch (error) {
      toast('error', 'Error', error.message);
    }
  };

  const createChatGroup = async () => {
    const members = groupMembers
      .map(e => e._id)
      .filter(e => e !== userData._id);

    const res = await MessageGroupsService.create({
      type: 1,
      participants: [...members],
    });

    const {componentHeader} = MainIcon(res, userData, navigation);

    navigation.navigate('Message', {
      groupId: res._id,
      label: res.label,
      component: componentHeader,
    });
  };

  const renderHeader = () => {
    const isUserInGroup = groupData?.members?.includes(userData._id);
    return (
      <View style={userCardStyle.headerContainer}>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <HeaderBack onPress={() => navigation.goBack()} />
            <View style={{flexDirection: 'row'}}>
              {groupData.private ? null : (
                <TouchableOpacity
                  onPress={() => {
                    if (isUserInGroup) {
                      if (groupData.leavable) {
                        leaveGroup();
                      }
                    } else {
                      joinGroup();
                    }
                  }}
                  style={[
                    userCardStyle.headerButton,
                    colorScheme === 'dark' && {backgroundColor: '#4C5761'},
                  ]}>
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
                    {isUserInGroup ? 'Joined' : 'Join'}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={createChatGroup}
                style={[
                  userCardStyle.headerButton,
                  {marginLeft: 8, paddingHorizontal: 0},
                  colorScheme === 'dark' && {
                    backgroundColor: '#4C5761',
                  },
                ]}>
                <BottomChat
                  fill={colorScheme === 'dark' && Styles.Colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 16}}>
            <Text style={{fontSize: 28, fontFamily: Styles.Fonts.headerBold}}>
              {groupData.name}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <IconFeathers name="user" size={13} style={{marginRight: 6}} />
              <Text style={{fontSize: 13, fontWeight: '400'}}>
                {groupMembers.length}
              </Text>
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
    <View
      style={[
        styles.container,
        userCardStyle.paddingOverride,
        colorScheme === 'dark' && {backgroundColor: '#141C24'},
      ]}>
      {renderHeader()}
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
