/**
 * Simple Telemetry utility for Real User Monitoring (RUM).
 * PERF-19: Telemetry Dashboard.
 */
class Telemetry {
  constructor() {
    this.metrics = {
      loadTime: 0,
      fps: [],
      maxScroll: 0,
    };
    this.startTime = performance.now();
    this.init();
  }

  init() {
    window.addEventListener('load', () => {
      this.metrics.loadTime = performance.now() - this.startTime;
      console.log(`[Telemetry] Page Load: ${this.metrics.loadTime.toFixed(2)}ms`);
    });
  }

  trackFPS(fps) {
    if (this.metrics.fps.length < 100) {
      this.metrics.fps.push(fps);
    }
  }

  trackScroll(offset) {
    this.metrics.maxScroll = Math.max(this.metrics.maxScroll, offset);
  }

  getReport() {
    const avgFPS = this.metrics.fps.reduce((a, b) => a + b, 0) / this.metrics.fps.length;
    return {
      ...this.metrics,
      avgFPS: avgFPS.toFixed(1),
    };
  }
}

export const telemetry = new Telemetry();
