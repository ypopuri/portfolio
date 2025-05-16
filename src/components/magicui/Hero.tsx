
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DotPattern } from "./dot-pattern";

const MotionDiv = motion.div;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function HeroBackground() {
  return (
    <div
      className="fixed left-0 top-0 min-h-screen
      background-blur w-full overflow-hidden"
    >
      {/* Background Gradient Layer */}
      {/* <div className="absolute inset-0 z-0 w-full h-full 
        bg-[radial-gradient(97.14%_56.45%_at_51.63%_0%,_#7D56F4_0%,_#4517D7_30%,_#000_100%)]"></div> */}

      {/* Dot Pattern Overlay */}
      <DotPattern
        className={cn(
          `absolute inset-0 z-0 
opacity-120 dark:opacity-40
             [mask-image:radial-gradient(50vw_circle_at_center,
            black,transparent)] dark:[mask-image:radial-gradient(50vw_circle_at_center,
            white,transparent)] `
        )}
      />

      {/* Foreground Content */}
      <MotionDiv
        className="relative z-10 flex flex-col items-center justify-start min-h-screen space-y-6 pt-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Your content here */}
      </MotionDiv>
    </div>
  );
}
