import { createServer } from "node:http";
import { URL, pathToFileURL } from "node:url";
import {
  featureReleaseGates,
  platformMetrics,
  seedAnonymousPosts,
  seedCompanies,
  seedJobs,
  seedModerationCases,
  seedReviews,
  seedSalaryRecords,
  totalCompensation
} from "../../../packages/shared/src/index.js";

export function handleApiRequest(request, response) {
  const url = new URL(request.url ?? "/", `http://${request.headers.host}`);

  if (request.method === "OPTIONS") {
    sendJson(response, 204, null);
    return;
  }

  if (request.method !== "GET") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  if (url.pathname === "/health") {
    sendJson(response, 200, {
      ok: true,
      service: "bigmountain-api",
      checkedAt: new Date().toISOString()
    });
    return;
  }

  if (url.pathname === "/api/summary") {
    sendJson(response, 200, {
      metrics: platformMetrics,
      releaseGates: featureReleaseGates
    });
    return;
  }

  if (url.pathname === "/api/companies") {
    const term = normalize(url.searchParams.get("q"));
    const city = normalize(url.searchParams.get("city"));
    sendJson(
      response,
      200,
      seedCompanies.filter((company) => {
        const matchesTerm = term
          ? [company.name, company.industry, company.city].some((value) => normalize(value).includes(term))
          : true;
        const matchesCity = city ? normalize(company.city) === city : true;
        return matchesTerm && matchesCity;
      })
    );
    return;
  }

  if (url.pathname === "/api/salaries") {
    const term = normalize(url.searchParams.get("q"));
    const city = normalize(url.searchParams.get("city"));
    const companyId = url.searchParams.get("companyId");
    sendJson(
      response,
      200,
      seedSalaryRecords
        .filter((record) => {
          const matchesTerm = term
            ? [record.companyName, record.role, record.city, record.level].some((value) =>
                normalize(value).includes(term)
              )
            : true;
          const matchesCity = city ? normalize(record.city) === city : true;
          const matchesCompany = companyId ? record.companyId === companyId : true;
          return matchesTerm && matchesCity && matchesCompany;
        })
        .map((record) => ({ ...record, totalAnnualCny: totalCompensation(record) }))
    );
    return;
  }

  if (url.pathname === "/api/jobs") {
    sendJson(response, 200, seedJobs.filter((job) => job.status === "approved"));
    return;
  }

  if (url.pathname === "/api/community/posts") {
    sendJson(response, 200, {
      gate: featureReleaseGates.anonymousPosts,
      items: seedAnonymousPosts.filter((post) => post.status === "approved")
    });
    return;
  }

  if (url.pathname === "/api/reviews") {
    sendJson(response, 200, {
      gate: featureReleaseGates.companyReviews,
      items: seedReviews.filter((review) => review.status === "approved")
    });
    return;
  }

  if (url.pathname === "/api/moderation/queue") {
    sendJson(response, 200, seedModerationCases);
    return;
  }

  sendJson(response, 404, { error: "Not found" });
}

export function createApiServer() {
  return createServer(handleApiRequest);
}

export function startApiServer(options = {}) {
  const port = Number(options.port ?? process.env.PORT ?? 4000);
  const host = options.host ?? process.env.HOST ?? "127.0.0.1";
  const server = createApiServer();
  return new Promise((resolve) => {
    server.listen(port, host, () => {
      console.log(`BigMountain API running at http://${host}:${port}`);
      resolve(server);
    });
  });
}

function normalize(value) {
  return (value ?? "").trim().toLowerCase();
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8"
  });

  if (statusCode !== 204) {
    response.end(JSON.stringify(payload));
  } else {
    response.end();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await startApiServer();
}

