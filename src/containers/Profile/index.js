import React, {useState, useEffect, useContext} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {Avatar} from 'react-native-elements';
import dayjs from 'dayjs';

import {
  PostsList,
  LoadingIndicator,
  InfiniteLoader,
  MainIcon,
} from '@components';
import {Styles} from '@common';
import {UserContext} from '@contexts';
import {toast} from '@utils';
import UserIcon from '@assets/ImageComponents/UserIcon';
import {ChatBubblesMsg} from '@assets/SvgIcons';

import {
  UsersService,
  MessageGroupsService,
  PostsService,
} from '@services/apiClient';

import imageData from './imageData';

import styles from './styles';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const Profile = ({navigation, route}) => {
  const {userData: userDataCtx} = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeSwitch, setActiveSwitch] = useState(0);
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(false);
  const [posts, setPosts] = useState({
    data: [],
    total: 0,
    limit: 5,
    page: 1,
  });

  const fetchPosts = async () => {
    try {
      if ((posts.page - 1) * 5 > posts.total) {
        setIsInfiniteLoading(false);
        return;
      }
      const resData = await PostsService.find({
        query: {
          ownerId: userData._id,
          $limit: 5,
          $skip: (posts.page - 1) * 5,
          $sort: {
            createdAt: -1,
          },
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
      setPosts({
        ...posts,
        data: [...posts.data, ...postsData],
        total: resData.total,
        page: posts.page + 1,
      });
      setIsInfiniteLoading(false);
    } catch (error) {
      console.log('[Error loading posts]', error);
    }
  };

  const fetchUserData = async () => {
    try {
      let user;
      if (!route?.params?.userId) {
        user = JSON.parse(await AsyncStorageLib.getItem('@user'));
      } else {
        user = await UsersService.get(route.params.userId);
      }
      setUserData(user);
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error loading user data]:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      fetchUserData();
    }
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [userData]);

  useEffect(() => {
    let refetchPosts = null;
    if (route?.params?.userId) {
      // FIXME (update for otgher users profile)
      return;
    } else {
      refetchPosts = navigation.addListener('focus', () => {
        handleRefresh();
      });
    }

    return refetchPosts;
  }, [navigation]);

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

      const {componentHeader} = MainIcon(res, userDataCtx);

      navigation.navigate('Message', {
        groupId: res._id,
        label: res.label,
        component: componentHeader,
      });
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

  const loadMore = () => {
    setIsInfiniteLoading(true);
  };

  useEffect(() => {
    if (isInfiniteLoading) {
      fetchPosts();
    }
  }, [isInfiniteLoading]);

  const handleRefresh = () => {
    setPosts({
      ...posts,
      data: [],
      total: 0,
      limit: 5,
      page: 1,
    });
    setIsLoading(true);
  };

  const renderPosts = () => {
    return (
      <PostsList
        handleRefresh={handleRefresh}
        onEndReached={loadMore}
        // hasMore
        route={route}
        navigation={navigation}
        data={posts.data}
      />
    );
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
      //navigation.navigate('MessageUserFromProfile');
      createMessageGroup();
    } else {
      navigation.navigate('UserAccountCreatePost');
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const hasMore = (posts.page - 1) * 5 > posts.total;

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
                <ChatBubblesMsg />
                <Text style={styles.topRightImageText}>Message</Text>
              </View>
            ) : (
              <View style={styles.topRightImage}>
                <ChatBubblesMsg />
                <Text style={styles.topRightImageText}>Create Post</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        {/* {renderSwitch()} */}
        {renderPosts()}
        {isInfiniteLoading && !hasMore ? <InfiniteLoader /> : null}
      </View>
    </View>
  );
};

export default Profile;
