import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="section-padding py-5 flex items-center justify-between max-w-5xl mx-auto">
      <Link to="/" className="text-lg font-semibold text-foreground tracking-tight">FitMotion</Link>
      <div className="hidden sm:flex items-center gap-8 text-sm text-muted-foreground">
        <a href="#features" className="hover:text-foreground transition-colors">Features</a>
        <a href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</a>
        <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
      </div>
      {user ? (
        <Button size="sm" className="active:scale-[0.97] transition-transform" asChild>
          <Link to="/dashboard">Dashboard</Link>
        </Button>
      ) : (
        <Button size="sm" className="active:scale-[0.97] transition-transform" asChild>
          <Link to="/signup">Join now</Link>
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
