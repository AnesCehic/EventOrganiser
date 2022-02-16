import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import dayjs from 'dayjs';

import Search from '@components/SearchInput';
import EventCard from '@components/EventCard';

import {EventService} from '../../services/apiClient';

import {PostsList} from '@components';

import styles from './styles';

const Feed = ({navigation}) => {
  const [events, setEvents] = useState([]);
  const renderPosts = () => {
    const time = dayjs(dayjs().subtract(5, 'minute'));
    const timeFromNow = time.fromNow(); // for testing time ago
    const eventsData = events.map(post => ({
      id: post._id,
      headline: post.title,
      content: post.description,
      time: timeFromNow,
    }));

    return <PostsList data={eventsData} />;
  };

  useEffect(() => {
    EventService.find()
      .then(res => {
        setEvents(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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
