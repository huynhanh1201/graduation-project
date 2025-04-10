import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Appbar, RadioButton, Button } from 'react-native-paper'
import { useRouter } from 'expo-router'

import { Colors } from '~/constants/Colors'
import { UI } from '~/constants/UI'

export default function Filter() {
  const router = useRouter()
  const [checked, setChecked] = React.useState('first')

  const handleClear = () => {
    setChecked('')
  }

  const handleFilter = () => {
    console.log('Lọc theo:', checked)
    router.back() // hoặc navigate theo logic bạn muốn
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header statusBarHeight={0} dark={false} style={styles.appbar}>
        <Appbar.BackAction color="#000" onPress={() => router.back()} />
        <Appbar.Content title="Lọc" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      {/* Body */}
      <View style={styles.containerBody}>
        <View style={styles.containerTop}>
          {/* Danh sách bộ lọc */}
          <View style={styles.right}>
            <Text style={[styles.text, styles.activeRight]}>Chi nhánh</Text>
            <Text style={styles.text}>Phòng ban</Text>
          </View>

          <View style={styles.left}>
            {['Chi nhánh 1', 'Chi nhánh 2'].map((item, index) => {
              const value = index === 0 ? 'first' : 'second'
              return (
                <TouchableOpacity key={value} onPress={() => setChecked(value)}>
                  <View style={styles.blockRadioLeft}>
                    <Text style={styles.text}>{item}</Text>
                    <RadioButton
                      value={value}
                      color={Colors.light.primary}
                      status={checked === value ? 'checked' : 'unchecked'}
                      onPress={() => setChecked(value)}
                    />
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.containerBottom}>
          <Button
            style={styles.button}
            mode="outlined"
            textColor={Colors.light.primary}
            onPress={handleClear}
          >
            XÓA LỌC
          </Button>

          <Button
            style={styles.button}
            mode="contained"
            buttonColor={Colors.light.primary}
            textColor="#fff"
            onPress={handleFilter}
          >
            LỌC
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  appbar: {
    backgroundColor: Colors.light.background,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  appbarTitle: {
    color: '#000',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  containerBody: {
    flex: 1,
    paddingHorizontal: UI.paddingBody.paddingRight,
    justifyContent: 'space-between',
  },
  containerTop: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 20,
  },
  right: {
    flex: 4,
    backgroundColor: '#e7f5eead',
    marginLeft: -15,
  },
  activeRight: {
    backgroundColor: '#d2f5e4',
    color: Colors.light.primary,
  },
  left: {
    flex: 6,
  },
  blockRadioLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 10,
  },
  containerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    columnGap: 15,
  },
  button: {
    flex: 1,
  },
})
