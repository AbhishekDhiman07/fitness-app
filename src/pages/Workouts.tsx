import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { workouts as allWorkouts } from "@/data/workouts";
import { Workout } from "@/types/fitness";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, Dumbbell, ChevronRight } from "lucide-react";

const categories = [
  { value: "all", label: "All" },
  { value: "weight_loss", label: "Weight Loss" },
  { value: "muscle_gain", label: "Muscle Gain" },
  { value: "home_workout", label: "Home Workout" },
];

const difficulties = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const difficultyColor: Record<string, string> = {
  beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
  intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  advanced: "bg-rose-50 text-rose-700 border-rose-200",
};

const Workouts = () => {
  const [cat, setCat] = useState("all");
  const [diff, setDiff] = useState("all");
  const [selected, setSelected] = useState<Workout | null>(null);

  const filtered = allWorkouts.filter((w) => {
    if (cat !== "all" && w.category !== cat) return false;
    if (diff !== "all" && w.difficulty !== diff) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Workout Plans</h1>
        <p className="text-muted-foreground mb-6">Browse routines by category and difficulty.</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setCat(c.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                cat === c.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {difficulties.map((d) => (
            <button
              key={d.value}
              onClick={() => setDiff(d.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                diff === d.value ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground">No workouts match your filters.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((w) => (
              <button
                key={w.id}
                onClick={() => setSelected(w)}
                className="bg-card border border-border rounded-lg p-6 text-left hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{w.name}</h3>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{w.description}</p>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={difficultyColor[w.difficulty]}>{w.difficulty}</Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{w.duration}m</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><Dumbbell className="h-3 w-3" />{w.exercises.length} exercises</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground mb-4">{selected.description}</p>
              <div className="flex gap-3 mb-6">
                <Badge variant="outline" className={difficultyColor[selected.difficulty]}>{selected.difficulty}</Badge>
                <span className="text-sm text-muted-foreground">{selected.duration} min</span>
              </div>
              <div className="space-y-4">
                {selected.exercises.map((ex, i) => (
                  <div key={ex.id} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground text-sm">{ex.name}</p>
                        <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{ex.muscleGroup}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{ex.sets} sets × {ex.reps} reps</p>
                      <p className="text-sm text-muted-foreground mt-1">{ex.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Workouts;
