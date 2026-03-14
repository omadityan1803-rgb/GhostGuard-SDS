import joblib
import numpy as np
import json
import logging
import os
from typing import Dict, Any

from app.config import settings

logger = logging.getLogger("ghostguard.ml")

FEATURES = [
    "mouse_entropy",
    "mouse_avg_speed",
    "mouse_direction_changes",
    "mouse_straight_line_ratio",
    "mouse_pause_count",
    "key_avg_dwell",
    "key_avg_flight",
    "key_rhythm_consistency",
    "key_backspace_ratio",
    "key_typing_speed",
    "scroll_depth",
    "scroll_avg_speed",
    "scroll_direction_changes",
    "scroll_reading_pattern",
    "session_duration",
    "request_timing_variance"
]


class BotScoreModel:

    def __init__(self):
        self.model   = None
        self.scaler  = None
        self.features = FEATURES
        self._load()

    def _load(self):
        try:
            self.model  = joblib.load(settings.MODEL_PATH)
            self.scaler = joblib.load(settings.SCALER_PATH)
            logger.info("ML model and scaler loaded successfully.")
        except FileNotFoundError:
            logger.warning(
                "Model files not found. Using rule-based fallback scorer. "
                "Run ml/train.py to generate model.pkl and scaler.pkl"
            )
            self.model  = None
            self.scaler = None

        # Load feature list if exists
        if os.path.exists(settings.FEATURES_PATH):
            with open(settings.FEATURES_PATH) as f:
                self.features = json.load(f)

    def extract_features(self, payload: Dict[str, Any]) -> np.ndarray:
        m = payload.get("mouse",    {})
        k = payload.get("keyboard", {})
        s = payload.get("scroll",   {})
        sess = payload.get("session", {})
        meta = payload.get("requestMeta", {})

        vector = [
            float(m.get("entropy",             0)),
            float(m.get("avgSpeed",            0)),
            float(m.get("directionChanges",    0)),
            float(m.get("straightLineRatio",   1)),
            float(m.get("pauseCount",          0)),
            float(k.get("avgDwellTime",        0)),
            float(k.get("avgFlightTime",       0)),
            float(k.get("rhythmConsistency",   0)),
            float(k.get("backspaceRatio",      0)),
            float(k.get("typingSpeed",         0)),
            float(s.get("scrollDepth",         0)),
            float(s.get("avgScrollSpeed",      0)),
            float(s.get("scrollDirectionChanges", 0)),
            float(s.get("readingPatternScore", 0)),
            float(payload.get("sessionDuration", 0)),
            float(meta.get("timingVariance",   0)),
        ]

        return np.array(vector, dtype=np.float64).reshape(1, -1)

    def _rule_based_score(self, payload: Dict[str, Any]) -> int:
        """
        Fallback rule-based scorer when ML model is not trained yet.
        Uses hand-crafted heuristics — good enough for demo.
        """
        m = payload.get("mouse",    {})
        k = payload.get("keyboard", {})
        s = payload.get("scroll",   {})

        score = 0

        # Mouse signals (max 35 points)
        entropy = float(m.get("entropy", 0))
        if entropy > 0.5:   score += 15
        elif entropy > 0.2: score += 8

        direction_changes = int(m.get("directionChanges", 0))
        if direction_changes > 15: score += 10
        elif direction_changes > 5: score += 5

        straight = float(m.get("straightLineRatio", 1))
        if straight < 0.5: score += 10  # Curved = human

        # Keyboard signals (max 35 points)
        dwell = float(k.get("avgDwellTime", 0))
        if 60 < dwell < 250:   score += 10  # Human range
        elif dwell > 0:         score += 3

        rhythm = float(k.get("rhythmConsistency", 0))
        if rhythm > 0.4: score += 10
        elif rhythm > 0.2: score += 5

        backspace = float(k.get("backspaceRatio", 0))
        if backspace > 0.02: score += 8  # Humans make typos

        typing_speed = float(k.get("typingSpeed", 0))
        if 20 < typing_speed < 120: score += 7

        # Scroll signals (max 20 points)
        depth = float(s.get("scrollDepth", 0))
        if depth > 0.1: score += 8

        reading = float(s.get("readingPatternScore", 0))
        if reading > 0.3: score += 7

        dir_changes = int(s.get("scrollDirectionChanges", 0))
        if dir_changes > 0: score += 5

        # Session (max 10 points)
        duration = float(payload.get("sessionDuration", 0))
        if duration > 3000:  score += 10
        elif duration > 1000: score += 5

        return min(100, score)

    def score(self, payload: Dict[str, Any]) -> int:
        if self.model is None or self.scaler is None:
            logger.debug("Using rule-based fallback scorer.")
            return self._rule_based_score(payload)

        try:
            features = self.extract_features(payload)
            features_scaled = self.scaler.transform(features)
            # Probability of being human (class 1)
            prob = self.model.predict_proba(features_scaled)[0][1]
            return int(round(prob * 100))
        except Exception as e:
            logger.error(f"ML scoring error: {e}", exc_info=True)
            return self._rule_based_score(payload)


# ─── Singleton ────────────────────────────────────────────────────────────────
_model_instance: BotScoreModel | None = None

def get_model() -> BotScoreModel:
    global _model_instance
    if _model_instance is None:
        _model_instance = BotScoreModel()
    return _model_instance
