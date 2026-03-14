import { MouseTracker } from './signals/mouse';
import { KeyboardTracker } from './signals/keyboard';
import { ScrollTracker } from './signals/scroll';
import { getFingerprint } from './signals/fingerprint';

export interface GhostGuardConfig {
  apiUrl: string;        // Your backend URL
  siteKey: string;       // Your enterprise site key
  threshold?: number;    // Override default 75
  onResult?: (result: VerifyResult) => void;
}

export interface VerifyResult {
  score: number;
  verdict: 'PASS' | 'SOFT_FLAG' | 'CHALLENGE';
  token?: string;
  sessionId: string;
}

export class GhostGuard {
  private mouse: MouseTracker;
  private keyboard: KeyboardTracker;
  private scroll: ScrollTracker;
  private sessionId: string;
  private config: GhostGuardConfig;
  private sessionStart: number;

  constructor(config: GhostGuardConfig) {
    this.config = config;
    this.sessionId = crypto.randomUUID();
    this.sessionStart = Date.now();
    this.mouse = new MouseTracker();
    this.keyboard = new KeyboardTracker();
    this.scroll = new ScrollTracker();
  }

  init() {
    this.mouse.start();
    this.keyboard.start();
    this.scroll.start();
    // Auto-verify after 3 seconds of data collection
    setTimeout(() => this.verify(), 3000);
  }

  async verify(): Promise<VerifyResult> {
    const [fingerprint] = await Promise.all([getFingerprint()]);

    const payload = {
      sessionId: this.sessionId,
      siteKey: this.config.siteKey,
      sessionDuration: Date.now() - this.sessionStart,
      mouse: this.mouse.getFeatures(),
      keyboard: this.keyboard.getFeatures(),
      scroll: this.scroll.getFeatures(),
      fingerprint,
      requestMeta: {
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
        url: window.location.href,
      }
    };

    const response = await fetch(`${this.config.apiUrl}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result: VerifyResult = await response.json();
    this.config.onResult?.(result);
    return result;
  }
}

// Auto-init from script tag: <script data-ghostguard data-api="..." data-key="...">
if (typeof document !== 'undefined') {
  const script = document.currentScript as HTMLScriptElement;
  if (script?.dataset.ghostguard !== undefined) {
    const gg = new GhostGuard({
      apiUrl: script.dataset.api || '',
      siteKey: script.dataset.key || '',
    });
    gg.init();
    (window as any).ghostguard = gg;
  }
}
