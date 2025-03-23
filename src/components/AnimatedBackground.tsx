
import { useRef, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Create particles
    const particleCount = 100;
    const particles: Particle[] = [];
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      blurSize: number;
      opacity: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = theme === "dark" ? "255, 255, 255" : "0, 0, 0";
        this.blurSize = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.2 + 0.1;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.shadowColor = `rgba(${this.color}, ${this.opacity})`;
        ctx.shadowBlur = this.blurSize;
        ctx.fill();
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    function connect() {
      const maxDistance = 150;
      
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.beginPath();
            ctx.strokeStyle = theme === "dark" 
              ? `rgba(255, 255, 255, ${opacity * 0.1})` 
              : `rgba(0, 0, 0, ${opacity * 0.1})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }
    
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      
      connect();
    }
    
    animate();
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10"
    />
  );
};

export default AnimatedBackground;
