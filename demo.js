# Secure-Verify
ML-Based Passive Human Verification System
# 🛡️ PassiveShield — Behavioral Biometrics Bot Detection

**PassiveShield** is a lightweight, friction-free security algorithm designed to detect automated bots without using intrusive CAPTCHAs. It analyzes behavioral signals—such as mouse movement curvature, keystroke rhythm, and scroll variance—to differentiate between a human and a machine in real-time.

---

## 🚀 The Core Philosophy: "Perfectly Imperfect"
Human behavior is naturally noisy, irregular, and high-entropy. Machines, however, tend to be mathematically precise and uniform. **PassiveShield** leverages these biological "tells" to calculate a probability of humanity.



### 📊 Behavioral Signals Captured:
* **Mouse Path Linearity**: Humans move in curves; bots move in straight lines.
* **Typing Latency (Inter-key Intervals)**: Measures the rhythm and variance of keystrokes.
* **Acceleration Jitter**: Detects the micro-tremors inherent in human motor control.
* **Session Entropy**: Calculates the unpredictability of interaction patterns using Shannon Entropy.

---

## 🛠️ Tech Stack
* **Engine**: XGBoost-Lite (An 8-tree Gradient Boosting Ensemble).
* **Environment**: Browser-native (JavaScript) or Node.js.
* **Communication**: Cross-window synchronization via the Browser Storage API.
* **Math**: Statistical Feature Engineering (Standard Deviation, Coefficient of Variation, Euclidean Distance).

---

## 📂 Project Structure
```text
PassiveShield/
├── src/
│   ├── collector.js     # Behavioral data collection (Mouse, Keys, Scroll)
│   ├── features.js      # Math helpers & Feature Engineering
│   ├── model.js         # XGBoost-Lite & Decision Logic
│   └── broadcast.js     # Real-time Cross-window communication
├── demo.js              # Simulation script for Human vs. Bot testing
└── README.md            # Documentation
