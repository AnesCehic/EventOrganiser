import React from 'react';
import {View, Text} from 'react-native';
import dayjs from 'dayjs';

import Search from '@components/SearchInput';
import EventCard from '@components/EventCard';

import {PostsList} from '@components';
import data from './data';

import styles from './styles';

const Feed = ({navigation}) => {
  const renderPosts = () => {
    const time = dayjs(dayjs().subtract(5, 'minute'));
    const timeFromNow = time.fromNow(); // for testing time ago
    const newDataTest = data.posts.map(post => ({...post, time: timeFromNow}));

    return <PostsList data={newDataTest} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        <EventCard navigation={navigation} />
        <EventCard />
        <EventCard />
      </View>

      {renderPosts()}

      <Search />
    </View>
  );
};

export default Feed;
