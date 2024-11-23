import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';

function Gallery() {
  const categories = ['All', 'B&W'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  // B&W photography collection
  const images = Array.from({ length: 17 }, (_, i) => ({
    id: i + 1,
    src: `/images/bw/thumbnails/chadwicknft_photography-${i + 1}.jpg`,
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
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 border border-gold/30 group-hover:border-2 group-hover:border-gold/80"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </Masonry>

        {/* Fullscreen Image Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-full max-w-6xl mx-auto">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-contain border-2 border-gold/40 hover:border-gold/80 transition-colors duration-300"
              />
              <button
                className="absolute top-4 right-4 text-white/80 hover:text-white"
                onClick={() => setSelectedImage(null)}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Gallery;
