import React, { useState } from 'react'
import { View, StyleSheet, Modal, Pressable } from 'react-native'
import TopMenu from './(components)/TopMenu'
import List from './(components)/List'
import Calendar from './(components)/Calendar'
import Filter from './(components)/filter'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function TabTwoScreen() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [currentView, setCurrentView] = useState<'list' | 'calendar'>('list')
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  const handleSwitchView = (view: 'list' | 'calendar') => {
    setCurrentView(view)
  }

  const toggleFilter = () => {
    setIsFilterVisible(prev => !prev)
  }

  return (
    <View style={styles.container}>
      <TopMenu
        onRefresh={handleRefresh}
        onSwitchView={handleSwitchView}
        currentView={currentView}
        onPressFilter={toggleFilter}
      />
      <SafeAreaView style={{ flex: 1 }}>
        {currentView === 'list' ? (
          <List refreshKey={refreshKey} />
        ) : (
          <Calendar />
        )}

        {/* Filter Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isFilterVisible}
          onRequestClose={() => setIsFilterVisible(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setIsFilterVisible(false)}
          />
          <View style={styles.modalContainer}>
            <Filter />
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '45%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
    elevation: 10,
  },
})
