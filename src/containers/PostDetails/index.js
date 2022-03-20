import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';

import {PostsService} from '@services/apiClient';
import {Styles} from '@common';

import styles from './styles';

const PostDetails = ({navigation, route}) => {
  const [post, setPost] = useState(null);
  const loadPost = async () => {
    try {
      const res = await PostsService.get(route.params.id);
      console.log(res);
      setPost(res);
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

  return (
    <View style={styles.container}>
      <View style={styles.imageGallery}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{
            uri: post?.upload.files[0].signedURL,
          }}
        />
      </View>
      <View style={styles.ownerAndTimeInfo}>
        <View style={styles.ownerData}>
          <Image source={require('../../assets/data.png')} />
          <Text
            style={
              styles.ownerName
            }>{`${post?.owner.firstName} ${post?.owner.lastName}`}</Text>
        </View>
        <Text>5d ago</Text>
      </View>
      <Text style={styles.postBody}>{post?.body}</Text>
    </View>
  );
};

export default PostDetails;
