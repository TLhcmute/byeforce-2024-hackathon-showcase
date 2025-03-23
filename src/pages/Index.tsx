
import HeroSection from "@/components/HeroSection";
import TeamMember from "@/components/TeamMember";
import Model3D from "@/components/Model3D";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const teamMembers = [
    {
      name: "Quách Tài Lợi",
      role: "Frontend Developer",
      skills: ["ReactJS", "Flutter", "NextJS"],
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Specializes in crafting beautiful user interfaces with expertise in React and Flutter.",
      social: {
        github: "https://github.com/quachtailoi",
        linkedin: "https://linkedin.com/in/quachtailoi",
      },
    },
    {
      name: "Nguyễn Hoàng Phúc",
      role: "AI/ML Engineer",
      skills: ["Python", "AI", "ML"],
      image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Works with artificial intelligence and machine learning to solve complex problems.",
      social: {
        github: "https://github.com/nguyenhoangphuc",
        linkedin: "https://linkedin.com/in/nguyenhoangphuc",
      },
    },
    {
      name: "Lê Chí Quốc",
      role: "Backend Developer",
      skills: ["NodeJS", "NestJS", "API Design"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Specializes in building robust backend systems and designing efficient APIs.",
      social: {
        github: "https://github.com/lechiquoc",
        linkedin: "https://linkedin.com/in/lechiquoc",
      },
    },
    {
      name: "Phan Thiện Khởi",
      role: "Mobile Developer",
      skills: ["React", "Kotlin", "Mobile"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Develops cross-platform mobile applications using React and native Kotlin.",
      social: {
        github: "https://github.com/phanthienkhoi",
        linkedin: "https://linkedin.com/in/phanthienkhoi",
      },
    },
  ];

  return (
    <>
      <HeroSection />
      
      <section id="team" className="py-24 px-4 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              We're a team of passionate developers with diverse skills and expertise,
              working together to create innovative solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={member.name} {...member} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-24 px-4 bg-gradient-to-b from-background to-background/50 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="section-title">Our Expertise</h2>
            <p className="section-subtitle">
              We combine our diverse skills to deliver exceptional results in various domains.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="glass-panel p-8 rounded-2xl animate-on-scroll">
              <div className="mb-6 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Web Development</h3>
              <p className="text-foreground/70">
                Creating responsive and intuitive web applications using modern frameworks like React and Next.js.
              </p>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl animate-on-scroll" style={{ transitionDelay: "100ms" }}>
              <div className="mb-6 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Mobile Development</h3>
              <p className="text-foreground/70">
                Building native and cross-platform mobile applications for iOS and Android with Flutter and Kotlin.
              </p>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl animate-on-scroll" style={{ transitionDelay: "200ms" }}>
              <div className="mb-6 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">AI & Machine Learning</h3>
              <p className="text-foreground/70">
                Implementing intelligent solutions using advanced algorithms and data analysis techniques.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="section-title">Interactive 3D Demo</h2>
            <p className="section-subtitle">
              Experience our 3D capabilities with this interactive cube visualization.
            </p>
          </div>
          
          <div className="animate-on-scroll">
            <Model3D />
          </div>
        </div>
      </section>
      
      <section className="py-24 px-4 bg-gradient-to-b from-background to-background/80 relative">
        <div className="container mx-auto">
          <div className="text-center mb-10 animate-on-scroll">
            <h2 className="section-title">Ready to See Our Work?</h2>
            <p className="section-subtitle">
              Check out our projects to see how we push the boundaries of technology.
            </p>
          </div>
          
          <div className="flex justify-center animate-on-scroll">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link to="/projects">View Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
