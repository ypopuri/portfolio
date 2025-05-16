import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Award, GraduationCap, Layers3, User } from "lucide-react";
import { MagicCard } from "./magicui/magic-card";
import CountUp from "react-countup";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const { current: section } = sectionRef;
      const { current: heading } = headingRef;
      const { current: content } = contentRef;
      const { current: stats } = statsRef;
      const { current: tabs } = tabsRef;

      if (section && heading && content && stats && tabs) {
        // Set initial states
        gsap.set(heading, { opacity: 0, x: -100 });
        gsap.set(content, { opacity: 0, x: 100 });
        gsap.set(stats.children, { opacity: 0, y: 20, stagger: 0.1 });
        gsap.set(tabs, { opacity: 0, y: 50 });

        // Create animations triggered by scroll
        gsap.to(heading, {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: heading,
            start: "top bottom-=100px",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
        });

        gsap.to(content, {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: content,
            start: "top bottom-=100px",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
        });

        gsap.to(stats.children, {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: stats,
            start: "top bottom-=50px",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
        });

        gsap.to(tabs, {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: tabs,
            start: "top bottom-=50px",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
        });

        // Parallax effect for background shapes
        const shapes = document.querySelectorAll(".shape");
        shapes.forEach((shape, i) => {
          const speed = 1 - i * 0.1;

          gsap.to(shape, {
            y: `${-100 * speed}px`,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        });
      }
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen relative overflow-hidden py-20 section-padding"
    >
      {/* Background decorative shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="shape absolute top-10 left-10 w-64 h-64 rounded-full bg-gradient-primary opacity-10 blur-3xl"></div>
        <div className="shape absolute bottom-40 right-20 w-72 h-72 rounded-full bg-gradient-secondary opacity-10 blur-3xl"></div>
        <div className="shape absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-gradient-accent opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Get to know my background, skills, and creative approach to digital
            solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="card-3d rounded-2xl overflow-hidden">
            <div className="card-3d-inner">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80"
                alt="Computer setup"
                className="w-full h-auto object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>

          <div ref={contentRef} className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-semibold">
              Creative Developer with a Passion for Innovative Web Solutions
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              From backend logic to frontend magic, full stack is my passion. My
              expertise lies in building robust, scalable, and innovative
              applications as a Full Stack Developer.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              I'm constantly exploring new technologies and design trends to
              push the boundaries of what's possible in digital experiences.
              Whether you need a stunning portfolio, a powerful e-commerce
              platform, or an interactive web application, I bring both
              technical skill and creative vision to every project.
            </p>

            <div
              ref={statsRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6"
            >
              <div
                className="text-center p-4 glass-panel 
              border border-gray-400/40 rounded-xl"
              >
                <h4 className="text-3xl font-bold text-gradient mb-1">
                  <CountUp end={6} duration={3} suffix="" />+
                </h4>
                <p className="text-sm text-foreground/70">Years Experience</p>
              </div>
              <div
                className="text-center p-4 glass-panel 
              border border-gray-400/40 rounded-xl"
              >
                {" "}
                <h4 className="text-3xl font-bold text-gradient mb-1">
                  <CountUp end={9} duration={3} suffix="" />+
                </h4>
                <p className="text-sm text-foreground/70">Projects Completed</p>
              </div>
              <div
                className="text-center p-4 glass-panel 
              border border-gray-400/40 rounded-xl"
              >
                {" "}
                <h4 className="text-3xl font-bold text-gradient mb-1">
                  <CountUp end={2} duration={3} suffix="" />+
                </h4>
                <p className="text-sm text-foreground/70">Professional Projects</p>
              </div>
              <div
                className="text-center p-4 glass-panel 
              border border-gray-400/40 rounded-xl"
              >
                {" "}
                <h4 className="text-3xl font-bold text-gradient mb-1">
                  <CountUp end={7} duration={3} suffix="" />+
                </h4>
                <p className="text-sm text-foreground/70">Academic Projects</p>
              </div>
            </div>
          </div>
        </div>

        <div ref={tabsRef} className="mt-24">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto mb-8">
              <TabsTrigger
                value="about"
                className="flex flex-col items-center gap-2 py-4"
              >
                <User className="h-6 w-6" /> 
                <span>About</span>
              </TabsTrigger>
              <TabsTrigger
                value="awards"
                className="flex flex-col items-center gap-2 py-4"
              >
                <Award className="h-6 w-6" />
                <span>Awards</span>
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="flex flex-col items-center gap-2 py-4"
              >
                <GraduationCap className="h-6 w-6" />
                <span>Education</span>
              </TabsTrigger>
              <TabsTrigger
                value="skillset"
                className="flex flex-col items-center gap-2 py-4"
              >
                <Layers3 className="h-6 w-6" />
                <span>Skillset</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-8 animate-fade-in">
              <MagicCard
                className="p-8 rounded-xl bg-background"
                gradientColor={"#7400ff"}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-1 md:col-span-1 flex flex-col justify-center items-center">
                    <div className="relative h-40 w-40 mb-6">
                      <Code className="absolute -top-4 -left-4 h-12 w-12 text-primary animate-pulse-soft" />
                      <div className="h-full w-full rounded-full bg-gradient-primary opacity-20 animate-pulse"></div>
                      <div className="absolute inset-6 rounded-full bg-gradient-primary opacity-40"></div>
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-xl mb-2">Yaswanth Kumar</h4>
                      <p className="text-sm text-muted-foreground">
                        +19402900468
                      </p>
                      <p className="text-sm text-muted-foreground">
                        popuriyaswanthkumar@example.com
                      </p>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <h3 className="text-2xl font-semibold mb-4">
                      From backend logic to frontend magic full stack is my
                      passion.
                    </h3>
                    <p className="mb-4 text-foreground/80">
                      My expertise lies in building robust, scalable, and
                      innovative applications as a Full Stack Developer. I
                      specialize in Java, Core Java, and Advanced Java,
                      developing powerful backend systems using Spring Boot and
                      Microservices.
                    </p>
                    <p className="mb-4 text-foreground/80">
                      I'm proficient in AWS (EC2, S3, Lambda) and have hands-on
                      experience with Azure Cosmos DB, MongoDB, PostgreSQL, and
                      SQL Server. On the frontend, I craft seamless user
                      experiences using React, Angular, Node.js, and modern
                      UI/UX principles.
                    </p>
                    <p className="text-foreground/80">
                      From cloud deployments to machine learning integration, I
                      deliver full-stack solutions that are smart, scalable, and
                      future-ready.
                    </p>
                  </div>
                </div>
              </MagicCard>
            </TabsContent>

            <TabsContent value="awards" className="mt-8 animate-fade-in">
              <MagicCard
                className="p-8 rounded-xl bg-background"
                gradientColor={"#7400ff"}
              >
                {" "}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 p-6 border border-border rounded-lg hover:shadow-lg transition-all">
                    <Award className="h-10 w-10 text-primary mb-4" />
                    <h4 className="text-xl font-semibold">
                      Best Logic Architect
                    </h4>
                    <p className="text-sm text-foreground/70">
                      Awarded for designing intelligent and modular application
                      logic that powered mission-critical backend services and
                      drove scalable full-stack architectures.
                    </p>
                  </div>
                  <div className="space-y-2 p-6 border border-border rounded-lg hover:shadow-lg transition-all">
                    <Award className="h-10 w-10 text-primary mb-4" />
                    <h4 className="text-xl font-semibold">
                      Performance Optimization Award
                    </h4>
                    <p className="text-sm text-foreground/70">
                      Honored for identifying and resolving system bottlenecks,
                      resulting in up to 50% performance improvement in key
                      full-stack applications.
                    </p>
                  </div>
                  <div className="space-y-2 p-6 border border-border rounded-lg hover:shadow-lg transition-all">
                    <Award className="h-10 w-10 text-primary mb-4" />
                    <h4 className="text-xl font-semibold">
                      Automation Innovator
                    </h4>
                    <p className="text-sm text-foreground/70">
                      Received for developing automation solutions using Python,
                      CI/CD pipelines, and scripting, streamlining repetitive
                      tasks and accelerating releases.
                    </p>
                  </div>
                  <div className="space-y-2 p-6 border border-border rounded-lg hover:shadow-lg transition-all">
                    <Award className="h-10 w-10 text-primary mb-4" />
                    <h4 className="text-xl font-semibold">
                      Cloud-Native Excellence Award
                    </h4>
                    <p className="text-sm text-foreground/70">
                      Celebrated for successfully deploying and managing
                      full-stack solutions using AWS (EC2, S3, Lambda) and
                      containerization tools like Docker and Kubernetes.
                    </p>
                  </div>
                </div>
              </MagicCard>
            </TabsContent>

            <TabsContent value="education" className="mt-8 animate-fade-in">
              <MagicCard
                className="p-8 rounded-xl bg-background"
                gradientColor={"#7400ff"}
              >
                {" "}
                <div className="space-y-8">
                  <div className="border-l-4 border-primary pl-6 pb-6 relative">
                    <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-primary"></div>
                    <h4 className="text-xl font-semibold">
                      Master's Degree in Data Science
                    </h4>
                    <h5 className="text-lg font-medium text-primary mb-2">
                      University of Alabama at Birmingham
                    </h5>
                    <p className="text-foreground/80">
                      During my master's program, I focused on Advanced
                      Algorithms, Parallel Computing, Big Data Analytics, and
                      Machine Learning. I actively collaborated with professors
                      on research projects involving high-throughput data
                      processing and intelligent automation, and contributed to
                      published academic papers. This experience strengthened my
                      ability to apply data science and engineering principles
                      to solve real-world problems at scale.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-6 relative">
                    <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-primary"></div>
                    <h4 className="text-xl font-semibold">
                      Bachelor's Degree in Electronics and Communication
                      Engineering
                    </h4>
                    <h5 className="text-lg font-medium text-primary mb-2">
                      K L University
                    </h5>
                    <p className="text-foreground/80">
                      During my undergraduate studies, I worked on a range of
                      innovative projects that blended hardware and software
                      systems. These projects helped me develop strong
                      foundations in Embedded Systems, Object-Oriented
                      Programming, and Digital Circuit Design. I gained hands-on
                      experience with technologies such as Java, Python,
                      Embedded C, MATLAB, Arduino, Raspberry Pi, Logisim,
                      Multisim, and Mentor Graphics, which shaped my ability to
                      think critically and engineer practical, real-world
                      solutions.
                    </p>
                  </div>
                </div>
              </MagicCard>
            </TabsContent>

            <TabsContent value="skillset" className="mt-8 animate-fade-in">
              <MagicCard
                className="p-8 rounded-xl bg-background"
                gradientColor={"#7400ff"}
              >
                {" "}
                <h3 className="text-2xl font-semibold text-center mb-8">
                  Crafting Clean Code from Frontend to Backend is What Drives Me
                </h3>
                <div className="space-y-6 max-w-3xl mx-auto">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h5 className="font-medium">Java</h5>
                      <CountUp end={95} duration={3} suffix="%" />
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-gradient-primary w-[95%]"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h5 className="font-medium">Microservices</h5>
                      <CountUp end={90} duration={3} suffix="%" />
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-gradient-primary w-[90%]"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h5 className="font-medium">Frontend</h5>
                      <CountUp end={95} duration={3} suffix="%" />
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-gradient-primary w-[95%]"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h5 className="font-medium">Cloud</h5>
                      <CountUp end={85} duration={3} suffix="%" />
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-gradient-primary w-[85%]"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h5 className="font-medium">Automachine</h5>
                      <CountUp end={90} duration={3} suffix="%" />
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-gradient-primary w-[90%]"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h5 className="font-medium">Data Base</h5>
                      <CountUp end={80} duration={3} suffix="%" />
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-gradient-primary w-[80%]"></div>
                    </div>
                  </div>
                </div>
              </MagicCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
