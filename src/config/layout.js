/**
 * Standard layout configuration for the 3D Track.
 * Used to unify spacing, lane placement, and billboard distancing.
 */
export const LAYOUT = {
  // Base settings
  BASE_LANES: {
    LEFT: -6.5,
    CENTER_LEFT: -3.0,
    CENTER: 0,
    CENTER_RIGHT: 3.0,
    RIGHT: 6.5,
    OFFROAD_LEFT: -12.0,
    OFFROAD_RIGHT: 12.0,
  },

  // Function to get aspect-ratio adjusted lanes
  getLanes: (aspect = 1.7) => {
    // Narrow factor for mobile (portrait aspect < 1)
    const factor = aspect < 1 ? 0.6 : 1.0;
    return {
      LEFT: -6.5 * factor,
      CENTER_LEFT: -3.0 * factor,
      CENTER: 0,
      CENTER_RIGHT: 3.0 * factor,
      RIGHT: 6.5 * factor,
      OFFROAD_LEFT: -10 * factor,
      OFFROAD_RIGHT: 10 * factor,
    };
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
