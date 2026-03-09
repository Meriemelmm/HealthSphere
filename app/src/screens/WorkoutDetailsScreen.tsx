import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useWorkouts } from '../context/WorkoutContext';

const PRIMARY_COLOR = '#6366F1';

export default function WorkoutDetailsScreen({ route, navigation }: any) {
  const { item } = route.params || {};
  const { deleteWorkout } = useWorkouts();

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
            <Ionicons name="chevron-back" size={24} color="#1E293B" />
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
           <Text style={styles.errorText}>Workout not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const format = (n: number) => (n || 0).toString().padStart(2, '0');

  const formatDate = (date: string) => {
    return moment(date).format('MMMM DD, YYYY');
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Workout',
      'Are you sure you want to delete this workout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteWorkout(item.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const getIcon = () => {
    const type = item.type.toLowerCase();
    switch (type) {
      case 'running': return 'run';
      case 'cycling': return 'bike';
      case 'swimming': return 'swim';
      case 'walking': return 'walk';
      case 'gym': return 'weight-lifter';
      case 'yoga': return 'yoga';
      default: return 'fitness';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="chevron-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <TouchableOpacity style={styles.headerBtn} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={22} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name={getIcon() as any} size={48} color={PRIMARY_COLOR} />
          </View>
          <Text style={styles.workoutName}>{item.name}</Text>
          <View style={styles.dateBadge}>
            <Ionicons name="calendar-outline" size={14} color="#64748B" />
            <Text style={styles.dateText}>{formatDate(item.date)}</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIconWrapper, { backgroundColor: '#EEF2FF' }]}>
              <Ionicons name="time" size={24} color={PRIMARY_COLOR} />
            </View>
            <Text style={styles.statValue}>{format(item.duration?.hours)}h {format(item.duration?.minutes)}m</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconWrapper, { backgroundColor: '#FFF7ED' }]}>
              <MaterialCommunityIcons name="fire" size={24} color="#F97316" />
            </View>
            <Text style={styles.statValue}>{item.calories}</Text>
            <Text style={styles.statLabel}>Calories (kcal)</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconWrapper, { backgroundColor: '#F0FDF4' }]}>
              <MaterialCommunityIcons name="trending-up" size={24} color="#22C55E" />
            </View>
            <Text style={styles.statValue}>{item.intensity}</Text>
            <Text style={styles.statLabel}>Intensity</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconWrapper, { backgroundColor: '#F5F3FF' }]}>
              <MaterialCommunityIcons name="shape" size={24} color="#8B5CF6" />
            </View>
            <Text style={styles.statValue}>{item.type}</Text>
            <Text style={styles.statLabel}>Category</Text>
          </View>
        </View>

        <View style={styles.notesSection}>
           <Text style={styles.sectionTitle}>Notes</Text>
           <View style={styles.notesContainer}>
              <Text style={styles.notesText}>
                {item.notes || 'No notes provided for this activity.'}
              </Text>
           </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 30,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  workoutName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    minWidth: '45%',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
  },
  statIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  notesSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginLeft: 4,
  },
  notesContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  notesText: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
    fontWeight: '400',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '600',
  }
});
