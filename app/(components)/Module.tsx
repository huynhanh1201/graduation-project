import React from 'react'
import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import { UI } from '~/constants/UI'
import { Typography } from '~/constants/Typography'
import { Colors } from '~/constants/Colors'
import { Link } from 'expo-router'

export default function Module({
  href = '/',
  text = 'Chưa có nôi dung',
  color1 = 'orange',
  color2 = 'green',
  color3 = 'red',
  hidden = false,
  icon = 'clipboard-list-outline',
  colorIcon = '#fff',
  colorBackgroundIcon = '#deeed7',
}) {
  return (
    <Link href={href as any} asChild>
      <Pressable style={styles.container}>
        <View style={[styles.icon, { backgroundColor: colorBackgroundIcon }]}>
          <MaterialCommunityIcons
            name={icon as any}
            size={28}
            color={colorIcon}
          />
        </View>

        <Text style={styles.title}>{text}</Text>

        <View style={[styles.quantity, {}]}>
          <View
            style={[
              styles.quantityItem,
              { borderColor: !hidden ? color1 : '#fff' },
            ]}
          >
            <Text
              style={[
                styles.quantityText,
                { color: !hidden ? '#000' : '#fff' },
              ]}
            >
              0
            </Text>
          </View>
          <View
            style={[
              styles.quantityItem,
              { borderColor: !hidden ? color2 : '#fff' },
            ]}
          >
            <Text
              style={[
                styles.quantityText,
                { color: !hidden ? '#000' : '#fff' },
              ]}
            >
              0
            </Text>
          </View>
          <View
            style={[
              styles.quantityItem,
              { borderColor: !hidden ? color3 : '#fff' },
            ]}
          >
            <Text
              style={[
                styles.quantityText,
                { color: !hidden ? '#000' : '#fff' },
              ]}
            >
              0
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  )
}

const screenWidth = Dimensions.get('window').width - 30
export const gap = 10
const itemWidth = (screenWidth - gap) / 2

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: UI.borderRadius.medium,
    padding: 10,
    width: itemWidth,
  },
  title: {
    fontSize: Typography.fontSize.medium,
    marginTop: 5,
  },
  icon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: UI.borderRadius.large,
  },
  quantity: {
    flexDirection: 'row',
    columnGap: 5,
    marginTop: 5,
  },

  quantityItem: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: UI.borderRadius.medium,

    borderWidth: 1,
  },
  quantityText: {
    color: '#000',
  },
})
