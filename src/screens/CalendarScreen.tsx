import { Clock, MapPin, X } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Calendar as CalendarComponent } from 'react-native-calendars';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
}

// Mock registered events data
const registeredEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Leadership Excellence Workshop',
    date: '2024-01-15',
    time: '2:00 PM - 4:00 PM',
    location: 'Main Auditorium',
    category: 'Workshop',
  },
  {
    id: '2',
    title: 'STEM Innovation Fair',
    date: '2024-01-20',
    time: '10:00 AM - 3:00 PM',
    location: 'Science Building',
    category: 'Fair',
  },
  {
    id: '3',
    title: 'College Prep Seminar',
    date: '2024-01-25',
    time: '1:00 PM - 3:30 PM',
    location: 'Conference Room A',
    category: 'Seminar',
  },
  {
    id: '4',
    title: 'Community Service Day',
    date: '2024-02-01',
    time: '9:00 AM - 2:00 PM',
    location: 'Community Center',
    category: 'Service',
  },
];

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);

  // Create marked dates object for the calendar
  const markedDates = registeredEvents.reduce((acc, event) => {
    acc[event.date] = {
      marked: true,
      dotColor: '#1e40af',
      selectedColor: '#1e40af',
    };
    return acc;
  }, {} as any);

  const handleDayPress = (day: any) => {
    const dateEvents = registeredEvents.filter(event => event.date === day.dateString);
    setSelectedDate(day.dateString);
    setSelectedEvents(dateEvents);
    if (dateEvents.length > 0) {
      setModalVisible(true);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Workshop': return '#3b82f6';
      case 'Fair': return '#10b981';
      case 'Seminar': return '#f59e0b';
      case 'Service': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <CalendarComponent
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#1e40af',
          selectedDayBackgroundColor: '#1e40af',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#1e40af',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#1e40af',
          selectedDotColor: '#ffffff',
          arrowColor: '#1e40af',
          monthTextColor: '#1e40af',
          indicatorColor: '#1e40af',
          textDayFontWeight: '500',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '600',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
        style={styles.calendar}
      />

      <View style={styles.upcomingSection}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <ScrollView style={styles.eventsList}>
          {registeredEvents.map((event) => (
            <View key={event.id} style={styles.eventItem}>
              <View style={[styles.eventIndicator, { backgroundColor: getCategoryColor(event.category) }]} />
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.eventDetails}>
                  <View style={styles.detailRow}>
                    <Clock size={14} color="#6b7280" />
                    <Text style={styles.detailText}>{event.time}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MapPin size={14} color="#6b7280" />
                    <Text style={styles.detailText}>{event.location}</Text>
                  </View>
                </View>
                <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {formatDate(selectedDate)}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalEventsList}>
              {selectedEvents.map((event) => (
                <View key={event.id} style={styles.modalEventItem}>
                  <View style={[styles.modalEventIndicator, { backgroundColor: getCategoryColor(event.category) }]} />
                  <View style={styles.modalEventInfo}>
                    <Text style={styles.modalEventTitle}>{event.title}</Text>
                    <View style={styles.modalEventDetails}>
                      <View style={styles.detailRow}>
                        <Clock size={16} color="#6b7280" />
                        <Text style={styles.detailText}>{event.time}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <MapPin size={16} color="#6b7280" />
                        <Text style={styles.detailText}>{event.location}</Text>
                      </View>
                    </View>
                    <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(event.category) }]}> 
                      <Text style={styles.categoryText}>{event.category}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  upcomingSection: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  eventsList: {
    flex: 1,
  },
  eventItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  eventIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  eventDetails: {
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#6b7280',
  },
  eventDate: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  closeButton: {
    padding: 4,
  },
  modalEventsList: {
    padding: 20,
  },
  modalEventItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  modalEventIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: 16,
  },
  modalEventInfo: {
    flex: 1,
  },
  modalEventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  modalEventDetails: {
    marginBottom: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
}); 