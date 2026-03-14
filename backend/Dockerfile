FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create logs directory
RUN mkdir -p logs

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
```

---

### File 22
**Path:** `backend/.env.example`
```
# Copy this to .env and fill in your values

DATABASE_URL=postgresql://postgres:postgres@db:5432/ghostguard
REDIS_URL=redis://redis:6379
SECRET_KEY=your-super-secret-key-change-this
ENV=development
DEBUG=True
LOG_LEVEL=INFO
PASS_THRESHOLD=75
SOFT_THRESHOLD=40
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

---

## Final Backend Directory — Complete
```
backend/
├── app/
│   ├── __init__.py          ✓
│   ├── main.py              ✓
│   ├── config.py            ✓
│   ├── routes/
│   │   ├── __init__.py      ✓
│   │   ├── verify.py        ✓
│   │   └── admin.py         ✓
│   ├── ml/
│   │   ├── __init__.py      ✓
│   │   ├── model.py         ✓
│   │   ├── threshold.py     ✓
│   │   └── features.json    ✓
│   ├── db/
│   │   ├── __init__.py      ✓
│   │   ├── database.py      ✓
│   │   └── models.py        ✓
│   └── utils/
│       ├── __init__.py      ✓
│       ├── logger.py        ✓
│       └── security.py      ✓
├── tests/
│   ├── __init__.py          ✓
│   ├── test_verify.py       ✓
│   └── test_model.py        ✓
├── requirements.txt         ✓
├── Dockerfile               ✓
└── .env.example             ✓
