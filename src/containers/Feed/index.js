import React from 'react';
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

  const loadPosts = async () => {
    try {
      const res = await PostsService.find();
      console.log('posts', res);
    } catch (error) {
      console.log('[Error loading posts]', error);
    }
  };

  const loadUser = async () => {
    try {
      const user = await AsyncStorageLib.getItem('@user');
      if (typeof user !== "undefined") {
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
    const eventsData = events.map(post => ({
      id: post._id,
      headline: post.title,
      content: post.description,
      time: timeFromNow,
      img: post.upload.files,
    }));
    return (
      <PostsList
        handleRefresh={handleRefresh}
        headerData={events}
        data={eventsData}
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
<<<<<<< HEAD
      <ImageBackground style={{
        height: 250,
        width: '100%',
        backgroundColor: 'lightblue',
      }}
      source={require('../../assets/headerBackground.png')}
      resizeMode='cover'>
        <Text style={{
          fontSize: 28,
          fontWeight: '600',
          paddingLeft: 16,
        }}>Welcome Back {'\n'}{user ? user.firstName : 'Valued Member'}</Text>
=======
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
>>>>>>> master
      </ImageBackground>
      {/* {renderFeaturedPosts()} */}

      {/* <Image style={{backgroundColor: 'black'}} source={require('../../assets/Home/logo.png')} /> */}

      {/* <Search /> */}

      {renderPosts()}
    </View>
  );
};

export default Feed;
