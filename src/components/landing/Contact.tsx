import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin } from "lucide-react";

const Contact = () => {
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
      <div ref={ref} className="max-w-4xl mx-auto">
        <div data-reveal className="opacity-0 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Get in touch
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Questions, partnerships, or just want to say hi — we'd love to hear from you.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div data-reveal className="opacity-0 reveal-up-delay-1 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Email</p>
                <p className="text-muted-foreground">hello@fitmotion.co</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Location</p>
                <p className="text-muted-foreground">Portland, Oregon</p>
              </div>
            </div>
          </div>
          <form data-reveal className="opacity-0 reveal-up-delay-2 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Your name" className="bg-card" />
            <Input placeholder="Email address" type="email" className="bg-card" />
            <Textarea placeholder="Your message" rows={4} className="bg-card resize-none" />
            <Button className="w-full active:scale-[0.97] transition-transform">
              Send message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
