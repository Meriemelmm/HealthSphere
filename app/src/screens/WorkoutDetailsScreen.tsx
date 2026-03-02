import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WorkoutDetailsScreen({ route, navigation }: any) {
  const { item } = route.params || {};

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back-ios-new" size={24} color="#334155" />
      </TouchableOpacity>
      <Text style={styles.detailText}>Workout not found</Text>
    </View>
  );

  const format = (n: number) => (n || 0).toString().padStart(2, '0');
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios-new" size={24} color="#334155" />
        </TouchableOpacity>
        <Text style={styles.detailText}>Workout Details</Text>
        <TouchableOpacity><Octicons name="repo-forked" size={24} color="#334155" /></TouchableOpacity>
      </View>
      <View style={styles.middle}>
        <View style={styles.icon}>
          <FontAwesome6 name="person-running" size={50} color="#13ECA4" />
        </View>
        <Text style={styles.nameText}> {item.name}</Text>
        <Text style={styles.dateText}>  <MaterialIcons name="date-range" size={24} color="#64748B" /> {item.date}</Text>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.Timecontainer}>
            <Ionicons name="timer-outline" size={32} color="#13ECA4" />
            <Text style={styles.time}>
              {format(item.duration.hours)}:{format(item.duration.minutes)}
            </Text>
          </View>
        </View>


      </View>
      <View style={styles.CalorisContainer}>
        <Text style={styles.title}> <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 11C2 11.8667 2.175 12.6875 2.525 13.4625C2.875 14.2375 3.375 14.9167 4.025 15.5C4.00833 15.4167 4 15.3417 4 15.275C4 15.2083 4 15.1333 4 15.05C4 14.5167 4.1 14.0167 4.3 13.55C4.5 13.0833 4.79167 12.6583 5.175 12.275L8 9.5L10.825 12.275C11.2083 12.6583 11.5 13.0833 11.7 13.55C11.9 14.0167 12 14.5167 12 15.05C12 15.1333 12 15.2083 12 15.275C12 15.3417 11.9917 15.4167 11.975 15.5C12.625 14.9167 13.125 14.2375 13.475 13.4625C13.825 12.6875 14 11.8667 14 11C14 10.1667 13.8458 9.37917 13.5375 8.6375C13.2292 7.89583 12.7833 7.23333 12.2 6.65C11.8667 6.86667 11.5167 7.02917 11.15 7.1375C10.7833 7.24583 10.4083 7.3 10.025 7.3C8.99167 7.3 8.09583 6.95833 7.3375 6.275C6.57917 5.59167 6.14167 4.75 6.025 3.75C5.375 4.3 4.8 4.87083 4.3 5.4625C3.8 6.05417 3.37917 6.65417 3.0375 7.2625C2.69583 7.87083 2.4375 8.49167 2.2625 9.125C2.0875 9.75833 2 10.3833 2 11ZM8 12.3L6.575 13.7C6.39167 13.8833 6.25 14.0917 6.15 14.325C6.05 14.5583 6 14.8 6 15.05C6 15.5833 6.19583 16.0417 6.5875 16.425C6.97917 16.8083 7.45 17 8 17C8.55 17 9.02083 16.8083 9.4125 16.425C9.80417 16.0417 10 15.5833 10 15.05C10 14.7833 9.95 14.5375 9.85 14.3125C9.75 14.0875 9.60833 13.8833 9.425 13.7L8 12.3ZM8 0V3.3C8 3.86667 8.19583 4.34167 8.5875 4.725C8.97917 5.10833 9.45833 5.3 10.025 5.3C10.325 5.3 10.6042 5.2375 10.8625 5.1125C11.1208 4.9875 11.35 4.8 11.55 4.55L12 4C13.2333 4.7 14.2083 5.675 14.925 6.925C15.6417 8.175 16 9.53333 16 11C16 13.2333 15.225 15.125 13.675 16.675C12.125 18.225 10.2333 19 8 19C5.76667 19 3.875 18.225 2.325 16.675C0.775 15.125 0 13.2333 0 11C0 8.85 0.720833 6.80833 2.1625 4.875C3.60417 2.94167 5.55 1.31667 8 0Z" fill="#F97316" />
        </svg> Calories
        </Text>
        <Text style={styles.caloriText}> < Text style={styles.number}>{item.calories} </Text>kcal</Text>

      </View>
      <Text style={styles.note}>Notes  <MaterialIcons name="edit-note" size={24} color="black" /></Text>
      <View style={styles.NoteContainer}>
        <Text style={styles.noteText}>"{item.notes}"</Text>

      </View>
      <View style={styles.btns}>
        <TouchableOpacity style={styles.editBtn}><Text style={styles.editText}> <MaterialIcons name="update" size={24} color="black" />Edit Workout</Text></TouchableOpacity>
        <TouchableOpacity style={styles.removeBtn}><Text style={styles.removeText}> <MaterialCommunityIcons name="delete-clock-outline" size={24} color="#DC2626" />Delete Workout</Text></TouchableOpacity>

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    padding: 20,
  },
  topContainer: {
    //  backgroundColor:'pink',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    padding: 16,

  },

  detailText: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: 'bold'
  },
  middle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    flexDirection: 'column',
    gap: 8,

    // backgroundColor:'yellow',

  },
  nameText: {
    color: '#0F172A',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 700
  },
  dateText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: 'medium',
    display: 'flex',
    justifyContent: 'center', alignItems: 'center'
  },
  icon: {
    display: 'flex', justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6FFF5',
    width: 100,
    height: 100,
    borderRadius: 50
  },
  Timecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#E6FFF5',
    borderRadius: 50,

    gap: 10,
    paddingVertical: 7,
    paddingHorizontal: 26
  },
  time: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    letterSpacing: 1,
  },
  CalorisContainer: {
    flex: 1,
    justifyContent: 'flex-start', alignItems: 'flex-start',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    shadowColor: 'fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: 'semibold'
  },
  caloriText: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: 'semibold'
  },
  number: {
    color: '#0F172A',
    fontSize: 24,
    fontWeight: 'bold'
  },
  note: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: 'pink',
    color: '#0F172A',
    fontSize: 18,
    fontWeight: 'bold'
  },
  NoteContainer: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 25,
    paddingHorizontal: 25,
    marginHorizontal: 10,
    borderRadius: 15,
    marginTop: 10,
    shadowColor: 'fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  noteText: {
    color: '#334155',
    fontSize: 16,
    fontWeight: 'regular',
    textAlign: 'justify'

  },
  btns: {

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: "center",

    paddingVertical: 10,
    gap: 10
  },
  editBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#13ECA4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    gap: 10
  },
  removeBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: '#FEF2F2',
    borderRadius: 10,
    gap: 10
  },
  editText: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  removeText: {
    color: '#DC2626',
    fontSize: 18,
    fontWeight: 'semibold',
    textAlign: 'center'
  }


})