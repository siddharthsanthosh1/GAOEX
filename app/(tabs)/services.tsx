import React from 'react';
import { Linking, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ServicesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const services = [
    {
      title: 'Global Career Counseling',
      description: 'Our Global Career Counseling Program (GCCP) primarily offers guidance in college admission process, career advice, and psychometric tests in accordance with international standards.',
      icon: '🎯',
      features: [
        'College admission guidance',
        'Career path counseling',
        'Psychometric testing',
        'International standards compliance'
      ]
    },
    {
      title: 'Educational Research Project',
      description: 'Our Educational Research Project (ERT) establishes international cross-cultural trainings across the globe and creates improvised learning platforms.',
      icon: '🔬',
      features: [
        'Cross-cultural training programs',
        'Research-based learning',
        'International collaboration',
        'Innovative learning platforms'
      ]
    },
    {
      title: 'Marginalized Student Empowerment',
      description: 'Our Marginalized Student Empowerment Program (MSEP) forecasts the future of "Young Minds" across the globe irrespective of money, social standards, caste, creed or race.',
      icon: '🌟',
      features: [
        'Inclusive education programs',
        'Financial aid support',
        'Social equality initiatives',
        'Community outreach'
      ]
    },
    {
      title: 'International Student Programs',
      description: 'The International Student Empowerment Program (ISEP) provides support and resources to international students studying in foreign countries.',
      icon: '🌍',
      features: [
        'International student support',
        'Cultural integration programs',
        'Academic assistance',
        'Global networking opportunities'
      ]
    },
    {
      title: 'Trainer Development',
      description: 'Trainer The Trainer Program (ISO CERTIFIED) - Professional development for educators and trainers.',
      icon: '👨‍🏫',
      features: [
        'ISO certified training',
        'Professional development',
        'Teaching methodologies',
        'Quality assurance standards'
      ]
    },
    {
      title: 'Organizational Outreach',
      description: 'Comprehensive training programs for schools, colleges, NGOs, and non-profit organizations.',
      icon: '🏢',
      features: [
        'Institutional training',
        'NGO capacity building',
        'Organizational development',
        'Community engagement'
      ]
    }
  ];

  const openWebsite = () => {
    Linking.openURL('https://www.gaoex.org');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedView style={styles.header}>
        <ThemedText style={[styles.headerTitle, { color: colors.text }]}>
          Our Services
        </ThemedText>
        <ThemedText style={[styles.headerSubtitle, { color: colors.icon }]}>
          Comprehensive educational solutions for global excellence
        </ThemedText>
      </ThemedView>

      {services.map((service, index) => (
        <ThemedView key={index} style={[styles.serviceCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.serviceHeader}>
            <ThemedText style={styles.serviceIcon}>{service.icon}</ThemedText>
            <ThemedText style={[styles.serviceTitle, { color: colors.text }]}>
              {service.title}
            </ThemedText>
          </View>
          
          <ThemedText style={[styles.serviceDescription, { color: colors.icon }]}>
            {service.description}
          </ThemedText>

          <View style={styles.featuresContainer}>
            {service.features.map((feature, featureIndex) => (
              <View key={featureIndex} style={styles.featureItem}>
                <ThemedText style={[styles.featureBullet, { color: colors.primary }]}>•</ThemedText>
                <ThemedText style={[styles.featureText, { color: colors.text }]}>
                  {feature}
                </ThemedText>
              </View>
            ))}
          </View>
        </ThemedView>
      ))}

      <ThemedView style={styles.ctaSection}>
        <ThemedText style={[styles.ctaTitle, { color: colors.text }]}>
          Ready to Get Started?
        </ThemedText>
        <ThemedText style={[styles.ctaDescription, { color: colors.icon }]}>
          Contact us to learn more about our services and how we can help you achieve your educational goals.
        </ThemedText>
        <TouchableOpacity 
          style={[styles.ctaButton, { backgroundColor: colors.primary }]} 
          onPress={openWebsite}
        >
          <ThemedText style={[styles.ctaButtonText, { color: 'white' }]}>
            Contact Us
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
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
  serviceCard: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  serviceIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
  },
  serviceDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  featuresContainer: {
    marginTop: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  featureBullet: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  featureText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
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