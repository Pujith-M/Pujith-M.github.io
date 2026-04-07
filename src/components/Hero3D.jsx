import { Text, Float } from '@react-three/drei'
import { COLORS } from '../config/colors'

export function Hero3D({ isMobile = false }) {
  return (
    <group position={[0, 0, 0]}>
      {/* Profile card pulled further right/back to keep the center lane text-safe */}
      <group
        position={isMobile ? [3.45, 2.15, -15.25] : [5.85, 2.45, -16.5]}
        rotation={[0, -0.38, 0]}
      >
        {/* Glass Backing with high segments to prevent diagonal rendering artifact */}
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[5, 6, 32, 32]} />
          <meshStandardMaterial color={COLORS.SLATE_900} transparent opacity={0.8} roughness={0.1} metalness={0.2} />
        </mesh>
        
        {/* Solid Emissive Strips instead of wireframe */}
        <mesh position={[0, 2.95, -0.05]}>
          <planeGeometry args={[5, 0.05]} />
          <meshStandardMaterial color={COLORS.VIVID_CYAN} emissive={COLORS.VIVID_CYAN} emissiveIntensity={4} />
        </mesh>
        <mesh position={[0, -2.95, -0.05]}>
          <planeGeometry args={[5, 0.05]} />
          <meshStandardMaterial color={COLORS.VIVID_CYAN} emissive={COLORS.VIVID_CYAN} emissiveIntensity={4} />
        </mesh>

        <Text position={[0, 1.5, 0.1]} fontSize={0.65} color="white" anchorX="center" fontWeight={800}>
          Pujith M
        </Text>
        <Text position={[0, 0.8, 0.1]} fontSize={0.3} color={COLORS.SLATE_400} anchorX="center">
          Bengaluru | Web3 Enthusiast
        </Text>
      </group>

      {/* Wayfinding signpost near start so journey direction is explicit */}
      <Float speed={1.15} rotationIntensity={0.1} floatIntensity={0.14}>
        <group position={isMobile ? [0, 3.25, -27] : [0, 3.55, -30]}>
          {/* Glass Signpost Backing */}
          <mesh position={[0, 0, -0.07]}>
            <planeGeometry args={[6.6, 2.2, 32, 32]} />
            <meshStandardMaterial color={COLORS.SLATE_950} transparent opacity={0.75} roughness={0.1} />
          </mesh>
          
          {/* Accent Border Strip */}
          <mesh position={[0, 1.1, -0.02]}>
            <planeGeometry args={[6.6, 0.04]} />
            <meshStandardMaterial color={COLORS.CYBER_LIME} emissive={COLORS.CYBER_LIME} emissiveIntensity={4} />
          </mesh>

          <Text fontSize={0.42} color={COLORS.LIME_GLOW} anchorX="center">
            EXPERIENCE AHEAD • 50m
          </Text>
          <Text position={[0, -0.58, 0.1]} fontSize={0.26} color={COLORS.SLATE_400} anchorX="center" maxWidth={6.2} textAlign="center">
            Keep driving to enter timeline
          </Text>
        </group>
      </Float>
    </group>
  )
}
