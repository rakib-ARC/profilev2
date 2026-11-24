import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

const navLinks = [
{ label: "Home", href: "#home" },
{ label: "About", href: "#about" },
{ label: "Projects", href: "#projects" },
{ label: "Contact", href: "#contact" }];


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(
        menuRef.current.querySelectorAll("a"),
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: "power3.out", delay: 0.1 }
      );
    }
  }, [isOpen]);

  const handleClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong py-3" : "py-5"}`
        }>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#home" className="text-xl font-bold tracking-tight gradient-text">
            ARC
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide">
              
                {link.label}
              </button>
            )}
            <button
              onClick={() => handleClick("#contact")}
              className="px-5 py-2 text-sm rounded-full neon-border text-foreground hover:bg-primary/10 transition-all duration-300">
              
              Hire Me
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground z-[60]"
            onClick={() => setIsOpen(!isOpen)}>
            
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen &&
      <div
        ref={menuRef}
        className="fixed inset-0 z-[55] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
        
          {navLinks.map((link) =>
        <button
          key={link.href}
          onClick={() => handleClick(link.href)}
          className="text-3xl font-light text-foreground hover:text-primary transition-colors">
          
              {link.label}
            </button>
        )}
          <button
          onClick={() => handleClick("#contact")}
          className="mt-4 px-8 py-3 rounded-full neon-border text-foreground hover:bg-primary/10 transition-all">
          
            Hire Me
          </button>
        </div>
      }
    </>);

};

export default Navbar;