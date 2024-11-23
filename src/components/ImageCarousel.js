import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ImageCarousel = ({ onSlideChange }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  // Initialize images
  useEffect(() => {
    const bwImages = Array.from({ length: 17 }, (_, i) => ({
      src: `/images/bw/thumbnails/chadwicknft_photography-${i + 1}.jpg`,
      route: '/bw'
    }));

    setImages(bwImages);
  }, []);

  useEffect(() => {
    if (!isPaused && images.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % images.length;
          onSlideChange?.(); // Call the callback when slide changes
          return newIndex;
        });
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isPaused, images.length, onSlideChange]);

  const getVisibleImages = () => {
    if (images.length === 0) return [];
    const visibleImages = [];
    
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + images.length) % images.length;
      visibleImages.push({
        src: images[index].src,
        route: images[index].route,
        index,
        position: i
      });
    }
    return visibleImages;
  };

  const getImageStyles = (position) => {
    // Calculate x position for sliding effect
    const getXPosition = (pos) => {
      switch (pos) {
        case -2: return window.innerWidth <= 640 ? '8%' : '18%';     // Leftmost
        case -1: return window.innerWidth <= 640 ? '25%' : '32%';    // Left
        case 0: return '50%';                                        // Center
        case 1: return window.innerWidth <= 640 ? '75%' : '68%';     // Right
        case 2: return window.innerWidth <= 640 ? '92%' : '82%';     // Rightmost
        case 3: return '110%';                                       // Off-screen right
        default: return '50%';
      }
    };

    const baseStyles = {
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      left: getXPosition(position),
      width: window.innerWidth <= 640 
        ? (position === 0 ? '30%' : '20%')  // Mobile sizes
        : (position === 0 ? '20%' : '15%'), // Desktop sizes
      opacity: position === 0 ? 1 : position === -2 || position === 2 ? 0.25 : 0.67,
      zIndex: position === 0 ? 3 : 1,
      aspectRatio: position === 0 ? '16/9' : '3/2',
    };

    return baseStyles;
  };

  const handleImageClick = (route) => {
    navigate(route);
  };

  return (
    <div className="relative w-full h-[40vh] sm:h-[500px] overflow-hidden bg-transparent">
      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout">
          {getVisibleImages().map(({ src, route, index, position }) => (
            <motion.div
              key={`${index}-${position}`}
              initial={{ 
                ...getImageStyles(position === 2 ? 3 : position + 1),
                opacity: position === 2 ? 0 : 0
              }}
              animate={{
                ...getImageStyles(position),
                opacity: position === 0 ? 1 : position === -2 || position === 2 ? 0.25 : 0.67,
              }}
              exit={{ 
                ...getImageStyles(position - 1),
                opacity: 0
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1] // Custom easing for smoother slide
              }}
              className="cursor-pointer rounded-lg overflow-hidden border border-gold/30 hover:border-gold/60"
              onClick={() => handleImageClick(route)}
              onHoverStart={() => setIsPaused(true)}
              onHoverEnd={() => setIsPaused(false)}
            >
              <motion.div
                className="w-full h-full bg-rich-black"
                initial={{ backgroundColor: '#000' }}
                animate={{ 
                  backgroundColor: position === 0 ? 'transparent' : '#000',
                  transition: { duration: 0.3 }
                }}
              >
                <img
                  src={src}
                  alt={`Gallery item ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImageCarousel;
