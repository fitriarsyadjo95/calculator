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