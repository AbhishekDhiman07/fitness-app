import { useEffect, useRef } from "react";

const testimonials = [
  {
    quote: "I've tried dozens of programs. This is the first one I've stuck with past three months — the flexibility makes all the difference.",
    name: "Marta Kessler",
    role: "Marathon runner",
  },
  {
    quote: "The progress tracking alone was worth it. Seeing real numbers gave me confidence I was actually improving.",
    name: "Darian Okafor",
    role: "Software engineer",
  },
  {
    quote: "As a new parent, I need workouts that respect my time. The 15-minute routines are a game-changer.",
    name: "Sofia Chen",
    role: "Product designer",
  },
];

const Testimonials = () => {
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
    <section className="section-padding py-24 md:py-32 bg-secondary/50">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div data-reveal className="opacity-0 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground" style={{ textWrap: "balance" } as React.CSSProperties}>
            Trusted by real people
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Hear from members who made the commitment.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <blockquote
              key={t.name}
              data-reveal
              className={`opacity-0 reveal-up-delay-${i + 1} bg-card rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300`}
            >
              <p className="text-foreground leading-relaxed mb-6">"{t.quote}"</p>
              <footer>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
