# Identified issues: Lab 1

A register of findings from AI reviews, Antigravity output and manual testing. **Every finding gets a status:**
- **Verified:** reproduced or measured and confirmed to be real. A correction is applied (or planned) and recorded.
- **Rejected:** checked and found not to be a problem (false positive, out of scope, or conflicting with a decision). The reason is recorded.
- **Open:** not yet checked or decided.

Rejected findings **stay in this file**. They show the AI output was evaluated, not just accepted.

Prompts that produced these findings are in [`ai-prompts.md`](ai-prompts.md).

## Summary

| ID | Source | Area | Finding (short) | Status | Severity |
|---|---|---|---|---|---|
| ISS-001 | Student review of AI plan rev. 1 | Chart.js loading | CDN-primary loading with a fallback loader is needless complexity | Verified | Medium |
| ISS-002 | AI plan rev. 1 risk analysis | Academic integrity | An AI-written "manual" version would not be the student's own work | Verified | High |
| ISS-003 | AI check while drafting docs | Git | Creating `lab-1` before the first commit means `main` never exists | Verified | Medium |
| ISS-004 | AI contrast measurement | Design tokens | Crimson `#F43F5E` small text on `surface-2` is 4.33:1 (< 4.5) | Verified | Medium |
| ISS-005 | AI contrast measurement | Design tokens | White text on crimson is 3.67:1 (< 4.5) | Verified | Medium |
| ISS-006 | AI contrast measurement | Design tokens | Border `#263042` is 1.20–1.45:1, too faint for form fields (< 3:1) | Verified | Medium |
| ISS-007 | AI check while drafting docs | Git / tooling | Git converts LF to CRLF on this machine (`core.autocrlf`) | Open | Low |
| ISS-008 | AI screenshot test (P-005) | Line chart | Hour labels crowd together on the x-axis at ≤ 390 px | Verified | Low |
| ISS-009 | AI screenshot test (P-005) | Doughnut chart | Legend shows only 2 of 4 attack types at 360 px | Verified | Medium |
| ISS-010 | AI screenshot test (P-005) | Bar chart | First character of `198.51.100.203` clipped | Verified | Low |
| ISS-011 | AI screenshot test (P-005) | Layout | Page appeared to overflow horizontally at 360 px | **Rejected** | — |

---

## Details

### ISS-001: Chart.js CDN plus fallback loader is unnecessarily complex
- **Source:** student review of AI plan rev. 1 (prompt P-003, item 3)
- **Finding:** rev. 1 loaded Chart.js from jsDelivr, with an inline script that loaded `assets/vendor/chart.umd.js` if `window.Chart` was missing. That adds a network dependency during demos and extra code with its own failure modes (load order, a duplicate copy).
- **Status:** **Verified.** The lab demo must work offline, and the fallback adds code for no benefit when the local copy exists anyway.
- **Correction:** plan rev. 2 and the docs now load **only** the local `assets/vendor/chart.umd.js` (one `<script defer>`, no CDN, no fallback). The pinned version will be recorded in the README.
- **Where:** `README.md`, `docs/lab-1/screen-spec.md`, `docs/lab-1/antigravity-prompt.md`

### ISS-002: The manual version must be written by the student
- **Source:** AI plan rev. 1, risks table ("Academic integrity: the 'manually coded' version would be written by an AI assistant")
- **Finding:** if the AI generates `lab-1/manual-version/`, it is not a genuine manual implementation.
- **Status:** **Verified** (confirmed by the student in P-003, item 4).
- **Correction:** guided-coding model. The student writes all files under `lab-1/manual-version/`. The AI explains, gives skeletons and short snippets, and reviews and debugs the student's code. Every prompt is logged in `ai-prompts.md`.

### ISS-003: Branching before the first commit removes `main`
- **Source:** AI check while drafting docs (P-004)
- **Finding:** the repository has no commits yet (`main` is an *unborn* branch). Running `git switch -c lab-1` now would just point HEAD at `lab-1`, and `main` would never be created, leaving the project with no base branch to merge into.
- **Evidence:** reproduced in a throwaway repository: `git init -b main` → `git switch -c lab-1` → first commit → `git branch --list` shows **only** `lab-1`.
- **Status:** **Verified.**
- **Correction (proposed, needs student approval):** first make one initial commit on `main` containing only `README.md` and `.gitignore`, then `git switch -c lab-1`. No commit has been made yet.

