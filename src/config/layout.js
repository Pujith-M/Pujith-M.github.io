/**
 * Standard layout configuration for the 3D Track.
 * Used to unify spacing, lane placement, and billboard distancing.
 */
export const LAYOUT = {
  // Lane positions
  LANES: {
    LEFT: -6.5,
    CENTER_LEFT: -3.0,
    CENTER: 0,
    CENTER_RIGHT: 3.0,
    RIGHT: 6.5,
    OFFROAD_LEFT: -12.0,
    OFFROAD_RIGHT: 12.0,
  },
  
  // Track spacing
  SPACING: {
    BILLBOARD_GAP: 15,    // Standard distance between alternating billboards
    SECTION_BUFFER: 40,   // Buffer before and after a section
    UNIT_SCALE: 1,        // Base scale for 3D units
  },

  // Billboard dimensions & heights
  BILLBOARD: {
    STANDARD_HEIGHT: 1.5,
    SIGN_HEIGHT: 0,       // Global Y for Highway Signs
    LOOKAT_Y: 3.5,        // elevated camera focal point for verticality
  }
};
