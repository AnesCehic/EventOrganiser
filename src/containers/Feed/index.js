import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image} from 'react-native';

import {PostsList, LoadingIndicator, InfiniteLoader} from '@components';
import {UserContext} from '@contexts';
import SvgComponent from './LincolnImage';

import {EventService, PostsService} from '@services/apiClient';
import {toast} from '@utils';

import styles from './styles';
import dayjs from 'dayjs';

const Feed = ({navigation}) => {
  const {userData} = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [infiniteScrollLoader, setInfiniteScrollLoader] = useState(false);

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
    const focusEvent = navigation.addListener('focus', () => {
      handleRefresh();
    });

    return focusEvent;
  }, [navigation]);

  useEffect(() => {
    if (posts.isLoading) {
      loadPosts();
    }
  }, [posts.isLoading]);

  const loadPosts = async () => {
    try {
      const monthLte = dayjs().add(30, 'day').format();
      const eventsToShow = await EventService.find({
        query: {
          start: {
            $gte: new Date(),
            $lte: monthLte,
          },
        },
      });
      setEvents(eventsToShow.data);

      // ----------------------
      if ((posts.page - 1) * 5 > posts.total) {
        setInfiniteScrollLoader(false);
        return;
      }
      const res = await PostsService.find({
        query: {
          $limit: 5,
          $skip: (posts.page - 1) * 5,
          $sort: {createdAt: -1},
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
      setInfiniteScrollLoader(false);
    } catch (error) {
      toast('error', 'Error', error.message);
      console.log('[Error loading posts and events home screen]', error);
      setPosts({
        ...posts,
        isLoading: false,
      });
    }
  };

  const loadPostsBefore = () => {
    setInfiniteScrollLoader(true);
  };

  useEffect(() => {
    if (infiniteScrollLoader) {
      loadPosts();
    }
  }, [infiniteScrollLoader]);

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
        onEndReached={loadPostsBefore}
        hasMore={posts.data.length < posts.total}
        data={posts.data}
        style={styles.postList}
        navigation={navigation}
        userData={userData}
      />
    );
  };

  if (posts.isLoading) {
    return <LoadingIndicator />;
  }

  const hasMore = (posts.page - 1) * 5 < posts.total;

  return (
    <View style={styles.container}>
      <View style={styles.imageBackground}>
        <Image
          source={require('../../assets/Home/white.png')}
          style={styles.headerLogo}
        />
        <Text style={styles.welcomeBack}>
          Welcome back,{'\n'}
          {userData.firstName} {userData.lastName}
        </Text>
        <SvgComponent
          style={{position: 'absolute', top: 0, right: 0, height: '100%'}}
        />
      </View>
      <View style={{flex: 1}}>{renderPosts()}</View>
      {infiniteScrollLoader && hasMore ? <InfiniteLoader /> : null}
    </View>
  );
};

export default Feed;
