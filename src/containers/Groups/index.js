import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {MenuItem} from '@components';
import {Styles} from '@common';
import {GroupService} from '@services/apiClient';

import styles from './styles';

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
const MenuItems = [
  {
    id: 1,
    menuText: 'Members',
    menuScreen: null,
  },
  {
    id: 2,
    menuText: 'Gold Members',
    menuScreen: null,
  },
  {
    id: 3,
    menuText: 'Donors',
    menuScreen: null,
  },
];

const Groups = ({navigation}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const {data} = await GroupService.find();
      setGroups(data);
    } catch (error) {
      console.log('[Error get groups]', error);
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

  const renderMyGroups = () => {
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
    if (activeIndex === 0) {
      return renderMyGroups();
    }
    if (activeIndex === 1) {
      return renderAllGroups();
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderSwitch()}
      {renderContent()}
    </View>
  );
};

export default Groups;
