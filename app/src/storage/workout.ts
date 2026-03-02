import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@workouts_data';

export interface Workout {
    id: string;
    name: string;
    type: string;
    category?: string;
    duration: {
        hours: number;
        minutes: number;
    };
    calories: number;
    intensity: string;
    notes: string;
    date: string;
}


export const getWorkouts = async (): Promise<Workout[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        console.log(jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Error reading workouts', e);
        return [];
    }
};

export const saveWorkouts = async (workouts: Workout[]) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
    } catch (e) {
        console.error('Error saving workouts', e);
    }
};
