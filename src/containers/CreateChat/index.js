import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {UserContext} from '@contexts';
import {UsersService, MessageGroupsService} from '@services/apiClient';
import {Styles} from '@common';
import {HeaderBack} from '@components';

import styles from './styles';

const CreateChat = ({navigation}) => {
  const colorScheme = useColorScheme();
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
      <View
        style={[
          styles.searchContainer,
          colorScheme === 'dark' && {
            color: Styles.Colors.white,
            backgroundColor: '#1C2329',
          },
        ]}>
        <Text style={colorScheme === 'dark' && {color: Styles.Colors.white}}>
          To:{' '}
        </Text>
        <TextInput
          style={[
            styles.searchUser,
            colorScheme === 'dark' && {color: Styles.Colors.white},
          ]}
          onChangeText={text => setUsername(text)}
          value={username}
        />
      </View>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Styles.Colors.headerBackground,
      },
      headerTitleStyle: colorScheme === 'dark' && {color: Styles.Colors.white},
      headerTitleAlign: 'center',
      title: 'New message',
      headerRight: () => (
        <TouchableOpacity
          style={[
            styles.createChatButton,
            colorScheme === 'dark' && {backgroundColor: Styles.Colors.gold},
          ]}
          onPress={createChat}>
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
          <View
            style={[
              styles.userItemImage,
              {
                backgroundColor: Styles.Colors.gray,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Text>
              {user.firstName[0].toUpperCase()}
              {user.lastName[0].toUpperCase()}
            </Text>
          </View>
        )}
        <Text
          style={[
            styles.userItemText,
            colorScheme === 'dark' && {color: Styles.Colors.white},
          ]}>
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
    <View
      style={[
        styles.container,
        colorScheme === 'dark' && {backgroundColor: '#0A121A'},
      ]}>
      {searchUser()}
      <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap'}}>
        {selectedUsers.map(u => {
          return renderSelectedUser(u);
        })}
      </View>
      <FlatList
        keyExtractor={user => user._id}
        data={users}
        contentContainerStyle={
          colorScheme === 'dark' && {backgroundColor: '#0A121A'}
        }
        renderItem={renderUsers}
        ItemSeparatorComponent={() => (
          <View
            style={[
              styles.itemSeparator,
              colorScheme === 'dark' && {backgroundColor: '#1C2329'},
            ]}
          />
        )}
      />
    </View>
  );
};

export default CreateChat;
