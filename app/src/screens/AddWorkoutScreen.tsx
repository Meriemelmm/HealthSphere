import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { useWorkouts } from '../context/WorkoutContext';

const PRIMARY_COLOR = '#6366F1';

export default function AddWorkoutScreen() {
  const navigation = useNavigation();
  const { addWorkout } = useWorkouts();

  const levels = ['Low', 'Moderate', 'High'];

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [level, setLevel] = useState('Moderate');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(30);
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Activity</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Activity Name</Text>
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder="Morning Run, Gym Session..."
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Type</Text>
              <View style={styles.selectWrapper}>
                <RNPickerSelect
                  placeholder={{ label: 'Select activity type', value: null }}
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
                  Icon={() => <Ionicons name="chevron-down" size={18} color="#94A3B8" style={{ marginTop: 12, marginRight: 12 }} />}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Duration</Text>
              <View style={styles.durationRow}>
                <View style={styles.durationField}>
                   <View style={styles.durationControls}>
                      <TouchableOpacity
                        style={styles.controlBtn}
                        onPress={() => setHours(h => Math.max(0, h - 1))}
                      >
                        <Ionicons name="remove" size={20} color={PRIMARY_COLOR} />
                      </TouchableOpacity>
                      <View style={styles.valueWrapper}>
                        <Text style={styles.durationValue}>{hours}</Text>
                        <Text style={styles.durationUnit}>hrs</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.controlBtn}
                        onPress={() => setHours(h => h + 1)}
                      >
                        <Ionicons name="add" size={20} color={PRIMARY_COLOR} />
                      </TouchableOpacity>
                   </View>
                </View>

                <View style={styles.durationField}>
                   <View style={styles.durationControls}>
                      <TouchableOpacity
                        style={styles.controlBtn}
                        onPress={() => setMinutes(m => Math.max(0, m - 5))}
                      >
                        <Ionicons name="remove" size={20} color={PRIMARY_COLOR} />
                      </TouchableOpacity>
                      <View style={styles.valueWrapper}>
                        <Text style={styles.durationValue}>{minutes}</Text>
                        <Text style={styles.durationUnit}>min</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.controlBtn}
                        onPress={() => setMinutes(m => (m + 5) % 60)}
                      >
                        <Ionicons name="add" size={20} color={PRIMARY_COLOR} />
                      </TouchableOpacity>
                   </View>
                </View>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Intensity</Text>
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
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Notes (Optional)</Text>
              <TextInput
                style={styles.textArea}
                multiline={true}
                value={notes}
                onChangeText={setNotes}
                placeholder="How was the session?"
                placeholderTextColor="#94A3B8"
                textAlignVertical="top"
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.mainAction, isSubmitting && styles.disabledAction]}
            onPress={handleSave}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            <Text style={styles.saveActionText}>
              {isSubmitting ? 'Saving...' : 'Save Activity'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: '#1E293B',
    paddingRight: 30,
    fontWeight: '500',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#1E293B',
    paddingRight: 30,
    fontWeight: '500',
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 16,
    fontSize: 16,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    fontWeight: '500',
  },
  selectWrapper: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  durationRow: {
    flexDirection: 'row',
    gap: 16,
  },
  durationField: {
    flex: 1,
  },
  durationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 8,
    justifyContent: 'space-between',
  },
  controlBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  valueWrapper: {
    alignItems: 'center',
  },
  durationValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  durationUnit: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  levelSelector: {
    backgroundColor: '#F8FAFC',
    flexDirection: 'row',
    padding: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  levelItem: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  activeLevelItem: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  levelItemText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
  activeLevelItemText: {
    color: PRIMARY_COLOR,
    fontWeight: '700',
  },
  textArea: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    height: 120,
    borderRadius: 16,
    fontSize: 16,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    fontWeight: '500',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  mainAction: {
    backgroundColor: PRIMARY_COLOR,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  disabledAction: {
    opacity: 0.6,
  },
  saveActionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
