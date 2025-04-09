import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
moment.locale("vi");

const eventsData = [
  { id: "1", date: "2025-04-09", title: "Meeting", time: "10:00 - 11:00", type: "Họp", color: "#FECACA" },
  { id: "5", date: "2025-04-09", title: "Meeting", time: "10:00 - 11:00", type: "Họp", color: "#FECACA" },
  { id: "2", date: "2025-04-10", title: "Emily Nicole", time: "Cả ngày", type: "Sinh nhật", color: "#D1FAE5", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: "3", date: "2025-04-11", title: "Samira Costa", time: "08:00 - 13:00", type: "Nghỉ phép", color: "#DBEAFE", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
  { id: "4", date: "2025-04-11", title: "Samira Costa", time: "08:00 - 13:00", type: "Nghỉ phép", color: "#DBEAFE", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
];

const generateNext7Days = () => {
  let days = [];
  for (let i = 0; i < 7; i++) {
    days.push(moment().add(i, "days").format("YYYY-MM-DD"));
  }
  return days;
};

const getDayInfo = (date: moment.MomentInput) => ({
  date,
  dayNumber: moment(date).format('D'),
  dayName: moment(date).format('ddd'),
  hasEvent: eventsData.some(event => event.date === date),
})

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
  const [viewMode, setViewMode] = useState("list");

  const next7Days = generateNext7Days();
  const currentMonth = moment().format("MMMM YYYY");

  const getEventsForNext7Days = () => {
    return next7Days.map(date => {
      const eventsForDate = eventsData.filter(event => event.date === date);
      return {
        title: moment(date).format("ddd, D [Th.]M"),
        data: eventsForDate.length > 0
          ? eventsForDate
          : [{ id: `empty-${date}`, title: "Không có sự kiện", time: "", type: "", color: "#E5E7EB" }],
      };
    });
  };

  // @ts-ignore
  const renderEventItem = ({ item }) => (
    <View style={[
      styles.eventCard,
      viewMode === "grid" ? styles.eventCardGrid : styles.eventCardList,
    ]}>
      {item.avatar && <Image source={{ uri: item.avatar }} style={styles.avatar} />}
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        {item.time ? <Text style={styles.eventTime}>{item.time}</Text> : null}
      </View>
      {item.type && (
        <View style={[styles.eventType, { backgroundColor: item.color || "#f5f5f5" }]}>
          <Text style={styles.eventTypeText}>{item.type}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{currentMonth}</Text>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setViewMode(viewMode === "list" ? "grid" : "list")}
        >
          <Ionicons name={viewMode === "list" ? "grid" : "list"} size={20} color="white" />
          <Text style={styles.toggleButtonText}>
            {viewMode === "list" ? "Lưới" : "Danh sách"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Strip */}
      <View style={{ height: 90, marginVertical: 10 }}>
        <FlatList
          data={next7Days}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const day = getDayInfo(item);
            const isSelected = selectedDate === item;
            return (
              <TouchableOpacity
                style={[
                  styles.dayItem,
                  isSelected && styles.selectedDayItem
                ]}
                onPress={() => setSelectedDate(item)}
              >
                <Text style={[styles.dayName, isSelected && styles.selectedDayText]}>
                  {day.dayName}
                </Text>
                <Text style={[styles.dayNumber, isSelected && styles.selectedDayText]}>
                  {day.dayNumber}
                </Text>
                {day.hasEvent && <View style={styles.dot} />}
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Events */}
      {viewMode === "list" ? (
        <SectionList
          sections={getEventsForNext7Days()}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderItem={renderEventItem}
        />
      ) : (
        <FlatList
          data={next7Days.map(date => ({
            date,
            events: eventsData.filter(event => event.date === date),
          }))}
          keyExtractor={(item) => item.date}
          numColumns={2}
          columnWrapperStyle={styles.gridContainer}
          renderItem={({ item }) => (
            <View style={styles.gridItem}>
              <Text style={styles.sectionHeader}>{moment(item.date).format("ddd, D [Th.]M")}</Text>
              {item.events.length > 0 ? (
                item.events.map((event, index) => (
                  <View key={`${item.date}-${index}`}>
                    {renderEventItem({ item: event })}
                  </View>
                ))
              ) : (
                <Text style={styles.empty}>Không có sự kiện</Text>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 16 },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: { fontSize: 24, fontWeight: "bold" },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1ccc78",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 0,
  },
  toggleButtonText: { color: "white", fontSize: 14, marginLeft: 6 , backgroundColor: '#1ccc78' },

  // Calendar Strip
  dayItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
  },
  selectedDayItem: {
    backgroundColor: "#1ccc78",
  },
  dayName: {
    fontSize: 14,
    color: "#11181C",
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#11181C",
  },
  selectedDayText: {
    color: "white",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
    marginTop: 4,
  },

  // Events
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#34D399",
    marginVertical: 10,
  },
  gridContainer: {
    justifyContent: "space-between",
  },
  eventCard: {
    backgroundColor: "white",
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridItem: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    margin: 5,
    borderRadius: 10,
    elevation: 3,
  },
  empty: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 10,
  },
  eventCardGrid: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  eventCardList: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12, marginBottom: 8 },
  eventInfo: { flex: 1 },
  eventTitle: { fontSize: 16, fontWeight: "bold" },
  eventTime: { fontSize: 14, color: "#6B7280" },
  eventType: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  eventTypeText: { fontSize: 12, fontWeight: "bold" },
});
