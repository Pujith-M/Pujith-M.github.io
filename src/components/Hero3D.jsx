import { Text, Float, Image } from '@react-three/drei'

export function Hero3D() {
  return (
    <group position={[0, 0, 0]}>
      {/* 3D Intro Text - Centered & Floating */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group position={[0, 4, -8]}>
          <Text 
            fontSize={2} 
            color="white" 
            anchorX="center" 
            outlineWidth={0.04}
            outlineColor="#020617"
          >
            PUJITH M
          </Text>
          <Text 
            position={[0, -1, 0]}
            fontSize={0.6} 
            color="#3b82f6" 
            anchorX="center" 
            outlineWidth={0.02}
            outlineColor="#020617"
          >
            SENIOR SOFTWARE ENGINEER | BLOCKCHAIN EXPERT
          </Text>
        </group>
      </Float>

      {/* 3D Profile Card instead of HTML */}
      <group position={[5, 2.5, -12]} rotation={[0, -0.4, 0]}>
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
        
        <Text position={[0, -1.5, 0]} fontSize={0.4} color="#14b8a6" anchorX="center">
          ↓ SCROLL TO DRIVE ↓
        </Text>
      </group>
    </group>
  )
}
