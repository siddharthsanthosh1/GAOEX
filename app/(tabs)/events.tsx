import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar as CalendarComponent } from 'react-native-calendars';

// Helper to get dates for this week
function getThisWeekDates() {
  const today = new Date();
  const week = [];
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay()); // Sunday
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    week.push(d.toISOString().slice(0, 10));
  }
  return week;
}

const weekDates = getThisWeekDates();

const mockEvents = [
  {
    id: '1',
    title: 'Leadership Excellence Workshop',
    description: 'Develop essential leadership skills for academic and professional success.',
    date: weekDates[0],
    time: '2:00 PM - 4:00 PM',
    location: 'Main Auditorium',
    category: 'Workshop',
  },
  {
    id: '2',
    title: 'STEM Innovation Fair',
    description: 'Showcase your innovative projects and connect with industry professionals.',
    date: weekDates[1],
    time: '10:00 AM - 3:00 PM',
    location: 'Science Building',
    category: 'Fair',
  },
  {
    id: '3',
    title: 'College Prep Seminar',
    description: 'Essential tips and strategies for college applications and scholarships.',
    date: weekDates[2],
    time: '1:00 PM - 3:30 PM',
    location: 'Conference Room A',
    category: 'Seminar',
  },
  {
    id: '4',
    title: 'Community Service Day',
    description: 'Join us in making a positive impact in our local community.',
    date: weekDates[3],
    time: '9:00 AM - 2:00 PM',
    location: 'Community Center',
    category: 'Service',
  },
  {
    id: '5',
    title: 'Art & Culture Fest',
    description: 'A celebration of art, music, and culture with performances and workshops.',
    date: weekDates[4],
    time: '5:00 PM - 8:00 PM',
    location: 'Auditorium',
    category: 'Festival',
  },
  {
    id: '6',
    title: 'Sports Day',
    description: 'Participate in various sports and games for all age groups.',
    date: weekDates[5],
    time: '8:00 AM - 1:00 PM',
    location: 'Sports Ground',
    category: 'Sports',
  },
  {
    id: '7',
    title: 'Parent-Teacher Meeting',
    description: 'Discuss student progress and future plans with teachers.',
    date: weekDates[6],
    time: '10:00 AM - 12:00 PM',
    location: 'Classrooms',
    category: 'Meeting',
  },
];

export default function EventsPage() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedDate, setSelectedDate] = useState(weekDates[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState(mockEvents.filter(e => e.date === weekDates[0]));
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [registeringEvent, setRegisteringEvent] = useState(null);

  // Mark all event dates on the calendar
  const markedDates = mockEvents.reduce((acc, event) => {
    acc[event.date] = { marked: true, dotColor: colors.primary };
    return acc;
  }, {});
  markedDates[selectedDate] = { ...(markedDates[selectedDate] || {}), selected: true, selectedColor: colors.primary };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    const events = mockEvents.filter(event => event.date === day.dateString);
    setSelectedEvents(events);
    setModalVisible(false);
  };

  const handleRegister = async (event) => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Error', 'Please enter your name and phone number.');
      return;
    }
    const registration = { ...event, name, phone };
    let myEvents = [];
    try {
      const stored = await AsyncStorage.getItem('myEvents');
      if (stored) myEvents = JSON.parse(stored);
      if (myEvents.some(e => e.id === event.id && e.phone === phone)) {
        Alert.alert('Already Registered', 'You have already registered for this event.');
        return;
      }
      myEvents.push(registration);
      await AsyncStorage.setItem('myEvents', JSON.stringify(myEvents));
      Alert.alert('Success', 'You are registered for this event!');
      setRegisteringEvent(null);
      setName('');
      setPhone('');
    } catch (e) {
      Alert.alert('Error', 'Could not save registration.');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <ThemedView style={styles.header}>
        <ThemedText style={[styles.headerTitle, { color: colors.text }]}>Events Calendar</ThemedText>
        <ThemedText style={[styles.headerSubtitle, { color: colors.icon }]}>See and register for upcoming events</ThemedText>
      </ThemedView>
      <CalendarComponent
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={{
          backgroundColor: colors.background,
          calendarBackground: colors.background,
          textSectionTitleColor: colors.primary,
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: '#fff',
          todayTextColor: colors.primary,
          dayTextColor: colors.text,
          textDisabledColor: '#d9e1e8',
          dotColor: colors.primary,
          selectedDotColor: '#fff',
          arrowColor: colors.primary,
          monthTextColor: colors.primary,
          indicatorColor: colors.primary,
          textDayFontWeight: '500',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '600',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
        style={styles.calendar}
      />
      <ThemedView style={styles.section}>
        <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>Events on {selectedDate}</ThemedText>
        {selectedEvents.length === 0 ? (
          <ThemedText style={{ color: colors.icon }}>No events for this day.</ThemedText>
        ) : (
          selectedEvents.map(event => (
            <ThemedView key={event.id} style={[styles.eventCard, { backgroundColor: colors.card, borderColor: colors.border }]}> 
              <ThemedText style={[styles.eventTitle, { color: colors.primary }]}>{event.title}</ThemedText>
              <ThemedText style={[styles.eventDate, { color: colors.icon }]}>{event.date} | {event.time}</ThemedText>
              <ThemedText style={[styles.eventLocation, { color: colors.text }]}>{event.location}</ThemedText>
              <ThemedText style={[styles.eventDescription, { color: colors.text }]}>{event.description}</ThemedText>
              <TouchableOpacity style={[styles.registerButton, { backgroundColor: colors.primary }]} onPress={() => setRegisteringEvent(event)}>
                <ThemedText style={styles.registerButtonText}>Register</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          ))
        )}
      </ThemedView>
      {/* Registration Modal */}
      <Modal visible={!!registeringEvent} transparent animationType="slide" onRequestClose={() => setRegisteringEvent(null)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}> 
            <ThemedText style={[styles.modalTitle, { color: colors.primary }]}>Register for {registeringEvent?.title}</ThemedText>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
              placeholder="Your Name"
              placeholderTextColor={colors.icon}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
              placeholder="Phone Number"
              placeholderTextColor={colors.icon}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <TouchableOpacity style={[styles.registerButton, { backgroundColor: colors.primary }]} onPress={() => handleRegister(registeringEvent)}>
              <ThemedText style={styles.registerButtonText}>Submit</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRegisteringEvent(null)} style={styles.closeButton}>
              <ThemedText style={{ color: colors.primary, fontWeight: 'bold' }}>Cancel</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 60 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  headerSubtitle: { fontSize: 16, lineHeight: 22 },
  section: { padding: 20, paddingTop: 0 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  eventCard: { padding: 20, marginBottom: 15, borderRadius: 12, borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  eventTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  eventDate: { fontSize: 14, marginBottom: 2 },
  eventLocation: { fontSize: 14, marginBottom: 2 },
  eventDescription: { fontSize: 14, marginBottom: 8 },
  registerButton: { paddingVertical: 10, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  registerButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { borderRadius: 16, padding: 24, width: '85%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 12, fontSize: 16 },
  closeButton: { marginTop: 8, alignItems: 'center' },
}); 