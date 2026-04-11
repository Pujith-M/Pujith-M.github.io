import { useState, useRef } from 'react';
import { useSpring } from '@react-spring/three';
import { CAR_CONFIG } from '../config/car';

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
    from: CAR_CONFIG.SPAWN_ANIMATION.FROM,
    to: CAR_CONFIG.SPAWN_ANIMATION.TO,
    config: { duration: CAR_CONFIG.SPAWN_ANIMATION.DURATION },
    
    onChange: ({ value }) => {
      // Impact logic: detect explicitly when the object has landed
      const posY = Array.isArray(value.position) ? value.position[1] : value.position?.y;
      if (posY !== undefined && posY <= CAR_CONFIG.SPAWN_ANIMATION.IMPACT_THRESHOLD && !hasImpactedRef.current) {
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
