import React, { useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ContactScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const contactInfo = [
    {
      title: 'Website',
      value: 'www.gaoex.org',
      icon: '🌐',
      action: () => Linking.openURL('https://www.gaoex.org')
    },
    {
      title: 'Email',
      value: 'info@gaoex.org',
      icon: '📧',
      action: () => Linking.openURL('mailto:info@gaoex.org')
    },
    {
      title: 'Phone',
      value: '+91-XXXXXXXXXX',
      icon: '📞',
      action: () => Linking.openURL('tel:+91-XXXXXXXXXX')
    },
    {
      title: 'Address',
      value: 'Tamil Nadu, India',
      icon: '📍',
      action: null
    }
  ];

  const socialMedia = [
    {
      name: 'Facebook',
      icon: '📘',
      action: () => Linking.openURL('https://facebook.com/gaoex')
    },
    {
      name: 'Twitter',
      icon: '🐦',
      action: () => Linking.openURL('https://twitter.com/gaoex')
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      action: () => Linking.openURL('https://linkedin.com/company/gaoex')
    },
    {
      name: 'Instagram',
      icon: '📷',
      action: () => Linking.openURL('https://instagram.com/gaoex')
    }
  ];

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    // In a real app, you would send this data to your backend
    Alert.alert(
      'Thank You!',
      'Your message has been sent. We will get back to you soon.',
      [{ text: 'OK', onPress: () => {
        setName('');
        setEmail('');
        setMessage('');
      }}]
    );
  };

  const openWebsite = () => {
    Linking.openURL('https://www.gaoex.org');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Contact Us
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
          Get in touch with the Global Academy Of Excellence
        </Text>
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Contact Information
        </Text>
        {contactInfo.map((info, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.contactCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={info.action}
            disabled={!info.action}
          >
            <View style={styles.contactHeader}>
              <Text style={styles.contactIcon}>{info.icon}</Text>
              <View style={styles.contactContent}>
                <Text style={[styles.contactTitle, { color: colors.text }]}>
                  {info.title}
                </Text>
                <Text style={[styles.contactValue, { color: colors.primary }]}>
                  {info.value}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Social Media */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Follow Us
        </Text>
        <View style={styles.socialGrid}>
          {socialMedia.map((social, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.socialCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={social.action}
            >
              <Text style={styles.socialIcon}>{social.icon}</Text>
              <Text style={[styles.socialName, { color: colors.text }]}>
                {social.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Contact Form */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Send us a Message
        </Text>
        <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>
              Name
            </Text>
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: colors.background,
                color: colors.text,
                borderColor: colors.border
              }]}
              value={name}
              onChangeText={setName}
              placeholder="Your full name"
              placeholderTextColor={colors.icon}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>
              Email
            </Text>
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: colors.background,
                color: colors.text,
                borderColor: colors.border
              }]}
              value={email}
              onChangeText={setEmail}
              placeholder="your.email@example.com"
              placeholderTextColor={colors.icon}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>
              Message
            </Text>
            <TextInput
              style={[styles.textArea, { 
                backgroundColor: colors.background,
                color: colors.text,
                borderColor: colors.border
              }]}
              value={message}
              onChangeText={setMessage}
              placeholder="Tell us how we can help you..."
              placeholderTextColor={colors.icon}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, { backgroundColor: colors.primary }]} 
            onPress={handleSubmit}
          >
            <Text style={[styles.submitButtonText, { color: 'white' }]}>
              Send Message
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* About Founder */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Our Founder
        </Text>
        <View style={[styles.founderCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.founderName, { color: colors.primary }]}>
            Prashitha Avinash
          </Text>
          <Text style={[styles.founderTitle, { color: colors.text }]}>
            Founder & CEO, Global Academy Of Excellence
          </Text>
          <Text style={[styles.founderDescription, { color: colors.icon }]}>
            International Educationist and visionary leader dedicated to making quality education accessible to all, regardless of background or circumstances.
          </Text>
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <Text style={[styles.ctaTitle, { color: colors.text }]}>
          Ready to Get Started?
        </Text>
        <Text style={[styles.ctaDescription, { color: colors.icon }]}>
          Visit our website to learn more about our programs and services.
        </Text>
        <TouchableOpacity 
          style={[styles.ctaButton, { backgroundColor: colors.primary }]} 
          onPress={openWebsite}
        >
          <Text style={[styles.ctaButtonText, { color: 'white' }]}>
            Visit Website
          </Text>
        </TouchableOpacity>
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
  contactCard: {
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
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
  },
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  socialCard: {
    width: '48%',
    padding: 20,
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
  socialIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  socialName: {
    fontSize: 14,
    fontWeight: '600',
  },
  formCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
  },
  submitButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  founderCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  founderName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  founderTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  founderDescription: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
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