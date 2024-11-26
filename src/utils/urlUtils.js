export const getBaseUrl = () => {
  // Local development
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return '/';
  }

  // GitHub Pages
  if (window.location.hostname === 'chadwicknft.github.io') {
    return '/ChadwickNFT/';
  }

  // IPFS or other deployments
  return '/';
};
