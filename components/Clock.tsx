import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function Clock({ color = '#000' }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={[styles.timeText, { color: color }]}>
        {time.toLocaleTimeString()}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 20,
  },
})
