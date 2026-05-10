export const featureReleaseGates = {
  salarySearch: "public_read",
  companyPages: "public_read",
  readOnlyJobs: "public_read",
  jobSubmission: "moderated_submit",
  anonymousPosts: "anonymous_community",
  companyReviews: "anonymous_community"
};

export const releaseGateLabels = {
  public_read: "Public read",
  moderated_submit: "Moderated submission",
  anonymous_community: "Anonymous community"
};

export const releaseGateDescriptions = {
  public_read: "Ready for curated, read-only launch.",
  moderated_submit: "Requires review queue, audit logs, and content rules.",
  anonymous_community: "Requires company setup, compliance, automated checks, and human review."
};

export const seedCompanies = [
  {
    id: "c-bytewave",
    name: "ByteWave",
    industry: "Internet",
    city: "Beijing",
    size: "1000+",
    salaryRecordCount: 128,
    reviewCount: 42,
    openJobs: 11
  },
  {
    id: "c-harbor-ai",
    name: "Harbor AI",
    industry: "AI Infrastructure",
    city: "Shanghai",
    size: "201-1000",
    salaryRecordCount: 61,
    reviewCount: 18,
    openJobs: 7
  },
  {
    id: "c-river-health",
    name: "River Health",
    industry: "Healthcare",
    city: "Hangzhou",
    size: "51-200",
    salaryRecordCount: 36,
    reviewCount: 9,
    openJobs: 4
  }
];

export const seedSalaryRecords = [
  {
    id: "s-001",
    companyId: "c-bytewave",
    companyName: "ByteWave",
    role: "Backend Engineer",
    city: "Beijing",
    level: "Senior",
    baseAnnualCny: 520000,
    bonusAnnualCny: 130000,
    equityAnnualCny: 80000,
    verifiedSource: "manual_seed",
    collectedAt: "2026-05-01"
  },
  {
    id: "s-002",
    companyId: "c-harbor-ai",
    companyName: "Harbor AI",
    role: "Machine Learning Engineer",
    city: "Shanghai",
    level: "Mid",
    baseAnnualCny: 460000,
    bonusAnnualCny: 90000,
    equityAnnualCny: 120000,
    verifiedSource: "trusted_submitter",
    collectedAt: "2026-05-03"
  },
  {
    id: "s-003",
    companyId: "c-river-health",
    companyName: "River Health",
    role: "Product Manager",
    city: "Hangzhou",
    level: "Lead",
    baseAnnualCny: 390000,
    bonusAnnualCny: 70000,
    equityAnnualCny: 30000,
    verifiedSource: "manual_seed",
    collectedAt: "2026-05-04"
  },
  {
    id: "s-004",
    companyId: "c-bytewave",
    companyName: "ByteWave",
    role: "Data Analyst",
    city: "Shenzhen",
    level: "Mid",
    baseAnnualCny: 310000,
    bonusAnnualCny: 50000,
    equityAnnualCny: 20000,
    verifiedSource: "partner_feed",
    collectedAt: "2026-05-06"
  }
];

export const seedJobs = [
  {
    id: "j-001",
    companyId: "c-bytewave",
    companyName: "ByteWave",
    title: "Staff Backend Engineer",
    city: "Beijing",
    salaryRangeCny: [650000, 950000],
    status: "approved",
    source: "curated"
  },
  {
    id: "j-002",
    companyId: "c-harbor-ai",
    companyName: "Harbor AI",
    title: "ML Platform Engineer",
    city: "Shanghai",
    salaryRangeCny: [520000, 820000],
    status: "approved",
    source: "curated"
  },
  {
    id: "j-003",
    companyId: "c-river-health",
    companyName: "River Health",
    title: "Growth Product Manager",
    city: "Hangzhou",
    salaryRangeCny: [360000, 560000],
    status: "pending_review",
    source: "employer_submit"
  }
];

export const seedAnonymousPosts = [
  {
    id: "p-001",
    companyId: "c-bytewave",
    companyName: "ByteWave",
    title: "Offer comparison for senior backend roles",
    topic: "compensation",
    status: "pending_review",
    replyCount: 0,
    createdAt: "2026-05-08T10:00:00Z"
  },
  {
    id: "p-002",
    companyId: "c-harbor-ai",
    companyName: "Harbor AI",
    title: "Interview loop details for platform team",
    topic: "interview",
    status: "approved",
    replyCount: 12,
    createdAt: "2026-05-07T14:30:00Z"
  }
];

export const seedReviews = [
  {
    id: "r-001",
    companyId: "c-bytewave",
    companyName: "ByteWave",
    rating: 4.1,
    title: "Fast growth, uneven manager quality",
    status: "pending_review",
    createdAt: "2026-05-07T08:15:00Z"
  },
  {
    id: "r-002",
    companyId: "c-river-health",
    companyName: "River Health",
    rating: 3.8,
    title: "Strong mission, slower promotion path",
    status: "approved",
    createdAt: "2026-05-06T12:45:00Z"
  }
];

export const seedModerationCases = [
  {
    id: "m-001",
    contentType: "post",
    contentId: "p-001",
    status: "needs_manual_review",
    riskLevel: "medium",
    reason: "Compensation claim needs source confidence check.",
    submittedAt: "2026-05-08T10:01:00Z"
  },
  {
    id: "m-002",
    contentType: "review",
    contentId: "r-001",
    status: "queued",
    riskLevel: "low",
    reason: "New company review awaiting first human pass.",
    submittedAt: "2026-05-07T08:16:00Z"
  },
  {
    id: "m-003",
    contentType: "job",
    contentId: "j-003",
    status: "queued",
    riskLevel: "low",
    reason: "Employer-submitted job needs approval before listing.",
    submittedAt: "2026-05-06T17:25:00Z"
  }
];

export const platformMetrics = {
  companies: seedCompanies.length,
  salaryRecords: seedSalaryRecords.length,
  openJobs: seedJobs.filter((job) => job.status === "approved").length,
  pendingModeration: seedModerationCases.filter(
    (item) => item.status === "queued" || item.status === "needs_manual_review"
  ).length,
  gatedFeatures: Object.values(featureReleaseGates).filter((gate) => gate !== "public_read").length
};

export function formatCny(amount) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0
  }).format(amount);
}

export function totalCompensation(record) {
  return record.baseAnnualCny + record.bonusAnnualCny + record.equityAnnualCny;
}
