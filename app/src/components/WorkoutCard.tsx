import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import moment from "moment";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Workout } from '../storage/workout';

type WorkoutCardProps = {
  item: Workout;
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({ item }) => {
  const navigation = useNavigation<any>();
  const formatDate = (date: string) => {
    const mDate = moment(date);
    if (mDate.isSame(moment(), 'day')) {
      return 'Today';
    } else if (mDate.isSame(moment().subtract(1, 'days'), 'day')) {
      return 'Yesterday';
    } else {
      return mDate.format('DD MMM YYYY');
    }
  };

  const totalMinutes = (item.duration.hours || 0) * 60 + (item.duration.minutes || 0);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('WorkoutDetails', { item })}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={item.type.toLowerCase() === 'running' ? 'run' : item.type.toLowerCase() === 'cycling' ? 'bike' : 'yoga'}
            size={32}
            color="#13ECA4"
          />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.workoutName}>{item.name}</Text>
            <Text style={styles.dateLabel}>{formatDate(item.date)}</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={21} color="#94A3B8" />
              <Text style={styles.statText}>{totalMinutes} min</Text>
            </View>

            <View style={styles.statItem}>
              <MaterialCommunityIcons name="fire" size={22} color="#94A3B8" />
              <Text style={styles.statText}>{item.calories} kcal</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 12,
    marginBottom: 16,
    // Android Shadow
    elevation: 4,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#E8FDF5',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  dateLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    marginLeft: 8,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,

  },
  statText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 6,
    fontWeight: '500',
  },
});

export default WorkoutCard;


