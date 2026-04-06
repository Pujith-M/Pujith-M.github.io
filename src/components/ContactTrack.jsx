import { Html, Text } from '@react-three/drei'
import { FaEnvelope, FaPhone, FaLink } from 'react-icons/fa'
import { HighwaySign } from './HighwaySign'
import { LAYOUT } from '../config/layout'

export function ContactTrack({ startZ }) {
  return (
    <group position={[0, 0, startZ]}>
      {/* End of Road Sign - Neon Style */}
      <HighwaySign 
        position={[0, LAYOUT.BILLBOARD.SIGN_HEIGHT, 0]} 
        title="JOURNEY COMPLETE" 
        subtext="THE ROAD ENDS HERE" 
        color="#ec4899" 
      />

      {/* 3D Contact Billboard */}
      <group position={[0, 1.5, 4]}>
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[8, 5]} />
          <meshStandardMaterial color="#0f172a" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[8.2, 5.2]} />
          <meshBasicMaterial color="#14b8a6" wireframe />
        </mesh>
        
        <Text position={[0, 1.5, 0]} fontSize={1} color="white" anchorX="center" anchorY="middle">
          Let's Connect
        </Text>
        <Text position={[0, 0.5, 0]} fontSize={0.35} color="#94a3b8" anchorX="center" anchorY="middle" maxWidth={7} textAlign="center">
          Open for opportunities in Web3, Backend, and Blockchain.
        </Text>

        <Text position={[0, -0.5, 0]} fontSize={0.4} color="#14b8a6" anchorX="center" anchorY="middle">
          pujithcareerventure@gmail.com
        </Text>
        <Text position={[0, -1, 0]} fontSize={0.4} color="#3b82f6" anchorX="center" anchorY="middle">
          +91 9741283118
        </Text>

        <mesh position={[0, -2, 0]}>
          <planeGeometry args={[7, 1]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.03} />
        </mesh>
        <Text position={[0, -1.8, 0.05]} fontSize={0.3} color="#94a3b8" anchorX="center" anchorY="middle">
          SJB Institute of Technology
        </Text>
        <Text position={[0, -2.15, 0.05]} fontSize={0.25} color="white" anchorX="center" anchorY="middle">
          Computer Science Engineering | 2014-2018
        </Text>
      </group>
      
      {/* Visual Terminal Portal */}
      <mesh position={[0, 5, -5]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.9} />
      </mesh>
      {/* Glowing Exit Gate */}
      <mesh position={[0, 5, -4.9]} rotation={[0, 0, 0]}>
         <planeGeometry args={[15, 10]} />
         <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={5} wireframe />
      </mesh>
    </group>
  )
}

// Removed inline HighwaySign in favor of shared component
