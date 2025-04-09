import React from 'react'
import { Stack } from 'expo-router'

export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="log-in" options={{ title: 'Đăng nhập' }} />
      <Stack.Screen name="register" options={{ title: 'Đăng ký' }} />
      <Stack.Screen name="forgot-password" options={{ title: 'Quên mật khẩu' }} />
    </Stack>
  )
}
