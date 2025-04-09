import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={[styles.container, styles.gap]}>
        <Avatar.Text size={50} label="HA" />
        <Text style={styles.text}>Huynh Anh</Text>
      </View>

      <View style={styles.containerNotification}>
        <Text style={styles.activeNotifications}></Text>
        <FontAwesome name="bell-o" size={26} color="black" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  gap: {
    gap: 10,
  },

  activeNotifications: {
    width: 8,
    height: 8,
    backgroundColor: '#CC0000',
    borderRadius: 5,
    position: 'absolute',
    top: 2,
    right: 2,
    zIndex: 1,
  },

  containerNotification: {
    position: 'relative',
  },
})
