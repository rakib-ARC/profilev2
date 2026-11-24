import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";

import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Analytics Dashboard",
    desc: "Real-time data visualization platform with interactive charts and metrics.",
    image: project1,
    stack: ["React", "D3.js", "Node.js"],
  },
  {
    title: "E-Commerce Platform",
    desc: "Premium shopping experience with 3D product previews and AI recommendations.",
    image: project2,
    stack: ["Next.js", "Stripe", "PostgreSQL"],
  },
  {
    title: "Social Chat App",
    desc: "Real-time messaging with video calls, reactions, and end-to-end encryption.",
    image: project3,
    stack: ["React Native", "Socket.io", "WebRTC"],
  },
  {
    title: "Portfolio Builder",
    desc: "Drag-and-drop portfolio generator with custom themes and animations.",
    image: project4,
    stack: ["React", "GSAP", "Tailwind"],
  },
  {
    title: "SaaS Landing Page",
    desc: "High-converting landing page with A/B testing and analytics integration.",
    image: project5,
    stack: ["Next.js", "Framer Motion", "Vercel"],
  },
  {
    title: "Music Streaming UI",
    desc: "Immersive audio player with visualizations and social features.",
    image: project6,
    stack: ["React", "Web Audio API", "Three.js"],
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".project-title", 
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        }
      );

      gsap.fromTo(".project-card",
        { opacity: 0, y: 60, scale: 0.9 },
        {
          scrollTrigger: {
            trigger: ".projects-scroll",
            start: "top 85%",
          },
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-20 md:py-32 relative">
      <div className="glow-orb w-[400px] h-[400px] top-1/2 -left-40 bg-neon-blue/10" />

      <div className="px-6 md:px-12 lg:px-20 mb-12">
        <h2 className="project-title text-3xl md:text-4xl font-bold tracking-tight">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-neon-blue to-primary mt-3" />
      </div>

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="projects-scroll flex gap-6 overflow-x-auto px-6 md:px-12 lg:px-20 pb-6 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((project, i) => (
          <div
            key={i}
            className="project-card glass rounded-2xl overflow-hidden min-w-[300px] md:min-w-[380px] snap-start flex-shrink-0 group hover:neon-glow transition-all duration-500 hover:-translate-y-2"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {project.desc}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button className="text-muted-foreground hover:text-accent transition-colors">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
