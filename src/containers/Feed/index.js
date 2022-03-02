import React, {useEffect} from 'react';
import {View} from 'react-native';
import dayjs from 'dayjs';

import Search from '@components/SearchInput';
import EventCard from '@components/EventCard';

import {PostsList} from '@components';
import {useEvents} from '../../hooks';

import styles from './styles';

const Feed = ({navigation}) => {
  const {events, eventsError, eventsLoading, refetch} = useEvents();

  useEffect(() => {
    if (eventsError) {
      // show toast here
    }
  }, [eventsError]);

  const renderPosts = () => {
    const time = dayjs(dayjs().subtract(5, 'minute'));
    const timeFromNow = time.fromNow(); // for testing time ago
    const eventsData = events.map(post => ({
      id: post._id,
      headline: post.title,
      content: post.description,
      time: timeFromNow,
    }));

    return <PostsList data={eventsData} navigation={navigation} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        <EventCard navigation={navigation} />
        <EventCard />
        <EventCard />
      </View>

      <Search />

      {renderPosts()}
    </View>
  );
};

export default Feed;
