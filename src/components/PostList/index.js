import React from 'react';
import {
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import dayjs from 'dayjs';

import {PostItem} from '@components';

const PostsList = ({data, navigation, headerData, handleRefresh, style}) => {
  const renderFeaturedPosts = () => {
    return (
      <FlatList
        style={styles.headerList}
        data={headerData}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderFeaturedItem}
      />
    );
  };

  const renderFeaturedItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.featuredItemContainer}
        onPress={() => {
          navigation.navigate('FeedDetails', {
            id: item._id,
          });
        }}>
        <View style={styles.featuredItemTop}>
          <View style={styles.featuredItemTopDate}>
            <Text>{dayjs(item.start).format('DD')}</Text>
            <Text>{dayjs(item.start).format('MMM').toUpperCase()}</Text>
          </View>
          <View style={styles.featuredItemTopTime}>
            <Text style={styles.featuredItemTopTimeText}>
              {dayjs(item.start).format('HH mm A')}
            </Text>
          </View>
        </View>

        <View style={styles.featuredItemBottom}>
          <Text style={styles.featuredItemBottomText}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item: post}) => {
    return (
      <PostItem
        onPress={() =>
          navigation.navigate('PostDetails', {
            id: post.id,
          })
        }
        img={post.img}
        time={post.time}
        content={post.content}
        owner={post.owner}
      />
    );
  };

  const renderList = () => {
    return (
      <FlatList
        ListHeaderComponent={renderFeaturedPosts}
        data={data}
        style={style}
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
    margin: 8,
  },

  featuredItemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    elevation: 3,
    borderColor: '#E6EBF0',
    padding: 12,
    margin: 4,
    minHeight: 100,
  },
  featuredItemTop: {flexDirection: 'row'},
  featuredItemTopDate: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 53,
    height: 53,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E6EBF0',
  },
  featuredItemTopTime: {
    width: 122,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E6EBF0',
    marginLeft: 12,
  },
  featuredItemTopTimeText: {
    color: '#684BA6',
    fontWeight: '700',
    fontSize: 13,
  },

  featuredItemBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  featuredItemBottomText: {
    paddingTop: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default PostsList;
