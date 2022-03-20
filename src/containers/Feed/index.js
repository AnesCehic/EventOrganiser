import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import dayjs from 'dayjs';

import Search from '@components/SearchInput';

import {PostsList, LoadingIndicator} from '@components';
import {useEvents} from '../../hooks';

import {PostsService} from '../../services/apiClient';

import AsyncStorageLib from '@react-native-async-storage/async-storage';
import styles from './styles';

const Feed = ({navigation}) => {
  const {events, eventsError, eventsLoading, refetch} = useEvents();
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState(true);
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    try {
      const {data} = await PostsService.find();
      const postsData = data.map(e => {
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
      // const res2 = await PostsService.get(res.data[0]._id);
      // console.log('posts2', res2);
    } catch (error) {
      console.log('[Error loading posts]', error);
    }
  };

  const loadUser = async () => {
    try {
      const user = await AsyncStorageLib.getItem('@user');
      if (typeof user !== 'undefined') {
        setUser(JSON.parse(user));
      } else {
        setUser({firstName: 'Valued Member'});
      }
    } catch (e) {
      setUser({firstName: 'Valued Member'});
    }
  };

  useEffect(() => {
    loadUser();
    loadPosts();
    console.log(events);
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
    return (
      <PostsList
        handleRefresh={handleRefresh}
        headerData={events}
        data={posts}
        style={{
          marginTop: -50,
        }}
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
        style={{
          justifyContent: 'center',
          height: 250,
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
          }}>
          Welcome Back {'\n'}Anes
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
