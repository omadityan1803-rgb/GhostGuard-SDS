import { MouseFeatures } from './signals/mouse';
import { KeyboardFeatures } from './signals/keyboard';
import { ScrollFeatures } from './signals/scroll';
import { FingerprintFeatures } from './signals/fingerprint';
import { SessionFeatures } from './signals/session';

// ─── Config ───────────────────────────────────────────────────────────────────

export interface GhostGuardConfig {
  apiUrl: string;
  siteKey: string;
  threshold?: number;
  softThreshold?: number;
  debug?: boolean;
  onResult?: (result: VerifyResult) => void;
  onError?: (error: Error) => void;
  onChallenge?: () => void;
}

// ─── Signal Payload ───────────────────────────────────────────────────────────

export interface RequestMeta {
  userAgent: string;
  timestamp: number;
  url: string;
  referrer: string;
  timingVariance: number;
}

export interface SignalPayload {
  sessionId: string;
  siteKey: string;
  sessionDuration: number;
  mouse: MouseFeatures;
  keyboard: KeyboardFeatures;
  scroll: ScrollFeatures;
  fingerprint: FingerprintFeatures;
  session: SessionFeatures;
  requestMeta: RequestMeta;
}

// ─── Verdict ──────────────────────────────────────────────────────────────────

export type Verdict = 'PASS' | 'SOFT_FLAG' | 'CHALLENGE';

export interface VerifyResult {
  score: number;
  verdict: Verdict;
  token?: string;
  sessionId: string;
  timestamp: number;
  signals?: SignalSummary;      // Optional debug info
}

// ─── Signal Summary (for dashboard & debug) ───────────────────────────────────

export interface SignalSummary {
  mouseEntropy: number;
  typingRhythm: number;
  scrollPattern: number;
  deviceFingerprint: string;
  requestTiming: number;
  sessionScore: number;
}

// ─── SmartFallback Challenge ──────────────────────────────────────────────────

export type ChallengeType =
  | 'CLICK_TARGET'       // Click a simple moving dot
  | 'AUDIO_CONFIRM'      // Listen and confirm a sound
  | 'SIMPLE_MATH'        // Solve 3+4 type question
  | 'PATTERN_CONFIRM';   // Confirm a visual pattern

export interface ChallengeRequest {
  sessionId: string;
  type: ChallengeType;
  payload: unknown;
}

export interface ChallengeResponse {
  sessionId: string;
  success: boolean;
  token?: string;
}

// ─── Admin Dashboard Types ────────────────────────────────────────────────────

export interface EventLog {
  sessionId: string;
  siteKey: string;
  score: number;
  verdict: Verdict;
  timestamp: number;
  ipHash?: string;         // Hashed, never raw IP — privacy first
}

export interface StatsResponse {
  total: number;
  pass: number;
  soft_flag: number;
  challenge: number;
  avg_score: number;
  recent: EventLog[];
}

export interface TenantConfig {
  siteKey: string;
  tenantName: string;
  passThreshold: number;
  softThreshold: number;
  webhookUrl?: string;
  createdAt: number;
}

// ─── API Response Wrapper ─────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: number;
}

// ─── Internal ML Feature Vector ───────────────────────────────────────────────

export interface FeatureVector {
  mouse_entropy: number;
  mouse_avg_speed: number;
  mouse_direction_changes: number;
  mouse_straight_line_ratio: number;
  mouse_pause_count: number;
  key_avg_dwell: number;
  key_avg_flight: number;
  key_rhythm_consistency: number;
  key_backspace_ratio: number;
  key_typing_speed: number;
  scroll_depth: number;
  scroll_avg_speed: number;
  scroll_direction_changes: number;
  scroll_reading_pattern: number;
  session_duration: number;
  request_timing_variance: number;
}

// ─── SDK Events (for onResult callback) ───────────────────────────────────────

export type GhostGuardEvent =
  | { type: 'COLLECTING' }
  | { type: 'SCORING' }
  | { type: 'RESULT'; result: VerifyResult }
  | { type: 'CHALLENGE_REQUIRED' }
  | { type: 'CHALLENGE_PASSED'; token: string }
  | { type: 'CHALLENGE_FAILED' }
  | { type: 'ERROR'; error: Error };
```

---

**Path to create on GitHub:** `sdk/src/types.ts`

---

Now your complete `sdk/src/` folder looks like this:
```
sdk/src/
├── types.ts          ← just added
├── index.ts
└── signals/
    ├── mouse.ts
    ├── keyboard.ts
    ├── scroll.ts
    ├── fingerprint.ts
    └── session.ts
