/**
 * Utility to pick the best texture format based on availability.
 * PERF-10: Texture Compression Strategy.
 */
export const getTextureAsset = (path) => {
  // In a real build pipeline, we would check for .webp, .ktx2, etc.
  // For now, we return the path as-is, but this centralizes all asset loading.
  return path;
};
