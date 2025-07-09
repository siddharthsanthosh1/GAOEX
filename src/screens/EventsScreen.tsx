import { Calendar, Clock, MapPin, Users } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  image: string;
  category: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Leadership Excellence Workshop',
    description: 'Develop essential leadership skills for academic and professional success.',
    date: '2024-01-15',
    time: '2:00 PM - 4:00 PM',
    location: 'Main Auditorium',
    capacity: 50,
    registered: 32,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
    category: 'Workshop',
  },
  {
    id: '2',
    title: 'STEM Innovation Fair',
    description: 'Showcase your innovative projects and connect with industry professionals.',
    date: '2024-01-20',
    time: '10:00 AM - 3:00 PM',
    location: 'Science Building',
    capacity: 100,
    registered: 78,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
    category: 'Fair',
  },
  {
    id: '3',
    title: 'College Prep Seminar',
    description: 'Essential tips and strategies for college applications and scholarships.',
    date: '2024-01-25',
    time: '1:00 PM - 3:30 PM',
    location: 'Conference Room A',
    capacity: 30,
    registered: 25,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400',
    category: 'Seminar',
  },
  {
    id: '4',
    title: 'Community Service Day',
    description: 'Join us in making a positive impact in our local community.',
    date: '2024-02-01',
    time: '9:00 AM - 2:00 PM',
    location: 'Community Center',
    capacity: 75,
    registered: 45,
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400',
    category: 'Service',
  },
];

export default function EventsScreen() {
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  const handleRegister = (event: Event) => {
    if (registeredEvents.includes(event.id)) {
      Alert.alert('Already Registered', 'You are already registered for this event.');
      return;
    }

    Alert.alert(
      'Confirm Registration',
      `Register for "${event.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Register',
          onPress: () => {
            setRegisteredEvents([...registeredEvents, event.id]);
            Alert.alert('Success', 'You have been registered for this event!');
          },
        },
      ]
    );
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Georgia Academy of Excellence</Text>
        <Text style={styles.headerSubtitle}>Upcoming Events</Text>
      </View>

      <View style={styles.eventsContainer}>
        {mockEvents.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Image source={{ uri: event.image }} style={styles.eventImage} />
            
            <View style={styles.eventContent}>
              <View style={styles.eventHeader}>
                <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(event.category) }]}> 
                  <Text style={styles.categoryText}>{event.category}</Text>
                </View>
                <Text style={styles.eventTitle}>{event.title}</Text>
              </View>

              <Text style={styles.eventDescription}>{event.description}</Text>

              <View style={styles.eventDetails}>
                <View style={styles.detailRow}>
                  <Calendar size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{new Date(event.date).toLocaleDateString()}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Clock size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{event.time}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MapPin size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{event.location}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Users size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{event.registered}/{event.capacity} registered</Text>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.registerButton,
                  registeredEvents.includes(event.id) && styles.registeredButton
                ]}
                onPress={() => handleRegister(event)}
                disabled={registeredEvents.includes(event.id)}
              >
                <Text style={[
                  styles.registerButtonText,
                  registeredEvents.includes(event.id) && styles.registeredButtonText
                ]}>
                  {registeredEvents.includes(event.id) ? 'Registered ✓' : 'Register Now'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#1e40af',
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#bfdbfe',
    textAlign: 'center',
    marginTop: 5,
  },
  eventsContainer: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    marginBottom: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  eventDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  eventDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4b5563',
  },
  registerButton: {
    backgroundColor: '#1e40af',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  registeredButton: {
    backgroundColor: '#10b981',
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  registeredButtonText: {
    color: '#ffffff',
  },
}); 