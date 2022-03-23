import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';
import dayjs from 'dayjs';

import Search from '@components/SearchInput';

import {PostsList, LoadingIndicator} from '@components';
import {useEvents} from '../../hooks';

import {PostsService} from '../../services/apiClient';
import {UserContext} from '@contexts';

import AsyncStorageLib from '@react-native-async-storage/async-storage';
import styles from './styles';

const Feed = ({navigation}) => {
  const {userData} = useContext(UserContext);
  const {events, eventsError, eventsLoading, refetch} = useEvents();
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState(true);
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    try {
      const {data} = await PostsService.find();
      console.log(data);
      const postsData = data.map(e => {
        console.log(e.owner);
        return {
          id: e._id,
          headline: e.title,
          content: e.body,
          img: e.upload?.files,
          owner: e.owner,
          createdAt: e.createdAt,
        };
      });
      setPosts(postsData);
      // const res2 = await PostsService.get(res.data[0]._id);
      // console.log('posts2', res2);
    } catch (error) {
      console.log('[Error loading posts]', error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (refreshing) {
      setRefreshing(false);
    }
  }, [refreshing]);

  const handleRefresh = () => {
    refetch({});
    loadPosts();
  };

  const renderPosts = () => {
    return (
      <PostsList
        handleRefresh={handleRefresh}
        headerData={events}
        data={posts}
        style={styles.postList}
        navigation={navigation}
      />
    );
  };

  if (eventsLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../assets/headerBackground.png')}
        resizeMode="cover">
        <Image
          source={require('../../assets/Home/white.png')}
          style={styles.headerLogo}
        />
        <Text style={styles.welcomeBack}>
          Welcome Back,{'\n'}
          {userData.firstName}
        </Text>
      </ImageBackground>
      {renderPosts()}
    </View>
  );
};

export default Feed;
