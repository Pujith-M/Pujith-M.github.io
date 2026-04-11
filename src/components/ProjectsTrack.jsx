import { Text } from '@react-three/drei'
import { HighwaySign } from './HighwaySign'
import { LAYOUT } from '../config/layout'
import { useLanes } from '../hooks/useLanes'
import { COLORS } from '../config/colors'
import { SmartBillboard } from './SmartBillboard'

function ProjectScreen({ position, name, tech, desc }) {
  const accent = COLORS.VIVID_CYAN

  return (
    <SmartBillboard position={position}>
      {/* Project Card Content */}
      <group position={[0, 2.2, 0]}>
        {/* Glass Backing */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[6.2, 4.2, 32, 32]} />
          <meshStandardMaterial 
            color={COLORS.SLATE_900} 
            transparent 
            opacity={0.8} 
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
        
        {/* Top/Bottom Glow Strips replacing wireframe */}
        <mesh position={[0, 2.1, 0.02]}>
          <planeGeometry args={[6.2, 0.05]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={4} />
        </mesh>
        <mesh position={[0, -2.1, 0.02]}>
          <planeGeometry args={[6.2, 0.05]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={4} />
        </mesh>
        
        <Text 
          position={[0, 1.3, 0.1]} 
          fontSize={0.65} 
          color="white" 
          anchorX="center" 
          fontWeight={800}
        >
          {name}
        </Text>
        
        {/* Tech Badge */}
        <group position={[0, 0.4, 0.1]}>
          <mesh>
            <planeGeometry args={[3.2, 0.5]} />
            <meshBasicMaterial color={accent} transparent opacity={0.15} />
          </mesh>
          <mesh position={[0, -0.25, 0.01]}>
            <planeGeometry args={[3.2, 0.04]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={4} />
          </mesh>
          <Text 
            fontSize={0.24} 
            color={accent} 
            anchorX="center" 
            anchorY="middle"
          >
            {tech.toUpperCase()}
          </Text>
        </group>

        <Text 
          position={[0, -0.7, 0.1]} 
          fontSize={0.28} 
          color={COLORS.SLATE_400} 
          anchorX="center" 
          maxWidth={5.4} 
          textAlign="center" 
          lineHeight={1.4}
        >
          {desc}
        </Text>
      </group>

      {/* Stand */}
      <mesh position={[0, -0.5, -0.1]}>
        <cylinderGeometry args={[0.04, 0.08, 3]} />
        <meshStandardMaterial color={COLORS.SLATE_700} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -1.9, -0.1]}>
         <sphereGeometry args={[0.4, 32, 32]} />
         <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={8} />
      </mesh>
    </SmartBillboard>
  )
}

export function ProjectsTrack({ startZ, data = [] }) {
  const lanes = useLanes()
  const projects = data.length > 0 ? data : [
    {
      name: "Campus.IO",
      tech: "MEAN Stack",
      desc: "A quiz-based web application, aimed at helping placement activities for students."
    },
    {
      name: "ChaseToThr33",
      tech: "Swift (iOS)",
      desc: "An ancient game similar to Tic-Tac-Toe developed for iOS devices."
    },
    {
      name: "Fighter Jet Game",
      tech: "OpenGL (C++)",
      desc: "A multiplayer shooting game application built using the OpenGL graphics library."
    }
  ]

  return (
    <group>
      <HighwaySign 
        position={[0, LAYOUT.BILLBOARD.SIGN_HEIGHT, startZ]} 
        title="PROJECTS" 
        subtext="TOP CASE STUDIES" 
        color={COLORS.ACCENT_TEAL} 
      />

      {projects.map((proj, i) => (
        <ProjectScreen 
          key={i}
          position={[i % 2 === 0 ? lanes.RIGHT : lanes.LEFT, 0, startZ - LAYOUT.SPACING.BILLBOARD_GAP - (i * LAYOUT.SPACING.BILLBOARD_GAP)]}
          name={proj.name}
          tech={proj.tech}
          desc={proj.desc}
        />
      ))}
      
      <HighwaySign 
        position={[0, LAYOUT.BILLBOARD.SIGN_HEIGHT, startZ - (projects.length * LAYOUT.SPACING.BILLBOARD_GAP) - LAYOUT.SPACING.SECTION_BUFFER]} 
        title="EXIT PROJECTS" 
        subtext="END OF ZONE" 
        color={COLORS.ACCENT_PINK} 
      />
    </group>
  )
}
