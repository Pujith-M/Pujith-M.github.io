import { Text, Float } from '@react-three/drei'

function SkillNode({ position, title, items, color }) {
  return (
    <group position={position}>
      {/* Floating Geometric Core */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={color} wireframe />
        </mesh>
      </Float>

      {/* Category Title */}
      <Text position={[0, 2, 0]} fontSize={0.6} color="white" anchorX="center" anchorY="bottom">
        {title}
      </Text>

      {/* Skills listed below it */}
      {items.map((item, idx) => (
        <Text 
          key={idx} 
          position={[0, -1.2 - (idx * 0.4), 0]} 
          fontSize={0.4} 
          color="#94a3b8"
          anchorX="center" 
        >
          {item}
        </Text>
      ))}
    </group>
  )
}

export function SkillsTrack({ startZ }) {
  return (
    <group>
      {/* Section Header */}
      <Text position={[0, 5, startZ]} fontSize={2} color="#14b8a6" anchorX="center" anchorY="bottom">
        Technical Arsenal
      </Text>

      {/* Left Node */}
      <SkillNode 
        position={[-5, 3, startZ - 5]} 
        title="Core Languages" 
        items={["Golang", "Solidity", "TypeScript", "Java"]} 
        color="#3b82f6" 
      />
      
      {/* Right Node */}
      <SkillNode 
        position={[5, 3, startZ - 10]} 
        title="Web3 & Blockchain" 
        items={["Web3", "Foundry", "Smart Contracts", "Postgres"]} 
        color="#8b5cf6" 
      />

      {/* Left Node */}
      <SkillNode 
        position={[-5, 3, startZ - 15]} 
        title="Tools & Frameworks" 
        items={["React JS / Next JS", "Kafka", "Prometheus / Grafana"]} 
        color="#14b8a6" 
      />
    </group>
  )
}
