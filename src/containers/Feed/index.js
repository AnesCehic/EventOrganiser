import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import dayjs from 'dayjs';

import Search from '@components/SearchInput';

import {PostsList, LoadingIndicator} from '@components';
import {useEvents} from '../../hooks';

import {PostsService} from '../../services/apiClient';
import {UserContext} from '@contexts';
import {Styles} from '@common';

import AsyncStorageLib from '@react-native-async-storage/async-storage';
import styles from './styles';

const Feed = ({navigation}) => {
  const {userData} = useContext(UserContext);
  const {events, eventsError, eventsLoading, refetch} = useEvents();
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState(true);
  const [posts, setPosts] = useState(null);

  const loadPosts = async () => {
    try {
      await PostsService.find();
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
  };

  const renderPosts = () => {
    const time = dayjs(dayjs().subtract(5, 'minute'));
    const timeFromNow = time.fromNow(); // for testing time ago
    const eventsData = events.map(post => ({
      id: post._id,
      headline: post.title,
      content: post.description,
      time: timeFromNow,
      img: post.upload.files,
    }));
    return (
      <View
        style={{
          marginTop: -70,
        }}>
        <Text
          style={{
            color: '#f2f2f2',
            fontSize: 14,
            fontWeight: '600',
            marginLeft: 16,
          }}>
          Your Picks
        </Text>
        <PostsList
          handleRefresh={handleRefresh}
          headerData={events}
          data={eventsData}
          navigation={navigation}
        />
      </View>
    );
  };

  if (eventsLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{
          justifyContent: 'center',
          height: 300,
          width: '100%',
          backgroundColor: 'lightblue',
        }}
        source={require('../../assets/headerBackground.png')}
        resizeMode="cover">
        <Text
          style={{
            fontSize: 28,
            fontWeight: '600',
            paddingLeft: 16,
            color: '#fff',
          }}>
          Welcome Back {'\n'}
          {userData.firstName}
        </Text>
      </ImageBackground>
      {/* {renderFeaturedPosts()} */}

      {/* <Image style={{backgroundColor: 'black'}} source={require('../../assets/Home/logo.png')} /> */}

      {/* <Search /> */}

      {renderPosts()}
    </View>
  );
};

export default Feed;
