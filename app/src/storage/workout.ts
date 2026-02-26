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

// Memory fallback to prevent crashes if native module is null
let memoryStorage: Record<string, string> = {};

const isNativeModuleAvailable = () => {
    try {
        return !!AsyncStorage;
    } catch {
        return false;
    }
};

export const getWorkouts = async (): Promise<Workout[]> => {
    try {

        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        console.log(" json vaue", jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : [];

    } catch (e) {
        console.error('Error reading workouts', e);
        const val = memoryStorage[STORAGE_KEY];
        return val ? JSON.parse(val) : [];
    }
};

export const saveWorkouts = async (workouts: Workout[]) => {
    try {
        const jsonValue = JSON.stringify(workouts);
        if (isNativeModuleAvailable()) {
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
        }
        memoryStorage[STORAGE_KEY] = jsonValue;

    } catch (e) {
        console.error('Error saving workouts', e);
        memoryStorage[STORAGE_KEY] = JSON.stringify(workouts);
    }
};
