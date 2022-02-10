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
import ImagesScreen from './ImagesScreen';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const FeedStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <BottomTab.Screen
        name="Feed"
        options={{
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
          tabBarIcon: () => <Icon name="chat" group="shopping" />,
          tabBarShowLabel: false,
        }}
        component={EventsListScreen}
      />
      <BottomTab.Screen
        name="Profile"
        options={{
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
    <FeedStack.Navigator>
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
    </ProfileStack.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={BottomTabNavigation} />
        <Stack.Screen name="EventsListScreen" component={EventsListScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ImagesScreen" component={ImagesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
