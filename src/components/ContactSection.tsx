import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagicCard } from "./magicui/magic-card";

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const { current: section } = sectionRef;
      const { current: heading } = headingRef;
      const { current: form } = formRef;
      const { current: info } = infoRef;

      if (section && heading && form && info) {
        gsap.set(heading, { opacity: 0, y: 50 });
        gsap.set(form, { opacity: 0, x: -50 });
        gsap.set(info, { opacity: 0, x: 50 });

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

        gsap.to(form, {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: form,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        });

        gsap.to(info, {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.5,
          scrollTrigger: {
            trigger: info,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        });

        // Float animation for contact cards
        const contactCards = info.querySelectorAll(".contact-card");
        contactCards.forEach((card, index) => {
          gsap.to(card, {
            y: 10 * ((index % 3) - 1),
            duration: 2 + (index % 2),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Form submitted! (Demo only)");
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-screen section-padding relative overflow-hidden py-20 z-40"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-gradient-primary opacity-5 blur-3xl"></div>
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-secondary opacity-5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Have a project in mind? Let's talk about how we can bring your ideas
            to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <MagicCard className="rounded-2xl p-1" gradientColor={"#7400ff"}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl"
            >
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="Project Inquiry"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full button-gradient text-white py-3 rounded-lg font-medium shadow-lg shadow-primary/25"
              >
                Send Message
              </button>
            </form>
          </MagicCard>

          <div ref={infoRef} className="space-y-6">
            <MagicCard
              className="contact-card rounded-2xl p-1"
              gradientColor={"#7400ff"}
            >
              <div className="p-6 rounded-2xl">
                <h3 className="text-xl font-semibold mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-foreground/70">+1 (940) 290-0468</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-foreground/70">popuriyaswanthkumar@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-foreground/70">
                        Hightstown, NJ, 08520
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </MagicCard>

            <MagicCard
              className="contact-card rounded-2xl p-1"
              gradientColor={"#7400ff"}
            >
              <div className="p-6 rounded-2xl">
                <h3 className="text-xl font-semibold mb-4">Social Media</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </MagicCard>

            <MagicCard
              className="contact-card rounded-2xl p-1"
              gradientColor={"#7400ff"}
            >
              <div className="p-6 rounded-2xl">
                <h3 className="text-xl font-semibold mb-2">Availability</h3>
                <p className="text-foreground/70">
                  Let's discuss your project needs!
                </p>
              </div>
            </MagicCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
