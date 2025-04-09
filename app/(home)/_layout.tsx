import React from 'react'
import { Stack } from 'expo-router'

export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="requirement" />
      <Stack.Screen name="timesheet" />
      <Stack.Screen name="shift-arrangement" />
    </Stack>
  )
}
