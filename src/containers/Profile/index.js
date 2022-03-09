import React, {useState, useEffect, useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Avatar, Button, Icon} from 'react-native-elements';
import dayjs from 'dayjs';

import {PostsList, LoadingIndicator} from '@components';
import {Constants, Styles} from '@common';
import {UserContext} from '@contexts';

import {UsersService, MessageGroupsService} from '@services/apiClient';

import data from './data';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const Profile = ({navigation, route}) => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const {chatForbiden} = useContext(UserContext);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      console.log(route);
      if (!route?.params?.userId) {
        const uId = await AsyncStorageLib.getItem('@userId');
        const res = await UsersService.get(uId);
        setUserData(res);
        setIsLoading(false);
      } else {
        const res = await UsersService.get(route.params.userId);
        setUserData(res);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('[Error loading user data]:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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

  const createMessageGroup = async () => {
    try {
      const res = await MessageGroupsService.create({
        type: 0,
        participants: [route.params.userId],
      });
      console.log(res);
    } catch (error) {
      console.log('[Error creating message group]', error);
    }
  };

  const renderUserInfo = () => {
    return (
      <View style={styles.userInfo}>
        <Text style={styles.userName}>
          {userData.firstName} {userData.lastName}
        </Text>
        <Text style={styles.memberSince}>
          Member Since {dayjs(data.memberSince).format('YYYY')}
        </Text>
        {chatForbiden || route?.params?.hideSendMessage ? null : (
          <Button
            onPress={() => {
              if (route?.params?.userId) {
                createMessageGroup();
              } else {
                navigation.navigate('EditPofileScreen');
              }
            }}
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
        )}
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

    return <PostsList navigation={navigation} data={newDataTest} />;
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

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
