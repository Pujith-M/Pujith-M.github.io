import { Suspense, lazy, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, useScroll, Float, BakeShadows } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Perf } from 'r3f-perf'
import { Car } from './components/Car'
import { Hero3D } from './components/Hero3D'
import { CityChunk } from './components/CityEnvironment'
import { TIMELINE } from './config/timeline' 
// validateTimeline is now called in the worker

// Total physical drive distance - Increased to 1200 based on validation audit
const TRACK_LENGTH = 1200
const isDebugMode = window.location.search.includes('debug=true')

// Lazy loaded heavy track components
const ExperienceTrack = lazy(() => import('./components/ExperienceTrack').then(module => ({ default: module.ExperienceTrack })))
const SkillsTrack = lazy(() => import('./components/SkillsTrack').then(module => ({ default: module.SkillsTrack })))
const ProjectsTrack = lazy(() => import('./components/ProjectsTrack').then(module => ({ default: module.ProjectsTrack })))
const ContactTrack = lazy(() => import('./components/ContactTrack').then(module => ({ default: module.ContactTrack })))

// Visibility constant: how many units ahead/behind to keep tracks mounted
const VISIBILITY_THRESHOLD = 150

function TrackManager({ scrollOffset }) {
  const currentZ = -scrollOffset * TRACK_LENGTH
  
  // Memoize filtered data to prevent re-filtering every frame
  const experienceData = useMemo(() => TIMELINE.filter(t => t.type === 'EXPERIENCE'), [])
  const skillsData = useMemo(() => TIMELINE.filter(t => t.type === 'SKILLS'), [])
  const projectsData = useMemo(() => TIMELINE.filter(t => t.type === 'PROJECTS'), [])

  return (
    <Suspense fallback={null}>
      {/* Hero is always at the start, Z = [0, -30] approx */}
      {currentZ > -150 && <Hero3D />}

      {/* Experience Track: Z = [-40, -370] */}
      {currentZ < 150 && currentZ > -550 && <ExperienceTrack startZ={-40} data={experienceData} />}

      {/* Skills Track: Z = [-430, -465] */}
      {currentZ < -250 && currentZ > -650 && <SkillsTrack startZ={-430} data={skillsData} />}

      {/* Projects Track: Z = [-470, -525] */}
      {currentZ < -350 && currentZ > -750 && <ProjectsTrack startZ={-470} data={projectsData} />}

      {/* Contact Track: Z = [-540, -550] */}
      {currentZ < -450 && <ContactTrack startZ={-540} />}
    </Suspense>
  )
}

// A wrapper component to make the camera follow the car
function CameraFollow() {
  const scroll = useScroll()
  
  // We use a persistent Vector3 to avoid creating objects in the render loop
  const targetVec = new THREE.Vector3()

  useFrame((state, delta) => {
    const currentScroll = scroll.offset
    const targetZ = -currentScroll * TRACK_LENGTH
    
    // GTA Vice City style POV: close behind and slightly above the car
    targetVec.set(0, 2.5, targetZ + 5)
    
    // Framerate-independent smoothing
    const lerpFactor = 1 - Math.exp(-5 * delta)
    state.camera.position.lerp(targetVec, lerpFactor)
    
    // Look ahead of the car, explicitly elevated to ensure tall highway signs stay safely in-frame bounds
    state.camera.lookAt(0, 3.5, targetZ - 20)
  })
  
  return <TrackManager scrollOffset={scroll.offset} />
}

function App() {
  // 1. Validate Timeline in a Web Worker (PERF-13)
  useEffect(() => {
    const worker = new Worker(new URL('./workers/validator.worker.js', import.meta.url), { type: 'module' });
    worker.postMessage({ timeline: TIMELINE });
    worker.onmessage = (e) => {
      const { warnings } = e.data;
      if (warnings && warnings.length > 0) {
        console.warn("Timeline Validation Warnings (Off-thread):", warnings);
      }
      worker.terminate();
    };
  }, [])

  // 2. Handle Keyboard Navigation (Arrows Up/Down)
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
        frameloop="demand"
        dpr={[1, 2]}
        camera={{ position: [0, 4, 10], fov: 60, near: 0.5, far: 800 }}
        gl={{ antialias: false, stencil: false, powerPreference: 'high-performance' }}
      >
        {isDebugMode && <Perf position="top-left" />}
        {/* Atmosphere & Lighting */}
        <color attach="background" args={['#030014']} />
        <fog attach="fog" args={['#030014', 15, 60]} />
        
        <ambientLight intensity={2} />
        <directionalLight position={[10, 30, 20]} intensity={3.5} color="#a78bfa" castShadow />
        <BakeShadows />
        
        {/* Post Processing for Neon Glow */}
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom 
            luminanceThreshold={1.2} 
            mipmapBlur={false} 
            resolutionScale={0.5}
            intensity={1.0} 
            radius={0.4} 
          />
        </EffectComposer>

        {/* The Realistic City Background Rendered in Chunks for LOD/Culling */}
        {Array.from({ length: Math.ceil(TRACK_LENGTH / 200) }).map((_, i) => {
          const startZ = -(i * 200)
          return (
            <group key={`chunk-${i}`}>
              <CityChunk startZ={startZ} length={200} seed={12345 + i} />
            </group>
          )
        })}
        {/* Increase pages to 50 to handle the full 1200 unit journey smoothly */}
        <ScrollControls pages={50} damping={0.15}>
          <CameraFollow />
          
          <group position={[0,0,0]}>
            <Car trackLength={TRACK_LENGTH} />
            
            {/* Tracks are now managed by TrackManager inside CameraFollow for culling */}
            
          </group>

        </ScrollControls>
      </Canvas>
    </div>
  )
}

export default App
