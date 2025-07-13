import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar as CalendarComponent } from 'react-native-calendars';
import { auth, db } from '../../firebaseConfig';

// Add Event type
interface EventType {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
}

// Helper to get dates for July 12th to July 19th, 2025
function getMockEventDates() {
  const base = new Date(2025, 6, 12); // July is month 6 (0-indexed)
  const dates = [];
  for (let i = 0; i < 8; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

const eventDates = getMockEventDates();

const mockEvents: EventType[] = [
  {
    id: '1',
    title: 'Leadership Excellence Workshop',
    description: 'Develop essential leadership skills for academic and professional success.',
    date: eventDates[0],
    time: '2:00 PM - 4:00 PM',
    location: 'Main Auditorium',
    category: 'Workshop',
  },
  {
    id: '2',
    title: 'STEM Innovation Fair',
    description: 'Showcase your innovative projects and connect with industry professionals.',
    date: eventDates[1],
    time: '10:00 AM - 3:00 PM',
    location: 'Science Building',
    category: 'Fair',
  },
  {
    id: '3',
    title: 'College Prep Seminar',
    description: 'Essential tips and strategies for college applications and scholarships.',
    date: eventDates[2],
    time: '1:00 PM - 3:30 PM',
    location: 'Conference Room A',
    category: 'Seminar',
  },
  {
    id: '4',
    title: 'Community Service Day',
    description: 'Join us in making a positive impact in our local community.',
    date: eventDates[3],
    time: '9:00 AM - 2:00 PM',
    location: 'Community Center',
    category: 'Service',
  },
  {
    id: '5',
    title: 'Art & Culture Fest',
    description: 'A celebration of art, music, and culture with performances and workshops.',
    date: eventDates[4],
    time: '5:00 PM - 8:00 PM',
    location: 'Auditorium',
    category: 'Festival',
  },
  {
    id: '6',
    title: 'Sports Day',
    description: 'Participate in various sports and games for all age groups.',
    date: eventDates[5],
    time: '8:00 AM - 1:00 PM',
    location: 'Sports Ground',
    category: 'Sports',
  },
  {
    id: '7',
    title: 'Parent-Teacher Meeting',
    description: 'Discuss student progress and future plans with teachers.',
    date: eventDates[6],
    time: '10:00 AM - 12:00 PM',
    location: 'Classrooms',
    category: 'Meeting',
  },
  {
    id: '8',
    title: 'Global Alumni Meetup',
    description: 'Reconnect with alumni and expand your professional network.',
    date: eventDates[7],
    time: '6:00 PM - 9:00 PM',
    location: 'Banquet Hall',
    category: 'Networking',
  },
];

export default function EventsPage() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedDate, setSelectedDate] = useState<string>(eventDates[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<EventType[]>(mockEvents.filter(e => e.date === eventDates[0]));
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [registeringEvent, setRegisteringEvent] = useState<EventType | null>(null);
  const [user, setUser] = useState<any>(null); // Use Firebase User type if available

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: any) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  // Mark all event dates on the calendar
  const markedDates: { [date: string]: any } = mockEvents.reduce((acc, event) => {
    acc[event.date] = { marked: true, dotColor: colors.primary };
    return acc;
  }, {} as { [date: string]: any });
  markedDates[selectedDate] = { ...(markedDates[selectedDate] || {}), selected: true, selectedColor: colors.primary };

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    const events = mockEvents.filter(event => event.date === day.dateString);
    setSelectedEvents(events);
    setModalVisible(false);
  };

  const handleRegister = async (event: EventType) => {
    // Prevent registration for past events
    const today = new Date();
    const eventDate = new Date(event.date);
    eventDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    if (eventDate < today) {
      Alert.alert('Registration Closed', 'You cannot register for events that have already happened.');
      return;
    } else if (eventDate == today) {
      Alert.alert('Registration Closed', 'You must register for events one day in advance.');
      return;
    }
    if (!user) {
      Alert.alert('Login Required', 'Please log in to register for events.');
      return;
    }
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Error', 'Please enter your name and phone number.');
      return;
    }
    const registration = { ...event, name, phone };
    try {
      const eventDocRef = doc(db, 'users', user.uid, 'events', event.id);
      const eventDoc = await getDoc(eventDocRef);
      if (eventDoc.exists()) {
        Alert.alert('Already Registered', 'You have already registered for this event.');
        return;
      }
      await setDoc(eventDocRef, registration);
      Alert.alert('Success', 'You are registered for this event!');
      setRegisteringEvent(null);
      setName('');
      setPhone('');
    } catch (e) {
      console.error(e);
      const err = e as any;
      Alert.alert('Error', err?.message || 'Could not save registration.');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <ThemedView style={styles.header}>
        <ThemedText style={[styles.headerTitle, { color: colors.text }]}>Events Calendar</ThemedText>
        <ThemedText style={[styles.headerSubtitle, { color: colors.icon }]}>See and register for upcoming events</ThemedText>
      </ThemedView>
      <CalendarComponent
        current="2025-07-12"
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
            <ThemedText style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: colors.primary }}>Register for {registeringEvent?.title}</ThemedText>
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
            <TouchableOpacity style={[styles.registerButton, { backgroundColor: colors.primary }]} onPress={() => handleRegister(registeringEvent!)}>
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
  headerTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  headerSubtitle: { fontSize: 16, lineHeight: 22 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  eventCard: { padding: 20, marginBottom: 16, borderRadius: 12, borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  eventTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  eventDate: { fontSize: 14, marginBottom: 2 },
  eventLocation: { fontSize: 14, marginBottom: 2 },
  eventDescription: { fontSize: 14, marginBottom: 8 },
  registerButton: { paddingVertical: 8, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  registerButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: 300, borderRadius: 16, padding: 24, backgroundColor: '#fff', alignItems: 'center' },
  closeButton: { marginTop: 16, color: '#1e40af', fontWeight: 'bold' },
  input: { width: '100%', borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 16 },
  // Add missing calendar style
  calendar: { marginHorizontal: 20, borderRadius: 12, marginBottom: 16 },
}); 