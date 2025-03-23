import ProjectCard from "@/components/ProjectCard";
import AnimatedBackground from "@/components/AnimatedBackground";

const Projects = () => {
  const projects = [
    {
      title: "Rescue Map Hub",
      description:
        "Wesite hỗ trợ tìm kiếm và cung cấp thông tin về các địa điểm cứu hộ, bệnh viện, trường học,...",
      image:
        "https://i.pinimg.com/736x/9b/1a/ee/9b1aee285ca8ad23ce759fc039f99576.jpg",
      technologies: ["React", "NextJS", "D3.js", "TailwindCSS"],
      demoUrl: "https://rescue-map-hub-25.vercel.app/",
      repoUrl: "https://github.com/TLhcmute/rescue-map-hub-25",
    },
    {
      title: "EcoSense",
      description:
        "Ứng dụng hỗ trợ cung cấp thông tin về môi trường, khí hậu, thời tiết,... theo thời gian thực, vùng miền. Đồng thời hỏi đáp trực tiếp với AI về vấn đề môi trường tại địa phương",
      image:
        "https://i.pinimg.com/736x/b0/cf/c1/b0cfc17120986a36770549eb969bebab.jpg",
      technologies: ["Python", "TensorFlow", "React", "Flask"],
      demoUrl: "https://healthtrack.byeforce.com",
      repoUrl: "https://github.com/TLhcmute/EcoSenseByteForce",
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

            <p
              className="text-xl text-foreground/70 mb-8 animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              Discover the innovative solutions and applications we've built
              using cutting-edge technologies.
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
              We're always open to new challenges and collaborations. Let's
              create something amazing together.
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
