import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'

export function Car({ trackLength = 400, ...props }) {
  const groupRef = useRef()
  const scroll = useScroll()

  // Make the wheels spin based on distance traveled
  const wheelRefs = [useRef(), useRef(), useRef(), useRef()]

  useFrame(() => {
    if (groupRef.current && scroll) {
      const currentScroll = scroll.offset
      
      // Move car forward
      groupRef.current.position.z = -currentScroll * trackLength
      
      // Add slight engine vibration/bobbing
      groupRef.current.position.y = Math.sin(currentScroll * 500) * 0.02
      
      // Rotate wheels smoothly as you drive down Z
      wheelRefs.forEach(w => {
        if(w.current) w.current.rotation.x = currentScroll * trackLength
      })
    }
  })

  // Colors
  const bodyColor = "#22252a" // Dark glossy charcoal for contrast
  const windowColor = "#050505" // Fully tinted
  const wheelColor = "#111111"
  const rimColor = "#888888" // Brighter rim for pop

  return (
    <group ref={groupRef} scale={[1.4, 1.4, 1.4]} {...props}>
      {/* --- Mahindra Thar Setup --- */}

      {/* Main Lower Body */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[1.6, 0.6, 3.4]} />
        <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.7} />
      </mesh>
      
      {/* Front Bumper */}
      <mesh position={[0, 0.55, 1.75]}>
        <boxGeometry args={[1.7, 0.2, 0.3]} />
        <meshStandardMaterial color="#222222" roughness={0.8} />
      </mesh>

      {/* Rear Bumper */}
      <mesh position={[0, 0.55, -1.75]}>
        <boxGeometry args={[1.7, 0.2, 0.3]} />
        <meshStandardMaterial color="#222222" roughness={0.8} />
      </mesh>
      
      {/* Cabin / Roof */}
      <mesh position={[0, 1.45, -0.3]}>
        <boxGeometry args={[1.5, 0.7, 2.0]} />
        <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 1.45, 0.71]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[1.4, 0.65, 0.05]} />
        <meshStandardMaterial color={windowColor} roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Side Windows */}
      <mesh position={[-0.76, 1.45, -0.3]}>
        <boxGeometry args={[0.02, 0.55, 1.8]} />
        <meshStandardMaterial color={windowColor} roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[0.76, 1.45, -0.3]}>
        <boxGeometry args={[0.02, 0.55, 1.8]} />
        <meshStandardMaterial color={windowColor} roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Rear Window */}
      <mesh position={[0, 1.45, -1.31]}>
        <boxGeometry args={[1.3, 0.55, 0.02]} />
        <meshStandardMaterial color={windowColor} roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Spare Wheel on back */}
      <group position={[0, 1.1, -1.75]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.2, 24]} />
          <meshStandardMaterial color={wheelColor} roughness={0.9} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.11]}>
          <cylinderGeometry args={[0.15, 0.15, 0.05, 16]} />
          <meshStandardMaterial color={rimColor} roughness={0.5} metalness={0.8} />
        </mesh>
      </group>

      {/* Front Grille Slots */}
      {[-0.4, -0.25, -0.1, 0.05, 0.2, 0.35, 0.5].map((x, i) => (
        <mesh key={i} position={[x - 0.05, 0.9, 1.71]}>
          <boxGeometry args={[0.08, 0.25, 0.05]} />
          <meshStandardMaterial color="#000000" roughness={0.8} />
        </mesh>
      ))}

      {/* Headlights (Round for Thar) */}
      <group position={[-0.6, 0.95, 1.7]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.05, 24]} />
          <meshStandardMaterial color="white" emissive="white" emissiveIntensity={5} />
        </mesh>
        <spotLight color="white" intensity={5} angle={0.5} penumbra={0.5} position={[0,0,0]} target-position={[0, -2, 10]} />
      </group>
      <group position={[0.6, 0.95, 1.7]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.05, 24]} />
          <meshStandardMaterial color="white" emissive="white" emissiveIntensity={5} />
        </mesh>
        <spotLight color="white" intensity={5} angle={0.5} penumbra={0.5} position={[0,0,0]} target-position={[0, -2, 10]} />
      </group>

      {/* Tail lights */}
      <mesh position={[-0.6, 0.8, -1.71]}>
        <boxGeometry args={[0.2, 0.3, 0.05]} />
        <meshStandardMaterial color="red" emissive="red" emissiveIntensity={3} />
      </mesh>
      <mesh position={[0.6, 0.8, -1.71]}>
        <boxGeometry args={[0.2, 0.3, 0.05]} />
        <meshStandardMaterial color="red" emissive="red" emissiveIntensity={3} />
      </mesh>

      {/* Fenders (Wheel Arches) */}
      <mesh position={[-0.85, 0.85, 1.1]}>
        <boxGeometry args={[0.3, 0.1, 1.1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh position={[0.85, 0.85, 1.1]}>
        <boxGeometry args={[0.3, 0.1, 1.1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh position={[-0.85, 0.85, -1.0]}>
        <boxGeometry args={[0.3, 0.1, 1.1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh position={[0.85, 0.85, -1.0]}>
        <boxGeometry args={[0.3, 0.1, 1.1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Wheels */}
      {/* Front Left */}
      <group position={[-0.9, 0.4, 1.1]}>
        <group ref={wheelRefs[0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.25, 24]} />
            <meshStandardMaterial color={wheelColor} roughness={0.9} />
            <mesh position={[0, 0.13, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.02, 16]} />
              <meshStandardMaterial color={rimColor} roughness={0.5} metalness={0.8} />
            </mesh>
          </mesh>
        </group>
      </group>

      {/* Front Right */}
      <group position={[0.9, 0.4, 1.1]}>
        <group ref={wheelRefs[1]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.25, 24]} />
            <meshStandardMaterial color={wheelColor} roughness={0.9} />
            <mesh position={[0, -0.13, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.02, 16]} />
              <meshStandardMaterial color={rimColor} roughness={0.5} metalness={0.8} />
            </mesh>
          </mesh>
        </group>
      </group>

      {/* Rear Left */}
      <group position={[-0.9, 0.4, -1.0]}>
        <group ref={wheelRefs[2]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.25, 24]} />
            <meshStandardMaterial color={wheelColor} roughness={0.9} />
            <mesh position={[0, 0.13, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.02, 16]} />
              <meshStandardMaterial color={rimColor} roughness={0.5} metalness={0.8} />
            </mesh>
          </mesh>
        </group>
      </group>

      {/* Rear Right */}
      <group position={[0.9, 0.4, -1.0]}>
        <group ref={wheelRefs[3]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.25, 24]} />
            <meshStandardMaterial color={wheelColor} roughness={0.9} />
            <mesh position={[0, -0.13, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.02, 16]} />
              <meshStandardMaterial color={rimColor} roughness={0.5} metalness={0.8} />
            </mesh>
          </mesh>
        </group>
      </group>

    </group>
  )
}

