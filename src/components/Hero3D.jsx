import { Html, Text } from '@react-three/drei'

export function Hero3D() {
  return (
    <group position={[0, 0, 0]}>
      {/* 3D Intro Text */}
      <Text 
        position={[0, 4, -2]} 
        fontSize={1.2} 
        color="#f8fafc" 
        anchorX="center" 
        anchorY="middle"
      >
        Pujith M
      </Text>
      
      <Text 
        position={[0, 2.5, -2]} 
        fontSize={0.5} 
        color="#3b82f6" 
        anchorX="center" 
        anchorY="middle"
      >
        Senior Software Engineer | Blockchain Expert
      </Text>

      {/* Interactive HTML Card attached to the start point */}
      <Html transform position={[4, 1.5, -5]} rotation={[0, -0.3, 0]} distanceFactor={8}>
        <div className="glass-panel" style={{ width: '300px', textAlign: 'center' }}>
          <img src="/PUJITH.jpeg" alt="Pujith M" style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '1rem', border: '3px solid var(--accent-blue)' }} />
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Bengaluru | Web3 Enthusiast
          </p>
          <a href="/resume.pdf" target="_blank" style={{ 
            display: 'inline-block', 
            marginTop: '1rem', 
            padding: '10px 20px', 
            background: 'rgba(59, 130, 246, 0.2)', 
            border: '1px solid var(--accent-blue)', 
            borderRadius: '8px',
            color: 'white',
            textDecoration: 'none'
          }}>
            Download Resume
          </a>
        </div>
      </Html>
    </group>
  )
}
