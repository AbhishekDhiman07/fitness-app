import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
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
    <section className="section-padding py-24 md:py-32">
      <div
        ref={ref}
        className="opacity-0 max-w-2xl mx-auto text-center bg-primary rounded-2xl p-12 md:p-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground" style={{ textWrap: "balance" } as React.CSSProperties}>
          Ready to start moving?
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-md mx-auto">
          Join thousands of members who chose a healthier, stronger version of themselves.
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="text-base px-8 py-6 active:scale-[0.97] transition-transform"
        >
          Get started — it's free
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default CTA;
