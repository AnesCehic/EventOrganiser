import React, {useState, useEffect, useRef} from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
  Keyboard,
} from 'react-native';
import {CommentsService} from '../../services/apiClient';

import Comment from './Comment';
import {LoadingIndicator} from '@components';

import styles from './styles';
import Styles from '../../common/Styles';

const Comments = ({navigation, route, postId, postLoaded, isDarkMode}) => {
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState({
    data: [],
    isLoading: false,
    total: 0,
    page: 1,
  });

  const commentsList = useRef(null);

  useEffect(() => {
    setComments({
      ...comments,
      isLoading: true,
    });

    // CommentsService.on('created', handleCreatedComment);

    // return () => {
    //   CommentsService.off('created', handleCreatedComment);
    // };
  }, []);

  const handleCreatedComment = res => {
    if (res.postId === postId) {
      setComments({
        ...comments,
        // FIXME
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
          $sort: {
            createdAt: -1,
          },
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

      setCommentInput('');
      Keyboard.dismiss();
      // setComments({
      //   ...comments,
      //   data: [res, ...comments.data],
      //   total: comments.total + 1,
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = () => {
    // FIXME
    setComments({
      data: [],
      isLoading: true,
      total: 0,
      page: 1,
    });
  };

  const renderHeadline = () => {
    return (
      <View style={styles.headline}>
        <Text
          style={[
            styles.commentsHeading,
            isDarkMode && {color: Styles.Colors.white},
          ]}>
          Comments
        </Text>
        <Text style={styles.commentsCount}>{comments.total}</Text>
      </View>
    );
  };

  const renderCommentInput = () => {
    return (
      <View
        style={[
          styles.commentInput,
          isDarkMode && {backgroundColor: '#4C5761'},
        ]}>
        <TextInput
          onChangeText={text => setCommentInput(text)}
          value={commentInput}
          style={[
            styles.inputField,
            isDarkMode && {color: Styles.Colors.white},
          ]}
          placeholder="Leave your comment"
          placeholderTextColor={isDarkMode && Styles.Colors.white}
          multiline={true}
          numberOfLines={2}
        />
        <TouchableOpacity
          style={styles.postSubmitButton}
          onPress={createPostComment}>
          <Text style={styles.postSubmitButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (comments.isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View
      style={[styles.container, isDarkMode && {backgroundColor: '#0A121A'}]}>
      {renderHeadline()}
      <FlatList
        key={item => item.id}
        data={comments.data}
        ref={commentsList}
        onEndReached={loadCommentsForPost}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        }
        contentContainerStyle={{paddingBottom: 16}}
        renderItem={({item}) => <Comment isDarkMode={isDarkMode} post={item} />}
      />
      {/* <Comment post={data[0]} /> */}
      {renderCommentInput()}
    </View>
  );
};

export default Comments;
