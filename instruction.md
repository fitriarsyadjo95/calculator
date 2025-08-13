# Simple Mobile‑Friendly Calculator — Instruction.md

This file is written for **Cursor**. Paste it into a new workspace and follow the steps. You’ll end up with a clean, responsive calculator you can deploy in minutes.

---

## 1) Project Goals
- Mobile‑first, thumb‑friendly keypad
- Supports `+ − × ÷ %`, decimals, parentheses, and clear/backspace
- Live expression display + computed result
- Keyboard input support (desktop)
- Light/Dark mode (auto + toggle)
- No frameworks; just HTML/CSS/JS

---

## 2) Tech & Structure
**Stack:** HTML, CSS, JS (no build step needed)

**Files:**
```
calculator/
 ├─ index.html
 ├─ styles.css
 └─ main.js
```

---

## 3) Step‑by‑Step (Cursor Prompts)

1. **Create files**
   - In Cursor: *New Project* → folder `calculator`
   - Add `index.html`, `styles.css`, `main.js` with the contents below.

2. **Go Live locally**
   - Use Cursor’s Live Server (or VS Code Live Server) → open `index.html`.

3. **Test**
   - Try `12+3*4`, `((10-3)/7)+0.5`, `50%` → ensure expected results.

4. **Deploy (any option)**
   - **Vercel**: `vercel deploy` (or drag folder in Vercel dashboard)
   - **Netlify**: drag & drop folder
   - **GitHub Pages**: push repo → enable Pages → root `/`.

---

## 4) Code — `index.html`
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Calculator</title>
  <link rel="stylesheet" href="styles.css" />
  <meta name="theme-color" content="#0f172a" />
</head>
<body>
  <main class="app">
    <header class="topbar">
      <h1>Calculator</h1>
      <button id="themeToggle" aria-label="Toggle theme">🌓</button>
    </header>

    <section class="display" aria-live="polite">
      <div id="expr" class="expr" title="Expression"></div>
      <div id="result" class="result" title="Result">0</div>
    </section>

    <section class="keys" role="group" aria-label="Calculator keys">
      <!-- Row 1 -->
      <button data-key="C" class="accent">C</button>
      <button data-key="⌫" class="accent">⌫</button>
      <button data-key="%" class="accent">%</button>
      <button data-key="/" class="op">÷</button>

      <!-- Row 2 -->
      <button data-key="7">7</button>
      <button data-key="8">8</button>
      <button data-key="9">9</button>
      <button data-key="*" class="op">×</button>

      <!-- Row 3 -->
      <button data-key="4">4</button>
      <button data-key="5">5</button>
      <button data-key="6">6</button>
      <button data-key="-" class="op">−</button>

      <!-- Row 4 -->
      <button data-key="1">1</button>
      <button data-key="2">2</button>
      <button data-key="3">3</button>
      <button data-key="+" class="op">+</button>

      <!-- Row 5 -->
      <button data-key="(" class="muted">(</button>
      <button data-key=")" class="muted">)</button>
      <button data-key="0" class="zero">0</button>
      <button data-key=".">.</button>

      <!-- Row 6 -->
      <button data-key="=" class="equals" aria-label="Equals">=</button>
    </section>

    <footer class="foot">
      <small>Tip: type on your keyboard, too.</small>
    </footer>
  </main>

  <script src="main.js"></script>
</body>
</html>
```

---

## 5) Code — `styles.css`
```css
:root {
  --bg: #0b1220;        /* slate-950-ish */
  --bg-soft: #111827;   /* slate-900 */
  --panel: #0f172a;     /* slate-900/800 */
  --text: #e5e7eb;      /* gray-200 */
  --muted: #94a3b8;     /* slate-400 */
  --key: #1f2937;       /* gray-800 */
  --key-hover: #374151; /* gray-700 */
  --accent: #ef4444;    /* red-500 */
  --op: #0ea5e9;        /* sky-500 */
  --equals: #10b981;    /* emerald-500 */
}

@media (prefers-color-scheme: light) {
  :root {
    --bg: #f8fafc; --bg-soft: #f1f5f9; --panel: #ffffff; --text: #0f172a; --muted: #64748b;
    --key: #e5e7eb; --key-hover: #d1d5db; --accent: #ef4444; --op: #0284c7; --equals: #059669;
  }
}

* { box-sizing: border-box; }
html, body { height: 100%; }
body {
  margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial;
  background: radial-gradient(1200px 600px at 50% -10%, var(--bg-soft), var(--bg));
  color: var(--text); display: grid; place-items: center; padding: 16px;
}

.app { width: 100%; max-width: 420px; display: grid; gap: 12px; }
.topbar { display: flex; justify-content: space-between; align-items: center; }
.topbar h1 { font-size: 1.1rem; margin: 0; font-weight: 700; }
.topbar button { background: transparent; border: 1px solid var(--muted); color: var(--text); padding: 6px 10px; border-radius: 10px; cursor: pointer; }

.display {
  background: var(--panel); border-radius: 16px; padding: 16px; min-height: 96px;
  display: grid; align-content: center; gap: 6px; box-shadow: 0 10px 30px rgba(0,0,0,.2);
}
.expr { color: var(--muted); min-height: 22px; overflow-wrap: anywhere; }
.result { font-size: clamp(28px, 7vw, 42px); font-weight: 700; text-align: right; }

