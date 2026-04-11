import { useEffect, useRef } from 'react'
import { animated } from '@react-spring/three'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useVehicleSpawn } from '../hooks/useVehicleSpawn'
import { COLORS } from '../config/colors'

export function VehicleSpawner({ children, onSpawnComplete, setGlobalControlsEnabled }) {
  const { springs, isImpacted, controlsEnabled } = useVehicleSpawn(() => {
    if (onSpawnComplete) onSpawnComplete()
    if (setGlobalControlsEnabled) setGlobalControlsEnabled(true)
  })

  // Visual Shockwave refs
  const shockwaveRef = useRef(null)
  const materialRef = useRef(null)
  const isAnimating = useRef(false)

  // Neon Flash Shockwave Animation & Camera Tracking
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05) // Clamp delta prevents giant jumps

    // Keep camera looking at the falling car to ensure it's visible on screen
    if (!controlsEnabled && springs.position) {
      try {
        const pos = springs.position.get()
        const posY = Array.isArray(pos) ? pos[1] : (pos?.y || 0)
        state.camera.lookAt(0, Math.max(posY, 1.2), 0)
      } catch (e) {
        // Fallback if get() fails
        state.camera.lookAt(0, 1.2, 0)
      }
    }

    if (isAnimating.current) {
      state.invalidate() // Force keep-alive during the splash even if Canvas switches to demand mode
      if (shockwaveRef.current && materialRef.current) {
        const mesh = shockwaveRef.current
        const mat = materialRef.current

        if (mat.opacity > 0) {
          mesh.scale.x += dt * 45 // faster explosion
          mesh.scale.y += dt * 45
          mat.opacity -= dt * 2.5
        } else {
          isAnimating.current = false
          mesh.visible = false
        }
      }
    }
  })

  useEffect(() => {
      if (isImpacted && shockwaveRef.current && materialRef.current) {
          isAnimating.current = true
          shockwaveRef.current.visible = true
          shockwaveRef.current.scale.set(1, 1, 1)
          materialRef.current.opacity = 1
      }
  }, [isImpacted])

  return (
    <group>
      <animated.group position={springs.position} rotation={springs.rotation} scale={springs.scale}>
        {children}
      </animated.group>
      
      {/* Impact Shockwave on the ground */}
      <mesh ref={shockwaveRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} visible={false}>
        <ringGeometry args={[2, 2.8, 32]} />
        <meshBasicMaterial 
          ref={materialRef} 
          color={COLORS.VIVID_CYAN || '#00ffff'} 
          transparent 
          opacity={1} 
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
