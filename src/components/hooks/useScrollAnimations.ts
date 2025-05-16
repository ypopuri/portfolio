
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useScrollAnimations = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Find all sections with "data-animate" attribute
    const sections = document.querySelectorAll("section[data-animate]");
    
    sections.forEach((section, index) => {
      // Skip the timeline section as it has its own animation
      if (section.id === "timeline") return;
      
      // Get animation direction (alternating between left and right)
      const direction = index % 2 === 0 ? "left" : "right";
      const x = direction === "left" ? -100 : 100;
      
      // Set initial state (offscreen)
      gsap.set(section, {
        x: x,
        opacity: 0,
      });
      
      // Create scroll trigger animation
      gsap.to(section, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top bottom-=100",
          end: "top center",
          toggleActions: "play none none reverse",
        },
      });
      
      // Animate children with staggered effect
      const animateElements = section.querySelectorAll("[data-animate-child]");
      if (animateElements.length > 0) {
        gsap.from(animateElements, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=50",
            end: "top center",
            toggleActions: "play none none reverse",
          },
        });
      }
    });
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, []);
};

// Hook to monitor timeline section and trigger rerender
export const useTimelineScroll = () => {
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const timelineSection = document.getElementById("timeline");
    if (!timelineSection) return;
    
    let hasScrolledDown = false;
    let lastScrollTop = 0;
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const sectionTop = timelineSection.getBoundingClientRect().top + window.pageYOffset;
      const sectionBottom = sectionTop + timelineSection.offsetHeight;
      
      // Check if we've scrolled down past the timeline section
      if (scrollTop > sectionTop + 300) {
        hasScrolledDown = true;
      }
      
      // Check if we're scrolling back up to the timeline section
      if (hasScrolledDown && scrollTop < lastScrollTop && 
          scrollTop <= sectionTop + 100 && scrollTop >= sectionTop - window.innerHeight/2) {
        hasScrolledDown = false;
        setKey(prevKey => prevKey + 1); // Force rerender
      }
      
      lastScrollTop = scrollTop;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return key;
};
