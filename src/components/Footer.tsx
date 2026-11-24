import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".footer-content",
      { opacity: 0, y: 40, filter: "blur(5px)" },
      { scrollTrigger: { trigger: footerRef.current, start: "top 95%" }, opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative py-12 px-6 md:px-12 border-t border-border/50">
      {/* Floating particles */}
      {[...Array(5)].map((_, i) =>
      <div
        key={i}
        className="glow-orb animate-float"
        style={{
          width: 4 + i * 2,
          height: 4 + i * 2,
          left: `${15 + i * 18}%`,
          bottom: `${20 + i * 10}%`,
          background: `hsla(var(--neon-blue) / ${0.2 + i * 0.05})`,
          animationDelay: `${i * 0.5}s`
        }} />

      )}

      <div className="footer-content max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#home" className="text-lg font-bold gradient-text">
          RAKIB
        </a>

        <div className="flex items-center gap-6">
          {["Home", "About", "Projects", "Contact"].map((link) =>
          <button
            key={link}
            onClick={() =>
            document.querySelector(`#${link.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            
              {link}
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {[Github, Linkedin, Mail].map((Icon, i) =>
          <a
            key={i}
            href="#"
            className="text-muted-foreground hover:text-accent transition-colors duration-300">
            
              <Icon size={16} />
            </a>
          )}
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
          Made with <Heart size={12} className="text-neon-pink" /> by RAKIB © 2026
        </p>
      </div>
    </footer>);

};

export default Footer;