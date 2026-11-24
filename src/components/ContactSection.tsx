import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Github, Linkedin, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-title",
        { opacity: 0, y: 40, filter: "blur(8px)" },
        { scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }, opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(".contact-input",
        { opacity: 0, x: -40 },
        { scrollTrigger: { trigger: ".contact-form", start: "top 85%" }, opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" }
      );

      gsap.fromTo(".contact-btn",
        { opacity: 0, scale: 0.8 },
        { scrollTrigger: { trigger: ".contact-form", start: "top 75%" }, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)", delay: 0.4 }
      );

      gsap.fromTo(".social-icon",
        { opacity: 0, y: 20 },
        { scrollTrigger: { trigger: ".social-icons", start: "top 90%" }, opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power3.out" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section ref={sectionRef} id="contact" className="section-padding relative">
      <div className="glow-orb w-[300px] h-[300px] top-0 right-0 bg-neon-pink/10" />
      <div className="glow-orb w-[200px] h-[200px] bottom-0 left-0 bg-neon-violet/10" />

      <div className="max-w-3xl mx-auto">
        <h2 className="contact-title text-3xl md:text-4xl font-bold tracking-tight text-center mb-2">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-neon-blue to-primary mx-auto mb-4" />
        <p className="text-muted-foreground text-center mb-12 text-sm">
          Have a project in mind? Let's work together to create something amazing.
        </p>

        <form onSubmit={handleSubmit} className="contact-form space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="contact-input w-full px-5 py-4 rounded-xl glass text-foreground placeholder:text-muted-foreground focus:outline-none focus:neon-glow transition-all duration-300 text-sm"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="contact-input w-full px-5 py-4 rounded-xl glass text-foreground placeholder:text-muted-foreground focus:outline-none focus:neon-glow transition-all duration-300 text-sm"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="contact-input w-full px-5 py-4 rounded-xl glass text-foreground placeholder:text-muted-foreground focus:outline-none focus:neon-glow transition-all duration-300 resize-none text-sm"
          />
          <button
            type="submit"
            className="contact-btn group w-full py-4 rounded-xl font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--neon-blue)))",
              boxShadow: "0 0 20px hsla(var(--primary) / 0.3)",
            }}
          >
            <span className="text-primary-foreground">Send Message</span>
            <Send size={16} className="text-primary-foreground group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="social-icons flex items-center justify-center gap-6 mt-12">
          {[
            { icon: Github, label: "GitHub" },
            { icon: Linkedin, label: "LinkedIn" },
            { icon: Mail, label: "Email" },
          ].map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              className="social-icon w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-accent hover:neon-glow transition-all duration-300"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
