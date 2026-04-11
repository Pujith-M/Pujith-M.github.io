import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useScroll } from '@react-three/drei'
import { CAR_CONFIG } from '../config/car'

// Preload the model for faster initial render
useGLTF.preload(CAR_CONFIG.MODEL_PATH)

export function Car({ trackLength = 1200, ...props }) {
  const groupRef = useRef()
  const scroll = useScroll()

  const wheelFLRef = useRef()
  const wheelFRRef = useRef()
  const wheelBLRef = useRef()
  const wheelBRRef = useRef()

  const { scene, nodes } = useGLTF(CAR_CONFIG.MODEL_PATH)

  // Apply material overrides & assign wheel refs once
  useEffect(() => {
    if (!scene) return

    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const applyOverride = (mat) => {
          const overrides = CAR_CONFIG.MATERIAL_OVERRIDES[mat.name]
          if (!overrides) return

          mat.color?.set(overrides.color ?? '#111111')
          if (overrides.roughness !== undefined) mat.roughness = overrides.roughness
          if (overrides.metalness !== undefined) mat.metalness = overrides.metalness
          if (overrides.envMapIntensity !== undefined) mat.envMapIntensity = overrides.envMapIntensity
          if (overrides.emissive) mat.emissive?.set(overrides.emissive)
          if (overrides.emissiveIntensity !== undefined) mat.emissiveIntensity = overrides.emissiveIntensity
          if (overrides.transparent !== undefined) mat.transparent = overrides.transparent
          if (overrides.opacity !== undefined) mat.opacity = overrides.opacity
          mat.needsUpdate = true
        }

        if (Array.isArray(child.material)) {
          child.material.forEach(applyOverride)
        } else {
          applyOverride(child.material)
        }

        child.castShadow = true
        child.receiveShadow = true
      }
    })

    // Assign wheel refs by exact node name
    if (nodes) {
      if (nodes['Wheel_FL']) wheelFLRef.current = nodes['Wheel_FL']
      if (nodes['Wheel_FR']) wheelFRRef.current = nodes['Wheel_FR']
      if (nodes['Wheel_BL']) wheelBLRef.current = nodes['Wheel_BL']
      if (nodes['Wheel_BR']) wheelBRRef.current = nodes['Wheel_BR']
    }
  }, [scene, nodes])

  useFrame(() => {
    if (groupRef.current && scroll) {
      const t = scroll.offset
      groupRef.current.position.z = -t * trackLength
      
      // Chassis cinematic bounce
      groupRef.current.position.y = Math.sin(t * CAR_CONFIG.VISUALS.PITCH_FACTOR) * CAR_CONFIG.VISUALS.BOUNCE_AMPLITUDE

      // Wheel spin based on velocity
      const wheelSpin = t * trackLength * CAR_CONFIG.VISUALS.SPIN_FACTOR
      if (wheelFLRef.current) wheelFLRef.current.rotation.x = wheelSpin
      if (wheelFRRef.current) wheelFRRef.current.rotation.x = wheelSpin
      if (wheelBLRef.current) wheelBLRef.current.rotation.x = wheelSpin
      if (wheelBRRef.current) wheelBRRef.current.rotation.x = wheelSpin
    }
  })

  // Cleanup geometries and materials on unmount
  useEffect(() => {
    return () => {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.geometry?.dispose()
          if (Array.isArray(child.material)) {
            child.material.forEach(m => m.dispose())
          } else {
            child.material?.dispose()
          }
        }
      })
    }
  }, [scene])

  return (
    <group ref={groupRef} {...props}>
      <primitive
        object={scene}
        scale={CAR_CONFIG.VISUALS.SCALE}
        rotation={CAR_CONFIG.VISUALS.ROTATION}
        castShadow
        receiveShadow
      />
    </group>
  )
}
