import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { 
      name: 'Home', 
      path: '/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      )
    },
    { 
      name: 'Portfolio', 
      path: '/gallery',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4h-3.17L15.17 2H8.83L7.17 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 3c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 2c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z"/>
        </svg>
      )
    },
    { 
      name: 'LFG', 
      path: '/about',
      icon: '?',
      className: 'text-nft-glow hover:text-nft-glow/80 font-medium text-lg transition-colors duration-300'
    }
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-rich-black/95 backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-20 sm:h-24">
            {/* Logo */}
            <Link
              to="/"
              className="text-lg sm:text-xl font-display font-bold text-gold hover:text-gold-light transition-colors duration-300 flex items-baseline cursor-pointer"
              onClick={() => window.location.href = process.env.PUBLIC_URL + '/'}
            >
              CHADWICK<span className="text-[0.6em] font-black ml-0.5 text-nft-glow">NFT</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-6">
              {navLinks.map((link) => (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setHoveredLink(link.path)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.path === '/' ? (
                    <Link
                      to="/"
                      onClick={() => window.location.href = process.env.PUBLIC_URL + '/'}
                      className={`flex items-center transition-all duration-300 ${
                        link.icon === '?' ? link.className : 'text-gold hover:text-white'
                      } ${hoveredLink && hoveredLink !== link.path ? 'opacity-16' : ''}`}
                    >
                      {link.icon}
                    </Link>
                  ) : (
                    <Link
                      to={link.path}
                      className={`flex items-center transition-all duration-300 ${
                        link.icon === '?' ? link.className : 'text-gold hover:text-white'
                      } ${hoveredLink && hoveredLink !== link.path ? 'opacity-16' : ''}`}
                    >
                      {link.icon}
                    </Link>
                  )}
                  {hoveredLink === link.path && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute left-1/2 transform -translate-x-1/2 mt-1 text-sm font-black ${
                        link.icon === '?' ? 'text-nft-glow' : 'text-gold'
                      } whitespace-nowrap`}
                    >
                      {link.name}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="sm:hidden text-gold hover:text-gold-light transition-colors duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sm:hidden fixed inset-0 z-40 pt-20 bg-rich-black/95 backdrop-blur-sm"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                link.path === '/' ? (
                  <Link
                    key={link.path}
                    to="/"
                    onClick={() => window.location.href = process.env.PUBLIC_URL + '/'}
                    className={`flex items-center px-3 py-2 text-base font-medium ${
                      link.icon === '?' ? link.className : 'text-gold hover:text-gold'
                    } transition-colors duration-300`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon}
                    <span className="ml-2">{link.name}</span>
                  </Link>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center px-3 py-2 text-base font-medium ${
                      link.icon === '?' ? link.className : 'text-gold hover:text-gold'
                    } transition-colors duration-300`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon}
                    <span className="ml-2">{link.name}</span>
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
