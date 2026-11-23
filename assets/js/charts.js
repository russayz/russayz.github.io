/* Line chart for the track record. No dependencies.
   Usage: <div class="chart" data-chart="cumulative" data-series="portfolio,spx" data-variant="mini"></div> */
(function () {
  "use strict";

  var DATA = window.TRACK_RECORD;
  if (!DATA) return;
  var SVGNS = "http://www.w3.org/2000/svg";
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var MINUS = "−";

  function fmtPct(v, digits) {
    var d = digits == null ? 1 : digits;
    var s = Math.abs(v).toFixed(d);
    if (v > 0) return "+" + s + "%";
    if (v < 0) return MINUS + s + "%";
    return s + "%";
  }
  function monthLabel(key, withYear) {
    var p = key.split("-");
    var m = MONTHS[parseInt(p[1], 10) - 1];
    return withYear === false ? m : m + " " + p[0];
  }
  function el(name, attrs, parent) {
    var n = document.createElementNS(SVGNS, name);
    if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function seriesById(id) {
    for (var i = 0; i < DATA.series.length; i++) if (DATA.series[i].id === id) return DATA.series[i];
    return null;
  }

  function Chart(root) {
    this.root = root;
    this.variant = root.getAttribute("data-variant") || "full";
    this.visible = (root.getAttribute("data-series") || "portfolio,spx").split(",");
    this.animate = root.hasAttribute("data-animate");
    this.hoverIndex = null;
    this.root.setAttribute("tabindex", "0");
    this.root.setAttribute("role", "group");
    this.tooltip = document.createElement("div");
    this.tooltip.className = "tooltip";
    this.tooltip.setAttribute("aria-hidden", "true");
    this.root.appendChild(this.tooltip);
    this.bind();
    this.render(true);
    var self = this;
    if ("ResizeObserver" in window) {
      var last = root.clientWidth;
      new ResizeObserver(function () {
        if (Math.abs(root.clientWidth - last) > 1) { last = root.clientWidth; self.render(false); }
      }).observe(root);
    } else {
      window.addEventListener("resize", function () { self.render(false); });
    }
  }

  Chart.prototype.setVisible = function (ids) {
    this.visible = ids;
    this.render(false);
  };

  Chart.prototype.layout = function () {
    var w = Math.max(280, this.root.clientWidth);
    var mini = this.variant === "mini";
    var narrow = w < 520;
    var h = mini ? (narrow ? 210 : 260) : (narrow ? 300 : 400);
    var right = narrow ? 58 : (mini ? 112 : 168);
    return { w: w, h: h, top: 12, right: right, bottom: 30, left: 46, narrow: narrow, mini: mini };
  };

  Chart.prototype.render = function (first) {
    var L = this.layout();
    var months = DATA.months;
    var n = months.length;
    var shown = [];
    for (var i = 0; i < DATA.series.length; i++) {
      if (this.visible.indexOf(DATA.series[i].id) !== -1) shown.push(DATA.series[i]);
    }
    this.shown = shown;

    var lo = 0, hi = 0;
    shown.forEach(function (s) { s.values.forEach(function (v) { lo = Math.min(lo, v); hi = Math.max(hi, v); }); });
    lo = lo < 0 ? lo - 2 : 0;
    hi = hi * 1.06;
    var step = hi > 60 ? 20 : 10;

    var x0 = L.left, x1 = L.w - L.right, y0 = L.h - L.bottom, y1 = L.top;
    var sx = function (i) { return x0 + (x1 - x0) * (i / (n - 1)); };
    var sy = function (v) { return y0 - (y0 - y1) * ((v - lo) / (hi - lo)); };
    this.geo = { sx: sx, sy: sy, x0: x0, x1: x1, y0: y0, y1: y1, n: n };

    var old = this.root.querySelector("svg");
    if (old) old.remove();
    var svg = el("svg", { viewBox: "0 0 " + L.w + " " + L.h, width: L.w, height: L.h, role: "img" });
    var last = n - 1;
    var label = "Cumulative return from " + monthLabel(months[0]) + " to " + monthLabel(months[last]) + ". " +
      shown.map(function (s) { return s.name + " " + fmtPct(s.values[last]); }).join(", ") + ".";
    el("title", null, svg).textContent = label;
    this.root.setAttribute("aria-label", label + " Use the left and right arrow keys to read each month.");

    // grid
    var grid = el("g", { "class": "grid" }, svg);
    var axis = el("g", { "class": "axis" }, svg);
    for (var t = Math.ceil(lo / step) * step; t <= hi; t += step) {
      var y = Math.round(sy(t)) + 0.5;
      el("line", { x1: x0, x2: x1, y1: y, y2: y, "class": t === 0 ? "zero" : "" }, grid);
      var tx = el("text", { x: x0 - 10, y: y + 4, "text-anchor": "end" }, axis);
      tx.textContent = t === 0 ? "0%" : fmtPct(t, 0);
    }
    // x labels: first and last month always, then each January if it has room
    var cands = [];
    months.forEach(function (m, i) {
      var isJan = m.slice(5) === "01";
      if (isJan) {
        var x = Math.round(sx(i)) + 0.5;
        el("line", { x1: x, x2: x, y1: y1, y2: y0 }, grid);
      }
      if (i === 0) cands.push({ i: i, txt: monthLabel(m), anchor: "start", pri: 0 });
      else if (i === last) cands.push({ i: i, txt: monthLabel(m), anchor: "end", pri: 0 });
      else if (isJan) cands.push({ i: i, txt: m.slice(0, 4), anchor: "middle", pri: 1 });
    });
    var placed = [];
    cands.sort(function (a, b) { return a.pri - b.pri; }).forEach(function (c) {
      var w = c.txt.length * 7;
      var cx = sx(c.i);
      var a = c.anchor === "start" ? cx : c.anchor === "end" ? cx - w : cx - w / 2;
      var b = a + w;
      var clash = placed.some(function (p) { return a < p[1] + 10 && b > p[0] - 10; });
      if (clash) return;
      placed.push([a, b]);
      var lx = el("text", { x: cx, y: y0 + 20, "text-anchor": c.anchor }, axis);
      lx.textContent = c.txt;
    });

    // series, benchmarks first so the portfolio sits on top
    var order = shown.slice().sort(function (a, b) { return (a.id === "portfolio") - (b.id === "portfolio"); });
    var self = this;
    var portfolioPath = null;
    order.forEach(function (s) {
      var g = el("g", { "class": "series is-" + s.id }, svg);
      var d = s.values.map(function (v, i) { return (i ? "L" : "M") + sx(i).toFixed(1) + " " + sy(v).toFixed(1); }).join(" ");
      if (s.id === "portfolio") {
        var area = d + " L" + sx(last).toFixed(1) + " " + sy(Math.max(lo, 0)).toFixed(1) + " L" + sx(0).toFixed(1) + " " + sy(Math.max(lo, 0)).toFixed(1) + " Z";
        el("path", { d: area, "class": "wash", style: "fill: var(--s-" + s.id + ")" }, g);
      }
      var p = el("path", { d: d, "class": "line", style: "stroke: var(--s-" + s.id + ")" }, g);
      if (s.id === "portfolio") portfolioPath = p;
    });

    // end dots and labels with leader lines when they would collide
    var ends = shown.map(function (s) { return { s: s, y: sy(s.values[last]), ly: sy(s.values[last]) }; });
    ends.sort(function (a, b) { return a.y - b.y; });
    var gap = 17;
    for (var k = 1; k < ends.length; k++) {
      if (ends[k].ly - ends[k - 1].ly < gap) ends[k].ly = ends[k - 1].ly + gap;
    }
    var overflow = ends.length ? ends[ends.length - 1].ly - (y0 - 4) : 0;
    if (overflow > 0) ends.forEach(function (e) { e.ly -= overflow; });
    var labels = el("g", null, svg);
    ends.forEach(function (e) {
      var ex = sx(last);
      var lx = ex + (L.narrow ? 10 : 16);
      if (Math.abs(e.ly - e.y) > 2) {
        el("path", { d: "M" + (ex + 5) + " " + e.y + " L" + (lx - 4) + " " + e.ly, "class": "leader" }, labels);
      }
      el("circle", { cx: ex, cy: e.y, r: 4, "class": "end-dot", style: "fill: var(--s-" + e.s.id + ")" }, labels);
      var t = el("text", { x: lx, y: e.ly + 4, "class": "end-label" }, labels);
      var v = el("tspan", { "class": "v" }, t);
      v.textContent = fmtPct(e.s.values[last]);
      if (!L.narrow) {
        var nm = el("tspan", { dx: 6 }, t);
        nm.textContent = e.s.short;
      }
    });

    // hover layer
    this.hoverLayer = el("g", { "class": "hover" }, svg);
    this.root.insertBefore(svg, this.tooltip);
    this.svg = svg;

    if (first && this.animate && portfolioPath && portfolioPath.getTotalLength) {
      var len = Math.ceil(portfolioPath.getTotalLength());
      portfolioPath.style.setProperty("--len", len);
      portfolioPath.classList.add("draw-in");
    }
    if (this.hoverIndex != null) this.showAt(this.hoverIndex);
  };

  Chart.prototype.showAt = function (i) {
    var g = this.geo;
    if (!g) return;
    i = Math.max(0, Math.min(g.n - 1, i));
    this.hoverIndex = i;
    var layer = this.hoverLayer;
    while (layer.firstChild) layer.removeChild(layer.firstChild);
    var x = Math.round(g.sx(i)) + 0.5;
    el("line", { x1: x, x2: x, y1: g.y1, y2: g.y0, "class": "crosshair" }, layer);
    var rows = this.shown.slice().sort(function (a, b) { return b.values[i] - a.values[i]; });
    rows.forEach(function (s) {
      el("circle", { cx: g.sx(i), cy: g.sy(s.values[i]), r: 4.5, "class": "hover-dot", style: "fill: var(--s-" + s.id + ")" }, layer);
    });

    var tip = this.tooltip;
    while (tip.firstChild) tip.removeChild(tip.firstChild);
    var date = document.createElement("div");
    date.className = "t-date";
    date.textContent = "Month end, " + monthLabel(DATA.months[i]);
    tip.appendChild(date);
    rows.forEach(function (s) {
      var row = document.createElement("div");
      row.className = "t-row";
      var key = document.createElement("i");
      key.className = "key key-" + s.id;
      var val = document.createElement("b");
      val.textContent = fmtPct(s.values[i]);
      var name = document.createElement("span");
      name.textContent = s.short;
      row.appendChild(key); row.appendChild(val); row.appendChild(name);
      tip.appendChild(row);
    });
    tip.classList.add("is-on");
    var box = this.root.getBoundingClientRect();
    var svgBox = this.svg.getBoundingClientRect();
    var scale = svgBox.width / parseFloat(this.svg.getAttribute("width"));
    var px = (g.sx(i) * scale) + (svgBox.left - box.left);
    var tw = tip.offsetWidth;
    var left = px + 14;
    if (left + tw > box.width) left = px - tw - 14;
    tip.style.transform = "translate(" + Math.max(0, left) + "px, " + (g.y1 * scale + 4) + "px)";
  };

  Chart.prototype.hide = function () {
    this.hoverIndex = null;
    this.tooltip.classList.remove("is-on");
    if (this.hoverLayer) while (this.hoverLayer.firstChild) this.hoverLayer.removeChild(this.hoverLayer.firstChild);
  };

  Chart.prototype.bind = function () {
    var self = this;
    this.root.addEventListener("pointermove", function (ev) {
      if (!self.svg) return;
      var r = self.svg.getBoundingClientRect();
      var scale = r.width / parseFloat(self.svg.getAttribute("width"));
      var x = (ev.clientX - r.left) / scale;
      var g = self.geo;
      var i = Math.round((x - g.x0) / (g.x1 - g.x0) * (g.n - 1));
      self.showAt(i);
    });
    this.root.addEventListener("pointerleave", function () { self.hide(); });
    this.root.addEventListener("focus", function () { self.showAt(self.hoverIndex == null ? DATA.months.length - 1 : self.hoverIndex); });
    this.root.addEventListener("blur", function () { self.hide(); });
    this.root.addEventListener("keydown", function (ev) {
      var i = self.hoverIndex == null ? DATA.months.length - 1 : self.hoverIndex;
      if (ev.key === "ArrowLeft") { self.showAt(i - 1); ev.preventDefault(); }
      else if (ev.key === "ArrowRight") { self.showAt(i + 1); ev.preventDefault(); }
      else if (ev.key === "Home") { self.showAt(0); ev.preventDefault(); }
      else if (ev.key === "End") { self.showAt(DATA.months.length - 1); ev.preventDefault(); }
      else if (ev.key === "Escape") { self.hide(); }
    });
  };

  function buildTable(target, ids) {
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var hr = document.createElement("tr");
    var th0 = document.createElement("th");
    th0.textContent = "Month end";
    hr.appendChild(th0);
    ids.forEach(function (id) {
      var th = document.createElement("th");
      th.className = "r";
      th.textContent = seriesById(id).short;
      hr.appendChild(th);
    });
    thead.appendChild(hr);
    table.appendChild(thead);
    var tb = document.createElement("tbody");
    for (var i = DATA.months.length - 1; i >= 0; i--) {
      var tr = document.createElement("tr");
      var td0 = document.createElement("td");
      td0.textContent = monthLabel(DATA.months[i]);
      tr.appendChild(td0);
      ids.forEach(function (id) {
        var td = document.createElement("td");
        td.className = "r";
        td.textContent = fmtPct(seriesById(id).values[i]);
        tr.appendChild(td);
      });
      tb.appendChild(tr);
    }
    table.appendChild(tb);
    target.appendChild(table);
  }

  function init() {
    var charts = [];
    document.querySelectorAll("[data-chart]").forEach(function (node) { charts.push(new Chart(node)); });
    document.querySelectorAll("[data-table-for]").forEach(function (node) {
      buildTable(node, node.getAttribute("data-series").split(","));
    });
    document.querySelectorAll("[data-toggles-for]").forEach(function (group) {
      var target = document.getElementById(group.getAttribute("data-toggles-for"));
      var chart = null;
      charts.forEach(function (c) { if (c.root === target) chart = c; });
      if (!chart) return;
      group.addEventListener("change", function () {
        var ids = ["portfolio"];
        group.querySelectorAll("input[type=checkbox]").forEach(function (cb) { if (cb.checked) ids.push(cb.value); });
        chart.setVisible(ids);
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
