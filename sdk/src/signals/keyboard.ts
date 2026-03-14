export interface KeyboardFeatures {
  avgDwellTime: number;    // How long each key is held (ms)
  avgFlightTime: number;   // Time between key releases and next press
  rhythmConsistency: number; // 0=bot-perfect, 1=human-natural
  backspaceRatio: number;  // Humans make typos
  typingSpeed: number;     // WPM equivalent
}

export class KeyboardTracker {
  private events: { key: string; type: 'down'|'up'; t: number }[] = [];

  start() {
    document.addEventListener('keydown', this.onDown.bind(this));
    document.addEventListener('keyup', this.onUp.bind(this));
  }

  private onDown(e: KeyboardEvent) {
    this.events.push({ key: e.key, type: 'down', t: Date.now() });
  }

  private onUp(e: KeyboardEvent) {
    this.events.push({ key: e.key, type: 'up', t: Date.now() });
  }

  getFeatures(): KeyboardFeatures {
    const downs = this.events.filter(e => e.type === 'down');
    const ups   = this.events.filter(e => e.type === 'up');

    if (downs.length < 3) {
      return { avgDwellTime: 0, avgFlightTime: 0,
               rhythmConsistency: 0, backspaceRatio: 0, typingSpeed: 0 };
    }

    // Dwell times (keydown to keyup for same key)
    const dwells: number[] = [];
    for (const d of downs) {
      const up = ups.find(u => u.key === d.key && u.t >= d.t);
      if (up) dwells.push(up.t - d.t);
    }

    // Flight times (keyup to next keydown)
    const flights: number[] = [];
    for (let i = 1; i < downs.length; i++) {
      const prevUp = ups.find(u => u.t <= downs[i].t);
      if (prevUp) flights.push(downs[i].t - prevUp.t);
    }

    const avgDwellTime = dwells.reduce((a,b)=>a+b,0) / (dwells.length||1);
    const avgFlightTime = flights.reduce((a,b)=>a+b,0) / (flights.length||1);

    // Rhythm consistency: std deviation of inter-key intervals
    // Low deviation = bot-like, high = human
    const intervals = downs.slice(1).map((d,i) => d.t - downs[i].t);
    const meanInterval = intervals.reduce((a,b)=>a+b,0) / (intervals.length||1);
    const stdDev = Math.sqrt(
      intervals.reduce((s,v)=>s+Math.pow(v-meanInterval,2),0) / (intervals.length||1)
    );
    const rhythmConsistency = Math.min(1, stdDev / (meanInterval + 1));

    const backspaceRatio = downs.filter(d => d.key === 'Backspace').length / downs.length;
    const duration = (downs[downs.length-1].t - downs[0].t) / 1000 / 60; // minutes
    const typingSpeed = downs.length / 5 / (duration || 0.001); // rough WPM

    return { avgDwellTime, avgFlightTime, rhythmConsistency, backspaceRatio, typingSpeed };
  }

  stop() {
    document.removeEventListener('keydown', this.onDown.bind(this));
    document.removeEventListener('keyup', this.onUp.bind(this));
  }
}
