import { Text, Float } from '@react-three/drei'
import { HighwaySign } from './HighwaySign'
import { SmartBillboard } from './SmartBillboard'
import { LAYOUT } from '../config/layout'
import { useLanes } from '../hooks/useLanes'
import { COLORS } from '../config/colors'

function SkillNode({ position, title, items, color }) {
  return (
    <SmartBillboard position={position}>
      {/* Professional Geometric Core replaces wireframe */}
      <Float speed={4} rotationIntensity={1.5} floatIntensity={0.8}>
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[1.1]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={6} 
            transparent 
            opacity={0.35} 
            roughness={0}
            metalness={1}
          />
        </mesh>
        {/* Internal core sphere for depth */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </Float>

      {/* Category Glass Card */}
      <group position={[0, 2.5, 0]}>
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[3.2, 0.8]} />
          <meshStandardMaterial color={COLORS.SLATE_900} transparent opacity={0.85} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.38, 0.01]}>
          <planeGeometry args={[3.2, 0.04]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} />
        </mesh>
        <Text 
          position={[0, 0, 0.05]} 
          fontSize={0.36} 
          color="white" 
          anchorX="center" 
          anchorY="middle"
          fontWeight={700}
        >
          {title.toUpperCase()}
        </Text>
      </group>

      {/* Skills List */}
      <group position={[0, -1, 0]}>
        {items.map((item, idx) => (
          <Text 
            key={idx} 
            position={[0, -(idx * 0.45), 0.1]} 
            fontSize={0.24}
            color={COLORS.SLATE_400}
            anchorX="center" 
          >
            {item}
          </Text>
        ))}
      </group>
    </SmartBillboard>
  )
}

export function SkillsTrack({ startZ, data = [] }) {
  const lanes = useLanes()
  const skills = data.length > 0 ? data : [
    {
      title: "Core Languages",
      items: ["Golang", "Solidity", "TypeScript", "Java"],
      color: COLORS.VIVID_CYAN
    },
    {
      title: "Web3 Stack",
      items: ["Web3", "Foundry", "EVM", "Postgres"],
      color: COLORS.CYBER_LIME
    },
    {
      title: "Observability",
      items: ["Kafka", "Prometheus", "Grafana"],
      color: COLORS.ELECTRIC_PURPLE
    }
  ]

  return (
    <group>
      <HighwaySign 
        position={[0, LAYOUT.BILLBOARD.SIGN_HEIGHT, startZ]} 
        title="ENTERING SKILLS" 
        subtext="TECHNICAL ARSENAL" 
        color={COLORS.CYBER_LIME} 
      />

      {skills.map((skill, index) => (
        <SkillNode 
          key={index}
          position={[
            index % 2 === 0 ? lanes.LEFT + 1.2 : lanes.RIGHT - 1.2, 
            2.8, 
            startZ - LAYOUT.SPACING.BILLBOARD_GAP - (index * 6)
          ]} 
          title={skill.title} 
          items={skill.items} 
          color={skill.color} 
        />
      ))}
      
      <HighwaySign 
        position={[0, LAYOUT.BILLBOARD.SIGN_HEIGHT, startZ - LAYOUT.SPACING.SECTION_BUFFER - (skills.length * 6)]} 
        title="LEAVING SKILLS" 
        subtext="END OF ZONE" 
        color="#ec4899" 
      />
    </group>
  )
}
