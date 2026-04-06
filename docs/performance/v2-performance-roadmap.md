# V2 Performance Roadmap (Staff-Engineer Plan)

## Goal
Build a **demoable** 3D portfolio web app where users "drive" through experience timelines while keeping performance high enough to scale to more content, more devices, and longer tracks.

## Target Outcomes
- Reach **10x practical performance improvement** on mid-tier laptops/phones vs current baseline (or max feasible gains where hardware bound).
- Keep interaction smooth under load:
  - p95 frame time <= 16.7ms on desktop (60 FPS target)
  - p95 frame time <= 33ms on mobile (30 FPS target)
  - LCP <= 2.5s on 4G for first meaningful scene
  - Main-thread blocking time <= 200ms during first 10s

---

## Baseline First (Required)
Before implementing optimizations, measure current state and store results in `docs/performance/baseline-metrics.md`.

Suggested metrics:
- FPS (avg/p95)
- frame time (avg/p95)
- JS heap usage
- draw calls
- triangle count
- bundle size (initial JS + assets)

---

## 20 Improvement Tasks

> Each task includes **problem statement**, **acceptance criteria**, and **approach** so it can be directly copied into issues.

### 1) Performance Budget + CI Guardrails (P0)
- **Problem statement:** There is no hard budget, so regressions can ship unnoticed.
- **Acceptance criteria:** Build fails in CI if JS bundle, FPS synthetic checks, or asset budgets exceed thresholds.
- **Approach:** Add budget file (`docs/performance/perf-budget.json`), automated checks in CI, and a perf summary artifact per PR.

### 2) Render-on-Demand Instead of Always-On Loop (P0)
- **Problem statement:** Continuous rendering wastes CPU/GPU when scene is idle.
- **Acceptance criteria:** Idle GPU usage drops by >= 60% with no visible stutter on interaction.
- **Approach:** Switch to demand-driven invalidation for static frames; render continuously only while scrolling/animation is active.

### 3) Aggressive Geometry Instancing for Repeated Props (P0)
- **Problem statement:** Repeated buildings/lights create excessive draw calls.
- **Acceptance criteria:** Draw calls reduced by >= 70% in city sections.
- **Approach:** Convert repeated meshes to `InstancedMesh` (buildings, poles, lane markers, decorative props).

### 4) Track Chunking + Frustum Culling (P0)
- **Problem statement:** Entire track remains live even when off-screen.
- **Acceptance criteria:** Only nearby chunks are mounted/rendered; memory usage drops >= 35%.
- **Approach:** Split track into Z-axis chunks; mount window around player position; cull out-of-frustum groups.

### 5) Distance-Based LOD System (P0)
- **Problem statement:** Far assets are rendered with unnecessary complexity.
- **Acceptance criteria:** Triangle count reduced >= 50% with no noticeable visual loss in user tests.
- **Approach:** Implement 3-level LOD for buildings, billboards, and car details based on camera distance.

### 6) Adaptive Device Quality Tiering (P0)
- **Problem statement:** Same quality pipeline is applied to all devices.
- **Acceptance criteria:** App auto-selects quality tier (low/medium/high) and keeps FPS target per tier.
- **Approach:** Detect device class (DPR, cores, memory hint, GPU renderer where possible) and set shadows, bloom, DPR, and draw distance accordingly.

### 7) Dynamic DPR Controller (P0)
- **Problem statement:** Fixed DPR causes frame drops on high-DPR screens.
- **Acceptance criteria:** Frame-time spikes reduced by >= 40% on retina/mobile devices.
- **Approach:** Monitor frame time and adapt DPR between min/max bounds in real-time.

### 8) Replace Expensive Real-Time Lighting with Baked/Hybrid Lighting (P0)
- **Problem statement:** Real-time lights and shadows are GPU-heavy.
- **Acceptance criteria:** Lighting render cost reduced >= 50% in GPU profile.
- **Approach:** Bake static lighting into textures/lightmaps; keep minimal dynamic lights for car and hero accents.

### 9) Post-Processing Optimization (Bloom/Effects) (P0)
- **Problem statement:** Full-resolution bloom heavily taxes GPU.
- **Acceptance criteria:** Post-processing cost <= 2ms/frame desktop and <= 5ms/frame mobile tier.
- **Approach:** Lower bloom resolution, clamp threshold, and enable effect only in priority zones.

