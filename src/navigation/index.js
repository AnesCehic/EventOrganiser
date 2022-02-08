import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import LoginScreen from './LoginScreen';
import EventsListScreen from './EventsListScreen';
import RegisterScreen from './RegisterScreen';
import FeedScreen from './FeedScreen';
import FeedDetailsScreen from './FeedDetails';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const FeedStack = createNativeStackNavigator();

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <BottomTab.Screen
        name="Feed"
        options={{
          tabBarIcon: () => <Icon name="home" size={20} />,
          tabBarShowLabel: false,
        }}
        component={FeedNavigation}
      />
      <BottomTab.Screen
        name="Calendar"
        options={{
          tabBarIcon: () => <Icon name="calendar-today" size={20} />,
          tabBarShowLabel: false,
        }}
        component={EventsListScreen}
      />
      <BottomTab.Screen
        name="Chat"
        options={{
          tabBarIcon: () => <Icon name="chat" size={20} />,
          tabBarShowLabel: false,
        }}
        component={EventsListScreen}
      />
      <BottomTab.Screen
        name="Profile"
        options={{
          tabBarIcon: () => <Icon name="profile" size={20} />,
          tabBarShowLabel: false,
        }}
        component={EventsListScreen}
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

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen name="Home" component={BottomTabNavigation} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
