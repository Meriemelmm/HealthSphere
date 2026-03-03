import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Workout, getWorkouts, saveWorkouts } from '../storage/workout';

interface WorkoutContextType {
    workouts: Workout[];
    addWorkout: (workout: Omit<Workout, 'id' | 'date'>) => Promise<void>;
    deleteWorkout: (id: string) => Promise<void>;
    loading: boolean;
    error: string | null;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadWorkouts = async () => {
            try {
                const storedWorkouts = await getWorkouts();
                setWorkouts(storedWorkouts);
            } catch (e) {
                console.error('Failed to load workouts', e);
                setError('Impossible de charger les entraînements');
            } finally {
                setLoading(false);
            }
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

        try {
            await saveWorkouts(updatedWorkouts);
        } catch (e) {
            console.error('Failed to save workout, rolling back', e);
            setWorkouts(workouts);
            setError("Impossible de sauvegarder l'entraînement");
        }
    };

    const deleteWorkout = async (id: string) => {
        const updatedWorkouts = workouts.filter(w => w.id !== id);
        setWorkouts(updatedWorkouts);

        try {
            await saveWorkouts(updatedWorkouts);
        } catch (e) {
            console.error('Failed to delete workout, rolling back', e);
            setWorkouts(workouts);
            setError("Impossible de supprimer l'entraînement");
        }
    };

    return (
        <WorkoutContext.Provider value={{ workouts, addWorkout, deleteWorkout, loading, error }}>
            {children}
        </WorkoutContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useWorkouts = () => {
    const context = useContext(WorkoutContext);
    if (context === undefined) {
        throw new Error('useWorkouts must be used within a WorkoutProvider');
    }
    return context;
};