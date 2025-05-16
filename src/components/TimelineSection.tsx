
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTimelineScroll } from "./hooks/useScrollAnimations";

const experiences = [
  {
    year: "Feb 2023 - Present",
    position: "Java full stack developer",
    company: "Regions",
    description:
      "I developed and deployed scalable microservices using Java, Spring Boot, and Kafka. I containerized apps with Docker/Kubernetes on AWS and integrated ML models into the backend. I also built secure REST APIs, improved UI with Angular/React/Vue, and streamlined CI/CD using Jenkins and GitHub.",
  },
  {
    year: "Aug 2022 - Dec 2023", 
    position: "Master's Degree in Data Science",
    company: "University of Alabama at Birmingham",
    description:
      "I explored the power of data through hands-on projects in machine learning, cloud computing, and big data analytics. I built models using Python, deployed solutions on AWS, and turned complex data into actionable insights that solve real-world problems.",
  },
  {
    year: "Dec 2018 - Aug 2022",
    position: "Java full stack developer",
    company: "Cognizant",
    description:
      "I built enterprise applications using Java, Spring Boot, and microservices. I created REST/SOAP APIs, optimized databases, and implemented CI/CD with Jenkins. I worked on Angular/React frontends, integrated ML models, and used Kafka for real-time processing and AWS for cloud deployment.",
  },
  {
    year: "2016 - 2020",
    position: "Bachelor's degree in Electronics and Communication Engineering",
    company: "K L University",
    description:
      "I built a strong foundation in systems engineering and electronics while sharpening my programming and analytical skills. From circuits to code, this is where I learned how technology truly works and where my passion for innovation began.",
  },
];

