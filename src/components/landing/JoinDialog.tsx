import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface JoinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JoinDialog = ({ open, onOpenChange }: JoinDialogProps) => {
  const [form, setForm] = useState({ name: "", age: "", height: "", weight: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const age = Number(form.age);
    const height = Number(form.height);
    const weight = Number(form.weight);

    if (!form.name.trim()) return toast.error("Please enter your name.");
    if (!age || age < 10 || age > 120) return toast.error("Please enter a valid age (10–120).");
    if (!height || height < 50 || height > 300) return toast.error("Please enter a valid height in cm (50–300).");
    if (!weight || weight < 20 || weight > 500) return toast.error("Please enter a valid weight in kg (20–500).");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Welcome aboard, ${form.name.trim()}! 🎉`);
      setForm({ name: "", age: "", height: "", weight: "" });
      onOpenChange(false);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join FitMotion</DialogTitle>
          <DialogDescription>
            Tell us a bit about yourself so we can personalize your experience.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="join-name">Name</Label>
            <Input id="join-name" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="join-age">Age</Label>
              <Input id="join-age" type="number" placeholder="25" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="join-height">Height (cm)</Label>
              <Input id="join-height" type="number" placeholder="175" value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="join-weight">Weight (kg)</Label>
              <Input id="join-weight" type="number" placeholder="70" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} />
            </div>
          </div>
          <Button type="submit" className="w-full active:scale-[0.97] transition-transform" disabled={loading}>
            {loading ? "Joining…" : "Join now"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinDialog;
