import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'

import { Colors } from '~/constants/Colors'
import Header from '~/app/(components)/Header'
import Calendar from '~/app/(components)/Calendar'
import ClockIn from '~/app/(components)/ClockIn'
import Module, { gap } from '~/app/(components)/Module'
import Title from '~/components/Title'
import { UI } from '~/constants/UI'

export default function Index() {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView>
        <Title text={'Lịch làm việc'} marginTop={10} />
        <Calendar />
        <ClockIn />
        <Title text={'Thư mục'} marginTop={10} />
        <View style={styles.module}>
          <Module
            href="/requirement"
            text="Yêu cầu"
            colorBackgroundIcon={'#FF3333'}
            icon="clipboard-list-outline"
          />
          <Module
            href="/timesheet"
            text="Chấm công"
            hidden
            colorBackgroundIcon={'#009999'}
            icon="briefcase-check-outline"
          />
          <Module
            href="/shift-arrangement"
            text="Xếp ca"
            hidden
            colorBackgroundIcon={'#3366FF'}
            icon="timetable"
          />
          <Module
            href="/salary"
            text="Phiếu lương"
            hidden
            colorBackgroundIcon={'#FF6633'}
            icon="file-document-outline"
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingLeft: UI.paddingBody.paddingLeft,
    paddingRight: UI.paddingBody.paddingRight,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  module: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: gap,
    marginTop: 10,
    marginBottom: 10,
  },
})
