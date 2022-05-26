import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {LoadingIndicator} from '@components';
import {Styles} from '@common';
import {GroupService} from '@services/apiClient';
import {toast} from '@utils';
import {UserContext} from '@contexts';
import {Grid} from '@assets/SvgIcons';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

// const switchItems = [
//   {
//     index: 0,
//     item: 'My Groups',
//   },
//   {
//     index: 1,
//     item: 'All Groups',
//   },
// ];

// Add menuScreen from Constants.NavigationScreens when ready

const Groups = ({navigation}) => {
  const colorScheme = useColorScheme();
  const {userData} = useContext(UserContext);
  // const [activeIndex, setActiveIndex] = useState(1);
  // const [isAllGroupsSelected, setIsAllGroupsSelected] = useState(false);
  const [myGroups, setMyGroups] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(10);

  const fetchGroupsCombined = async () => {
    setIsLoading(true);
    await fetchJoinedGroups();
    await fetchGroupsAll();
    setIsLoading(false);
  };

  useEffect(() => {
    setGroups([]);
    fetchGroupsCombined();

    const refetchGroups = navigation.addListener('focus', () => {
      fetchGroupsCombined();
    });

    return refetchGroups;
  }, [navigation]);

  const fetchJoinedGroups = async () => {
    try {
      const res = await GroupService.find({
        query: {
          members: userData._id,
        },
      });
      setMyGroups([...res.data]);
    } catch (error) {
      console.log('[Error loading my groups]', error);
    }
  };

  const fetchGroupsAll = async () => {
    // const userId = await AsyncStorageLib.getItem('@userId');
    try {
      // setIsLoading(true);
      if (total < limit) {
        return;
      }
      const res = await GroupService.find({
        query: {
          $limit: limit,
          $skip: skip,
        },
      });
      setTotal(res.total);
      setSkip(limit);
      const limitCalc = limit * 2 > res.total ? res.total : limit * 2;
      setLimit(limitCalc);
      // const {data: personalGroups} = await GroupService.find({
      //   query: {
      //     members: userId,
      //   },
      // });

      // change this line to personalGroups
      // setMyGroups([...myGroups, ...res.data]);
      setGroups([...groups, ...res.data]);
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error fetching all groups]', error);
    } finally {
      // setIsLoading(false);
    }
  };

  const navigateToGroupDetails = (id, name) => {
    navigation.navigate('GroupMembers', {
      id,
      name,
    });
  };

  const renderGroup = ({item}) => {
    return (
      <View
        style={[
          styles.groupContainer,
          colorScheme === 'dark' && {backgroundColor: Styles.Colors.darkBgDark},
        ]}>
        <View>
          <Text style={styles.groupName}>{item.name}</Text>
          <Text style={styles.groupMembers}>
            <Icon name={'user'} size={14} style={styles.userIcon} />
            {item.members.length}
          </Text>
        </View>

        <TouchableOpacity
          disabled={item.private}
          style={[
            styles.joinGroupButton,
            item.private && styles.privateOpacity,
          ]}
          onPress={() => navigateToGroupDetails(item._id, item.name)}>
          <Text style={styles.joinGroupText}>Join group</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // const renderSwitch = () => {
  //   return (
  //     <View style={styles.switchContentContainer}>
  //       {switchItems.map((switchItem, index) => {
  //         const key = switchItem.index;
  //         return (
  //           <TouchableOpacity
  //             key={key}
  //             onPress={() => setActiveIndex(index)}
  //             style={[
  //               styles.switchContent,
  //               index === activeIndex ? styles.switchContentActive : null,
  //             ]}>
  //             <Text
  //               style={[
  //                 styles.switchContentText,
  //                 // eslint-disable-next-line react-native/no-inline-styles
  //                 {
  //                   color:
  //                     index !== activeIndex
  //                       ? Styles.Colors.lightGrayText
  //                       : null,
  //                 },
  //               ]}>
  //               {switchItem.item}
  //             </Text>
  //           </TouchableOpacity>
  //         );
  //       })}
  //     </View>
  //   );
  // };

  const renderMyGroupInfo = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.myGroupInfo,
          colorScheme === 'dark' && {backgroundColor: Styles.Colors.darkBgDark},
        ]}
        onPress={() => navigateToGroupDetails(item._id, item.name)}>
        <View
          style={[
            styles.halfContainer,
            {
              backgroundColor: '#F5F6F7',
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
            },
            colorScheme === 'dark' && {backgroundColor: '#0A121A'},
          ]}
        />
        <View style={[styles.halfContainer, styles.myGroupData]}>
          <View style={styles.groupNameLogo}>
            <Text
              style={[
                {
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontSize: 40,
                  height: '100%',
                  width: '100%',
                },
                colorScheme === 'dark' && {color: Styles.Colors.black},
              ]}>
              {item.name[0]}
            </Text>
          </View>
          <Text
            style={[
              styles.myGroupName,
              colorScheme === 'dark' && {color: Styles.Colors.white},
            ]}>
            {item.name.substring(0, 15)}
            {item.name.length > 15 ? '...' : ''}
          </Text>
          <Text
            style={[
              {textAlign: 'center'},
              colorScheme === 'dark' && {color: Styles.Colors.white},
            ]}>
            <Icon name={'user'} size={14} style={styles.userIcon} />
            {item.members.length} Members
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderMyGroups = () => {
    return (
      <View>
        <FlatList
          data={myGroups}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderMyGroupInfo}
        />
      </View>
    );
  };

  const loadMore = () => {
    fetchGroupsAll();
  };

  const renderListHeader = () => {
    return (
      <View>
        {myGroups.length !== 0 ? (
          <Text style={[styles.allGroupsText, {color: Styles.Colors.white}]}>
            My groups
          </Text>
        ) : null}
        <View>{myGroups.length !== 0 ? renderMyGroups() : null}</View>
        <Text
          style={[
            styles.allGroupsText,
            colorScheme === 'dark' && {color: Styles.Colors.white},
          ]}>
          All groups
        </Text>
      </View>
    );
  };

  const renderGroups = () => {
    return (
      <View>
        <FlatList
          numColumns={2}
          ListHeaderComponent={renderListHeader}
          data={groups}
          onEndReached={loadMore}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={renderMyGroupInfo}
        />
      </View>
    );
  };

  // const renderAllGroups = () => {
  //   return <Text>All Groups</Text>;
  // };

  // const renderContent = () => {
  //   // if (activeIndex === 0) {
  //   //   return renderMyGroups();
  //   // }
  //   // if (activeIndex === 1) {
  //   //   return renderAllGroups();
  //   // }
  //   // return null;

  //   if (isLoading) {
  //     return <LoadingIndicator />;
  //   }

  //   return ();
  // };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View
      style={[
        styles.container,
        colorScheme === 'dark' && {
          backgroundColor: '#4C5761',
        },
      ]}>
      <View
        style={[
          styles.topImage,
          colorScheme === 'dark' && {
            backgroundColor: Styles.Colors.headerBackgroundDark,
          },
        ]}>
        <Text style={styles.headerText}>
          <Grid color={colorScheme === 'dark' ? '#b5b5b5' : null} />
          <Text> </Text>
          <Text style={{marginLeft: 20}}>Groups</Text>
        </Text>
      </View>
      {/* {renderSwitch()} */}
      <View
        style={{
          marginTop: -90,
          flex: 1,
        }}>
        {renderGroups()}
      </View>
    </View>
  );
};

export default Groups;
