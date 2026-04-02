# Pujith M — Interactive 3D Portfolio

A personal portfolio website built as an **immersive 3D driving experience**. A Mahindra Thar-style car drives through a neon-lit city as the user scrolls, revealing different sections of the portfolio — experience, skills, projects, and contact info — displayed on highway signs and billboards along the road.

🌐 **Live site:** [pujith-m.github.io](https://pujith-m.github.io)

---

## ✨ Features

- **Scroll-to-Drive Mechanic** — Scrolling the page (or pressing ↑ / ↓ arrow keys) moves the car forward along a 600-unit virtual track.
- **GTA Vice City-style Camera** — A smooth third-person camera follows closely behind the car and looks ahead down the road.
- **Neon Cyberpunk Aesthetic** — Deep-space dark background with bloom post-processing for glowing neon lights and emissive materials.
- **3D City Environment** — Procedurally placed buildings, street lights, and road markings line the track.
- **Billboard & Highway Sign UI** — Portfolio content is displayed as in-world 3D objects rather than flat HTML:
  - Giant highway signs mark the entry and exit of each section.
  - Alternating side billboards present job responsibilities and project details.
  - Floating octahedron nodes display skill categories.
  - Holographic screens showcase project cards.

---

## 🗺️ Portfolio Sections (Zones on the Track)

| Zone | Start Z | Content |
|------|---------|---------|
| **Hero** | `0` | Floating name title + profile card |
| **Experience** | `-40` | Unmarshal → Navi Technologies → MavenHive |
| **Skills** | `-430` | Core Languages, Web3 & Blockchain, Tools & Frameworks |
| **Projects** | `-470` | Campus.IO, ChaseToThr33, Fighter Jet Game |
| **Contact** | `-540` | Email, phone, education + glowing exit gate |

---

## 🛠️ Tech Stack

| Category | Libraries |
|----------|-----------|
| Framework | React 19, Vite |
| 3D Rendering | Three.js, @react-three/fiber, @react-three/drei |
| Post-Processing | @react-three/postprocessing (Bloom) |
| Animation | Framer Motion |
| Icons | react-icons |
| Linting | ESLint |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Opens the app at `http://localhost:5173` with hot module replacement.

### Production Build

```bash
npm run build
```

Output is placed in the `dist/` folder, ready to be deployed to GitHub Pages or any static host.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## 📁 Project Structure

```
src/
├── main.jsx                  # React entry point
├── App.jsx                   # Root component — Canvas setup, ScrollControls, CameraFollow
├── App.css / index.css       # Global styles & CSS variables (accent colours)
└── components/
    ├── Car.jsx               # Mahindra Thar 3D model + wheel/scroll animation
    ├── CityEnvironment.jsx   # Procedural city backdrop (buildings, lights, road)
    ├── Hero3D.jsx            # Floating intro title + profile card
    ├── ExperienceTrack.jsx   # Highway signs + side billboards for work history
    ├── SkillsTrack.jsx       # Floating octahedron skill nodes
    ├── ProjectsTrack.jsx     # Holographic project screens
    └── ContactTrack.jsx      # End-of-road contact billboard + glowing exit gate
```

---

## 🎮 Controls

| Input | Action |
|-------|--------|
| Mouse Wheel / Trackpad | Drive forward / backward |
| ↑ Arrow Key | Drive forward |
| ↓ Arrow Key | Drive backward |

---


## 📈 V2 Performance Planning

- Roadmap with 20 scale-focused performance improvements: `docs/performance/v2-performance-roadmap.md`
- Repo-native tracker sheet: `docs/performance/task-tracker.md`
- Issue template for each task: `.github/ISSUE_TEMPLATE/performance-task.md`

## 👤 About

**Pujith M** — Senior Software Engineer & Blockchain Expert based in Bengaluru.

- 📧 pujithcareerventure@gmail.com
- 📱 +91 9741283118
- 🎓 Computer Science Engineering, SJB Institute of Technology (2014–2018)
