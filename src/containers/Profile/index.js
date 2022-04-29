import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {Avatar} from 'react-native-elements';
import dayjs from 'dayjs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {PostsList, LoadingIndicator} from '@components';
import {Styles} from '@common';
import {toast} from '@utils';
import UserIcon from '@assets/ImageComponents/UserIcon';

import {
  UsersService,
  MessageGroupsService,
  PostsService,
} from '@services/apiClient';

import imageData from './imageData';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const Profile = ({navigation, route}) => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeSwitch, setActiveSwitch] = useState(0);
  const [posts, setPosts] = useState([]);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      let user;
      if (!route?.params?.userId) {
        user = JSON.parse(await AsyncStorageLib.getItem('@user'));
      } else {
        user = await UsersService.get(route.params.userId);
      }
      setUserData(user);
      const resData = await PostsService.find({
        query: {
          ownerId: user._id,
        },
      });
      const postsData = resData.data.map(e => {
        return {
          id: e._id,
          headline: e.title,
          content: e.body,
          img: e.upload?.files,
          owner: e.owner,
        };
      });
      setPosts(postsData);
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error loading user data]:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const renderAvatar = () => {
    if (userData.upload?.files[0].signedURL) {
      return (
        <Avatar
          size={140}
          rounded
          source={{uri: userData.upload?.files[0].signedURL}}
          containerStyle={styles.avatar}
        />
      );
    } else {
      return (
        <Avatar
          size={140}
          rounded
          renderPlaceholderContent={() => <UserIcon />}
          containerStyle={styles.avatar}
        />
      );
    }
  };

  const createMessageGroup = async () => {
    try {
      const res = await MessageGroupsService.create({
        type: 0,
        participants: [route.params.userId],
      });
      navigation.dispatch(
        StackActions.push('Messages', {
          groupId: res._id,
        }),
      );
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
          Member Since {dayjs(userData.createdAt).format('YYYY')} ·{' '}
          {userData.email}
        </Text>
      </View>
    );
  };

  const renderSwitch = () => {
    return (
      <View style={styles.switchContentContainer}>
        <TouchableOpacity
          style={[styles.switchContent, styles.switchContentActive]}
          onPress={() => {
            setActiveSwitch(0);
          }}>
          <Text
            style={[
              styles.switchContentText,
              {
                color:
                  activeSwitch === 0 ? '#000' : Styles.Colors.lightGrayText,
              },
            ]}>
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveSwitch(1);
          }}
          style={styles.switchContent}>
          <Text
            style={[
              styles.switchContentText,
              {
                color:
                  activeSwitch === 1 ? '#000' : Styles.Colors.lightGrayText,
              },
            ]}>
            Photos
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderPosts = () => {
    return <PostsList route={route} navigation={navigation} data={posts} />;
  };

  const renderImages = () => {
    return (
      <ScrollView contentContainerStyle={styles.imagesContainer}>
        {imageData.map((image, index) => {
          const nthChild = index + 1;
          let width;
          let height = 128;
          if (nthChild % 1 === 0) {
            width = '33%';
          }
          if (nthChild % 2 === 0) {
            width = '66%';
          }
          if (nthChild % 3 === 0) {
            width = '100%';
            height = 198;
          }
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={image.id}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{padding: 5, width, height}}>
              <Image
                resizeMode="cover"
                style={styles.imageItem}
                source={{uri: image.url}}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  const renderContent = () => {
    if (activeSwitch === 0) {
      return renderPosts();
    }
    if (activeSwitch === 1) {
      return renderImages();
    }
  };

  const goToEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };

  const redirectToAction = () => {
    if (route?.params?.userId) {
    } else {
      navigation.navigate('Feed', {
        screen: 'CreatePost',
      });
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topImage} />
      <View style={styles.contentContainer}>
        <View style={styles.userWrapper}>
          <View>
            {renderAvatar()}
            {renderUserInfo()}
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 0,
              right: 20,
            }}
            onPress={redirectToAction}>
            {route?.params?.userId ? (
              <View style={styles.topRightImage}>
                <Ionicons name={'chatbubbles-outline'} size={24} />
                <Text style={styles.topRightImageText}>Message</Text>
              </View>
            ) : (
              <View style={styles.topRightImage}>
                <Ionicons name={'chatbubbles-outline'} size={24} />
                <Text style={styles.topRightImageText}>CreatePost</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        {/* {renderSwitch()} */}
        {renderContent()}
      </View>
    </View>
  );
};

export default Profile;
