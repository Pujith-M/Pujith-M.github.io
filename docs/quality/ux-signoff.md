# UX Signoff Checklist: 3D Interactive Portfolio

This checklist ensures the experience meets high-quality standards for a professional 3D portfolio.

## 1. Visual Consistency
- [ ] **Neon Aesthetic**: Bloom intensity is consistent across all zones.
- [ ] **Typography**: Font sizes and weights are identical across billboards.
- [ ] **Lighting**: No "pitch black" areas except where intentional (off-road background).
- [ ] **Colors**: Brand colors (Blue/Magenta/Teal) are used correctly for their respective zones.

## 2. Performance & Stability
- [ ] **FPS**: Maintains 60fps on desktop (with standard dedicated GPU).
- [ ] **Jitter**: No stuttering when crossing chunk boundaries.
- [ ] **Memory**: Heap usage remains stable after 5 minutes of usage.
- [ ] **Mobile**: No clipping or layout brokenness on iOS/Android portrait mode.

## 3. Interaction & Navigation
- [ ] **Scroll Logic**: Car moves only when the user scrolls or interacts.
- [ ] **Keyboard**: Arrow keys Up/Down navigate smoothly.
- [ ] **Loading**: Falling into the track doesn't show "emptiness" (TrackManager stages correctly).

## 4. Content Integrity
- [ ] **Data-Driven**: Changes in `timeline.js` reflect accurately in 3D.
- [ ] **Density**: No more than 3 billboards per segment (clutter-free).
- [ ] **Occlusion**: Billboard text is readable from at least 15 units away without blockage from props.

## 5. Technical Rigor
- [ ] **Clean Build**: `npm run build` completes without errors or severe warnings.
- [ ] **Validation**: `validator.js` throws ZERO warnings for the production data.

---
**Signed off by**: [Your Name/Reviewer]
**Date**: 2026-04-02
