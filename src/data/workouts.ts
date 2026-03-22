import { Workout } from "@/types/fitness";

export const workouts: Workout[] = [
  // BEGINNER - Weight Loss
  {
    id: "wl-beg-1", name: "Fat Burn Kickstart", category: "weight_loss", difficulty: "beginner", duration: 20,
    description: "A gentle introduction to fat-burning movements. No equipment needed.",
    exercises: [
      { id: "e1", name: "Jumping Jacks", sets: 3, reps: 20, description: "Stand with feet together, jump while spreading arms and legs, return.", imageUrl: "", muscleGroup: "Full Body" },
      { id: "e2", name: "Bodyweight Squats", sets: 3, reps: 15, description: "Stand shoulder-width, lower hips back and down, press through heels.", imageUrl: "", muscleGroup: "Legs" },
      { id: "e3", name: "Mountain Climbers", sets: 3, reps: 20, description: "Plank position, alternate driving knees toward chest rapidly.", imageUrl: "", muscleGroup: "Core" },
      { id: "e4", name: "High Knees", sets: 3, reps: 20, description: "Run in place, driving knees above hip height.", imageUrl: "", muscleGroup: "Cardio" },
    ],
  },
  // INTERMEDIATE - Weight Loss
  {
    id: "wl-int-1", name: "HIIT Shred", category: "weight_loss", difficulty: "intermediate", duration: 30,
    description: "High-intensity intervals designed to maximize calorie burn.",
    exercises: [
      { id: "e5", name: "Burpees", sets: 4, reps: 12, description: "Squat down, kick feet back, push-up, jump up explosively.", imageUrl: "", muscleGroup: "Full Body" },
      { id: "e6", name: "Jump Squats", sets: 4, reps: 15, description: "Squat down, explode upward, land softly.", imageUrl: "", muscleGroup: "Legs" },
      { id: "e7", name: "Plank to Push-up", sets: 3, reps: 10, description: "Start in forearm plank, press up to full plank one arm at a time.", imageUrl: "", muscleGroup: "Core" },
      { id: "e8", name: "Tuck Jumps", sets: 3, reps: 12, description: "Jump and bring knees toward chest at the peak.", imageUrl: "", muscleGroup: "Cardio" },
    ],
  },
  // ADVANCED - Weight Loss
  {
    id: "wl-adv-1", name: "Metabolic Inferno", category: "weight_loss", difficulty: "advanced", duration: 45,
    description: "An intense metabolic conditioning circuit for experienced athletes.",
    exercises: [
      { id: "e9", name: "Box Jumps", sets: 5, reps: 12, description: "Jump onto a sturdy platform, step down, repeat.", imageUrl: "", muscleGroup: "Legs" },
      { id: "e10", name: "Devil Press", sets: 4, reps: 10, description: "Burpee with dumbbells, snatch overhead at the top.", imageUrl: "", muscleGroup: "Full Body" },
      { id: "e11", name: "Battle Ropes", sets: 4, reps: 30, description: "Alternate slamming heavy ropes for maximum power output.", imageUrl: "", muscleGroup: "Arms" },
      { id: "e12", name: "Sprint Intervals", sets: 6, reps: 1, description: "30-second all-out sprint, 30-second rest.", imageUrl: "", muscleGroup: "Cardio" },
    ],
  },
  // BEGINNER - Muscle Gain
  {
    id: "mg-beg-1", name: "Foundation Builder", category: "muscle_gain", difficulty: "beginner", duration: 25,
    description: "Build a solid strength base with fundamental compound movements.",
    exercises: [
      { id: "e13", name: "Push-ups", sets: 3, reps: 12, description: "Hands shoulder-width, lower chest to floor, press back up.", imageUrl: "", muscleGroup: "Chest" },
      { id: "e14", name: "Dumbbell Rows", sets: 3, reps: 12, description: "Hinge forward, pull dumbbell toward hip, squeeze shoulder blade.", imageUrl: "", muscleGroup: "Back" },
      { id: "e15", name: "Goblet Squats", sets: 3, reps: 12, description: "Hold weight at chest, squat deep with upright torso.", imageUrl: "", muscleGroup: "Legs" },
      { id: "e16", name: "Dumbbell Shoulder Press", sets: 3, reps: 10, description: "Press dumbbells overhead from shoulder height.", imageUrl: "", muscleGroup: "Shoulders" },
    ],
  },
  // INTERMEDIATE - Muscle Gain
  {
    id: "mg-int-1", name: "Hypertrophy Push-Pull", category: "muscle_gain", difficulty: "intermediate", duration: 40,
    description: "A balanced push-pull split targeting all major muscle groups.",
    exercises: [
      { id: "e17", name: "Bench Press", sets: 4, reps: 10, description: "Lie flat, lower bar to chest, press up with control.", imageUrl: "", muscleGroup: "Chest" },
      { id: "e18", name: "Barbell Rows", sets: 4, reps: 10, description: "Hinge at hips, pull barbell to lower chest.", imageUrl: "", muscleGroup: "Back" },
      { id: "e19", name: "Lateral Raises", sets: 3, reps: 15, description: "Raise dumbbells to sides until arms are parallel to floor.", imageUrl: "", muscleGroup: "Shoulders" },
      { id: "e20", name: "Bicep Curls", sets: 3, reps: 12, description: "Curl dumbbells with controlled motion, squeeze at top.", imageUrl: "", muscleGroup: "Arms" },
    ],
  },
  // ADVANCED - Muscle Gain
  {
    id: "mg-adv-1", name: "Power Protocol", category: "muscle_gain", difficulty: "advanced", duration: 60,
    description: "Heavy compound lifts for maximum strength and size gains.",
    exercises: [
      { id: "e21", name: "Deadlifts", sets: 5, reps: 5, description: "Hinge at hips, grip bar, drive through heels to standing.", imageUrl: "", muscleGroup: "Full Body" },
      { id: "e22", name: "Weighted Pull-ups", sets: 4, reps: 8, description: "Add weight to pull-ups for increased resistance.", imageUrl: "", muscleGroup: "Back" },
      { id: "e23", name: "Overhead Press", sets: 4, reps: 8, description: "Press barbell from shoulders to overhead lockout.", imageUrl: "", muscleGroup: "Shoulders" },
      { id: "e24", name: "Weighted Dips", sets: 4, reps: 8, description: "Add weight and dip between parallel bars.", imageUrl: "", muscleGroup: "Chest" },
    ],
  },
  // BEGINNER - Home Workout
  {
    id: "hw-beg-1", name: "Living Room Burn", category: "home_workout", difficulty: "beginner", duration: 15,
    description: "Quick and effective — no equipment, no excuses.",
    exercises: [
      { id: "e25", name: "Wall Push-ups", sets: 3, reps: 15, description: "Place hands on wall, lean in and press back out.", imageUrl: "", muscleGroup: "Chest" },
      { id: "e26", name: "Chair Squats", sets: 3, reps: 12, description: "Squat down to touch the chair, stand back up.", imageUrl: "", muscleGroup: "Legs" },
      { id: "e27", name: "Plank Hold", sets: 3, reps: 1, description: "Hold a straight-body plank for 30 seconds.", imageUrl: "", muscleGroup: "Core" },
      { id: "e28", name: "Glute Bridges", sets: 3, reps: 15, description: "Lie on back, drive hips up, squeeze glutes at top.", imageUrl: "", muscleGroup: "Glutes" },
    ],
  },
  // INTERMEDIATE - Home Workout
  {
    id: "hw-int-1", name: "Bodyweight Blitz", category: "home_workout", difficulty: "intermediate", duration: 30,
    description: "Challenge your body using just your own weight.",
    exercises: [
      { id: "e29", name: "Diamond Push-ups", sets: 4, reps: 12, description: "Hands close together forming a diamond, push up.", imageUrl: "", muscleGroup: "Chest" },
      { id: "e30", name: "Pistol Squats", sets: 3, reps: 8, description: "Single-leg squat with the other leg extended forward.", imageUrl: "", muscleGroup: "Legs" },
      { id: "e31", name: "V-Ups", sets: 3, reps: 15, description: "Simultaneously lift legs and torso to form a V shape.", imageUrl: "", muscleGroup: "Core" },
      { id: "e32", name: "Handstand Hold", sets: 3, reps: 1, description: "Kick up against a wall and hold for 20 seconds.", imageUrl: "", muscleGroup: "Shoulders" },
    ],
  },
  // ADVANCED - Home Workout
  {
    id: "hw-adv-1", name: "Calisthenics Power", category: "home_workout", difficulty: "advanced", duration: 45,
    description: "Advanced bodyweight skills for serious athletes.",
    exercises: [
      { id: "e33", name: "Muscle-ups", sets: 4, reps: 5, description: "Pull up and transition over the bar into a dip.", imageUrl: "", muscleGroup: "Full Body" },
      { id: "e34", name: "L-Sit Hold", sets: 4, reps: 1, description: "Hold body off ground with legs extended horizontally for 15s.", imageUrl: "", muscleGroup: "Core" },
      { id: "e35", name: "Planche Push-ups", sets: 3, reps: 6, description: "Push-up with body held horizontal, no leg support.", imageUrl: "", muscleGroup: "Chest" },
      { id: "e36", name: "Single Leg Deadlift Hops", sets: 3, reps: 10, description: "Hinge on one leg, then explosively hop at the top.", imageUrl: "", muscleGroup: "Legs" },
    ],
  },
];
