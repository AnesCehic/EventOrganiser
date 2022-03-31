import React, {useEffect, useState, useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
// import IconRemix from 'react-native-remix-icon';
import IconFeather from 'react-native-vector-icons/Feather';
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
import EventsOnDayScreen from './EventsOnDayScreen';
import GroupMembersScreen from './GroupMembersScreen';
import VerifyAccountScreen from './VerifyAccountScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import EventsOnMonthScreen from './EventsOnMonthScreen';
import UpdateUserFormScreen from './UpdateUserFormScreen';
import CreatePostScreen from './CreatePostScreen';
import PostDetailsSCreen from './PostsDetailsScreen';
import PersonalDetailsScreen from './PersonalDetailsScreen';
import MyEventsScreen from './MyEventsScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import GoogleLogin from './GoogleLogin';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const FeedStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const GroupsStack = createNativeStackNavigator();

const ChatNavigation = () => {
  return (
    <ChatStack.Navigator>
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

const GroupsNavigation = () => {
  return (
    <GroupsStack.Navigator>
      <GroupsStack.Screen name="GroupsScreen" component={GroupsScreen} />
      <GroupsStack.Screen name="GroupMembers" component={GroupMembersScreen} />
    </GroupsStack.Navigator>
  );
};

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Feed"
        options={{
          headerShown: false,
          // tabBarIcon: () => <Image source={require('../assets/Home.png')} />,
          tabBarIcon: props => {
            const iconColor = props.focused ? Styles.Colors.gold : '';
            return <IconFeather name={'home'} size={24} color={iconColor} />;
          },
          tabBarLabel: 'Home',
          unmountOnBlur: true,
        }}
        component={FeedNavigation}
      />
      <BottomTab.Screen
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        name="Calendar"
        options={{
          tabBarIcon: props => {
            const iconColor = props.focused ? Styles.Colors.gold : '';
            return (
              <IconFeather name={'calendar'} size={24} color={iconColor} />
            );
          },
          tabBarLabel: 'Events',
          unmountOnBlur: true,
        }}
        component={EventsListScreen}
      />
      <BottomTab.Screen
        name="Messages"
        options={{
          headerShown: false,
          tabBarIcon: props => {
            const iconColor = props.focused ? Styles.Colors.gold : '';
            return (
              <Icon name={'chatbubbles-outline'} size={24} color={iconColor} />
            );
          },
          tabBarLabel: 'Chat',
          unmountOnBlur: true,
        }}
        component={ChatNavigation}
      />
      <BottomTab.Screen
        name="Groups"
        options={{
          headerShown: false,
          tabBarIcon: props => {
            const iconColor = props.focused ? Styles.Colors.gold : '';
            return <MaterialIcon name={'groups'} size={24} color={iconColor} />;
          },
          tabBarLabel: 'Groups',
          unmountOnBlur: true,
        }}
        component={GroupsNavigation}
      />
      <BottomTab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: props => {
            const iconColor = props.focused ? Styles.Colors.gold : '';
            return <IconFeather name={'user'} size={24} color={iconColor} />;
          },
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
      <FeedStack.Screen name="PostDetails" component={PostDetailsSCreen} />
    </FeedStack.Navigator>
  );
};

const ProfileNavigation = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="EditProfileScreen"
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
      <ProfileStack.Screen
        name="PersonalDetailsScreen"
        component={PersonalDetailsScreen}
      />
      <ProfileStack.Screen name="ImagesScreen" component={ImagesScreen} />
      <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
      <ProfileStack.Screen name="CreatePost" component={CreatePostScreen} />
      <ProfileStack.Screen
        name="PreferencesScreen"
        component={PreferencesScreen}
      />
    </ProfileStack.Navigator>
  );
};

const MainNavigation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {authenticated, setAuthenticated, setUserData} =
    useContext(UserContext);

  useEffect(() => {
    getAuth();
  }, []);

  // cannot update

  const getAuth = async () => {
    try {
      setIsLoading(true);
      const {user} = await client.reAuthenticate();
      setUserData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        _id: user._id,
        avatarImg:
          'https://i.guim.co.uk/img/media/e77ac13b8aceb59e21b20e8d1fd4e618e74f51cb/0_432_2806_1682/master/2806.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=2040fdb94c9c37bc139c8f55c61cc67f',
      });
      setAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      console.log('[Error get is signed in navigation index]', error);
      setAuthenticated(false);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const linking = {
    prefixes: ['lincolnapp://'],
    config: {
      screens: {
        Login: {
          path: 'sign-in',
          exact: true,
        },
        Start: {
          path: 'email-verified',
          exact: true,
        },
        GoogleLogin: {
          path: 'oauth/:result',
          exact: true,
        },
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Start">
        {!authenticated ? (
          <>
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name="VerifyAccount"
              component={VerifyAccountScreen}
            />
            <Stack.Screen name="GoogleLogin" component={GoogleLogin} />
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
            <Stack.Screen name="MyEventsScreen" component={MyEventsScreen} />
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
