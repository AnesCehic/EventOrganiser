import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './LoginScreen';
import EventsListScreen from './EventsListScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen name="EventsListScreen" component={EventsListScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
