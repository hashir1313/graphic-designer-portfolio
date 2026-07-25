"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, MapPin, Send } from "lucide-react";
import Button from "./Button";
import { EMAIL } from "../../lib/constants";
import { useState } from "react";

interface Profile {
  email?: string;
  location?: string;
}

interface ContactProps {
  profile?: Profile;
}

export default function Contact({ profile }: ContactProps) {
  const email = profile?.email || EMAIL;
  const location = profile?.location || "Surat, Gujarat, India";
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-24 lg:py-28"
    >
      {/* Main Container */}
      <div className="relative z-10 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-5rem)] max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 lg:mb-20 text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-4">
            Contact
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-3xl mx-auto">
            Let's discuss your next project and bring your vision to life
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {/* Left Column - Contact Information */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-6 md:space-y-8"
          >
            {/* Contact Card */}
            <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
                Get In Touch
              </h3>

              {/* Email */}
              <motion.a
                href={`mailto:${email}`}
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 md:gap-6 p-4 md:p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 mb-4 md:mb-6 group"
              >
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 md:p-4 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm md:text-base text-white/60 mb-1 md:mb-2 font-medium">
                    Email
                  </p>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white group-hover:text-white transition-colors">
                    {email}
                  </p>
                </div>
              </motion.a>

              {/* Location */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 md:gap-6 p-4 md:p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 md:p-4 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm md:text-base text-white/60 mb-1 md:mb-2 font-medium">
                    Location
                  </p>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white">
                    {location}
                  </p>
                </div>
              </motion.div>

              {/* CTA Button */}
              <div className="mt-6 md:mt-8">
                <Button
                  variant="filled"
                  size="md"
                  icon={<Send className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                  onClick={() => (window.location.href = `mailto:${email}`)}
                >
                  Send Email
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl h-full">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 md:mb-8">
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-5 md:space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm text-white/60 mb-2 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm text-white/60 mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm text-white/60 mb-2 font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                    placeholder="Project inquiry"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm text-white/60 mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  variant="filled"
                  size="md"
                  icon={<Send className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
