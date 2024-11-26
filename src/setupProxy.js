const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const path = require('path');

module.exports = function(app) {
  // Serve static files from the public directory
  app.use(express.static(path.join(__dirname, '../public')));

  // Handle all other routes through React
  app.use((req, res, next) => {
    if (req.path.endsWith('.html')) {
      // Serve HTML files directly from public
      express.static(path.join(__dirname, '../public'))(req, res, next);
    } else {
      next();
    }
  });
};
