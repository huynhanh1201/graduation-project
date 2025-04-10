import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native'
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons'

const TopMenu = ({
  onRefresh,
  onSwitchView,
  currentView,
  onPressFilter,
}: {
  onRefresh: () => void
  onSwitchView: (view: 'list' | 'calendar') => void
  currentView: 'list' | 'calendar'
  onPressFilter: () => void
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    onRefresh()

    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/4.jpg' }}
          style={styles.avatar}
        />

        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            Giao việc
          </Text>
          <Text style={styles.subtitle}>Việc của tôi</Text>
        </View>

        <TouchableOpacity onPress={handleRefresh}>
          {isRefreshing ? (
            <Feather name="loader" size={20} color="blue" />
          ) : (
            <Feather name="refresh-cw" size={20} color="black" />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={() => onSwitchView('list')}>
            <MaterialCommunityIcons
              name="format-list-checkbox"
              size={20}
              color={currentView === 'list' ? '#4CAF50' : '#757575'}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onSwitchView('calendar')}>
            <AntDesign
              name="calendar"
              size={20}
              color={currentView === 'calendar' ? '#4CAF50' : '#757575'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={16}
            color="#757575"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Tên công việc..."
            placeholderTextColor="#757575"
          />
        </View>

        <TouchableOpacity style={styles.filterButton} onPress={onPressFilter}>
          <Feather name="sliders" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 12,
    color: '#757575',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 8,
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 36,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  filterButton: {
    position: 'relative',
    padding: 6,
  },
})

export default TopMenu
