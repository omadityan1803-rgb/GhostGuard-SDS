# 👻 GhostGuard

> **ML-Based Passive Human Verification System — CAPTCHA Alternative**

> _"Real users feel nothing. Bots get stopped."_

---

## 🧠 What is GhostGuard?

GhostGuard is an intelligent machine learning-based passive human verification
system that replaces traditional CAPTCHA. Instead of asking users to solve
puzzles, GhostGuard silently analyzes 15+ behavioral signals in the background
and generates a **Human Confidence Score (0–100)** to determine if the user
is human or a bot — all without any interruption.

---

## ⚡ How It Works
```
Browser SDK → Collect 15+ Signals → ML Model → Human Confidence Score → Decision
```

| Score | Verdict | Action |
|-------|---------|--------|
| ≥ 75  | ✅ PASS | Token issued, user continues seamlessly |
| 40–74 | ⚠️ SOFT FLAG | Flagged for review |
| < 40  | ❌ CHALLENGE | SmartFallback challenge triggered |

---

## 🔍 Signals Collected (PassiveSense Engine)

| Category | Signals |
|----------|---------|
| 🖱️ Mouse | Entropy, speed, direction changes, straight-line ratio, pause count |
| ⌨️ Keyboard | Dwell time, flight time, rhythm consistency, backspace ratio, typing speed |
| 📜 Scroll | Depth, speed, direction changes, reading pattern score |
| 🖥️ Device | Canvas hash, WebGL renderer, screen resolution, timezone, language |
| 🔗 Session | Duration, tab switches, idle time, copy-paste detection, focus changes |

---

## 🏗️ System Architecture
```
┌─────────────────────────────────────────────────────────┐
│                     BROWSER LAYER                        │
│         GhostGuard JS SDK (TypeScript < 12KB)           │
│              PassiveSense Engine — 15+ signals          │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    API GATEWAY                           │
│              FastAPI + Redis Cache                       │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    ML ENGINE                             │
│         XGBoost Classifier → ONNX Runtime               │
│              Human Confidence Score 0–100               │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  DECISION LAYER                          │
│        PASS (≥75) / SOFT FLAG (40–74) / CHALLENGE (<40) │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| Browser SDK | TypeScript + WebAssembly |
| ML Model | XGBoost → ONNX Runtime |
| Backend API | FastAPI (Python) |
| Cache | Redis |
| Database | PostgreSQL |
| Dashboard | React + Recharts + Tailwind |
| Deployment | Docker + Kubernetes |

---

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed
- Git installed

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/ghostguard.git
cd ghostguard
```

### 2. Generate training data and train the ML model
```bash
pip install pandas numpy scikit-learn xgboost joblib
python ml/data_gen.py
python ml/train.py
```

### 3. Start all services
```bash
docker compose up --build
```

### 4. Open the demo
```
Demo page  →  open demo/index.html in your browser
Backend    →  http://localhost:8000
API Docs   →  http://localhost:8000/docs
Dashboard  →  http://localhost:3000
```

---

## 📁 Project Structure
```
ghostguard/
├── sdk/                  # Browser JS SDK (TypeScript)
│   └── src/
│       ├── index.ts      # Main SDK entry point
│       └── signals/      # Mouse, keyboard, scroll, fingerprint, session
├── backend/              # FastAPI Python backend
│   └── app/
│       ├── main.py       # FastAPI app
│       ├── routes/       # verify.py, admin.py
│       ├── ml/           # model.py, threshold.py
│       ├── db/           # database.py, models.py
│       └── utils/        # logger.py, security.py
├── ml/                   # Model training scripts
│   ├── data_gen.py       # Generate training data
│   ├── train.py          # Train XGBoost model
│   └── export_onnx.py    # Export to ONNX
├── dashboard/            # React admin dashboard
│   └── src/
│       ├── pages/        # Overview, Logs
│       └── components/   # StatCard, VerdictBadge, ScoreGauge etc
├── demo/                 # Demo web page
│   └── index.html
└── docker-compose.yml    # Full stack deployment
```

---

## 📊 Expected Impact

| Metric | Improvement |
|--------|------------|
| User Experience | No CAPTCHA friction during login or checkout |
| Conversion Rate | Up to 25% boost (no active challenges) |
| Bot API Abuse | Up to 80% reduction |
| Privacy | Zero PII collected — GDPR/CCPA compliant |
| Integration Time | Under 30 minutes for enterprise teams |

---

## 🔒 Privacy First Design

- ✅ Zero PII collected or stored
- ✅ All session IDs hashed before storage
- ✅ Anonymized feature vectors only
- ✅ GDPR and CCPA compliant by design
- ✅ No third-party data sharing

---

## 🧪 API Usage Example
```bash
curl -X POST http://localhost:8000/api/v1/verify \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "user-session-123",
    "siteKey": "your-site-key",
    "sessionDuration": 45000,
    "mouse": { "entropy": 0.82, "avgSpeed": 0.31,
               "directionChanges": 24, "straightLineRatio": 0.28,
               "pauseCount": 7 },
    "keyboard": { "avgDwellTime": 115, "avgFlightTime": 148,
                  "rhythmConsistency": 0.65, "backspaceRatio": 0.06,
                  "typingSpeed": 58 },
    "scroll": { "scrollDepth": 0.45, "avgScrollSpeed": 0.52,
                "scrollDirectionChanges": 3, "readingPatternScore": 0.72 },
    "fingerprint": { "canvasHash": "abc123", "webglRenderer": "Intel Iris" },
    "requestMeta": { "userAgent": "Mozilla/5.0", "timestamp": 1700000000,
                     "timingVariance": 450 }
  }'
```

**Response:**
```json
{
  "success": true,
  "score": 87,
  "verdict": "PASS",
  "token": "a3f2b1c4d5e6f7a8.1700000000.9b8c7d6e",
  "sessionId": "user-session-123",
  "timestamp": 1700000000,
  "message": "Human verified. Access granted."
}
```

---

## 👥 Team LFG

| Name | Role |
|------|------|
| Sushmit Kumar Singh | Team Leader |
| Om Adityan | Member |
| Nikhith Lingam | Member |

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
```

---

**6.** Scroll down → click **Commit changes** → click the green **Commit changes** button

---

## One Important Thing

In the README there is one line that says:
```
git clone https://github.com/YOUR_USERNAME/ghostguard.git
