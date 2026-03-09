import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

import AddWorkoutScreen from '../screens/AddWorkoutScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WorkoutDetailsScreen from '../screens/WorkoutDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const PRIMARY_COLOR = '#6366F1'; // Indigo 500
const TAB_INACTIVE = '#94A3B8';

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
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
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: TAB_INACTIVE,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: Platform.OS === 'ios' ? 0 : 4,
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'HomeTab') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Analytics') iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          else if (route.name === 'Discover') iconName = focused ? 'compass' : 'compass-outline';
          else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';

          return (
            <View style={focused ? styles.activeIconContainer : null}>
               <Ionicons name={iconName as any} size={24} color={color} />
            </View>
          );
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
        options={{ tabBarLabel: 'Stats' }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{ tabBarLabel: 'Explore' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeIconContainer: {
    padding: 4,
    borderRadius: 8,
  },
});

export default AppNavigator;
