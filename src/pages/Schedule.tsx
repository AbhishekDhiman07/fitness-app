import { useState, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { getSchedule, saveSchedule } from "@/lib/storage";
import { workouts } from "@/data/workouts";
import { ScheduledWorkout } from "@/types/fitness";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Plus, Check } from "lucide-react";
import { toast } from "sonner";

function getWeekDays(baseDate: Date): Date[] {
  const start = new Date(baseDate);
  const day = start.getDay();
  start.setDate(start.getDate() - (day === 0 ? 6 : day - 1));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Schedule = () => {
  const { user } = useAuth();
  const [weekOffset, setWeekOffset] = useState(0);
  const [addDate, setAddDate] = useState<string | null>(null);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState("");

  if (!user) return null;

  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + weekOffset * 7);
  const days = getWeekDays(baseDate);
  const today = new Date().toISOString().slice(0, 10);

  const schedule = getSchedule(user.id);

  const scheduleByDay = useMemo(() => {
    const map: Record<string, ScheduledWorkout[]> = {};
    schedule.forEach((s) => {
      if (!map[s.date]) map[s.date] = [];
      map[s.date].push(s);
    });
    return map;
  }, [schedule]);

  const handleAdd = () => {
    if (!addDate || !selectedWorkoutId) return;
    const newEntry: ScheduledWorkout = {
      id: crypto.randomUUID(),
      workoutId: selectedWorkoutId,
      date: addDate,
      completed: false,
    };
    saveSchedule(user.id, [...schedule, newEntry]);
    setAddDate(null);
    setSelectedWorkoutId("");
    toast.success("Workout scheduled!");
  };

  const toggleComplete = (id: string) => {
    const updated = schedule.map((s) =>
      s.id === id ? { ...s, completed: !s.completed, completedAt: !s.completed ? new Date().toISOString() : undefined } : s
    );
    saveSchedule(user.id, updated);
    toast.success("Updated!");
  };

  const removeEntry = (id: string) => {
    saveSchedule(user.id, schedule.filter((s) => s.id !== id));
    toast.success("Removed.");
  };

  const monthLabel = days[0].toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Workout Schedule</h1>
        <p className="text-muted-foreground mb-6">Plan your week and track completion.</p>

        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" onClick={() => setWeekOffset(weekOffset - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-foreground">{monthLabel}</span>
          <Button variant="ghost" size="sm" onClick={() => setWeekOffset(weekOffset + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-2 md:gap-3">
          {days.map((d, i) => {
            const dateStr = d.toISOString().slice(0, 10);
            const isToday = dateStr === today;
            const entries = scheduleByDay[dateStr] || [];

            return (
              <div
                key={dateStr}
                className={`border rounded-lg p-3 min-h-[140px] flex flex-col ${
                  isToday ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{dayNames[i]}</p>
                    <p className={`text-lg font-bold ${isToday ? "text-primary" : "text-foreground"}`}>{d.getDate()}</p>
                  </div>
                  <button
                    onClick={() => { setAddDate(dateStr); setSelectedWorkoutId(""); }}
                    className="w-6 h-6 rounded-md bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors"
                  >
                    <Plus className="h-3 w-3 text-muted-foreground" />
                  </button>
                </div>
                <div className="flex-1 space-y-1">
                  {entries.map((entry) => {
                    const w = workouts.find((wk) => wk.id === entry.workoutId);
                    if (!w) return null;
                    return (
                      <div
                        key={entry.id}
                        className={`text-xs p-1.5 rounded cursor-pointer transition-colors ${
                          entry.completed
                            ? "bg-emerald-50 text-emerald-700 line-through"
                            : "bg-muted text-foreground hover:bg-primary/10"
                        }`}
                        onClick={() => toggleComplete(entry.id)}
                        onContextMenu={(e) => { e.preventDefault(); removeEntry(entry.id); }}
                        title="Click to toggle · Right-click to remove"
                      >
                        {w.name.length > 12 ? w.name.slice(0, 12) + "…" : w.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-3">Click a workout to mark complete · Right-click to remove</p>
      </div>

      <Dialog open={!!addDate} onOpenChange={() => setAddDate(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add Workout</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-4">
            Schedule for {addDate && new Date(addDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
          </p>
          <Select value={selectedWorkoutId} onValueChange={setSelectedWorkoutId}>
            <SelectTrigger><SelectValue placeholder="Choose a workout" /></SelectTrigger>
            <SelectContent>
              {workouts.map((w) => (
                <SelectItem key={w.id} value={w.id}>{w.name} ({w.difficulty})</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="w-full mt-4" onClick={handleAdd} disabled={!selectedWorkoutId}>
            <Check className="h-4 w-4 mr-2" /> Schedule
          </Button>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Schedule;
