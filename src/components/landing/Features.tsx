import { useEffect, useRef } from "react";
import { Activity, Calendar, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Personalized Workouts",
    description: "Adaptive routines that evolve with your progress and fit your fitness level.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "15, 30, or 60-minute sessions that slot into even the busiest calendar.",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with like-minded members who keep you motivated and accountable.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Clear metrics and milestones so you can see exactly how far you've come.",
  },
];

const Features = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll("[data-reveal]").forEach((child) => {
            child.classList.add("reveal-up");
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding py-24 md:py-32">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div data-reveal className="opacity-0 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground" style={{ textWrap: "balance" } as React.CSSProperties}>
            Everything you need, nothing you don't
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Simple tools that help you build lasting habits.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
          {features.map((f, i) => (
            <div
              key={f.title}
              data-reveal
              className={`opacity-0 reveal-up-delay-${i + 1} flex gap-5`}
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
