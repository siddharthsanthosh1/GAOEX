import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../firebaseConfig';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

interface EventType {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  name?: string;
  phone?: string;
}

export default function MyEventsPage() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [myEvents, setMyEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profileVisible, setProfileVisible] = useState(false);
  const [error, setError] = useState('');



  // Request notification permissions
  const requestPermissions = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      Alert.alert('Permission required', 'Please enable notifications to receive event reminders.');
      return false;
    }
    
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    
    return true;
  };

  // Initialize notifications
  useEffect(() => {
    requestPermissions();

    // Listen for notification responses
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification tapped:', response);
    });

    return () => subscription.remove();
  }, []);

  // Function to check for today's events and send notifications
  const checkTodaysEvents = async (events: EventType[]) => {
    const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
    
    const todaysEvents = events.filter(event => event.date === today);
    
    // Cancel any existing notifications first
    await Notifications.cancelAllScheduledNotificationsAsync();
    
    for (const event of todaysEvents) {
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Event Reminder 📅",
            body: `${event.title} is today at ${event.time}`,
            sound: true,
            priority: Notifications.AndroidImportance.HIGH,
            data: { eventId: event.id, eventTitle: event.title },
          },
          trigger: null, // Show immediately
        });
      } catch (error) {
        console.error('Error scheduling notification:', error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: any) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      setMyEvents([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    const eventsColRef = collection(db, 'users', user.uid, 'events');
    const unsubscribe = onSnapshot(eventsColRef, (snapshot) => {
      const events: EventType[] = [];
      snapshot.forEach(docSnap => events.push({ id: docSnap.id, ...docSnap.data() } as EventType));
      setMyEvents(events);
      setLoading(false);
      
      // Check for today's events and send notifications
      checkTodaysEvents(events);
    }, (err) => {
      setError('You Currently Have No Events Registered');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleRemove = async (event: EventType) => {
    if (!user) return;

    Alert.alert('Remove Event', 'Are you sure you want to remove this event from My Events?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove', style: 'destructive', onPress: async () => {
          try {
            await deleteDoc(doc(db, 'users', user.uid, 'events', event.id));
            // setMyEvents handled by onSnapshot
          } catch {
            Alert.alert('Error', 'Could not remove event.');
          }
        }
      }
    ]);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setProfileVisible(false);
      router.replace('/'); // 👈 Navigate to login.tsx
    } catch {
      Alert.alert('Error', 'Could not log out.');
    }
  };

  if (loading) return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedText>Loading...</ThemedText>
    </View>
  );

  if (!user) return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedText>Please log in to view your events.</ThemedText>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <ThemedText style={[styles.title, { color: colors.text }]}>My Registered Events</ThemedText>
        
        {/* Profile Button */}
        <TouchableOpacity style={styles.profileIcon} onPress={() => setProfileVisible(true)}>
          <Ionicons name="person-circle" size={32} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {error ? (
        <ThemedText style={{ color: 'red', textAlign: 'center' }}>{error}</ThemedText>
      ) : myEvents.length === 0 ? (
        <ThemedText style={[styles.empty, { color: colors.icon }]}>
          You have not registered for any events yet.
        </ThemedText>
      ) : (
        <ScrollView>
          {myEvents.map((event, idx) => (
            <ThemedView key={event.id + idx} style={[styles.eventCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <ThemedText style={[styles.eventTitle, { color: colors.primary }]}>{event.title}</ThemedText>
              <ThemedText style={[styles.eventDate, { color: colors.icon }]}>{event.date} | {event.time}</ThemedText>
              <ThemedText style={[styles.eventLocation, { color: colors.text }]}>{event.location}</ThemedText>
              <ThemedText style={[styles.eventDescription, { color: colors.text }]}>{event.description}</ThemedText>
              <ThemedText style={[styles.userInfo, { color: colors.primary }]}>
                Registered as: {event.name} ({event.phone})
              </ThemedText>
              <TouchableOpacity 
                style={[styles.removeButton, { backgroundColor: colors.primary }]} 
                onPress={() => handleRemove(event)}
              >
                <ThemedText style={styles.removeButtonText}>Remove</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          ))}
        </ScrollView>
      )}

      <Modal 
        visible={profileVisible} 
        animationType="slide" 
        transparent 
        onRequestClose={() => setProfileVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.profileModal, { backgroundColor: colors.card }]}>
            <Ionicons name="person-circle" size={64} color={colors.primary} style={{ alignSelf: 'center', marginBottom: 12 }} />
            <ThemedText style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>
              Profile
            </ThemedText>
            <ThemedText style={{ textAlign: 'center', marginBottom: 16 }}>
              {user.email}
            </ThemedText>
            <TouchableOpacity 
              style={[styles.logoutButton, { backgroundColor: colors.primary }]} 
              onPress={handleLogout}
            >
              <ThemedText style={styles.logoutButtonText}>Logout</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setProfileVisible(false)} style={{ marginTop: 12 }}>
              <ThemedText style={{ color: colors.primary, textAlign: 'center' }}>Close</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, paddingTop: 60 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', flex: 1 },
  profileIcon: { position: 'absolute', right: 20, top: 60 },
  empty: { fontSize: 16, textAlign: 'center', marginTop: 40 },
  eventCard: { padding: 20, margin: 20, marginTop: 0, borderRadius: 12, borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  eventTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  eventDate: { fontSize: 14, marginBottom: 2 },
  eventLocation: { fontSize: 14, marginBottom: 2 },
  eventDescription: { fontSize: 14, marginBottom: 8 },
  userInfo: { fontSize: 14, marginBottom: 8 },
  removeButton: { paddingVertical: 8, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  removeButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  profileModal: { width: 300, borderRadius: 16, padding: 24, alignItems: 'center' },
  logoutButton: { width: '100%', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  logoutButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});