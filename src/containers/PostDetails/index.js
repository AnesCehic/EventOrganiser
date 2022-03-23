import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, Dimensions} from 'react-native';
import dayjs from 'dayjs';

import {PostsService} from '@services/apiClient';
import {Styles} from '@common';

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
      console.log(res);
      const images = res.upload.files.map(i => i.signedURL);
      setPost({...res, images: images});
      navigation.setOptions({
        headerShown: true,
        headerTitleStyle: {
          alignSelf: 'center',
        },
        headerStyle: {
          backgroundColor: Styles.Colors.gold,
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

  return (
    <View style={styles.container}>
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
      <View style={styles.ownerAndTimeInfo}>
        <View style={styles.ownerData}>
          <Image source={require('../../assets/data.png')} />
          <Text
            style={
              styles.ownerName
            }>{`${post?.owner?.firstName} ${post?.owner?.lastName}`}</Text>
        </View>
        <Text>{post.createdAt ? dayjs(post.createdAt).fromNow() : null}</Text>
      </View>
      <Text style={styles.postBody}>{post?.body}</Text>
    </View>
  );
};

export default PostDetails;
