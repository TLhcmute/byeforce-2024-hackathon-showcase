
import ProjectCard from "@/components/ProjectCard";
import AnimatedBackground from "@/components/AnimatedBackground";

const Projects = () => {
  const projects = [
    {
      title: "Smart City Dashboard",
      description: "A comprehensive dashboard for monitoring and managing smart city infrastructure, featuring real-time data visualization and analytics.",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "NextJS", "D3.js", "TailwindCSS"],
      demoUrl: "https://smartcity.byeforce.com",
      repoUrl: "https://github.com/byeforce/smart-city",
    },
    {
      title: "HealthTrack AI",
      description: "An AI-powered health monitoring application that provides personalized insights and recommendations based on user health data.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["Python", "TensorFlow", "React Native", "Flask"],
      demoUrl: "https://healthtrack.byeforce.com",
      repoUrl: "https://github.com/byeforce/health-track",
    },
    {
      title: "EcoRoute",
      description: "A mobile application that helps users find eco-friendly transportation routes and reduce their carbon footprint.",
      image: "https://images.unsplash.com/photo-1576224386051-46e07ecc5cb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["Flutter", "Kotlin", "Google Maps API", "Firebase"],
      demoUrl: "https://ecoroute.byeforce.com",
      repoUrl: "https://github.com/byeforce/eco-route",
    },
    {
      title: "Blockchain Voting System",
      description: "A secure and transparent voting system built on blockchain technology to ensure election integrity and voter privacy.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["Solidity", "Ethereum", "Web3.js", "ReactJS"],
      demoUrl: "https://blockvote.byeforce.com",
      repoUrl: "https://github.com/byeforce/block-vote",
    },
    {
      title: "AR Navigation Assistant",
      description: "An augmented reality navigation assistant that overlays directional information on the real world through your smartphone camera.",
      image: "https://images.unsplash.com/photo-1511300636408-a63a89df3482?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["ARKit", "ARCore", "Unity", "C#"],
      demoUrl: "https://arnav.byeforce.com",
      repoUrl: "https://github.com/byeforce/ar-nav",
    },
    {
      title: "DevOps Automation Platform",
      description: "A platform that automates the CI/CD pipeline, infrastructure provisioning, and application deployment for development teams.",
      image: "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["Docker", "Kubernetes", "Jenkins", "Terraform"],
      demoUrl: "https://devops.byeforce.com",
      repoUrl: "https://github.com/byeforce/devops-platform",
    },
  ];

  return (
    <>
      <section className="py-24 px-4 relative min-h-[60vh] flex items-center overflow-hidden">
        <AnimatedBackground />
        
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                Our Projects
              </span>
            </h1>
            
            <p className="text-xl text-foreground/70 mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
              Discover the innovative solutions and applications we've built using cutting-edge technologies.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-24 px-4 bg-gradient-to-b from-background to-background/60 relative">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto animate-on-scroll">
            <h2 className="section-title">Have a project in mind?</h2>
            <p className="section-subtitle mb-8">
              We're always open to new challenges and collaborations. Let's create something amazing together.
            </p>
            
            <a 
              href="mailto:team@byeforce.com"
              className="inline-flex items-center justify-center h-12 px-8 font-medium text-white bg-primary rounded-lg transition-colors duration-300 hover:bg-primary/90"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
