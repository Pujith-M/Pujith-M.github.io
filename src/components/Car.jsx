import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useScroll } from '@react-three/drei'
import * as THREE from 'three'

// Preload the model for faster initial render
useGLTF.preload('/models/mahindra_thar_optimized.glb')

// ---------- Material override map ----------
// Key = exact material name from Blender (case-sensitive)
// Value = THREE.MeshStandardMaterial params to apply
const MATERIAL_OVERRIDES = {
  // --- Body paint → deep glossy black ---
  'Car Paint - Red': {
    color: '#0d0d0d',
    roughness: 0.08,
    metalness: 0.95,
    envMapIntensity: 1.8,
  },

  // --- Plastics & trim (already dark, just ensure correct PBR) ---
  'Plastico Negro': { color: '#111111', roughness: 0.6, metalness: 0.0 },
  'Aluminio negro': { color: '#1a1a1a', roughness: 0.4, metalness: 0.8 },
  'Plastic - Black - Bumpy Small': { color: '#111111', roughness: 0.9, metalness: 0.0 },
  'Plastic - Black - Bumpy Small.001': { color: '#111111', roughness: 0.9, metalness: 0.0 },
  'Metal - Black - Rough 0.2': { color: '#1a1a1a', roughness: 0.2, metalness: 1.0 },

  // --- Rims / alloy wheels → dark gunmetal ---
  'Aluminio galvanizado': { color: '#1c1c1c', roughness: 0.15, metalness: 1.0 },
  '13484_Off_road_Tire_Disk': { color: '#1a1a1a', roughness: 0.2, metalness: 0.9 },
  'Metal - Chrome - Rough 0.2': { color: '#2a2a2e', roughness: 0.15, metalness: 1.0 },

  // --- Tires → pure black rubber ---
  'Tire': { color: '#080808', roughness: 0.95, metalness: 0.0 },

  // --- Leather interior → very dark charcoal ---
  'CUERO NEGRO': { color: '#1a1512', roughness: 0.8, metalness: 0.0 },

  // --- Windows / glass → deep tinted dark glass ---
  'Glass - Tinted': { color: '#060608', roughness: 0.0, metalness: 0.0, transparent: true, opacity: 0.75 },
  'Glass - Clear - Ridged - UV': { color: '#04060a', roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.6 },
  'Glass - Clear - Ridged - Trunk Light Lens': { color: '#d0d0d0', roughness: 0.05, metalness: 0.0, transparent: true, opacity: 0.5 },
  'Mirror': { color: '#aaaaaa', roughness: 0.0, metalness: 1.0 },

  // --- Lights → keep emissive but adjust color ---
  'Glass - Orange - Bump': { color: '#ff6600', roughness: 0.1, metalness: 0.0, emissive: '#ff4400', emissiveIntensity: 1.5, transparent: true, opacity: 0.9 },
  'Glass - Red - Bump': { color: '#ff0000', roughness: 0.1, metalness: 0.0, emissive: '#cc0000', emissiveIntensity: 2.0, transparent: true, opacity: 0.9 },
  'white Rear light glass': { color: '#ffffff', roughness: 0.05, metalness: 0.0, emissive: '#cccccc', emissiveIntensity: 0.5 },
  'white Rear light glass.001': { color: '#cc0000', roughness: 0.05, metalness: 0.0, emissive: '#990000', emissiveIntensity: 2.5 },
  'emission': { color: '#ffffff', roughness: 0.0, metalness: 0.0, emissive: '#ffffff', emissiveIntensity: 4.0 },

  // --- Misc white/chrome body trim → dark chrome ---
  'GLOSYY': { color: '#0a0a0a', roughness: 0.05, metalness: 1.0 },
  'Material': { color: '#1a1a1a', roughness: 0.5, metalness: 0.5 },
  'Material.001': { color: '#0d0d0d', roughness: 0.1, metalness: 0.9 },
  'Material.002': { color: '#1a1a1a', roughness: 0.6, metalness: 0.1 },
  'Material.003': { color: '#2a2a2a', roughness: 0.4, metalness: 0.6 },
}

export function Car({ trackLength = 400, ...props }) {
  const groupRef = useRef()
  const scroll = useScroll()

  const wheelFLRef = useRef()
  const wheelFRRef = useRef()
  const wheelBLRef = useRef()
  const wheelBRRef = useRef()

  const { scene, nodes } = useGLTF('/models/mahindra_thar_optimized.glb')

  // Apply material overrides & assign wheel refs once
  useEffect(() => {
    if (!scene) return

    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const applyOverride = (mat) => {
          const overrides = MATERIAL_OVERRIDES[mat.name]
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
      groupRef.current.position.y = Math.sin(t * 500) * 0.02

      const wheelSpin = t * trackLength * 0.65
      if (wheelFLRef.current) wheelFLRef.current.rotation.x = wheelSpin
      if (wheelFRRef.current) wheelFRRef.current.rotation.x = wheelSpin
      if (wheelBLRef.current) wheelBLRef.current.rotation.x = wheelSpin
      if (wheelBRRef.current) wheelBRRef.current.rotation.x = wheelSpin
    }
  })

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
        scale={[0.6, 0.6, 0.6]}
        rotation={[0, Math.PI, 0]}
        castShadow
        receiveShadow
      />
    </group>
  )
}
