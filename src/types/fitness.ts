export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  weight: number;
  height: number;
  goal: "weight_loss" | "muscle_gain" | "general_fitness";
  createdAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  description: string;
  imageUrl: string;
  muscleGroup: string;
}

export interface Workout {
  id: string;
  name: string;
  category: "weight_loss" | "muscle_gain" | "home_workout";
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: number; // minutes
  exercises: Exercise[];
  description: string;
}

export interface ScheduledWorkout {
  id: string;
  workoutId: string;
  date: string; // ISO date string YYYY-MM-DD
  completed: boolean;
  completedAt?: string;
}

export interface WeightEntry {
  date: string;
  weight: number;
}

export interface ProgressData {
  weightHistory: WeightEntry[];
  scheduledWorkouts: ScheduledWorkout[];
}
