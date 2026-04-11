import { COLORS } from './colors'
import * as THREE from 'three'

/**
 * Car Configuration
 * Centralized settings for the vehicle physics, visuals, and animations.
 */
export const CAR_CONFIG = {
  MODEL_PATH: '/models/mahindra_thar_optimized.glb',
  
  VISUALS: {
    SCALE: [0.6, 0.6, 0.6],
    ROTATION: [0, Math.PI, 0],
    SPIN_FACTOR: 0.65, // Wheel rotation relative to drive speed
    PITCH_FACTOR: 500,  // Chassis bounce frequency
    BOUNCE_AMPLITUDE: 0.02
  },

  SPAWN_ANIMATION: {
    DURATION: 2000,
    FROM: { 
      position: [0, 20, 0], 
      rotation: [0, Math.PI * 4, 0.4],
      scale: 0.1 
    },
    TO: { 
      position: [0, 0, 0], 
      rotation: [0, 0, 0], 
      scale: 1 
    },
    IMPACT_THRESHOLD: 0.05 // Ground impact detection height
  },

  // Material override map (semantic colors from COLORS)
  MATERIAL_OVERRIDES: {
    // Body / Paint
    'Car Paint - Red': { color: COLORS.CAR_PAINT, roughness: 0.08, metalness: 0.95, envMapIntensity: 1.8 },
    'GLOSYY': { color: '#0a0a0a', roughness: 0.05, metalness: 1.0 }, // Subtle glossy trim
    
    // Plastics & Trim
    'Plastico Negro': { color: COLORS.CAR_PLASTIC, roughness: 0.6, metalness: 0.0 },
    'Aluminio negro': { color: COLORS.CAR_METAL, roughness: 0.4, metalness: 0.8 },
    'Plastic - Black - Bumpy Small': { color: COLORS.CAR_PLASTIC, roughness: 0.9, metalness: 0.0 },
    'Plastic - Black - Bumpy Small.001': { color: COLORS.CAR_PLASTIC, roughness: 0.9, metalness: 0.0 },
    'Metal - Black - Rough 0.2': { color: COLORS.CAR_METAL, roughness: 0.2, metalness: 1.0 },
    'Material': { color: COLORS.CAR_METAL, roughness: 0.5, metalness: 0.5 },
    'Material.001': { color: COLORS.CAR_PAINT, roughness: 0.1, metalness: 0.9 },
    'Material.002': { color: COLORS.CAR_METAL, roughness: 0.6, metalness: 0.1 },
    'Material.003': { color: COLORS.CAR_CHROME, roughness: 0.4, metalness: 0.6 },

    // Wheels / Tires
    'Aluminio galvanizado': { color: COLORS.CAR_RIM, roughness: 0.15, metalness: 1.0 },
    '13484_Off_road_Tire_Disk': { color: COLORS.CAR_RIM, roughness: 0.2, metalness: 0.9 },
    'Metal - Chrome - Rough 0.2': { color: COLORS.CAR_CHROME, roughness: 0.15, metalness: 1.0 },
    'Tire': { color: COLORS.CAR_TIRE, roughness: 0.95, metalness: 0.0 },

    // Interior
    'CUERO NEGRO': { color: COLORS.CAR_INTERIOR, roughness: 0.8, metalness: 0.0 },

    // Glass / Windows
    'Glass - Tinted': { color: COLORS.CAR_GLASS_TINTED, roughness: 0.0, metalness: 0.0, transparent: true, opacity: 0.75 },
    'Glass - Clear - Ridged - UV': { color: COLORS.CAR_GLASS_CLEAR, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.6 },
    'Glass - Clear - Ridged - Trunk Light Lens': { color: '#d0d0d0', roughness: 0.05, metalness: 0.0, transparent: true, opacity: 0.5 },
    'Mirror': { color: '#aaaaaa', roughness: 0.0, metalness: 1.0 },

    // Lights
    'Glass - Orange - Bump': { color: COLORS.CAR_LIGHT_ORANGE, roughness: 0.1, metalness: 0.0, emissive: '#ff4400', emissiveIntensity: 1.5, transparent: true, opacity: 0.9 },
    'Glass - Red - Bump': { color: COLORS.CAR_LIGHT_RED, roughness: 0.1, metalness: 0.0, emissive: '#cc0000', emissiveIntensity: 2.0, transparent: true, opacity: 0.9 },
    'white Rear light glass': { color: '#ffffff', roughness: 0.05, metalness: 0.0, emissive: '#cccccc', emissiveIntensity: 0.5 },
    'white Rear light glass.001': { color: COLORS.CAR_LIGHT_RED, roughness: 0.05, metalness: 0.0, emissive: '#990000', emissiveIntensity: 2.5 },
    'emission': { color: '#ffffff', roughness: 0.0, metalness: 0.0, emissive: '#ffffff', emissiveIntensity: 4.0 },
  }
}
