import React, {useState, useEffect} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {CommentsService} from '../../services/apiClient';

import Comment from './Comment';

import styles from './styles';

const Comments = ({navigation, route}) => {
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState({
    data: [],
    isLoading: false,
    total: 0,
  });

  useEffect(() => {
    console.log(route.params.postId);
    setComments({
      ...comments,
      isLoading: true,
    });

    // fix real time data
    // CommentsService.on('created', handleCreatedComment);

    // return () => {
    //   CommentsService.off('created', handleCreatedComment);
    // };
  }, []);

  // const handleCreatedComment = res => {
  //   console.log(res);
  //   if (res.postId === route.params.postId) {
  //     setComments({
  //       ...comments,
  //       data: [...comments.data, res],
  //       total: comments.total + 1,
  //     });
  //   }
  // };

  useEffect(() => {
    if (comments.isLoading) {
      loadCommentsForPost();
    }
  }, [comments.isLoading]);

  const loadCommentsForPost = async () => {
    try {
      const res = await CommentsService.find({
        query: {
          postId: route.params.postId,
        },
      });

      console.log(res);

      setComments({
        data: res.data,
        isLoading: false,
        total: res.total,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createPostComment = async () => {
    try {
      const res = await CommentsService.create({
        postId: route.params.postId,
        text: commentInput,
      });

      setComments({
        ...comments,
        data: [...comments.data, res],
        total: comments.total + 1,
      });
    } catch (error) {
      console.log(error);
    }
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
        contentContainerStyle={{paddingBottom: 16}}
        renderItem={({item}) => <Comment post={item} />}
      />
      {/* <Comment post={data[0]} /> */}
      {renderCommentInput()}
    </View>
  );
};

export default Comments;
