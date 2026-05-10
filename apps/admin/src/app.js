import {
  featureReleaseGates,
  platformMetrics,
  releaseGateLabels,
  seedModerationCases
} from "../shared/index.js";

const app = document.querySelector("#app");

app.innerHTML = `
  <main class="admin-shell">
    <header class="admin-topbar">
      <div>
        <p class="eyebrow">Operations</p>
        <h1>Moderation Console</h1>
      </div>
      <button type="button" class="icon-button" aria-label="Filter queue">FILTER</button>
    </header>

    <section class="ops-grid" aria-label="Operations metrics">
      ${metric("Pending cases", platformMetrics.pendingModeration, "QA")}
      ${metric("Gated features", platformMetrics.gatedFeatures, "LOCK")}
      ${metric("Seed companies", platformMetrics.companies, "CO")}
    </section>

    <section class="queue-panel">
      <div class="panel-title">
        <div>
          <p class="eyebrow">Before UGC launch</p>
          <h2>Review Queue</h2>
        </div>
        <span>${releaseGateLabels[featureReleaseGates.anonymousPosts]}</span>
      </div>

      <div class="queue-table" role="table" aria-label="Moderation cases">
        <div class="queue-row queue-head" role="row">
          <span>Case</span><span>Type</span><span>Risk</span><span>Reason</span><span>Action</span>
        </div>
        ${seedModerationCases.map(queueRow).join("")}
      </div>
    </section>
  </main>
`;

function metric(label, value, mark) {
  return `
    <article class="ops-card">
      <span class="ops-mark">${mark}</span>
      <strong>${value}</strong>
      <p>${label}</p>
    </article>
  `;
}

function queueRow(item) {
  return `
    <div class="queue-row" role="row">
      <span>${item.id}</span>
      <span>${item.contentType}</span>
      <span class="risk-badge ${item.riskLevel}">${item.riskLevel}</span>
      <span>${item.reason}</span>
      <div class="action-group">
        <button type="button" aria-label="Approve ${item.id}">OK</button>
        <button type="button" aria-label="Reject ${item.id}">NO</button>
      </div>
    </div>
  `;
}
