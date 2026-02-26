import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Workout, getWorkouts, saveWorkouts } from '../storage/workout';

interface WorkoutContextType {
    workouts: Workout[];
    addWorkout: (workout: Omit<Workout, 'id' | 'date'>) => Promise<void>;
    loading: boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadWorkouts = async () => {
            const storedWorkouts = await getWorkouts();
            setWorkouts(storedWorkouts);
            setLoading(false);
        };
        loadWorkouts();
    }, []);

    const addWorkout = async (workoutData: Omit<Workout, 'id' | 'date'>) => {
        const newWorkout: Workout = {
            ...workoutData,
            id: Date.now().toString(),
            date: new Date().toISOString(),
        };
        const updatedWorkouts = [newWorkout, ...workouts];
        setWorkouts(updatedWorkouts);
        await saveWorkouts(updatedWorkouts);
    };

    return (
        <WorkoutContext.Provider value={{ workouts, addWorkout, loading }}>
            {children}
        </WorkoutContext.Provider>
    );
};

export const useWorkouts = () => {
    const context = useContext(WorkoutContext);
    if (context === undefined) {
        throw new Error('useWorkouts must be used within a WorkoutProvider');
    }
    return context;
};
