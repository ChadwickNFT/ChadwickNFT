import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { motion, AnimatePresence } from 'framer-motion';

function Gallery() {
  const categories = ['All', 'B&W'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [selectedImage]);

  // B&W photography collection
  const images = Array.from({ length: 17 }, (_, i) => ({
    id: i + 1,
    src: {
      thumbnail: `${process.env.PUBLIC_URL}/images/bw/thumbnails/chadwicknft_photography-${i + 1}.jpg`,
      medium: `${process.env.PUBLIC_URL}/images/bw/medium/chadwicknft_photography-${i + 1}.jpg`,
      large: `${process.env.PUBLIC_URL}/images/bw/large/chadwicknft_photography-${i + 1}.jpg`,
    },
    category: 'B&W',
    title: `Black & White ${i + 1}`,
  }));

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <div className="min-h-screen bg-rich-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Category Filter */}
        <div className="overflow-x-auto -mx-4 px-4 sm:px-0 mb-12">
          <div className="flex flex-nowrap sm:flex-wrap sm:justify-center gap-4 min-w-max sm:min-w-0">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 font-display text-sm ${
                  activeCategory === category
                    ? 'bg-gold text-rich-black'
                    : 'bg-transparent text-white/80 border border-gold/30 hover:border-gold/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex -ml-4 w-auto"
          columnClassName="pl-4 bg-clip-padding"
        >
          {filteredImages.map(image => (
            <motion.div
              key={image.id}
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative group overflow-hidden rounded-lg touch-manipulation">
                <img
                  src={image.src.thumbnail}
                  srcSet={`${image.src.thumbnail} 400w, ${image.src.medium} 800w`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 border border-gold/30 group-hover:border-2 group-hover:border-gold/80"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </Masonry>

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
                  src={selectedImage.src.large}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain border-2 border-gold/40 hover:border-gold/80 transition-colors duration-300"
                />
                <button
                  className="absolute top-4 right-4 text-gold hover:text-gold-light"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                  }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Gallery;
