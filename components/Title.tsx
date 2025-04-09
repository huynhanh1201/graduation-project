import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Typography } from '~/constants/Typography'

export default function Title({ text = 'Chưa cho nội dung', marginTop = 5 }) {
  return (
    <View style={[styles.container, { marginTop }]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: Typography.fontSize.large,
    fontWeight: 'bold',
  },
})
