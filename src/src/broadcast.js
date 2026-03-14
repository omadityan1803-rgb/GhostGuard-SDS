const { extractFeatures } = require('./features');
const { XGBoostLite } = require('./model');

const Broadcaster = {
  CHANNEL: 'ps_signal',
  timer: null,

  schedule(state) {
    if (this.timer) return;
    this.timer = setTimeout(() => {
      this.timer = null;
      this.send(state);
    }, 80);
  },

  send(state) {
    const features = extractFeatures(state);
    const prob = XGBoostLite.predict(features);
    const payload = {
      ts: Date.now(),
      features,
      prob,
      raw: {
        mouseSpeeds: state.mouseSpeeds.slice(-50),
        mouseAccels: state.mouseAccels.slice(-50),
      },
      meta: { interactions: state.interactions },
    };
    localStorage.setItem(this.CHANNEL, JSON.stringify(payload));
  }
};

module.exports = { Broadcaster };
