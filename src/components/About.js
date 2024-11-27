import React from 'react';
import { motion } from 'framer-motion';
import { getBaseUrl } from '../utils/urlUtils';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function About() {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/ChadwickNFT',
      icon: <FaGithub className="text-2xl" />
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/chadwick-radunske/',
      icon: <FaLinkedin className="text-2xl" />
    }
  ];

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
              <a href={`${getBaseUrl()}training/index.html`} className="hover:text-gold">
                ABOUT
              </a>
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
              
              <div className="flex justify-center space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gold transition-colors duration-300"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
