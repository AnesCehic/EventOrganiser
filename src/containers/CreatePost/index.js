import React from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';

import styles from './styles';

const CreatePost = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userData}>
        <Text style="username">Anes Cehic</Text>
      </View>
      <TextInput
        style={styles.postTextInput}
        placeholder="Post text"
        multiline
      />

      <TouchableOpacity
        onPress={() => null}
        style={styles.floatingUploadImageButton}>
        <Text style={styles.uploadPhotoText}>Add a photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePost;
