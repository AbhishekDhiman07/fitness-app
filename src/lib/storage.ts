import { ScheduledWorkout, WeightEntry } from "@/types/fitness";

const SCHEDULE_KEY = "fitmotion_schedule";
const WEIGHT_KEY = "fitmotion_weight";

export function getSchedule(userId: string): ScheduledWorkout[] {
  try {
    const all = JSON.parse(localStorage.getItem(SCHEDULE_KEY) || "{}");
    return all[userId] || [];
  } catch { return []; }
}

export function saveSchedule(userId: string, schedule: ScheduledWorkout[]) {
  const all = JSON.parse(localStorage.getItem(SCHEDULE_KEY) || "{}");
  all[userId] = schedule;
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(all));
}

export function getWeightHistory(userId: string): WeightEntry[] {
  try {
    const all = JSON.parse(localStorage.getItem(WEIGHT_KEY) || "{}");
    return all[userId] || [];
  } catch { return []; }
}

export function saveWeightHistory(userId: string, entries: WeightEntry[]) {
  const all = JSON.parse(localStorage.getItem(WEIGHT_KEY) || "{}");
  all[userId] = entries;
  localStorage.setItem(WEIGHT_KEY, JSON.stringify(all));
}
