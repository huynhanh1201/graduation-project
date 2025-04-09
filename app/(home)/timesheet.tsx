import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Appbar, SegmentedButtons } from 'react-native-paper'
import { Link, useRouter } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import { Colors } from '~/constants/Colors'
import { UI } from '~/constants/UI'
import { MaterialIcons } from '@expo/vector-icons'

export default function Timesheet() {
  const router = useRouter()
  const [value, setValue] = useState('in-out')

  return (
    <View style={styles.container}>
      <Appbar.Header statusBarHeight={0} dark={false} style={styles.appbar}>
        <Appbar.BackAction color="#000" onPress={() => router.back()} />
        <Appbar.Content title="Chấm công" titleStyle={{ color: '#000' }} />

        <View style={styles.action}>
          <Link href="/filter">
            <Image
              source={require('~/assets/icon/filter-icon.jpg')}
              style={{ width: 50, height: 50 }}
            />
          </Link>
          <FontAwesome name="refresh" size={27} color="black" />
        </View>
      </Appbar.Header>

      <View style={styles.containerBody}>
        <SegmentedButtons
          style={styles.segmentedButtons}
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: 'in-out',
              label: 'Vào/Ra',
              checkedColor: '#fff',
              uncheckedColor: '#888',
              style:
                value === 'in-out'
                  ? styles.segmentedButtonsButtonChecked
                  : styles.segmentedButtonsButton,
            },
            {
              value: 'time-card',
              label: 'Bảng công',
              checkedColor: '#fff',
              uncheckedColor: '#888',
              style:
                value === 'time-card'
                  ? styles.segmentedButtonsButtonChecked
                  : styles.segmentedButtonsButton,
            },
          ]}
        />

        {value === 'in-out' ? (
          <View style={styles.timekeepingInformationContainer}>
            <Text style={styles.timekeepingInformationDate}>
              Hôm nay, 03.04
            </Text>

            <View style={styles.timekeepingInformation}>
              <View style={styles.timekeepingInformationItem1}>
                <MaterialIcons name="phone-iphone" size={24} color="#fff" />
              </View>

              <View style={styles.timekeepingInformationItem2}>
                <Text style={styles.timekeepingInformationTitle}>
                  Huynh Anh
                </Text>
                <Text style={styles.timekeepingInformationDesc}>
                  Vào ca trên điện thoại
                </Text>
              </View>

              <View style={styles.timekeepingInformationItem3}>
                <Text style={styles.timekeepingInformationTime}>09:40</Text>
              </View>
            </View>

            <View style={styles.timekeepingInformation}>
              <View style={styles.timekeepingInformationItem1}>
                <MaterialIcons name="phone-iphone" size={24} color="#fff" />
              </View>

              <View style={styles.timekeepingInformationItem2}>
                <Text style={styles.timekeepingInformationTitle}>
                  Huynh Anh
                </Text>
                <Text style={styles.timekeepingInformationDesc}>
                  Ra ca trên điện thoại
                </Text>
              </View>

              <View
                style={[
                  styles.timekeepingInformationItem3,
                  styles.timekeepingInformationTimeOut,
                ]}
              >
                <Text style={styles.timekeepingInformationTime}>09:40</Text>
              </View>
            </View>
          </View>
        ) : (
          <View>
            <Text style={{ fontSize: 26 }}>Bảng công</Text>
          </View>
        )}
      </View>
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
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
    marginRight: UI.paddingBody.paddingRight,
  },
  containerBody: {
    flex: 1,
    padding: UI.paddingBody.paddingRight,
  },
  segmentedButtons: {
    color: '#000',
    backgroundColor: Colors.light.background,
  },
  segmentedButtonsButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  segmentedButtonsButtonChecked: {
    backgroundColor: Colors.light.primary,
    borderWidth: 0,
  },

  timekeepingInformationContainer: {
    flexDirection: 'column',
    marginTop: UI.paddingBody.paddingRight,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  timekeepingInformation: {
    flexDirection: 'row',
    columnGap: 15,
    marginTop: UI.paddingBody.paddingRight,
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  timekeepingInformationItem1: {
    backgroundColor: '#76adff',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  timekeepingInformationItem2: {
    flex: 1,
  },
  timekeepingInformationItem3: {
    width: 80,
    height: 40,
    backgroundColor: '#CCFFCC',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timekeepingInformationTimeOut: {
    backgroundColor: '#F5A89A',
  },
  timekeepingInformationTime: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },

  timekeepingInformationDate: {
    fontSize: 16,
    color: '#888',
  },

  timekeepingInformationTitle: {
    fontSize: 16,
  },
  timekeepingInformationDesc: {
    color: '#888',
    marginTop: 5,
  },
})
