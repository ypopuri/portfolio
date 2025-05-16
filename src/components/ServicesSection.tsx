
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagicCard } from "./magicui/magic-card";
import { Code, Layout, Palette, Network, Database, Users } from "lucide-react";

const services = [
  {
    icon: <Layout className="h-7 w-7" />,
    title: "Web Design",
    description:
      "Creating beautiful, responsive websites with stunning visuals and intuitive navigation that engage users and reflect your brand identity perfectly.",
    longDescription: "I have strong knowledge and hands-on experience in building full-fledged websites from the ground up. As a Full Stack Developer, I specialize in creating responsive and user-friendly frontends, as well as developing secure, scalable, and high-performance backend systems. My work combines clean design with robust functionality, ensuring each application delivers a seamless user experience from start to finish."
  },
  {
    icon: <Code className="h-7 w-7" />,
    title: "Web Development",
    description:
      "Building robust, high-performance web applications with modern technologies that scale seamlessly and deliver exceptional user experiences.",
    longDescription: "I craft clean, efficient code that powers dynamic and responsive web applications. Using modern frameworks and best practices, I build solutions that not only work flawlessly but are also maintainable and scalable for future growth."
  },
  {
    icon: <Network className="h-7 w-7" />,
    title: "Parallel Computing",
    description:
      "Designing high-performance solutions using multithreading and distributed systems to solve complex computational challenges efficiently.",
    longDescription: "I have solid expertise in parallel computing, with a deep understanding of multithreading, asynchronous processing, and distributed systems. I've worked with technologies like Java Concurrency API, Scala Futures, Akka Actors, and Kafka Streams to build high-performance, scalable applications. My experience in designing thread-safe and efficient architectures has helped optimize processing speed and system responsiveness across several enterprise-level projects."
  },
  {
    icon: <Palette className="h-7 w-7" />,
    title: "UI/UX Design",
    description:
      "Designing beautiful user interfaces and experiences that engage, delight, and guide users through seamless digital journeys.",
    longDescription: "I have a strong understanding of UI/UX principles and enjoy translating design ideas into interactive, user-centered web interfaces. I work closely with designers and use tools like Figma and Adobe XD to build responsive, accessible, and visually appealing frontends. My goal is always to create intuitive experiences that not only look great but also feel effortless for users to navigate."
  },
  {
    icon: <Database className="h-7 w-7" />,
    title: "Database Solutions",
    description:
      "Implementing efficient, scalable database architectures that ensure data integrity, security, and optimal performance for applications of any size.",
    longDescription: "I design and implement database solutions that form the backbone of robust applications. From schema design to query optimization, I ensure your data is structured efficiently, securely managed, and easily accessible when needed."
  },
  {
    icon: <Users className="h-7 w-7" />,
    title: "Tech Consultation",
    description:
      "Providing expert guidance on technology stack selection, architecture design, and implementation strategies for your digital projects.",
    longDescription: "I offer strategic technology consulting that helps businesses make informed decisions about their digital infrastructure. By analyzing requirements, constraints, and goals, I recommend custom technology solutions that align perfectly with your business objectives."
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = React.useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const { current: section } = sectionRef;
      const { current: heading } = headingRef;
      const { current: cards } = cardsRef;

      if (section && heading && cards) {
        gsap.set(heading, { opacity: 0, y: 50 });
        gsap.set(cards.children, { opacity: 0, y: 50 });

        gsap.to(heading, {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: heading,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        });

        gsap.to(cards.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: cards,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        });

        // Create a floating animation for cards
        cards.childNodes.forEach((card, index) => {
          gsap.to(card, {
            y: `${(index % 3) * 10 - 15}px`,
            duration: 3 + (index % 2),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }
    }
  }, []);

  const openServiceModal = (index: number) => {
    setActiveService(index);
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3 }
      );
    }
  };

  const closeServiceModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, { 
        opacity: 0, 
        y: 20, 
        duration: 0.3,
        onComplete: () => setActiveService(null)
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="service"
      className="min-h-screen section-padding relative overflow-hidden py-20"
      data-animate="left"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-gradient-primary opacity-5 blur-3xl"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-gradient-secondary opacity-5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="text-center mb-16" data-animate-child>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Services</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Specialized expertise to bring your digital vision to life with
            creativity, precision, and cutting-edge technology.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <MagicCard
              key={index}
              gradientColor={"#7400ff"}
              className="card-3d glass-panel p-8 rounded-2xl hover:shadow-xl transition-all
               duration-300  group"
              onClick={() => openServiceModal(index)}
            >
              <div className="card-3d-inner">
                <div className="mb-6 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-primary group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-foreground/70">{service.description}</p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary text-sm flex items-center">
                    <span>Learn more</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="ml-1 group-hover:translate-x-1 transition-transform"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </MagicCard>
          ))}
        </div>
      </div>

      {/* Service Modal */}
      {activeService !== null && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => closeServiceModal()}
        >
          <div 
            ref={modalRef}
            className="bg-background rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-xl opacity-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                  {services[activeService].icon}
                </div>
                <h3 className="text-2xl font-bold">{services[activeService].title}</h3>
              </div>
              <button 
                onClick={() => closeServiceModal()}
                className="p-1 rounded-full hover:bg-secondary transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              {services[activeService].longDescription}
            </p>
            <div className="mt-8 text-center">
              <button 
                onClick={() => closeServiceModal()}
                className="button-gradient rounded-full px-8 py-3 text-white font-medium shadow-lg shadow-primary/25"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesSection;
