const Collector = {
  state: {
    mouseSpeeds:    [],
    mouseAccels:    [],
    mousePositions: [],
    clickTimes:     [],
    keyTimes:       [],
    scrollDeltas:   [],
    lastMouse:      null,
    interactions:   0,
  },

  onMouseMove(x, y) {
    const t = Date.now();
    if (this.state.lastMouse) {
      const dx = x - this.state.lastMouse.x;
      const dy = y - this.state.lastMouse.y;
      const dt = t - this.state.lastMouse.t;

      if (dt > 0 && dt < 500) {
        const speed = Math.sqrt(dx*dx + dy*dy) / dt * 1000;
        if (this.state.mouseSpeeds.length > 0) {
          const prevSpeed = this.state.mouseSpeeds[this.state.mouseSpeeds.length - 1];
          const accel = Math.abs(speed - prevSpeed) / dt * 1000;
          this.state.mouseAccels.push(accel);
        }
        this.state.mouseSpeeds.push(speed);
      }
    }
    this.state.mousePositions.push({ x, y, t });
    this.state.lastMouse = { x, y, t };
    this.state.interactions++;

    if (this.state.mouseSpeeds.length > 80) this.state.mouseSpeeds.shift();
    if (this.state.mouseAccels.length > 80) this.state.mouseAccels.shift();
    if (this.state.mousePositions.length > 60) this.state.mousePositions.shift();
  },

  onKeyDown() {
    this.state.keyTimes.push(Date.now());
    if (this.state.keyTimes.length > 60) this.state.keyTimes.shift();
    this.state.interactions++;
  },

  onScroll(deltaY) {
    this.state.scrollDeltas.push(Math.abs(deltaY));
    if (this.state.scrollDeltas.length > 40) this.state.scrollDeltas.shift();
    this.state.interactions++;
  },

  onClick() {
    this.state.clickTimes.push(Date.now());
    if (this.state.clickTimes.length > 20) this.state.clickTimes.shift();
    this.state.interactions++;
  },
};

module.exports = { Collector };
