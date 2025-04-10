import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { RadioButton, Button } from 'react-native-paper'

import { Colors } from '~/constants/Colors'
import { UI } from '~/constants/UI'

export default function Filter() {
  const router = useRouter()
  const [checked, setChecked] = React.useState('first')

  return (
    <View style={styles.container}>
      <Appbar.Header statusBarHeight={0} dark={false} style={styles.appbar}>
        {/*<Appbar.BackAction color="#000" onPress={() => router.back()} />*/}
        <Appbar.Content title="Lọc" titleStyle={{ color: '#000' }} />
      </Appbar.Header>

      <View style={styles.containerBody}>
        <View style={styles.containerTop}>
          <View style={styles.right}>
            <Text style={[styles.text, styles.activeRight]}>Lên kế hoạch</Text>
            <Text style={styles.text}>Triển khai</Text>
          </View>

          <View style={styles.left}>
            <TouchableOpacity onPress={() => setChecked('first')}>
              <View style={styles.blockRadioLeft}>
                <Text style={styles.text}>Lên kế hoạch</Text>
                <RadioButton
                  value="first"
                  color={Colors.light.primary}
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setChecked('second')}>
              <View style={styles.blockRadioLeft}>
                <Text style={styles.text}>Triển khai</Text>
                <RadioButton
                  value="second"
                  color={Colors.light.primary}
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('second')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerBottom}>
          <Button
            style={styles.button}
            theme={{
              colors: {
                primary: Colors.light.primary,
                outline: Colors.light.primary,
              },
            }}
            mode="outlined"
            onPress={() => console.log('Pressed')}
          >
            XÓA LỌC
          </Button>

          <Button
            style={styles.button}
            buttonColor={Colors.light.primary}
            theme={{
              colors: {
                outline: Colors.light.primary,
              },
            }}
            textColor={'#fff'}
            mode="outlined"
            onPress={() => console.log('Pressed')}
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
  text: {
    fontSize: 18,
    padding: 15,
  },

  containerBody: {
    flex: 1,
    paddingLeft: UI.paddingBody.paddingRight,
    paddingRight: UI.paddingBody.paddingRight,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  containerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
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
  },
  containerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
    columnGap: 15,
  },
  button: {
    flex: 5,
  },
})
