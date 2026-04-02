import { LAYOUT } from './layout'

/**
 * Validates the timeline for any spacing or collision issues.
 * Returns a list of warnings or suggested adjustments.
 */
export function validateTimeline(timeline) {
  const warnings = [];
  
  let currentZ = -40; // Approx start of first track
  
  timeline.forEach((item) => {
    if (item.type === 'EXPERIENCE') {
      const pointsCount = item.points?.length || 0;
      const totalSectionLength = LAYOUT.SPACING.SECTION_BUFFER * 2 + (pointsCount + 1) * LAYOUT.SPACING.BILLBOARD_GAP;
      
      // Check if this section fits within reasonable bounds
      if (totalSectionLength > 250) {
        warnings.push(`Warning: Experience section "${item.company || 'Unknown'}" is very long (${totalSectionLength.toFixed(0)} units). Consider splitting.`);
      }
      
      currentZ -= totalSectionLength;
    } else if (item.type === 'SKILLS') {
      const skillsCount = item.data?.length || 3;
      const totalSectionLength = LAYOUT.SPACING.SECTION_BUFFER * 2 + (skillsCount * 5);
      currentZ -= totalSectionLength;
    } else if (item.type === 'PROJECTS') {
      const projectCount = item.data?.length || 3;
      const totalSectionLength = LAYOUT.SPACING.SECTION_BUFFER * 2 + (projectCount * LAYOUT.SPACING.BILLBOARD_GAP);
      currentZ -= totalSectionLength;
    }
  });

  // Global Density Check
  const totalItems = timeline.length;
  if (totalItems > 0) {
    const avgDensity = Math.abs(currentZ) / totalItems;
    if (avgDensity < 30) {
      warnings.push(`Warning: High content density detected (${avgDensity.toFixed(1)} units per item). The experience may feel cluttered.`);
    }
  }

  if (Math.abs(currentZ) > 800) {
    warnings.push(`Warning: Total journey (approx ${Math.abs(currentZ).toFixed(0)} units) is very long. Ensure TRACK_LENGTH and ScrollControls pages are sufficient.`);
  }

  return warnings;
}
