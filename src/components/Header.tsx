
import React, { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import { BorderBeam } from "../components/magicui/border-beam";
import { ShineBorder } from "./magicui/shine-border";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

type NavItem = {
  name: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "Service", href: "#service" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
  { name: "About", href: "#about" },
];

const Header = () => {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const handleScroll = () => {
      // Update header style based on scroll position
      setScrolled(window.scrollY > 50);

      // Find active section for nav highlighting
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          currentSection = "#" + section.getAttribute("id")!;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      // Close mobile menu when clicking on a link
      setMobileMenuOpen(false);
      
      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  // Animation for mobile menu
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (mobileMenuOpen) {
      // Animation for opening the menu
      gsap.set(mobileMenuRef.current, { opacity: 0, y: -20, display: "block" });
      
      gsap.to(mobileMenuRef.current, {
        opacity: 1, 
        y: 0, 
        duration: 0.4, 
        ease: "power2.out"
      });
      
      // Animate each menu item with staggered delay
      menuItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { opacity: 0, x: -20 },
            { 
              opacity: 1, 
              x: 0, 
              duration: 0.3, 
              delay: 0.1 + index * 0.08,
              ease: "power2.out" 
            }
          );
        }
      });
    } else {
      // Animation for closing the menu
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20, 
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (mobileMenuRef.current) {
            mobileMenuRef.current.style.display = "none";
          }
        }
      });
    }
  }, [mobileMenuOpen]);

  return (
    <header
      className={`floating-header transition-all duration-300 ${
        scrolled ? "py-2 shadow-lg" : "py-3"
      }`}
    >
      <BorderBeam duration={8} size={250} />
      <ShineBorder shineColor={["#7400ff", "#9b41ff", "#b580ff"]} className="opacity-40" />

      <nav className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between gap-8">
          <h2 className="text-xl font-bold text-gradient">Portfolio</h2>
        </div>

        <div className="flex items-center justify-between gap-8">
          <ul className="hidden md:flex space-x-6 items-center">
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`nav-link ${
                    activeSection === item.href ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button 
            className="md:hidden z-50" 
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground animate-fade-in" />
            ) : (
              <Menu className="h-6 w-6 text-foreground animate-fade-in" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef} 
        className="md:hidden fixed top-[70px] right-0 left-0 h-auto glass-panel w-[95%] mx-auto rounded-2xl z-40 mt-2 pb-6 hidden"
      >
        <ul className="flex flex-col space-y-4 p-6">
          {NAV_ITEMS.map((item, index) => (
            <li 
              key={item.name}
              ref={(el) => (menuItemsRef.current[index] = el)}
            >
              <a
                href={item.href}
                className={`nav-link text-lg flex items-center py-2 ${
                  activeSection === item.href ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
              >
                <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
