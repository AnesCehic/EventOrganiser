import React from 'react';
import {
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  Image,
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
  hideHeaderContent,
  hasMore,
  onEndReached,
  userData,
}) => {
  const renderFeaturedPosts = () => {
    return (
      <View>
        {headerData?.length !== 0 ? (
          <View>
            <Text style={styles.latestUpdate}>Upcoming Events</Text>
            <FlatList
              style={styles.headerList}
              data={headerData}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={renderFeaturedItem}
            />
          </View>
        ) : null}
        <Text style={styles.latestUpdate}>Latest updates</Text>
        <TouchableOpacity
          style={styles.createPost}
          onPress={() => navigation.navigate('CreatePost')}>
          <Image
            source={{uri: userData.avatarImg}}
            style={styles.createPostImage}
          />
          <View style={styles.createPostText}>
            <Text>Create a new post</Text>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require('../../assets/Gallery.png')}
              />
            </View>
          </View>
        </TouchableOpacity>
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
              {dayjs(item.start).format('hh:mm A')}
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
        ListHeaderComponent={hideHeaderContent ? null : renderFeaturedPosts}
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
  createPost: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 9,
    borderColor: Styles.Colors.addPhotoBorder,
    backgroundColor: Styles.Colors.white,
    borderWidth: 1,
  },
  createPostText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    borderRadius: 50,
    backgroundColor: '#F5F6F7',
    padding: 5,
    paddingLeft: 16,
    paddingHorizontal: 8,
  },
  createPostImage: {
    width: 38,
    height: 38,
    marginRight: 6,
    borderRadius: 50,
  },
  imageContainer: {
    backgroundColor: Styles.Colors.white,
    padding: 8,
    borderRadius: 50,
  },
  image: {
    height: 20,
    width: 20,
  },
  userImage: {
    width: 32,
    height: 32,
  },
});

export default PostsList;
