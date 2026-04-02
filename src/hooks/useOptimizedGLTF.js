import { useGLTF } from '@react-three/drei'

// Standard Google Draco CDN path
const DRACO_URL = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'

/**
 * Custom hook to load GLTF models with Draco decompression.
 * PERF-11: Asset Pipeline Optimization.
 */
export function useOptimizedGLTF(url) {
  return useGLTF(url, DRACO_URL)
}

/**
 * Preload helper to ensure assets start loading before mounting.
 */
useOptimizedGLTF.preload = (url) => useGLTF.preload(url, DRACO_URL)
