import { useRef, useMemo } from 'react'
import { Instances, Instance } from '@react-three/drei'
export function CityEnvironment({ length }) {
  // Generate random skyscrapers
  const buildings = useMemo(() => {
    let seed = 12345;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    const list = []
    const buildingVariations = 5
    for (let i = 0; i < 50; i++) {
      const h = 10 + random() * 50
      const w = 4 + random() * 6
      const d = 4 + random() * 6
      
      // Left side
      list.push({
        position: [-22 - random() * 30, h / 2, -random() * length],
        scale: [w, h, d],
        color: i % 2 === 0 ? "#0f172a" : "#020617",
        windows: Array.from({ length: 6 }).map(() => ({
          pos: [ (random() - 0.5) * w, (random() - 0.5) * h, d / 2 + 0.05 ],
          size: [ 0.3 + random() * 0.5, 0.4 + random() * 0.8 ]
        }))
      })
      
      // Right side
      list.push({
        position: [22 + random() * 30, h / 2, -random() * length],
        scale: [w, h, d],
        color: i % 2 === 1 ? "#0f172a" : "#020617",
        windows: Array.from({ length: 6 }).map(() => ({
          pos: [ (random() - 0.5) * w, (random() - 0.5) * h, -d / 2 - 0.05 ],
          size: [ 0.3 + random() * 0.5, 0.4 + random() * 0.8 ]
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
      <Instances limit={200} range={Math.floor(length / 10)}>
        <planeGeometry args={[0.2, 5]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={4} />
        {Array.from({ length: Math.floor(length / 10) }).map((_, i) => (
          <Instance key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -(i * 10)]} />
        ))}
      </Instances>

      {/* Buildings */}
      <Instances limit={200} range={buildings.length}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.2} metalness={0.9} />
        {buildings.map((b, i) => (
          <Instance key={`b-${i}`} position={b.position} scale={b.scale} color={b.color} />
        ))}
      </Instances>

      {/* Blue Windows */}
      <Instances limit={1000}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={3} />
        {buildings.filter((_, i) => i % 3 === 0).flatMap((b, i) => b.windows.map((win, j) => (
          <Instance key={`bw-${i}-${j}`} position={[b.position[0] + win.pos[0], b.position[1] + win.pos[1], b.position[2] + win.pos[2]]} scale={win.size} />
        )))}
      </Instances>

      {/* Red Windows */}
      <Instances limit={1000}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={3} />
        {buildings.filter((_, i) => i % 3 !== 0).flatMap((b, i) => b.windows.map((win, j) => (
          <Instance key={`rw-${i}-${j}`} position={[b.position[0] + win.pos[0], b.position[1] + win.pos[1], b.position[2] + win.pos[2]]} scale={win.size} />
        )))}
      </Instances>
      {/* Street Lamps */}
      <Instances limit={100} range={lamps.length}>
        <cylinderGeometry args={[0.05, 0.1, 6]} />
        <meshStandardMaterial color="#334155" />
        {lamps.map((lamp, i) => (
          <Instance key={`lp-${i}`} position={[lamp.position[0], lamp.position[1] + 3, lamp.position[2]]} />
        ))}
      </Instances>

      <Instances limit={100} range={lamps.length}>
        <boxGeometry args={[1, 0.1, 0.2]} />
        <meshStandardMaterial color="#1e293b" />
        {lamps.map((lamp, i) => {
          const isLeft = lamp.position[0] < 0
          return <Instance key={`lh-${i}`} position={[lamp.position[0] + (isLeft ? 0.5 : -0.5), lamp.position[1] + 6, lamp.position[2]]} />
        })}
      </Instances>

      <Instances limit={100} range={lamps.length}>
        <sphereGeometry args={[0.2]} />
        <meshBasicMaterial color="#fcd34d" />
        {lamps.map((lamp, i) => {
          const isLeft = lamp.position[0] < 0
          return <Instance key={`lg-${i}`} position={[lamp.position[0] + (isLeft ? 1 : -1), lamp.position[1] + 5.9, lamp.position[2]]} />
        })}
      </Instances>

      {/* Street Lamp Lights (Must remain non-instanced) */}
      {lamps.map((lamp, i) => {
        const isLeft = lamp.position[0] < 0
        return (
          <group key={`ll-${i}`} position={[lamp.position[0] + (isLeft ? 1 : -1), lamp.position[1] + 5.9, lamp.position[2]]}>
              <pointLight color="#fcd34d" intensity={2} distance={20} decay={2} />
              <spotLight 
                color="#fcd34d" 
                intensity={5} 
                angle={Math.PI / 4} 
                penumbra={0.5} 
                position={[0,0,0]} 
                target-position={[isLeft ? 2 : -2, -6, 0]} 
              />
          </group>
        )
      })}
    </group>
  )
}
