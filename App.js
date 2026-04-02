import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FeedScreen from './src/screens/FeedScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { MOCK_POSTS } from './src/data/mockData';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const defaultProfileUser = MOCK_POSTS.find((post) => post.id === '1')?.user;

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{ title: 'Home Feed' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'User Profile' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="HomeTab" screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="HomeTab"
          component={HomeStackNavigator}
          options={{ tabBarLabel: 'Home' }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileScreen}
          initialParams={{ user: defaultProfileUser }}
          options={{ tabBarLabel: 'My Profile' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
