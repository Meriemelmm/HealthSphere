import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { useWorkouts } from '../context/WorkoutContext';

export default function AddWorkoutScreen() {
  const navigation = useNavigation();
  const { addWorkout } = useWorkouts();

  const levels = ['Low', 'Moderate', 'High'];

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [level, setLevel] = useState('Moderate');
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(45);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !type) {
      alert('Please enter an activity name and type');
      return;
    }

    setIsSubmitting(true);
    try {
      await addWorkout({
        name,
        type,
        category: type, 
        duration: { hours, minutes },
        calories: (hours * 60 + minutes) * 8, 
        intensity: level,
        notes,
      });
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save workout:', error);
      alert('Failed to save workout');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.btnBack} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#13ECA4" />
            <Text style={styles.textBack}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.textAdd}>Add New Workout</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.textCancel}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            <Text style={styles.label}>ACTIVITY NAME</Text>
            <TextInput
              style={styles.nameInput}
              value={name}
              onChangeText={setName}
              placeholder="e.g. Morning Run, Yoga Session"
              placeholderTextColor="#94A3B8"
            />

            <Text style={styles.label}>ACTIVITY TYPE</Text>
            <View style={styles.selectWrapper}>
              <RNPickerSelect
                placeholder={{ label: 'Choose your activity', value: null }}
                onValueChange={(value) => setType(value)}
                value={type}
                items={[
                  { label: 'Running', value: 'running' },
                  { label: 'Cycling', value: 'cycling' },
                  { label: 'Swimming', value: 'swimming' },
                  { label: 'Walking', value: 'walking' },
                  { label: 'Gym', value: 'gym' },
                  { label: 'Yoga', value: 'yoga' },
                  { label: 'Other', value: 'other' },
                ]}
                useNativeAndroidPickerStyle={false}
                style={pickerSelectStyles}
              />
            </View>

            <Text style={styles.label}>DURATION</Text>
            <View style={styles.durationRow}>
              <View style={styles.durationBox}>
                <Text style={styles.durationLabel}>HOURS</Text>
                <View style={styles.durationControls}>
                  <TouchableOpacity onPress={() => setHours(h => Math.max(0, h - 1))}>
                    <Ionicons name="remove-circle-outline" size={24} color="#CBD5E1" />
                  </TouchableOpacity>
                  <Text style={styles.durationValue}>{String(hours).padStart(2, '0')}</Text>
                  <TouchableOpacity onPress={() => setHours(h => h + 1)}>
                    <Ionicons name="add-circle-outline" size={24} color="#CBD5E1" />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.durationSeparator}>:</Text>

              <View style={styles.durationBox}>
                <Text style={styles.durationLabel}>MINUTES</Text>
                <View style={styles.durationControls}>
                  <TouchableOpacity onPress={() => setMinutes(m => Math.max(0, m - 1))}>
                    <Ionicons name="remove-circle-outline" size={24} color="#CBD5E1" />
                  </TouchableOpacity>
                  <Text style={styles.durationValue}>{String(minutes).padStart(2, '0')}</Text>
                  <TouchableOpacity onPress={() => setMinutes(m => (m + 1) % 60)}>
                    <Ionicons name="add-circle-outline" size={24} color="#CBD5E1" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.labelContainer}>
              <Text style={styles.label}>INTENSITY LEVEL</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{level}</Text>
              </View>
            </View>
            <View style={styles.levelSelector}>
              {levels.map(l => (
                <TouchableOpacity
                  key={l}
                  style={[styles.levelItem, level === l && styles.activeLevelItem]}
                  onPress={() => setLevel(l)}
                >
                  <Text style={[styles.levelItemText, level === l && styles.activeLevelItemText]}>
                    {l}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>NOTES</Text>
            <TextInput
              style={styles.notesArea}
              multiline={true}
              value={notes}
              onChangeText={setNotes}
              placeholder="How did it feel? Any personal records?"
              placeholderTextColor="#94A3B8"
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={[styles.mainAction, isSubmitting && styles.disabledAction]}
              onPress={handleSave}
              disabled={isSubmitting}
            >
              <View style={styles.saveIconContainer}>
                <Ionicons name="save-outline" size={18} color="#0F172A" />
              </View>
              <Text style={styles.saveActionText}>
                {isSubmitting ? 'Saving...' : 'Save Workout'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: '#0F172A',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#0F172A',
    paddingRight: 30,
  },
  placeholder: {
    color: '#94A3B8',
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  btnBack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBack: {
    color: '#13ECA4',
    fontSize: 18,
    lineHeight: 24,
  },
  textCancel: {
    color: '#13ECA4',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 24,
  },
  textAdd: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 28,
    textAlign: 'center',
  },
  form: {
    padding: 20,
  },
  label: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginTop: 20,
  },
  nameInput: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    height: 56,
    color: '#0F172A',
    fontSize: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  selectWrapper: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    justifyContent: 'center',
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  durationBox: {
    flex: 1,
    backgroundColor: '#F0FDFA',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CCFBF1',
    padding: 12,
    alignItems: 'center',
  },
  durationLabel: {
    color: '#13ECA4',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  durationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  durationValue: {
    color: '#0F172A',
    fontSize: 24,
    fontWeight: '700',
    minWidth: 40,
    textAlign: 'center',
  },
  durationSeparator: {
    color: '#CBD5E1',
    fontSize: 24,
    fontWeight: '400',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#E0FFF4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 10,
  },
  badgeText: {
    color: '#13ECA4',
    fontSize: 11,
    fontWeight: '700',
  },
  levelSelector: {
    backgroundColor: '#F1F5F9',
    flexDirection: 'row',
    padding: 4,
    borderRadius: 16,
    marginTop: 4,
  },
  levelItem: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  activeLevelItem: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  levelItemText: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeLevelItemText: {
    color: '#0F172A',
  },
  notesArea: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    height: 100,
    color: '#0F172A',
    fontSize: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  mainAction: {
    backgroundColor: '#13ECA4',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    marginTop: 40,
    shadowColor: '#13ECA4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledAction: {
    opacity: 0.7,
  },
  saveIconContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: 6,
    borderRadius: 8,
    marginRight: 12,
  },
  saveActionText: {
    color: '#0F172A',
    fontSize: 17,
    fontWeight: '700',
  },
});
