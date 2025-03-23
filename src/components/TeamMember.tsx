
import { useState, useRef, useEffect } from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

interface TeamMemberProps {
  name: string;
  role: string;
  skills: string[];
  image: string;
  bio?: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  index: number;
}

const TeamMember = ({
  name,
  role,
  skills,
  image,
  bio,
  social,
  index,
}: TeamMemberProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Parallax effect on mouse move
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    const handleMouseLeave = () => {
      card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
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
      className={`glass-card p-6 animate-on-scroll transition-all duration-500 ease-out-expo will-change-transform`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 dark:border-white/5 shadow-lg">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2 shadow-lg">
            <div className="w-6 h-6 flex items-center justify-center text-white text-xs font-medium">
              {index + 1}
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-bold text-xl">{name}</h3>
          <p className="text-foreground/70 text-sm">{role}</p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
          
          {bio && (
            <p className="text-foreground/80 text-sm mt-4">{bio}</p>
          )}
          
          {social && (
            <div className="flex justify-center space-x-3 mt-4">
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-primary transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-primary transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              )}
              {social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-primary transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
