import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Meteors } from "./magicui/meteors";
import { Particles } from "./magicui/particles";
import { MorphingText } from "./magicui/morphing-text";
import HeroBackground from "./magicui/Hero";
import Room3D from "./Room3D";
import SplashCursor from "@/yes/SplashCursor/SplashCursor";
import personimg from "../components/assets/person.png";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const model3DRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState("#ffffff");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set a delay to match the loading screen duration
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 6000);

    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    // Initialize GSAP animations after loading screen disappears
    if (isLoaded && typeof window !== "undefined") {
      const { current: hero } = heroRef;
      const { current: title } = titleRef;
      const { current: subtitle } = subtitleRef;
      const { current: cta } = ctaRef;
      const { current: shape } = shapeRef;
      const { current: model3D } = model3DRef;

      if (hero && title && subtitle && cta && shape && model3D) {
        // Reset any existing animations
        gsap.set([title, subtitle, cta], { opacity: 0, y: 30 });
        gsap.set(shape, { opacity: 0, scale: 0.8 });
        gsap.set(model3D, { opacity: 0, scale: 0.8 });

        // Create animation timeline
        const tl = gsap.timeline();

        tl.to(title, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        })
          .to(
            subtitle,
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
            },
            "-=0.6"
          )
          .to(
            cta,
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
            },
            "-=0.6"
          )
          .to(
            shape,
            {
              opacity: 1,
              scale: 1,
              duration: 1.5,
              ease: "elastic.out(1, 0.5)",
            },
            "-=1"
          )
          .to(
            model3D,
            {
              opacity: 1,
              scale: 1,
              duration: 1.5,
              ease: "back.out(1.7)",
            },
            "-=1.3"
          );
      }
    }
  }, [isLoaded]);

  const texts = ["Developer", "Designer"];

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center 
      justify-center relative overflow-hidden section-padding"
    >
      <HeroBackground />

      <SplashCursor />

      <div
        className="max-w-7xl mx-auto grid grid-cols-1 
      lg:grid-cols-2 gap-10 items-center relative z-10"
      >
        <div className="space-y-8">
          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold"
          >
            Iam a Professional <br />
            <MorphingText
              className="text-start text-black
            dark:text-white text-xl pt-2 
            relative top-6"
              texts={texts}
            />
          </h1>
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-foreground/80 leading-relaxed"
          >
            Creating stunning digital experiences that blend artistry and
            functionality to elevate your brand's online presence.
          </p>
          <div ref={ctaRef} className="flex items-center gap-5">
            <a
              href="#portfolio"
              className="button-gradient rounded-full px-8 py-4 text-white font-medium shadow-lg shadow-primary/25"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#portfolio")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 font-medium border border-border rounded-full hover:bg-secondary transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              Contact Me
            </a>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          {/* <div
            ref={shapeRef}
            className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] 
            lg:w-[500px] lg:h-[500px] rounded-full 
            bg-gradient-radial from-primary/30 to-transparent filter 
            blur-2xl absolute dark:bg-black"
          ></div>
          <div ref={model3DRef} className="relative z-10 w-full 
          h-[400px] lg:h-[500px]">
            <Room3D />
          </div> */}
          <img src={personimg} alt="" />
        </div>
        {/* <div className="w-screen flex items-center justify-center h-auto"> */}
          <div className="relative flex items-center justify-center ">
            <div
              ref={shapeRef}
              className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] 
            lg:w-[500px] lg:h-[500px] rounded-full 
            bg-gradient-radial from-primary/30 to-transparent filter 
            blur-2xl absolute dark:bg-black"
            ></div>
            <div
              ref={model3DRef}
              className="relative z-10 w-full 
          h-[400px] lg:h-[500px]"
            >
              <Room3D />
            </div>
          </div>
        {/* </div> */}
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document
              .querySelector("#about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
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
            className="h-10 w-10 opacity-50 hover:opacity-100 transition-opacity"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
