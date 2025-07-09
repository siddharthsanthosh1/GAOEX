import { LinearGradient } from 'expo-linear-gradient';
import { Linking, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const achievements = [
    { number: '500+', label: 'Organizations' },
    { number: '10,000+', label: 'Students' },
    { number: '100+', label: 'Trainers' },
  ];

  const featuredPrograms = [
    {
      title: 'Global Career Counseling',
      description: 'Guidance in college admission process, career advice, and psychometric tests',
      icon: '🎯',
    },
    {
      title: 'Educational Research Project',
      description: 'International cross-cultural trainings and improvised learning platforms',
      icon: '🔬',
    },
    {
      title: 'Student Empowerment',
      description: 'Support for marginalized students regardless of background',
      icon: '🌟',
    },
  ];

  const openWebsite = () => {
    Linking.openURL('https://www.gaoex.org');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Hero Section */}
      <LinearGradient
        colors={[colors.primary, colors.accent]}
        style={[
          styles.heroSection,
          Platform.select({ ios: { paddingTop: 80 }, android: { paddingTop: 60 } }),
        ]}
      >
        <View style={styles.heroContent}>
          <ThemedText style={styles.heroTitle}>Global Academy Of Excellence</ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            Empowering minds across the globe through quality education
          </ThemedText>
          <TouchableOpacity style={styles.ctaButton} onPress={openWebsite}>
            <ThemedText style={styles.ctaButtonText}>Visit Website</ThemedText>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Achievements Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
          Center Achievements
        </ThemedText>
        <View style={styles.achievementsContainer}>
          {achievements.map((achievement, index) => (
            <View key={index} style={[styles.achievementCard, { backgroundColor: colors.card }]}>
              <ThemedText style={[styles.achievementNumber, { color: colors.primary }]}>
                {achievement.number}
              </ThemedText>
              <ThemedText style={[styles.achievementLabel, { color: colors.text }]}>
                {achievement.label}
              </ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>

      {/* Featured Programs */}
      <ThemedView style={styles.section}>
        <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
          Featured Programs
        </ThemedText>
        {featuredPrograms.map((program, index) => (
          <View key={index} style={[styles.programCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.programHeader}>
              <ThemedText style={styles.programIcon}>{program.icon}</ThemedText>
              <ThemedText style={[styles.programTitle, { color: colors.text }]}>
                {program.title}
              </ThemedText>
            </View>
            <ThemedText style={[styles.programDescription, { color: colors.icon }]}>
              {program.description}
            </ThemedText>
          </View>
        ))}
      </ThemedView>

      {/* Founder Quote */}
      <ThemedView style={[styles.quoteSection, { backgroundColor: colors.card }]}>
        <ThemedText style={[styles.quoteText, { color: colors.text }]}>
          "Education has potential answers to all problems. Transfer of knowledge or imparting of education is the need of the hour to every deserving individual to obtain a deserved education which is uncategorized by money, race or caste or by any other social status."
        </ThemedText>
        <ThemedText style={[styles.quoteAuthor, { color: colors.primary }]}>
          — PRASHITHA AVINASH
        </ThemedText>
      </ThemedView>

      {/* Awards Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
          Recognition & Awards
        </ThemedText>
        <View style={[styles.awardsContainer, { backgroundColor: colors.card }]}>
          <ThemedText style={[styles.awardItem, { color: colors.text }]}>
            🏆 ISO Certified Educational Organization
          </ThemedText>
          <ThemedText style={[styles.awardItem, { color: colors.text }]}>
            ⭐ 5 Star Google Rated (GMB)
          </ThemedText>
          <ThemedText style={[styles.awardItem, { color: colors.text }]}>
            🏅 Asian Award Winner 2022
          </ThemedText>
          <ThemedText style={[styles.awardItem, { color: colors.text }]}>
            🎓 Students Choice Award 2022-2023
          </ThemedText>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  ctaButton: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: '#1e40af',
    fontWeight: '600',
    fontSize: 16,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  achievementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  achievementCard: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 5,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  achievementLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  programCard: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 1,
  },
  programHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  programIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  programDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  quoteSection: {
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 15,
  },
  quoteAuthor: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  awardsContainer: {
    padding: 20,
    borderRadius: 12,
  },
  awardItem: {
    fontSize: 16,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
