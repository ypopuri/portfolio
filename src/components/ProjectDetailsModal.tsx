import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { MagicCard } from "./magicui/magic-card";
import {
  Star,
  Clock,
  Award,
  Link,
  Github,
  Code,
  Globe,
  CheckCircle,
  X,
} from "lucide-react";

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    category: string;
    image: string;
    description: string;
    details?: {
      client?: string;
      duration?: string;
      technologies?: string[];
      features?: string[];
      challenge?: string;
      solution?: string;
      outcome?: string;
      link?: string;
      github?: string;
    };
  };
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  isOpen,
  onClose,
  project,
  // handleCloseModal
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Disable body scroll when modal is open
      document.body.style.overflow = "hidden";

      // Reset animation state when opening
      setIsAnimationComplete(false);

      // Start the animation completion timer
      const timer = setTimeout(() => {
        setIsAnimationComplete(true);
      }, 800);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "auto";
      };
    }
  }, [isOpen]);

  // Handle scroll inside modal for parallax effects
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  const technologies = project.details?.technologies || [
    "React",
    "Tailwind CSS",
    "TypeScript",
    "Framer Motion",
    "Three.js",
  ];

  const features = project.details?.features || [
    "Responsive Design",
    "Interactive UI Components",
    "Performance Optimization",
    "Cross-browser Compatibility",
    "Accessibility Features",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DialogContent
            className="max-w-[80vw] max-h-[80vh] p-0 border-none overflow-hidden bg-transparent"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <motion.div
              className="relative w-full h-full bg-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* <div
                className="absolute inset-0 bg-black/60 backdrop-blur-xl rounded-2xl z-0"
                onClick={onClose}
              /> */}

              <div
                className="relative z-10 w-full h-[80vh] overflow-y-auto 
                scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-transparent"
                onScroll={handleScroll}
              >
                {/* Hero Section with Parallax */}
                <div className="relative h-[40vh] overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10"
                    style={{
                      backgroundPosition: `50% ${50 + scrollY * 0.1}%`,
                    }}
                  />
                  <div className="absolute right-2 top-1 z-50 
                   pt-4 pb-8 cursor-pointer"
                                         onClick={onClose}
