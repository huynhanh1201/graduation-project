import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import Clock from '~/components/Clock'
import { Colors } from '~/constants/Colors'
import { UI } from '~/constants/UI'

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.text}>Vào ca</Text>
        <Clock color={'#fff'} />
      </View>
      <MaterialIcons name="fingerprint" size={50} color="white" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.light.primary,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: UI.borderRadius.large,
  },
  text: {
    fontSize: 28,
    color: '#fff',
  },
  left: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
})
