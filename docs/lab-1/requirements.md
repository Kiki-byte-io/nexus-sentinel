# Lab 1: requirements checklist

**Brief:** build a responsive HTML/CSS webpage with a **header, navigation, main content, footer and a plugin**. Deliver **two implementations**: one coded manually and one generated with Antigravity.

## Rubric mapping

| Requirement | How it is met | Where | Manual | Antigravity |
|---|---|---|---|---|
| Header | Shared `<header>` with the `NEXUS//SENTINEL` wordmark | all pages | ☐ | ☐ |
| Navigation | `<nav>` with Home / Dashboard / Sign in links, active state, and a hamburger menu below 768 px | all pages | ☐ | ☐ |
| Main content | `<main id="main">` with a distinct layout on each screen | all pages | ☐ | ☐ |
| Footer | `<footer>` with course, problem references, © year and the "Demo build · synthetic data" label | all pages | ☐ | ☐ |
| Plugin | **Chart.js**, vendored locally: a line, a doughnut and a horizontal bar chart | `dashboard.html` | ☐ | ☐ |
| Responsive | Mobile-first Tailwind, tested at 360, 375, 390, 768, 1280 and 1440 px | all pages | ☐ | ☐ |
| HTML/CSS | Semantic HTML5, Tailwind CSS v4 (compiled), vanilla JS | all pages | ☐ | ☐ |
| Two implementations | `lab-1/manual-version/` and `lab-1/antigravity-version/` | repo | ☐ | ☐ |

## Project-specific requirements

| Requirement | Check | Manual | Antigravity |
|---|---|---|---|
| Synthetic data only, RFC 5737 IPs, "Simulated" labels | Inspect `mock-data.js` and the page banners | ☐ | ☐ |
| No real authentication and no credential storage | DevTools → Application: storage is empty | ☐ | ☐ |
| No network submission of form data | DevTools → Network: zero requests on submit | ☐ | ☐ |
| Demo-only labels on Auth, Dashboard and every footer | Visual check | ☐ | ☐ |
| Charts work offline | DevTools → Network → Offline, then reload the dashboard | ☐ | ☐ |
| Reduced motion respected | DevTools → Rendering → emulate `prefers-reduced-motion` | ☐ | ☐ |
| Keyboard operable, visible focus | Tab through every page | ☐ | ☐ |
| Lighthouse Accessibility and Best Practices ≥ 90 | Lighthouse report | ☐ | ☐ |
| W3C Nu HTML validator: no errors | https://validator.w3.org/nu/ | ☐ | ☐ |

## Submission artefacts
- [ ] Both implementations committed on the `lab-1` branch
- [ ] Screenshots of each screen at mobile, tablet and desktop widths for both versions (`docs/lab-1/screenshots/`)
- [ ] `docs/lab-1/ai-prompts.md`: full log of the AI prompts used
- [ ] `docs/lab-1/identified-issues.md`: findings with verified or rejected status and the corrections made
- [ ] `docs/lab-1/comparison.md`: manual vs Antigravity evaluation
