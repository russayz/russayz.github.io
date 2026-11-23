/*
  Track record data. Percentages only: no account values are stored or shown.

  Source: brokerage performance report, May 2024 to Oct 2026.
  - "reported" figures are copied exactly from the report.
  - "series" values are cumulative returns in percent at each month end,
    read from the report's chart, then reconciled to the reported figures.
    Benchmark paths are approximate.

  To update: add one month to "months" and one value to each series,
  then refresh "reported" and "asOf".
*/
window.TRACK_RECORD = {
  asOf: "31 Oct 2026",
  inception: "May 2024",
  months: [
    "2024-05","2024-06","2024-07","2024-08","2024-09","2024-10","2024-11","2024-12",
    "2025-01","2025-02","2025-03","2025-04","2025-05","2025-06","2025-07","2025-08",
    "2025-09","2025-10","2025-11","2025-12","2026-01","2026-02","2026-03","2026-04",
    "2026-05","2026-06","2026-07","2026-08","2026-09","2026-10"
  ],
  series: [
    {
      id: "portfolio",
      name: "My portfolio",
      short: "Portfolio",
      values: [0.0,1.05,0.39,1.55,4.03,4.86,4.7,13.81,19.45,17.79,15.62,19.45,27.73,32.38,30.22,29.72,37.35,39.83,38.18,37.85,44.48,49.12,44.69,53.92,56.08,57.9,66.3,82.81,87.6,84.64]
    },
    {
      id: "spx",
      name: "S&P 500 (total return)",
      short: "S&P 500",
      values: [0.0,3.2,4.36,6.85,9.17,8.18,14.48,11.82,14.97,13.48,7.18,8.0,14.48,18.78,21.44,23.92,28.4,31.38,31.71,31.71,33.7,32.71,26.41,39.17,45.64,45.14,44.23,48.62,48.62,49.94]
    },
    {
      id: "vt",
      name: "World equities (VT)",
      short: "VT",
      values: [0.0,1.05,2.87,5.52,7.85,5.86,9.83,6.52,9.83,9.5,5.52,6.02,12.15,17.46,18.78,22.43,26.41,29.06,29.39,30.72,34.7,36.69,28.56,40.5,46.8,46.13,45.14,49.45,47.29,47.62]
    },
    {
      id: "efa",
      name: "Developed ex-US (EFA)",
      short: "EFA",
      values: [0.0,-1.6,1.55,4.2,5.19,-0.44,-0.77,-3.76,0.88,3.7,4.03,7.85,13.31,15.8,13.31,18.45,20.94,22.27,23.26,26.74,32.71,38.84,28.73,35.03,38.01,39.17,41.33,43.98,39.17,39.83]
    }
  ],
  reported: {
    cumulative: { value: 84.64, period: "May 2024 to Oct 2026" },
    lastMonth: { value: -1.58, period: "Oct 2026" },
    lastThreeMonths: { value: 11.03, period: "Aug to Oct 2026" },
    bestMonth: { value: 9.93, period: "Aug 2026" },
    worstMonth: { value: -2.97, period: "Mar 2026" },
    maxDrawdown: { value: -3.21, period: "Jan to Mar 2025" },
    sharpe: { value: 1.87 },
    stdDev: { value: 3.28 }
  },
  contributors: {
    top: [
      { ticker: "AVGO", name: "Broadcom", ctr: 8.28 },
      { ticker: "PANW", name: "Palo Alto Networks", ctr: 7.13 },
      { ticker: "ASML", name: "ASML Holding", ctr: 6.93 },
      { ticker: "7389.T", name: "Aichi Financial Group", ctr: 5.53 },
      { ticker: "CSPX", name: "iShares Core S&P 500 UCITS ETF", ctr: 4.0 }
    ],
    bottom: [
      { ticker: "BX", name: "Blackstone", ctr: -1.83 },
      { ticker: "GRPN", name: "Groupon", ctr: -1.53 },
      { ticker: "LAC", name: "Lithium Americas", ctr: -0.6 },
      { ticker: "BNO", name: "United States Brent Oil Fund", ctr: -0.34 },
      { ticker: "AAOI", name: "Applied Optoelectronics", ctr: -0.33 }
    ]
  }
};
