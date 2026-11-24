import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImg from "@/assets/profile.jpg";

gsap.registerPlugin(ScrollTrigger);

const skills = [
{ name: "HTML", icon: "🌐" },
{ name: "CSS", icon: "🎨" },
{ name: "JavaScript", icon: "⚡" },
{ name: "React", icon: "⚛️" },
{ name: "GSAP", icon: "🎬" },
{ name: "TypeScript", icon: "📘" },
{ name: "Node.js", icon: "🟢" },
{ name: "Figma", icon: "🎯" }];


const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
      { opacity: 0, filter: "blur(10px)" },
      {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out"
      }
      );

      gsap.fromTo(imageRef.current,
      { x: -80, opacity: 0 },
      {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        x: 0, opacity: 1, duration: 1, ease: "power3.out"
      }
      );

      gsap.fromTo(contentRef.current,
      { x: 80, opacity: 0 },
      {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2
      }
      );

      gsap.fromTo(".skill-icon",
      { opacity: 0, y: 30, scale: 0.8 },
      {
        scrollTrigger: { trigger: ".skill-grid", start: "top 85%" },
        opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.5, ease: "back.out(1.7)"
      }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-padding relative">
      <div className="glow-orb w-[300px] h-[300px] top-0 right-0 bg-neon-violet/10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Profile image */}
        <div ref={imageRef} className="flex justify-center">
          <div className="relative group">
            <div
              className="absolute -inset-1 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-md"
              style={{
                background: "linear-gradient(135deg, hsl(var(--neon-blue)), hsl(var(--primary)), hsl(var(--neon-pink)))"
              }} />
            
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-border group-hover:scale-105 group-hover:rotate-2 transition-all duration-500">
              <img

                alt="RAKIB - Web Developer"
                className="w-full h-full object-cover" src="/lovable-uploads/aa786490-90dc-42f1-9521-95ec61b18fa4.jpg" />
              
            </div>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef}>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-neon-blue to-primary mb-6" />
          <p className="text-muted-foreground leading-relaxed mb-4">
            I'm a passionate web developer with expertise in building modern,
            performant, and visually stunning web applications. I specialize in
            React, TypeScript, and cutting-edge animation libraries.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            With a keen eye for design and a deep understanding of user experience,
            I create digital products that not only look amazing but also deliver
            exceptional performance and accessibility.
          </p>

          {/* Skills */}
          <div className="skill-grid grid grid-cols-4 gap-3">
            {skills.map((skill) =>
            <div
              key={skill.name}
              className="skill-icon glass rounded-xl p-3 text-center hover:neon-glow transition-all duration-300 cursor-default group">
              
                <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </span>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  {skill.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default AboutSection;