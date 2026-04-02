import { Text, Float, Html } from '@react-three/drei'

function SkillNode({ position, title, items, color }) {
  return (
    <group position={position}>
      {/* Floating Geometric Core with Glow */}
      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[1.2]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={4} 
            wireframe 
            transparent 
            opacity={0.8} 
          />
        </mesh>
      </Float>

      {/* Category Label */}
      <group position={[0, 2.5, 0]}>
        {/* Simple background box */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[3, 0.8]} />
          <meshStandardMaterial color="#0f172a" transparent opacity={0.8} />
        </mesh>
        {/* Bottom border line */}
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[3, 0.05, 0.05]} />
          <meshStandardMaterial color={color} />
        </mesh>
        <Text position={[0, 0, 0]} fontSize={0.4} color="white" anchorX="center" anchorY="middle">
          {title}
        </Text>
      </group>

      {/* Skills list as floating tags */}
      <group position={[0, -1, 0]}>
        {items.map((item, idx) => (
          <Text 
            key={idx} 
            position={[0, -(idx * 0.5), 0]} 
            color="#f8fafc"
            anchorX="center" 
          >
            {item}
          </Text>
        ))}
      </group>
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
