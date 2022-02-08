import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Avatar, Button, Icon} from 'react-native-elements';
import dayjs from 'dayjs';

import PostsList from './PostsList';

import data from './data';

import styles from './styles';

const switchItems = [
  {
    index: 0,
    item: 'Posts',
  },
  {
    index: 1,
    item: 'Photos',
  },
];

const Profile = ({}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderAvatar = () => {
    return (
      <View style={styles.avatar}>
        <Avatar
          size={72}
          rounded
          source={data.avatarImg ? {uri: data.avatarImg} : {}}
        />
      </View>
    );
  };

  const renderUserInfo = () => {
    return (
      <View style={styles.userInfo}>
        <Text style={styles.userName}>
          {data.firstName} {data.lastName}
        </Text>
        <Text style={styles.memberSince}>
          Member Since {dayjs(data.memberSince).format('YYYY')}
        </Text>
        <Button
          title="Send Message"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTitle}
          icon={
            <Icon
              name="message"
              style={styles.btnIcon}
              size={22}
              color="#007FFF"
            />
          }
          iconContainerStyle={styles.btnIcon}
        />
      </View>
    );
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
                  {color: index !== activeIndex ? '#A7B0C0' : null},
                ]}>
                {switchItem.item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderPosts = () => {
    const time = dayjs(dayjs().subtract(5, 'hour'));
    const timeFromNow = time.fromNow(); // for testing time ago
    const newDataTest = data.posts.map(post => ({...post, time: timeFromNow}));

    return <PostsList data={newDataTest} />;
  };

  const renderPhotos = () => {
    return <Text>Photos</Text>;
  };

  const renderContent = () => {
    if (activeIndex === 0) {
      return renderPosts();
    }
    if (activeIndex === 1) {
      return renderPhotos();
    }
  };

  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}>
      {renderAvatar()}
      {renderUserInfo()}
      {renderSwitch()}
      {renderContent()}
    </View>
  );
};

export default Profile;
