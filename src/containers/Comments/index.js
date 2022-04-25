import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import {CommentsService} from '../../services/apiClient';

import Comment from './Comment';

import styles from './styles';

const Comments = ({navigation, route, postId, postLoaded}) => {
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState({
    data: [],
    isLoading: false,
    total: 0,
    page: 1,
  });

  useEffect(() => {
    setComments({
      ...comments,
      isLoading: true,
    });

    CommentsService.on('created', handleCreatedComment);

    return () => {
      CommentsService.off('created', handleCreatedComment);
    };
  }, []);

  const handleCreatedComment = res => {
    if (res.postId === postId) {
      setComments({
        ...comments,
        data: [res, ...comments.data],
        total: comments.total + 1,
      });
    }
  };

  useEffect(() => {
    if (comments.isLoading && postLoaded) {
      loadCommentsForPost();
    }
  }, [comments.isLoading, postLoaded]);

  // Needs to be optimized
  const loadCommentsForPost = async () => {
    try {
      const res = await CommentsService.find({
        query: {
          postId: postId,
          $limit: 10,
          $skip: (comments.page - 1) * 10,
          // $sort: {
          //   createdAt: -1,
          // },
        },
      });

      setComments({
        data: [...comments.data, ...res.data],
        isLoading: false,
        total: res.total,
        page: comments.page + 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createPostComment = async () => {
    try {
      const res = await CommentsService.create({
        postId: postId,
        text: commentInput,
      });

      // setComments({
      //   ...comments,
      //   data: [...comments.data, res],
      //   total: comments.total + 1,
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = () => {
    console.log('Refresh');
  };

  const renderHeadline = () => {
    return (
      <View style={styles.headline}>
        <Text style={styles.commentsHeading}>Comments</Text>
        <Text style={styles.commentsCount}>{comments.total}</Text>
      </View>
    );
  };

  const renderCommentInput = () => {
    return (
      <View style={styles.commentInput}>
        <TextInput
          onChangeText={text => setCommentInput(text)}
          value={commentInput}
          style={styles.inputField}
          placeholder="Leave your comment"
          multiline={true}
          numberOfLines={2}
        />
        <TouchableOpacity
          style={styles.postSubmitButton}
          onPress={createPostComment}>
          <Text>Post</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeadline()}
      <FlatList
        key={item => item.id}
        data={comments.data}
        onEndReached={loadCommentsForPost}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        }
        contentContainerStyle={{paddingBottom: 16}}
        renderItem={({item}) => <Comment post={item} />}
      />
      {/* <Comment post={data[0]} /> */}
      {renderCommentInput()}
    </View>
  );
};

export default Comments;
