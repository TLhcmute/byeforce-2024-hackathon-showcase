
import { useRef, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedBackground from "./AnimatedBackground";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current) return;
      
      const scrollY = window.scrollY;
      textRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      textRef.current.style.opacity = `${1 - scrollY * 0.002}`;
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const layers = container.querySelectorAll("[data-speed]");
      layers.forEach((layer) => {
        const speed = parseFloat((layer as HTMLElement).dataset.speed || "0");
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        (layer as HTMLElement).style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <AnimatedBackground />
      
      <div 
        ref={containerRef}
        className="container px-4 md:px-6 mx-auto relative z-10"
      >
        <div ref={textRef} className="max-w-5xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <div className="glass-panel px-4 py-2 animate-fade-in">
              <span className="text-primary font-medium">UTE Hackathon 2024</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              Meet Team Byeforce
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "200ms" }}>
            A talented group of developers pushing the boundaries of technology at the UTE Hackathon 2024.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <Button size="lg" asChild>
              <Link to="/projects">View Our Projects</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#team">Meet The Team</a>
            </Button>
          </div>
        </div>
        
        <div data-speed="3" className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-50"></div>
        <div data-speed="-2" className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-50"></div>
      </div>
      
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrow">
          <ArrowDown size={16} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
