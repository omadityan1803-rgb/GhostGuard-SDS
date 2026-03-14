from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

HUMAN_PAYLOAD = {
    "sessionId": "test-human-session-001",
    "siteKey": "demo-key",
    "sessionDuration": 45000,
    "mouse": {
        "entropy": 0.82,
        "avgSpeed": 0.31,
        "directionChanges": 24,
        "straightLineRatio": 0.28,
        "pauseCount": 7,
        "totalDistance": 1500
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
    "fingerprint": {
        "canvasHash": "abc123",
        "webglRenderer": "Intel Iris",
        "screenResolution": "1920x1080x2",
        "timezone": "Asia/Kolkata",
        "language": "en-IN",
        "hardwareConcurrency": 8,
        "deviceMemory": 8,
        "touchPoints": 0,
        "pluginCount": 3,
        "fontCount": 7
    },
    "session": {
        "sessionDuration": 45000,
        "tabVisibilityChanges": 0,
        "timeOnPage": 45000,
        "windowFocusChanges": 1,
        "requestTimingVariance": 450,
        "copyPasteDetected": False,
        "formInteractionTime": 3200,
        "idleTime": 2000,
        "mouseEnteredPage": True,
        "touchDevice": False
    },
    "requestMeta": {
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        "timestamp": 1700000000,
        "url": "https://example.com/login",
        "referrer": "https://google.com",
        "timingVariance": 450
    }
}

BOT_PAYLOAD = {
    "sessionId": "test-bot-session-001",
    "siteKey": "demo-key",
    "sessionDuration": 500,
    "mouse": {
        "entropy": 0.02,
        "avgSpeed": 0.0,
        "directionChanges": 0,
        "straightLineRatio": 1.0,
        "pauseCount": 0,
        "totalDistance": 0
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
    "fingerprint": {
        "canvasHash": "",
        "webglRenderer": "",
        "screenResolution": "1024x768x1",
        "timezone": "",
        "language": "",
        "hardwareConcurrency": 0,
        "deviceMemory": 0,
        "touchPoints": 0,
        "pluginCount": 0,
        "fontCount": 0
    },
    "session": {
        "sessionDuration": 500,
        "tabVisibilityChanges": 0,
        "timeOnPage": 500,
        "windowFocusChanges": 0,
        "requestTimingVariance": 2,
        "copyPasteDetected": False,
        "formInteractionTime": 500,
        "idleTime": 0,
        "mouseEnteredPage": False,
        "touchDevice": False
    },
    "requestMeta": {
        "userAgent": "python-requests/2.28.0",
        "timestamp": 1700000000,
        "url": "https://example.com/login",
        "referrer": "",
        "timingVariance": 2
    }
}


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_verify_human():
    response = client.post("/api/v1/verify", json=HUMAN_PAYLOAD)
    assert response.status_code == 200
    data = response.json()
    assert data["score"] >= 0
    assert data["verdict"] in ["PASS", "SOFT_FLAG", "CHALLENGE"]
    assert data["sessionId"] == HUMAN_PAYLOAD["sessionId"]


def test_verify_bot():
    response = client.post("/api/v1/verify", json=BOT_PAYLOAD)
    assert response.status_code == 200
    data = response.json()
    assert data["score"] >= 0
    assert data["verdict"] in ["PASS", "SOFT_FLAG", "CHALLENGE"]


def test_verify_missing_fields():
    response = client.post("/api/v1/verify", json={})
    assert response.status_code == 422  # Validation error
