import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.2 });

    tl.from(headlineRef.current, {
      opacity: 0,
      y: 60,
      filter: "blur(10px)",
      duration: 1,
      ease: "power3.out"
    }).
    from(
      subtitleRef.current,
      {
        opacity: 0,
        y: 30,
        filter: "blur(5px)",
        duration: 0.8,
        ease: "power3.out"
      },
      "-=0.5"
    ).
    from(
      ctaRef.current,
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "back.out(1.7)"
      },
      "-=0.3"
    ).
    from(
      splineRef.current,
      {
        opacity: 0,
        x: 100,
        duration: 1,
        ease: "power3.out"
      },
      "-=0.8"
    );

    // Floating orbs
    gsap.utils.toArray<HTMLElement>(".hero-orb").forEach((orb, i) => {
      gsap.to(orb, {
        y: -20 + i * 5,
        duration: 3 + i,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleHireMe = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden">
      
      {/* Background orbs */}
      <div className="hero-orb glow-orb w-[400px] h-[400px] -top-20 -left-20 bg-neon-violet/15" />
      <div className="hero-orb glow-orb w-[300px] h-[300px] top-1/2 left-1/3 bg-neon-blue/10" />
      <div className="hero-orb glow-orb w-[250px] h-[250px] bottom-20 right-1/4 bg-neon-pink/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
        {/* Left content */}
        <div className="z-10">
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-6">
            
            <span className="text-foreground">Hi, I'm</span>
            <br />
            <span className="gradient-text">ABDUR RAKIB CHOWDHURY </span>
            <br />
            <span className="text-foreground/80 text-3xl sm:text-4xl md:text-5xl font-light">
              Web Developer
            </span>
          </h1>
          <p
            ref={subtitleRef}
            className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed mb-8">
            
            Crafting immersive digital experiences with cutting-edge technologies.
            Turning ideas into interactive realities.
          </p>
          <button
            ref={ctaRef}
            onClick={handleHireMe}
            className="group relative px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase overflow-hidden transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--neon-blue)))",
              boxShadow: "0 0 30px hsla(var(--primary) / 0.4), 0 0 60px hsla(var(--neon-blue) / 0.2)"
            }}>
            
            <span className="relative z-10 text-primary-foreground">Hire Me</span>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-violet opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </div>

        {/* Right - Spline 3D */}
        <div ref={splineRef} className="relative h-[400px] md:h-[500px] lg:h-[600px]">
          <iframe
            src="https://my.spline.design/nexbotrobotcharacterconcept-a809a42df3e261a9ef917e1f3b795aeb/"
            frameBorder="0"
            width="100%"
            height="100%"
            title="3D Spline"
            className="rounded-2xl"
            style={{ pointerEvents: "auto" }} />
          
        </div>
      </div>
    </section>);

};

export default HeroSection;