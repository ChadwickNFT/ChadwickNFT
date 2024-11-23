import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <div className="min-h-screen bg-rich-black pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          className="space-y-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* About Section */}
          <section className="text-center">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-gold mb-8">
              ABOUT
            </h1>
            <p className="text-white/90 text-lg leading-relaxed max-w-2xl mx-auto">
              Photographer and digital artist exploring the intersection of traditional photography 
              and blockchain technology. Specializing in black & white photography that captures 
              the raw essence of urban landscapes and human moments.
            </p>
          </section>

          {/* Contact Section */}
          <section className="text-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-gold">GET IN TOUCH</h2>
                <p className="text-white/90">
                  For inquiries, collaborations, or print purchases:
                </p>
              </div>
              
              <div className="flex justify-center">
                <a
                  href="https://twitter.com/chadwicknft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gold transition-colors duration-300"
                >
                  <span className="sr-only">X (formerly Twitter)</span>
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
