import React, {useState, useEffect} from 'react';
import {Text, TouchableHighlight, View, StyleSheet} from 'react-native';

import {Styles} from '@common';
import {CreatePost} from '@containers';

const CreatePostScreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    return () => {
      navigation.getParent()?.setOptions({tabBarStyle: undefined});
    };
  }, []);
  return <CreatePost navigation={navigation} route={route} />;
};

export default CreatePostScreen;
