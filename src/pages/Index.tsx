
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import TimelineSection from "@/components/TimelineSection";
import ContactSection from "@/components/ContactSection";
import ParticlesBackground from "@/components/ParticlesBackground";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import SettingsPanel from "@/components/SettingsPanel";
import { useScrollAnimations } from "@/components/hooks/useScrollAnimations";
import { motion } from "framer-motion";
import "../index.css";

const Index = () => {
  // Apply scroll animations to all sections
  useScrollAnimations();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set a timeout to match the loading screen duration
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 6200); // Slightly longer than loading screen to ensure smooth transition

    // Initialize smooth scrolling behavior for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(
          (this as HTMLAnchorElement).getAttribute("href")!
        );
        if (target) {
          const yOffset = -80; // Header offset
          const y =
            (target as HTMLElement).getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;

          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      });
    });

    // Add a class to the body when page is loaded
    document.body.classList.add("page-loaded");

    // Add data-animate attributes to all sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      // Skip the timeline section as it has its own animation
      if (section.id !== "timeline") {
        section.setAttribute('data-animate', index % 2 === 0 ? 'left' : 'right');
      }
    });

    // Cleanup event listeners
    return () => {
      clearTimeout(timer);
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", function (e) {});
      });
    };
  }, []);

  return (
    <ThemeProvider>
      <SmoothCursor />

      <motion.div
        className="min-h-screen bg-background text-foreground
       transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0,
          transition: { duration: 0.8, ease: "easeInOut" }
        }}
      >
        <ParticlesBackground />
        <Header />
        <main>
          <HeroSection />
          <ServicesSection />
          <PortfolioSection />
          <ContactSection />
          <AboutSection />
          <TimelineSection />

        </main>
        <SettingsPanel />
      </motion.div>
    </ThemeProvider>
  );
};

export default Index;
