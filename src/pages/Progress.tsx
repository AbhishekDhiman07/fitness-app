import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { getSchedule, getWeightHistory, saveWeightHistory } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";
import { Scale, Dumbbell, TrendingUp } from "lucide-react";

const Progress = () => {
  const { user } = useAuth();
  const [newWeight, setNewWeight] = useState("");

  if (!user) return null;

  const weightHistory = getWeightHistory(user.id);
  const schedule = getSchedule(user.id);
  const completed = schedule.filter((s) => s.completed);
  const bmi = (user.weight / ((user.height / 100) ** 2)).toFixed(1);

  const latestWeight = weightHistory.length > 0 ? weightHistory[weightHistory.length - 1].weight : user.weight;
  const currentBmi = (latestWeight / ((user.height / 100) ** 2)).toFixed(1);

  const handleLogWeight = () => {
    const w = Number(newWeight);
    if (!w || w < 20 || w > 500) return toast.error("Enter a valid weight (20-500 kg).");
    const today = new Date().toISOString().slice(0, 10);
    const existing = weightHistory.filter((e) => e.date !== today);
    const updated = [...existing, { date: today, weight: w }].sort((a, b) => a.date.localeCompare(b.date));
    saveWeightHistory(user.id, updated);
    setNewWeight("");
    toast.success("Weight logged!");
  };

  // Build chart data — last 30 entries
  const chartData = weightHistory.slice(-30).map((e) => ({
    date: e.date.slice(5),
    weight: e.weight,
    bmi: Number((e.weight / ((user.height / 100) ** 2)).toFixed(1)),
  }));

  // Completed workouts per week (last 8 weeks)
  const weeklyData: { week: string; count: number }[] = [];
  for (let i = 7; i >= 0; i--) {
    const start = new Date();
    start.setDate(start.getDate() - i * 7);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    const startStr = start.toISOString().slice(0, 10);
    const endStr = end.toISOString().slice(0, 10);
    const count = completed.filter((s) => s.completedAt && s.completedAt.slice(0, 10) >= startStr && s.completedAt.slice(0, 10) < endStr).length;
    weeklyData.push({ week: start.toLocaleDateString("en-US", { month: "short", day: "numeric" }), count });
  }

  const stats = [
    { label: "Current Weight", value: `${latestWeight} kg`, icon: Scale },
    { label: "Current BMI", value: currentBmi, icon: TrendingUp },
    { label: "Workouts Done", value: completed.length, icon: Dumbbell },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Progress</h1>
        <p className="text-muted-foreground mb-8">Track your weight, BMI, and workout consistency.</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{s.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Log weight */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-foreground mb-3">Log Today's Weight</h3>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Weight in kg"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
              />
            </div>
            <Button onClick={handleLogWeight}>Log</Button>
          </div>
        </div>

        {/* Weight chart */}
        {chartData.length > 1 && (
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-foreground mb-4">Weight Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" domain={["dataMin - 2", "dataMax + 2"]} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
                <Line type="monotone" dataKey="weight" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Weekly workouts chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">Weekly Workouts Completed</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
              <Line type="monotone" dataKey="count" stroke="hsl(211, 80%, 50%)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Progress;
