# Design system: NEXUS//SENTINEL (Lab 1)

The look is a **dark security operations console** with **subtle, original, ROG-inspired futuristic styling**: angular, precise and data-first. Colour carries meaning; decoration stays quiet.

## 1. Colour tokens

These are defined once in the Tailwind v4 `@theme` block, so each token becomes both a CSS variable (`--color-*`) and a utility class (`bg-*`, `text-*`, `border-*`).

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#0B0F17` | Page background |
| `--color-surface` | `#121826` | Cards, header, panels |
| `--color-surface-2` | `#1A2233` | Raised elements, table header, hover |
| `--color-border` | `#263042` | Decorative dividers and card outlines (non-essential) |
| `--color-border-strong` | `#5F6B85` | **Form-field borders** and other essential UI outlines |
| `--color-text` | `#E6EAF2` | Primary text |
| `--color-muted` | `#8A94A8` | Secondary text, captions, axis labels |
| `--color-accent` | `#22D3EE` | **Cyan, the primary brand colour**: wordmark, primary buttons, links, main chart series |
| `--color-highlight` | `#B8FF50` | **Acid green: selected and interactive states**: active nav item, focus ring, selected tab, hover edges, "live" dot |
| `--color-critical` | `#F43F5E` | **Crimson: critical events**: chart series, badge fills and borders, alert bars |
| `--color-critical-text` | `#FB7185` | Crimson **text** on dark surfaces (for small text) |
| `--color-warn` | `#F59E0B` | Medium severity |
| `--color-ok` | `#10B981` | Success, low severity (used sparingly) |

