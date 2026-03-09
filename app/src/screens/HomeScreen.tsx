import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WorkoutCard from '../components/WorkoutCard';
import { useWorkouts } from '../context/WorkoutContext';

const HomeScreen = ({ navigation }) => {
  const { workouts } = useWorkouts();
  const categories = ['All', 'Running', 'Cycling', 'Yoga'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredWorkouts = activeCategory === 'All'
    ? workouts
    : workouts.filter(w => w.type.toLowerCase() === activeCategory.toLowerCase());

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Athlete!</Text>
          <Text style={styles.subtitle}>Let&apos;s smash your goals today.</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={20} color="#6366F1" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                activeCategory === item && styles.activeCategoryButton,
              ]}
              onPress={() => setActiveCategory(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === item && styles.activeCategoryText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredWorkouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WorkoutCard item={item} />}
        contentContainerStyle={styles.cardsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="fitness-outline" size={64} color="#CBD5E1" />
            <Text style={styles.emptyText}>No activities found. Time to move!</Text>
          </View>
        }
      />

      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddWorkout')}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={32} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  profileBtn: {
    backgroundColor: '#FFF',
    padding: 2,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 44,
    height: 44,
    backgroundColor: '#EEF2FF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryList: {
    paddingHorizontal: 24,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#FFF',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  activeCategoryButton: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  activeCategoryText: {
    color: '#FFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  },
  cardsList: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 84, // Above the tab bar
    right: 24,
  },
  addBtn: {
    backgroundColor: '#6366F1',
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    marginTop: 16,
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HomeScreen;
