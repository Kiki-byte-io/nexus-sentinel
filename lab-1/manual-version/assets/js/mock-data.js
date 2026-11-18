// SYNTHETIC DATA ONLY — not real telemetry.
// IPs are RFC 5737 documentation addresses; they never belong to real hosts.
const SECURITY_DATA = {
  hours: Array.from({ length: 24 }, (_, h) => String(h).padStart(2, "0") + ":00"),

  success: [120, 95, 80, 72, 70, 110, 260, 540, 890, 1020, 980, 940,
            910, 960, 1005, 990, 970, 940, 820, 610, 450, 330, 240, 170],

  failed:  [42, 38, 35, 31, 29, 33, 47, 61, 88, 120, 96, 84,
            79, 91, 140, 212, 186, 133, 97, 74, 66, 58, 51, 45], // total 1,936

  attackTypes: {
    "Brute force": 812,
    "Credential stuffing": 604,
    "Password spray": 371,
    "MFA fatigue": 149,
  }, // total 1,936 — matches the failed-login KPI

  topIps: [
    ["203.0.113.42", 318],
    ["198.51.100.17", 241],
    ["192.0.2.88", 187],
    ["203.0.113.9", 152],
    ["198.51.100.203", 119],
  ],
};
