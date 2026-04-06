import { validateTimeline } from '../config/validator'

/**
 * Worker listener to perform validation off-thread.
 * PERF-13: Worker Offloading.
 */
self.onmessage = (e) => {
  const { timeline } = e.data;
  const warnings = validateTimeline(timeline);
  self.postMessage({ warnings });
};
