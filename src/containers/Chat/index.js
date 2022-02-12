import React from 'react';
import {Text, View} from 'react-native';

import dayjs from 'dayjs';
import Icon from 'react-native-ico';

import {PostsList, SubmitButton} from '@components';

import data from './data';

import styles from './styles';

const Chat = () => {
  const renderPosts = () => {
    const time = dayjs(dayjs().subtract(5, 'minute'));
    const timeFromNow = time.fromNow(); // for testing time ago
    const newDataTest = data.posts.map(post => ({...post, time: timeFromNow}));

    return <PostsList data={newDataTest} />;
  };

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
