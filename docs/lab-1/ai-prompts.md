# AI prompt log: Lab 1

A chronological record of **every AI prompt** used in Lab 1, kept as work happens, not reconstructed afterwards. Prompts are quoted **verbatim**. Findings that come out of these prompts are tracked in [`identified-issues.md`](identified-issues.md).

**Entry format:** ID · date · tool / model · purpose · prompt (verbatim) · output summary · kept / changed / rejected.

---

## P-001: Initial planning request
- **Date:** 2026-11-16
- **Tool / model:** Claude Code (VS Code extension), Claude Fable 5, in plan mode
- **Purpose:** inspect the workspace and produce a Lab 1 implementation plan without writing any files

**Prompt (verbatim):**
```text
We are starting development of NEXUS//SENTINEL, my 8th-semester Full Stack Development project.

The current workspace is the NEXUS//SENTINEL project root.

Before writing any code, I want you to:

1. Inspect the current workspace and its Git status.
2. Understand the intended project scope: a cybersecurity intelligence and identity protection platform based on Problem 31 (Hardened Authentication Service), with selected Problem 35 (Web Server Log Analyser) extensions subject to faculty approval.
3. Review the Lab 1 requirements: responsive HTML/CSS webpage with header, navigation, main content, footer and a plugin. Two implementations are required: a manually coded version and a separate Antigravity-generated version.
4. Propose a clean folder structure for the project.
5. Recommend the design system and technology stack for Lab 1.
6. Identify the three primary screens we should build.
7. Explain how to integrate Chart.js as our plugin.
8. Identify potential implementation risks and dependencies.

IMPORTANT:
- Do not create or modify files yet.
- Do not implement the backend.
- Do not overwrite anything.
- Keep the initial Lab 1 implementation in HTML, CSS and vanilla JavaScript with Tailwind CSS.
- React will be introduced in a later semester milestone.

Return a structured implementation plan and wait for my approval.
```

**Output summary:** the AI inspected the workspace (Git repo on `main`, no commits, four empty folders) and asked two clarifying questions: which three screens to build, and who produces the Antigravity version.

**Kept / changed:** both questions were answered (P-002).

---

## P-002: Answers to clarifying questions
- **Date:** 2026-11-16
- **Tool / model:** Claude Code. The user then switched the model with `/model opus`, so Claude Opus 5.5 (`claude-opus-5-5`) handled everything from here on

**Prompt (verbatim):**
```text
Answering your earlier questions:
- "Which three primary screens should Lab 1's manual version include? My recommendation covers the lab rubric (header/nav/main/footer + Chart.js plugin) while setting up the NEXUS//SENTINEL story.": Home, Dashboard, Auth (Recommended)
- "How should the Antigravity-generated version be handled? The lab requires a manually coded version and a separate Antigravity-generated one.": You generate it in Antigravity (Recommended)
```

**Output summary:** plan rev. 1, covering folder structure, a Tailwind v4 CLI stack, a dark SOC design system, the three screens, Chart.js loaded from a CDN with a local fallback loader, a risk table (including an academic-integrity risk) and a verification checklist.

**Kept / changed:** the architecture, folder structure, screens and stack were approved. Refinements were requested (P-003).

---

## P-003: Plan refinements (rev. 1 → rev. 2)
- **Date:** 2026-11-17
- **Tool / model:** Claude Code, Claude Opus 5.5

**Prompt (verbatim):**
```text
I've reviewed your Lab 1 implementation plan. I approve the overall architecture, folder structure, three-screen selection and technology stack.

Before implementation, make the following refinements:

1. VISUAL IDENTITY:
Retain the dark security operations console, but use cyan (#22D3EE) as the primary brand accent, acid green (#B8FF50) for selected highlights and interactions, and crimson (#F43F5E) for critical events. The overall interface should have subtle ROG-inspired futuristic styling without copying ASUS branding or becoming visually cluttered.

2. LANDING PAGE:
Make the Home screen more distinctive. Include a cinematic hero, oversized typography, subtle animated network visualisation, strong CTA buttons, feature cards and smooth but purposeful transitions.

3. CHART.JS:
Prefer a locally vendored Chart.js build as the primary source for reliable offline operation. Avoid unnecessarily complicated fallback logic.

4. ACADEMIC INTEGRITY:
The manual implementation must genuinely involve my own coding and understanding. Provide incremental guidance, explain the implementation and review/debug my code rather than silently generating the entire manual submission.

5. AI EVALUATION:
Add docs/lab-1/identified-issues.md and docs/lab-1/ai-prompts.md. These must document the actual AI prompts, findings, verified problems, rejected findings and corrections.

6. RESPONSIVENESS:
Retain the specified 360px, 768px and 1280px test widths, and also verify 375px, 390px and 1440px.

7. SECURITY:
Maintain synthetic data, no real authentication, no credential storage, no network submission of form data and explicit demo-only labels.

8. GIT:
Before implementation, recommend creating a dedicated lab-1 branch. Do not commit changes without my approval.

Now update the implementation plan to reflect these decisions.

After that, wait for my explicit approval before creating or modifying project files.
```

