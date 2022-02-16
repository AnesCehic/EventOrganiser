import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Avatar, Button, Icon} from 'react-native-elements';
import dayjs from 'dayjs';

import {PostsList} from '@components';
import {Constants, Styles} from '@common';

import {UsersService} from '@services/apiClient';

import data from './data';

import styles from './styles';

const Profile = ({navigation}) => {
  const renderAvatar = () => {
    return (
      <View style={styles.avatar}>
        <Avatar
          size={Styles.Sizes.avatar}
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
              color={Styles.Colors.primaryBlue}
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
        <TouchableOpacity
          style={[styles.switchContent, styles.switchContentActive]}>
          <Text style={styles.switchContentText}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToPhotosScreen}
          style={styles.switchContent}>
          <Text
            style={[
              styles.switchContentText,
              {color: Styles.Colors.lightGrayText},
            ]}>
            Photos
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const goToPhotosScreen = () => {
    navigation.navigate(Constants.NavigationScreens.ImagesScreen);
  };

  const renderPosts = () => {
    const time = dayjs(dayjs().subtract(5, 'hour'));
    const timeFromNow = time.fromNow(); // for testing time ago
    const newDataTest = data.posts.map(post => ({...post, time: timeFromNow}));

    return <PostsList data={newDataTest} />;
  };

  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}>
      {renderAvatar()}
      {renderUserInfo()}
      {renderSwitch()}
      {renderPosts()}
    </View>
  );
};

export default Profile;
