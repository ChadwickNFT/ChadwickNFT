import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BWGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Organized photos with portraits first
  const photos = [
    // Portraits and close-ups
    {
      id: 13,
      title: 'Portrait 1',
      src: {
        thumbnail: '/images/bw/thumbnails/chadwicknft_photography-13.jpg',
        medium: '/images/bw/medium/chadwicknft_photography-13.jpg',
        large: '/images/bw/large/chadwicknft_photography-13.jpg',
      }
    },
    {
      id: 12,
      title: 'Portrait 2',
      src: {
        thumbnail: '/images/bw/thumbnails/chadwicknft_photography-12.jpg',
        medium: '/images/bw/medium/chadwicknft_photography-12.jpg',
        large: '/images/bw/large/chadwicknft_photography-12.jpg',
      }
    },
    {
      id: 8,
      title: 'Portrait 3',
      src: {
        thumbnail: '/images/bw/thumbnails/chadwicknft_photography-8.jpg',
        medium: '/images/bw/medium/chadwicknft_photography-8.jpg',
        large: '/images/bw/large/chadwicknft_photography-8.jpg',
      }
    },
    {
      id: 7,
      title: 'Portrait 4',
      src: {
        thumbnail: '/images/bw/thumbnails/chadwicknft_photography-7.jpg',
        medium: '/images/bw/medium/chadwicknft_photography-7.jpg',
        large: '/images/bw/large/chadwicknft_photography-7.jpg',
      }
    },
    // Other photos
    {
      id: 1,
      title: 'Photography 1',
      src: {
        thumbnail: '/images/bw/thumbnails/chadwicknft_photography-1.jpg',
        medium: '/images/bw/medium/chadwicknft_photography-1.jpg',
        large: '/images/bw/large/chadwicknft_photography-1.jpg',
      }
    },
    {
      id: 2,
      title: 'Photography 2',
      src: {
        thumbnail: '/images/bw/thumbnails/chadwicknft_photography-2.jpg',
        medium: '/images/bw/medium/chadwicknft_photography-2.jpg',
        large: '/images/bw/large/chadwicknft_photography-2.jpg',
      }
    },
    {
      id: 3,
      title: 'Photography 3',
      src: {
        thumbnail: '/images/bw/thumbnails/chadwicknft_photography-3.jpg',
        medium: '/images/bw/medium/chadwicknft_photography-3.jpg',
        large: '/images/bw/large/chadwicknft_photography-3.jpg',
      }
    },
    {
      id: 4,
      title: 'Photography 4',
      src: {
        thumbnail: '/images/bw/thumbnails/chadwicknft_photography-4.jpg',
        medium: '/images/bw/medium/chadwicknft_photography-4.jpg',
        large: '/images/bw/large/chadwicknft_photography-4.jpg',
      }
    },
    {
      id: 5,
      title: 'Photography 5',
      src: {
        thumbnail: '/images/bw/thumbnails/chadwicknft_photography-5.jpg',
        medium: '/images/bw/medium/chadwicknft_photography-5.jpg',
        large: '/images/bw/large/chadwicknft_photography-5.jpg',
      }
    },
    {
      id: 6,
      title: 'Photography 6',
      src: {
        thumbnail: '/images/bw/thumbnails/chadwicknft_photography-6.jpg',
        medium: '/images/bw/medium/chadwicknft_photography-6.jpg',
        large: '/images/bw/large/chadwicknft_photography-6.jpg',
      }
    },
    {
      id: 9,
      title: 'Photography 9',
      src: {
        thumbnail: '/images/bw/thumbnails/chadwicknft_photography-9.jpg',
        medium: '/images/bw/medium/chadwicknft_photography-9.jpg',
        large: '/images/bw/large/chadwicknft_photography-9.jpg',
      }
    },
    {
      id: 10,
      title: 'Photography 10',
      src: {
        thumbnail: '/images/bw/thumbnails/chadwicknft_photography-10.jpg',
        medium: '/images/bw/medium/chadwicknft_photography-10.jpg',
        large: '/images/bw/large/chadwicknft_photography-10.jpg',
      }
    },
    {
      id: 11,
      title: 'Photography 11',
      src: {
        thumbnail: '/images/bw/thumbnails/chadwicknft_photography-11.jpg',
        medium: '/images/bw/medium/chadwicknft_photography-11.jpg',
        large: '/images/bw/large/chadwicknft_photography-11.jpg',
      }
    },
    {
      id: 14,
      title: 'Photography 14',
      src: {
        thumbnail: '/images/bw/thumbnails/chadwicknft_photography-14.jpg',
        medium: '/images/bw/medium/chadwicknft_photography-14.jpg',
        large: '/images/bw/large/chadwicknft_photography-14.jpg',
      }
    },
    {
      id: 15,
      title: 'Photography 15',
      src: {
        thumbnail: '/images/bw/thumbnails/chadwicknft_photography-15.jpg',
        medium: '/images/bw/medium/chadwicknft_photography-15.jpg',
        large: '/images/bw/large/chadwicknft_photography-15.jpg',
      }
    },
    {
      id: 16,
      title: 'Photography 16',
      src: {
        thumbnail: '/images/bw/thumbnails/chadwicknft_photography-16.jpg',
        medium: '/images/bw/medium/chadwicknft_photography-16.jpg',
        large: '/images/bw/large/chadwicknft_photography-16.jpg',
      }
    },
    {
      id: 17,
      title: 'Photography 17',
      src: {
        thumbnail: '/images/bw/thumbnails/chadwicknft_photography-17.jpg',
        medium: '/images/bw/medium/chadwicknft_photography-17.jpg',
        large: '/images/bw/large/chadwicknft_photography-17.jpg',
      }
    }
  ];

  return (
    <div className="min-h-screen bg-rich-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2 
          className="text-4xl sm:text-5xl font-display font-bold text-gold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          B&W
        </motion.h2>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              className="group relative aspect-square overflow-hidden bg-dark-gray cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(photo)}
            >
              <img
                src={photo.src.thumbnail}
                srcSet={`${photo.src.thumbnail} 400w, ${photo.src.medium} 800w`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 border border-gold/30 group-hover:border-2 group-hover:border-gold/80"
                loading="lazy"
              />
              {/* Desktop-only pulse effect */}
              <div className="hidden sm:block absolute inset-0 bg-gold bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 animate-pulse-subtle" />
              </div>
            </motion.div>
          ))}
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
                  src={selectedImage.src.large}
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
      </div>
    </div>
  );
};

export default BWGallery;
