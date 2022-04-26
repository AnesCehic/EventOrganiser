import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {Avatar, Button, Icon} from 'react-native-elements';
import dayjs from 'dayjs';

import {PostsList, LoadingIndicator} from '@components';
import {Constants, Styles} from '@common';
import {UserContext} from '@contexts';
import {toast} from '@utils';

import {
  UsersService,
  MessageGroupsService,
  PostsService,
} from '@services/apiClient';

import data from './data';
import imageData from './imageData';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const Profile = ({navigation, route}) => {
  const {userData, setUserData} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSwitch, setActiveSwitch] = useState(0);
  const {chatForbiden} = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const {allowMessaging} = useContext(UserContext);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      let user;
      if (!route?.params?.userId) {
        user = JSON.parse(await AsyncStorageLib.getItem('@user'));
      } else {
        user = await UsersService.get(route.params.userId);
      }
      console.log('This returns the user:', user);
      setUserData(user);
      console.log('This does not:', userData);
      console.log('wtf...');
      const resData = await PostsService.find({
        query: {
          ownerId: user._id,
        },
      });
      console.log(resData);
      const postsData = resData.data.map(e => {
        console.log(e.owner);
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
    return (
      <Avatar
        size={140}
        rounded
        source={{uri: userData.avatarImg}}
        containerStyle={styles.avatar}
      />
    );
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
    const time = dayjs(dayjs().subtract(5, 'hour'));
    const timeFromNow = time.fromNow(); // for testing time ago

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
          <Icon
            name="settings"
            color="#fff"
            size={30}
            style={styles.settingsIcon}
            onPress={goToEditProfile}
          />
        </View>
        {/* {renderSwitch()} */}
        {renderContent()}
      </View>
    </View>
  );
};

export default Profile;