**Output summary:** plan rev. 2:
- strict colour roles
- an SVG plus CSS network visualisation
- Chart.js vendored as a local file only
- a guided-coding model, where the student writes `lab-1/manual-version/` and the AI explains and reviews
- these two AI-evaluation logs
- six test widths
- a security rules section
- a recommended `lab-1` branch, with commits only on approval

**Kept / changed:** approved in the Claude Code plan-approval dialog. Corrections from this round are ISS-001 and ISS-002.

---

## P-004: Drafting the Lab 1 documentation (after rev. 2 approval)
- **Date:** 2026-11-17
- **Tool / model:** Claude Code, Claude Opus 5.5
- **Prompt:** none new. This was step 2 of the approved plan rev. 2 ("I draft the docs … for your review").

**Output summary:** drafted `README.md`, `.gitignore`, `docs/architecture/overview.md` and the following files in `docs/lab-1/`:
- `requirements.md`
- `design-system.md`
- `screen-spec.md`
- `antigravity-prompt.md`
- `ai-prompts.md`
- `identified-issues.md`

It also drafted `lab-1/antigravity-version/README.md`. **No manual-version code was written. Nothing was committed.**

The AI also ran checks while drafting:
- checked the toolchain: Node 24.14.0, npm 11.9.0, chart.js latest 4.6.1, @tailwindcss/cli latest 4.3.5
- measured WCAG contrast for the whole palette, which produced ISS-004 to ISS-006
- confirmed that the synthetic dataset totals agree (failed = 1,936 = sum of attack types; success = 13,572)
- tested unborn-branch Git behaviour in a scratch repo, which produced ISS-003

**Kept / changed:** _awaiting student review._

---

## P-005: Emergency sprint, scope changed to a single page
- **Date:** 2026-11-18
- **Tool / model:** Claude Code, Claude Opus 5.5
- **Purpose:** submission due at midnight. Switch to a ~100-minute sprint that builds one responsive single-page site in `lab-1/manual-version/`, with step-by-step guidance

**Prompt (verbatim):**
```text
EMERGENCY: Lab 1 submission is due at midnight. I have only 1–2 hours.

We are switching to a 100-minute implementation sprint.

Build scope: ONE responsive, single-page NEXUS//SENTINEL website.

Use the existing documentation and design system.

TECH STACK:
- HTML5
- Tailwind CSS v4
- Vanilla JavaScript
- Chart.js (local installation)
- CSS animations

REQUIRED SECTIONS:
1. Responsive header and navigation.
2. Cinematic hero with animated network background.
3. Four security KPI cards.
4. Security analytics with three Chart.js charts.
5. Recent security events table.
6. Identity protection and MFA preview.
7. Footer with academic project information.

DESIGN:
- Dark charcoal background.
- Cyan primary accent.
- Acid-green highlights.
- Crimson critical alerts.
- Premium ROG-inspired futuristic styling.
- Professional SOC dashboard aesthetics.
- Responsive desktop and mobile layouts.

IMPORTANT:
- Use synthetic data only.
- Label all simulated telemetry.
- No actual authentication or backend.
- No unnecessary dependencies.
- Do not build three separate HTML pages.
- Keep the implementation readable and explain important sections.
- Do not spend time on elaborate animations.
- Do not overwrite the Antigravity implementation.
- Work exclusively in lab-1/manual-version/.

I need a working website as quickly as possible.

First provide the exact commands to initialise Tailwind v4 and Chart.js, then guide me through the implementation in short, manageable steps.

Prioritise a complete working result over perfection.
```

**Output summary:**
- **Scope change:** one `index.html` instead of three pages. The Home, Dashboard and Auth content became sections of one page.
- **Network visualisation:** simplified to a hand-written static SVG animated with CSS only (no `network-viz.js`).
- **Testing before handing over steps:** the AI built and tested a reference copy **in its scratch folder, not in the repository**:
  - tested the setup commands in PowerShell
  - compiled with Tailwind 4.3.5 and syntax-checked the JS
  - took headless Chrome screenshots at 360, 375, 390, 768 and 1280 px
- **Delivery:** the AI then gave the student setup commands and 6 guided steps to type or paste themselves. **The AI wrote nothing in `lab-1/manual-version/`.**
- **Findings from testing:** ISS-008 to ISS-011.

**Kept / changed:** _student to fill in: what you typed yourself, what you pasted, what you changed._

---

<!--
TEMPLATE — copy for each new prompt (Claude Code or Antigravity)

## P-0XX: <short title>
- **Date:** YYYY-MM-DD
- **Tool / model:** <Claude Code / Antigravity> · <model + version>
- **Purpose:** <why this prompt was sent>

**Prompt (verbatim):**
```text
<paste exactly>
```

**Output summary:** <what the AI produced or claimed>

**Kept / changed:** <what you kept, what you changed, what you rejected, with ISS-IDs>
-->
