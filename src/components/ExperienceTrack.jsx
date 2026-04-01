import { Html, Text } from '@react-three/drei'

// Giant Overhead Highway Sign for Start/End of a Zone
function HighwaySign({ position, title, subtext, color = "#3b82f6" }) {
  return (
    <group position={position}>
      {/* Pillars */}
      <mesh position={[-6, 4, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 8]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[6, 4, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 8]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Crossbeam */}
      <mesh position={[0, 8, 0]}>
        <boxGeometry args={[12.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Sign Board */}
      <mesh position={[0, 6.5, 0.1]}>
        <boxGeometry args={[10, 2.5, 0.2]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Illuminated Text */}
      <Text position={[0, 7, 0.25]} fontSize={0.8} color={color} anchorX="center" anchorY="middle">
        {title}
      </Text>
      <Text position={[0, 6, 0.25]} fontSize={0.4} color="#94a3b8" anchorX="center" anchorY="middle">
        {subtext}
      </Text>
    </group>
  )
}

// Individual Ad Billboard for each bullet point
function AdBillboard({ position, text, role, side = "left" }) {
  const xOffset = side === "left" ? -8 : 8
  const finalPos = [position[0] + xOffset, position[1], position[2]]

  return (
    <group position={finalPos} rotation={[0, side === "left" ? 0.4 : -0.4, 0]}>
      {/* 3D Title */}
      <Text 
        position={[0, 2.8, 0]} 
        fontSize={0.5} 
        color="#3b82f6" 
        anchorX="center" 
        anchorY="middle"
      >
        {role}
      </Text>
      
      {/* HTML Overlay Panel (The actual Ad poster) */}
      <Html transform position={[0, 1, 0]} distanceFactor={12}>
        <div style={{
          width: '360px',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: `2px solid ${side === "left" ? "var(--accent-teal)" : "var(--accent-blue)"}`,
          borderRadius: '12px',
          padding: '24px',
          color: 'white',
          boxShadow: `0 8px 32px rgba(${side === "left" ? "20, 184, 166" : "59, 130, 246"}, 0.3)`,
          fontFamily: 'Inter, sans-serif'
        }}>
          <p style={{ margin: 0, fontSize: '1.2rem', lineHeight: '1.6' }}>{text}</p>
        </div>
      </Html>
      
      {/* Billboard Pillar */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 3]} />
        <meshStandardMaterial color="#334155" />
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
        color="#10b981"
      />
    )
    currentZ -= 20 // Drive forward 20 units

    // 2. Spread bullet points as individual alternating billboards
    exp.points.forEach((pt, ptIndex) => {
      componentsToRender.push(
        <AdBillboard 
          key={`ad-${index}-${ptIndex}`}
          position={[0, 0, currentZ]}
          text={pt}
          role={exp.role}
          side={ptIndex % 2 === 0 ? "left" : "right"}
        />
      )
      currentZ -= 15 // Distance between each consecutive billboard
    })

    currentZ -= 10 // Padding before exit sign

    // 3. Leaving Sign
    componentsToRender.push(
      <HighwaySign 
        key={`exit-${index}`} 
        position={[0, 0, currentZ]} 
        title={`LEAVING ${exp.company.toUpperCase()}`} 
        subtext="END OF EXPERIENCE" 
        color="#f43f5e"
      />
    )
    currentZ -= 30 // Gap before the next company
  })

  // Expose the final Z so other tracks know where to start? 
  // For simplicity, we can just hardcode the overall track spacing based on this calculation.
  // Unmarshal: 4 points = 4 * 15 = 60 + 20 + 10 + 30 = 120
  // Navi: 3 points = 45 + 60 = 105
  // MavenHive: 3 points = 45 + 60 = 105
  // Total distance used ~ 330 units.
  
  return <group>{componentsToRender}</group>
}
