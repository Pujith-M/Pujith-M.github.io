import { useRef, useMemo } from 'react'

export function CityEnvironment({ length }) {
  // Generate random skyscrapers
  const buildings = useMemo(() => {
    const list = []
    // Place buildings on both sides of the highway across the entire length
    for (let i = 0; i < 40; i++) {
      // Left side
      list.push({
        position: [-20 - Math.random() * 20, 0, -Math.random() * length],
        scale: [3 + Math.random() * 5, 10 + Math.random() * 40, 3 + Math.random() * 5],
      })
      // Right side
      list.push({
        position: [20 + Math.random() * 20, 0, -Math.random() * length],
        scale: [3 + Math.random() * 5, 10 + Math.random() * 40, 3 + Math.random() * 5],
      })
    }
    return list
  }, [length])

  // Generate street lamps
  const lamps = useMemo(() => {
    const list = []
    const spacing = 40
    for (let z = 0; z > -length; z -= spacing) {
      // Left lamp
      list.push({ position: [-4, 0, z] })
      // Right lamp
      list.push({ position: [4, 0, z - (spacing/2)] }) // offset slightly
    }
    return list
  }, [length])

  return (
    <group>
      {/* The Asphalt Road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -length/2]}>
        <planeGeometry args={[10, length + 20]} />
        <meshStandardMaterial color="#2d2d3a" roughness={0.8} />
      </mesh>
      
      {/* The Lane lines */}
      {Array.from({ length: Math.floor(length / 10) }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, -(i * 10)]}>
          <planeGeometry args={[0.2, 5]} />
          <meshStandardMaterial color="#fcd34d" emissive="#fcd34d" emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* Buildings */}
      {buildings.map((b, i) => (
        <mesh key={`b-${i}`} position={b.position}>
          <boxGeometry args={[b.scale[0], b.scale[1], b.scale[2]]} />
          {/* Very dark blue/grey buildings with specular highlights */}
          <meshStandardMaterial color="#0b0f19" roughness={0.3} metalness={0.8} />
        </mesh>
      ))}

      {/* Street Lamps */}
      {lamps.map((lamp, i) => {
        const isLeft = lamp.position[0] < 0
        return (
          <group key={`l-${i}`} position={lamp.position}>
            {/* Pole */}
            <mesh position={[0, 3, 0]}>
              <cylinderGeometry args={[0.05, 0.1, 6]} />
              <meshStandardMaterial color="#334155" />
            </mesh>
            {/* Lamp Head */}
            <mesh position={[isLeft ? 0.5 : -0.5, 6, 0]}>
              <boxGeometry args={[1, 0.1, 0.2]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            {/* The Light Glow */}
            <mesh position={[isLeft ? 1 : -1, 5.9, 0]}>
              <sphereGeometry args={[0.2]} />
              <meshBasicMaterial color="#fcd34d" />
              <pointLight color="#fcd34d" intensity={2} distance={20} decay={2} />
              <spotLight 
                color="#fcd34d" 
                intensity={5} 
                angle={Math.PI / 4} 
                penumbra={0.5} 
                position={[0,0,0]} 
                target-position={[isLeft ? 2 : -2, -6, 0]} 
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
