import test from "node:test";
import assert from "node:assert/strict";

import { createApiServer } from "../services/api/src/server.js";

test("health endpoint returns service status", async () => {
  const { server, baseUrl } = await startTestServer();

  try {
    const response = await fetch(`${baseUrl}/health`);
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.equal(payload.ok, true);
    assert.equal(payload.service, "bigmountain-api");
  } finally {
    await stopServer(server);
  }
});

test("salary endpoint filters seeded results", async () => {
  const { server, baseUrl } = await startTestServer();

  try {
    const response = await fetch(`${baseUrl}/api/salaries?q=AI`);
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.equal(payload.length, 1);
    assert.equal(payload[0].companyName, "Harbor AI");
    assert.equal(payload[0].totalAnnualCny, 670000);
  } finally {
    await stopServer(server);
  }
});

test("community endpoint exposes gate metadata", async () => {
  const { server, baseUrl } = await startTestServer();

  try {
    const response = await fetch(`${baseUrl}/api/community/posts`);
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.equal(payload.gate, "anonymous_community");
    assert.equal(Array.isArray(payload.items), true);
  } finally {
    await stopServer(server);
  }
});

async function startTestServer() {
  const server = createApiServer();

  await new Promise((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  return {
    server,
    baseUrl: `http://127.0.0.1:${address.port}`
  };
}

function stopServer(server) {
  return new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}
