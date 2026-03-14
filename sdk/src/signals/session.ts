export interface SessionFeatures {
  sessionDuration: number;        // Total time on page in ms
  tabVisibilityChanges: number;   // How many times user switched tabs
  timeOnPage: number;             // Active time (excluding hidden tab)
  windowFocusChanges: number;     // Times window gained/lost focus
  requestTimingVariance: number;  // Variance in how fast requests are made
  copyPasteDetected: boolean;     // Did user paste into a field?
  formInteractionTime: number;    // Time between page load and first input
  idleTime: number;               // Total ms of no activity
  mouseEnteredPage: boolean;      // Did mouse enter from outside browser?
  touchDevice: boolean;           // Is it a touch device?
}

export class SessionTracker {
  private startTime: number;
  private tabSwitches: number = 0;
  private focusChanges: number = 0;
  private hiddenTime: number = 0;
  private hiddenStart: number | null = null;
  private copyPasteDetected: boolean = false;
  private firstInputTime: number | null = null;
  private lastActivityTime: number;
  private idleTime: number = 0;
  private mouseEnteredPage: boolean = false;
  private requestTimings: number[] = [];
  private idleThreshold: number = 3000; // 3 seconds = idle

  constructor() {
    this.startTime = Date.now();
    this.lastActivityTime = Date.now();
  }

  start() {
    // Track tab visibility changes
    document.addEventListener('visibilitychange', this.onVisibilityChange.bind(this));

    // Track window focus
    window.addEventListener('focus', this.onFocus.bind(this));
    window.addEventListener('blur',  this.onBlur.bind(this));

    // Detect copy-paste
    document.addEventListener('paste', this.onPaste.bind(this));
    document.addEventListener('copy',  this.onCopy.bind(this));

    // Track first input interaction
    document.addEventListener('input', this.onFirstInput.bind(this), { once: true });

    // Track mouse entering the page from outside
    document.addEventListener('mouseenter', this.onMouseEnter.bind(this));

    // Track idle time
    ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'].forEach(event => {
      document.addEventListener(event, this.onActivity.bind(this), { passive: true });
    });

    // Periodically check for idle
    setInterval(this.checkIdle.bind(this), 1000);
  }

  private onVisibilityChange() {
    if (document.hidden) {
      this.tabSwitches++;
      this.hiddenStart = Date.now();
    } else {
      if (this.hiddenStart !== null) {
        this.hiddenTime += Date.now() - this.hiddenStart;
        this.hiddenStart = null;
      }
    }
  }

  private onFocus() {
    this.focusChanges++;
  }

  private onBlur() {
    this.focusChanges++;
  }

  private onPaste() {
    this.copyPasteDetected = true;
  }

  private onCopy() {
    // Copy alone is fine, paste into form fields is the bot signal
  }

  private onFirstInput() {
    this.firstInputTime = Date.now();
  }

  private onMouseEnter() {
    this.mouseEnteredPage = true;
  }

  private onActivity() {
    const now = Date.now();
    if (now - this.lastActivityTime > this.idleThreshold) {
      this.idleTime += now - this.lastActivityTime;
    }
    this.lastActivityTime = now;
  }

  private checkIdle() {
    const now = Date.now();
    if (now - this.lastActivityTime > this.idleThreshold) {
      // Currently idle — accumulate
      this.idleTime += 1000;
    }
  }

  // Call this when you make an API request to track timing variance
  recordRequestTiming(durationMs: number) {
    this.requestTimings.push(durationMs);
  }

  getFeatures(): SessionFeatures {
    const now = Date.now();
    const sessionDuration = now - this.startTime;
    const timeOnPage = sessionDuration - this.hiddenTime;

    // Calculate request timing variance
    let requestTimingVariance = 0;
    if (this.requestTimings.length > 1) {
      const mean = this.requestTimings.reduce((a, b) => a + b, 0) / this.requestTimings.length;
      requestTimingVariance = Math.sqrt(
        this.requestTimings.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / this.requestTimings.length
      );
    }

    return {
      sessionDuration,
      tabVisibilityChanges: this.tabSwitches,
      timeOnPage,
      windowFocusChanges: this.focusChanges,
      requestTimingVariance,
      copyPasteDetected: this.copyPasteDetected,
      formInteractionTime: this.firstInputTime
        ? this.firstInputTime - this.startTime
        : sessionDuration,
      idleTime: this.idleTime,
      mouseEnteredPage: this.mouseEnteredPage,
      touchDevice: navigator.maxTouchPoints > 0,
    };
  }

  stop() {
    document.removeEventListener('visibilitychange', this.onVisibilityChange.bind(this));
    window.removeEventListener('focus', this.onFocus.bind(this));
    window.removeEventListener('blur',  this.onBlur.bind(this));
  }
}
