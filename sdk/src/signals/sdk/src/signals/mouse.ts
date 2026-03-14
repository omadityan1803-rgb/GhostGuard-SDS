export interface MouseFeatures {
  entropy: number;           // How random/chaotic the movement is
  avgSpeed: number;          // Average cursor speed in px/ms
  directionChanges: number;  // Number of times direction reversed
  straightLineRatio: number; // 1 = perfectly straight (bot-like)
  pauseCount: number;        // Times cursor stopped
  totalDistance: number;
}

export class MouseTracker {
  private points: { x: number; y: number; t: number }[] = [];
  private maxPoints = 200;

  start() {
    document.addEventListener('mousemove', this.onMove.bind(this));
    document.addEventListener('touchmove', this.onTouch.bind(this));
  }

  private onMove(e: MouseEvent) {
    this.points.push({ x: e.clientX, y: e.clientY, t: Date.now() });
    if (this.points.length > this.maxPoints) this.points.shift();
  }

  private onTouch(e: TouchEvent) {
    const t = e.touches[0];
    this.points.push({ x: t.clientX, y: t.clientY, t: Date.now() });
    if (this.points.length > this.maxPoints) this.points.shift();
  }

  getFeatures(): MouseFeatures {
    if (this.points.length < 5) {
      return { entropy: 0, avgSpeed: 0, directionChanges: 0,
               straightLineRatio: 1, pauseCount: 0, totalDistance: 0 };
    }

    let totalDistance = 0;
    let directionChanges = 0;
    let pauseCount = 0;
    const speeds: number[] = [];
    let prevAngle: number | null = null;

    for (let i = 1; i < this.points.length; i++) {
      const dx = this.points[i].x - this.points[i-1].x;
      const dy = this.points[i].y - this.points[i-1].y;
      const dt = this.points[i].t - this.points[i-1].t;
      const dist = Math.sqrt(dx*dx + dy*dy);
      totalDistance += dist;

      if (dt > 0) {
        const speed = dist / dt;
        speeds.push(speed);
        if (speed < 0.05) pauseCount++;
      }

      const angle = Math.atan2(dy, dx);
      if (prevAngle !== null) {
        const diff = Math.abs(angle - prevAngle);
        if (diff > Math.PI / 4) directionChanges++;
      }
      prevAngle = angle;
    }

    // Entropy: variance in speed (humans are irregular)
    const avgSpeed = speeds.reduce((a,b) => a+b, 0) / speeds.length;
    const variance = speeds.reduce((s,v) => s + Math.pow(v - avgSpeed, 2), 0) / speeds.length;
    const entropy = Math.min(1, Math.sqrt(variance) / (avgSpeed + 0.001));

    // Straight line ratio: actual distance vs direct distance
    const first = this.points[0];
    const last = this.points[this.points.length - 1];
    const directDist = Math.sqrt(
      Math.pow(last.x - first.x, 2) + Math.pow(last.y - first.y, 2)
    );
    const straightLineRatio = directDist / (totalDistance + 0.001);

    return { entropy, avgSpeed, directionChanges,
             straightLineRatio, pauseCount, totalDistance };
  }

  stop() {
    document.removeEventListener('mousemove', this.onMove.bind(this));
  }
}
