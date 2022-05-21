import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {UserContext} from '@contexts';
import {UsersService, MessageGroupsService} from '@services/apiClient';
import {Styles} from '@common';
import {HeaderBack} from '@components';

import styles from './styles';

const CreateChat = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const {userData} = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const serachByInput = async () => {
    try {
      const res = await UsersService.find({
        query: {
          $and: [
            {
              _id: {
                $ne: userData._id,
              },
            },
            {
              $or: [
                {
                  email: {
                    $regex: username.split(' ').join('|'),
                  },
                },
                {
                  firstName: {
                    $regex: username.split(' ').join('|'),
                  },
                },
                {
                  lastName: {
                    $regex: username.split(' ').join('|'),
                  },
                },
              ],
            },
          ],
        },
      });

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    serachByInput();
  }, [username]);

  const searchUser = () => {
    return (
      <View style={styles.searchContainer}>
        <Text>To: </Text>
        <TextInput
          style={styles.searchUser}
          onChangeText={text => setUsername(text)}
          value={username}
        />
      </View>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Styles.Colors.gold,
      },
      headerTitleAlign: 'center',
      title: 'New message',
      headerRight: () => (
        <TouchableOpacity style={styles.createChatButton} onPress={createChat}>
          <Text style={styles.createChatButtonText}>Create</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
    });
  }, [selectedUsers]);

  const addToSelectedUsers = async user => {
    setSelectedUsers([user, ...selectedUsers]);
  };

  const createChat = async () => {
    const usersId = selectedUsers.map(e => e._id);
    try {
      const res = await MessageGroupsService.create({
        type: selectedUsers.length === 1 ? 0 : 1,
        participants: [...usersId],
      });
      navigation.goBack();
    } catch (error) {
      console.log('[Error creating message group]', error);
    }
  };

  const renderUsers = ({item: user}) => {
    let isAdded = selectedUsers.find(e => e._id === user._id);
    return (
      <TouchableOpacity
        style={styles.userItem}
        onPress={() => {
          if (!isAdded) {
            addToSelectedUsers(user);
          }
        }}>
        {user.upload?.files[0]?.signedURL ? (
          <Image
            source={{
              uri: user.upload?.files[0]?.signedURL,
            }}
            style={styles.userItemImage}
          />
        ) : (
          <Text
            style={[
              styles.userItemImage,
              {
                backgroundColor: Styles.Colors.gray,
                textAlignVertical: 'center',
                textAlign: 'center',
              },
            ]}>
            {user.firstName[0].toUpperCase()}
            {user.lastName[0].toUpperCase()}
          </Text>
        )}
        <Text style={styles.userItemText}>
          {user.firstName} {user.lastName}
        </Text>
        {isAdded ? <Icon name="check" size={30} color="green" /> : null}
      </TouchableOpacity>
    );
  };

  const deleteSelectedUser = user => {
    setSelectedUsers(selectedUsers.filter(u => u._id !== user._id));
  };

  const renderSelectedUser = item => {
    return (
      <View style={styles.selectedUser}>
        <Text style={{marginRight: 6}}>
          {item.firstName} {item.lastName}
        </Text>
        <TouchableOpacity onPress={() => deleteSelectedUser(item)}>
          <Icon name="close" size={20} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {searchUser()}
      <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap'}}>
        {selectedUsers.map(u => {
          return renderSelectedUser(u);
        })}
      </View>
      <FlatList
        keyExtractor={user => user._id}
        data={users}
        renderItem={renderUsers}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};

export default CreateChat;
