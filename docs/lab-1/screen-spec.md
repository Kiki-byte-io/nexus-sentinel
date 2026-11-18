# Lab 1: screen spec (single page, shared by both versions)

> **Scope change, 2026-11-18:** because of the submission deadline, Lab 1 is now **one responsive single-page website** (`index.html`). The earlier Home, Dashboard and Auth screens are now **sections of that page**, reached through anchor links in the nav. This spec is the single source of truth for both the manual and the Antigravity version. Visual rules are in [`design-system.md`](design-system.md).

## Files
```
index.html                      the whole site (one page)
package.json                    Tailwind CLI scripts: build, dev
src/input.css                   @import "tailwindcss"; @theme tokens; components; keyframes
assets/css/styles.css           compiled Tailwind output (committed)
assets/js/main.js               mobile menu, footer year, show/hide password, strength meter, demo form
assets/js/mock-data.js          ALL synthetic data
assets/js/charts.js             the three Chart.js charts
assets/vendor/chart.umd.js      Chart.js 4.x, copied from node_modules (local, no CDN)
```
Script order at the end of `<body>`, all with `defer`: `chart.umd.js` → `mock-data.js` → `charts.js` → `main.js`.

## Page structure (top to bottom)

```
┌──────────────────────────────────────────────────────────────┐
│ [skip to content]                                            │
│ NEXUS//SENTINEL      Overview Analytics Events [Secure Sign-in] ☰ │ 1. sticky header + nav
├──────────────────────────────────────────────────────────────┤
│ #top       HERO: IDENTITY. / DEFENDED. + animated network    │ 2.
│ #overview  SIMULATED TELEMETRY banner + 4 KPI cards          │ 3.
│ #analytics 3 Chart.js charts (line, doughnut, horizontal bar)│ 4.
│ #events    recent security events table                      │ 5.
│ #identity  DEMO ONLY banner + sign-in/MFA preview + tips     │ 6.
├──────────────────────────────────────────────────────────────┤
│ footer: brand · academic project info · demo notice · ©     │ 7.
└──────────────────────────────────────────────────────────────┘
```
`<main id="main">` wraps sections 2–6.

### 1. Header and navigation
- Sticky header with the wordmark `NEXUS//SENTINEL` (the `//` in acid green, `SENTINEL` in cyan), linking to `#top`.
- Nav links: Overview (`#overview`), Analytics (`#analytics`), Events (`#events`) and **Secure Sign-in** (`#identity`, outlined button). Links turn acid green on hover and focus.
- **Below 768 px:** links hide behind a hamburger `<button aria-expanded aria-controls="mobile-menu" aria-label>`. Clicking it toggles the menu, clicking a link closes it, and **Esc** closes it and returns focus to the button.
- A skip link to `#main` is the first focusable element. `html { scroll-padding-top }` keeps anchor targets from landing under the sticky header.

### 2. Hero (`#top`)
- Eyebrow `// THREAT INTELLIGENCE · IDENTITY PROTECTION`. The H1 is `IDENTITY.` / `DEFENDED.`, oversized with `clamp()`, and the second line is cyan.
- Subline: "Hardened authentication and real-time threat visibility for the accounts that matter."
- CTAs: **Launch Dashboard** → `#analytics` (cyan, chamfered) and **Secure Sign-in** → `#identity` (outline, acid-green hover).
- Status line: pulsing acid-green dot with "LIVE SIMULATION · SYNTHETIC DATA".
- **Network background:** a hand-written inline `<svg aria-hidden="true">` with about 14 nodes and 21 links, animated **with CSS only**. Nodes pulse, a few dashed links move with `stroke-dashoffset`, and two crimson "blocked threat" links flash. A left-to-right gradient keeps the text readable. No JavaScript.

### 3. Overview (`#overview`): KPI cards
- Banner: **"SIMULATED TELEMETRY:** every figure on this page is synthetic demo data, not live data."
- Four cards with HUD corner brackets (4 → 2 → 1 columns):

| Label | Value | Delta |
|---|---|---|
| Failed logins (24 h) | `1,936` | ▲ 12% vs prior 24 h (`critical-text`) |
| Accounts locked | `27` | ▲ 4 vs prior 24 h (`critical-text`) |
| MFA adoption | `82%` | ▲ 3 pts this month (`ok`) |
| Active sessions | `1,248` | ▼ 2% vs prior 24 h (`muted`) |

### 4. Analytics (`#analytics`): the Chart.js plugin
Each chart is a `<figure>` card with a caption and a "SIMULATED" tag. The canvas sits in a **fixed-height wrapper** and has `role="img"` and a descriptive `aria-label`.

| Chart | Type | Data | Colours | Wrapper |
|---|---|---|---|---|
| Authentication attempts per hour | line, two datasets, light area fill | `hours`, `success`, `failed` | Successful = cyan, Failed = crimson | `h-64 md:h-80`, 2/3 width on `lg` |
| Attack types | doughnut, legend at bottom | `attackTypes` | crimson, warn, cyan, border-strong | `h-80`, 1/3 width on `lg` |
| Top 5 source IPs | horizontal bar (`indexAxis: "y"`) | `topIps` | crimson | `h-64`, full width |

