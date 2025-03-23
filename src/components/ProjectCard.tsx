
import { useState, useRef, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  repoUrl?: string;
  index: number;
}

const ProjectCard = ({
  title,
  description,
  image,
  technologies,
  demoUrl,
  repoUrl,
  index,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Parallax effect on mouse move
  useEffect(() => {
    const card = cardRef.current;
    const imageEl = imageRef.current;
    if (!card || !imageEl) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Parallax for card
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // Parallax for image inside card
      const moveX = (x - centerX) / 20;
      const moveY = (y - centerY) / 20;
      imageEl.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    const handleMouseLeave = () => {
      card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
      imageEl.style.transform = `translate(0, 0)`;
    };
    
    if (isHovered) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    }
    
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered]);

  return (
    <div 
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl bg-background animate-on-scroll transition-all duration-500 ease-out-expo will-change-transform gradient-border"
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        ref={imageRef} 
        className="relative h-48 md:h-64 overflow-hidden transition-transform duration-700 ease-out-expo"
      >
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="font-bold text-xl md:text-2xl">{title}</h3>
        
        <p className="text-foreground/70 line-clamp-3">{description}</p>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {technologies.map((tech, i) => (
            <span
              key={i}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-3 pt-2">
          {demoUrl && (
            <Button size="sm" asChild>
              <a 
                href={demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <span>Live Demo</span>
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
          
          {repoUrl && (
            <Button size="sm" variant="outline" asChild>
              <a 
                href={repoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <span>Code</span>
                <Github className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
