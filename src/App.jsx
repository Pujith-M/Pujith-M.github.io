import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { useKeyboard, ACTIONS, KEY_MAP } from './hooks/useKeyboard'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, useScroll, Html, BakeShadows, Environment, useGLTF } from '@react-three/drei'

// Configure Draco decoder path so useGLTF can decompress the optimized model
useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/')
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Perf } from 'r3f-perf'
import { Car } from './components/Car'
import { Hero3D } from './components/Hero3D'
import { CityChunk } from './components/CityEnvironment'
import { TIMELINE } from './config/timeline' 
import { COLORS } from './config/colors'
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

// ─── Wake-on-Input: Ignition + Sustain System ──────────────────────────────────
//
// Problem:  frameloop="demand" sleeps until something calls invalidate().
//           Keyboard events alone don’t wake R3F — only scroll does.
//
// Solution: Two-phase wake strategy:
//   ① IGNITION  — useEffect keydown listener calls invalidate() immediately,
//                  starting the first frame the moment a driving key is pressed.
//   ② SUSTAIN   — inside useFrame, keep calling invalidate() while velocity
//                  is above threshold, so the loop stays alive during
//                  acceleration and coasting (not just while key is held).
//
// Future-proof: KEY_MAP and ACTIONS are abstract. To add a Fighter Jet,
//  change only the consumer’s useFrame logic — not this input layer.
const DRIVE_MAX_SPEED = 1800  // px/s at full throttle
const DRIVE_ACCEL     = 7     // damp factor when accelerating
const DRIVE_DECEL     = 10    // damp factor when coasting to stop
const VELOCITY_EPSILON = 0.5  // dead-zone – stop jitter

function KeyboardDrive() {
  const scroll   = useScroll()
  const keys     = useKeyboard()
  const { invalidate } = useThree()
  const velocity = useRef(0)
  const hasWoken = useRef(false)

  // ① IGNITION — wake the sleeping frame loop the moment a driving key fires
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (KEY_MAP[e.code] || KEY_MAP[e.key]) invalidate()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [invalidate])

  useFrame((_state, delta) => {
    // ── 0. Clamp delta ───────────────────────────────────────────────────
    // frameloop="demand" keeps the R3F clock ticking while sleeping.
    // The first frame after wake-up has delta = total idle time (e.g. 5s).
    // Without clamping, velocity × delta would teleport the car across the
    // whole track in a single frame. Cap to 50ms (≡ 20fps minimum).
    const dt = Math.min(delta, 0.05)

    // ── 1. Sample input ─────────────────────────────────────────────────
    let input = 0
    if (keys.has(ACTIONS.MOVE_FORWARD))  input += 1
    if (keys.has(ACTIONS.MOVE_BACKWARD)) input -= 1

    // ── 2. Velocity with smooth damping (inertia / weight) ───────────────
    const targetVel  = input * DRIVE_MAX_SPEED
    const dampFactor = input !== 0 ? DRIVE_ACCEL : DRIVE_DECEL
    velocity.current = THREE.MathUtils.damp(
      velocity.current, targetVel, dampFactor, dt
    )


    // Dead-zone — fully stop to avoid fp jitter
    if (Math.abs(velocity.current) < VELOCITY_EPSILON && input === 0) {
      velocity.current = 0
    }

    // ── 3. Apply to scroll container ─────────────────────────────────
    if (velocity.current !== 0) {
      const target = scroll.el || scroll.fixed?.parentElement
      if (target) {
        target.scrollTop += velocity.current * dt

        // Wake interaction listener (hides overlay, signals first movement)
        if (!hasWoken.current && velocity.current > 0) {
          hasWoken.current = true
          window.dispatchEvent(new Event('wheel'))
        }
      }
    }

    // ② SUSTAIN — keep the frame loop alive while the car is in motion
    // or a key is still held. Loop naturally goes idle once velocity hits 0.
    if (input !== 0 || Math.abs(velocity.current) > VELOCITY_EPSILON) {
      invalidate()
    }
  })

  return null
}

