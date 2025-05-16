import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagicCard } from "./magicui/magic-card";
import { Star } from "lucide-react";
import ProjectDetailsModal from "./ProjectDetailsModal";

const projects = [
  {
    title: "Java full stack developer",
    category: "Cognizant",
    image: "/Cognizant-Logo.jpg",
    description: "Enterprise insurance platform with seamless policy management, claims processing, and Guidewire integration.",
    details: {
      client: "Gannett",
      duration: "Dec 2019 to Aug 2022",
      technologies: ["Java", "J2EE", "Spring Boot", "Spring MVC", "Spring Data JPA", "Guidewire (PolicyCenter, BillingCenter, ClaimCenter)", "Hibernate", "RESTful APIs", "Oracle PL/SQL", "JavaScript", "jQuery", "XML", "JSON", "Apache Tomcat", "WebLogic", "Git", "Maven", "JIRA", "Postman", "Agile Methodology"],
      features: ["Policy Creation and Management", "Claims Processing", "Billing and Payments Integration", "User Role Management", "Guidewire Module Communication (PolicyCenter, BillingCenter, ClaimCenter)"],
      challenge: "Integrating multiple Guidewire modules while maintaining data consistency and smooth policy lifecycle transitions.",
      solution: "Developed RESTful microservices using Spring Boot and integrated PolicyCenter, BillingCenter, and ClaimCenter. Implemented transaction management and validation rules to ensure seamless data flow across modules.",
      outcome: "Improved processing efficiency by 30% and reduced policy issuance errors by 40%, resulting in smoother end-to-end policy handling.",
    }
  },
  {
    title: "Web App Developer",
    category: "UAB",
    image: "/UAB.webp",
    description: "Travel guide platform offering optimized routes based on real-time weather data and user preferences.",
    details: {
      client: "UAB",
      duration: "Dec 2022 to Jun 2023",
      technologies: ["Python", "Flask", "NumPy", "MySQL", "HTML5", "CSS3", "JavaScript", "REST APIs"],
      features: ["Real-Time Weather Tracker", "Route Optimization", "User Preference Storage", "Responsive UI Design", "Travel Time Recommendations"],
      challenge: "Designing a travel guide that dynamically adapts to real-time weather data and user preferences while delivering smooth user interaction across devices.",
      solution: "Developed a Flask-based backend integrated with MySQL, used NumPy for optimized route calculations, and built a responsive frontend with HTML, CSS, and JavaScript. Integrated weather APIs for live updates.",
      outcome: "Created a smart and interactive travel assistant that improved planning accuracy and delivered a seamless user experience across platforms.",
      github: "https://github.com/ypopuri/Masters_Sem_3_Project_final.git"
    }
  },
  {
    title: "Java full stack developer",
    category: "Regions",
    image: "/regions-logo.png",
    description: "Interactive 3D product models for an augmented reality shopping experience.",
    details: {
      client: "Redions Bank",
      duration: "Feb 2023 to present",
      technologies: ["Java", "Spring Boot", "Spring Cloud", "Microservices", "REST APIs", "Kafka", "AWS (EC2, S3, Lambda, API Gateway)", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "Jenkins", "Git", "Swagger", "Angular", "CI/CD", "Agile"],
      features: ["User Authentication and Authorization", "Account Overview and Transaction History", "Fund Transfers and Bill Payments", "Real-time Notifications and Alerts", "API-driven Microservices Communication", "Cloud Deployment with AWS", "CI/CD Pipeline Integration", "Responsive Frontend with Angular"],
      challenge: "Building a secure and scalable banking platform capable of handling high-volume transactions with real-time processing.",
      solution: "Designed microservices with Spring Cloud and deployed on AWS using EC2, Lambda, and S3. Used Kafka for asynchronous messaging, and Docker/Kubernetes for scalable deployment.",
      outcome: "Achieved 99.99% uptime, scaled to support 1M+ transactions/day, and improved deployment speed by 70% through CI/CD automation.",
    }
  },
  {
    title: "Mobile Banking App",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "User-friendly mobile banking interface with secure biometric authentication.",
    details: {
      client: "SecureBank Financial",
      duration: "6 Months",
      technologies: ["React Native", "Redux", "Node.js", "MongoDB", "Plaid API"],
      features: ["Biometric Authentication", "Real-time Transactions", "Budget Tracking", "Bill Payments", "Data Encryption"],
      challenge: "Designing a banking app that balances security requirements with a simple, intuitive user experience.",
      solution: "Implemented a clean, accessible UI with subtle animations to guide users. Used biometric authentication and end-to-end encryption for security.",
      outcome: "The app achieved a 4.8/5 rating on app stores and increased customer engagement with digital banking services by 45%.",
      link: "https://example.com/banking-app",
      github: "https://github.com/example/banking-app"
    }
  },
  {
    title: "Corporate Identity",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    description: "Complete brand identity package for a tech startup including logo and guidelines.",
    details: {
      client: "NexTech Solutions",
      duration: "2 Months",
      technologies: ["Adobe Illustrator", "Photoshop", "Figma", "InDesign", "After Effects"],
      features: ["Logo Design", "Color System", "Typography", "Brand Guidelines", "Marketing Materials"],
      challenge: "Creating a cohesive brand identity system that works across digital and print media while conveying the company's innovative approach.",
      solution: "Developed a flexible design system with responsive logo variations, a carefully selected color palette, and comprehensive usage guidelines.",
      outcome: "The new brand identity helped the client establish a strong market presence and contributed to a successful funding round.",
      link: "https://example.com/brand-identity",
      github: null
    }
  },
  {
    title: "Travel Blog",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    description: "Dynamic travel blog with interactive maps and immersive storytelling elements.",
    details: {
      client: "Wanderlust Adventures",
      duration: "2 Months",
      technologies: ["Next.js", "MongoDB", "Mapbox API", "Cloudinary", "Tailwind CSS"],
      features: ["Interactive Maps", "Dynamic Content", "Image Galleries", "Search & Filter", "Author Dashboard"],
      challenge: "Building a content-rich travel blog that loads quickly and engages users with interactive storytelling elements.",
      solution: "Implemented server-side rendering for fast initial page loads and optimized media delivery. Created custom map integrations to visualize travel routes.",
      outcome: "The blog saw a 60% increase in average session duration and a 40% decrease in bounce rate compared to the previous version.",
      link: "https://example.com/travel-blog",
      github: "https://github.com/example/travel-blog"
    }
  }
];

