import { LAYOUT } from './layout'

/**
 * Validates the timeline for any spacing or collision issues.
 * Returns a list of warnings or suggested adjustments.
 */
export function validateTimeline(timeline) {
  const warnings = [];
  const minDistance = LAYOUT.SPACING.BILLBOARD_GAP;
  
  // For now, we assume chronological order in the array
  // We can add logic to check if cumulative spacing exceeds the TRACK_LENGTH
  
  let currentZ = -40; // Approx start of first track
  
  timeline.forEach((item, index) => {
    if (item.type === 'EXPERIENCE') {
      const pointsCount = item.points?.length || 0;
      const totalSectionLength = LAYOUT.SPACING.SECTION_BUFFER * 2 + (pointsCount + 1) * LAYOUT.SPACING.BILLBOARD_GAP;
      
      // Check if this section fits within reasonable bounds
      if (totalSectionLength > 200) {
        warnings.push(`Warning: Experience section "${item.company}" is very long (${totalSectionLength} units). Consider splitting.`);
      }
      
      currentZ -= totalSectionLength;
    }
    // Add more validation as needed...
  });

  if (Math.abs(currentZ) > 600) {
    warnings.push(`Warning: Total journey (approx ${Math.abs(currentZ).toFixed(0)} units) exceeds TRACK_LENGTH (600). The car may drive off the road!`);
  }

  return warnings;
}
