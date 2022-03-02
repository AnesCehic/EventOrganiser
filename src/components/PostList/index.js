import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {PostItem} from '@components';

const PostsList = ({data, navigation}) => {
  const renderItem = ({item: post}) => {
    const {navigate} = navigation;
    return (
      <PostItem
        onPress={() => {
          navigate('FeedDetails', {
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
        style={styles.postsList}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshing={false}
      />
    );
  };

  return renderList();
};

const styles = StyleSheet.create({
  postsList: {
    marginTop: 20,
  },
});

export default PostsList;