### 10) Texture Compression + Resolution Strategy (P0)
- **Problem statement:** Uncompressed or oversized textures inflate memory and load time.
- **Acceptance criteria:** Texture memory reduced >= 60%; no severe visual artifacts.
- **Approach:** Use KTX2/Basis compressed textures, mipmaps, and per-asset max dimension policy.

### 11) GLTF/Asset Pipeline Optimization (P0)
- **Problem statement:** 3D assets may include unused nodes/materials/animations.
- **Acceptance criteria:** 3D asset payload reduced >= 40%.
- **Approach:** Run `gltf-transform` optimization (prune, quantize, meshopt, texture resize) in a scripted pipeline.

### 12) Route/Section Lazy Loading (P1)
- **Problem statement:** All sections load upfront though user sees only beginning first.
- **Acceptance criteria:** Initial JS and model payload reduced >= 35%.
- **Approach:** Lazy-load section content (Experience/Skills/Projects/Contact) based on scroll progression with prefetch window.

### 13) Web Worker for Timeline/Content Preparation (P1)
- **Problem statement:** Data shaping and layout work can block main thread.
- **Acceptance criteria:** Main-thread long tasks (>50ms) reduced by >= 50% during startup.
- **Approach:** Move heavy, non-render computations (content sequencing, billboard placement plans) into worker.

### 14) Collision-Free Content Streaming Contract (P1)
- **Problem statement:** Ad-hoc content loading can cause jank and race conditions at scale.
- **Acceptance criteria:** No visible pop-in within 2 chunks ahead; no duplicate loads in logs.
- **Approach:** Define deterministic loader state machine (prefetch, activate, retire) keyed by chunk IDs.

### 15) Memory Leak Detection + Auto Cleanup (P1)
- **Problem statement:** Detached geometries/materials/textures can leak over long sessions.
- **Acceptance criteria:** Heap usage stabilizes after 10-minute navigation soak test.
- **Approach:** Introduce cleanup utilities and dev-only leak checker for undisposed Three.js resources.

### 16) React Render Minimization in 3D Tree (P1)
- **Problem statement:** Unnecessary React re-renders can stall animation frames.
- **Acceptance criteria:** Re-render count for stable nodes drops >= 80% during scroll.
- **Approach:** Memoize static nodes, avoid prop churn, and isolate rapidly changing state in refs/store.

### 17) Car Motion/Camera Integrator Smoothing (P1)
- **Problem statement:** Scroll events can create bursty updates and micro-stutter.
- **Acceptance criteria:** Camera jitter incidents disappear in QA playback captures.
- **Approach:** Use fixed-step interpolation/extrapolation and velocity smoothing; decouple input sampling from render update.

### 18) CDN + Immutable Caching Strategy (P1)
- **Problem statement:** Repeat visits still fetch large static assets unnecessarily.
- **Acceptance criteria:** Repeat-visit transfer size reduced by >= 80%.
- **Approach:** Cache-busted hashed assets with long-lived immutable headers; HTML short TTL.

### 19) Real User Monitoring (RUM) + Telemetry Dashboard (P2)
- **Problem statement:** No production insight into real-device performance.
- **Acceptance criteria:** Dashboard shows FPS, long tasks, memory trend, and load time by device tier.
- **Approach:** Add lightweight client telemetry sampling and aggregate into hosted dashboard.

### 20) Scene Scalability Test Harness (P2)
- **Problem statement:** No repeatable way to test growth (2x/5x/10x content).
- **Acceptance criteria:** Automated test scene can scale entities and report breakpoints.
- **Approach:** Build synthetic generator for billboards/buildings/nodes and run scripted perf sweeps in CI/nightly.

---

## Suggested Execution Order (Demo First)
1. Tasks 1, 2, 3, 6, 7, 9, 12 (fastest impact for demoability)
2. Tasks 4, 5, 8, 10, 11 (core engine efficiency)
3. Tasks 13-20 (scale hardening)

---

## Definition of Done for V2 Demo
- Smooth drive experience on desktop + mid-tier phone.
- At least 3 experience entries with start/end markers and in-between ad-style billboards.
- Quality tier fallback prevents hard stutter.
- Baseline + post-optimization performance report committed in repo.
