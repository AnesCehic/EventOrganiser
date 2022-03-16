import React, {useEffect, useState, useContext} from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LoadingIndicator} from '@components';
import {client} from '@services/apiClient';
import {Styles} from '@common';

import {UserContext} from '@contexts';

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
import InsightsScreen from './InsightsScreen';
import EventsOnDayScreen from './EventsOnMonthScreen';
import GroupMembersScreen from './GroupMembersScreen';
import VerifyAccountScreen from './VerifyAccountScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import EventsOnMonthScreen from './EventsOnMonthScreen';
import UpdateUserFormScreen from './UpdateUserFormScreen';
import CreatePostScreen from './CreatePostScreen';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const FeedStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();

const ChatNavigation = () => {
  return (
    <ChatStack.Navigator screenOptions={{headerShadowVisible: false}}>
      <ChatStack.Screen
        options={{headerShown: false}}
        name="Messages"
        component={ChatScreen}
      />
      <ChatStack.Screen
        name="Message"
        component={ChatMessagesScreen}
        options={({route}) => ({title: route.params.label})}
      />
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
          tabBarIcon: () => <Image source={require('../assets/Home.png')} />,
          tabBarLabel: 'Home',
          unmountOnBlur: true,
        }}
        component={FeedNavigation}
      />
      <BottomTab.Screen
        name="Calendar"
        options={{
          tabBarIcon: () => <Image source={require('../assets/Shape.png')} />,
          tabBarLabel: 'Events',
          unmountOnBlur: true,
        }}
        component={EventsListScreen}
      />
      <BottomTab.Screen
        name="Messages"
        options={{
          headerShown: false,
          tabBarIcon: () => <Image source={require('../assets/Chat.png')} />,
          tabBarLabel: 'Chat',
          unmountOnBlur: true,
        }}
        component={ChatNavigation}
      />
      <BottomTab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: () => <Image source={require('../assets/Profile.png')} />,
          tabBarLabel: 'Account',
          unmountOnBlur: true,
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
    <ProfileStack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{headerShadowVisible: false}}>
      <ProfileStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
      <ProfileStack.Screen
        options={{headerShown: false}}
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <ProfileStack.Screen name="ImagesScreen" component={ImagesScreen} />
      <ProfileStack.Screen name="GroupsScreen" component={GroupsScreen} />
      <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
      <ProfileStack.Screen name="CreatePost" component={CreatePostScreen} />
      <ProfileStack.Screen name="GroupMembers" component={GroupMembersScreen} />
      <ProfileStack.Screen
        name="PreferencesScreen"
        component={PreferencesScreen}
      />
    </ProfileStack.Navigator>
  );
};

const MainNavigation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {authenticated, setAuthenticated} = useContext(UserContext);

  useEffect(() => {
    getAuth();
  }, []);

  const getAuth = async () => {
    try {
      setIsLoading(true);
      await client.reAuthenticate();

      setAuthenticated(true);
    } catch (error) {
      console.log('[Error get is signed in navigation index]', error);
      setAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        {!authenticated ? (
          <>
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="VerifyAccount"
              component={VerifyAccountScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              options={{
                headerShown: false,
              }}
              component={BottomTabNavigation}
            />
            <Stack.Screen
              name="EventsListScreen"
              component={EventsListScreen}
            />
            <Stack.Screen name="Message" component={ChatMessagesScreen} />

            <Stack.Screen
              name="EventsOnMonthScreen"
              component={EventsOnMonthScreen}
            />
            <FeedStack.Screen name="FeedScreen" component={FeedScreen} />
            <FeedStack.Screen
              name="FeedDetails"
              component={FeedDetailsScreen}
            />
            <Stack.Screen name="InsightsScreen" component={InsightsScreen} />
            <Stack.Screen name="ExpensesScreen" component={ExpensesScreen} />
            <Stack.Screen
              name="EventsOnDayScreen"
              component={EventsOnDayScreen}
            />
            <Stack.Screen
              name="UpdateUserForm"
              component={UpdateUserFormScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
