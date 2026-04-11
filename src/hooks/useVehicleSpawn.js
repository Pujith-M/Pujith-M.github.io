import { useState, useRef } from 'react';
import { useSpring } from '@react-spring/three';

/**
 * useVehicleSpawn Hook
 * Handles the mathematical state of the car's drop.
 * @param {Function} onComplete - Callback when the animation finishes.
 */
export const useVehicleSpawn = (onComplete) => {
  const [isImpacted, setIsImpacted] = useState(false);
  const [controlsEnabled, setControlsEnabled] = useState(false);
  
  // Ref prevents multiple state updates during the high-speed spring phase
  const hasImpactedRef = useRef(false);

  const [springs] = useSpring(() => ({
    from: { 
      position: [0, 20, 0], 
      rotation: [0, Math.PI * 4, 0.4],
      scale: 0.1 
    },
    to: { 
      position: [0, 0, 0], 
      rotation: [0, 0, 0], 
      scale: 1 
    },
    // Enforce exactly 2 seconds drop as requested
    config: { duration: 2000 },
    
    onChange: ({ value }) => {
      // Impact logic: detect explicitly when the object has landed
      const posY = Array.isArray(value.position) ? value.position[1] : value.position?.y;
      if (posY !== undefined && posY <= 0.05 && !hasImpactedRef.current) {
        hasImpactedRef.current = true;
        setIsImpacted(true); 
      }
    },
    onRest: () => {
      // Ensure splash happens if it somehow missed the onChange
      if (!hasImpactedRef.current) {
        hasImpactedRef.current = true;
        setIsImpacted(true);
      }
      setControlsEnabled(true);
      if (onComplete) onComplete();
    }
  }));

  return { springs, isImpacted, controlsEnabled };
};
