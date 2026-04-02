import { useMemo } from 'react'

function pseudoRandom(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453123
  return x - Math.floor(x)
}

export function CityEnvironment({ length }) {
  // Generate random skyscrapers
  const buildings = useMemo(() => {
    const list = []
    for (let i = 0; i < 50; i++) {
      const h = 10 + pseudoRandom(i * 1.1 + 1) * 50
      const w = 4 + pseudoRandom(i * 1.3 + 2) * 6
      const d = 4 + pseudoRandom(i * 1.7 + 3) * 6
      
      // Left side
      list.push({
        position: [-22 - pseudoRandom(i * 2.3 + 4) * 30, h / 2, -pseudoRandom(i * 2.9 + 5) * length],
        scale: [w, h, d],
        color: i % 2 === 0 ? "#0f172a" : "#020617",
        windows: Array.from({ length: 6 }).map((_, j) => ({
          pos: [
            (pseudoRandom(i * 10 + j * 2 + 6) - 0.5) * w,
            (pseudoRandom(i * 10 + j * 2 + 7) - 0.5) * h,
            d / 2 + 0.05
          ],
          size: [0.3 + pseudoRandom(i * 10 + j * 2 + 8) * 0.5, 0.4 + pseudoRandom(i * 10 + j * 2 + 9) * 0.8]
        }))
      })
      
      // Right side
      list.push({
        position: [22 + pseudoRandom(i * 3.1 + 10) * 30, h / 2, -pseudoRandom(i * 3.7 + 11) * length],
        scale: [w, h, d],
        color: i % 2 === 1 ? "#0f172a" : "#020617",
        windows: Array.from({ length: 6 }).map((_, j) => ({
          pos: [
            (pseudoRandom(i * 10 + j * 2 + 12) - 0.5) * w,
            (pseudoRandom(i * 10 + j * 2 + 13) - 0.5) * h,
            -d / 2 - 0.05
          ],
          size: [0.3 + pseudoRandom(i * 10 + j * 2 + 14) * 0.5, 0.4 + pseudoRandom(i * 10 + j * 2 + 15) * 0.8]
        }))
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
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -length/2]} receiveShadow>
        <planeGeometry args={[12, length + 40]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.6} metalness={0.4} />
      </mesh>
      
      {/* Side Curbs / Sidewalks */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-6.5, -0.005, -length/2]}>
        <planeGeometry args={[1, length + 40]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[6.5, -0.005, -length/2]}>
        <planeGeometry args={[1, length + 40]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      
      {/* The Lane lines */}
      {Array.from({ length: Math.floor(length / 10) }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -(i * 10)]}>
          <planeGeometry args={[0.2, 5]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={4} />
        </mesh>
      ))}

      {/* Buildings */}
      {buildings.map((b, i) => (
        <group key={`b-${i}`} position={b.position}>
          <mesh>
            <boxGeometry args={b.scale} />
            <meshStandardMaterial color={b.color} roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Windows on buildings */}
          {b.windows.map((win, j) => (
            <mesh key={`w-${j}`} position={win.pos}>
              <planeGeometry args={win.size} />
              <meshStandardMaterial 
                color={i % 3 === 0 ? "#3b82f6" : "#f43f5e"} 
                emissive={i % 3 === 0 ? "#3b82f6" : "#f43f5e"} 
                emissiveIntensity={3} 
              />
            </mesh>
          ))}
        </group>
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