### ISS-004: Crimson text is below AA contrast on `surface-2`
- **Source:** AI contrast measurement (WCAG 2.1 relative luminance), P-004
- **Finding:** `#F43F5E` on `#1A2233` = **4.33:1**, which fails the 4.5:1 minimum for normal text. It passes on `bg` (5.22) and only just on `surface` (4.83).
- **Status:** **Verified** (measured).
- **Correction:** added the token `--color-critical-text: #FB7185` for crimson text (7.13 / 6.59 / 5.91 on bg / surface / surface-2). `#F43F5E` stays for fills, borders and chart series.
- **Where:** `docs/lab-1/design-system.md` §1

### ISS-005: White text on crimson fails AA
- **Source:** AI contrast measurement, P-004
- **Finding:** `#FFFFFF` on `#F43F5E` = **3.67:1** (< 4.5).
- **Status:** **Verified** (measured).
- **Correction:** crimson-filled badges and buttons use **dark text** (`#0B0F17` on `#F43F5E` = 5.22:1).
- **Where:** `docs/lab-1/design-system.md` §1 and §4 (severity badge)

### ISS-006: The default border colour is too faint for form fields
- **Source:** AI contrast measurement, P-004
- **Finding:** `#263042` reaches only 1.45 / 1.34 / 1.20:1 against bg / surface / surface-2. WCAG 1.4.11 (non-text contrast) requires **3:1** for the boundaries of essential UI components such as text inputs.
- **Status:** **Verified** (measured).
- **Correction:** added `--color-border-strong: #5F6B85` for inputs (3.59 on bg, 3.32 on surface). It measures **2.97 on surface-2**, so the design system now says **inputs must not sit on `surface-2`**. `#263042` stays for decorative dividers only.
- **Where:** `docs/lab-1/design-system.md` §1 and §4 (form field)

### ISS-007: Line-ending conversion
- **Source:** AI check while drafting docs (warning seen during the ISS-003 test)
- **Finding:** Git warned "LF will be replaced by CRLF". This machine converts line endings, which can create noisy diffs if anyone works on the repo from macOS or Linux, or if Antigravity writes LF files.
- **Status:** **Open.** It is a decision for the student.
- **Possible correction:** add a `.gitattributes` containing `* text=auto eol=lf`. Not applied.

### ISS-008: Line chart x-axis labels crowd on phones
- **Source:** AI headless-Chrome test of the reference build (P-005)
- **Finding:** with `maxTicksLimit: 8`, the hour labels ran together ("00:0003:0006:00…") at 360–390 px.
- **Status:** **Verified** (screenshot).
- **Correction:** `ticks: { maxTicksLimit: 6, maxRotation: 0 }` on the x-axis. Re-tested at 360 and 768 px, and the labels are readable.

### ISS-009: Doughnut legend truncated at 360 px
- **Source:** AI headless-Chrome test (P-005)
- **Finding:** in a 256 px-high wrapper, Chart.js left no room for the legend's second row, so "Password spray" and "MFA fatigue" disappeared.
- **Status:** **Verified** (screenshot).
- **Correction:** the doughnut wrapper is now `h-80` at all sizes, and the legend uses `labels: { boxWidth: 12, padding: 12 }`. Re-tested, and all four entries show.

### ISS-010: IP axis label clipped
- **Source:** AI headless-Chrome test (P-005)
- **Finding:** "198.51.100.203" lost its first character. Chart.js measured the label with the fallback font before JetBrains Mono loaded, then drew it in the wider web font.
- **Status:** **Verified** (screenshot at 360 and 768 px).
- **Correction:** charts are created inside `document.fonts.ready.then(drawCharts)`. Re-tested, and the full labels show.

---

## Rejected findings

### ISS-011: Apparent horizontal overflow at 360 px (Rejected)
- **Source:** AI headless-Chrome test (P-005)
- **Claim:** a `--window-size=360,…` screenshot showed the hero text and header cut off on the right, which suggested the page was wider than the viewport.
- **Evidence against:** the same page loaded in `<iframe>`s exactly 360, 375 and 390 px wide rendered with no overflow, and the hamburger was visible. Headless Chrome on Windows does not lay out narrower than its minimum window width, so the 360 px screenshot was really a wider layout cropped.
- **Status:** **Rejected.** It came from the test tool, not the page.
- **Action:** none. Final check: DevTools device toolbar at 360 px in a real browser.

---

<!--
TEMPLATE

### ISS-0XX: <title>
- **Source:** <AI review (P-0XX) / Antigravity output / manual testing / Lighthouse / validator>
- **Location:** <file:line or screen + width>
- **Finding:** <what is claimed to be wrong>
- **Evidence:** <how it was reproduced or measured, or why it could not be>
- **Status:** Verified / Rejected / Open
- **Correction:** <what changed, or the reason for rejection>
- **Commit / date:** <hash or YYYY-MM-DD>
-->
