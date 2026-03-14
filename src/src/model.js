const XGBoostLite = {
  trees: [
    (f) => (f.cv > 0.35 ? +0.22 : f.cv > 0.15 ? +0.09 : -0.20),
    (f) => (f.accelVar > 100 ? +0.20 : f.accelVar > 30 ? +0.09 : -0.18),
    (f) => (f.typingMean > 90 ? +0.17 : f.typingMean > 40 ? +0.08 : -0.22),
    (f) => (f.typingStd > 50 ? +0.18 : f.typingStd > 20 ? +0.08 : -0.22),
    (f) => (f.clickStd > 80 ? +0.14 : f.clickStd > 25 ? +0.06 : -0.16),
    (f) => (f.scrollVar > 40 ? +0.12 : f.scrollVar > 10 ? +0.04 : -0.13),
    (f) => (f.linearity < 0.65 ? +0.15 : f.linearity < 0.88 ? +0.05 : -0.17),
    (f) => (f.entropy > 0.55 ? +0.12 : f.entropy > 0.30 ? +0.04 : -0.10),
  ],
  predict(features) {
    const score = this.trees.reduce((sum, tree) => sum + tree(features), 0);
    return Math.max(0.02, Math.min(0.98, 0.5 + score));
  },
};

const DecisionEngine = {
  classify(humanProb) {
    if (humanProb > 0.75) return { verdict: 'HUMAN', action: 'allow', confidence: 'HIGH' };
    if (humanProb > 0.40) return { verdict: 'SUSPICIOUS', action: 'challenge', confidence: 'LOW' };
    return { verdict: 'BOT', action: 'block', confidence: 'HIGH' };
  }
};

module.exports = { XGBoostLite, DecisionEngine };
