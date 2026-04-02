import { Text } from '@react-three/drei'
import React, { useEffect } from 'react'

export const HighwaySign = React.memo(({ position, title, subtext, color = "#3b82f6" }) => {
  // Explicit cleanup on unmount
  useEffect(() => {
    return () => {
      // Logic for explicit disposal can go here if we were using raw THREE objects
      // R3F handles JSX-based disposal by default.
    }
  }, [])
  return (
    <group position={position}>
      {/* Pillars with metallic finish */}
      <mesh position={[-6.2, 4, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[6.2, 4, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Crossbeam */}
      <mesh position={[0, 8, 0]}>
        <boxGeometry args={[12.8, 0.3, 0.3]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Sign Board with Neon Glow */}
      <mesh position={[0, 6.5, 0]}>
        <boxGeometry args={[10.5, 2.8, 0.2]} />
        <meshStandardMaterial color="#020617" />
      </mesh>
      {/* Neon Frame */}
      <mesh position={[0, 6.5, 0.11]}>
        <boxGeometry args={[10.2, 2.5, 0.05]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} wireframe />
      </mesh>

      <Text position={[0, 7.1, 0.2]} fontSize={0.7} color="white" anchorX="center" anchorY="middle">
        {title}
      </Text>
      <Text position={[0, 6.1, 0.2]} fontSize={0.35} color="#94a3b8" anchorX="center" anchorY="middle">
        {subtext}
      </Text>
    </group>
  )
})
