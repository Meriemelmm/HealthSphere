import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AddWorkoutScreen from '../screens/AddWorkoutScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WorkoutDetailsScreen from '../screens/WorkoutDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="AddWorkout" component={AddWorkoutScreen} />
    <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#1DB954',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          height: 60,
          paddingBottom: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') iconName = 'home';
          else if (route.name === 'Analytics') iconName = 'bar-chart';
          else if (route.name === 'Discover') iconName = 'compass';
          else if (route.name === 'Settings') iconName = 'settings';

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{ tabBarLabel: 'Analytics' }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{ tabBarLabel: 'Discover' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;