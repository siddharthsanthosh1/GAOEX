import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ProgramsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const programs = [
    {
      title: 'Global Excellence Student Awards 2024',
      description: 'Annual recognition program celebrating outstanding student achievements and contributions to education.',
      icon: '🏆',
      status: 'Open for Applications',
      deadline: 'December 31, 2024'
    },
    {
      title: 'Global Student Internship Program 2023',
      description: 'International internship opportunities providing real-world experience and professional development.',
      icon: '💼',
      status: 'Applications Closed',
      deadline: 'Completed'
    },
    {
      title: 'International Courses Enrollment',
      description: 'Enroll in our internationally recognized courses designed for global career advancement.',
      icon: '📚',
      status: 'Open for Enrollment',
      deadline: 'Rolling Admissions'
    },
    {
      title: 'International Competition Enrollment',
      description: 'Participate in global educational competitions and showcase your skills on an international platform.',
      icon: '🌍',
      status: 'Open for Registration',
      deadline: 'Varies by Competition'
    }
  ];

  const awards = [
    {
      title: 'Asian Award Winner 2022',
      description: 'Best Training Academy',
      icon: '🏅'
    },
    {
      title: 'Students Choice Award',
      description: 'Best Academy 2022 & 2023',
      icon: '🎓'
    },
    {
      title: 'Indian Glory Award 2023',
      description: 'Best Research Category',
      icon: '🌟'
    },
    {
      title: 'ISO Certification',
      description: 'Educational Organization',
      icon: '✅'
    }
  ];

  const openWebsite = () => {
    Linking.openURL('https://www.gaoex.org');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}> 
          Programs & Awards
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.icon }]}> 
          Discover opportunities for growth and recognition
        </Text>
      </View>

      {/* Current Programs */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}> 
          Current Programs
        </Text>
        {programs.map((program, index) => (
          <View key={index} style={[styles.programCard, { backgroundColor: colors.card, borderColor: colors.border }]}> 
            <View style={styles.programHeader}>
              <Text style={styles.programIcon}>{program.icon}</Text>
              <View style={styles.programTitleContainer}>
                <Text style={[styles.programTitle, { color: colors.text }]}> 
                  {program.title}
                </Text>
                <View style={[styles.statusBadge, { 
                  backgroundColor: program.status.includes('Open') ? '#22c55e' : '#f59e42' // green for open, orange for closed
                }]}> 
                  <Text style={[styles.statusText, { color: 'white' }]}> 
                    {program.status}
                  </Text>
                </View>
              </View>
            </View>
            
            <Text style={[styles.programDescription, { color: colors.icon }]}> 
              {program.description}
            </Text>

            <View style={styles.deadlineContainer}>
              <Text style={[styles.deadlineLabel, { color: colors.text }]}> 
                Deadline:
              </Text>
              <Text style={[styles.deadlineText, { color: colors.primary }]}> 
                {program.deadline}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Awards & Recognition */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}> 
          Awards & Recognition
        </Text>
        <View style={styles.awardsGrid}>
          {awards.map((award, index) => (
            <View key={index} style={[styles.awardCard, { backgroundColor: colors.card, borderColor: colors.border }]}> 
              <Text style={styles.awardIcon}>{award.icon}</Text>
              <Text style={[styles.awardTitle, { color: colors.text }]}> 
                {award.title}
              </Text>
              <Text style={[styles.awardDescription, { color: colors.icon }]}> 
                {award.description}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Testimonials */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}> 
          What Our Students Say
        </Text>
        <View style={[styles.testimonialCard, { backgroundColor: colors.card }]}>  
          <Text style={[styles.testimonialText, { color: colors.text }]}>  
            "It's the magic of Mrs. Prashitha Mam, an International Educationist, Founder/CEO of Global Academy Of Excellence who can read each student's mind and synchronizes to catch their focus and attention."
          </Text>
          <Text style={[styles.testimonialAuthor, { color: colors.primary }]}>  
            — Dr. K.P.V Sabareesh
          </Text>
        </View>
      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  programCard: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  programHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  programIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  programTitleContainer: {
    flex: 1,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  programDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deadlineLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  deadlineText: {
    fontSize: 14,
    fontWeight: '500',
  },
  awardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  awardCard: {
    width: '48%',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  awardIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  awardTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
  },
  awardDescription: {
    fontSize: 12,
    textAlign: 'center',
  },
  testimonialCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  testimonialText: {
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 15,
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  ctaSection: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  ctaButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 