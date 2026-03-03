import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import moment from 'moment';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useWorkouts } from '../context/WorkoutContext';

export default function WorkoutDetailsScreen({ route, navigation }: any) {
  const { item } = route.params || {};
  const { deleteWorkout } = useWorkouts();

  if (!item) {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={24} color="#334155" />
          </TouchableOpacity>
          <Text style={styles.detailText}>Workout not found</Text>
        </View>
      </View>
    );
  }

  const format = (n: number) => (n || 0).toString().padStart(2, '0');

  const formatDate = (date: string) => {
    const mDate = moment(date);
    if (mDate.isSame(moment(), 'day')) {
      return "Today's Session";
    } else if (mDate.isSame(moment().subtract(1, 'days'), 'day')) {
      return "Yesterday's Session";
    } else {
      return mDate.format('DD MMM YYYY');
    }
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

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios-new" size={24} color="#334155" />
        </TouchableOpacity>
        <Text style={styles.detailText}>Workout Details</Text>
        <TouchableOpacity>
          <Octicons name="repo-forked" size={24} color="#334155" />
        </TouchableOpacity>
      </View>

      <View style={styles.middle}>
        <View style={styles.icon}>
          <FontAwesome6 name="person-running" size={50} color="#13ECA4" />
        </View>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.dateText}>
          <MaterialIcons name="date-range" size={20} color="#64748B" /> {formatDate(item.date)}
        </Text>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <View style={styles.Timecontainer}>
            <Ionicons name="timer-outline" size={32} color="#13ECA4" />
            <Text style={styles.time}>
              {format(item.duration?.hours)}:{format(item.duration?.minutes)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.CalorisContainer}>
        <Text style={styles.title}>
          <MaterialCommunityIcons name="fire" size={20} color="#F97316" /> Calories
        </Text>
        <Text style={styles.caloriText}>
          <Text style={styles.number}>{item.calories} </Text>kcal
        </Text>
      </View>

      <Text style={styles.note}>
        Notes <MaterialIcons name="edit-note" size={24} color="black" />
      </Text>
      <View style={styles.NoteContainer}>
        <Text style={styles.noteText}>"{item.notes || 'No notes available'}"</Text>
      </View>

      <View style={styles.btns}>
        {/* <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editText}>
            <MaterialIcons name="update" size={24} color="black" /> Edit Workout
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.removeBtn} onPress={handleDelete}>
          <Text style={styles.removeText}>
            <MaterialCommunityIcons name="delete-clock-outline" size={24} color="#DC2626" /> Delete Workout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  topContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    marginBottom: 20,
  },
  detailText: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: 'bold',
  },
  middle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    flexDirection: 'column',
    gap: 8,
    marginBottom: 20,
  },
  nameText: {
    color: '#0F172A',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
  },
  dateText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6FFF5',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  Timecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6FFF5',
    borderRadius: 50,
    gap: 10,
    paddingVertical: 7,
    paddingHorizontal: 26,
  },
  time: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    letterSpacing: 1,
  },
  CalorisContainer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  title: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  caloriText: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '600',
  },
  number: {
    color: '#0F172A',
    fontSize: 24,
    fontWeight: 'bold',
  },
  note: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
    color: '#0F172A',
    fontSize: 18,
    fontWeight: 'bold',
  },
  NoteContainer: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  noteText: {
    color: '#334155',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'justify',
  },
  btns: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginTop: 'auto',
    paddingVertical: 20,
  },
  editBtn: {
    backgroundColor: '#13ECA4',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  removeBtn: {
    backgroundColor: '#FEF2F2',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  editText: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '700',
  },
  removeText: {
    color: '#DC2626',
    fontSize: 18,
    fontWeight: '600',
  },
});