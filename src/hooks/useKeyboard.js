/**
 * useKeyboard — Singleton Game-Loop Input Hook (with Wake-on-Input support)
 *
 * Architecture (State-Driven, not Event-Driven):
 * - A module-level Set lives outside React — shared, never GC'd.
 * - keydown  → add action to Set
 * - keyup    → remove action from Set
 * - useFrame → reads Set state 60-120× per second, zero React re-renders.
 *
 * Wake-on-Input: The hook exposes KEY_MAP so consumers can register an
 * `invalidate()` listener to wake the R3F frame loop on first keydown.
 */

// ── Abstract Actions ───────────────────────────────────────────────────────
// Add new actions here. Consumers (Car, Jet, Bird) map these to behaviour.
export const ACTIONS = {
  MOVE_FORWARD:  'MOVE_FORWARD',
  MOVE_BACKWARD: 'MOVE_BACKWARD',
}

// ── Key → Action map ────────────────────────────────────────────────────────
// Physical key → abstract action. Exported so consumers can selectively
// listen (e.g. to call invalidate() only when a driving key is pressed).
export const KEY_MAP = {
  ArrowUp:   ACTIONS.MOVE_FORWARD,
  ArrowDown: ACTIONS.MOVE_BACKWARD,
  KeyW:      ACTIONS.MOVE_FORWARD,
  KeyS:      ACTIONS.MOVE_BACKWARD,
}

// ── Singleton state ──────────────────────────────────────────────────────────
const activeActions = new Set()

// ── Global listeners ─────────────────────────────────────────────────────────
function handleKeyDown(e) {
  const action = KEY_MAP[e.code] || KEY_MAP[e.key]
  if (action) {
    e.preventDefault()
    activeActions.add(action)
  }
}

function handleKeyUp(e) {
  const action = KEY_MAP[e.code] || KEY_MAP[e.key]
  if (action) activeActions.delete(action)
}

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeyDown, { passive: false })
  window.addEventListener('keyup',   handleKeyUp)
}

/**
 * useKeyboard()
 * Returns the shared live Set of active actions.
 * Read in useFrame — never triggers React re-renders.
 */
export function useKeyboard() {
  return activeActions
}
