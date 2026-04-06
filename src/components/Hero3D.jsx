import { Text, Float } from '@react-three/drei'

export function Hero3D({ isMobile = false }) {
  return (
    <group position={[0, 0, 0]}>
      {/* Profile card pulled further right/back to keep the center lane text-safe */}
      <group
        position={isMobile ? [3.45, 2.15, -15.25] : [5.85, 2.45, -16.5]}
        rotation={[0, -0.38, 0]}
      >
        {/* Glass Backing */}
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[5, 6]} />
          <meshStandardMaterial color="#0f172a" transparent opacity={0.8} roughness={0.2} />
        </mesh>
        {/* Neon Border */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[5.2, 6.2]} />
          <meshBasicMaterial color="#3b82f6" wireframe />
        </mesh>

        <Text position={[0, 1.5, 0]} fontSize={0.6} color="white" anchorX="center">
          Pujith M
        </Text>
        <Text position={[0, 0.8, 0]} fontSize={0.3} color="#94a3b8" anchorX="center">
          Bengaluru | Web3 Enthusiast
        </Text>
      </group>

      {/* Wayfinding signpost near start so journey direction is explicit */}
      <Float speed={1.15} rotationIntensity={0.1} floatIntensity={0.14}>
        <group position={isMobile ? [0, 3.25, -27] : [0, 3.55, -30]}>
          <mesh position={[0, 0, -0.07]}>
            <planeGeometry args={[6.6, 2.2]} />
            <meshStandardMaterial color="#020617" transparent opacity={0.75} />
          </mesh>
          <mesh position={[0, 0, -0.02]}>
            <planeGeometry args={[6.9, 2.45]} />
            <meshBasicMaterial color="#14b8a6" wireframe />
          </mesh>
          <Text fontSize={0.42} color="#2dd4bf" anchorX="center" outlineWidth={0.018} outlineColor="#020617">
            EXPERIENCE AHEAD • 50m
          </Text>
          <Text position={[0, -0.58, 0]} fontSize={0.26} color="#bae6fd" anchorX="center" maxWidth={6.2} textAlign="center">
            Keep driving to enter timeline
          </Text>
        </group>
      </Float>
    </group>
  )
}
