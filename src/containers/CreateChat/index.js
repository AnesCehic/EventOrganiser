import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

import {UsersService, MessageGroupsService} from '@services/apiClient';

import styles from './styles';

const CreateChat = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const serachByInput = async () => {
    try {
      const res = await UsersService.find({
        query: {
          firstName: username,
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

  const addToSelectedUsers = async user => {
    // setSelectedUsers([user, ...selectedUsers]);
    try {
      const res = await MessageGroupsService.create({
        type: 0,
        participants: ['6205894ff3414900114b9cd8'],
      });
      navigation.goBack();
    } catch (error) {
      console.log('[Error creating message group]', error);
    }
  };

  const renderUsers = ({item: user}) => {
    return (
      <TouchableOpacity
        style={styles.userItem}
        onPress={() => addToSelectedUsers(user)}>
        <Image
          source={{
            uri: 'https://api.uifaces.co/our-content/donated/KtCFjlD4.jpg',
          }}
          style={styles.userItemImage}
        />
        <Text style={styles.userItemText}>
          {user.firstName} {user.lastName}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSelectedUser = item => {
    return (
      <View style={styles.selectedUser}>
        <Text>
          {item.firstName} {item.lastName}
        </Text>
        <TouchableOpacity>
          <Icon name="x" size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {searchUser()}
      {/* <View>
      {selectedUsers.map(u => {
        return renderSelectedUser(u);
      })}
      </View> */}
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
