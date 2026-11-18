# Architecture overview

> Status: **vision document**. Only the Lab 1 static front end exists so far. The backend and React front end come in later milestones.

## Purpose

NEXUS//SENTINEL protects user identities and gives operators visibility into authentication threats. The core is a **hardened authentication service** (Problem 31). Selected **web server log analysis** features (Problem 35) will extend it, but only if faculty approve them.

## Scope

### Core: Problem 31, Hardened Authentication Service
| Capability | Intent |
|---|---|
| Secure credential storage | Slow, salted password hashing (for example Argon2id or bcrypt). Plaintext is never stored |
| Password policy | Length-first policy, plus a check against common or breached passwords |
| Brute-force defence | Per-account and per-IP rate limiting, progressive delays, temporary lockout |
| Multi-factor authentication | TOTP-based second factor and recovery codes |
| Session security | Short-lived sessions or tokens, secure / HttpOnly / SameSite cookies, rotation on privilege change |
| Audit trail | Every authentication event is logged (success, failure, lockout, MFA challenge) |
| Operator dashboard | Visualises authentication telemetry (Lab 1 builds a static mock of this) |

### Extension: Problem 35, Web Server Log Analyser (*pending approval*)
| Candidate feature | Intent |
|---|---|
| Log ingestion | Parse Common and Combined Log Format access logs |
| Traffic analytics | Top IPs, status-code distribution, request rates |
| Anomaly flags | Spikes in 401/403/404 responses, suspicious paths, scanner user-agents |
| Correlation | Link log anomalies to authentication events from the P31 service |

If P35 is not approved, it is removed. In Lab 1 it appears as a single card labelled "Planned · pending approval".

## Milestone roadmap (tentative)

| Milestone | Deliverable | Stack |
|---|---|---|
| Lab 1 | Responsive static UI: Home, Dashboard, Auth, with a manual version and an Antigravity version | HTML, Tailwind CSS v4, vanilla JS, Chart.js |
| Later | Component-based front end | React |
| Later | Authentication API and persistence | To be decided (backend milestone) |
| Later | Log analyser module (if approved) | To be decided |

## Design principles
1. **Security first, even in demos.** Use synthetic data only, never collect credentials, and label demo builds clearly.
2. **Swappable data layer.** UI code reads from a single data module, so mock data can later be replaced by API calls.
3. **Accessible by default.** WCAG 2.1 AA contrast, keyboard operability, reduced-motion support.
