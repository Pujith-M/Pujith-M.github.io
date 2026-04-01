import { Html, Text } from '@react-three/drei'
import { FaEnvelope, FaPhone, FaLink } from 'react-icons/fa'

export function ContactTrack({ startZ }) {
  return (
    <group position={[0, 0, startZ]}>
      {/* End of Road Sign */}
      <Text position={[0, 4, 0]} fontSize={2} color="#f43f5e" anchorX="center" anchorY="bottom">
        END OF THE ROAD
      </Text>

      <Html transform position={[0, 1.5, 2]} distanceFactor={10}>
        <div style={{
          width: '600px',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--glass-border)',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          color: 'var(--text-main)',
          fontFamily: 'Inter, sans-serif'
        }}>
          <h2 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0' }}>SJB Institute of Technology</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Computer Science Engineering | 2014-2018</p>
          
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '2rem 0' }} />
          
          <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-teal)' }}>Let's Connect</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginTop: '1.5rem' }}>
            <a href="mailto:pujithcareerventure@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', color: 'var(--text-main)', textDecoration: 'none' }}>
              <FaEnvelope color="var(--accent-teal)" /> pujithcareerventure@gmail.com
            </a>
            <a href="tel:+919741283118" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', color: 'var(--text-main)', textDecoration: 'none' }}>
              <FaPhone color="var(--accent-blue)" /> +91 9741283118
            </a>
            <a href="https://unmarshal.io/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', color: 'var(--text-main)', textDecoration: 'none' }}>
              <FaLink color="var(--accent-purple)" /> Current Project: Unmarshal
            </a>
          </div>
        </div>
      </Html>
      
      {/* Wall block / portal at the end */}
      <mesh position={[0, 5, -2]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.8} />
      </mesh>
    </group>
  )
}
