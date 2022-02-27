import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import dayjs from 'dayjs';

import {PostsList, SubmitButton} from '@components';

import data from './data';

import styles from './styles';

const Chat = ({navigation}) => {
  const [isAnonMode, setIsAnonMode] = useState();

  useEffect(() => {
    getAnonMode();
  }, []);

  const getAnonMode = async () => {
    try {
      const res = await AsyncStorage.getItem('@anonymousMode');
      const isEnabled = res === 'enabled';
      setIsAnonMode(isEnabled);
    } catch (error) {
      console.log('[Error get anon mode chat]', error);
    }
  };

  const navigateToMessages = () => {
    navigation.navigate('Messages');
  };

  const renderPosts = () => {
    const time = dayjs(dayjs().subtract(5, 'minute'));
    const timeFromNow = time.fromNow(); // for testing time ago
    const newDataTest = data.posts.map(post => ({...post, time: timeFromNow}));

    return <PostsList data={newDataTest} onPress={navigateToMessages} />;
  };
  if (isAnonMode) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 26}}>Forbiden!</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={{marginBottom: 70}}>{renderPosts()}</View>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          width: '100%',
          height: 50,
          alignItems: 'center',
          marginTop: 10,
        }}>
        <SubmitButton
          style={{marginTop: 0, width: '60%'}}
          title="Send message"
          onPress={() => null}
        />
      </View>
    </View>
  );
};

export default Chat;
