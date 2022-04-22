import React from 'react';
import {Text, View} from 'react-native';
import dayjs from 'dayjs';

import styles from './styles';

const Comment = ({post}) => {
  console.log(post)
  return (
    <View style={styles.commentContainer}>
      {/* {!post?.owner?.uploadId ? ( */}
        <View>
          <Text style={styles.userImageFallback}>
            {`${post?.owner?.firstName[0]}${post?.owner?.lastName[0]}`}
          </Text>
        </View>
      {/* ) : null} */}
      <View style={{flexGrow: 1}}>
        <View style={styles.userNameAndDate}>
          <Text
            style={
              styles.userName
            }>{`${post?.owner?.firstName} ${post?.owner?.lastName}`}</Text>
          <Text style={styles.datePosted}>
            {dayjs(post?.createdAt).fromNow()}
          </Text>
        </View>

        <Text style={styles.commentText}>{post.text}</Text>
      </View>
    </View>
  );
};

export default Comment;
