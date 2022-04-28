import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import dayjs from 'dayjs';

import {PostsService} from '@services/apiClient';
import {Styles} from '@common';

import Comments from '../Comments';

import styles from './styles';

const PostDetails = ({navigation, route}) => {
  const width = Dimensions.get('window').width;
  const customStyle = {
    width: width,
    height: 224,
  };
  const resizeModeStyle = {
    resizeMode: 'cover',
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [post, setPost] = useState({});
  const loadPost = async () => {
    try {
      const res = await PostsService.get(route.params.id);
      const images = res?.upload?.files?.map(i => i.signedURL);
      setPost({...res, images: images, postLoaded: true});
      navigation.setOptions({
        headerShown: true,
        headerTitleStyle: {
          alignSelf: 'center',
        },
        headerStyle: {
          backgroundColor: Styles.Colors.topBackground,
        },
        title: `${res.owner.firstName} ${res.owner.lastName}'s post`,
      });
    } catch (error) {
      console.log('[Error loading post details]', error);
    }
  };

  useEffect(() => {
    loadPost();
  }, []);

  const changeActiveIndex = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );

    console.log(slide, nativeEvent);
    if (slide !== activeIndex) {
      setActiveIndex(slide);
    }
  };

  const renderActiveDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {post.images &&
          post.images.map((e, index) => (
            <View
              key={index}
              style={[
                styles.dots,
                index === activeIndex ? null : styles.inactiveStyle,
              ]}
            />
          ))}
      </View>
    );
  };

  const renderPostImages = () => {
    if (post?.images) {
      return (
        <View style={customStyle}>
          <ScrollView
            pagingEnabled
            horizontal={true}
            style={customStyle}
            onScroll={changeActiveIndex}
            showsHorizontalScrollIndicator={false}>
            {post.images &&
              post.images.map((e, index) => (
                <Image
                  key={index}
                  resizeMode="contain"
                  source={{
                    uri: e,
                  }}
                  style={[customStyle, resizeModeStyle]}
                />
              ))}
          </ScrollView>
          {renderActiveDots()}
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderPostImages()}
      <View style={styles.ownerAndTimeInfo}>
        <View style={styles.ownerData}>
          {post?.owner?.upload?.files[0].signedURL ? (
            <Image source={{uri: post?.owner?.upload?.files[0].signedURL}} />
          ) : null}
          <Text
            style={
              styles.ownerName
            }>{`${post?.owner?.firstName} ${post?.owner?.lastName}`}</Text>
        </View>
        <Text style={styles.postedDate}>
          {post.createdAt ? dayjs(post.createdAt).format('MMM D, YYYY') : null}
        </Text>
      </View>
      {/* <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          backgroundColor: Styles.Colors.gold,
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 8,
        }}
        onPress={() => {
          navigation.navigate('Comments', {
            postId: route.params.id,
          });
        }}>
        <Text>Comments</Text>
      </TouchableOpacity> */}
      <Text style={styles.postBody}>{post?.body}</Text>
      <Comments postId={post._id} postLoaded={post.postLoaded} />
    </View>
  );
};

export default PostDetails;
