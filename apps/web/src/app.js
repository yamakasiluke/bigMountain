import {
  featureReleaseGates,
  formatCny,
  platformMetrics,
  releaseGateDescriptions,
  releaseGateLabels,
  seedCompanies,
  seedJobs,
  seedSalaryRecords,
  totalCompensation
} from "../shared/index.js";

const state = {
  query: "",
  city: "All cities"
};

const cityOptions = ["All cities", "Beijing", "Shanghai", "Hangzhou", "Shenzhen"];
const app = document.querySelector("#app");

render();

function render() {
  const salaries = filteredSalaries();
  app.innerHTML = `
    <main class="app-shell">
      <header class="topbar">
        <div>
          <p class="eyebrow">China-first salary intelligence</p>
          <h1>BigMountain</h1>
        </div>
        <div class="status-group" aria-label="Release status">
          <span class="status-pill">OK Read-only MVP</span>
          <span class="status-pill muted">LOCK UGC gated</span>
        </div>
      </header>

      <section class="metric-grid" aria-label="Platform metrics">
        ${metric("Companies", platformMetrics.companies, "BM")}
        ${metric("Salary records", platformMetrics.salaryRecords, "CN")}
        ${metric("Open jobs", platformMetrics.openJobs, "JD")}
        ${metric("Review queue", platformMetrics.pendingModeration, "QA")}
      </section>

      <section class="workspace-grid">
        <div class="main-panel">
          <div class="panel-heading">
            <div>
              <p class="eyebrow">Gate 1</p>
              <h2>Salary Search</h2>
            </div>
            <span class="gate-chip">${releaseGateLabels[featureReleaseGates.salarySearch]}</span>
          </div>

          <div class="filter-row" role="search">
            <label class="search-field">
              <span aria-hidden="true">SEARCH</span>
              <input id="salary-query" value="${escapeHtml(state.query)}" placeholder="Search role, company, level" />
            </label>
            <select id="city-filter" aria-label="City filter">
              ${cityOptions.map((option) => `<option ${option === state.city ? "selected" : ""}>${option}</option>`).join("")}
            </select>
          </div>

          <div class="salary-list" aria-label="Salary results">
            ${salaries.map(salaryRow).join("")}
          </div>
        </div>

        <aside class="side-panel" aria-label="Company and launch status">
          <div class="panel-heading compact">
            <h2>Companies</h2>
            <span class="mini-mark">CO</span>
          </div>
          <div class="company-list">
            ${seedCompanies.map(companyCard).join("")}
          </div>

          <div class="panel-heading compact jobs-heading">
            <h2>Curated Jobs</h2>
            <span class="mini-mark">JOB</span>
          </div>
          <div class="job-list">
            ${seedJobs.filter((job) => job.status === "approved").map(jobCard).join("")}
          </div>
        </aside>
      </section>

      <section class="gate-grid" aria-label="Compliance-gated features">
        ${gateCard("Anonymous Posts", featureReleaseGates.anonymousPosts, "POST")}
        ${gateCard("Company Reviews", featureReleaseGates.companyReviews, "REV")}
        ${gateCard("Job Submissions", featureReleaseGates.jobSubmission, "JOB")}
      </section>
    </main>
  `;

  document.querySelector("#salary-query").addEventListener("input", (event) => {
    state.query = event.target.value;
    render();
    document.querySelector("#salary-query").focus();
  });
  document.querySelector("#city-filter").addEventListener("change", (event) => {
    state.city = event.target.value;
    render();
  });
}

function filteredSalaries() {
  const term = state.query.trim().toLowerCase();
  return seedSalaryRecords.filter((record) => {
    const matchesQuery = term
      ? [record.role, record.companyName, record.level, record.city].some((value) => value.toLowerCase().includes(term))
      : true;
    const matchesCity = state.city === "All cities" ? true : record.city === state.city;
    return matchesQuery && matchesCity;
  });
}

function metric(label, value, mark) {
  return `
    <article class="metric-card">
      <span>${mark}</span>
      <div><strong>${value}</strong><p>${label}</p></div>
    </article>
  `;
}

function salaryRow(record) {
  return `
    <article class="salary-row">
      <div><h3>${record.role}</h3><p>${record.companyName} / ${record.city} / ${record.level}</p></div>
      <div class="salary-total"><strong>${formatCny(totalCompensation(record))}</strong><span>total annual</span></div>
      <div class="salary-breakdown">
        <span>Base ${formatCny(record.baseAnnualCny)}</span>
        <span>Bonus ${formatCny(record.bonusAnnualCny)}</span>
        <span>Equity ${formatCny(record.equityAnnualCny)}</span>
      </div>
    </article>
  `;
}

function companyCard(company) {
  return `
    <article class="company-card">
      <div><h3>${company.name}</h3><p>${company.industry} / ${company.city}</p></div>
      <span>${company.openJobs} jobs</span>
    </article>
  `;
}

function jobCard(job) {
  return `
    <article class="job-card">
      <h3>${job.title}</h3>
      <p>${job.companyName} / ${job.city}</p>
      <span>${formatCny(job.salaryRangeCny[0])} - ${formatCny(job.salaryRangeCny[1])}</span>
    </article>
  `;
}

function gateCard(title, gate, mark) {
  return `
    <article class="gate-card">
      <div class="gate-title"><span class="mini-mark">${mark}</span><h3>${title}</h3></div>
      <span>${releaseGateLabels[gate]}</span>
      <p>${releaseGateDescriptions[gate]}</p>
    </article>
  `;
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[char]);
}
