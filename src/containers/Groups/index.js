import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {MenuItem, LoadingIndicator} from '@components';
import {Styles} from '@common';
import {GroupService} from '@services/apiClient';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const switchItems = [
  {
    index: 0,
    item: 'My Groups',
  },
  {
    index: 1,
    item: 'All Groups',
  },
];

// Add menuScreen from Constants.NavigationScreens when ready

const Groups = ({navigation}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAllGroupsSelected, setIsAllGroupsSelected] = useState(false);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setGroups([]);
    if (activeIndex === 0) {
      fetchGroups();
    }

    if (activeIndex === 1) {
      fetchGroupsAll();
    }
  }, [activeIndex]);

  const fetchGroups = async () => {
    const userId = await AsyncStorageLib.getItem('@userId');
    console.log(userId);
    try {
      setIsLoading(true);
      const {data} = await GroupService.find({
        query: {
          members: userId,
        },
      });
      console.log(data);
      setGroups(data);
    } catch (error) {
      console.log('[Error get groups]', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGroupsAll = async () => {
    try {
      setIsLoading(true);
      const {data} = await GroupService.find();
      console.log('res', data);
      setGroups(data);
    } catch (error) {
      console.log('[Error fetching all groups]', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSwitch = () => {
    return (
      <View style={styles.switchContentContainer}>
        {switchItems.map((switchItem, index) => {
          const key = switchItem.index;
          return (
            <TouchableOpacity
              key={key}
              onPress={() => setActiveIndex(index)}
              style={[
                styles.switchContent,
                index === activeIndex ? styles.switchContentActive : null,
              ]}>
              <Text
                style={[
                  styles.switchContentText,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    color:
                      index !== activeIndex
                        ? Styles.Colors.lightGrayText
                        : null,
                  },
                ]}>
                {switchItem.item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderGroups = () => {
    return (
      <View style={styles.menu}>
        {groups.map(menuItem => {
          return (
            <MenuItem
              key={menuItem._id}
              groupId={menuItem._id}
              onPress={() => {
                navigation.navigate('GroupMembers', {
                  id: menuItem._id,
                });
              }}
              menuText={menuItem.name}
            />
          );
        })}
      </View>
    );
  };

  const renderAllGroups = () => {
    return <Text>All Groups</Text>;
  };

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
      {renderSwitch()}
      {renderContent()}
    </View>
  );
};

export default Groups;