.keys {
  display: grid; gap: 10px; grid-template-columns: repeat(4, 1fr);
}
.keys button {
  -webkit-tap-highlight-color: transparent;
  aspect-ratio: 1 / 1; border: none; border-radius: 16px; font-size: 1.1rem; font-weight: 600;
  background: var(--key); color: var(--text); cursor: pointer; box-shadow: 0 8px 18px rgba(0,0,0,.15);
}
.keys button:active { transform: translateY(1px); }
.keys button:hover { background: var(--key-hover); }

.keys .op { background: color-mix(in srgb, var(--op) 25%, var(--key)); }
.keys .accent { background: color-mix(in srgb, var(--accent) 25%, var(--key)); }
.keys .muted { opacity: .9; }
.keys .zero { grid-column: span 2; aspect-ratio: auto; }
.keys .equals { grid-column: 1 / -1; background: var(--equals); color: white; font-size: 1.25rem; padding: 14px 0; }

.foot { text-align: center; color: var(--muted); }
```

---

## 6) Code — `main.js`
```js
/*
  Minimal evaluator with safety guard:
  - Only allow digits, operators + - * / % . ( ) and spaces
  - Convert % to "/100" inline (e.g., 50% → 0.5)
  - Use Function("return ...") for evaluation once validated
*/

const exprEl = document.getElementById("expr");
const resultEl = document.getElementById("result");
const keys = document.querySelector(".keys");
const themeToggle = document.getElementById("themeToggle");

let expr = "";

function vibrate(ms = 8) { if (window.navigator?.vibrate) navigator.vibrate(ms); }

function sanitize(expression) {
  // Replace percentage: "50%" -> "(50/100)"
  const withPercent = expression.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");
  // Allowlist check
  const ok = /^[0-9+\-*/%().\s]*$/.test(withPercent);
  if (!ok) throw new Error("Invalid characters");
  return withPercent;
}

function compute() {
  if (!expr.trim()) { resultEl.textContent = "0"; return; }
  try {
    const safe = sanitize(expr);
    // Prevent two operators in a row (basic guard)
    if (/([+\-*/.]{2,})/.test(safe)) throw new Error("Bad sequence");

    // Balanced parentheses check
    let depth = 0; for (const ch of safe) { if (ch === "(") depth++; if (ch === ")") depth--; if (depth < 0) throw new Error("Unbalanced"); }
    if (depth !== 0) throw new Error("Unbalanced");

    // Evaluate
    const val = Function(`"use strict"; return (${safe});`)();
    const out = Number.isFinite(val) ? +val.toFixed(8) : "Err";
    resultEl.textContent = out;
  } catch (_) {
    resultEl.textContent = "Err";
  }
}

function append(token) {
  if (token === "C") { expr = ""; update(); return; }
  if (token === "⌫") { expr = expr.slice(0, -1); update(); return; }
  if (token === "=") { compute(); expr = resultEl.textContent === "Err" ? expr : resultEl.textContent; update(); return; }

  expr += token;
  update();
}

function update() {
  exprEl.textContent = expr || "";
  compute();
}

// Button clicks
keys.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-key]");
  if (!btn) return;
  vibrate();
  append(btn.dataset.key);
});

// Keyboard support
window.addEventListener("keydown", (e) => {
  const map = { Enter: "=", '=': "=", Backspace: "⌫", Delete: "C", c: "C" };
  const allowed = "0123456789+-*/().%".split("");
  if (map[e.key]) { e.preventDefault(); append(map[e.key]); return; }
  if (allowed.includes(e.key)) { e.preventDefault(); append(e.key); }
});

// Theme toggle (persist)
const THEME_KEY = "calc-theme";
function applyTheme(mode) { document.documentElement.dataset.theme = mode; }
function getSystemTheme() { return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }

const saved = localStorage.getItem(THEME_KEY);
applyTheme(saved || getSystemTheme());

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.dataset.theme;
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
});
```

> **Note:** The evaluator is guarded by an allowlist and basic checks. For mission‑critical scenarios, replace it with a proper parser (e.g., shunting‑yard) or a vetted library.

---

## 7) Accessibility & UX
- Buttons have large tap targets (≥44px) and clear contrast
- `aria-live="polite"` on display for screen readers
- Keyboard: Enter `=`; Backspace delete; `c` or Delete clears
- Haptics: subtle vibration on mobile taps

---

## 8) Quick QA Checklist
- [ ] `12+3*4` → `24`
- [ ] `(10-3)/7` → `1`
- [ ] `50%` → `0.5`
- [ ] `0.1+0.2` shows `0.3` (rounded)
- [ ] Long expressions wrap without overflowing
- [ ] Works offline (static files)

---

## 9) Optional Enhancements (Pick & Ship)
- **History tape** panel with last 10 calculations (localStorage)
- **Copy result** button
- **PWA**: add `manifest.json` + service worker for installable app
- **Long‑press** on `⌫` to clear; long‑press on operators to show `^` (power)
- **Hold‑to‑repeat** for `⌫` key

---

## 10) Troubleshooting
- *Buttons do nothing*: check the `<script src="main.js"></script>` path and console errors.
- *Typing doesn’t work*: ensure the page has focus; look for console key event errors.
- *Result is `Err`*: likely unbalanced parentheses or invalid sequence like `++`.

---

## 11) License
MIT — do whatever; attribution appreciated.

