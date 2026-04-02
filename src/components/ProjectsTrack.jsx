import { Html, Text } from '@react-three/drei'

function ProjectScreen({ position, name, tech, desc, rotationY }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Holographic Frame */}
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[6.2, 4.2, 0.1]} />
        <meshStandardMaterial color="var(--accent-purple)" emissive="var(--accent-purple)" emissiveIntensity={2} wireframe />
      </mesh>
      
      {/* The Actual Content via 3D Text (Holographic look) */}
      <group position={[0, 2.2, 0.06]}>
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[5.8, 3.8]} />
          <meshStandardMaterial color="#0f172a" transparent opacity={0.8} />
        </mesh>
        
        <Text position={[0, 1.2, 0]} fontSize={0.7} color="white" anchorX="center" maxWidth={5} textAlign="center">
          {name}
        </Text>
        
        {/* Tech pill */}
        <mesh position={[0, 0.3, 0]}>
          <planeGeometry args={[3, 0.6]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.2} />
        </mesh>
        <Text position={[0, 0.3, 0.05]} fontSize={0.3} color="#8b5cf6" anchorX="center" anchorY="middle">
          {tech}
        </Text>

        <Text position={[0, -0.8, 0]} fontSize={0.35} color="white" anchorX="center" maxWidth={5.2} textAlign="center" lineHeight={1.5}>
          {desc}
        </Text>
      </group>

      {/* Stand with Glow */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.15, 3]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0, -1.9, 0]}>
         <sphereGeometry args={[0.5, 16, 16]} />
         <meshStandardMaterial color="var(--accent-purple)" emissive="var(--accent-purple)" emissiveIntensity={5} />
      </mesh>
    </group>
  )
}

export function ProjectsTrack({ startZ }) {
  const projects = [
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
      <Text position={[0, 6, startZ]} fontSize={2} color="#8b5cf6" anchorX="center" anchorY="bottom">
        Projects
      </Text>

      {projects.map((proj, i) => (
        <ProjectScreen 
          key={i}
          position={[i % 2 === 0 ? -6 : 6, 0, startZ - 5 - (i * 12)]}
          name={proj.name}
          tech={proj.tech}
          desc={proj.desc}
          rotationY={i % 2 === 0 ? 0.2 : -0.2}
        />
      ))}
    </group>
  )
}
