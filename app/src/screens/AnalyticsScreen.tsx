import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY_COLOR = '#6366F1';

const AnalyticsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Statistics</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Weekly Progress</Text>
          <View style={styles.chartPlaceholder}>
             <Ionicons name="bar-chart" size={64} color={PRIMARY_COLOR} opacity={0.2} />
             <Text style={styles.placeholderText}>Detailed charts coming soon</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Avg Duration</Text>
            <Text style={styles.statValue}>45m</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Calories</Text>
            <Text style={styles.statValue}>1,240</Text>
          </View>
        </View>

        <View style={styles.achievementSection}>
           <Text style={styles.sectionTitle}>Achievements</Text>
           <View style={styles.achievementRow}>
              <View style={styles.badge}>
                <Ionicons name="trophy" size={32} color="#F59E0B" />
              </View>
              <View style={styles.badge}>
                <Ionicons name="flame" size={32} color="#EF4444" />
              </View>
              <View style={styles.badge}>
                <Ionicons name="flash" size={32} color="#6366F1" />
              </View>
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
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 20,
  },
  chartPlaceholder: {
    height: 160,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  placeholderText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  achievementSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  achievementRow: {
    flexDirection: 'row',
    gap: 16,
  },
  badge: {
    width: 64,
    height: 64,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  }
});

export default AnalyticsScreen;
