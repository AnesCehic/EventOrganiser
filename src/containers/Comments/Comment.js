import React from 'react';
import {Text, View, Image} from 'react-native';
import dayjs from 'dayjs';

import {Styles} from '@common';

import styles from './styles';

const Comment = ({post, isDarkMode}) => {
  return (
    <View style={styles.commentContainer}>
      {/* {!post?.owner?.uploadId ? ( */}
      <View>
        {post?.owner?.upload?.files[0].signedURL ? (
          <Image
            source={{
              uri: post?.owner?.upload?.files[0].signedURL,
            }}
            resizeMode="cover"
            style={{
              width: 32,
              height: 32,
              borderRadius: 50,
              marginHorizontal: 8,
              marginTop: 11,
            }}
          />
        ) : (
          <Text
            style={[
              styles.userImageFallback,
              isDarkMode && {color: Styles.Colors.white},
            ]}>
            {`${post?.owner?.firstName[0]}${post?.owner?.lastName[0]}`}
          </Text>
        )}
      </View>
      {/* ) : null} */}
      <View style={{flexGrow: 1, flexShrink: 1}}>
        <View style={styles.userNameAndDate}>
          <Text
            style={[
              styles.userName,
              isDarkMode && {color: Styles.Colors.white},
            ]}>{`${post?.owner?.firstName} ${post?.owner?.lastName}`}</Text>
          <Text
            style={[
              styles.datePosted,
              isDarkMode && {color: Styles.Colors.white},
            ]}>
            {dayjs(post?.createdAt).fromNow()}
          </Text>
        </View>

        <Text
          style={[
            styles.commentText,
            isDarkMode && {
              color: Styles.Colors.white,
              borderWidth: 0,
              backgroundColor: '#273038',
            },
          ]}>
          {post.text}
        </Text>
      </View>
    </View>
  );
};

export default Comment;
