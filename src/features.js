const mean = (arr) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

const stddev = (arr) => {
  if (arr.length < 2) return 0;
  const m = mean(arr);
  return Math.sqrt(arr.reduce((a, b) => a + (b - m) ** 2, 0) / arr.length);
};

const pathLinearity = (points) => {
  if (points.length < 3) return 0.5;
  const dx = points[points.length - 1].x - points[0].x;
  const dy = points[points.length - 1].y - points[0].y;
  const straightDist = Math.sqrt(dx*dx + dy*dy) + 0.001;
  let pathLength = 0;
  for (let i = 1; i < points.length; i++) {
    const ddx = points[i].x - points[i-1].x;
    const ddy = points[i].y - points[i-1].y;
    pathLength += Math.sqrt(ddx*ddx + ddy*ddy);
  }
  return Math.min(straightDist / pathLength, 1.0);
};

const sessionEntropy = (speeds, scrolls) => {
  const all = [...speeds, ...scrolls];
  if (all.length < 5) return 0.5;
  const buckets = new Array(8).fill(0);
  const max = Math.max(...all) || 1;
  all.forEach(v => {
    const bin = Math.min(7, Math.floor(v / max * 8));
    buckets[bin]++;
  });
  let entropy = 0;
  buckets.forEach(count => {
    if (count > 0) {
      const p = count / all.length;
      entropy -= p * Math.log2(p);
    }
  });
  return Math.min(entropy / 3, 1.0);
};

const extractFeatures = (state) => {
  const typingIntervals = [];
  for (let i = 1; i < state.keyTimes.length; i++) typingIntervals.push(state.keyTimes[i] - state.keyTimes[i-1]);
  
  const clickIntervals = [];
  for (let i = 1; i < state.clickTimes.length; i++) clickIntervals.push(state.clickTimes[i] - state.clickTimes[i-1]);

  const speedMean = mean(state.mouseSpeeds);

  return {
    cv: stddev(state.mouseSpeeds) / (speedMean || 1),
    accelVar: stddev(state.mouseAccels),
    typingMean: mean(typingIntervals),
    typingStd: stddev(typingIntervals),
    clickStd: stddev(clickIntervals),
    scrollVar: stddev(state.scrollDeltas),
    entropy: sessionEntropy(state.mouseSpeeds, state.scrollDeltas),
    linearity: pathLinearity(state.mousePositions),
  };
};

module.exports = { mean, stddev, extractFeatures };
