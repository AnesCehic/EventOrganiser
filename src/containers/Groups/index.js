import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {LoadingIndicator} from '@components';
// import {Styles} from '@common';
import {GroupService} from '@services/apiClient';
import {toast} from '@utils';

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
  // const [activeIndex, setActiveIndex] = useState(1);
  // const [isAllGroupsSelected, setIsAllGroupsSelected] = useState(false);
  const [myGroups, setMyGroups] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setGroups([]);
    fetchGroupsAll();
  }, []);

  const fetchGroupsAll = async () => {
    const userId = await AsyncStorageLib.getItem('@userId');
    try {
      setIsLoading(true);
      const {data} = await GroupService.find();
      console.log(data);
      const {data: personalGroups} = await GroupService.find({
        query: {
          members: userId,
        },
      });

      // change this line to personalGroups
      setMyGroups(data);
      setGroups(data);
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error fetching all groups]', error);
    } finally {
      setIsLoading(false);
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
      <View style={styles.groupContainer}>
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
        style={styles.myGroupInfo}
        onPress={() => navigateToGroupDetails(item._id, item.name)}>
        <View style={styles.halfContainer} />
        <View style={[styles.halfContainer, styles.myGroupData]}>
          <Text style={styles.groupNameLogo}>{item.name[0]}</Text>
          <Text style={styles.myGroupName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderMyGroups = () => {
    return (
      <View>
        <FlatList
          data={groups}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderMyGroupInfo}
        />
      </View>
    );
  };

  const renderListHeader = () => {
    return (
      <View>
        {myGroups.length !== 0 ? (
          <Text style={styles.allGroupsText}>My groups</Text>
        ) : null}
        {myGroups.length !== 0 ? renderMyGroups() : null}
        <Text style={styles.allGroupsText}>All groups</Text>
      </View>
    );
  };

  const renderGroups = () => {
    return (
      <View>
        <FlatList
          ListHeaderComponent={renderListHeader}
          data={groups}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={renderGroup}
        />
      </View>
    );
  };

  // const renderAllGroups = () => {
  //   return <Text>All Groups</Text>;
  // };

  const renderContent = () => {
    // if (activeIndex === 0) {
    //   return renderMyGroups();
    // }
    // if (activeIndex === 1) {
    //   return renderAllGroups();
    // }
    // return null;

    if (isLoading) {
      return <LoadingIndicator />;
    }

    return renderGroups();
  };

  return (
    <View style={styles.container}>
      {/* {renderSwitch()} */}
      {renderContent()}
    </View>
  );
};

export default Groups;
