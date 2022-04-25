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

  // ----------------------------

  //const {events, eventsError, eventsLoading, refetch} = useEvents();
  // const [refreshing, setRefreshing] = useState(false);
  // const [user, setUser] = useState(true);
  const [posts, setPosts] = useState({
    isLoading: false,
    data: [],
    page: 1,
    limit: 5,
    total: 10,
  });

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (posts.isLoading) {
      loadPosts();
    }
  }, [posts.isLoading]);

  const loadPosts = async () => {
    try {
      // const {data} = await PostsService.find();
      // setPosts(data);
      // const eventsToShow = await EventService.find({
      //   query: {
      //     start: {
      //       $gte: new Date(),
      //     },
      //   },
      // });
      // setEvents(eventsToShow.data);

      // ----------------------
      if ((posts.page - 1) * 5 > posts.total) {
        return;
      }
      const res = await PostsService.find({
        query: {
          $limit: 5,
          $skip: (posts.page - 1) * 5,
          $sort: { createdAt: -1 }
        },
      });

      const postsData = res.data.map(e => {
        return {
          id: e._id,
          headline: e.title,
          content: e.body,
          img: e.upload?.files,
          owner: e.owner,
          createdAt: e.createdAt,
        };
      });
      setPosts({
        isLoading: false,
        data: [...posts.data, ...postsData],
        total: res.total,
        page: posts.page + 1,
      });
      // const res2 = await PostsService.get(res.data[0]._id);
      // console.log('posts2', res2);
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error loading posts and events home screen]', error);
      setPosts({
        ...posts,
        isLoading: false,
      });
    }
  };

  const handleRefresh = () => {
    //getPostsAndEvents();loadPosts

    // --------

    //refetch({});
    setPosts({
      isLoading: true,
      data: [],
      page: 1,
      limit: 5,
      total: 10,
    });
  };

  const renderPosts = () => {
    return (
      <PostsList
        handleRefresh={handleRefresh}
        headerData={events}
        onEndReached={loadPosts}
        hasMore={posts.data.length < posts.total}
        data={posts.data}
        style={styles.postList}
        navigation={navigation}
      />
    );
  };

  if (posts.isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageBackground}>
        <Image
          source={require('../../assets/Home/white.png')}
          style={styles.headerLogo}
        />
        <Text style={styles.welcomeBack}>
          Welcome Back,{'\n'}
          {userData.firstName} {userData.lastName}
        </Text>
      </View>
      {renderPosts()}
    </View>
  );
};

export default Feed;
