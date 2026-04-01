import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars, Float, MeshDistortMaterial } from '@react-three/drei'

export function Scene() {
  const sphereRef = useRef()

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.1
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#3b82f6" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#14b8a6" />
      
      {/* Background Starfield */}
      <Stars radius={100} depth={50} count={5000} factor={6} saturation={0} fade speed={1.5} />
      
      {/* Interactive Floating Web3 Orb */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5} position={[3, 0, -3]}>
        <mesh ref={sphereRef} scale={1.8}>
          <torusKnotGeometry args={[1, 0.3, 150, 40]} />
          <MeshDistortMaterial 
            color="#0f172a" 
            emissive="#3b82f6" 
            emissiveIntensity={0.8}
            wireframe 
            distort={0.4} 
            speed={2} 
          />
        </mesh>
      </Float>
      
      {/* Floating Geometric Elements */}
      <Float speed={1.8} rotationIntensity={2} floatIntensity={2} position={[-4, -2, -6]}>
        <mesh scale={1.2}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#8b5cf6" wireframe />
        </mesh>
      </Float>
      
      <Float speed={1.2} rotationIntensity={1} floatIntensity={1.2} position={[-2, 3, -4]}>
        <mesh scale={0.5}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#14b8a6" wireframe transparent opacity={0.6} />
        </mesh>
      </Float>
    </>
  )
}
