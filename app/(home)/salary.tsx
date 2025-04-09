import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { Colors } from '~/constants/Colors'

export default function Timesheet() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Appbar.Header statusBarHeight={0} dark={false} style={styles.appbar}>
        <Appbar.BackAction color="#000" onPress={() => router.back()} />
        <Appbar.Content title="Phiếu lương" titleStyle={{ color: '#000' }} />
      </Appbar.Header>

      <Text style={styles.title}>TRANG PHIẾU LƯƠNG</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: Colors.light.background,
    color: '#000',

    // Android: dùng elevation
    elevation: 5,
    // iOS: dùng các thuộc tính shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  appbarContent: {
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
})
