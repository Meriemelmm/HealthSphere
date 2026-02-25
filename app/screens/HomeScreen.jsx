import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Button
        title="Aller à Add Workout"
        onPress={() => navigation.navigate('AddWorkout')} // ← C’est ici que tu navigues
      />
       <Button
        title="Aller à detaill dun  Workout"
       onPress={() => navigation.navigate('WorkoutDetails' )}
      />
    </View>
  );
}