const salaryRecords = [
  {
    id: "s-001",
    companyName: "ByteWave",
    role: "Backend Engineer",
    city: "Beijing",
    level: "Senior",
    totalAnnualCny: 730000
  },
  {
    id: "s-002",
    companyName: "Harbor AI",
    role: "Machine Learning Engineer",
    city: "Shanghai",
    level: "Mid",
    totalAnnualCny: 670000
  },
  {
    id: "s-003",
    companyName: "River Health",
    role: "Product Manager",
    city: "Hangzhou",
    level: "Lead",
    totalAnnualCny: 490000
  }
];

function formatCny(amount) {
  return `CNY ${Math.round(amount / 10000)}w`;
}

function mapRecord(record) {
  return {
    ...record,
    totalAnnualCnyText: formatCny(record.totalAnnualCny)
  };
}

Page({
  data: {
    query: "",
    filteredRecords: salaryRecords.map(mapRecord)
  },
  onInput(event) {
    const query = event.detail.value.trim().toLowerCase();
    const filteredRecords = salaryRecords
      .filter((record) => {
        return [record.companyName, record.role, record.city, record.level].some((value) =>
          value.toLowerCase().includes(query)
        );
      })
      .map(mapRecord);

    this.setData({
      query: event.detail.value,
      filteredRecords
    });
  }
});
