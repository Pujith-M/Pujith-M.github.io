import { useThree } from '@react-three/fiber'
import { LAYOUT } from '../config/layout'

/**
 * Returns lane configuration adjusted for the current screen aspect ratio.
 */
export function useLanes() {
  const { viewport } = useThree()
  const aspect = viewport.aspect
  return LAYOUT.getLanes(aspect)
}
