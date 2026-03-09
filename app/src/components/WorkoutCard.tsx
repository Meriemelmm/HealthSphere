import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import moment from "moment";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Workout } from '../storage/workout';

type WorkoutCardProps = {
  item: Workout;
};

const PRIMARY_COLOR = '#6366F1';

const WorkoutCard: React.FC<WorkoutCardProps> = ({ item }) => {
  const navigation = useNavigation<any>();

  const formatDate = (date: string) => {
    const mDate = moment(date);
    if (mDate.isSame(moment(), 'day')) {
      return 'Today';
    } else if (mDate.isSame(moment().subtract(1, 'days'), 'day')) {
      return 'Yesterday';
    } else {
      return mDate.format('MMM DD');
    }
  };

  const totalMinutes = (item.duration.hours || 0) * 60 + (item.duration.minutes || 0);

  const getIcon = () => {
    const type = item.type.toLowerCase();
    switch (type) {
      case 'running': return 'run';
      case 'cycling': return 'bike';
      case 'swimming': return 'swim';
      case 'walking': return 'walk';
      case 'gym': return 'weight-lifter';
      case 'yoga': return 'yoga';
      default: return 'help-circle-outline';
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('WorkoutDetails', { item })}
      activeOpacity={0.7}
    >
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <MaterialCommunityIcons
            name={getIcon() as any}
            size={28}
            color={PRIMARY_COLOR}
          />
        </View>

        <View style={styles.mainInfo}>
          <View style={styles.headerRow}>
            <Text style={styles.workoutName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.dateText}>{formatDate(item.date)}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={16} color="#94A3B8" />
              <Text style={styles.statLabel}>{totalMinutes}m</Text>
            </View>

            <View style={[styles.statItem, styles.marginLeft]}>
              <MaterialCommunityIcons name="fire" size={16} color="#94A3B8" />
              <Text style={styles.statLabel}>{item.calories}kcal</Text>
            </View>

            <View style={styles.intensityBadge}>
               <Text style={styles.intensityText}>{item.intensity}</Text>
            </View>
          </View>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#CBD5E1" style={styles.chevron} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 52,
    height: 52,
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  mainInfo: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
    marginRight: 8,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginLeft: {
    marginLeft: 12,
  },
  statLabel: {
    fontSize: 13,
    color: '#64748B',
    marginLeft: 4,
    fontWeight: '500',
  },
  intensityBadge: {
    marginLeft: 'auto',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  intensityText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  chevron: {
    marginLeft: 8,
  }
});

export default WorkoutCard;
