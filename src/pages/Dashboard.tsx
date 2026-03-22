import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Link } from "react-router-dom";
import { Dumbbell, CalendarDays, TrendingUp, Target } from "lucide-react";
import { getSchedule } from "@/lib/storage";
import { workouts } from "@/data/workouts";

const goalLabels = { weight_loss: "Weight Loss", muscle_gain: "Muscle Gain", general_fitness: "General Fitness" };

const Dashboard = () => {
  const { user } = useAuth();
  if (!user) return null;

  const schedule = getSchedule(user.id);
  const today = new Date().toISOString().slice(0, 10);
  const todayWorkouts = schedule.filter((s) => s.date === today);
  const completedTotal = schedule.filter((s) => s.completed).length;
  const bmi = (user.weight / ((user.height / 100) ** 2)).toFixed(1);

  const stats = [
    { label: "Current BMI", value: bmi, icon: TrendingUp, color: "text-emerald-600" },
    { label: "Today's Workouts", value: todayWorkouts.length, icon: CalendarDays, color: "text-primary" },
    { label: "Completed", value: completedTotal, icon: Dumbbell, color: "text-amber-600" },
    { label: "Goal", value: goalLabels[user.goal], icon: Target, color: "text-rose-600" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Welcome back, {user.name.split(" ")[0]}</h1>
        <p className="text-muted-foreground mb-8">Here's your fitness overview.</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className={`h-4 w-4 ${s.color}`} />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{s.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-semibold text-foreground mb-4">Today's Schedule</h2>
        {todayWorkouts.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground mb-3">No workouts scheduled for today.</p>
            <Link to="/schedule" className="text-primary text-sm font-medium hover:underline">Plan your week →</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {todayWorkouts.map((sw) => {
              const w = workouts.find((wk) => wk.id === sw.workoutId);
              if (!w) return null;
              return (
                <div key={sw.id} className="bg-card border border-border rounded-lg p-5 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{w.name}</p>
                    <p className="text-sm text-muted-foreground">{w.duration} min · {w.difficulty}</p>
                  </div>
                  {sw.completed && <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-md">Done</span>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
