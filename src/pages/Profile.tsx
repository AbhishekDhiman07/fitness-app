import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Profile = () => {
  const { user, updateProfile } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || "",
    age: String(user?.age || ""),
    weight: String(user?.weight || ""),
    height: String(user?.height || ""),
    goal: user?.goal || "general_fitness",
  });


  if (!user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const age = Number(form.age);
    const weight = Number(form.weight);
    const height = Number(form.height);
    if (!form.name.trim()) return toast.error("Name is required.");
    if (!age || age < 10 || age > 120) return toast.error("Enter a valid age.");
    if (!weight || weight < 20 || weight > 500) return toast.error("Enter a valid weight.");
    if (!height || height < 50 || height > 300) return toast.error("Enter a valid height.");

    updateProfile({ name: form.name.trim(), age, weight, height, goal: form.goal });
    toast.success("Profile updated!");
  };

  return (
    <DashboardLayout>
      <div className="max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Profile</h1>
        <p className="text-muted-foreground mb-8">Update your personal details.</p>

        <form onSubmit={handleSave} className="space-y-4 bg-card border border-border rounded-lg p-6">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={user.email} disabled className="bg-muted" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label>Age</Label>
              <Input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Height (cm)</Label>
              <Input type="number" value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Weight (kg)</Label>
              <Input type="number" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Fitness Goal</Label>
            <Select value={form.goal} onValueChange={(v) => setForm({ ...form, goal: v as typeof form.goal })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="weight_loss">Weight Loss</SelectItem>
                <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                <SelectItem value="general_fitness">General Fitness</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">Save changes</Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
