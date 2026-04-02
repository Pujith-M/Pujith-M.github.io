import { useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, useScroll, Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Car } from './components/Car'
import { Hero3D } from './components/Hero3D'
import { ExperienceTrack } from './components/ExperienceTrack'
import { SkillsTrack } from './components/SkillsTrack'
import { ProjectsTrack } from './components/ProjectsTrack'
import { ContactTrack } from './components/ContactTrack'
import { CityEnvironment } from './components/CityEnvironment'

// Total physical drive distance
const TRACK_LENGTH = 600

import * as THREE from 'three'

// A wrapper component to make the camera follow the car
function CameraFollow() {
  const scroll = useScroll()
  
  // We use a persistent Vector3 to avoid creating objects in the render loop
  const targetVec = new THREE.Vector3()

  useFrame((state) => {
    const currentScroll = scroll.offset
    const targetZ = -currentScroll * TRACK_LENGTH
    
    // GTA Vice City style POV: close behind and slightly above the car
    targetVec.set(0, 2.5, targetZ + 5)
    
    // Smoothly follow the car
    state.camera.position.lerp(targetVec, 0.1)
    
    // Look ahead of the car, looking down slightly directly ahead
    state.camera.lookAt(0, 1.5, targetZ - 20)
  })
  
  return null
}

function App() {
  // Handle Keyboard Navigation (Arrows Up/Down)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -100, behavior: 'smooth' })
      } else if (e.key === 'ArrowDown') {
        window.scrollBy({ top: 100, behavior: 'smooth' })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#030014', overflow: 'hidden' }}>
      
      {/* HTML Overlay Intros */}
      <div style={{
          position: 'absolute',
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          pointerEvents: 'none',
          textAlign: 'center'
      }}>
         <h1 className="gradient-text" style={{ fontSize: '2.5rem', margin: 0 }}>Pujith M</h1>
         <p style={{ margin: '5px 0 0 0', color: 'var(--text-muted)', fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
           Scroll or Use ↑ ↓ Arrows to Drive
         </p>
      </div>

      <Canvas 
        shadows 
        camera={{ position: [0, 4, 10], fov: 60 }}
        gl={{ antialias: false, stencil: false }}
      >
        {/* Atmosphere & Lighting */}
        <color attach="background" args={['#030014']} />
        <fog attach="fog" args={['#030014', 15, 60]} />
        
        <ambientLight intensity={2} />
        <directionalLight position={[10, 30, 20]} intensity={3.5} color="#a78bfa" castShadow />
        
        {/* Post Processing for Neon Glow */}
        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={1.2} 
            mipmapBlur 
            intensity={1.0} 
            radius={0.4} 
          />
        </EffectComposer>

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
