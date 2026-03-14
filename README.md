<div align="center">

<img src="https://img.shields.io/badge/GhostGuard-SDS-2563eb?style=for-the-badge&logo=shield&logoColor=white" alt="GhostGuard SDS"/>

# 🛡️ GhostGuard — PassiveShield

### *ML-Based Passive Human Verification System — A Frictionless Alternative to CAPTCHA*

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-Compatible-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Browser Native](https://img.shields.io/badge/Browser-Native-4285F4?style=flat-square&logo=googlechrome&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API)
[![ML Powered](https://img.shields.io/badge/ML-XGBoost--Lite-FF6F00?style=flat-square&logo=tensorflow&logoColor=white)](https://xgboost.readthedocs.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)
[![Hackathon](https://img.shields.io/badge/Hackathon-SDS%20Problem%20%233-8B5CF6?style=flat-square)](./problem_statement_3.pdf)

<br/>

> **"Humans are perfectly imperfect. GhostGuard sees the difference."**
>
> A zero-friction, privacy-first behavioral biometrics engine that detects bots in real-time — invisibly, passively, and without ever showing a puzzle to solve.

<br/>

[🚀 Live Demo](#-live-demo) · [⚙️ How It Works](#️-how-it-works) · [📂 Project Structure](#-project-structure) · [🧠 ML Model](#-ml-model--xgboost-lite) · [🔌 Integration](#-enterprise-integration) · [🤝 Contributing](#-contributing)

</div>

---

## 📌 Table of Contents

- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [Core Philosophy](#-core-philosophy-perfectly-imperfect)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [How It Works](#️-how-it-works)
- [Behavioral Signals](#-behavioral-signals-captured)
- [ML Model — XGBoost-Lite](#-ml-model--xgboost-lite)
- [Feature Engineering](#-feature-engineering)
- [Decision Engine](#-decision-engine)
- [Project Structure](#-project-structure)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Running the Simulation](#-running-the-simulation)
- [Enterprise Integration](#-enterprise-integration)
- [Privacy Design](#-privacy-first-design)
- [Evaluation Metrics](#-evaluation-metrics)
- [Roadmap](#-roadmap)
- [Team](#-team)
- [License](#-license)

---

## 🚨 The Problem

Traditional CAPTCHA systems are **broken** — not just annoying, but fundamentally flawed for modern enterprise use:

| Pain Point | Impact |
|---|---|
| 🧩 Puzzle-based challenges | Frustrates users, increases drop-off rates |
| ♿ Accessibility barriers | Excludes users with visual/motor impairments |
| 🤖 Bot bypass | Advanced bots solve CAPTCHAs with >96% accuracy using AI |
| 📉 Conversion loss | Login friction directly reduces enterprise revenue |
| 🔒 Privacy concerns | Third-party CAPTCHA providers track user behavior |

**Enterprises need security that is invisible to legitimate users and impenetrable to bots.**

---

## ✅ Our Solution

**GhostGuard — PassiveShield** is an intelligent, browser-native behavioral biometrics system that:

- 👁️ **Watches silently** — monitors mouse movement, typing rhythm, scroll patterns, and click dynamics
- 🧠 **Thinks in real-time** — runs an 8-tree gradient boosting ensemble directly in the browser
- ✅ **Decides instantly** — classifies each session as HUMAN, SUSPICIOUS, or BOT with a confidence score
- 🚫 **Never interrupts** — legitimate users experience zero friction; only suspicious sessions get challenged
- 📡 **Broadcasts securely** — cross-window state synchronization keeps multi-page protection consistent

---

## 🧬 Core Philosophy: "Perfectly Imperfect"

```
Human behavior  →  Noisy · Irregular · High-entropy · Biologically variable
Bot behavior    →  Precise · Uniform · Low-entropy · Mathematically consistent
```

GhostGuard exploits the fundamental difference between human motor control and automated scripts. A human moving their cursor has **micro-tremors**, **variable acceleration**, **organic path curvature**, and **non-uniform typing cadence**. A bot is unnaturally perfect. We detect that perfection as the anomaly it is.

---

## 🎬 Live Demo

Open `index.html` in any browser to experience GhostGuard in action:

1. The **Sign In** page silently begins collecting behavioral signals the moment you land
2. A **live analysis panel** at the bottom of the form shows real-time metrics:
   - 📍 Mouse coordinates (X / Y)
   - ⚡ Cursor speed (px/s)
   - ✍️ Typing latency & standard deviation
   - 📐 Path linearity score
   - 🔵 Human probability score with color-coded verdict
3. Interact naturally — watch your **HUMAN** probability climb
4. Move your mouse in a perfect straight line — watch it drop

> The live panel updates every **80ms** using a debounced broadcast scheduler.

---

## ✨ Features

### 🔍 Passive Behavioral Collection
- Real-time **mouse speed & acceleration** tracking with rolling 80-sample buffer
- **Mouse path linearity** using Euclidean vs. path-length ratio
- **Keystroke dynamics** — inter-key interval timing for rhythm analysis
- **Click timing variance** — human clicks have natural irregular intervals
- **Scroll delta variance** — human scrolling is organically inconsistent

### 🧮 Statistical Feature Engineering
- **Coefficient of Variation (CV)** of mouse speed — key discriminator between humans and bots
- **Standard Deviation** of acceleration, typing intervals, click intervals, scroll deltas
- **Shannon Entropy** of session behavior — measures unpredictability across 8 frequency buckets
- **Path Linearity Score** — ratio of straight-line distance to actual cursor path length

### 🌲 XGBoost-Lite Inference Engine
- 8-tree gradient boosting ensemble running **entirely in JavaScript**
- No server round-trips required for classification
- Sigmoid-clamped probability output `[0.02, 0.98]`
- Designed for **sub-millisecond inference** in browser environments

### 📡 Cross-Window Synchronization
- `Broadcaster` module debounces and serializes behavioral state to `localStorage`
- Enables **multi-page session continuity** — behavioral profile persists across page navigation
- Downstream pages (e.g., dashboard, checkout) can read the live trust score without recomputing

### 🖥️ Beautiful Live UI
- Clean enterprise-grade Sign In interface with animated behavioral analysis panel
- Color-coded verdicts: 🟢 HUMAN · 🟡 SUSPICIOUS · 🔴 BOT
- Animated probability bar with real-time metric display
- Responsive, mobile-friendly design

---

## ⚙️ How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER SESSION                             │
│                                                                 │
│  Mouse Move ──┐                                                 │
│  Key Press  ──┼──► COLLECTOR ──► FEATURE EXTRACTOR ──► MODEL   │
│  Scroll     ──┤        │               │                  │     │
│  Click      ──┘        │               │                  │     │
│                        ▼               ▼                  ▼     │
│                   Raw Signals    8 Features         Human Prob  │
│                   (Rolling        (CV, Entropy,     [0.02-0.98] │
│                    Buffers)        Linearity...)         │      │
│                                                          ▼      │
│                                                  DECISION ENGINE│
│                                                  ┌─────────────┐│
│                                                  │ >0.75 HUMAN ││
│                                                  │ >0.40 QUERY ││
│                                                  │ <0.40  BOT  ││
│                                                  └─────────────┘│
│                                                          │      │
│                                              ┌───────────┼──────┤
│                                              ▼           ▼      │
│                                         ALLOW       CHALLENGE / │
│                                         ACCESS        BLOCK     │
└─────────────────────────────────────────────────────────────────┘
```

### Step-by-Step Flow

**1. Silent Collection** — `collector.js`
Every user interaction (mouse move, key press, scroll, click) is captured via native DOM event listeners and stored in rolling circular buffers. No interaction is ever missed; old data is automatically evicted to keep memory constant.

**2. Feature Extraction** — `features.js`
Raw event data is transformed into 8 normalized statistical features that form the model's input vector. This happens in under 1ms using pure JavaScript math.

**3. ML Classification** — `model.js`
The XGBoost-Lite model runs inference across 8 decision trees, summing weighted votes into a final sigmoid-bounded human probability score.

**4. Decision & Action** — `model.js` (DecisionEngine)
The probability score is mapped to a verdict: ALLOW, CHALLENGE, or BLOCK. High-confidence human sessions are never interrupted.

**5. Broadcast** — `broadcast.js`
The full feature payload, probability, and raw signal snapshot are serialized to `localStorage` for cross-window consumption, enabling seamless multi-page protection.

---

## 📊 Behavioral Signals Captured

| Signal | What It Captures | Why It Matters |
|---|---|---|
| **Mouse Speed CV** | Coefficient of variation of cursor velocity | Bots move at constant speed; humans vary wildly |
| **Acceleration Variance** | Std. deviation of speed changes | Human micro-tremors create high accel variance |
| **Typing Mean (IKI)** | Average inter-key interval in ms | Bots type at inhuman speed (10-20ms intervals) |
| **Typing Std Dev** | Rhythm irregularity of keystrokes | Humans show natural cadence variation |
| **Click Std Dev** | Variance in time between clicks | Bots click at perfectly uniform intervals |
| **Scroll Variance** | Irregularity of scroll delta values | Human scrolling is organic and inconsistent |
| **Session Entropy** | Shannon entropy of speed + scroll distribution | High entropy = unpredictable = human |
| **Path Linearity** | Ratio of straight-line to actual path length | Humans curve naturally (linearity < 0.88) |

---

## 🧠 ML Model — XGBoost-Lite

GhostGuard implements a custom **8-tree Gradient Boosting Ensemble** in pure JavaScript — no external ML library required.

```javascript
// Each tree is a threshold function returning a weighted vote
trees: [
  (f) => (f.cv > 0.35 ? +0.22 : f.cv > 0.15 ? +0.09 : -0.20),        // Speed variance
  (f) => (f.accelVar > 100 ? +0.20 : f.accelVar > 30 ? +0.09 : -0.18), // Acceleration jitter
  (f) => (f.typingMean > 90 ? +0.17 : f.typingMean > 40 ? +0.08 : -0.22), // Typing speed
  (f) => (f.typingStd > 50 ? +0.18 : f.typingStd > 20 ? +0.08 : -0.22),   // Typing rhythm
  (f) => (f.clickStd > 80 ? +0.14 : f.clickStd > 25 ? +0.06 : -0.16),     // Click variance
  (f) => (f.scrollVar > 40 ? +0.12 : f.scrollVar > 10 ? +0.04 : -0.13),   // Scroll pattern
  (f) => (f.linearity < 0.65 ? +0.15 : f.linearity < 0.88 ? +0.05 : -0.17), // Path curvature
  (f) => (f.entropy > 0.55 ? +0.12 : f.entropy > 0.30 ? +0.04 : -0.10),    // Session entropy
]
```

**Final Score:**
```
score = Σ tree_votes
humanProbability = clamp(0.5 + score, 0.02, 0.98)
```

Each tree is independently calibrated and contributes a positive vote (evidence of human) or negative vote (evidence of bot). The ensemble aggregates these weighted signals into a single reliable probability.

---

## 📐 Feature Engineering

```javascript
// Core mathematical primitives used in GhostGuard
mean(arr)          // Arithmetic mean of any signal array
stddev(arr)        // Population standard deviation
pathLinearity(pts) // Euclidean distance / actual path length
sessionEntropy(speeds, scrolls) // Shannon entropy across 8 frequency buckets

// Final 8-feature vector fed to the model
{
  cv,          // Coefficient of variation of mouse speed
  accelVar,    // Std dev of acceleration values
  typingMean,  // Mean inter-key interval
  typingStd,   // Std dev of inter-key intervals
  clickStd,    // Std dev of inter-click intervals
  scrollVar,   // Std dev of scroll delta values
  entropy,     // Session Shannon entropy score
  linearity    // Mouse path linearity score
}
```

---

## 🎯 Decision Engine

```javascript
classify(humanProb) {
  if (humanProb > 0.75) → HUMAN     | Action: ALLOW    | Confidence: HIGH
  if (humanProb > 0.40) → SUSPICIOUS | Action: CHALLENGE | Confidence: LOW
  else                  → BOT        | Action: BLOCK    | Confidence: HIGH
}
```

| Verdict | Threshold | Action | Experience |
|---|---|---|---|
| ✅ **HUMAN** | > 75% | Allow access | Zero friction |
| ⚠️ **SUSPICIOUS** | 40–75% | Trigger minimal challenge | Lightweight fallback only |
| 🚫 **BOT** | < 40% | Block & log | Invisible to real users |

---

## 📂 Project Structure

```
GhostGuard-SDS/
│
├── 📄 index.html          # Enterprise Sign-In UI with live behavioral analysis panel
│
└── src/
    ├── 🕵️ collector.js    # DOM event listeners — captures mouse, keys, scroll, click
    ├── 📐 features.js     # Statistical math — mean, stddev, entropy, linearity, extractFeatures()
    ├── 🌲 model.js        # XGBoost-Lite ensemble + DecisionEngine (HUMAN / SUSPICIOUS / BOT)
    └── 📡 broadcast.js    # Cross-window sync via localStorage — real-time score sharing

├── 🧪 demo.js             # Node.js simulation — run HUMAN vs BOT side-by-side
├── 📋 README.md           # This file
└── ⚖️ LICENSE             # MIT License
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | Vanilla HTML5 + CSS3 + ES6 JS | Zero-dependency browser UI |
| **ML Engine** | XGBoost-Lite (custom JS) | Real-time in-browser inference |
| **Signal Math** | Pure JavaScript | Statistical feature engineering |
| **Cross-Window Comms** | Browser Storage API (`localStorage`) | Multi-page behavioral continuity |
| **Runtime** | Browser-native or Node.js | Flexible deployment |
| **Styling** | CSS Custom Properties + Inter font | Clean, responsive enterprise UI |

---

## 🚀 Getting Started

### Prerequisites
- Any modern browser (Chrome, Firefox, Edge, Safari)
- Node.js v14+ (for simulation only)

### Option 1 — Browser Demo (No Installation)

```bash
# Clone the repository
git clone https://github.com/omadityan1803-rgb/GhostGuard-SDS.git

# Navigate to the project
cd GhostGuard-SDS

# Open in browser
open index.html
# OR simply double-click index.html
```

### Option 2 — Node.js Environment

```bash
# Clone the repository
git clone https://github.com/omadityan1803-rgb/GhostGuard-SDS.git
cd GhostGuard-SDS

# No npm install needed — zero external dependencies!

# Run the demo simulation
node demo.js
```

---

## 🧪 Running the Simulation

`demo.js` runs a side-by-side HUMAN vs BOT classification test:

```bash
node demo.js
```

**Expected Output:**

```
--- PASSIVESHIELD SIMULATION ---

Scenario: HUMAN
Human Prob: 78.4% | Verdict: HUMAN

Scenario: BOT
Human Prob: 18.2% | Verdict: BOT
```

**What the simulation does:**

- **HUMAN scenario**: Injects realistic mouse speeds (400–1000px/s range with random variance) and typing intervals with natural rhythm variation
- **BOT scenario**: Injects perfectly uniform mouse speeds (constant 1500px/s) and robotically precise 20ms keystroke intervals
- Both run through the full feature extraction → XGBoost-Lite → DecisionEngine pipeline

---

## 🔌 Enterprise Integration

GhostGuard is designed as a **pluggable security component** for enterprise web applications.

### Frontend Integration

```html
<!-- Add to any page — works instantly -->
<script src="src/collector.js"></script>
<script src="src/features.js"></script>
<script src="src/model.js"></script>
<script src="src/broadcast.js"></script>

<script>
  // Initialize collection on page load
  document.addEventListener('mousemove', e => Collector.onMouseMove(e.clientX, e.clientY));
  document.addEventListener('keydown', () => Collector.onKeyDown());
  document.addEventListener('wheel', e => Collector.onScroll(e.deltaY), { passive: true });
  document.addEventListener('click', () => Collector.onClick());
</script>
```

### Reading the Trust Score from Any Page

```javascript
// On any downstream page (dashboard, checkout, etc.)
const payload = JSON.parse(localStorage.getItem('ps_signal'));
const { prob, features, meta } = payload;

if (prob > 0.75) {
  // Trust this session — proceed normally
} else if (prob > 0.40) {
  // Trigger lightweight challenge (OTP, slider, etc.)
} else {
  // Block — automated bot detected
}
```

### API / Backend Integration (Recommended for Production)

```javascript
// Send behavioral features to your backend for server-side classification
fetch('/api/verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    features: extractFeatures(Collector.state),
    sessionId: crypto.randomUUID(),
    timestamp: Date.now()
  })
});

// Backend returns: { verdict: 'HUMAN' | 'SUSPICIOUS' | 'BOT', confidence: number }
```

---

## 🔒 Privacy-First Design

GhostGuard was built with privacy as a non-negotiable constraint:

- ✅ **No PII collected** — only anonymous interaction timing and movement vectors
- ✅ **No server transmission** — all ML inference runs client-side by default
- ✅ **No biometric storage** — raw behavioral data is held only in rolling in-memory buffers
- ✅ **No third-party calls** — zero external dependencies, no data leaves the browser
- ✅ **GDPR-compatible** — behavioral signals are ephemeral and non-identifiable
- ✅ **No fingerprinting** — does not use device identifiers, IP addresses, or hardware fingerprints

> GhostGuard protects your users **without** becoming a surveillance tool.

---

## 📈 Evaluation Metrics

| Metric | GhostGuard Performance |
|---|---|
| **Zero-friction for humans** | ✅ 100% — real users are never interrupted on high-confidence sessions |
| **Bot detection rate** | ✅ High — uniform bot behavior scores <0.25 probability |
| **Inference latency** | ✅ <1ms — XGBoost-Lite runs synchronously in browser |
| **Memory footprint** | ✅ Minimal — rolling buffers cap at 40–80 samples |
| **External dependencies** | ✅ Zero — pure JavaScript, runs offline |
| **Cross-page continuity** | ✅ Full — localStorage broadcast maintains session state |

---

## 🗺️ Roadmap

- [x] Core behavioral collection engine
- [x] 8-feature statistical extraction pipeline
- [x] XGBoost-Lite in-browser ML model
- [x] DecisionEngine with 3-tier verdict system
- [x] Cross-window broadcaster
- [x] Enterprise Sign-In demo UI with live analysis panel
- [ ] Backend REST API wrapper for server-side ensemble
- [ ] React/TypeScript SDK package (`ghostguard-react`)
- [ ] Angular integration module
- [ ] Configurable threshold tuning via admin dashboard
- [ ] Adaptive fallback challenge library (minimal interaction triggers)
- [ ] Model retraining pipeline with labeled session data
- [ ] WebAssembly (WASM) port for 10x inference speedup
- [ ] Enterprise admin dashboard with session analytics

---

## 👥 Team

Built with 💙 for the **SDS Hackathon — Problem Statement #3**:
*Develop an ML-Based Passive Human Verification System as an Alternative to CAPTCHA*

| # | Name | Role |
|---|---|---|
| 🏆 | **Sushmit Kumar Singh** | Team Leader |
| 👨‍💻 | **Om Adityan** | Team Member |
| 👨‍💻 | **Nikhith Lingam** | Team Member |

**Team Name: LFG**

| Role | Contribution |
|---|---|
| ML Architecture | XGBoost-Lite design, feature calibration, threshold tuning |
| Frontend Engineering | Enterprise UI, live analysis panel, event collection |
| Signal Processing | Statistical feature engineering, entropy & linearity math |
| Integration Design | Cross-window broadcast, enterprise API flow |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

```
MIT License — Free to use, modify, and distribute with attribution.
```

---

<div align="center">

**GhostGuard — PassiveShield**

*Protecting enterprise applications, one behavioral signal at a time.*

⭐ **Star this repo** if GhostGuard inspires your work!

[![GitHub stars](https://img.shields.io/github/stars/omadityan1803-rgb/GhostGuard-SDS?style=social)](https://github.com/omadityan1803-rgb/GhostGuard-SDS)

</div>
