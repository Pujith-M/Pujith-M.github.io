/**
 * useKeyboard — Singleton Game-Loop Input Hook
 *
 * Architecture (State-Driven, not Event-Driven):
 * - A module-level Set lives outside React, so it is shared across all
 *   consumers and is NEVER garbage collected between renders.
 * - keydown  → add action to Set
 * - keyup    → remove action from Set
 * - useFrame → reads Set state 60-120× per second, no React re-renders.
 *
 * Key Map: Physical keys are translated into abstract "Actions" so swapping
 * the vehicle (Car → Jet → Bird) only requires changing the consumer, not
 * this hook.
 */

// ── Abstract Actions ───────────────────────────────────────────────────────
export const ACTIONS = {
  MOVE_FORWARD:  'MOVE_FORWARD',
  MOVE_BACKWARD: 'MOVE_BACKWARD',
}

// ── Key → Action map (add more keys here without touching consumers) ────────
const KEY_MAP = {
  ArrowUp:   ACTIONS.MOVE_FORWARD,
  ArrowDown: ACTIONS.MOVE_BACKWARD,
  KeyW:      ACTIONS.MOVE_FORWARD,
  KeyS:      ACTIONS.MOVE_BACKWARD,
}

// ── Singleton state — one Set for the entire app lifetime ─────────────────
const activeActions = new Set()

// ── Global listeners attached once at module load ─────────────────────────
function handleKeyDown(e) {
  const action = KEY_MAP[e.code] || KEY_MAP[e.key]
  if (action) {
    e.preventDefault()
    activeActions.add(action)
  }
}

function handleKeyUp(e) {
  const action = KEY_MAP[e.code] || KEY_MAP[e.key]
  if (action) {
    activeActions.delete(action)
  }
}

// Attach once. 'passive: false' allows e.preventDefault() to suppress page scroll.
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeyDown, { passive: false })
  window.addEventListener('keyup',   handleKeyUp)
}

/**
 * useKeyboard()
 * Returns the shared live Set of active actions.
 * Read in useFrame — never triggers React re-renders.
 *
 * @example
 * const keys = useKeyboard()
 * useFrame((_, delta) => {
 *   if (keys.has(ACTIONS.MOVE_FORWARD)) position.z -= speed * delta
 * })
 */
export function useKeyboard() {
  return activeActions
}
