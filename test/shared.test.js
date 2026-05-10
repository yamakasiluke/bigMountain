import test from "node:test";
import assert from "node:assert/strict";

import {
  featureReleaseGates,
  platformMetrics,
  seedSalaryRecords,
  totalCompensation
} from "../packages/shared/src/index.js";

test("shared release gates keep salary search public", () => {
  assert.equal(featureReleaseGates.salarySearch, "public_read");
  assert.equal(featureReleaseGates.anonymousPosts, "anonymous_community");
});

test("shared metrics reflect seeded data", () => {
  assert.equal(platformMetrics.companies, 3);
  assert.equal(platformMetrics.salaryRecords, seedSalaryRecords.length);
});

test("totalCompensation sums base, bonus, and equity", () => {
  const firstRecord = seedSalaryRecords[0];
  assert.equal(totalCompensation(firstRecord), 730000);
});
