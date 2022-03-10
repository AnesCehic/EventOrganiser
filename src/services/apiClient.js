import feathers from '@feathersjs/feathers';
import authentication from '@feathersjs/authentication-client';
import socketioClient from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const socket = io('https://api.lincolnclub.app');
const client = feathers();

client.configure(socketioClient(socket, {timeout: 30000}));
client.configure(
  authentication({
    storage: AsyncStorageLib,
  }),
);
client.setup();

const UsersService = client.service('users');
const EventService = client.service('events');
const GroupService = client.service('groups');
const VerifyAccountService = client.service('verify-account');
const ForgotPasswordService = client.service('forgot-password');
const RSVPService = client.service('rsvp');
const ResendVerification = client.service('resend-verification');
const ChangeEmail = client.service('change-email');
const PostsService = client.service('posts');
const MessageGroupsService = client.service('message-groups');
const MessagesService = client.service('messages');

export {
  UsersService,
  EventService,
  GroupService,
  VerifyAccountService,
  client,
  ForgotPasswordService,
  RSVPService,
  ResendVerification,
  ChangeEmail,
  PostsService,
  MessageGroupsService,
  MessagesService,
};
