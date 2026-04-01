import { Html, Text } from '@react-three/drei'

function ProjectScreen({ position, name, tech, desc, rotationY }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 2, 0]}>
        {/* TV Screen Mesh */}
        <boxGeometry args={[6, 4, 0.2]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      
      {/* The Actual Content via HTML Overlay */}
      <Html transform position={[0, 2, 0.11]} distanceFactor={10}>
        <div style={{
          width: '560px',
          height: '360px',
          background: 'var(--bg-color)',
          border: '2px solid var(--accent-purple)',
          borderRadius: '8px',
          padding: '24px',
          color: 'white',
          boxSizing: 'border-box'
        }}>
          <h2 style={{ color: 'var(--accent-purple)', marginTop: 0, fontSize: '1.8rem' }}>{name}</h2>
          <h4 style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>{tech}</h4>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>{desc}</p>
        </div>
      </Html>

      {/* Stand */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.4, 2]} />
        <meshStandardMaterial color="#334155" />
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
