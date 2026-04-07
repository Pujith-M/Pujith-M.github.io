# Initial Page UI Improvement Audit (Top 10)

This audit focuses on the first-load hero scene for the 3D portfolio landing page.

## 1) Reduce duplicate hero headings that compete for attention
- **Cause:** The page currently renders the name/instruction in both a fixed HTML overlay and 3D text inside the scene, creating visual duplication and clutter.
- **How to fix:** Keep one primary heading system (preferably 3D for immersion, HTML for accessibility fallback), and demote the other to a subtle secondary layer.

## 2) Improve instruction clarity and hierarchy
- **Cause:** Guidance appears in multiple places with varying wording and styles, which adds cognitive load.
- **How to fix:** Use a single concise instruction near the focal point (for example: “Scroll to start • ↑/↓ also works”), then fade it out after first user interaction.

## 3) Prevent text overlap between title, subtitle, and geometry
- **Cause:** 3D text sits close to environmental objects and profile card planes, causing overlap and reduced readability from some camera angles.
- **How to fix:** Increase depth spacing between headline and nearby meshes, reserve a “safe typography zone” in front of camera, and test at common viewport widths.

## 4) Increase subtitle contrast against dark/complex backgrounds
- **Cause:** Thin blue subtitle text is rendered over changing dark gradients and scene elements, making it hard to read.
- **How to fix:** Raise contrast using brighter text color, stronger outline/shadow, slightly larger weight/size, and optional translucent backing strip.

## 5) Introduce a clear call-to-action panel on first screen
- **Cause:** The page is visually rich but lacks a clear first-action hotspot (e.g., “Start journey” / “View resume”).
- **How to fix:** Add a compact CTA cluster in the initial viewport with 1 primary action and 1 secondary action.

## 6) Soften aggressive bloom/glow to improve legibility
- **Cause:** Post-processing bloom can make neon edges and text halos bleed, especially on high-DPI displays.
- **How to fix:** Reduce bloom intensity/radius, tune threshold, and gate stronger effects behind user preference or high-performance mode.

## 7) Improve mobile/responsive composition for hero elements
- **Cause:** Fixed top overlay positioning and 3D object layout may not adapt tightly to small screens, causing crowding.
- **How to fix:** Add responsive breakpoints for hero text size, card position, and camera framing; simplify scene density on narrow viewports.

## 8) Add accessible interaction alternatives and discoverability
- **Cause:** Experience relies mainly on scroll/arrows; users may miss controls or use assistive technology.
- **How to fix:** Add visible “Use keyboard / drag / tap” hints, skip button, and semantic HTML fallback content for screen readers.

## 9) Reduce initial loader dwell and perceived waiting
- **Cause:** Intro loader appears for a fixed duration even when content may already be ready.
- **How to fix:** Remove fixed wait where possible; tie loader dismissal to readiness signals and add progress feedback when assets are actually loading.

## 10) Add depth cues and landmark wayfinding early in the road
- **Cause:** First scene lacks clear near-term destination markers, so motion purpose can feel abstract.
- **How to fix:** Add subtle lane markers, distance indicators, and first destination signage (“Experience in 50m”) to guide progression.

---

## Prioritization (Quick wins first)
1. De-duplicate headings/instructions (Items 1–2)
2. Fix text overlap + contrast (Items 3–4)
3. Add CTA + wayfinding cues (Items 5 + 10)
4. Tune bloom/responsiveness/accessibility (Items 6–8)
5. Loader behavior improvement (Item 9)
