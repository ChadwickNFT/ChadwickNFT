import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/glow.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Gallery from './components/Gallery';
import BWGallery from './components/BWGallery';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-rich-black text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/bw-gallery" element={<BWGallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
