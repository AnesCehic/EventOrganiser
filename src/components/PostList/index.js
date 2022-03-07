import React from 'react';
import {FlatList, StyleSheet, RefreshControl, Text} from 'react-native';

import {PostItem} from '@components';
import EventCard from '@components/EventCard';

const PostsList = ({data, navigation, headerData, handleRefresh}) => {
  const renderFeaturedPosts = () => {
    return (
      <FlatList
        style={styles.headerList}
        data={headerData}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={() => <EventCard navigation={navigation} />}
      />
    );
  };

  const renderItem = ({item: post}) => {
    return (
      <PostItem
        onPress={() => {
          navigation.navigate('FeedDetails', {
            id: post.id,
          });
        }}
        img={post.img}
        time={post.time}
        headline={post.headline}
        content={post.content}
      />
    );
  };

  const renderList = () => {
    return (
      <FlatList
        ListHeaderComponent={renderFeaturedPosts}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshing={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        }
      />
    );
  };

  return renderList();
};

const styles = StyleSheet.create({
  headerList: {
    maxHeight: 124,
    margin: 8,
  },
});

export default PostsList;
