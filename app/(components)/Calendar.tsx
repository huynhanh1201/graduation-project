import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import CalendarStrip from 'react-native-calendar-strip'
import moment from 'moment'
import 'moment/locale/vi'

import { Colors } from '~/constants/Colors'
import { UI } from '~/constants/UI'

moment.locale('vi')

export default function Header() {
  const [selectedDate, setSelectedDate] = useState(moment())

  // Hàm xử lý khi người dùng chọn một ngày
  const onDateSelected = (date: any) => {
    // Nếu người dùng chọn ngày hiện tại thì không làm gì
    if (date.isSame(moment(), 'day')) {
      return
    }
    setSelectedDate(date)
  }

  return (
    <View style={styles.container}>
      <CalendarStrip
        scrollable
        calendarHeaderFormat="MMM YYYY"
        style={styles.calendarStrip}
        selectedDate={selectedDate}
        onDateSelected={onDateSelected}
        calendarColor={'#fff'}
        calendarHeaderStyle={{ color: '#000', fontSize: 14 }}
        // Style mặc định cho ngày
        dateNumberStyle={{ color: 'black', fontSize: 12 }}
        dateNameStyle={{ color: 'black', fontSize: 12 }}
        // Khi active (ngày được chọn qua onDateSelected) áp dụng style highlight khác
        highlightDateNumberStyle={{
          color: Colors.light.primary,
          fontSize: 16,
          fontWeight: 'bold',
        }}
        highlightDateNameStyle={{
          color: Colors.light.primary,
          fontSize: 16,
          fontWeight: 'bold',
        }}
        // Dùng customDatesStyles để luôn active ngày hiện tại với màu riêng (màu đỏ)
        customDatesStyles={[
          {
            startDate: moment(), // ngày hiện tại
            dateNumberStyle: { color: 'red', fontSize: 16, fontWeight: 'bold' },
            dateNameStyle: { color: 'red', fontSize: 16, fontWeight: 'bold' },
          },
        ]}
        iconContainer={{ flex: 0.1 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  calendarStrip: {
    height: 100,
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: UI.borderRadius.large,
  },
})
