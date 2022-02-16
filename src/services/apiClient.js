import feathers from '@feathersjs/feathers';
import authentication from '@feathersjs/authentication-client';
import socketioClient from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const socket = io('http://api.lincolnclub.app');
const client = feathers();

client.configure(socketioClient(socket));
client.configure(
  authentication({
    storage: AsyncStorageLib,
  }),
);
client.setup();

const UsersService = client.service('users');
const EventService = client.service('events');
const GroupService = client.service('groups');

//UsersService.on('created', () => console.log('Create'));

export {UsersService, EventService, GroupService, client};
