import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, useScroll, Html, BakeShadows, Environment } from '@react-three/drei'
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

const TRACK_STARTS = {
  EXPERIENCE: -40,
  SKILLS: -560,
  PROJECTS: -710,
  CONTACT: -880
}

function SceneLoader() {
  return (
    <Html center>
      <div style={{
        padding: '0.9rem 1.2rem',
        border: '1px solid rgba(59,130,246,0.6)',
        borderRadius: '12px',
        background: 'rgba(2,6,23,0.75)',
        color: '#e2e8f0',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontSize: '0.8rem'
      }}>
        Loading journey...
      </div>
    </Html>
  )
}

function TrackManager({ scrollOffset }) {
  const currentZ = -scrollOffset * TRACK_LENGTH
  
  // Memoize filtered data to prevent re-filtering every frame
  const experienceData = useMemo(() => TIMELINE.filter(t => t.type === 'EXPERIENCE'), [])
  const skillsData = useMemo(() => TIMELINE.filter(t => t.type === 'SKILLS'), [])
  const projectsData = useMemo(() => TIMELINE.filter(t => t.type === 'PROJECTS'), [])

  return (
    <Suspense fallback={<SceneLoader />}>
      {/* Hero is always at the start, Z = [0, -30] approx */}
      {currentZ > -150 && <Hero3D isMobile={window.innerWidth < 768} />}

      {/* Experience Track: Z = [-40, -370] */}
      {currentZ < 150 && currentZ > -650 && <ExperienceTrack startZ={TRACK_STARTS.EXPERIENCE} data={experienceData} />}

      {/* Skills Track: starts after experience */}
      {currentZ < -320 && currentZ > -850 && <SkillsTrack startZ={TRACK_STARTS.SKILLS} data={skillsData} />}

      {/* Projects Track: starts after skills */}
      {currentZ < -470 && currentZ > -980 && <ProjectsTrack startZ={TRACK_STARTS.PROJECTS} data={projectsData} />}

      {/* Contact Track: end sequence */}
      {currentZ < -650 && <ContactTrack startZ={TRACK_STARTS.CONTACT} />}
    </Suspense>
  )
}

function KeyboardDrive() {
  const scroll = useScroll()

  useEffect(() => {
    const step = 180
    const handleKeyDown = (e) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return
      e.preventDefault()
      const direction = e.key === 'ArrowDown' ? 1 : -1
      const target = scroll.el ?? scroll.fixed?.parentElement
      target?.scrollBy({ top: direction * step, behavior: 'smooth' })
    }

    window.addEventListener('keydown', handleKeyDown, { passive: false })
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [scroll])

  return null
}

// A wrapper component to make the camera follow the car
function CameraFollow() {
  const scroll = useScroll()
  
  // We use a persistent Vector3 to avoid creating objects in the render loop
  const targetVec = new THREE.Vector3()

  useFrame((state, delta) => {
    const currentScroll = scroll.offset
    const targetZ = -currentScroll * TRACK_LENGTH
    
    // Elevated and pulled-back POV for better road & sign visibility
    targetVec.set(0, 3.6, targetZ + 7.2)
    
    // Framerate-independent smoothing
    const lerpFactor = 1 - Math.exp(-5 * delta)
    state.camera.position.lerp(targetVec, lerpFactor)
    
    // Look ahead of the car, explicitly elevated to ensure tall highway signs stay safely in-frame bounds
    state.camera.lookAt(0, 4.4, targetZ - 22)
  })
  
  return <TrackManager scrollOffset={scroll.offset} />
}

function App() {
  const [showIntroLoader, setShowIntroLoader] = useState(true)
  const [sceneReady, setSceneReady] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setIsReducedMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

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

  useEffect(() => {
    if (!sceneReady) return
    const timer = window.setTimeout(() => setShowIntroLoader(false), 300)
    return () => window.clearTimeout(timer)
  }, [sceneReady])

  useEffect(() => {
    const onInteract = () => setHasInteracted(true)
    window.addEventListener('wheel', onInteract, { passive: true })
    window.addEventListener('keydown', onInteract)
    window.addEventListener('pointerdown', onInteract)
    return () => {
      window.removeEventListener('wheel', onInteract)
      window.removeEventListener('keydown', onInteract)
      window.removeEventListener('pointerdown', onInteract)
    }
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#030014', overflow: 'hidden' }} role="application" aria-label="Interactive portfolio drive">
      {showIntroLoader && (
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          background: 'radial-gradient(circle at 50% 40%, rgba(30,41,59,0.45), rgba(3,0,20,0.95))',
          display: 'grid',
          placeItems: 'center',
          pointerEvents: 'none'
        }}>
          <div style={{
            padding: '1rem 1.4rem',
            borderRadius: '14px',
            border: '1px solid rgba(59,130,246,0.5)',
            background: 'rgba(2,6,23,0.75)',
            color: '#e2e8f0',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontSize: '0.78rem'
          }}>
            Starting engine...
          </div>
        </div>
      )}
      
      {/* HTML Overlay Intro */}
      <div className="hero-overlay" aria-live="polite">
        <h1 className="gradient-text hero-title">Pujith M</h1>
        <p className="hero-subtitle">Senior Software Engineer • Blockchain Expert</p>
        {!hasInteracted && <p className="hero-instruction">Scroll to start • ↑ / ↓ also works</p>}
        <div className="hero-cta-group">
          <a className="hero-cta hero-cta-primary" href="/resume.pdf" target="_blank" rel="noreferrer">
            View Resume
          </a>
          <button
            className="hero-cta hero-cta-secondary"
            onClick={() => {
              setHasInteracted(true)
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
            }}
            type="button"
          >
            Start Journey
          </button>
          <a className="hero-cta hero-cta-secondary" href="mailto:pujithcareerventure@gmail.com">
            Contact
          </a>
        </div>
      </div>

      <Canvas 
        shadows 
        frameloop="demand"
        dpr={[1, 2]}
        camera={{ position: [0, 5, 13], fov: 58, near: 0.5, far: 800 }}
        gl={{ antialias: false, stencil: false, powerPreference: 'high-performance' }}
        onCreated={() => setSceneReady(true)}
      >
        {isDebugMode && <Perf position="top-left" />}
        {/* Atmosphere & Lighting */}
        <color attach="background" args={['#030014']} />
        <fog attach="fog" args={['#030014', 15, 60]} />
        
        <ambientLight intensity={1.5} />
        <Environment preset="city" />
        <directionalLight position={[10, 30, 20]} intensity={3.5} color="#a78bfa" castShadow />
        <BakeShadows />
        
        {/* Post Processing for Neon Glow */}
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom 
            luminanceThreshold={1.28} 
            mipmapBlur={false} 
            resolutionScale={0.5}
            intensity={isReducedMotion ? 0.45 : 0.78} 
            radius={isReducedMotion ? 0.22 : 0.3} 
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
          <KeyboardDrive />
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
