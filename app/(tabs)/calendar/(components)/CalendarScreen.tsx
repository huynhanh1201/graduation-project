import React, { useState } from "react";
import { View, Text, SectionList, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

// Đặt locale cho moment để hiển thị tiếng Việt
moment.locale("vi");

// Danh sách sự kiện
const eventsData = [
  { date: "2025-04-04", title: "Meeting", time: "10:00 - 11:00", type: "Họp", color: "#FECACA" },
  { date: "2025-04-05", title: "Emily Nicole", time: "Cả ngày", type: "Sinh nhật", color: "#D1FAE5", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  { date: "2025-04-06", title: "Samira Costa", time: "08:00 - 13:00", type: "Nghỉ phép", color: "#DBEAFE", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
  { date: "2025-04-08", title: "Samira Costa", time: "08:00 - 13:00", type: "Nghỉ phép", color: "#DBEAFE", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
];

// Tạo danh sách 7 ngày từ hôm nay
const generateNext7Days = () => {
  let days = [];
  for (let i = 0; i < 7; i++) {
    const date = moment().add(i, "days").format("YYYY-MM-DD");
    days.push(date);
  }
  return days;
};

const markedDates = eventsData.map(event => {
  const { date } = event;
  return {
    date,
    dots: [{ color: "#34D399", selectedDotColor: "#FFFFFF" }],
  };
});

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
        data: eventsForDate.length > 0 ? eventsForDate : [{ title: "Không có sự kiện", time: "", type: "", color: "#E5E7EB" }],
      };
    });
  };

  // @ts-ignore
  const renderEventItem = ({ item }) => (
    <View
      style={[
        styles.eventCard,
        viewMode === "grid" ? styles.eventCardGrid : styles.eventCardList,
      ]}
    >
      {item.avatar && <Image source={{ uri: item.avatar }} style={styles.avatar} />}
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        {item.time ? <Text style={styles.eventTime}>{item.time}</Text> : null}
      </View>
      {item.type ? (
        <View style={[styles.eventType, { backgroundColor: item.color || "#FFFFFF" }]}>
          <Text style={styles.eventTypeText}>{item.type}</Text>
        </View>
      ) : null}
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
          <Ionicons name={viewMode === "list" ? "grid" : "list"} size={24} color="white" />
          <Text style={styles.toggleButtonText}>
            {viewMode === "list" ? "Lưới" : "Danh sách"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lịch */}
      <CalendarStrip
        numDaysInWeek={7}
        style={{ height: 100, paddingTop: 10, paddingBottom: 10 }}
        calendarColor={"#F9FAFB"}
        calendarHeaderStyle={{ color: "#34D399", fontSize: 16 }}
        dateNumberStyle={{ color: "black", fontSize: 16 }}
        dateNameStyle={{ color: "gray", fontSize: 12 }}
        highlightDateNumberStyle={{ color: "white", fontSize: 16 }}
        highlightDateNameStyle={{ color: "white", fontSize: 12 }}
        highlightDateContainerStyle={{ backgroundColor: "#34D399" }}
        onDateSelected={(date) => setSelectedDate(moment(date).format("YYYY-MM-DD"))}
        selectedDate={moment(selectedDate)}
        markedDates={markedDates}
        showMonth={false}
      />

      {viewMode === "list" ? (
        <SectionList
          sections={getEventsForNext7Days()}
          keyExtractor={(item, index) => index.toString()}
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
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 16 },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 30,
  },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#34D399",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  toggleButtonText: { color: "white", fontSize: 14, marginLeft: 6 },

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
