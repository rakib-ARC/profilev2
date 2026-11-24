import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate text in
    tl.from(textRef.current, {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
      duration: 0.8,
      ease: "power3.out",
    });

    // Animate progress bar
    tl.to(progressRef.current, {
      width: "100%",
      duration: 2,
      ease: "power2.out",
      onUpdate: function () {
        const progress = Math.round(this.progress() * 100);
        setPercent(progress);
      },
    });

    // Fade out preloader
    tl.to(preloaderRef.current, {
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = "none";
        }
        onComplete();
      },
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
    >
      {/* Background orbs */}
      <div className="glow-orb w-[300px] h-[300px] top-1/4 left-1/4 bg-neon-violet/20" />
      <div className="glow-orb w-[200px] h-[200px] bottom-1/4 right-1/4 bg-neon-blue/20" />

      <div ref={textRef} className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter gradient-text mb-2">
          RAKIB
        </h1>
        <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase">
          Web Developer
        </p>
      </div>

      <div className="w-64 md:w-80 relative">
        <div className="h-[2px] w-full bg-muted rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full w-0 rounded-full"
            style={{
              background: "linear-gradient(90deg, hsl(var(--neon-blue)), hsl(var(--primary)), hsl(var(--neon-pink)))",
              boxShadow: "0 0 15px hsla(var(--neon-blue) / 0.5)",
            }}
          />
        </div>
        <span
          ref={percentRef}
          className="block text-center mt-4 text-sm text-muted-foreground font-light tracking-widest"
        >
          {percent}%
        </span>
      </div>
    </div>
  );
};

export default Preloader;
