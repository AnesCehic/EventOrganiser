import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';

import {PostsList, LoadingIndicator} from '@components';
import {UserContext} from '@contexts';

import {EventService, PostsService} from '@services/apiClient';
import {toast} from '@utils';

import styles from './styles';

const Feed = ({navigation}) => {
  const {userData} = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPostsAndEvents();
  }, []);

  const getPostsAndEvents = async () => {
    try {
      setIsLoading(true);
      const {data} = await PostsService.find();
      setPosts(data);
      const eventsToShow = await EventService.find({
        query: {
          start: {
            $gte: new Date(),
          },
        },
      });
      setEvents(eventsToShow.data);
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error loading posts and events home screen]', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    getPostsAndEvents();
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

  if (isLoading) {
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
          {userData.firstName} {userData.lastName}
        </Text>
      </ImageBackground>
      {renderPosts()}
    </View>
  );
};

export default Feed;
