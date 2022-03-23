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

const mockData = [
  {
    id: 1,
    headline: 'Test post 1',
    content: 'Test post 1 content',
    img: [
      {
        fieldname: 'file',
        originalname: 'Screen Shot 2022-01-25 at 4.44.08 PM.png',
        encoding: '7bit',
        mimetype: 'image/png',
        bucket: 'lincoln-club-community-app',
        destination: '',
        filename: '3131f638-7843-4ef9-8c6e-08325aa921eb.png',
        path: '3131f638-7843-4ef9-8c6e-08325aa921eb.png',
        contentType: 'image/png',
        size: 551327,
        uri: 'gs://lincoln-club-community-app/3131f638-7843-4ef9-8c6e-08325aa921eb.png',
        linkUrl:
          'https://storage.googleapis.com/lincoln-club-community-app/3131f638-7843-4ef9-8c6e-08325aa921eb.png',
        selfLink:
          'https://www.googleapis.com/storage/v1/b/lincoln-club-community-app/o/3131f638-7843-4ef9-8c6e-08325aa921eb.png',
        signedURL:
          'https://storage.googleapis.com/lincoln-club-community-app/3131f638-7843-4ef9-8c6e-08325aa921eb.png?GoogleAccessId=lincoln-club-community-app%40frozen-crow.iam.gserviceaccount.com&Expires=1646951961&Signature=JXBGJRYjE9RGguY7v%2FH7timpukaBN92TU2MjopipVA3NIGWmsasvNFoE8H6Pww5WPHGJtifx6qda43MM%2FFnBhOaxg7GBsmP5DOS9V7uG3K4eohypmrrVvAx3ekfC%2FfkZ3sz%2BSN81FiGoy5s9JiaqwQHP%2Br8raUKZl36HzXJd1kj%2F9f8eQbvcNXvCJNGsP2j0rAweITZEwflQAQFM5XjVPiVjFeeQnQiKKrZJAR3k3vgHwg6o1HQI91Dk9ud1j%2F9jt1R%2BqBm%2BXaNGu59rY3sE2YJAp3%2BfyUKVXhuzRKx598nq6U%2FE9VhXeb7eDZID5IB3n5sMrnXXuVt9odvcvhoIHg%3D%3D',
      },
    ],
  },
  {
    id: 2,
    headline: 'Test post 2',
    content: 'Test post 2 content',
    img: [
      {
        fieldname: 'file',
        originalname: 'Screen Shot 2022-01-25 at 4.44.08 PM.png',
        encoding: '7bit',
        mimetype: 'image/png',
        bucket: 'lincoln-club-community-app',
        destination: '',
        filename: '3131f638-7843-4ef9-8c6e-08325aa921eb.png',
        path: '3131f638-7843-4ef9-8c6e-08325aa921eb.png',
        contentType: 'image/png',
        size: 551327,
        uri: 'gs://lincoln-club-community-app/3131f638-7843-4ef9-8c6e-08325aa921eb.png',
        linkUrl:
          'https://storage.googleapis.com/lincoln-club-community-app/3131f638-7843-4ef9-8c6e-08325aa921eb.png',
        selfLink:
          'https://www.googleapis.com/storage/v1/b/lincoln-club-community-app/o/3131f638-7843-4ef9-8c6e-08325aa921eb.png',
        signedURL:
          'https://storage.googleapis.com/lincoln-club-community-app/3131f638-7843-4ef9-8c6e-08325aa921eb.png?GoogleAccessId=lincoln-club-community-app%40frozen-crow.iam.gserviceaccount.com&Expires=1646951961&Signature=JXBGJRYjE9RGguY7v%2FH7timpukaBN92TU2MjopipVA3NIGWmsasvNFoE8H6Pww5WPHGJtifx6qda43MM%2FFnBhOaxg7GBsmP5DOS9V7uG3K4eohypmrrVvAx3ekfC%2FfkZ3sz%2BSN81FiGoy5s9JiaqwQHP%2Br8raUKZl36HzXJd1kj%2F9f8eQbvcNXvCJNGsP2j0rAweITZEwflQAQFM5XjVPiVjFeeQnQiKKrZJAR3k3vgHwg6o1HQI91Dk9ud1j%2F9jt1R%2BqBm%2BXaNGu59rY3sE2YJAp3%2BfyUKVXhuzRKx598nq6U%2FE9VhXeb7eDZID5IB3n5sMrnXXuVt9odvcvhoIHg%3D%3D',
      },
    ],
  },
  {
    id: 3,
    headline: 'Test post 3',
    content: 'Test post 3 content',
    img: [
      {
        fieldname: 'file',
        originalname: 'Screen Shot 2022-01-25 at 4.44.08 PM.png',
        encoding: '7bit',
        mimetype: 'image/png',
        bucket: 'lincoln-club-community-app',
        destination: '',
        filename: '3131f638-7843-4ef9-8c6e-08325aa921eb.png',
        path: '3131f638-7843-4ef9-8c6e-08325aa921eb.png',
        contentType: 'image/png',
        size: 551327,
        uri: 'gs://lincoln-club-community-app/3131f638-7843-4ef9-8c6e-08325aa921eb.png',
        linkUrl:
          'https://storage.googleapis.com/lincoln-club-community-app/3131f638-7843-4ef9-8c6e-08325aa921eb.png',
        selfLink:
          'https://www.googleapis.com/storage/v1/b/lincoln-club-community-app/o/3131f638-7843-4ef9-8c6e-08325aa921eb.png',
        signedURL:
          'https://storage.googleapis.com/lincoln-club-community-app/3131f638-7843-4ef9-8c6e-08325aa921eb.png?GoogleAccessId=lincoln-club-community-app%40frozen-crow.iam.gserviceaccount.com&Expires=1646951961&Signature=JXBGJRYjE9RGguY7v%2FH7timpukaBN92TU2MjopipVA3NIGWmsasvNFoE8H6Pww5WPHGJtifx6qda43MM%2FFnBhOaxg7GBsmP5DOS9V7uG3K4eohypmrrVvAx3ekfC%2FfkZ3sz%2BSN81FiGoy5s9JiaqwQHP%2Br8raUKZl36HzXJd1kj%2F9f8eQbvcNXvCJNGsP2j0rAweITZEwflQAQFM5XjVPiVjFeeQnQiKKrZJAR3k3vgHwg6o1HQI91Dk9ud1j%2F9jt1R%2BqBm%2BXaNGu59rY3sE2YJAp3%2BfyUKVXhuzRKx598nq6U%2FE9VhXeb7eDZID5IB3n5sMrnXXuVt9odvcvhoIHg%3D%3D',
      },
    ],
  },
  {
    id: 4,
    headline: 'Test post 4',
    content: 'Test post 4 content',
    img: [
      {
        fieldname: 'file',
        originalname: 'Screen Shot 2022-01-25 at 4.44.08 PM.png',
        encoding: '7bit',
        mimetype: 'image/png',
        bucket: 'lincoln-club-community-app',
        destination: '',
        filename: '3131f638-7843-4ef9-8c6e-08325aa921eb.png',
        path: '3131f638-7843-4ef9-8c6e-08325aa921eb.png',
        contentType: 'image/png',
        size: 551327,
        uri: 'gs://lincoln-club-community-app/3131f638-7843-4ef9-8c6e-08325aa921eb.png',
        linkUrl:
          'https://storage.googleapis.com/lincoln-club-community-app/3131f638-7843-4ef9-8c6e-08325aa921eb.png',
        selfLink:
          'https://www.googleapis.com/storage/v1/b/lincoln-club-community-app/o/3131f638-7843-4ef9-8c6e-08325aa921eb.png',
        signedURL:
          'https://storage.googleapis.com/lincoln-club-community-app/3131f638-7843-4ef9-8c6e-08325aa921eb.png?GoogleAccessId=lincoln-club-community-app%40frozen-crow.iam.gserviceaccount.com&Expires=1646951961&Signature=JXBGJRYjE9RGguY7v%2FH7timpukaBN92TU2MjopipVA3NIGWmsasvNFoE8H6Pww5WPHGJtifx6qda43MM%2FFnBhOaxg7GBsmP5DOS9V7uG3K4eohypmrrVvAx3ekfC%2FfkZ3sz%2BSN81FiGoy5s9JiaqwQHP%2Br8raUKZl36HzXJd1kj%2F9f8eQbvcNXvCJNGsP2j0rAweITZEwflQAQFM5XjVPiVjFeeQnQiKKrZJAR3k3vgHwg6o1HQI91Dk9ud1j%2F9jt1R%2BqBm%2BXaNGu59rY3sE2YJAp3%2BfyUKVXhuzRKx598nq6U%2FE9VhXeb7eDZID5IB3n5sMrnXXuVt9odvcvhoIHg%3D%3D',
      },
    ],
  },
];

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
        onPress={() => {}}
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
        data={mockData}
        style={style}
        renderItem={renderItem}
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
    color: '#684BA6',
    fontWeight: '700',
    fontSize: 13,
  },
  day: {
    fontWeight: '700',
    fontSize: 18,
  },
  month: {
    fontSize: 12,
    color: '#684BA6',
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
