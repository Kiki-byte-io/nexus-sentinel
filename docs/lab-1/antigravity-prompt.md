# Antigravity prompt: Lab 1 (Antigravity-generated version, single page)

> **Updated 2026-11-18** for the single-page scope. This replaces the earlier three-page prompt.

**How to use:** open the repository root in Antigravity and paste the prompt below **unchanged**. Afterwards, record the following in [`ai-prompts.md`](ai-prompts.md) and in `lab-1/antigravity-version/README.md`:
- the date
- the Antigravity version and model
- any follow-up prompts, verbatim

Log every problem you find in its output in [`identified-issues.md`](identified-issues.md).

To keep the comparison fair, **don't fix the generated output by hand before recording it**. Commit the raw output first, then commit any corrections separately, with each one logged as an issue.

---

```text
You are generating the "Antigravity version" of Lab 1 for NEXUS//SENTINEL, a cybersecurity
intelligence and identity-protection platform (8th-semester Full Stack Development project;
core = Problem 31 "Hardened Authentication Service"; Problem 35 "Web Server Log Analyser"
is a planned extension PENDING faculty approval).

BUILD ONE RESPONSIVE SINGLE-PAGE WEBSITE (index.html). Do NOT create multiple HTML pages.

READ FIRST — these are the source of truth; follow them exactly:
  - docs/lab-1/screen-spec.md     (page sections, content, synthetic dataset, behaviour)
  - docs/lab-1/design-system.md   (colour tokens, typography, components, motion)

FILE RULES
  - Write files ONLY inside lab-1/antigravity-version/. Do not create, modify or delete
    anything else (especially lab-1/manual-version/ and docs/). Keep the existing README.md
    there and fill in its sections.
  - Use the file layout under "Files" in screen-spec.md.

STACK (no substitutions, no extra dependencies)
  - HTML5 + vanilla JavaScript (ES2020, <script defer>). No React, jQuery or UI libraries.
  - Tailwind CSS v4 via the CLI: devDependencies "tailwindcss" and "@tailwindcss/cli";
    scripts "build" = tailwindcss -i ./src/input.css -o ./assets/css/styles.css --minify
    and "dev" = same with --watch. Tokens in an @theme block in src/input.css.
    Run the build and keep the compiled assets/css/styles.css. No Tailwind Play CDN.
  - Chart.js 4.x, LOCAL: npm install chart.js, copy node_modules/chart.js/dist/chart.umd.js
    to assets/vendor/chart.umd.js, load it with one <script defer>. No CDN, no fallback loader.
  - Google Fonts allowed: Inter, JetBrains Mono, Rajdhani. CSS animations only.

PAGE SECTIONS, in this order (details in screen-spec.md):
  1. Sticky responsive header + nav (anchor links; hamburger below 768px with aria-expanded,
     Esc closes; skip-to-content link).
  2. Cinematic hero (#top): oversized "IDENTITY. / DEFENDED." headline using clamp(), two CTAs,
     and an inline-SVG network background animated with CSS only (pulsing nodes, moving
     dashed links, occasional crimson "blocked" link). Keep the animation simple.
  3. #overview: "SIMULATED TELEMETRY" banner + four KPI cards with HUD corner brackets.
  4. #analytics: three Chart.js charts — line (successful vs failed per hour), doughnut
     (attack types), horizontal bar (top 5 source IPs) — using EXACTLY the synthetic dataset
     in screen-spec.md, kept in assets/js/mock-data.js. Read colours from CSS variables via
     getComputedStyle; maintainAspectRatio: false inside fixed-height wrappers; canvases
     have role="img" and aria-label; create charts inside document.fonts.ready.then(...).
  5. #events: recent security events table that scrolls horizontally INSIDE its card on phones.
  6. #identity: "DEMO ONLY" banner; demo sign-in form with show/hide password, live
     password-strength meter, 6-digit MFA code preview; protection-layers, security-tips and
     "P35 · PLANNED · PENDING APPROVAL" panels.
  7. Footer with academic project information and "Demo build · synthetic data".

VISUAL IDENTITY
  - Dark security-operations console, professional SOC dashboard look, subtle ORIGINAL
    ROG-inspired styling: chamfered corners via clip-path, "//" accents, HUD brackets,
    faint grid only in the hero.
  - Colour roles are strict: cyan #22D3EE = primary brand/actions; acid green #B8FF50 =
    highlights and interactive states (hover, focus ring, live dot); crimson #F43F5E =
    critical events; #FB7185 for crimson TEXT; #5F6B85 for form-field borders.
  - No ASUS/ROG logos, "eye" mark, "Republic of Gamers" wording, or rainbow gradients.

SECURITY RULES (non-negotiable)
  - No real authentication and no backend. The form has NO action attribute; every submit
    calls preventDefault(), shows a demo-only message and clears the password field.
  - Never use fetch, XMLHttpRequest, localStorage, sessionStorage, document.cookie, or log
    any form value.
  - Synthetic data only: IPs from RFC 5737 ranges, emails @example.test, and every
    simulated figure labelled as simulated.

RESPONSIVE + ACCESSIBILITY
  - No horizontal page scroll at 360, 375, 390, 768, 1280 and 1440 px.
  - Visible acid-green focus rings, WCAG AA contrast, and prefers-reduced-motion disables
    all animations including Chart.js animation.

WHEN DONE
  - Fill in lab-1/antigravity-version/README.md: build/run steps, exact Chart.js and Tailwind
    versions, and any deviations from screen-spec.md with reasons.
  - Report the files you created and anything you could not complete.
```