// ─── GTA V Far Chase Camera ───────────────────────────────────────────────
// Spring-arm lerp for position + direct lookAt (reliable, no gimbal issues)
// Dynamic FOV expands when scrolling faster for a speed-rush feel.
const BASE_FOV      = 58    // resting FOV in degrees
const ARM_HEIGHT    = 4.5   // camera height above car
const ARM_DISTANCE  = 12.0  // camera distance behind car (+Z in our scene)
const LOOK_AHEAD_Z  = 8.0   // metres ahead of car the camera targets
const LOOK_AHEAD_Y  = 1.2   // look-at height (bonnet + road visible)
const POS_SPEED     = 5     // position lerp speed
const FOV_SPEED     = 3     // FOV lerp speed
const MAX_FOV_BOOST = 10    // max extra degrees at full scroll speed
const MAX_ARM_BOOST = 2.5   // extra pull-back distance at full speed

function CameraFollow() {
  const scroll = useScroll()

  // Pre-allocated to avoid GC pressure in the render loop
  const camPosTarget = useRef(new THREE.Vector3())
  const prevOffset   = useRef(0)
  const smoothVel    = useRef(0)

  useFrame((state, delta) => {
    const t    = scroll.offset
    const carZ = -t * TRACK_LENGTH

    // ── 1. Velocity tracking ──────────────────────────────────────────────
    const rawVel = (t - prevOffset.current) / Math.max(delta, 0.001)
    prevOffset.current = t
    smoothVel.current += (Math.abs(rawVel) - smoothVel.current) * (1 - Math.exp(-8 * delta))
    const speed = Math.min(smoothVel.current * TRACK_LENGTH, 1) // 0–1

    // ── 2. Dynamic FOV & arm extension ───────────────────────────────────
    const targetFOV   = BASE_FOV + speed * MAX_FOV_BOOST
    const dynDistance = ARM_DISTANCE + speed * MAX_ARM_BOOST
    state.camera.fov += (targetFOV - state.camera.fov) * (1 - Math.exp(-FOV_SPEED * delta))
    state.camera.updateProjectionMatrix()

    // ── 3. Spring-arm position lerp ───────────────────────────────────────
    // Camera sits BEHIND the car (+Z) and above it (+Y)
    camPosTarget.current.set(0, ARM_HEIGHT, carZ + dynDistance)
    state.camera.position.lerp(camPosTarget.current, 1 - Math.exp(-POS_SPEED * delta))

    // ── 4. Look-at — always point toward a spot ahead of the car ─────────
    // carZ - LOOK_AHEAD_Z is in front of the car (more negative Z = forward)
    state.camera.lookAt(0, LOOK_AHEAD_Y, carZ - LOOK_AHEAD_Z)
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
    <div style={{ width: '100vw', height: '100vh', background: COLORS.MIDNIGHT_BLUE, overflow: 'hidden' }} role="application" aria-label="Interactive portfolio drive">
      {showIntroLoader && (
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          background: `radial-gradient(circle at 50% 40%, ${COLORS.SLATE_900}, ${COLORS.MIDNIGHT_BLUE})`,
          display: 'grid',
          placeItems: 'center',
          pointerEvents: 'none'
        }}>
          <div style={{
            padding: '1rem 1.4rem',
            borderRadius: '14px',
            border: `1px solid ${COLORS.VIVID_CYAN}80`,
            background: COLORS.SLATE_950,
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
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))
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
        camera={{ position: [0, ARM_HEIGHT, ARM_DISTANCE], fov: BASE_FOV, near: 0.5, far: 800 }}
        gl={{ antialias: false, stencil: false, powerPreference: 'high-performance' }}
        onCreated={() => setSceneReady(true)}
      >
        {isDebugMode && <Perf position="top-left" />}
        {/* Atmosphere & Lighting */}
        <color attach="background" args={[COLORS.MIDNIGHT_BLUE]} />
        <fog attach="fog" args={[COLORS.MIDNIGHT_BLUE, 15, 60]} />
        
        <ambientLight intensity={1.5} />
        <Environment preset="city" />
        <directionalLight position={[10, 30, 20]} intensity={3.5} color={COLORS.ELECTRIC_PURPLE} castShadow />
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
            <Suspense fallback={<SceneLoader />}>
              <Car trackLength={TRACK_LENGTH} />
            </Suspense>
            
            {/* Tracks are now managed by TrackManager inside CameraFollow for culling */}
            
          </group>

        </ScrollControls>
      </Canvas>
    </div>
  )
}

export default App
