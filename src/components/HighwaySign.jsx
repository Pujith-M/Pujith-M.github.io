import { Text } from '@react-three/drei'
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { COLORS } from '../config/colors'
import { SmartBillboard } from './SmartBillboard'

export const HighwaySign = React.memo(({ position, title, subtext, color = COLORS.VIVID_CYAN }) => {
  const glowRef = useRef()
  
  // Subtle Neon Flicker
  useFrame((state) => {
    if (glowRef.current) {
      const time = state.clock.getElapsedTime()
      const flicker = Math.random() > 0.98 ? (0.7 + Math.random() * 0.3) : (0.95 + Math.sin(time * 10) * 0.05);
      glowRef.current.emissiveIntensity = 4 * flicker;
    }
  })

  return (
    <SmartBillboard position={position}>
      {/* Pillars with metallic finish */}
      <mesh position={[-6.2, 4, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 8]} />
        <meshStandardMaterial color={COLORS.SLATE_700} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[6.2, 4, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 8]} />
        <meshStandardMaterial color={COLORS.SLATE_700} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Crossbeam */}
      <mesh position={[0, 8, 0]}>
        <boxGeometry args={[12.8, 0.15, 0.15]} />
        <meshStandardMaterial color={COLORS.SLATE_700} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Sign Board with Glassmorphism */}
      <mesh position={[0, 6.5, 0]}>
        <boxGeometry args={[10.5, 2.8, 0.05]} />
        <meshStandardMaterial 
          color={COLORS.SLATE_950} 
          transparent 
          opacity={0.85} 
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>
      
      {/* Solid Neon Frame (Inner Glow Background) */}
      <mesh position={[0, 6.5, 0.03]}>
        <boxGeometry args={[10.2, 2.5, 0.01]} />
        <meshStandardMaterial 
          ref={glowRef} 
          color={color} 
          emissive={color} 
          emissiveIntensity={4} 
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Neon Top/Bottom Strips for better definition replacing wireframe */}
      <mesh position={[0, 7.8, 0.05]}>
        <boxGeometry args={[10.5, 0.05, 0.05]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={6} />
      </mesh>
      <mesh position={[0, 5.2, 0.05]}>
        <boxGeometry args={[10.5, 0.05, 0.05]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={6} />
      </mesh>

      <Text 
        position={[0, 7.0, 0.1]} 
        fontSize={0.65} 
        color="white" 
        anchorX="center" 
        anchorY="middle"
        fontWeight={700}
      >
        {title}
      </Text>
      <Text 
        position={[0, 6.0, 0.1]} 
        fontSize={0.32} 
        color={COLORS.SLATE_400} 
        anchorX="center" 
        anchorY="middle"
      >
        {subtext}
      </Text>
    </SmartBillboard>
  )
})

