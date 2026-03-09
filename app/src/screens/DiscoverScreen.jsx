import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY_COLOR = '#6366F1';

const DiscoverScreen = () => {
  const recommendations = [
    { id: 1, title: 'HIIT for Beginners', duration: '20 min', color: '#EEF2FF' },
    { id: 2, title: 'Yoga Flow', duration: '45 min', color: '#FDF2F8' },
    { id: 3, title: 'Power Cycling', duration: '30 min', color: '#F0FDF4' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.featuredCard}>
          <View style={styles.featuredContent}>
            <Text style={styles.featuredLabel}>NEW PROGRAM</Text>
            <Text style={styles.featuredTitle}>Summer Body 2024</Text>
            <TouchableOpacity style={styles.featuredBtn}>
              <Text style={styles.featuredBtnText}>Join Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {recommendations.map((item) => (
            <TouchableOpacity key={item.id} style={[styles.recCard, { backgroundColor: item.color }]}>
              <Text style={styles.recTitle}>{item.title}</Text>
              <View style={styles.recFooter}>
                <Ionicons name="time-outline" size={14} color="#64748B" />
                <Text style={styles.recDuration}>{item.duration}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.categoryGrid}>
           <Text style={styles.sectionTitle}>Categories</Text>
           <View style={styles.grid}>
              {['Strength', 'Cardio', 'Flexibility', 'Meditation'].map((cat) => (
                <TouchableOpacity key={cat} style={styles.gridItem}>
                   <Text style={styles.gridText}>{cat}</Text>
                </TouchableOpacity>
              ))}
           </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  featuredCard: {
    marginHorizontal: 24,
    height: 180,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 32,
    elevation: 4,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  featuredContent: {
    padding: 24,
    justifyContent: 'center',
    height: '100%',
  },
  featuredLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },
  featuredTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16,
  },
  featuredBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  featuredBtnText: {
    color: PRIMARY_COLOR,
    fontWeight: '700',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  horizontalScroll: {
    paddingLeft: 24,
    marginBottom: 32,
  },
  recCard: {
    width: 160,
    height: 120,
    borderRadius: 20,
    padding: 16,
    marginRight: 16,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  recTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  recFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recDuration: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  categoryGrid: {
    paddingHorizontal: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  gridText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  }
});

export default DiscoverScreen;