Implementation rules (tested; see `identified-issues.md` ISS-008 to ISS-010):
- Colours come from the `@theme` CSS variables through `getComputedStyle`.
- `maintainAspectRatio: false`. Animation is off under reduced motion.
- Line x-axis: `maxTicksLimit: 6, maxRotation: 0`. Doughnut legend: `boxWidth: 12, padding: 12`.
- Charts are created inside `document.fonts.ready.then(...)`, so labels aren't clipped.

### 5. Events (`#events`): recent security events table
Columns: Time · Event · Account · Source IP · Severity · Action. The table has `min-w-[720px]` inside an `overflow-x-auto` wrapper, so on phones **only the table scrolls**. It has a `<caption>` (screen-reader only) and `scope="col"` headers. Severity badges show a text label as well as colour.

| Time | Event | Account | Source IP | Severity | Action |
|---|---|---|---|---|---|
| 16:42 | Account lockout triggered | j.doe@example.test | 203.0.113.42 | CRITICAL | Locked |
| 16:38 | Credential-stuffing burst (54 attempts) | multiple | 198.51.100.17 | HIGH | Blocked |
| 16:21 | MFA push denied ×3 | a.rivera@example.test | 192.0.2.88 | HIGH | Challenged |
| 15:57 | Password spray across 31 accounts | multiple | 203.0.113.9 | MEDIUM | Rate-limited |
| 15:40 | Sign-in from new device | m.chen@example.test | 198.51.100.203 | LOW | Allowed |
| 15:12 | Password changed | s.okafor@example.test | 192.0.2.14 | LOW | Allowed |

### 6. Identity protection (`#identity`): sign-in and MFA preview
- Banner: **"DEMO ONLY:** there is no real authentication. Nothing you type is stored or sent anywhere."
- Two columns on `lg`, stacked on smaller screens.
- **Demo form** `<form id="demo-form" novalidate>` with **no `action` attribute**:
  - Email `type="email" autocomplete="username" required`
  - Password `type="password" autocomplete="current-password" required`, with a **Show / Hide** toggle (`aria-pressed`)
  - **Strength meter:** 4 segments plus a label in an `aria-live="polite"` region. Scoring 0–4: +1 if length ≥ 8, +1 if length ≥ 12, +1 for mixed case, +1 for a digit or symbol. The score is 0 if the password is in a small common-password list. 0–1 Weak (crimson), 2 Fair (warn), 3 Good (cyan), 4 Strong (acid green). Colours are set with inline styles, because Tailwind can't see classes built at runtime.
  - **MFA preview** fieldset: `inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}"`
  - **Submit:** always `preventDefault()`. Validate (valid email, password ≥ 8 characters, OTP empty or exactly 6 digits) and show errors in `critical-text`. On success show "Demo only: no account was checked, and nothing was sent or stored." in acid green, then clear the password and OTP fields and reset the meter.
- **Side panels:** Protection layers (`P31 · CORE`: hashing, rate limiting and lockout, TOTP MFA, secure sessions). Security tips (passphrase, MFA, no reuse, "we never ask for your password by email"). Log Analysis card with a dashed border, labelled **`P35 · PLANNED · PENDING APPROVAL`**.

### 7. Footer
Three columns, stacked on mobile:
- brand and one-line description
- **ACADEMIC PROJECT:** Full Stack Development · 8th Semester · Lab 1; Problem 31: Hardened Authentication Service; Problem 35: Web Server Log Analyser (pending approval); student name, roll number and institution
- **DEMO BUILD · SYNTHETIC DATA:** no real authentication, nothing stored or sent, IPs are RFC 5737 addresses; `© <year>`, with the year set by JS

## Synthetic dataset (`mock-data.js`)
All values are fictional. IPs come only from RFC 5737 (`192.0.2.x`, `198.51.100.x`, `203.0.113.x`), and emails use the reserved `.test` domain.
```js
hours:   ["00:00", …, "23:00"]                                            // 24 labels
success: [120, 95, 80, 72, 70, 110, 260, 540, 890, 1020, 980, 940,
          910, 960, 1005, 990, 970, 940, 820, 610, 450, 330, 240, 170]   // Σ 13,572
failed:  [42, 38, 35, 31, 29, 33, 47, 61, 88, 120, 96, 84,
          79, 91, 140, 212, 186, 133, 97, 74, 66, 58, 51, 45]            // Σ 1,936
attackTypes: { "Brute force": 812, "Credential stuffing": 604,
               "Password spray": 371, "MFA fatigue": 149 }              // Σ 1,936
topIps: [["203.0.113.42", 318], ["198.51.100.17", 241], ["192.0.2.88", 187],
         ["203.0.113.9", 152], ["198.51.100.203", 119]]
```

## Security rules (both versions)
No real authentication, no backend, no `fetch` or `XMLHttpRequest`, no `localStorage`, `sessionStorage` or cookies, and no logging of form values. Every simulated figure is labelled as simulated.

## Acceptance checks
- No horizontal page scroll at **360, 375, 390, 768, 1280 and 1440 px**. The hamburger appears below 768 px.
- All three charts render, including **offline** (Chart.js is local).
- Submitting the form makes **zero network requests**, and DevTools → Application shows no stored data.
- With reduced motion turned on, nothing animates.