>
                    <X
                      onClick={onClose}
                      className="rounded-full border 
                      border-primary/50 hover:bg-primary/10 
                      transition-colors cursor-pointer z-50"
                    />

                  </div>
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    style={{
                      y: scrollY * 0.3,
                      scale: 1 + scrollY * 0.0005,
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-full p-8 z-20"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.2, duration: 0.6 },
                    }}
                  >
                    <span className="px-3 py-1 bg-primary/80 text-white rounded-full text-sm backdrop-blur-sm">
                      {project.category}
                    </span>
                    <h2 className="text-4xl font-bold text-white mt-3 drop-shadow-lg">
                      {project.title}
                    </h2>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="bg-background rounded-b-2xl p-8">
                  <div className="max-w-5xl mx-auto space-y-12">
                    {/* Project Overview */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{
                        opacity: isAnimationComplete ? 1 : 0,
                        y: isAnimationComplete ? 0 : 30,
                        transition: { duration: 0.5 },
                      }}
                    >
                      <h3 className="text-2xl font-semibold mb-4 text-gradient">
                        Project Overview
                      </h3>
                      <p className="text-foreground/80 leading-relaxed text-lg">
                        {project.description}
                      </p>

                      {/* Project Details Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <motion.div
                          className="glass-panel p-6 rounded-xl"
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                              <Star className="w-5 h-5 text-primary" />
                            </div>
                            <h4 className="font-medium">Client</h4>
                          </div>
                          <p>
                            {project.details?.client || "TechSolutions Inc."}
                          </p>
                        </motion.div>

                        <motion.div
                          className="glass-panel p-6 rounded-xl"
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                              <Clock className="w-5 h-5 text-primary" />
                            </div>
                            <h4 className="font-medium">Timeline</h4>
                          </div>
                          <p>{project.details?.duration || "2 Months"}</p>
                        </motion.div>

                        <motion.div
                          className="glass-panel p-6 rounded-xl"
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                              <Award className="w-5 h-5 text-primary" />
                            </div>
                            <h4 className="font-medium">Outcome</h4>
                          </div>
                          <p>{"Successfully Launched"}</p>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Technologies */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{
                        opacity: isAnimationComplete ? 1 : 0,
                        y: isAnimationComplete ? 0 : 30,
                        transition: { duration: 0.5, delay: 0.1 },
                      }}
                    >
                      <h3 className="text-2xl font-semibold mb-6 text-gradient">
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {technologies.map((tech, index) => (
                          <motion.div
                            key={tech}
                            className="px-4 py-2 bg-secondary rounded-full flex items-center gap-2"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                              opacity: isAnimationComplete ? 1 : 0,
                              scale: isAnimationComplete ? 1 : 0.8,
                              transition: {
                                duration: 0.3,
                                delay: 0.2 + index * 0.05,
                              },
                            }}
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: "hsl(var(--primary) / 0.2)",
                            }}
                          >
                            <Code className="w-4 h-4" />
                            <span>{tech}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Project Challenge & Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{
                          opacity: isAnimationComplete ? 1 : 0,
                          x: isAnimationComplete ? 0 : -30,
                          transition: { duration: 0.5, delay: 0.2 },
                        }}
                      >
                        <h3 className="text-2xl font-semibold text-gradient">
                          The Challenge
                        </h3>
                        <p className="text-foreground/80 leading-relaxed">
                          {project.details?.challenge ||
                            "The client needed a modern web application that could handle complex data visualization while maintaining excellent performance across all devices. They required a system that would be intuitive for users while processing large datasets in real-time."}
                        </p>
                      </motion.div>

                      <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{
                          opacity: isAnimationComplete ? 1 : 0,
                          x: isAnimationComplete ? 0 : 30,
                          transition: { duration: 0.5, delay: 0.3 },
                        }}
                      >
                        <h3 className="text-2xl font-semibold text-gradient">
                          The Solution
                        </h3>
                        <p className="text-foreground/80 leading-relaxed">
                          {project.details?.solution ||
                            "I implemented a responsive design with optimized data loading strategies. By leveraging efficient state management and code splitting, the application maintains smooth performance even with large datasets. The UI was designed with careful attention to user experience principles."}
                        </p>
                      </motion.div>
                    </div>

                    {/* Key Features */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{
                        opacity: isAnimationComplete ? 1 : 0,
                        y: isAnimationComplete ? 0 : 30,
                        transition: { duration: 0.5, delay: 0.4 },
                      }}
                    >
                      <h3 className="text-2xl font-semibold mb-6 text-gradient">
                        Key Features
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {features.map((feature, index) => (
                          <motion.div
                            key={feature}
                            className="flex items-center gap-3"
                            initial={{
                              opacity: 0,
                              x: index % 2 === 0 ? -20 : 20,
                            }}
                            animate={{
                              opacity: isAnimationComplete ? 1 : 0,
                              x: isAnimationComplete
                                ? 0
                                : index % 2 === 0
                                ? -20
                                : 20,
                              transition: {
                                duration: 0.3,
                                delay: 0.5 + index * 0.05,
                              },
                            }}
                          >
                            <div className="text-primary">
                              <CheckCircle className="w-5 h-5" />
                            </div>
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Results Showcase */}
                    <MagicCard
                      className="p-8 rounded-2xl"
                      gradientFrom="rgba(116, 0, 255, 0.7)"
                      gradientTo="rgba(254, 139, 187, 0.7)"
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: isAnimationComplete ? 1 : 0,
                          transition: { duration: 0.8, delay: 0.6 },
                        }}
                      >
                        <h3 className="text-2xl font-semibold mb-6 text-white">
                          Project Outcome
                        </h3>
                        <p className="text-white/90 mb-6 leading-relaxed">
                          {project.details?.outcome ||
                            "The project was successfully launched on schedule and met all client requirements. User engagement metrics showed a 40% increase compared to their previous solution, and load times were reduced by 60%."}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-6">
                          {project.details?.link && (
                            <motion.a
                              href={project.details.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center gap-2 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Globe className="w-5 h-5" />
                              <span>Visit Live Site</span>
                            </motion.a>
                          )}

                          {project.details?.github && (
                            <motion.a
                              href={project.details.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center gap-2 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Github className="w-5 h-5" />
                              <span>View Source Code</span>
                            </motion.a>
                          )}
                        </div>
                      </motion.div>
                    </MagicCard>

                    {/* Close button */}
                    <div className="flex justify-center pt-4 pb-8">
                      <motion.button
                        onClick={onClose}
                        className="px-8 py-3 rounded-full border
                         border-primary/50 hover:bg-primary/10
                          transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Close Project
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
