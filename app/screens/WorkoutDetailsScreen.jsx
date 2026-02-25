import { View, Text } from 'react-native';

export default function WorkoutDetailsScreen({ route }) {
  const { workout } = route.params || {};

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Détail Workout</Text>
      
    </View>
  );
}