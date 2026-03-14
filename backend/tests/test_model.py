from app.ml.model import BotScoreModel
from app.ml.threshold import make_decision, verify_token


def test_rule_based_human_score():
    model = BotScoreModel()
    human_payload = {
        "sessionDuration": 45000,
        "mouse": {
            "entropy": 0.82,
            "avgSpeed": 0.31,
            "directionChanges": 24,
            "straightLineRatio": 0.28,
            "pauseCount": 7
        },
        "keyboard": {
            "avgDwellTime": 115,
            "avgFlightTime": 148,
            "rhythmConsistency": 0.65,
            "backspaceRatio": 0.06,
            "typingSpeed": 58
        },
        "scroll": {
            "scrollDepth": 0.45,
            "avgScrollSpeed": 0.52,
            "scrollDirectionChanges": 3,
            "readingPatternScore": 0.72
        },
        "requestMeta": {"timingVariance": 450}
    }
    score = model._rule_based_score(human_payload)
    assert score >= 50, f"Human score too low: {score}"


def test_rule_based_bot_score():
    model = BotScoreModel()
    bot_payload = {
        "sessionDuration": 300,
        "mouse": {
            "entropy": 0.0,
            "avgSpeed": 0.0,
            "directionChanges": 0,
            "straightLineRatio": 1.0,
            "pauseCount": 0
        },
        "keyboard": {
            "avgDwellTime": 0,
            "avgFlightTime": 0,
            "rhythmConsistency": 0,
            "backspaceRatio": 0,
            "typingSpeed": 0
        },
        "scroll": {
            "scrollDepth": 0,
            "avgScrollSpeed": 0,
            "scrollDirectionChanges": 0,
            "readingPatternScore": 0
        },
        "requestMeta": {"timingVariance": 2}
    }
    score = model._rule_based_score(bot_payload)
    assert score <= 40, f"Bot score too high: {score}"


def test_threshold_pass():
    result = make_decision(80)
    assert result["verdict"] == "PASS"
    assert result["token"] is not None


def test_threshold_soft_flag():
    result = make_decision(55)
    assert result["verdict"] == "SOFT_FLAG"
    assert result["token"] is None


def test_threshold_challenge():
    result = make_decision(20)
    assert result["verdict"] == "CHALLENGE"
    assert result["token"] is None


def test_token_verify():
    result = make_decision(90)
    token = result["token"]
    assert verify_token(token) is True
    assert verify_token("invalid.token.here") is False
```

---

### File 20
**Path:** `backend/requirements.txt`
```
fastapi==0.110.0
uvicorn[standard]==0.27.0
pydantic==2.6.0
pydantic-settings==2.2.0
sqlalchemy==2.0.27
asyncpg==0.29.0
psycopg2-binary==2.9.9
alembic==1.13.1
redis==5.0.1
xgboost==2.0.3
scikit-learn==1.4.0
onnxruntime==1.17.1
onnxmltools==1.12.0
skl2onnx==1.16.0
joblib==1.3.2
numpy==1.26.4
pandas==2.2.0
python-dotenv==1.0.1
httpx==0.27.0
pytest==8.0.0
pytest-asyncio==0.23.5
