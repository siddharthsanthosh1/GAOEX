import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function MyEventsPage() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const stored = await AsyncStorage.getItem('myEvents');
      setMyEvents(stored ? JSON.parse(stored) : []);
    } catch {
      setMyEvents([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = () => {
      loadEvents();
    };
    loadEvents();
    return unsubscribe;
  }, []);

  const handleRemove = async (event) => {
    Alert.alert('Remove Event', 'Are you sure you want to remove this event from My Events?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove', style: 'destructive', onPress: async () => {
          const filtered = myEvents.filter(e => !(e.id === event.id && e.phone === event.phone));
          await AsyncStorage.setItem('myEvents', JSON.stringify(filtered));
          setMyEvents(filtered);
        }
      }
    ]);
  };

  if (loading) return <View style={[styles.container, { backgroundColor: colors.background }]}><ThemedText>Loading...</ThemedText></View>;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <ThemedView style={styles.header}>
        <ThemedText style={[styles.title, { color: colors.text }]}>My Registered Events</ThemedText>
      </ThemedView>
      {myEvents.length === 0 ? (
        <ThemedText style={[styles.empty, { color: colors.icon }]}>You have not registered for any events yet.</ThemedText>
      ) : (
        myEvents.map((event, idx) => (
          <ThemedView key={event.id + event.phone + idx} style={[styles.eventCard, { backgroundColor: colors.card, borderColor: colors.border }]}> 
            <ThemedText style={[styles.eventTitle, { color: colors.primary }]}>{event.title}</ThemedText>
            <ThemedText style={[styles.eventDate, { color: colors.icon }]}>{event.date} | {event.time}</ThemedText>
            <ThemedText style={[styles.eventLocation, { color: colors.text }]}>{event.location}</ThemedText>
            <ThemedText style={[styles.eventDescription, { color: colors.text }]}>{event.description}</ThemedText>
            <ThemedText style={[styles.userInfo, { color: colors.primary }]}>Registered as: {event.name} ({event.phone})</ThemedText>
            <TouchableOpacity style={[styles.removeButton, { backgroundColor: colors.primary }]} onPress={() => handleRemove(event)}>
              <ThemedText style={styles.removeButtonText}>Remove</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 60 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  empty: { fontSize: 16, textAlign: 'center', marginTop: 40 },
  eventCard: { padding: 20, margin: 20, marginTop: 0, borderRadius: 12, borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  eventTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  eventDate: { fontSize: 14, marginBottom: 2 },
  eventLocation: { fontSize: 14, marginBottom: 2 },
  eventDescription: { fontSize: 14, marginBottom: 8 },
  userInfo: { fontSize: 14, marginBottom: 8 },
  removeButton: { paddingVertical: 8, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  removeButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
}); 