const categories = ["All", "Web Development", "Web Design", "UI/UX Design", "3D Modeling", "Brand Identity"];

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CEO at TechSolutions",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80",
    rating: 5,
    text: "Working with this developer was an exceptional experience. Their technical expertise and attention to detail transformed our ideas into a stunning web application that exceeded our expectations."
  },
  {
    name: "Michael Chen",
    position: "Product Manager at InnovateCorp",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    rating: 5,
    text: "I was amazed by the level of creativity and technical skill demonstrated. The parallel computing solution they implemented reduced our processing time by 60%, giving us a significant competitive advantage."
  },
  {
    name: "Emily Rodriguez",
    position: "Marketing Director at BrandBox",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80",
    rating: 4.9,
    text: "The UI/UX work delivered was nothing short of brilliant. Our customer engagement metrics improved dramatically following the redesign, and we've received countless compliments on the intuitive, beautiful interface."
  },
  {
    name: "David Thompson",
    position: "Founder at StartupLaunch",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 5,
    text: "As a startup founder, finding a developer who understands both technical requirements and business goals is invaluable. Their expertise in building scalable applications gave us the foundation we needed to grow rapidly."
  },
];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const testimonialCardsRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<HTMLDivElement[]>([]);

  // Create refs for each row
  rowRefs.current = [];
  const addRowRef = (el: HTMLDivElement) => {
    if (el && !rowRefs.current.includes(el)) {
      rowRefs.current.push(el);
    }
  };

  // Filter projects based on active category
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Split projects into rows
  const projectsInRows = [];
  const rowSize = 3;
  for (let i = 0; i < filteredProjects.length; i += rowSize) {
    projectsInRows.push(filteredProjects.slice(i, i + rowSize));
  }

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      
      const { current: section } = sectionRef;
      const { current: heading } = headingRef;
      const { current: filter } = filterRef;
      const { current: testimonial } = testimonialRef;
      const { current: testimonialCards } = testimonialCardsRef;
      
      if (section && heading && filter) {
        gsap.set(heading, { opacity: 0, y: 50 });
        gsap.set(filter, { opacity: 0, y: 30 });
        
        gsap.to(heading, {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: heading,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        });
        
        gsap.to(filter, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: filter,
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
          }
        });

        // Set up the alternating row animations
        rowRefs.current.forEach((rowRef, index) => {
          if (rowRef) {
            const isEven = index % 2 === 0;
            const direction = isEven ? 1 : -1;
            const projects = rowRef.querySelectorAll('.project-card');
            
            gsap.set(projects, { 
              x: direction * 100, 
              opacity: 0,
              rotationY: direction * 5
            });
            
            gsap.to(projects, {
              x: 0,
              opacity: 1,
              rotationY: 0,
              stagger: 0.1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: rowRef,
                start: "top bottom-=100",
                end: "bottom bottom-=200",
                toggleActions: "play none none reverse"
              }
            });
          }
        });

        // Animate the testimonial section
        if (testimonial && testimonialCards) {
          gsap.set(testimonial, { opacity: 0, y: 50 });
          
          gsap.to(testimonial, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: testimonial,
              start: "top bottom-=100",
              toggleActions: "play none none reverse"
            }
          });

          const testimonialItems = testimonialCards.querySelectorAll('.testimonial-card');
          gsap.set(testimonialItems, { opacity: 0, x: 100 });
          
          gsap.to(testimonialItems, {
            opacity: 1,
            x: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: testimonialCards,
              start: "top bottom-=50",
              toggleActions: "play none none reverse"
            }
          });
        }
      }
    }

    // Auto-rotate testimonials
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(testimonialInterval);
  }, [filteredProjects]);

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === Math.floor(rating) && rating % 1 !== 0) {
        stars.push(
          <div key={i} className="relative">
            <Star className="w-5 h-5 text-yellow-400" />
            <div 
              className="absolute top-0 left-0 overflow-hidden" 
              style={{ width: `${(rating % 1) * 100}%` }}
            >
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="w-5 h-5 text-yellow-400" />
        );
      }
    }
    return stars;
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="min-h-screen section-padding relative overflow-hidden py-20"
      data-animate="right"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-72 h-72 rounded-full bg-gradient-cta opacity-5 blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-10 w-80 h-80 rounded-full bg-gradient-accent opacity-5 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="text-center mb-12" data-animate-child>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Explore my recent projects showcasing creativity, technical skill, and attention to detail.
          </p>
        </div>

        <div ref={filterRef} className="flex flex-wrap justify-center gap-3 mb-12" data-animate-child>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-primary text-white shadow-lg shadow-primary/25"
                  : "border border-border hover:bg-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div ref={projectsRef} className="space-y-10">
          {projectsInRows.map((row, rowIndex) => (
            <div 
              key={rowIndex}
              ref={addRowRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {row.map((project, index) => (
                <div 
                  key={`${rowIndex}-${index}`}
                  className="project-card card-3d overflow-hidden rounded-xl shadow-lg"
                >
                  <div className="card-3d-inner h-full">
                    <div className="group relative h-full bg-background hover:transform hover:scale-105 transition-transform duration-500">
                      {/* Project image */}
                      <div className="h-64 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      
                      {/* Project details */}
                      <div className="p-6">
                        <span className="inline-block px-3 py-1 text-xs bg-secondary rounded-full mb-3">
                          {project.category}
                        </span>
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-foreground/70">{project.description}</p>
                      </div>
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-accent/90 opacity-0 group-hover:opacity-95 transition-opacity duration-500 flex flex-col justify-center items-center text-white p-6">
                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                        <p className="text-sm mb-4 text-center">{project.description}</p>
                        <button 
                          className="px-6 py-2 border-2 border-white rounded-full hover:bg-white hover:text-primary transition-colors"
                          onClick={() => handleProjectClick(project)}
                        >
                          View Project
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Client Reviews Section */}
        <div ref={testimonialRef} className="mt-24 pt-16 border-t border-border" data-animate-child>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Client <span className="text-gradient">Reviews</span>
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Don't just take my word for it. Here's what my clients have to say about working with me.
            </p>
          </div>

          <div className="relative" ref={testimonialCardsRef}>
            <div className="testimonial-slider overflow-hidden relative">
              <div className="flex items-center">
                {/* Active testimonial card */}
                <MagicCard 
                  className="testimonial-card w-full glass-panel p-6 md:p-8 rounded-2xl shadow-lg"
                  gradientColor={"#7400ff"}
                >
                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
                        <img 
                          src={testimonials[activeTestimonial].image} 
                          alt={testimonials[activeTestimonial].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        {renderStars(testimonials[activeTestimonial].rating)}
                        <span className="ml-2 text-foreground/70">
                          {testimonials[activeTestimonial].rating.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-foreground/80 italic mb-4 text-lg">"{testimonials[activeTestimonial].text}"</p>
                      <div>
                        <h4 className="font-semibold text-xl">{testimonials[activeTestimonial].name}</h4>
                        <p className="text-foreground/70">{testimonials[activeTestimonial].position}</p>
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </div>
            </div>

            {/* Testimonial navigation dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeTestimonial === index
                      ? "bg-primary w-8"
                      : "bg-foreground/30 hover:bg-foreground/50"
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <ProjectDetailsModal 
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            project={selectedProject}
          />
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
