import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from "react-native";
import CalendarScreen from "./(components)/CalendarScreen";
export default function TabTwoScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CalendarScreen />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
