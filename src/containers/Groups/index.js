import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {MenuItem} from '@components';
import {Styles} from '@common';

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

const Groups = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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
        {MenuItems.map(menuItem => {
          return (
            <MenuItem
              key={menuItem.id}
              onPress={() => {}}
              menuText={menuItem.menuText}
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
