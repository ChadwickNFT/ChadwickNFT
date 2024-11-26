import React from 'react';
import { motion } from 'framer-motion';
import ImageCarousel from './ImageCarousel';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isPulsing, setIsPulsing] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleCarouselChange = () => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 300); // Reduced from 400ms to 300ms
  };

  return (
    <div className="min-h-screen bg-rich-black">
      {/* Hero Section */}
      <motion.div 
        className="relative h-screen pt-16 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Main content container */}
        <div className="h-full flex flex-col items-center justify-center relative">
          {/* CHADWICK text positioned higher */}
          <motion.div
            className="absolute sm:top-[40%] top-[25%] -translate-y-1/2 z-0 flex items-center justify-center w-full px-4 sm:px-0"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div className="relative transform sm:translate-x-0 -translate-x-[0.6rem]">
              <h1 className={`text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-display font-bold text-gold ${isPulsing ? 'animate-pulse-quick' : ''}`}>
                CHADWICK
              </h1>
              <span 
                className={`absolute text-sm xs:text-base sm:text-xl font-black text-nft-glow-fast ${isPulsing ? 'animate-pulse-quick' : ''}`}
                style={{
                  left: '100%',
                  bottom: '0.1em',
                  marginLeft: '0.25rem',
                  whiteSpace: 'nowrap'
                }}
              >
                NFT
              </span>
            </div>
          </motion.div>

          {/* Carousel in exact same center position */}
          <motion.div
            className="absolute sm:top-1/2 top-[35%] -translate-y-1/2 w-full flex items-center justify-center z-10 px-4 sm:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <ImageCarousel 
              onSlideChange={handleCarouselChange} 
              onModalStateChange={setIsModalOpen}
            />
          </motion.div>

          {/* Button below */}
          <motion.div
            className={`absolute transition-all duration-500 ease-in-out flex flex-col items-center z-10 ${
              isModalOpen ? 'bottom-8 opacity-75' : 'bottom-[15%] opacity-100'
            }`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: isModalOpen ? 0.77 : 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            <Link
              to="/gallery"
              className="inline-block px-6 py-2 scale-[0.74] bg-gold text-rich-black font-semibold rounded-lg hover:bg-gold-light transition-colors duration-300"
            >
              View Portfolio
            </Link>

            {/* Scroll Indicator */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{
                opacity: { delay: 1.2, duration: 0.3 },
                y: { delay: 1.2, duration: 2, repeat: Infinity }
              }}
            >
              <svg
                className="w-6 h-6 text-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Featured Work Section */}
      <section className="py-16 sm:py-24 bg-dark-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gold mb-4">
              FEATURED WORK
            </h2>
            <div className="h-0.5 w-12 bg-gold mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <motion.div
                key={num}
                className="relative aspect-[4/5] w-[120px] sm:w-[150px] group overflow-hidden rounded-lg mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: num * 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/bw/thumbnails/chadwicknft_photography-${num}.jpg`}
                  alt={`Featured work ${num}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rich-black/80 via-rich-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-gold font-display font-bold text-xl mb-2">Series {num}</h3>
                    <p className="text-white/90 font-light">View Collection</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