const TimelineSection = () => {
  // Get the key from the useTimelineScroll hook to force rerender when needed
  const rerenderKey = useTimelineScroll();
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollDirection = useRef<"up" | "down">("down");
  const animationCompleted = useRef<boolean>(false);
  const allCardsShown = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;

      if (section) {
        // Reset animation state on rerender
        animationCompleted.current = false;
        allCardsShown.current = false;
        lastScrollDirection.current = "down";
        
        const cardsCount = experiences.length;

        // Set initial states for cards
        cardsRef.current.forEach((card) => {
          if (card) {
            gsap.set(card, {
              y: "100vh",
              opacity: 0,
              scale: 0.8,
              rotationX: 5,
              rotationY: Math.random() > 0.5 ? 3 : -3,
            });
          }
        });

        // Calculate proper height for the scrollable area
        const scrollHeight = window.innerHeight * cardsCount * 0.5;

        // Create individual timeline for each card
        const cardTimelines: gsap.core.Timeline[] = [];

        cardsRef.current.forEach((card, index) => {
          if (card) {
            const zIndex = index + 1;
            card.style.zIndex = zIndex.toString();

            const timeline = gsap.timeline();
            timeline.to(card, {
              y: 20 * index,
              opacity: 1,
              scale: 1,
              rotationX: 0,
              rotationY: 0,
              duration: 1,
              ease: "power2.out",
            });

            cardTimelines.push(timeline);
          }
        });

        // Master timeline controlled by scroll
        const masterTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollHeight}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            pinSpacing: true,
            onUpdate: (self) => {
              // Detect scroll direction
              const currentDirection = self.direction > 0 ? "down" : "up";
              
              // Only update the direction if it has changed
              if (currentDirection !== lastScrollDirection.current) {
                lastScrollDirection.current = currentDirection;
              }
              
              // Calculate progress for each card based on scroll direction and position
              const progress = self.progress;
              
              // Check if all cards are fully visible
              if (progress >= 0.95 && !allCardsShown.current) {
                allCardsShown.current = true;
              }
              
              if (currentDirection === "up") {
                // For scrolling up, cards disappear one by one in reverse order
                cardsRef.current.forEach((card, i) => {
                  if (card) {
                    // Calculate individual card progress when scrolling up
                    // More recent cards (lower index) disappear first
                    const exitThreshold = 1 - ((i + 1) / cardsCount);
                    const normalizedProgress = Math.min(1, Math.max(0, (progress - exitThreshold) / (1/cardsCount) * 1.5));
                    
                    if (progress < exitThreshold + (1/cardsCount)) {
                      // Card is exiting
                      gsap.to(card, {
                        y: "100vh",
                        opacity: 0,
                        scale: 0.8,
                        rotationX: 5,
                        rotationY: Math.random() > 0.5 ? 3 : -3,
                        duration: 0.5,
                        ease: "power2.inOut",
                        overwrite: true
                      });
                    } else {
                      // Card is still fully visible
                      gsap.to(card, {
                        y: 20 * i,
                        opacity: 1,
                        scale: 1,
                        rotationX: 0, 
                        rotationY: 0,
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: true
                      });
                    }
                  }
                });
                
                // Reset the flag when scrolling back up
                if (progress < 0.9) {
                  allCardsShown.current = false;
                }
              } else {
                // For scrolling down, cards appear one by one
                cardsRef.current.forEach((card, i) => {
                  if (card) {
                    // Calculate individual card progress when scrolling down
                    const entryThreshold = (i / cardsCount);
                    const normalizedProgress = Math.min(1, Math.max(0, (progress - entryThreshold) / (1/cardsCount) * 1.5));
                    
                    if (normalizedProgress > 0) {
                      // Card is entering or fully visible
                      gsap.to(card, {
                        y: 20 * i,
                        opacity: normalizedProgress,
                        scale: 0.8 + (normalizedProgress * 0.2),
                        rotationX: 5 * (1 - normalizedProgress),
                        rotationY: (Math.random() > 0.5 ? 3 : -3) * (1 - normalizedProgress),
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: true
                      });
                    } else {
                      // Card is still out of view
                      gsap.set(card, {
                        y: "100vh",
                        opacity: 0,
                        scale: 0.8,
                        rotationX: 5,
                        rotationY: Math.random() > 0.5 ? 3 : -3,
                      });
                    }
                  }
                });
              }
            },
            onLeave: () => {
              // When leaving the section downwards, keep cards visible
              if (!animationCompleted.current) {
                // Ensure all cards are fully visible when leaving
                cardsRef.current.forEach((card, index) => {
                  if (card) {
                    gsap.to(card, {
                      y: 20 * index,
                      opacity: 1,
                      scale: 1,
                      rotationX: 0,
                      rotationY: 0,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }
                });
                animationCompleted.current = true;
              }
            },
            onEnterBack: () => {
              // When re-entering the section from below, reset completion status
              animationCompleted.current = false;
            }
          },
        });

        // Update the wrapper height to match the scroll animation needs
        if (section.parentElement) {
          section.parentElement.style.height = `${scrollHeight}px`;
        }

        return () => {
          // Clean up all ScrollTrigger instances
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
          masterTimeline.kill();
        };
      }
    }
  }, [rerenderKey]); // Depend on rerenderKey to rerun the effect when scrolling back to top

  return (
    <div ref={sectionRef} className="relative" key={rerenderKey}>
      {/* Wrapper height controlled by JS in the useEffect */}
      <div className="timeline-wrapper">
        <section
          id="timeline"
          className="sticky top-0 h-screen w-full py-20 overflow-hidden bg-background"
          data-animate="timeline"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-purple-mild opacity-5 blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-gradient-secondary opacity-5 blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                My <span className="text-gradient">Journey</span>
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Professional timeline showcasing my career path and experience
                in the industry.
              </p>
            </div>

            {/* Cards */}
            <div
              ref={cardsContainerRef}
              className="relative h-2/3 perspective-1000"
            >
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="absolute w-full max-w-3xl left-1/2 transform -translate-x-1/2"
                >
                  <MagicCard
                    className="p-6 rounded-xl shadow-xl
                    border relative overflow-hidden"
                    gradientColor={"#7400ff"}
                  >
                    {/* Triangle accent */}
                    <div
                      className={`absolute ${
                        index % 2 === 0
                          ? "-top-10 -right-10"
                          : "-top-10 -left-10"
                      } 
                                w-20 h-20 bg-purple-mild/80
                                ${
                                  index % 2 === 0
                                    ? "rotate-45"
                                    : "rotate-[135deg]"
                                }`}
                    ></div>

                    <span className="inline-block px-4 py-1 rounded-full bg-purple/10 text-purple text-sm font-medium mb-3 relative z-10">
                      {exp.year}
                    </span>
                    <h3 className="text-xl font-semibold mb-1 relative z-10">
                      {exp.position}
                    </h3>
                    <h4 className="text-foreground/70 mb-3 relative z-10">
                      {exp.company}
                    </h4>
                    <p className="text-foreground/70 relative z-10">
                      {exp.description}
                    </p>
                  </MagicCard>
                </div>
              ))}
            </div>
          </div>
          <footer className="py-8 text-center text-sm text-foreground/70">
            <div className="max-w-7xl mx-auto px-4">
              <p>
                &copy; {new Date().getFullYear()} Portfolio. All rights
                reserved.
              </p>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default TimelineSection;
