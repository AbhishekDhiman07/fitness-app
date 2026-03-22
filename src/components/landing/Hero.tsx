import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-up");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding min-h-[90vh] flex items-center justify-center">
      <div ref={ref} className="max-w-2xl mx-auto text-center opacity-0">
        <p className="text-sm font-medium tracking-widest uppercase text-primary mb-6">
          Your fitness journey starts here
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-[1.08] mb-6 text-foreground" style={{ textWrap: "balance" } as React.CSSProperties}>
          Move better. Feel stronger. Live fully.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto mb-10" style={{ textWrap: "pretty" } as React.CSSProperties}>
          Science-backed programs designed around your body, your schedule, and your goals — no guesswork required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-base px-8 py-6 active:scale-[0.97] transition-transform" asChild>
            <Link to="/signup">
              Start free trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="text-base px-8 py-6 active:scale-[0.97] transition-transform" asChild>
            <a href="#features">See how it works</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
