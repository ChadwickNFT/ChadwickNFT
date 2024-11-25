import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ImageCarousel = ({ onSlideChange }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  // Initialize images
  useEffect(() => {
    const bwImages = Array.from({ length: 17 }, (_, i) => {
      const src = `${process.env.PUBLIC_URL}/images/bw/thumbnails/chadwicknft_photography-${i + 1}.jpg`;
      const fullSizeSrc = `${process.env.PUBLIC_URL}/images/bw/full/chadwicknft_photography-${i + 1}.jpg`;
      const image = new Image();
      image.src = src;
      if (image.complete) {
        return {
          id: i + 1,
          src,
          fullSizeSrc,
          route: '/bw',
          title: `Black & White ${i + 1}`
        };
      }
      image.onload = () => {
        setImages((prevImages) => [...prevImages, { 
          id: i + 1,
          src,
          fullSizeSrc,
          route: '/bw',
          title: `Black & White ${i + 1}`
        }]);
      };
      image.onerror = () => {
        console.error(`Error loading image: ${src}`);
      };
      return null;
    });

    const loadedImages = bwImages.filter((image) => image);
    setImages(loadedImages);
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
        ...images[index],
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

  return (
    <>
      <div className="relative w-full h-[40vh] sm:h-[500px] overflow-hidden bg-transparent">
        <div className="absolute inset-0">
          <AnimatePresence mode="popLayout">
            {getVisibleImages().map((image) => (
              <motion.div
                key={`${image.index}-${image.position}`}
                initial={{ 
                  ...getImageStyles(image.position === 2 ? 3 : image.position + 1),
                  opacity: image.position === 2 ? 0 : 0
                }}
                animate={{
                  ...getImageStyles(image.position),
                  opacity: image.position === 0 ? 1 : image.position === -2 || image.position === 2 ? 0.25 : 0.67,
                }}
                exit={{ 
                  ...getImageStyles(image.position - 1),
                  opacity: 0
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0.0, 0.2, 1] // Custom easing for smoother slide
                }}
                className="cursor-pointer rounded-lg overflow-hidden border border-gold/30 hover:border-gold/60"
                onClick={() => setSelectedImage(image)}
                onHoverStart={() => setIsPaused(true)}
                onHoverEnd={() => setIsPaused(false)}
              >
                <motion.div
                  className="w-full h-full bg-rich-black"
                  initial={{ backgroundColor: '#000' }}
                  animate={{ 
                    backgroundColor: image.position === 0 ? 'transparent' : '#000',
                    transition: { duration: 0.3 }
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-rich-black bg-opacity-95 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl max-h-[90vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.fullSizeSrc}
                alt={selectedImage.title}
                className="w-full h-full object-contain border-2 border-gold/40 hover:border-gold/80 transition-colors duration-300"
              />
              <button
                className="absolute top-4 right-4 text-gold hover:text-gold-light"
                onClick={() => setSelectedImage(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageCarousel;
