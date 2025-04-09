import React from 'react';
import { Stack } from 'expo-router';

export default function UserLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="business" />
      <Stack.Screen name="branch" />
      <Stack.Screen name="employee" />
      <Stack.Screen name="department" />
      <Stack.Screen name="position" />
      <Stack.Screen name="region" />
      <Stack.Screen name="create-business" />
      <Stack.Screen name="add-branch" />
      <Stack.Screen name="add-employee" />
      <Stack.Screen name="add-department" />
      <Stack.Screen name="add-position" />
      <Stack.Screen name="add-region" />
      <Stack.Screen name="list-business" />
    </Stack>
  );
}