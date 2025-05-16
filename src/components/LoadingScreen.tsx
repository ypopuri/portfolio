
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Linkedin, Mail } from "lucide-react";

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the loading screen after 6 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(10px)",
            transition: { duration: 1.2, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center 
            bg-gradient-radial from-blue-500 to-blue-900 overflow-hidden"
        >
          {/* Animated SVG Loader */}
          <motion.svg
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 360,
              transition: { duration: 1.5, ease: "easeOut" },
            }}
            width="120"
            height="120"
            viewBox="0 0 100 100"
            className="mb-8"
          >
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="white"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 1,
                transition: { duration: 2, ease: "easeInOut" },
              }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="20"
              fill="#3b82f6"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 0.8,
                transition: { delay: 0.5, duration: 1, ease: "easeOut" },
              }}
            />
          </motion.svg>

          {/* Welcome Text */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.8, duration: 0.8 } 
            }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome to my Portfolio
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Explore my work and projects
            </p>

            {/* Social Icons with Glass Effect */}
            <div className="flex space-x-4 justify-center mb-10">
              <motion.a
                href="#"
                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 
                  hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="text-white h-6 w-6" />
              </motion.a>
              <motion.a
                href="#"
                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 
                  hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="text-white h-6 w-6" />
              </motion.a>
              <motion.a
                href="#"
                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 
                  hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="text-white h-6 w-6" />
              </motion.a>
            </div>
          </motion.div>

          {/* Yaswanth Kumar popuri */}
          <motion.div
            className="absolute bottom-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 1.5, duration: 1 } 
            }}
          >
            <p className="text-blue-100 text-xl font-light">Created by</p>
            <h3 className="text-white text-2xl font-bold">Yaswanth Kumar Popuri</h3>
          </motion.div>

          {/* Animated Particles Background */}
          <div className="absolute inset-0 z-[-1]">
            {[...Array(20)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute h-2 w-2 rounded-full bg-white/40"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: Math.random() * 0.5 + 0.3,
                  scale: Math.random() * 2 + 0.5,
                }}
                animate={{
                  y: [null, Math.random() * -100 - 50],
                  opacity: [null, 0],
                  transition: {
                    duration: Math.random() * 4 + 3,
                    repeat: Infinity,
                    repeatType: "loop",
                  },
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
