import { Html, Text } from '@react-three/drei'
import { HighwaySign } from './HighwaySign'

// Removed inline HighwaySign in favor of shared component
// Individual Ad Billboard for each bullet point
function AdBillboard({ position, text, role, side = "left" }) {
  const xOffset = side === "left" ? -8.5 : 8.5
  const finalPos = [position[0] + xOffset, position[1], position[2]]
  const accentColor = side === "left" ? "#14b8a6" : "#3b82f6"

  // Since text gets too long, we will use text wrapping.
  // We'll give it a max width.
  return (
    <group position={finalPos} rotation={[0, side === "left" ? 0.3 : -0.3, 0]}>
      {/* Title Label */}
      <Text 
        position={[0, 3.2, 0.1]} 
        fontSize={0.4} 
        color={accentColor}
        anchorX="center" 
      >
        {role.toUpperCase()}
      </Text>
      
      {/* Premium Glass Billboard Backing in 3D */}
      <group position={[0, 1.2, 0]}>
        {/* Glass panel */}
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[6, 3]} />
          <meshStandardMaterial color="#0f172a" transparent opacity={0.8} roughness={0.2} />
        </mesh>
        {/* Neon border */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[6.2, 3.2]} />
          <meshBasicMaterial color={accentColor} wireframe />
        </mesh>

        <Text 
          position={[0, 0, 0]} 
          fontSize={0.25} 
          color="white" 
          anchorX="center" 
          anchorY="middle"
          maxWidth={5.5}
          textAlign="center"
        >
          {text}
        </Text>
      </group>
      
      {/* Pillar */}
      <mesh position={[0, -2, -0.1]}>
        <cylinderGeometry args={[0.1, 0.15, 4]} />
        <meshStandardMaterial color="#1e293b" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  )
}

export function ExperienceTrack({ startZ = -20 }) {
  const experiences = [
    {
      company: 'Unmarshal',
      role: 'Senior Software Engineer',
      points: [
        'Architected blockchain data indexing solution (500M+ API requests monthly).',
        'Built "Unmarshal Parser" for zero-code smart contract indexing.',
        'Created Web3 real-time notification engine.',
        'Led development of "Xscan," a cross-chain block explorer.'
      ]
    },
    {
      company: 'Navi Technologies',
      role: 'SDE-2',
      points: [
        'Built accounting system using Spring Boot, Kafka, and PostgreSQL.',
        'Automated collections, boosting efficiency by 15%.',
        'Developed internal operations portal in React JS.'
      ]
    },
    {
      company: 'MavenHive',
      role: 'Associate Developer',
      points: [
        'Dashboard for CRED using React JS.',
        'Contributed to CultFit inventory management.',
        'Mobile web campaign app via React JS & Apollo GraphQL.'
      ]
    }
  ]

  let currentZ = startZ
  const componentsToRender = []

  experiences.forEach((exp, index) => {
    // 1. Entering Sign
    componentsToRender.push(
      <HighwaySign 
        key={`enter-${index}`} 
        position={[0, 0, currentZ]} 
        title={`ENTERING ${exp.company.toUpperCase()}`} 
        subtext={exp.role} 
        color="var(--accent-teal)"
      />
    )
    currentZ -= 25 // Greater spacing for premium feel

    // 2. Spread bullet points as individual alternating billboards
    exp.points.forEach((pt, ptIndex) => {
      componentsToRender.push(
        <AdBillboard 
          key={`ad-${index}-${ptIndex}`}
          position={[0, 0, currentZ]}
          text={pt}
          role={`${exp.company} - ${exp.role}`}
          side={ptIndex % 2 === 0 ? "left" : "right"}
        />
      )
      currentZ -= 18 // More distance for easier reading
    })

    currentZ -= 15

    // 3. Leaving Sign
    componentsToRender.push(
      <HighwaySign 
        key={`exit-${index}`} 
        position={[0, 0, currentZ]} 
        title={`LEAVING ${exp.company.toUpperCase()}`} 
        subtext="END OF EXPERIENCE ZONE" 
        color="var(--accent-pink)"
      />
    )
    currentZ -= 40
  })

  // Expose the final Z so other tracks know where to start? 
  // For simplicity, we can just hardcode the overall track spacing based on this calculation.
  // Unmarshal: 4 points = 4 * 15 = 60 + 20 + 10 + 30 = 120
  // Navi: 3 points = 45 + 60 = 105
  // MavenHive: 3 points = 45 + 60 = 105
  // Total distance used ~ 330 units.
  
  return <group>{componentsToRender}</group>
}
