import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import dayjs from 'dayjs';

import Search from '@components/SearchInput';

import {PostsList, LoadingIndicator} from '@components';
import {useEvents} from '../../hooks';

import {PostsService} from '../../services/apiClient';

import styles from './styles';

const Feed = ({navigation}) => {
  const {events, eventsError, eventsLoading, refetch} = useEvents();

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
      <ImageBackground style={{
        height: 250,
        width: '100%',
        backgroundColor: 'lightblue',
      }}
      source={require('../../assets/headerBackground.png')}
      resizeMode='cover'>
        <Text style={{
          fontSize: 28,
          fontWeight: '800',
          fontFamily: 'serif',
          color: '#fff',
          paddingLeft: 30,
          paddingTop: 30
        }}>Welcome Back {'\n'}Anes</Text>
      </ImageBackground>
      {/* {renderFeaturedPosts()} */}

      {/* <Image style={{backgroundColor: 'black'}} source={require('../../assets/Home/logo.png')} /> */}

      {/* <Search /> */}

      {renderPosts()}
    </View>
  );
};

export default Feed;
