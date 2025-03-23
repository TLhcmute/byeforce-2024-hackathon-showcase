
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/AnimatedBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <AnimatedBackground />
      
      <div className="max-w-xl w-full mx-auto px-4 text-center relative z-10 glass-panel p-12 rounded-2xl animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            404
          </span>
        </h1>
        
        <p className="text-2xl text-foreground/80 mb-8">
          Oops! We couldn't find the page you're looking for.
        </p>
        
        <Button size="lg" asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
