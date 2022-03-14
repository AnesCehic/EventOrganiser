import React, {useState, useEffect} from 'react';
import {Text, TouchableHighlight, View, StyleSheet} from 'react-native';

import {Styles} from '@common';
import {CreatePost} from '@containers';

const CreatePostScreen = ({navigation, route}) => {
  const [createDisabled, setCreateDisabled] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: 'New post',
      headerStyle: {
        backgroundColor: '#BFBB85',
      },
      headerRight: () => {
        return (
          <TouchableHighlight
            style={[
              styles.createPostButton,
              createDisabled ? styles.createPostButtonDisabled : null,
            ]}
            onPress={() => null}>
            <Text>Post</Text>
          </TouchableHighlight>
        );
      },
    });
  }, []);

  return <CreatePost />;
};

const styles = StyleSheet.create({
  createPostButton: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 6,
    backgroundColor: Styles.Colors.white,
  },
  text: {
    textAlign: 'center',
  },
  createPostButtonDisabled: {
    opacity: 0.4,
  },
});

export default CreatePostScreen;
