import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, useScroll } from '@react-three/drei'
import { Car } from './components/Car'
import { Hero3D } from './components/Hero3D'
import { ExperienceTrack } from './components/ExperienceTrack'
import { SkillsTrack } from './components/SkillsTrack'
import { ProjectsTrack } from './components/ProjectsTrack'
import { ContactTrack } from './components/ContactTrack'
import { CityEnvironment } from './components/CityEnvironment'

// Total physical drive distance
const TRACK_LENGTH = 600

// A wrapper component to make the camera follow the car
function CameraFollow() {
  const scroll = useScroll()
  
  useFrame((state) => {
    const currentScroll = scroll.offset
    const targetZ = -currentScroll * TRACK_LENGTH
    
    // We place the camera behind and slightly above the car
    state.camera.position.z = targetZ + 10
    state.camera.position.y = 4
    state.camera.position.x = 0
    state.camera.lookAt(0, 0, targetZ - 10) // Look ahead of the car
  })
  
  return null
}

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0b0f19', overflow: 'hidden' }}>
      
      {/* HTML Overlay Intros */}
      <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          pointerEvents: 'none',
          textAlign: 'center'
      }}>
         <h1 className="gradient-text" style={{ fontSize: '2rem', margin: 0 }}>Pujith M</h1>
         <p style={{ margin: 0, color: 'var(--text-muted)' }}>Scroll to Drive</p>
      </div>

      <Canvas camera={{ position: [0, 4, 10], fov: 60 }}>
        {/* Environment & Lighting */}
        <ambientLight intensity={2.5} />
        <directionalLight position={[10, 20, 10]} intensity={3} color="#ffffff" />
        
        <color attach="background" args={['#0b0f19']} />

        {/* The Realistic City Background */}
        <CityEnvironment length={TRACK_LENGTH} />

        {/* Increase pages heavily to handle the huge 600 unit distance smoothly */}
        <ScrollControls pages={25} damping={0.15}>
          <CameraFollow />
          
          <group position={[0,0,0]}>
            <Car trackLength={TRACK_LENGTH} />
            
            {/* The Zones */}
            <Hero3D />                               {/* Z = 0 */}
            
            {/* Experience Track takes up ~330 units */}
            <ExperienceTrack startZ={-40} />
            
            <SkillsTrack startZ={-430} />
            
            <ProjectsTrack startZ={-470} />

            <ContactTrack startZ={-540} />
            
          </group>

        </ScrollControls>
      </Canvas>
    </div>
  )
}

export default App
