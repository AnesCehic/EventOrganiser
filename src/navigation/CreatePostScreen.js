import React, {useState, useEffect} from 'react';
import {Text, TouchableHighlight, View, StyleSheet} from 'react-native';

import {Styles} from '@common';
import {CreatePost} from '@containers';

const CreatePostScreen = ({navigation, route}) => {
  return <CreatePost navigation={navigation} route={route} />;
};

export default CreatePostScreen;
