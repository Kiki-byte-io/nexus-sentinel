// ---------- 1. Mobile menu ----------
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

function setMenu(open) {
  mobileMenu.classList.toggle("hidden", !open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuBtn.addEventListener("click", () => setMenu(mobileMenu.classList.contains("hidden")));
mobileMenu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
    setMenu(false);
    menuBtn.focus();
  }
});

// ---------- 2. Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- 3. Show / hide password ----------
const pw = document.getElementById("password");
const togglePw = document.getElementById("toggle-pw");

togglePw.addEventListener("click", () => {
  const show = pw.type === "password";
  pw.type = show ? "text" : "password";
  togglePw.textContent = show ? "Hide" : "Show";
  togglePw.setAttribute("aria-pressed", String(show));
});


// ---------- 4. Password-strength meter (client-side demo only) ----------
const COMMON = ["password", "123456", "12345678", "qwerty", "letmein", "admin", "welcome", "iloveyou", "password1"];
const LEVELS = [
  { label: "Weak", color: "--color-critical" },
  { label: "Weak", color: "--color-critical" },
  { label: "Fair", color: "--color-warn" },
  { label: "Good", color: "--color-accent" },
  { label: "Strong", color: "--color-highlight" },
];
const segments = document.querySelectorAll("#strength-meter .meter-seg");
const strengthLabel = document.getElementById("strength-label");

function scorePassword(value) {
  if (COMMON.includes(value.toLowerCase())) return 0;   // a famous password scores 0
  let score = 0;
  if (value.length >= 8) score++;                       // BLANK 1
  if (value.length >= 12) score++;                       // BLANK 2
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++; // has lower AND upper case
  if (/[\d\W_]/.test(value)) score++;                      // has a number or symbol
  return score;
}

pw.addEventListener("input", () => {
  if (!pw.value) {
    segments.forEach((seg) => (seg.style.backgroundColor = ""));
    strengthLabel.textContent = "Strength: —";
    return;
  }
  const score = scorePassword(pw.value);
  const level = LEVELS[score];
  segments.forEach((seg, i) => {
    seg.style.backgroundColor = i < Math.max(score, 1) ? `var(${level.color})` : "";
  });
  strengthLabel.textContent = `Strength: ${level.label}`;
});

// ---------- 5. Demo form: validate, NEVER send or store ----------
const form = document.getElementById("demo-form");
const msg = document.getElementById("form-msg");
const otp = document.getElementById("otp");

form.addEventListener("submit", (e) => {
  e.preventDefault();   // BLANK 3: stops the browser from sending the form anywhere

  const email = document.getElementById("email");
  let error = "";
  if (!email.checkValidity()) error = "Enter a valid email address.";
  else if (pw.value.length < 8) error = "Password must be at least 8 characters.";
  else if (otp.value && !/^\d{6}$/.test(otp.value)) error = "The MFA code must be 6 digits.";

  if (error) {
    msg.className = "mt-4 min-h-5 text-sm text-critical-text";
    msg.textContent = error;
    return;
  }

  msg.className = "mt-4 min-h-5 text-sm text-highlight";
  msg.textContent = "Demo only: no account was checked, and nothing was sent or stored.";
  pw.value = "";
  otp.value = "";
  pw.dispatchEvent(new Event("input")); // reset the meter
});
