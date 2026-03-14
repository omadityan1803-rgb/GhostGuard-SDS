<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GhostGaurd — Sign In</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{--bg:#f4f6f9;--card:#fff;--border:#e2e6ea;--input-bg:#f8f9fb;--label:#6b7280;--text:#1a1d23;--sub:#9ca3af;--blue:#2563eb;--blue-h:#1d4ed8;--sh:0 1px 3px rgba(0,0,0,.08),0 8px 32px rgba(0,0,0,.06);}
  body{font-family:'Inter',-apple-system,sans-serif;background:var(--bg);min-height:100vh;display:flex;flex-direction:column;}
  body::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(37,99,235,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.03) 1px,transparent 1px);background-size:32px 32px;pointer-events:none;z-index:0;}
  .topbar{position:relative;z-index:1;background:#fff;border-bottom:1px solid var(--border);padding:0 2rem;height:56px;display:flex;align-items:center;justify-content:space-between;}
  .brand{display:flex;align-items:center;gap:10px;font-size:15px;font-weight:600;color:var(--text);}
  .brand img{height:28px;width:auto;object-fit:contain;}
  .pbar{background:linear-gradient(90deg,#eff6ff,#f0fdf4);border-bottom:1px solid #bfdbfe;padding:8px 2rem;display:flex;align-items:center;gap:8px;font-size:11px;color:#1d4ed8;position:relative;z-index:1;flex-wrap:wrap;}
  .dot{width:6px;height:6px;border-radius:50%;background:#3b82f6;box-shadow:0 0 6px #3b82f6;flex-shrink:0;animation:blink 2s ease-in-out infinite;}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:.4}}
  main{position:relative;z-index:1;flex:1;display:flex;align-items:center;justify-content:center;padding:2rem;}
  .wrap{width:100%;max-width:440px;}
  .logo-block{text-align:center;margin-bottom:2rem;animation:fadeDown .5s ease both;}
  .logo-img-wrap{display:inline-flex;align-items:center;justify-content:center;width:72px;height:72px;background:#fff;border:1px solid var(--border);border-radius:18px;margin-bottom:12px;box-shadow:var(--sh);overflow:hidden;}
  .logo-img-wrap img{width:52px;height:auto;object-fit:contain;}
  .org{font-size:22px;font-weight:700;color:var(--text);letter-spacing:-.4px;}
  .tag{font-size:13px;color:var(--sub);margin-top:3px;}
  .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:2rem;box-shadow:var(--sh);animation:fadeUp .5s .1s ease both;}
  .card-title{font-size:18px;font-weight:600;color:var(--text);margin-bottom:4px;}
  .card-sub{font-size:13px;color:var(--sub);margin-bottom:1.75rem;}
  .fg{margin-bottom:1.1rem;}
  label{display:block;font-size:12px;font-weight:500;color:var(--label);margin-bottom:6px;letter-spacing:.02em;}
  .iw{position:relative;}
  .ii{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#c4c9d4;pointer-events:none;display:flex;}
  input[type=email],input[type=password]{width:100%;height:42px;background:var(--input-bg);border:1px solid var(--border);border-radius:9px;padding:0 12px 0 38px;font-size:14px;font-family:inherit;color:var(--text);outline:none;transition:border-color .15s,box-shadow .15s;}
  input:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,.1);background:#fff;}
  input::placeholder{color:#c4c9d4;}
  .opts{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;}
  .cb{display:flex;align-items:center;gap:7px;font-size:13px;color:var(--label);cursor:pointer;}
  .cb input{width:15px;height:15px;padding:0;accent-color:var(--blue);}
  .forgot{font-size:13px;color:var(--blue);cursor:pointer;}
  .btn{width:100%;height:44px;background:var(--blue);color:#fff;border:none;border-radius:9px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;box-shadow:0 2px 8px rgba(37,99,235,.3);display:flex;align-items:center;justify-content:center;gap:8px;transition:background .15s,transform .1s;}
  .btn:hover{background:var(--blue-h);}
  .btn:active{transform:scale(.98);}
  .btn.loading{pointer-events:none;opacity:.7;}
  .spinner{width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;display:none;}
  .btn.loading .spinner{display:block;}
  .btn.loading .bt{display:none;}
  .div{display:flex;align-items:center;gap:12px;margin:1.5rem 0;}
  .div::before,.div::after{content:'';flex:1;height:1px;background:var(--border);}
  .div span{font-size:11px;color:var(--sub);white-space:nowrap;}
  .sso{display:flex;gap:8px;}
  .sbtn{flex:1;height:38px;background:var(--input-bg);border:1px solid var(--border);border-radius:8px;font-size:12px;font-weight:500;font-family:inherit;color:var(--label);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:border-color .15s,background .15s;}
  .sbtn:hover{border-color:#c9d0db;background:#fff;}
  .live-panel{margin-top:1.25rem;background:#fff;border:1px solid var(--border);border-radius:12px;overflow:hidden;box-shadow:var(--sh);}
  .lp-head{padding:10px 14px;background:#f8f9fb;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
  .lp-title{font-size:11px;font-weight:600;color:var(--label);letter-spacing:.05em;text-transform:uppercase;display:flex;align-items:center;gap:6px;}
  .sig-grid{display:grid;grid-template-columns:1fr 1fr 1fr;}
  .sc{padding:10px 12px;border-right:1px solid var(--border);border-bottom:1px solid var(--border);}
  .sc:nth-child(3n){border-right:none;}
  .sc:nth-last-child(-n+3){border-bottom:none;}
  .sn{font-size:10px;color:var(--sub);margin-bottom:3px;}
  .sv{font-size:15px;font-weight:600;color:var(--text);font-variant-numeric:tabular-nums;transition:color .2s;}
  .sv.flash{color:var(--blue);}
  .score-row{padding:10px 14px;border-top:1px solid var(--border);display:flex;align-items:center;gap:10px;}
  .sl{font-size:11px;color:var(--label);white-space:nowrap;font-weight:500;}
  .st{flex:1;height:6px;background:#f0f2f5;border-radius:3px;overflow:hidden;}
  .sf{height:100%;border-radius:3px;transition:width .4s cubic-bezier(.4,0,.2,1),background .3s;width:0%;background:#d1d5db;}
  .sp{font-size:12px;font-weight:600;min-width:34px;text-align:right;color:var(--sub);transition:color .3s;}
  .stag{font-size:10px;font-weight:600;padding:2px 8px;border-radius:20px;letter-spacing:.04em;background:#f3f4f6;color:#9ca3af;}
  .ch-info{padding:8px 14px;background:#f0fdf4;border-top:1px solid #bbf7d0;font-size:10px;color:#15803d;display:flex;align-items:center;gap:6px;}
  footer{position:relative;z-index:1;border-top:1px solid var(--border);background:#fff;padding:14px 2rem;display:flex;justify-content:space-between;align-items:center;}
  footer p{font-size:11px;color:var(--sub);}
  .fl{display:flex;gap:16px;}
  .fl a{font-size:11px;color:var(--sub);text-decoration:none;}
  @keyframes fadeDown{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  @keyframes spin{to{transform:rotate(360deg)}}
</style>
</head>
<body>

<div class="topbar">
  <div class="brand">
    <img src="data:image/jpeg;base64,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" alt="Logo">
    GhostGaurd Corp
  </div>
  <div style="font-size:12px;color:var(--sub)">Need help? <span style="color:var(--blue);cursor:pointer">Contact IT Support</span></div>
</div>

<div class="pbar">
  <div class="dot"></div>
  <strong>PassiveShield active</strong> — Move mouse · Type · Scroll. Open <strong>page2-detection.html</strong> in a separate Chrome window to see real-time detection.
  <span id="broadcastStatus" style="margin-left:auto;padding:2px 10px;background:#dcfce7;color:#15803d;border-radius:12px;font-weight:600;border:1px solid #bbf7d0">● Broadcasting</span>
</div>

<main>
  <div class="wrap">
    <div class="logo-block">
      <div class="logo-img-wrap"><img src="data:image/jpeg;base64,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" alt=""></div>
      <div class="org">GhostGaurd</div>
      <div class="tag">Enterprise Identity Platform</div>
    </div>

    <div class="card">
      <div class="card-title">Welcome back</div>
      <div class="card-sub">Sign in to your organization account</div>
      <form id="loginForm" onsubmit="handleLogin(event)">
        <div class="fg">
          <label for="email">Work email address</label>
          <div class="iw">
            <span class="ii"><svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg></span>
            <input type="email" id="email" placeholder="you@company.com" autocomplete="email">
          </div>
        </div>
        <div class="fg">
          <label for="password">Password</label>
          <div class="iw">
            <span class="ii"><svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
            <input type="password" id="password" placeholder="Enter your password" autocomplete="current-password">
          </div>
        </div>
        <div class="opts">
          <label class="cb"><input type="checkbox"> Keep me signed in</label>
          <span class="forgot">Forgot password?</span>
        </div>
        <button class="btn" id="loginBtn" type="submit">
          <div class="spinner"></div>
          <span class="bt">Sign in to workspace</span>
        </button>
      </form>
      <div class="div"><span>or continue with</span></div>
      <div class="sso">
        <button class="sbtn"><svg width="14" height="14" viewBox="0 0 48 48"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84a10.12 10.12 0 0 1-4.39 6.65v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.18z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.69 28.18A14.97 14.97 0 0 1 10.9 24c0-1.45.25-2.86.79-4.18v-5.7H4.34A22 22 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/><path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 3.18 29.93 1 24 1 15.4 1 7.96 5.93 4.34 14.12l7.35 5.7C13.42 13.62 18.27 9.75 24 9.75z"/></svg> Google SSO</button>
        <button class="sbtn"><svg width="14" height="14" viewBox="0 0 23 23" fill="none"><path fill="#f25022" d="M0 0h11v11H0z"/><path fill="#00a4ef" d="M12 0h11v11H12z"/><path fill="#7fba00" d="M0 12h11v11H0z"/><path fill="#ffb900" d="M12 12h11v11H12z"/></svg> Microsoft</button>
      </div>
    </div>

    <div class="live-panel">
      <div class="lp-head">
        <div class="lp-title"><div class="dot"></div>Live signal preview (this window)</div>
        <span style="font-size:10px;color:var(--sub)" id="evCount">0 events</span>
      </div>
      <div class="sig-grid">
        <div class="sc"><div class="sn">Mouse X</div><div class="sv" id="d-mx">—</div></div>
        <div class="sc"><div class="sn">Mouse Y</div><div class="sv" id="d-my">—</div></div>
        <div class="sc"><div class="sn">Speed</div><div class="sv" id="d-spd">—</div></div>
        <div class="sc"><div class="sn">Typing latency</div><div class="sv" id="d-tlat">—</div></div>
        <div class="sc"><div class="sn">Keystroke σ</div><div class="sv" id="d-tstd">—</div></div>
        <div class="sc"><div class="sn">Path linearity</div><div class="sv" id="d-lin">—</div></div>
      </div>
      <div class="score-row">
        <span class="sl">Human score</span>
        <div class="st"><div class="sf" id="scoreFill"></div></div>
        <span class="sp" id="scorePct">—</span>
        <span class="stag" id="statusTag">PENDING</span>
      </div>
      <div class="ch-info">
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
        localStorage broadcast → page2 window receives via storage event (works across separate Chrome windows)
      </div>
    </div>
  </div>
</main>

<footer>
  <p>© 2026 SecureVerify Corp. All rights reserved.</p>
  <div class="fl"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Security</a></div>
</footer>

<script>
// ════════════════════════════════════════════════════════════════
//  PASSIVESHIELD — PAGE 1 (Login)
//  Signal collection + localStorage broadcast
//  Cross-window mechanism: localStorage 'storage' event fires in
//  ALL other windows of the same origin when we write here.
// ════════════════════════════════════════════════════════════════

const CHANNEL = 'ps_signal'; // localStorage key

const S = {
  mouseSpeeds: [], mouseAccels: [], mousePositions: [],
  clickTimes:  [], keyTimes:    [], scrollDeltas:   [],
  interactions: 0, lastMouse: null, startTime: performance.now(),
};

// ── Math helpers ──────────────────────────────────────────────
const mean = a => a.length ? a.reduce((x,y)=>x+y,0)/a.length : 0;
const std  = a => {
  if (a.length < 2) return 0;
  const m = mean(a);
  return Math.sqrt(a.reduce((x,y)=>x+(y-m)**2, 0) / a.length);
};

function pathLinearity(pts) {
  if (pts.length < 3) return 0.5;
  const dx = pts[pts.length-1].x - pts[0].x;
  const dy = pts[pts.length-1].y - pts[0].y;
  const straight = Math.sqrt(dx*dx + dy*dy) + 0.001;
  let path = 0;
  for (let i=1; i<pts.length; i++) {
    const ddx = pts[i].x - pts[i-1].x, ddy = pts[i].y - pts[i-1].y;
    path += Math.sqrt(ddx*ddx + ddy*ddy);
  }
  return Math.min(straight / path, 1);
}

function sessionEntropy() {
  const all = [...S.mouseSpeeds, ...S.scrollDeltas];
  if (all.length < 5) return 0.5;
  const buckets = new Array(8).fill(0);
  const mx = Math.max(...all) || 1;
  all.forEach(v => buckets[Math.min(7, Math.floor(v/mx*8))]++);
  let ent = 0;
  buckets.forEach(b => { if (b>0) { const p=b/all.length; ent -= p*Math.log2(p); }});
  return Math.min(ent/3, 1);
}

function typingIntervals() {
  const r = [];
  for (let i=1; i<S.keyTimes.length; i++) r.push(S.keyTimes[i] - S.keyTimes[i-1]);
  return r;
}
function clickIntervals() {
  const r = [];
  for (let i=1; i<S.clickTimes.length; i++) r.push(S.clickTimes[i] - S.clickTimes[i-1]);
  return r;
}

// ── XGBoost-lite (8-tree gradient boosting ensemble) ─────────
function xgboost(f) {
  let s = 0;
  s += f.cv > 0.35 ? 0.22 : f.cv > 0.15 ? 0.09 : -0.20;
  s += f.accelVar > 100 ? 0.20 : f.accelVar > 30 ? 0.09 : -0.18;
  s += f.typingMean > 90 ? 0.17 : f.typingMean > 40 ? 0.08 : -0.22;
  s += f.typingStd  > 50 ? 0.18 : f.typingStd  > 20 ? 0.08 : -0.22;
  s += f.clickStd   > 80 ? 0.14 : f.clickStd   > 25 ? 0.06 : -0.16;
  s += f.scrollVar  > 40 ? 0.12 : f.scrollVar  > 10 ? 0.04 : -0.13;
  s += f.linearity  < 0.65 ? 0.15 : f.linearity < 0.88 ? 0.05 : -0.17;
  s += f.entropy    > 0.55 ? 0.12 : f.entropy   > 0.30 ? 0.04 : -0.10;
  return Math.max(0.02, Math.min(0.98, 0.5 + s));
}

// ── Build feature vector & broadcast ─────────────────────────
function broadcast() {
  if (S.interactions < 3) return;
  const ti = typingIntervals();
  const ci = clickIntervals();
  const f = {
    cv:         std(S.mouseSpeeds) / (mean(S.mouseSpeeds) || 1),
    speedMean:  mean(S.mouseSpeeds),
    accelVar:   std(S.mouseAccels),
    clickStd:   std(ci),
    typingMean: mean(ti),
    typingStd:  std(ti),
    scrollVar:  std(S.scrollDeltas),
    entropy:    sessionEntropy(),
    linearity:  pathLinearity(S.mousePositions),
  };
  const prob = xgboost(f);

  // ── KEY: write to localStorage so OTHER windows receive 'storage' event
  localStorage.setItem(CHANNEL, JSON.stringify({
    ts: Date.now(),
    features: f,
    prob,
    raw: {
      mouseSpeeds:    S.mouseSpeeds.slice(-50),
      mouseAccels:    S.mouseAccels.slice(-50),
      mousePositions: S.mousePositions.slice(-40),
      keyTimes:       S.keyTimes.slice(-40),
      scrollDeltas:   S.scrollDeltas.slice(-30),
      clickTimes:     S.clickTimes.slice(-10),
    },
    meta: {
      interactions: S.interactions,
      elapsed: performance.now() - S.startTime,
    }
  }));

  updateLocalUI(f, prob, ti);
}

let broadcastTimer = null;
function scheduleBroadcast() {
  if (broadcastTimer) return;
  broadcastTimer = setTimeout(() => { broadcastTimer = null; broadcast(); }, 80);
}

// ── Update local mini-panel ───────────────────────────────────
function flash(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('flash');
  setTimeout(() => el.classList.remove('flash'), 350);
}
function set(id, v) {
  const el = document.getElementById(id);
  if (el && el.textContent !== String(v)) { el.textContent = v; flash(id); }
}

function updateLocalUI(f, prob, ti) {
  const pct = Math.round(prob * 100);
  document.getElementById('scoreFill').style.width  = pct + '%';
  document.getElementById('scorePct').textContent   = pct + '%';
  const sf = document.getElementById('scoreFill');
  const sp = document.getElementById('scorePct');
  const tg = document.getElementById('statusTag');
  if (prob > 0.75) {
    sf.style.background = '#16a34a'; sp.style.color = '#16a34a';
    tg.style.cssText = 'font-size:10px;font-weight:600;padding:2px 8px;border-radius:20px;letter-spacing:.04em;background:#dcfce7;color:#15803d';
    tg.textContent = 'HUMAN';
  } else if (prob > 0.4) {
    sf.style.background = '#d97706'; sp.style.color = '#d97706';
    tg.style.cssText = 'font-size:10px;font-weight:600;padding:2px 8px;border-radius:20px;letter-spacing:.04em;background:#fef3c7;color:#92400e';
    tg.textContent = 'SUSPICIOUS';
  } else {
    sf.style.background = '#dc2626'; sp.style.color = '#dc2626';
    tg.style.cssText = 'font-size:10px;font-weight:600;padding:2px 8px;border-radius:20px;letter-spacing:.04em;background:#fee2e2;color:#991b1b';
    tg.textContent = 'BOT';
  }
  const lin = f.linearity;
  const tlat = f.typingMean, tstd = f.typingStd;
  set('d-tlat', ti.length > 0 ? Math.round(tlat) + 'ms' : '—');
  set('d-tstd', ti.length > 1 ? Math.round(tstd) + 'ms' : '—');
  set('d-lin',  isFinite(lin) ? lin.toFixed(3) : '—');
  set('d-spd',  f.speedMean > 0 ? Math.round(f.speedMean) + 'px/s' : '—');
  document.getElementById('evCount').textContent = S.interactions + ' events';
}

// ── Mouse ─────────────────────────────────────────────────────
document.addEventListener('mousemove', e => {
  const x = e.clientX, y = e.clientY, t = performance.now();
  set('d-mx', x); set('d-my', y);
  if (S.lastMouse) {
    const dx=x-S.lastMouse.x, dy=y-S.lastMouse.y, dt=t-S.lastMouse.t;
    if (dt > 0 && dt < 500) {
      const spd = Math.sqrt(dx*dx+dy*dy)/dt*1000;
      if (S.mouseSpeeds.length) S.mouseAccels.push(Math.abs(spd - S.mouseSpeeds[S.mouseSpeeds.length-1])/dt*1000);
      S.mouseSpeeds.push(spd);
      if (S.mouseSpeeds.length > 80) S.mouseSpeeds.shift();
      if (S.mouseAccels.length > 80) S.mouseAccels.shift();
    }
  }
  S.mousePositions.push({x, y, t});
  if (S.mousePositions.length > 60) S.mousePositions.shift();
  S.lastMouse = {x, y, t};
  S.interactions++;
  scheduleBroadcast();
});

document.addEventListener('click', e => {
  S.clickTimes.push(performance.now());
  if (S.clickTimes.length > 20) S.clickTimes.shift();
  S.interactions++;
  scheduleBroadcast();
});

document.addEventListener('wheel', e => {
  S.scrollDeltas.push(Math.abs(e.deltaY));
  if (S.scrollDeltas.length > 40) S.scrollDeltas.shift();
  S.interactions++;
  scheduleBroadcast();
}, {passive: true});

document.querySelectorAll('input').forEach(inp => {
  inp.addEventListener('keydown', () => {
    S.keyTimes.push(performance.now());
    if (S.keyTimes.length > 60) S.keyTimes.shift();
    S.interactions++;
    scheduleBroadcast();
  });
});

// ── Login submit ──────────────────────────────────────────────
function handleLogin(e) {
  e.preventDefault();
  document.getElementById('loginBtn').classList.add('loading');
  // Mark as logged in so page2 can show success state
  broadcast();
  localStorage.setItem('ps_loggedin', JSON.stringify({
    email: document.getElementById('email').value || 'user@company.com',
    ts: Date.now()
  }));
  // Stay on page — demo mode. In production would redirect.
  setTimeout(() => {
    document.getElementById('loginBtn').classList.remove('loading');
    document.querySelector('.bt').textContent = '✓ Signed in — detection running on page 2';
    document.getElementById('loginBtn').style.background = '#16a34a';
  }, 1000);
}
</script>
</body>
</html>
