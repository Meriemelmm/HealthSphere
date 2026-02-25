import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import WorkoutCard from '../components/WorkoutCard';


export interface Workout {
  id: string;
  name: string;
  type: string;
  category?: string;
  duration: number;
  calories: number;
  intensity: 'faible' | 'moyenne' | 'élevée';
  date: string;
  notes?: string;
}

const simpleWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Morning Trail Run',
    type: 'Running',
    category: 'Cardio',
    duration: 30,
    calories: 320,
    intensity: 'moyenne',
    date: '2026-02-25T08:30:00Z',
    notes: 'Sensation de fatigue modérée'
  },
  {
    id: '2',
    name: 'Evening Cycling',
    type: 'Cycling',
    category: 'Cardio',
    duration: 45,
    calories: 450,
    intensity: 'élevée',
    date: '2026-02-24T18:00:00Z',
    notes: 'Bonne séance'
  },
  {
    id: '3',
    name: 'Yoga Flow',
    type: 'Yoga',
    category: 'Force',
    duration: 60,
    calories: 180,
    intensity: 'faible',
    date: '2026-02-23T10:00:00Z',
    notes: 'Travail sur les bras'
  },
];

const HomeScreen = () => {
  const categories = ['Running', 'Cycling', 'Yoga'];
  const [activeCategory, setactiveCategory] = useState('');
  const [workouts, setWorkouts] = useState<Workout[]>(simpleWorkouts);


  

  return (
    <SafeAreaView style={styles.container}>

    
      <View style={styles.categoyContainer}>
        {categories.map((c, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, activeCategory === c && styles.active]}
            onPress={() => setactiveCategory(activeCategory === c ? '' : c)} 
          >
            <Text style={{ color: activeCategory === c ? '#fff' : '#000' }}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Workouts</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>

      
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WorkoutCard item={item} />}
        style={styles.cards}
      />
       <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.addBtn}>
 <Ionicons
  name="add"
  size={30}
  color="black"
  style={{
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 1,
  }}
/>
</TouchableOpacity> 
       </View>
      

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  categoyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    marginRight: 15,
  },
  active: {
    backgroundColor: '#13ECA4',
    borderColor: '#13ECA4',
  }
  , sectionHeader: {

    display: "flex",
    justifyContent: "space-between",
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,

  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },

  viewAll: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1DB954',
    letterSpacing: 0.5,
  },
  cards: {

    display: 'flex',
    flexDirection: 'column',
    gap: 16



  },
  addBtn:{
     backgroundColor:'#13ECA4',
     width:50,
     height:50,
     display:'flex',
     justifyContent:'center',
     alignItems:'center',
     borderRadius:60

  },
  btnContainer:{
    display:'flex',
    marginTop   :0,
    

    justifyContent:'space-around',
    alignItems:'flex-end'
  }



});

export default HomeScreen;

/* Container */

/* Auto layout */