### Colour rules
1. **One meaning per colour.** Cyan is brand and action. Acid green is "selected / you are here / interactive". Crimson is critical. Acid green never means "safe", and crimson is never decoration.
2. **Never colour alone.** Severity always has a text label (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`), and chart series are named in the legend.
3. **Glow is earned.** Glow appears only on hover and focus, and on at most one element per view at rest (the hero CTA).

### Measured contrast (WCAG 2.1)
Measured on 2026-11-17 with a relative-luminance script. AA requires ≥ 4.5:1 for normal text, ≥ 3:1 for large text and essential UI components.

| Foreground | on `bg` | on `surface` | on `surface-2` | Verdict |
|---|---|---|---|---|
| text `#E6EAF2` | 15.91 | 14.70 | 13.19 | ✅ AA everywhere |
| muted `#8A94A8` | 6.29 | 5.81 | 5.21 | ✅ AA everywhere |
| accent `#22D3EE` | 10.61 | 9.81 | 8.80 | ✅ |
| highlight `#B8FF50` | 15.94 | 14.74 | 13.22 | ✅ |
| warn `#F59E0B` | 8.93 | 8.26 | 7.40 | ✅ |
| ok `#10B981` | 7.56 | 6.99 | 6.27 | ✅ |
| **critical `#F43F5E`** | 5.22 | 4.83 | **4.33** | ⚠️ fails for small text on `surface-2`. **Use `critical-text` for text** |
| critical-text `#FB7185` | 7.13 | 6.59 | 5.91 | ✅ |
| border `#263042` | 1.45 | 1.34 | 1.20 | Decorative only. **Not for inputs** |
| border-strong `#5F6B85` | 3.59 | 3.32 | 2.97 | ✅ for inputs on `bg` and `surface`. Don't put inputs on `surface-2` |

Button text pairs: `bg` on `accent` = **10.61** ✅ · `bg` on `highlight` = **15.94** ✅ · `bg` on `critical` = **5.22** ✅ · **white on `critical` = 3.67 ❌**, so crimson fills use **dark text**.

See `identified-issues.md` entries ISS-004 and ISS-005.

## 2. Typography

| Role | Font | Size (mobile → desktop) | Notes |
|---|---|---|---|
| Hero headline | Orbitron *or* Rajdhani (pick one), falling back to Inter | `clamp(2.75rem, 8vw, 6.5rem)` | Uppercase, tight tracking (`-0.02em`), `line-height: 0.95`, `overflow-wrap: anywhere` |
| Wordmark | Same display font | 1.125rem | `NEXUS//SENTINEL`, with the `//` in acid green |
| H2 / section title | Inter 700 | 1.75rem → 2.5rem | Preceded by a thin diagonal slash accent |
| H3 / card title | Inter 600 | 1.125rem → 1.25rem | |
| Body | Inter 400 | 1rem | `line-height: 1.6`, max ~70ch |
| Small / caption | Inter 500 | 0.875rem | Muted colour |
| Data (metrics, IPs, timestamps) | JetBrains Mono | 0.875rem → 2.25rem (KPI value) | `font-variant-numeric: tabular-nums` |

Each font loads only the weights it uses, with `display=swap`. The fallback stack is `ui-sans-serif, system-ui, sans-serif` and `ui-monospace, monospace`.

## 3. Spacing, shape and layout
- **Spacing:** Tailwind's 4 px scale. Sections use `py-16 md:py-24`. Containers use `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` (16 px gutter on phones).
- **Chamfered corners (signature shape):** cards and buttons have one cut corner (top-right) made with `clip-path`:
  ```css
  /* illustrative — 12px cut on cards, 8px on buttons */
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
  ```
  Because `clip-path` also clips borders and shadows, put the border and glow on a wrapper or use an inset outline.
- **HUD corner brackets** on KPI tiles: two short L-shaped lines in opposite corners, drawn with `::before` and `::after` pseudo-elements in `--color-border-strong`. They turn cyan on hover.
- **Section accent:** a thin 2 px diagonal "slash" (`//`) before section titles.
- **Hero background only:** a faint grid (a 1 px line every 40 px at about 4% opacity) with an optional scanline overlay. No texture elsewhere.

## 4. Components

| Component | Spec |
|---|---|
| Header | Sticky, `surface` with ~80% opacity and `backdrop-blur`, 1 px bottom `border`. Wordmark on the left, nav on the right |
| Nav link | Muted text that turns `text` on hover. **Active link: `highlight` colour, 2 px underline in `highlight`, and `aria-current="page"`** |
| Mobile menu | Hamburger `<button aria-expanded aria-controls>` below `md`. The panel slides down (transform), and Esc closes it |
| Primary button | `accent` fill, `bg` text, chamfered. On hover, a cyan glow and a 1 px lift |
| Secondary button | Transparent with a `border-strong` outline. **On hover, an `highlight` border and text** |
| Card | `surface`, `border` outline, chamfered. On hover, translate up 2 px and the border becomes `highlight` at 60% |
| KPI tile | Card with HUD brackets, a muted label, a mono value, and a delta chip (`critical-text` ▲ when bad, `ok` ▼ when good) |
| Severity badge | Uppercase mono 0.75rem. CRITICAL: `critical` fill with `bg` text. HIGH: `critical-text` outline. MEDIUM: `warn` outline. LOW: `muted` outline |
| Tabs | `role="tablist"`. The selected tab has a `highlight` underline and `aria-selected="true"`. Arrow keys move between tabs |
| Form field | Label above. Input on `bg` or `surface` with a `border-strong` outline. Focus shows a 2 px `highlight` ring. Error text uses `critical-text`, linked with `aria-describedby` |
| Strength meter | 4 segments. Weak = critical, fair = warn, good = accent, strong = highlight, plus a text label ("Strength: Fair") with `aria-live="polite"` |
| Demo banner | Full-width bar, `surface-2`, 4 px left border in `warn`, text "DEMO ONLY: …" |
| Footer | `surface`, top `border`, three columns that become one on mobile. Includes the "Demo build · synthetic data" label |

## 5. Motion

| Use | Spec |
|---|---|
| Hero entrance | Opacity 0 → 1 and translateY 16 px → 0, 600 ms ease-out, staggered 80 ms. Runs once |
| Scroll reveal | Same, 400 ms, triggered by `IntersectionObserver` (threshold about 0.15), then unobserved |
| Hover | 150–200 ms. Only `transform`, `opacity`, `box-shadow` and `border-color` change |
| Network visualisation | Nodes pulse (scale and opacity, 3–6 s, randomised delays). Packets move by `stroke-dashoffset`. 1–2 links flash crimson every ~8 s |
| **Reduced motion** | Under `@media (prefers-reduced-motion: reduce)`: no entrance or reveal animations (content is visible immediately), the SVG animation is paused, and Chart.js `animation: false` |

Animate only `transform` and `opacity` for layout-level motion. Never animate `width`, `height`, `top` or `left`.

## 6. Breakpoints and test widths
Tailwind defaults: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`.
**Required test widths:** 360, 375, 390, 768, 1280 and 1440 px. There must be no horizontal page scroll at any of them.

## 7. ROG-inspired but original

| Do | Don't |
|---|---|
| Angular chamfers, diagonal slashes, HUD brackets | ASUS or ROG logos, the "eye" mark, "Republic of Gamers" wording |
| Cyan, acid-green and crimson roles as defined above | Red-and-black ASUS colour schemes, RGB rainbow gradients |
| One restrained glow on interaction | Multiple glowing elements at rest, heavy neon, busy textures |
