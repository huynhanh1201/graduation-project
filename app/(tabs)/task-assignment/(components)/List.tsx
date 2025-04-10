import React, { useState, useRef, useCallback, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Animated,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Modal,
  ScrollView,
  KeyboardEvent,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
const { height } = Dimensions.get('window')

const mockData = [
  { id: '1', category: 'Không tiêu đề', tasks: [] },
  {
    id: '2',
    category: 'Lên kế hoạch',
    tasks: [
      { id: 'task1', title: '[MẪU] Ý tưởng thiết kế', date: '25 Th.11' },
      { id: 'task2', title: '[MẪU] Phê duyệt chương trình', date: '06 Th.12' },
    ],
  },
  {
    id: '3',
    category: 'Triển khai',
    tasks: [
      { id: 'task3', title: '[MẪU] Website', date: '01 Th.12' },
      { id: 'task4', title: '[MẪU] Fanpage', date: '28 Th.11' },
    ],
  },
]

const List = ({ refreshKey }: { refreshKey: number }) => {
  const [data, setData] = useState(mockData)
  const [refreshing, setRefreshing] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >(() => {
    const initial: Record<string, boolean> = {}
    mockData.forEach(section => {
      initial[section.id] = true // Mặc định tất cả đều mở
    })
    return initial
  })

  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({})
  const [modalVisible, setModalVisible] = useState(false)
  const [detailModalVisible, setDetailModalVisible] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const translateY = useRef(new Animated.Value(height)).current

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setData([...mockData])
      setRefreshing(false)
    }, 1000)
  }

  // Refesh key của trang
  useEffect(() => {
    handleRefresh()
  }, [refreshKey])

  const toggleExpand = useCallback((categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }, [])

  const toggleTaskCheck = (taskId: string) => {
    setCheckedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId],
    }))
  }

  const showModal = () => {
    setModalVisible(true)
    Animated.timing(translateY, {
      toValue: height * 0.5,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  const hideModal = () => {
    Animated.timing(translateY, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false))
  }

  const openTaskDetail = (task: any) => {
    setSelectedTask(task)
    setDetailModalVisible(true)
  }

  const closeTaskDetail = () => {
    setDetailModalVisible(false)
    setSelectedTask(null)
  }

  useEffect(() => {
    const keyboardDidShow = (event: KeyboardEvent) => {
      Animated.timing(translateY, {
        toValue: height * 0.5 - event.endCoordinates.height,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }

    const keyboardDidHide = () => {
      Animated.timing(translateY, {
        toValue: height * 0.5,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }

    const showListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    )
    const hideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    )

    return () => {
      showListener.remove()
      hideListener.remove()
    }
  }, [])

  const renderTask = ({ item }: { item: any }) => {
    const isChecked = checkedTasks[item.id] || false

    return (
      <View style={styles.taskRow}>
        <TouchableOpacity
          style={[styles.checkbox, isChecked && styles.checkboxChecked]}
          onPress={() => toggleTaskCheck(item.id)}
        >
          {isChecked && <Feather name="check" size={14} color="white" />}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => openTaskDetail(item)}
        >
          <Text style={styles.taskText}>{item.title}</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        renderItem={({ item }) => {
          const isExpanded = expandedCategories[item.id] || false

          return (
            <View style={styles.section}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleExpand(item.id)}
              >
                <Feather
                  name={isExpanded ? 'chevron-down' : 'chevron-right'}
                  size={20}
                  color="black"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.sectionTitle}>{item.category}</Text>
              </TouchableOpacity>

              {isExpanded && (
                <FlatList
                  data={item.tasks}
                  keyExtractor={task => task.id}
                  renderItem={renderTask}
                />
              )}
            </View>
          )
        }}
      />

      <TouchableOpacity style={styles.addButton} onPress={showModal}>
        <Feather name="plus" size={28} color="white" />
      </TouchableOpacity>

      {modalVisible && (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={StyleSheet.absoluteFill}
          >
            <TouchableOpacity
              style={styles.overlay}
              activeOpacity={1}
              onPress={hideModal}
            />

            <Animated.View
              style={[styles.bottomSheet, { transform: [{ translateY }] }]}
            >
              <View style={styles.header}>
                <Text style={styles.title}>Việc của tôi</Text>
                <TouchableOpacity onPress={hideModal}>
                  <Text style={styles.createText}>Tạo</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Tên công việc..."
                placeholderTextColor="#aaa"
              />
            </Animated.View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )}

      <Modal
        visible={detailModalVisible}
        animationType="slide"
        onRequestClose={closeTaskDetail}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 16,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Chi tiết công việc
            </Text>
            <TouchableOpacity onPress={closeTaskDetail}>
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ padding: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>Công việc</Text>
            <TextInput
              style={styles.input}
              value={selectedTask?.title || ''}
              editable={false}
            />

            <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 20 }}>
              Địa chỉ
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập địa chỉ..."
              placeholderTextColor="#aaa"
            />

            <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 20 }}>
              Mô tả
            </Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Nhập mô tả..."
              placeholderTextColor="#aaa"
              multiline
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#F5F5F5',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#00C853',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: height * 0.6,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  createText: {
    color: '#00C853',
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 8,
    marginVertical: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#FF3B30',
    borderColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskText: {
    flex: 1,
    fontSize: 14,
  },
  dateText: {
    color: '#FF3B30',
    fontSize: 12,
  },
})

export default List
