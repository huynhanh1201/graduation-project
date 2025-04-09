import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import { Colors } from '~/constants/Colors'
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Làm Việc',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-map-marker"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="task-assignment"
        options={{
          title: 'Giao Việc',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clock-check"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Lịch',
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar-sharp" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          title: 'Tài Khoản',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
