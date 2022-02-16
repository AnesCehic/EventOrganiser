import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-ico';

import LoginScreen from './LoginScreen';
import EventsListScreen from './EventsListScreen';
import RegisterScreen from './RegisterScreen';
import FeedScreen from './FeedScreen';
import FeedDetailsScreen from './FeedDetails';
import EditProfileScreen from './EditProfileScreen';
import ProfileScreen from './ProfileScreen';
import StartScreen from './StartScreen';
import ChatScreen from './ChatScreen';
import ImagesScreen from './ImagesScreen';
import GroupsScreen from './GroupsScreen';
import ExpensesScreen from './ExpensesScreen';
import ChatMessagesScreen from './ChatMessagesScreen';
import PreferencesScreen from './PreferencesScreen';
import ContentScreen from './ContentScreen';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const FeedStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();

const ChatNavigation = () => {
  return (
    <ChatStack.Navigator screenOptions={{headerShadowVisible: false}}>
      <ChatStack.Screen name="Chats" component={ChatScreen} />
      <ChatStack.Screen name="Messages" component={ChatMessagesScreen} />
    </ChatStack.Navigator>
  );
};

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Feed"
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="home" group="universalicons" />,
          tabBarShowLabel: false,
        }}
        component={FeedNavigation}
      />
      <BottomTab.Screen
        name="Calendar"
        options={{
          tabBarIcon: () => <Icon name="calendar" group="miscellaneous" />,
          tabBarShowLabel: false,
        }}
        component={EventsListScreen}
      />
      <BottomTab.Screen
        name="Chat"
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="chat" group="shopping" />,
          tabBarShowLabel: false,
        }}
        component={ChatNavigation}
      />
      <BottomTab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="profile" group="basic" />,
          tabBarShowLabel: false,
        }}
        component={ProfileNavigation}
      />
    </BottomTab.Navigator>
  );
};

const FeedNavigation = () => {
  return (
    <FeedStack.Navigator screenOptions={{headerShadowVisible: false}}>
      <FeedStack.Screen name="FeedScreen" component={FeedScreen} />
      <FeedStack.Screen name="FeedDetails" component={FeedDetailsScreen} />
    </FeedStack.Navigator>
  );
};

const ProfileNavigation = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="EditPofileScreen"
        component={EditProfileScreen}
      />
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="ImagesScreen" component={ImagesScreen} />
      <ProfileStack.Screen name="GroupsScreen" component={GroupsScreen} />
      <ProfileStack.Screen
        name="PreferencesScreen"
        component={PreferencesScreen}
      />
    </ProfileStack.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={BottomTabNavigation}
        />
        <Stack.Screen name="EventsListScreen" component={EventsListScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ExpensesScreen" component={ExpensesScreen} />
        <Stack.Screen name="ContentScreen" component={ContentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
