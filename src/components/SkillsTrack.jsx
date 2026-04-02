import { Text, Float, Html } from '@react-three/drei'
import { HighwaySign } from './HighwaySign'
import { LAYOUT } from '../config/layout'
import { useLanes } from '../hooks/useLanes'

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
            outlineWidth={0.02}
            outlineColor="#0f172a"
          >
            {item}
          </Text>
        ))}
      </group>
    </group>
  )
}

export function SkillsTrack({ startZ, data = [] }) {
  const lanes = useLanes()
  const skills = data.length > 0 ? data : [
    {
      title: "Core Languages",
      items: ["Golang", "Solidity", "TypeScript", "Java"],
      color: "#3b82f6"
    },
    {
      title: "Web3 & Blockchain",
      items: ["Web3", "Foundry", "Smart Contracts", "Postgres"],
      color: "#8b5cf6"
    },
    {
      title: "Tools & Frameworks",
      items: ["React JS / Next JS", "Kafka", "Prometheus / Grafana"],
      color: "#14b8a6"
    }
  ]

  return (
    <group>
      {/* Section Header */}
      <HighwaySign 
        position={[0, LAYOUT.BILLBOARD.SIGN_HEIGHT, startZ]} 
        title="ENTERING SKILLS" 
        subtext="TECHNICAL ARSENAL" 
        color="#14b8a6" 
      />

      {skills.map((skill, index) => (
        <SkillNode 
          key={index}
          position={[
            index % 2 === 0 ? lanes.LEFT + 1.5 : lanes.RIGHT - 1.5, 
            3, 
            startZ - LAYOUT.SPACING.BILLBOARD_GAP - (index * 5)
          ]} 
          title={skill.title} 
          items={skill.items} 
          color={skill.color} 
        />
      ))}
      
      <HighwaySign 
        position={[0, LAYOUT.BILLBOARD.SIGN_HEIGHT, startZ - LAYOUT.SPACING.SECTION_BUFFER - (skills.length * 5)]} 
        title="LEAVING SKILLS" 
        subtext="END OF ZONE" 
        color="#ec4899" 
      />
    </group>
  )
}
