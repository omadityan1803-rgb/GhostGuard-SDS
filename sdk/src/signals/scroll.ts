export interface ScrollFeatures {
  scrollDepth: number;        // 0–1, how far down the page
  avgScrollSpeed: number;     // px/ms
  scrollDirectionChanges: number;
  readingPatternScore: number; // Humans pause at content
}

export class ScrollTracker {
  private events: { y: number; t: number }[] = [];

  start() {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  private onScroll() {
    this.events.push({ y: window.scrollY, t: Date.now() });
    if (this.events.length > 100) this.events.shift();
  }

  getFeatures(): ScrollFeatures {
    if (this.events.length < 2) {
      return { scrollDepth: 0, avgScrollSpeed: 0,
               scrollDirectionChanges: 0, readingPatternScore: 0 };
    }

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollDepth = maxScroll > 0 ?
      Math.max(...this.events.map(e => e.y)) / maxScroll : 0;

    const speeds: number[] = [];
    let directionChanges = 0;
    let pauseCount = 0;
    let prevDir: number | null = null;

    for (let i = 1; i < this.events.length; i++) {
      const dy = this.events[i].y - this.events[i-1].y;
      const dt = this.events[i].t - this.events[i-1].t;
      if (dt > 0) {
        const speed = Math.abs(dy) / dt;
        speeds.push(speed);
        if (speed < 0.1) pauseCount++;
        const dir = Math.sign(dy);
        if (prevDir !== null && dir !== 0 && dir !== prevDir) directionChanges++;
        if (dir !== 0) prevDir = dir;
      }
    }

    const avgScrollSpeed = speeds.reduce((a,b)=>a+b,0) / (speeds.length||1);
    // Reading pattern: pauses while scrolling down = human reading
    const readingPatternScore = Math.min(1, pauseCount / (this.events.length * 0.3));

    return { scrollDepth, avgScrollSpeed, scrollDirectionChanges: directionChanges,
             readingPatternScore };
  }
}
