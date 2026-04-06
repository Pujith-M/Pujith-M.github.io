# V2 UI Bug Cleanup & Layout Quality Roadmap

## Goal
Make the 3D portfolio visually clean and deterministic: no random misplaced elements, no overlapping content, no accidental clutter, and predictable placement across screen sizes.

## Quality Targets (Demo Gate)
- Zero obvious floating/misaligned artifacts in Hero → Contact flow.
- No billboard/sign overlap at supported breakpoints (mobile, tablet, desktop).
- Stable element placement between page refreshes.
- UI readability score >= 4/5 in internal QA checklist.

---

## Baseline Audit (Required First)
Capture and commit:
- 1 full-track video (desktop + mobile emulation)
- 10 annotated screenshots where layout issues appear
- Bug register with severity and reproduction steps in `docs/quality/ui-bug-baseline.md`

---

## 20 Bug-Fix Improvements (Problem, Acceptance, Approach)

### 1) Remove Runtime Random Placement in Render Path (P0)
- **Problem statement:** `Math.random()`/impure generation creates inconsistent object positions across renders.
- **Acceptance criteria:** Same scene seed produces identical layout on each refresh.
- **Approach:** Replace direct randomness with seeded generator or precomputed layout JSON.

### 2) Define Track Layout Grid System (P0)
- **Problem statement:** Objects are manually dropped without shared coordinate discipline.
- **Acceptance criteria:** All signs/billboards snap to documented grid lanes and offsets.
- **Approach:** Introduce lane constants (`LEFT_EDGE`, `RIGHT_EDGE`, `SAFE_MARGIN`, `Z_STEP`) and consume globally.

### 3) Content Spacing Contract Per Section (P0)
- **Problem statement:** Experience elements cluster too tightly and overlap.
- **Acceptance criteria:** Minimum Z-distance between major objects enforced (e.g., >= 14 units).
- **Approach:** Section layout schema with spacing rules validated at build/dev time.

### 4) Collision/Overlap Validation Utility (P0)
- **Problem statement:** No automatic way to detect visual collisions.
- **Acceptance criteria:** CI/dev check fails on bounding-box overlaps above threshold.
- **Approach:** Add geometry bounds checker for billboard/sign nodes.

### 5) Remove Unwanted Decorative Elements (P0)
- **Problem statement:** Unnecessary props add clutter and distract from experience timeline.
- **Acceptance criteria:** Approved prop whitelist used; all non-whitelisted items removed.
- **Approach:** Inventory current scene objects and prune low-value decorations.

### 6) Canonical Experience Timeline Schema (P0)
- **Problem statement:** Start/end/company blocks are not consistently modeled.
- **Acceptance criteria:** Every experience has `start`, `end`, `company`, `highlights[]`, and optional `ads[]`.
- **Approach:** Move data to strict schema and render components from schema only.

### 7) Deterministic Billboard Sequencing (P0)
- **Problem statement:** Work highlights/ads appear in inconsistent order.
- **Acceptance criteria:** Sequence follows timeline logic on every device/session.
- **Approach:** Implement stable sorter + explicit display order index.

### 8) Safe Camera Framing Rules (P0)
- **Problem statement:** Camera angles sometimes hide key content.
- **Acceptance criteria:** Primary sign/billboard remains inside safe viewport bounds while passing.
- **Approach:** Add camera look-ahead constraints and content-aware framing anchors.

### 9) Text Readability Pass (P0)
- **Problem statement:** Text occasionally becomes unreadable due to background contrast/size.
- **Acceptance criteria:** Minimum contrast + min font size met for all key text elements.
- **Approach:** Add typography tokens, contrast guardrails, and distance-aware text scaling.

### 10) Z-Fighting and Flicker Cleanup (P0)
- **Problem statement:** Coplanar surfaces flicker, making UI feel broken.
- **Acceptance criteria:** No visible z-fighting in walkthrough capture.
- **Approach:** Adjust geometry depth offsets, polygonOffset, and spacing between planes.

### 11) Responsive Placement Profiles (P1)
- **Problem statement:** One placement profile cannot fit all aspect ratios.
- **Acceptance criteria:** Separate mobile/tablet/desktop layout profiles selected automatically.
- **Approach:** Derive profile from viewport and use profile-based position maps.

### 12) Occlusion Rules for Foreground Props (P1)
- **Problem statement:** City props occlude important portfolio content.
- **Acceptance criteria:** Key content layers always render with priority visibility.
- **Approach:** Place important content in protected lanes and enforce occlusion budget.

### 13) Transition Timing Normalization (P1)
- **Problem statement:** Elements pop in/out abruptly and look random.
- **Acceptance criteria:** Uniform transition durations/easing by content type.
- **Approach:** Central animation timing tokens and section transition state machine.

### 14) Remove Legacy/Dead Components from Scene Tree (P1)
- **Problem statement:** Old elements still mount and create visual noise.
- **Acceptance criteria:** Scene tree contains only approved v2 components.
- **Approach:** Audit imports/usages and delete unused scene objects.

### 15) QA Toggle Layer (Debug Bounding Boxes & Labels) (P1)
- **Problem statement:** Hard to debug misplacement quickly.
- **Acceptance criteria:** Toggle shows bounds, IDs, lane markers, and spacing diagnostics.
- **Approach:** Add dev-only overlay for layout debugging.

### 16) Content Density Cap Per Segment (P1)
- **Problem statement:** Too many objects within short track segments overwhelms users.
- **Acceptance criteria:** Max objects per 50 Z-units enforced.
- **Approach:** Segment-level density rules and automatic overflow deferral.

### 17) Entry/Exit Marker Consistency (P1)
- **Problem statement:** Section boundaries are visually ambiguous.
- **Acceptance criteria:** Every section has consistent start/end signage style and spacing.
- **Approach:** Shared marker component with fixed placement contract.

### 18) Visual Design Tokens for 3D UI (P1)
- **Problem statement:** Inconsistent color/glow/material choices make UI feel noisy.
- **Acceptance criteria:** All UI surfaces use approved token palette/material presets.
- **Approach:** Centralize color/emissive/intensity tokens and refactor usages.

### 19) Regression Screenshot Suite (P2)
- **Problem statement:** Layout regressions are noticed late.
- **Acceptance criteria:** Baseline screenshots compared in PR checks for key checkpoints.
- **Approach:** Add deterministic camera checkpoints and image diff workflow.

### 20) UX Signoff Checklist + Release Gate (P2)
- **Problem statement:** No formal "clean UI" gate before release.
- **Acceptance criteria:** PR cannot merge without checklist completion for alignment/readability/clutter.
- **Approach:** Add PR template checklist and required reviewer signoff.

---

## Execution Plan (Demo First)
1. **Week 1:** Tasks 1–5, 10 (stability + clutter removal)
2. **Week 2:** Tasks 6–9, 11–13 (timeline correctness + readability + responsive behavior)
3. **Week 3:** Tasks 14–20 (hardening + regression control)

---

## Definition of Done (UI Cleanup)
- No random placements across refreshes.
- Experience flow is clear: company start → achievements/ads → company end.
- No overlapping critical UI elements.
- Reviewed and approved screenshots for mobile + desktop.
