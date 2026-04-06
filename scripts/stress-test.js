import fs from 'fs';

/**
 * Scalability Test Harness (PERF-20).
 * Generates 500 random timeline items to stress-test the 3D engine.
 */
const generateStressTimeline = () => {
  const items = [];
  const types = ['EXPERIENCE', 'SKILLS', 'PROJECTS'];

  for (let i = 0; i < 500; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    items.push({
      id: `stress-${i}`,
      type,
      company: `Stress Co ${i}`,
      points: ['Stress point A', 'Stress point B', 'Stress point C'],
      data: ['Skill A', 'Skill B', 'Skill C'],
    });
  }

  const content = `export const TIMELINE = ${JSON.stringify(items, null, 2)};`;
  fs.writeFileSync('./src/config/timeline.stress.js', content);
  console.log('✅ Generated timeline.stress.js with 500 items.');
};

generateStressTimeline();
