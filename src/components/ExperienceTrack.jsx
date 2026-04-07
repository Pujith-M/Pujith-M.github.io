import { Text } from '@react-three/drei'
import { HighwaySign } from './HighwaySign'
import { LAYOUT } from '../config/layout'
import { useLanes } from '../hooks/useLanes'
import { COLORS } from '../config/colors'

// Individual Ad Billboard for each bullet point
function AdBillboard({ position, text, role, side = "left" }) {
  const lanes = useLanes()
  const xOffset = side === "left" ? lanes.OFFROAD_LEFT : lanes.OFFROAD_RIGHT
  const finalPos = [position[0] + xOffset, position[1], position[2]]
  const accentColor = side === "left" ? COLORS.CYAN_GLOW : COLORS.CYBER_LIME

  return (
    <group position={finalPos} rotation={[0, side === "left" ? 0.3 : -0.3, 0]}>
      {/* Role Label */}
      <Text 
        position={[0, 3.2, 0.1]} 
        fontSize={0.28} 
        color={accentColor}
        anchorX="center" 
      >
        {role.toUpperCase()}
      </Text>
      
      {/* Premium Glass Billboard Backing in 3D */}
      <group position={[0, 1.2, 0]}>
        {/* Glass panel */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[6, 3, 32, 32]} />
          <meshStandardMaterial 
            color={COLORS.SLATE_900} 
            transparent 
            opacity={0.8} 
            roughness={0.05} 
            metalness={0.2}
          />
        </mesh>
        
        {/* Subtle inner glow / border strip instead of wireframe */}
        <mesh position={[0, 1.48, -0.02]}>
          <planeGeometry args={[6, 0.04]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={3} />
        </mesh>
        <mesh position={[0, -1.48, -0.02]}>
          <planeGeometry args={[6, 0.04]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={3} />
        </mesh>

        <Text 
          position={[0, 0, 0.05]} 
          fontSize={0.24} 
          color="white" 
          anchorX="center" 
          anchorY="middle"
          maxWidth={5.4}
          textAlign="center"
        >
          {text}
        </Text>
      </group>
      
      {/* Pillar */}
      <mesh position={[0, -2, -0.1]}>
        <cylinderGeometry args={[0.06, 0.1, 4]} />
        <meshStandardMaterial color={COLORS.SLATE_700} metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}


export function ExperienceTrack({ startZ = -20, data = [] }) {
  const experiences = data.length > 0 ? data : [
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
        position={[0, LAYOUT.BILLBOARD.SIGN_HEIGHT, currentZ]} 
        title={`ENTERING ${exp.company.toUpperCase()}`} 
        subtext={exp.role} 
        color="#14b8a6"
      />
    )
    currentZ -= LAYOUT.SPACING.SECTION_BUFFER

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
      currentZ -= LAYOUT.SPACING.BILLBOARD_GAP
    })

    currentZ -= LAYOUT.SPACING.BILLBOARD_GAP

    // 3. Leaving Sign
    componentsToRender.push(
      <HighwaySign 
        key={`exit-${index}`} 
        position={[0, LAYOUT.BILLBOARD.SIGN_HEIGHT, currentZ]} 
        title={`LEAVING ${exp.company.toUpperCase()}`} 
        subtext="END OF EXPERIENCE ZONE" 
        color="#ec4899"
      />
    )
    currentZ -= LAYOUT.SPACING.SECTION_BUFFER
  })

  // Expose the final Z so other tracks know where to start? 
  // For simplicity, we can just hardcode the overall track spacing based on this calculation.
  // Unmarshal: 4 points = 4 * 15 = 60 + 20 + 10 + 30 = 120
  // Navi: 3 points = 45 + 60 = 105
  // MavenHive: 3 points = 45 + 60 = 105
  // Total distance used ~ 330 units.
  
  return <group>{componentsToRender}</group>
}
