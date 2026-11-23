/*
  My Portfolio data. Percentages only: no account values are stored or shown.

  Source: brokerage performance report (PortfolioAnalyst), 27 May 2024 to 29 Oct 2026.
  Every figure is copied from the report. "series" values are the report's cumulative
  time-weighted returns in percent at each month end (Benchmark Performance Comparisons table).

  To update: add one month to "months" and one value to each series,
  then refresh "reported" and "asOf".
*/
window.TRACK_RECORD = {
  asOf: "29 Oct 2026",
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
      values: [-0.41,1.03,0.57,1.53,3.98,4.94,4.62,13.86,19.51,17.71,15.67,19.52,27.66,32.39,30.27,29.56,37.17,39.9,38.18,37.63,44.45,49.1,44.66,53.94,56.11,57.73,66.3,82.81,87.59,84.64]
    },
    {
      id: "spx",
      name: "S&P 500 (total return)",
      short: "S&P 500",
      values: [-0.49,3.08,4.33,6.86,9.15,8.16,14.51,11.78,14.89,13.39,7,6.27,12.96,18.71,21.37,23.83,28.35,31.36,31.68,31.76,33.67,32.66,26.05,39.28,46.61,45.21,45.12,49.07,48.55,49.98]
    },
    {
      id: "vt",
      name: "World equities (VT)",
      short: "VT",
      values: [-0.49,1.09,3.09,5.5,7.81,5.46,9.83,6.6,9.86,9.4,5.56,6.15,12.31,17.56,18.85,22.37,26.49,29.05,29.33,30.51,34.57,36.78,28.28,40.23,46.65,46.08,45.07,49.43,47.3,47.41]
    },
    {
      id: "efa",
      name: "Developed ex-US (EFA)",
      short: "EFA",
      values: [0.16,-1.65,0.9,4.19,5,-0.53,-0.85,-3.77,0.85,3.83,4.02,7.86,13.03,15.73,13.31,18.44,20.88,22.34,23.24,26.59,32.8,38.92,28.04,34.88,38.15,39.09,41.37,43.87,39.11,39.72]
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
    sortino: { value: 5.97 },
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
