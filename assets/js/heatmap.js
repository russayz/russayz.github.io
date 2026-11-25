/* Monthly returns heatmap for My Portfolio. No dependencies.
   Builds itself from the cumulative "portfolio" series in performance-data.js,
   so adding a month there adds a cell here. Nothing to edit in this file.
   Usage: <div data-heatmap></div> */
(function () {
  "use strict";

  var DATA = window.TRACK_RECORD;
  if (!DATA) return;
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var FULL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var MINUS = "−";
  var CAP = 6; // a move of 6% or more gets the deepest color

  function fmt(v) {
    var r = Math.round(v * 100) / 100;
    if (r === 0) return "0.00";
    return (r < 0 ? MINUS : "+") + Math.abs(r).toFixed(2);
  }
  function spacer(tag) {
    var c = document.createElement(tag);
    c.className = "hm-gap";
    c.setAttribute("aria-hidden", "true");
    return c;
  }

  function build(root) {
    var series = null;
    DATA.series.forEach(function (s) { if (s.id === "portfolio") series = s; });
    if (!series) return;

    // month-end cumulative returns -> each month's own return
    var byYear = {};
    var years = [];
    var prev = 1;
    DATA.months.forEach(function (key, i) {
      var level = 1 + series.values[i] / 100;
      var ret = (level / prev - 1) * 100;
      prev = level;
      var y = key.slice(0, 4);
      var m = parseInt(key.slice(5), 10) - 1;
      if (!byYear[y]) { byYear[y] = { months: {}, growth: 1 }; years.push(y); }
      byYear[y].months[m] = ret;
      byYear[y].growth *= 1 + ret / 100;
    });

    // Where the broker report states a single month exactly (last, best, worst month),
    // show that figure so the grid agrees with the stats panel to the second decimal.
    var rep = DATA.reported || {};
    ["lastMonth", "bestMonth", "worstMonth"].forEach(function (k) {
      var r = rep[k];
      var p = r && /^([A-Z][a-z]{2}) (\d{4})$/.exec(r.period || "");
      if (!p) return;
      var m = MONTHS.indexOf(p[1]);
      if (m !== -1 && byYear[p[2]] && byYear[p[2]].months.hasOwnProperty(m)) byYear[p[2]].months[m] = r.value;
    });

    var table = document.createElement("table");
    table.className = "heatmap";
    var cap = document.createElement("caption");
    cap.className = "visually-hidden";
    cap.textContent = "Monthly portfolio returns in percent, by year";
    table.appendChild(cap);

    var thead = document.createElement("thead");
    var hr = document.createElement("tr");
    var corner = document.createElement("th");
    corner.scope = "col";
    corner.className = "hm-corner";
    corner.innerHTML = '<span class="visually-hidden">Year</span>';
    hr.appendChild(corner);
    MONTHS.forEach(function (m, i) {
      var th = document.createElement("th");
      th.scope = "col";
      th.abbr = FULL[i];
      th.textContent = m;
      hr.appendChild(th);
    });
    hr.appendChild(spacer("td"));
    var yh = document.createElement("th");
    yh.scope = "col";
    yh.className = "hm-year";
    yh.abbr = "Year to date";
    yh.textContent = "YTD";
    hr.appendChild(yh);
    thead.appendChild(hr);
    table.appendChild(thead);

    var tb = document.createElement("tbody");
    years.forEach(function (y) {
      var row = byYear[y];
      var tr = document.createElement("tr");
      var th = document.createElement("th");
      th.scope = "row";
      th.textContent = y;
      tr.appendChild(th);
      for (var m = 0; m < 12; m++) {
        var td = document.createElement("td");
        if (row.months.hasOwnProperty(m)) {
          var v = row.months[m];
          var a = Math.abs(v) < 0.05 ? 0 : 0.12 + 0.88 * Math.min(Math.abs(v) / CAP, 1);
          td.className = v < 0 ? "is-neg" : "is-pos";
          td.style.setProperty("--a", a.toFixed(3));
          td.textContent = fmt(v);
          td.title = FULL[m] + " " + y + ": " + fmt(v) + "%";
        } else {
          td.className = "is-empty";
          td.innerHTML = '<span class="visually-hidden">No data</span>';
        }
        tr.appendChild(td);
      }
      tr.appendChild(spacer("td"));
      var yt = document.createElement("td");
      var total = (row.growth - 1) * 100;
      yt.className = "hm-year " + (total < 0 ? "is-neg" : "is-pos");
      yt.style.setProperty("--a", "0.5");
      yt.textContent = fmt(total);
      yt.title = y + ": " + fmt(total) + "%";
      tr.appendChild(yt);
      tb.appendChild(tr);
    });
    table.appendChild(tb);
    root.appendChild(table);
  }

  function init() {
    document.querySelectorAll("[data-heatmap]").forEach(build);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
