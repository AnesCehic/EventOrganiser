import React from 'react';
import {
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import dayjs from 'dayjs';

import {PostItem} from '@components';
import {Styles} from '@common';

const PostsList = ({
  data,
  navigation,
  headerData,
  handleRefresh,
  style,
  route,
  hasMore,
  onEndReached,
}) => {
  const renderFeaturedPosts = () => {
    return (
      <View>
        <Text style={styles.latestUpdate}>Your picks</Text>
        <FlatList
          style={styles.headerList}
          data={headerData}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={renderFeaturedItem}
        />
        <Text style={styles.latestUpdate}>Latest updates</Text>
      </View>
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
            <Text style={styles.day}>{dayjs(item.start).format('DD')}</Text>
            <Text style={styles.month}>
              {dayjs(item.start).format('MMM').toUpperCase()}
            </Text>
          </View>
          <View style={styles.featuredItemTopTime}>
            <Icon name="ri-time-fill" color="#684BA6" size={20} />
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
        key={post._id}
        onPress={() =>
          navigation.navigate('PostDetails', {
            id: post.id,
          })
        }
        img={post.img}
        time={post.time}
        content={post.content}
        owner={post.owner}
        createdAt={post.createdAt}
      />
    );
  };

  const renderList = () => {
    return (
      <FlatList
        ListHeaderComponent={
          route?.params?.hideListHeader ? null : renderFeaturedPosts
        }
        data={data}
        style={style}
        renderItem={renderItem}
        onEndReached={onEndReached}
        keyExtractor={item => item.id}
        refreshing={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        }
        // onScroll={e => {
        //   const scrollOffset = e.nativeEvent.contentOffset.y;
        //   console.log('scroll off', scrollOffset);
        // }}
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
    backgroundColor: Styles.Colors.darkBgLight,
    borderRadius: 8,
    borderWidth: 1,
    elevation: 3,
    borderColor: '#E6EBF0',
    padding: 12,
    margin: 4,
    minHeight: 100,
  },
  featuredItemTop: {
    flexDirection: 'row',
  },
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
    flexDirection: 'row',
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
    marginLeft: 7,
    color: Styles.Colors.purple,
    fontWeight: '700',
    fontSize: 13,
  },
  day: {
    fontWeight: '700',
    fontSize: 18,
  },
  month: {
    fontSize: 12,
    color: Styles.Colors.purple,
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
  latestUpdate: {
    paddingLeft: 16,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default PostsList;
