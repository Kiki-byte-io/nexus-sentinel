// Read colours from the CSS variables Tailwind made from @theme,
// so the charts always match the page.
const css = getComputedStyle(document.documentElement);
const color = (name) => css.getPropertyValue(name).trim();

const C = {
  accent: color("--color-accent"),
  critical: color("--color-critical"),
  warn: color("--color-warn"),
  muted: color("--color-muted"),
  border: color("--color-border"),
  borderStrong: color("--color-border-strong"),
  surface: color("--color-surface"),
};

// Settings for every chart
Chart.defaults.color = C.muted;
Chart.defaults.borderColor = C.border;
Chart.defaults.font.family = "Inter, system-ui, sans-serif";
Chart.defaults.maintainAspectRatio = false; // the box's height controls the size
if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  Chart.defaults.animation = false;
}

// Wait for fonts to load first, or the labels get cut off
document.fonts.ready.then(drawCharts);

function drawCharts() {
  // charts go here
    // 1. LINE: successful vs failed sign-ins per hour
  new Chart(document.getElementById("authChart"), {
    type: "line",
    data: {
      labels: SECURITY_DATA.hours,
      datasets: [
        { label: "Successful", data: SECURITY_DATA.success, borderColor: C.accent,
          backgroundColor: C.accent + "22", fill: true, tension: 0.35, pointRadius: 0 },
        { label: "Failed", data: SECURITY_DATA.failed, borderColor: C.critical,
          backgroundColor: C.critical + "33", fill: true, tension: 0.35, pointRadius: 0 },
      ],
    },
    options: {
      interaction: { mode: "index", intersect: false },
      scales: { x: { ticks: { maxTicksLimit: 6, maxRotation: 0 } }, y: { beginAtZero: true } },
    },
  });

  // 2. DOUGHNUT: attack types
  new Chart(document.getElementById("attackChart"), {
    type: "doughnut",
    data: {
      labels: Object.keys(SECURITY_DATA.attackTypes),
      datasets: [{
        data: Object.values(SECURITY_DATA.attackTypes),
        backgroundColor: [C.critical, C.warn, C.accent, C.borderStrong],
        borderColor: C.surface,
        borderWidth: 3,
      }],
    },
    options: {
      cutout: "65%",
      plugins: { legend: { position: "bottom", labels: { boxWidth: 12, padding: 12 } } },
    },
  });

  // 3. BAR: YOU WRITE THIS ONE
    new Chart(document.getElementById("ipChart"), {
    type: "bar",
    data: {
      labels: SECURITY_DATA.topIps.map(([ip]) => ip),
      datasets: [{
        label: "Failed attempts",
        data: SECURITY_DATA.topIps.map(([, count]) => count),
        backgroundColor: C.critical,
      }],
    },
    options: {
      indexAxis: "y",
      plugins: { legend: { display: false } },
    },
  });

}
