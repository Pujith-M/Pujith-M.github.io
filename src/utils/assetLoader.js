/**
 * Utility to pick the best texture format based on availability.
 * PERF-10: Texture Compression Strategy.
 */

// Simple sync check for WebP support (modern browsers)
const supportsWebP = () => {
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
};

export const getTextureAsset = (path) => {
  if (supportsWebP()) {
    // If we had a build-time conversion to .webp, we would swap the extension here
    // return path.replace(/\.(png|jpg|jpeg)$/, '.webp');
  }
  return path;
};
