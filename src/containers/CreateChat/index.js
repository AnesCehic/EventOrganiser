import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

import {UserContext} from '@contexts';
import {UsersService, MessageGroupsService} from '@services/apiClient';
import {Styles} from '@common';

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

      console.log(res.data);

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
      title: 'New message',
      headerRight: () => (
        <TouchableOpacity style={styles.createChatButton} onPress={createChat}>
          <Text style={styles.createChatButtonText}>Create</Text>
        </TouchableOpacity>
      ),
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
      console.log(res);
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
        <Image
          source={{
            uri: 'https://api.uifaces.co/our-content/donated/KtCFjlD4.jpg',
          }}
          style={styles.userItemImage}
        />
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
          <Icon name="x" size={20} color="red" />
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
