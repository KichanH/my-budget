(function () {
  "use strict";

  var COLORS = {
    ink: "#22252A", inkSoft: "#6B6E66", gold: "#B9902E",
    expense: "#B4432A", income: "#2F6B4F", rule: "#E1DFD3"
  };

  /* ============================ 아이콘 ============================ */
  var ICON_PATHS = {
    cafe: '<path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z"/><path d="M17 9h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M7 3c-.5.8-.5 1.4 0 2m4-2c-.5.8-.5 1.4 0 2"/>',
    food: '<path d="M6 2v6a1.5 1.5 0 0 0 3 0V2"/><path d="M7.5 8v14"/><path d="M17 2c-2 2-2 5-2 7 0 1.2.8 2 2 2v11"/>',
    transport: '<path d="M4 16V11l2-5h12l2 5v5"/><path d="M4 16h16"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>',
    shopping: '<path d="M6 8h12l1 12H5L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    culture: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M17 9h4M3 15h4M17 15h4"/>',
    health: '<path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M6 3H4m8 0h-2"/><circle cx="18" cy="15" r="3"/><path d="M14 9v1a4 4 0 0 0 4 4"/>',
    bills: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    housing: '<path d="M4 11 12 4l8 7"/><path d="M6 10v10h12V10"/>',
    etc: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5c0-1 1-2 2.5-2s2.5.8 2.5 2c0 2.5-5 1.5-5 4 0 1.2 1 2 2.5 2s2.5-1 2.5-2"/>',
    income: '<path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v3"/><path d="M3 7v10a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H8"/><circle cx="16" cy="14" r="1.3"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    chevronLeft: '<path d="M15 6l-6 6 6 6"/>',
    chevronRight: '<path d="M9 6l6 6-6 6"/>',
    trash: '<path d="M4 7h16"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/>',
    repeat: '<path d="M17 3 21 7l-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 21 3 17l4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
    barchart: '<path d="M4 20V10M12 20V4M20 20v-7"/>',
    landmark: '<path d="M4 10h16M5 10v9M9 10v9M15 10v9M19 10v9M3 21h18M12 3 3 8h18Z"/>',
    check: '<path d="M5 13l4 4L19 7"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    home: '<path d="M4 11 12 4l8 7"/><path d="M6 10v10h12V10"/>'
  };

  function icon(name, opts) {
    opts = opts || {};
    var size = opts.size || 18;
    var color = opts.color || "currentColor";
    var sw = opts.strokeWidth || 2;
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", color);
    svg.setAttribute("stroke-width", sw);
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.style.flexShrink = "0";
    svg.innerHTML = ICON_PATHS[name] || "";
    return svg;
  }

  /* ============================ DOM 헬퍼 ============================ */
  function h(tag, props) {
    var e = document.createElement(tag);
    props = props || {};
    for (var k in props) {
      var v = props[k];
      if (v === undefined || v === null || v === false) continue;
      if (k === "class") e.className = v;
      else if (k === "style") { for (var sk in v) e.style[sk] = v[sk]; }
      else if (k.indexOf("on") === 0 && typeof v === "function") e.addEventListener(k.slice(2).toLowerCase(), v);
      else e.setAttribute(k, v);
    }
    for (var i = 2; i < arguments.length; i++) appendChild(e, arguments[i]);
    return e;
  }
  function appendChild(e, c) {
    if (c === null || c === undefined || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { appendChild(e, x); }); return; }
    if (typeof c === "string" || typeof c === "number") e.appendChild(document.createTextNode(String(c)));
    else e.appendChild(c);
  }
  function clearEl(el) { while (el.firstChild) el.removeChild(el.firstChild); }
  function mount(el) {
    clearEl(el);
    for (var i = 1; i < arguments.length; i++) appendChild(el, arguments[i]);
  }

  /* ============================ 카테고리 ============================ */
  var CATEGORIES = [
    { id: "cafe", label: "카페", icon: "cafe", kw: ["커피", "카페", "스타벅스", "스벅", "아메리카노", "라떼", "투썸", "이디야", "커피빈"] },
    { id: "food", label: "식비", icon: "food", kw: ["밥", "점심", "저녁", "아침", "식당", "배달", "치킨", "피자", "국밥", "분식", "편의점", "마트", "장보기", "떡볶이", "김밥"] },
    { id: "transport", label: "교통", icon: "transport", kw: ["버스", "지하철", "택시", "기름", "주유", "대중교통", "카카오택시", "지하철비"] },
    { id: "shopping", label: "쇼핑", icon: "shopping", kw: ["옷", "신발", "쇼핑", "올리브영", "다이소", "쿠팡", "옥션", "지마켓", "화장품"] },
    { id: "culture", label: "문화/여가", icon: "culture", kw: ["영화", "넷플릭스", "유튜브", "프리미엄", "게임", "콘서트", "공연", "전시", "구독"] },
    { id: "health", label: "의료", icon: "health", kw: ["병원", "약국", "약", "치과", "피부과"] },
    { id: "bills", label: "통신/공과금", icon: "bills", kw: ["통신비", "휴대폰", "폰값", "인터넷", "전기세", "가스비", "수도세", "관리비"] },
    { id: "housing", label: "주거", icon: "housing", kw: ["월세", "전세", "대출이자", "이자"] },
    { id: "etc", label: "기타", icon: "etc", kw: [] }
  ];
  var INCOME_CAT = { id: "income", label: "수입", icon: "income" };
  function catById(id) {
    if (id === "income") return INCOME_CAT;
    for (var i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].id === id) return CATEGORIES[i];
    return CATEGORIES[CATEGORIES.length - 1];
  }

  /* ============================ 날짜 유틸 ============================ */
  function pad2(n) { return String(n).padStart(2, "0"); }
  function ymd(d) { return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate()); }
  function todayStr() { return ymd(new Date()); }
  function yesterdayStr() { var d = new Date(); d.setDate(d.getDate() - 1); return ymd(d); }
  function monthLabel(ym) { var parts = ym.split("-"); return parts[0] + "년 " + parseInt(parts[1], 10) + "월"; }
  function shiftMonth(ym, delta) {
    var parts = ym.split("-").map(Number);
    var d = new Date(parts[0], parts[1] - 1 + delta, 1);
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1);
  }
  function addMonthsToDate(dateStr, n) {
    var p = dateStr.split("-").map(Number);
    return ymd(new Date(p[0], p[1] - 1 + n, p[2]));
  }
  function nextDateForDay(dayNum) {
    var now = new Date();
    var d = new Date(now.getFullYear(), now.getMonth(), dayNum);
    if (ymd(d) < ymd(now)) d = new Date(now.getFullYear(), now.getMonth() + 1, dayNum);
    return ymd(d);
  }
  function uid() { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36); }

  /* ============================ 파서 ============================ */
  function parseAmount(raw) {
    var t = raw.replace(/,/g, "");
    var m = t.match(/(\d+)\s*만\s*(\d+)?\s*(천)?\s*원?/);
    if (m) {
      var val = parseInt(m[1], 10) * 10000;
      if (m[2]) val += m[3] ? parseInt(m[2], 10) * 1000 : parseInt(m[2], 10);
      return val;
    }
    m = t.match(/(\d+)\s*천\s*원?/);
    if (m) return parseInt(m[1], 10) * 1000;
    m = t.match(/(\d+)\s*원/);
    if (m) return parseInt(m[1], 10);
    m = t.match(/(\d+)/);
    if (m) return parseInt(m[1], 10);
    return null;
  }
  function guessCategory(text) {
    if (!text) return null;
    for (var i = 0; i < CATEGORIES.length; i++) {
      var c = CATEGORIES[i];
      for (var j = 0; j < c.kw.length; j++) if (text.indexOf(c.kw[j]) !== -1) return c.id;
    }
    return null;
  }
  function won(n, signed) {
    var v = Math.round(n || 0);
    var sign = signed ? (v > 0 ? "+" : v < 0 ? "-" : "") : "";
    return sign + "₩" + Math.abs(v).toLocaleString("ko-KR");
  }

  /* ============================ 저장소 (localStorage) ============================ */
  var STORAGE_KEY = "household-ledger-v1";
  function defaultState() {
    return { transactions: [], assets: [{ id: uid(), name: "지갑", balance: 0 }], recurring: [], budgets: {} };
  }
  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      var parsed = JSON.parse(raw);
      var base = defaultState();
      return {
        transactions: parsed.transactions || base.transactions,
        assets: (parsed.assets && parsed.assets.length) ? parsed.assets : base.assets,
        recurring: parsed.recurring || base.recurring,
        budgets: parsed.budgets || base.budgets
      };
    } catch (e) {
      console.error("가계부 데이터를 불러오지 못했습니다", e);
      return defaultState();
    }
  }
  var saveTimer = null;
  function saveState() {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
      catch (e) { console.error("저장 실패 (저장 공간이 가득 찼을 수 있어요)", e); }
    }, 200);
  }

  /* ============================ 반복내역 자동처리 ============================ */
  function processRecurring(s) {
    var changed = false;
    var newTx = s.transactions.slice();
    var newAssets = s.assets.map(function (a) { return Object.assign({}, a); });
    var today = todayStr();
    var updatedRecurring = s.recurring.map(function (r) {
      if (!r.active) return r;
      var next = r.nextDate;
      var guard = 0;
      var item = Object.assign({}, r);
      while (next <= today && guard < 36) {
        var tx = { id: uid(), type: item.type, amount: item.amount, category: item.category, memo: item.name, date: next, assetId: item.assetId || null, auto: true };
        newTx.push(tx);
        if (tx.assetId) {
          var a = newAssets.find(function (x) { return x.id === tx.assetId; });
          if (a) a.balance += tx.type === "income" ? tx.amount : -tx.amount;
        }
        next = addMonthsToDate(next, 1);
        changed = true;
        guard++;
      }
      item.nextDate = next;
      return item;
    });
    if (!changed) return s;
    return { transactions: newTx, assets: newAssets, recurring: updatedRecurring, budgets: s.budgets };
  }

  /* ============================ 전역 상태 ============================ */
  var state = loadState();
  var ui = { tab: "home", month: todayStr().slice(0, 7), sheet: null, analyticsPeriod: 3 };

  function commit(mutator) {
    var next = mutator(state);
    if (next) state = next;
    saveState();
    renderApp();
  }
  function setUI(patch) { Object.assign(ui, patch); renderApp(); }
  function recomputeRecurring() {
    var next = processRecurring(state);
    if (next !== state) { state = next; saveState(); renderApp(); }
  }

  /* ============================ 공용 UI 조각 ============================ */
  function sectionCard() {
    var el = h("div", { class: "section-card" });
    for (var i = 0; i < arguments.length; i++) appendChild(el, arguments[i]);
    return el;
  }
  function emptyRow(text, cta, onClick) {
    return h("div", { class: "empty" },
      h("div", { class: "empty-text" }, text),
      cta ? h("button", { class: "empty-cta", onclick: onClick }, cta) : null
    );
  }
  function categoryBadge(catId) {
    var c = catById(catId);
    var isIncome = catId === "income";
    return h("div", { class: "badge " + (isIncome ? "income" : "expense") },
      icon(c.icon, { size: 17, color: isIncome ? COLORS.income : COLORS.ink }));
  }

  /* ============================ 거래 내역 행 ============================ */
  function txRow(tx, isLast, onEdit, onDelete) {
    var delBtn = h("button", { class: "trash-btn" }, icon("trash", { size: 14, color: COLORS.inkSoft }));
    delBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (delBtn.dataset.confirm === "1") { onDelete(tx.id); }
      else { delBtn.dataset.confirm = "1"; mount(delBtn, h("span", { class: "confirm-btn" }, "삭제확인")); }
    });
    var row = h("div", { class: "row", onclick: function () { onEdit(tx); } },
      categoryBadge(tx.category),
      h("div", { class: "row-main" },
        h("div", { class: "row-title truncate" }, tx.memo),
        h("div", { class: "row-sub" }, tx.date.slice(5).replace("-", "/") + (tx.auto ? " · 자동" : ""))
      ),
      h("div", { class: "row-amount tabular " + tx.type }, (tx.type === "income" ? "+" : "-") + won(tx.amount)),
      delBtn
    );
    if (isLast) row.style.borderBottom = "none";
    return row;
  }

  /* ============================ 홈 탭 ============================ */
  function homeView(container) {
    var monthTx = state.transactions
      .filter(function (t) { return t.date.indexOf(ui.month) === 0; })
      .sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    var income = monthTx.filter(function (t) { return t.type === "income"; }).reduce(function (s, t) { return s + t.amount; }, 0);
    var expense = monthTx.filter(function (t) { return t.type === "expense"; }).reduce(function (s, t) { return s + t.amount; }, 0);
    var net = income - expense;

    var hero = h("div", { class: "hero" },
      h("div", { class: "hero-label" }, "이번 달 순지출"),
      h("div", { class: "hero-amount tabular" }, won(expense)),
      h("div", { class: "hero-sub tabular" },
        "수입 ", h("span", { class: "pos" }, won(income)),
        "   ·   순액 ", h("span", { class: net >= 0 ? "pos" : "neg" }, won(net, true))
      )
    );

    var listCard = sectionCard(
      h("div", { class: "section-head" },
        h("div", { class: "section-title" }, "거래 내역"),
        h("button", { class: "link-btn", onclick: function () { openTxSheet(null); } }, "직접 추가")
      )
    );
    if (monthTx.length === 0) {
      listCard.appendChild(emptyRow("이번 달 거래 내역이 없어요"));
    } else {
      monthTx.forEach(function (t, i) {
        listCard.appendChild(txRow(t, i === monthTx.length - 1, function (tx) { openTxSheet(tx); }, deleteTransaction));
      });
    }
    mount(container, hero, listCard);
  }

  function commitTransaction(tx) {
    commit(function (s) {
      var assets = s.assets.map(function (a) { return Object.assign({}, a); });
      if (tx.assetId) {
        var a = assets.find(function (x) { return x.id === tx.assetId; });
        if (a) a.balance += tx.type === "income" ? tx.amount : -tx.amount;
      }
      return Object.assign({}, s, { transactions: [tx].concat(s.transactions), assets: assets });
    });
  }
  function updateTransaction(oldTx, newTx) {
    commit(function (s) {
      var assets = s.assets.map(function (a) { return Object.assign({}, a); });
      // 기존 자산 영향 되돌리기
      if (oldTx.assetId) {
        var oa = assets.find(function (x) { return x.id === oldTx.assetId; });
        if (oa) oa.balance -= oldTx.type === "income" ? oldTx.amount : -oldTx.amount;
      }
      // 새 자산 영향 반영
      if (newTx.assetId) {
        var na = assets.find(function (x) { return x.id === newTx.assetId; });
        if (na) na.balance += newTx.type === "income" ? newTx.amount : -newTx.amount;
      }
      var transactions = s.transactions.map(function (t) { return t.id === oldTx.id ? newTx : t; });
      return Object.assign({}, s, { transactions: transactions, assets: assets });
    });
  }
  function deleteTransaction(id) {
    commit(function (s) {
      var tx = s.transactions.find(function (t) { return t.id === id; });
      var assets = s.assets.map(function (a) { return Object.assign({}, a); });
      if (tx && tx.assetId) {
        var a = assets.find(function (x) { return x.id === tx.assetId; });
        if (a) a.balance -= tx.type === "income" ? tx.amount : -tx.amount;
      }
      return Object.assign({}, s, { transactions: s.transactions.filter(function (t) { return t.id !== id; }), assets: assets });
    });
  }

  /* ============================ 자산 탭 ============================ */
  function assetsView(container) {
    var total = state.assets.reduce(function (s, a) { return s + a.balance; }, 0);
    var top = h("div", { class: "total-line" },
      h("div", { class: "total-label" }, "총 자산"),
      h("div", { class: "total-amount tabular" }, won(total))
    );
    var card = sectionCard(
      h("div", { class: "section-head" },
        h("div", { class: "section-title" }, "내 자산"),
        h("button", { class: "link-btn", onclick: function () { openAssetSheet(null); } }, "+ 추가")
      )
    );
    if (state.assets.length === 0) {
      card.appendChild(emptyRow("등록된 자산이 없어요", "자산 추가", function () { openAssetSheet(null); }));
    } else {
      state.assets.forEach(function (a, i) {
        var delBtn = h("button", { class: "trash-btn" }, icon("trash", { size: 14, color: COLORS.inkSoft }));
        delBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          if (delBtn.dataset.confirm === "1") { deleteAsset(a.id); }
          else { delBtn.dataset.confirm = "1"; mount(delBtn, h("span", { class: "confirm-btn" }, "삭제확인")); }
        });
        var row = h("div", { class: "row", onclick: function () { openAssetSheet(a); } },
          h("div", { class: "badge expense" }, icon("landmark", { size: 17, color: COLORS.ink })),
          h("div", { class: "row-main" }, h("div", { class: "row-title truncate" }, a.name)),
          h("div", { class: "row-amount tabular", style: { color: a.balance < 0 ? COLORS.expense : COLORS.ink } }, won(a.balance)),
          delBtn
        );
        if (i === state.assets.length - 1) row.style.borderBottom = "none";
        card.appendChild(row);
      });
    }
    mount(container, top, card);
  }
  function saveAsset(asset, isNew) {
    commit(function (s) {
      var assets;
      if (isNew) assets = s.assets.concat([asset]);
      else assets = s.assets.map(function (a) { return a.id === asset.id ? asset : a; });
      return Object.assign({}, s, { assets: assets });
    });
  }
  function deleteAsset(id) {
    commit(function (s) { return Object.assign({}, s, { assets: s.assets.filter(function (a) { return a.id !== id; }) }); });
  }

  /* ============================ 반복 탭 ============================ */
  function recurringView(container) {
    var head = h("div", { class: "list-head" },
      h("div", { class: "title" }, "반복 결제·수입"),
      h("button", { class: "add-btn", onclick: function () { openRecurringSheet(null); } }, icon("plus", { size: 13, color: "#fff" }), "추가")
    );
    var card = sectionCard();
    if (state.recurring.length === 0) {
      card.appendChild(emptyRow("구독, 월급처럼 매달 반복되는 항목을 등록해보세요", "반복 항목 추가", function () { openRecurringSheet(null); }));
    } else {
      state.recurring.forEach(function (r, i) {
        var delBtn = h("button", { class: "trash-btn" }, icon("trash", { size: 14, color: COLORS.inkSoft }));
        delBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          if (delBtn.dataset.confirm === "1") { deleteRecurring(r.id); }
          else { delBtn.dataset.confirm = "1"; mount(delBtn, h("span", { class: "confirm-btn" }, "삭제확인")); }
        });
        var toggleBtn = h("button", { class: "toggle-btn " + (r.active ? "on" : "off") }, icon("check", { size: 13, color: r.active ? COLORS.income : COLORS.inkSoft }));
        toggleBtn.addEventListener("click", function (e) { e.stopPropagation(); toggleRecurring(r.id); });
        var row = h("div", { class: "row" + (r.active ? "" : " dim"), onclick: function () { openRecurringSheet(r); } },
          categoryBadge(r.category),
          h("div", { class: "row-main" },
            h("div", { class: "row-title truncate" }, r.name),
            h("div", { class: "row-sub" }, "매월 " + r.day + "일 · 다음 " + r.nextDate)
          ),
          h("div", { class: "row-amount tabular " + r.type }, (r.type === "income" ? "+" : "-") + won(r.amount)),
          toggleBtn, delBtn
        );
        if (i === state.recurring.length - 1) row.style.borderBottom = "none";
        card.appendChild(row);
      });
    }
    mount(container, head, card);
  }
  function saveRecurring(item, isNew) {
    commit(function (s) {
      var recurring;
      if (isNew) recurring = s.recurring.concat([item]);
      else recurring = s.recurring.map(function (r) { return r.id === item.id ? item : r; });
      return Object.assign({}, s, { recurring: recurring });
    });
  }
  function toggleRecurring(id) {
    commit(function (s) { return Object.assign({}, s, { recurring: s.recurring.map(function (r) { return r.id === id ? Object.assign({}, r, { active: !r.active }) : r; }) }); });
  }
  function deleteRecurring(id) {
    commit(function (s) { return Object.assign({}, s, { recurring: s.recurring.filter(function (r) { return r.id !== id; }) }); });
  }

  /* ============================ 예산 탭 ============================ */
  function budgetView(container) {
    var monthTx = state.transactions.filter(function (t) { return t.date.indexOf(ui.month) === 0 && t.type === "expense"; });
    var spentByCat = {};
    monthTx.forEach(function (t) { spentByCat[t.category] = (spentByCat[t.category] || 0) + t.amount; });

    var intro = h("div", { class: "hero" },
      h("div", { class: "hero-label" }, "이번 달 예산") ,
      h("div", { class: "hero-sub" }, "카테고리별 한 달 예산을 정해두면 얼마나 썼는지 한눈에 볼 수 있어요.")
    );

    var card = sectionCard(h("div", { class: "section-head" }, h("div", { class: "section-title" }, "카테고리별 예산 설정")));
    CATEGORIES.forEach(function (c, i) {
      var spent = spentByCat[c.id] || 0;
      var budget = state.budgets[c.id] || 0;
      var pct = budget > 0 ? Math.min(100, (spent / budget) * 100) : 0;
      var over = budget > 0 && spent > budget;
      var barColor = over ? COLORS.expense : (pct > 80 ? COLORS.gold : COLORS.income);

      var input = h("input", { class: "budget-input", type: "number", inputmode: "numeric", placeholder: "0", value: budget || "" });
      input.addEventListener("change", function () {
        var n = parseFloat(input.value);
        commit(function (s) {
          var budgets = Object.assign({}, s.budgets);
          if (!n || n <= 0) delete budgets[c.id]; else budgets[c.id] = n;
          return Object.assign({}, s, { budgets: budgets });
        });
      });

      var row = h("div", { class: "budget-row" },
        categoryBadge(c.id),
        h("div", { class: "budget-info" },
          h("div", { class: "budget-summary" },
            h("div", { class: "budget-cat-name" }, c.label),
            over ? h("span", { class: "over-tag" }, "초과") : null
          ),
          budget > 0 ? h("div", { class: "progress-track" }, h("div", { class: "progress-fill", style: { width: pct + "%", background: barColor } })) : null,
          h("div", { class: "budget-spent tabular" }, budget > 0 ? (won(spent) + " / " + won(budget)) : (spent > 0 ? (won(spent) + " 지출") : "지출 없음"))
        ),
        h("div", { class: "budget-input-wrap" }, input, h("span", { class: "budget-unit" }, "원"))
      );
      if (i === CATEGORIES.length - 1) row.style.borderBottom = "none";
      card.appendChild(row);
    });
    mount(container, intro, card);
  }

  /* ============================ 분석 탭 ============================ */
  function periodBars(prev, curr, color) {
    var max = Math.max(prev, curr, 1);
    var prevH = Math.max(6, (prev / max) * 84);
    var currH = Math.max(6, (curr / max) * 84);
    return h("div", { class: "bars" },
      h("div", { class: "bar", style: { height: prevH + "px", background: "var(--rule)" } }),
      h("div", { class: "bar", style: { height: currH + "px", background: color } })
    );
  }
  function statCard(label, amount, pct, color, prev, curr) {
    var pctColor = pct > 0 ? COLORS.income : pct < 0 ? COLORS.expense : COLORS.inkSoft;
    var sign = pct > 0 ? "+" : "";
    return sectionCard(
      h("div", { class: "stat-top" },
        h("div", {},
          h("div", { class: "stat-label" }, label),
          h("div", { class: "stat-row" },
            h("div", { class: "stat-amount tabular" }, won(amount)),
            h("div", { class: "stat-pct tabular", style: { color: pctColor } }, sign + pct.toFixed(1) + "%")
          )
        ),
        periodBars(prev, curr, color)
      )
    );
  }
  function analyticsView(container) {
    var period = ui.analyticsPeriod;
    var nowMonth = todayStr().slice(0, 7);
    var startMonth = shiftMonth(nowMonth, -(period - 1));
    var prevEndMonth = shiftMonth(startMonth, -1);
    var prevStartMonth = shiftMonth(prevEndMonth, -(period - 1));

    function inRange(t, s, e) { var ym = t.date.slice(0, 7); return ym >= s && ym <= e; }
    var currTx = state.transactions.filter(function (t) { return inRange(t, startMonth, nowMonth); });
    var prevTx = state.transactions.filter(function (t) { return inRange(t, prevStartMonth, prevEndMonth); });
    function sum(arr, type) { return arr.filter(function (t) { return t.type === type; }).reduce(function (s, t) { return s + t.amount; }, 0); }
    var currExpense = sum(currTx, "expense"), prevExpense = sum(prevTx, "expense");
    var currIncome = sum(currTx, "income"), prevIncome = sum(prevTx, "income");
    function pct(curr, prev) { return prev === 0 ? (curr > 0 ? 100 : 0) : ((curr - prev) / Math.abs(prev)) * 100; }

    var sy = startMonth.split("-")[0], sm = startMonth.split("-")[1];
    var ey = nowMonth.split("-")[0], em = nowMonth.split("-")[1];
    var rangeLabel = sy === ey ? (sy + "년 " + parseInt(sm, 10) + "월 - " + parseInt(em, 10) + "월") : (sy + "년 " + parseInt(sm, 10) + "월 - " + ey + "년 " + parseInt(em, 10) + "월");

    var byCat = {};
    currTx.filter(function (t) { return t.type === "expense"; }).forEach(function (t) { byCat[t.category] = (byCat[t.category] || 0) + t.amount; });
    var byCatArr = Object.keys(byCat).map(function (k) { return [k, byCat[k]]; }).sort(function (a, b) { return b[1] - a[1]; });
    var maxCat = byCatArr.length ? byCatArr[0][1] : 1;

    var toggle = h("div", { class: "period-toggle" });
    [3, 6, 12].forEach(function (n) {
      toggle.appendChild(h("button", { class: period === n ? "active" : "", onclick: function () { setUI({ analyticsPeriod: n }); } }, n + "개월"));
    });

    var frag = document.createDocumentFragment();
    frag.appendChild(toggle);
    frag.appendChild(h("div", { class: "range-label" }, rangeLabel));
    frag.appendChild(statCard("지출 금액", currExpense, pct(currExpense, prevExpense), COLORS.expense, prevExpense, currExpense));
    frag.appendChild(statCard("수입 금액", currIncome, pct(currIncome, prevIncome), COLORS.income, prevIncome, currIncome));

    var catCard = sectionCard(h("div", { class: "section-title", style: { marginBottom: "12px" } }, "지출 카테고리"));
    if (byCatArr.length === 0) {
      catCard.appendChild(emptyRow("지출 내역이 없어요"));
    } else {
      byCatArr.forEach(function (entry) {
        var c = catById(entry[0]);
        var amt = entry[1];
        var budget = state.budgets[entry[0]] || 0;
        var block = h("div", { class: "cat-block" },
          h("div", { class: "cat-top" }, h("div", { class: "cat-name" }, c.label), h("div", { class: "cat-amt tabular" }, won(amt)), (budget > 0 && amt > budget) ? h("span", { class: "over-tag" }, "예산초과") : null),
          h("div", { class: "progress-track" }, h("div", { class: "progress-fill", style: { width: ((amt / maxCat) * 100) + "%", background: "var(--gold)" } }))
        );
        catCard.appendChild(block);
      });
    }
    frag.appendChild(catCard);
    mount(container, frag);
  }

  /* ============================ 빠른 기록 바 ============================ */
  var qa = { type: "expense", memo: "", amount: 0, category: "etc", manualCat: false, date: todayStr(), expanded: false, manualText: "", showDateInput: false };
  var qaEl = null;

  function qaSyncCategory() {
    if (qa.type === "income") { qa.category = "income"; return; }
    if (qa.manualCat) return;
    qa.category = guessCategory(qa.memo) || "etc";
  }

  function renderQuickAdd() {
    if (!qaEl) return;
    clearEl(qaEl);
    if (qa.expanded) {
      var expandWrap = h("div", { class: "qa-expand" });
      if (qa.type === "expense") {
        var catsRow = h("div", { class: "qa-cats" });
        CATEGORIES.forEach(function (c) {
          var pill = h("button", { class: "qa-cat-pill" + (qa.category === c.id ? " active" : "") },
            icon(c.icon, { size: 12, color: qa.category === c.id ? "#fff" : COLORS.ink }), " " + c.label);
          pill.addEventListener("click", function () { qa.category = c.id; qa.manualCat = true; renderQuickAdd(); });
          catsRow.appendChild(pill);
        });
        expandWrap.appendChild(catsRow);
      }
      var dateRow = h("div", { class: "qa-date-row" });
      var todayBtn = h("button", { class: "qa-date-pill" + (qa.date === todayStr() && !qa.showDateInput ? " active" : "") }, "오늘");
      todayBtn.addEventListener("click", function () { qa.date = todayStr(); qa.showDateInput = false; renderQuickAdd(); });
      var yestBtn = h("button", { class: "qa-date-pill" + (qa.date === yesterdayStr() && !qa.showDateInput ? " active" : "") }, "어제");
      yestBtn.addEventListener("click", function () { qa.date = yesterdayStr(); qa.showDateInput = false; renderQuickAdd(); });
      var pickBtn = h("button", { class: "qa-date-pill" + (qa.showDateInput ? " active" : "") }, "날짜 선택");
      pickBtn.addEventListener("click", function () { qa.showDateInput = !qa.showDateInput; renderQuickAdd(); });
      dateRow.appendChild(todayBtn); dateRow.appendChild(yestBtn); dateRow.appendChild(pickBtn);
      if (qa.showDateInput) {
        var dInput = h("input", { class: "qa-date-input", type: "date", value: qa.date });
        dInput.addEventListener("change", function () { qa.date = dInput.value; });
        dateRow.appendChild(dInput);
      }
      expandWrap.appendChild(dateRow);

      var amtDisplayRow = h("div", { class: "qa-amount-display-row" },
        h("div", { class: "qa-amount-display tabular " + qa.type, id: "qa-amount-text" }, won(qa.amount)),
      );
      var resetBtn = h("button", { class: "qa-reset" }, "초기화");
      resetBtn.addEventListener("click", function () { qa.amount = 0; qa.manualText = ""; renderQuickAdd(); });
      amtDisplayRow.appendChild(resetBtn);
      expandWrap.appendChild(amtDisplayRow);

      var chipGrid = h("div", { class: "qa-chip-grid" });
      [1000, 5000, 10000, 50000, 100000, 500000].forEach(function (n) {
        var chip = h("button", { class: "qa-chip" }, "+" + (n >= 10000 ? (n / 10000) + "만" : n.toLocaleString()));
        chip.addEventListener("click", function () {
          qa.amount += n;
          var disp = document.getElementById("qa-amount-text");
          if (disp) disp.textContent = won(qa.amount);
        });
        chipGrid.appendChild(chip);
      });
      expandWrap.appendChild(chipGrid);

      var manualInput = h("input", { class: "input", style: { padding: "8px 12px", fontSize: "13px" }, placeholder: "직접 입력 (예: 1만5천)", value: qa.manualText });
      manualInput.addEventListener("input", function () {
        qa.manualText = manualInput.value;
        var parsed = parseAmount(manualInput.value);
        if (parsed != null) {
          qa.amount = parsed;
          var disp = document.getElementById("qa-amount-text");
          if (disp) disp.textContent = won(qa.amount);
        }
      });
      expandWrap.appendChild(manualInput);
      qaEl.appendChild(expandWrap);
    }

    var typeToggle = h("div", { class: "qa-toggle" });
    ["expense", "income"].forEach(function (t) {
      var btn = h("button", { class: qa.type === t ? "active " + t : "" }, t === "income" ? "수입" : "지출");
      btn.addEventListener("click", function () { qa.type = t; qaSyncCategory(); renderQuickAdd(); });
      typeToggle.appendChild(btn);
    });

    var memoInput = h("input", { class: "qa-input", placeholder: "무엇에 썼나요?", value: qa.memo });
    memoInput.addEventListener("input", function () {
      qa.memo = memoInput.value;
      qaSyncCategory();
      var pills = qaEl.querySelectorAll(".qa-cat-pill");
      pills.forEach(function (p, i) {
        var c = CATEGORIES[i];
        if (!c) return;
        p.className = "qa-cat-pill" + (qa.category === c.id ? " active" : "");
      });
    });

    var amountToggleBtn = h("button", { class: "qa-amount-btn" }, qa.amount > 0 ? won(qa.amount) : "금액");
    amountToggleBtn.addEventListener("click", function () { qa.expanded = !qa.expanded; renderQuickAdd(); });

    var addBtn = h("button", { class: "qa-add-btn" + (qa.amount > 0 ? "" : " disabled") }, icon("plus", { size: 20, color: "#fff" }));
    addBtn.addEventListener("click", function () {
      if (qa.amount <= 0) return;
      commitTransaction({ id: uid(), type: qa.type, amount: qa.amount, category: qa.category, memo: qa.memo.trim() || catById(qa.category).label, date: qa.date, assetId: null });
      qa = { type: "expense", memo: "", amount: 0, category: "etc", manualCat: false, date: todayStr(), expanded: false, manualText: "", showDateInput: false };
      renderQuickAdd();
    });

    var row = h("div", { class: "qa-row" }, typeToggle, memoInput, amountToggleBtn, addBtn);
    qaEl.appendChild(row);
  }

  /* ============================ 시트(모달) ============================ */
  var sheetRootEl = null;

  function closeSheet() { ui.sheet = null; renderApp(); }

  function fieldWrap(label, child) { return h("div", { class: "field" }, h("div", { class: "field-label" }, label), child); }

  function openTxSheet(tx) {
    ui.sheet = {
      kind: "tx",
      isNew: !tx,
      form: tx ? Object.assign({}, tx) : { id: uid(), type: "expense", amount: "", category: "etc", memo: "", date: todayStr(), assetId: (state.assets[0] && state.assets[0].id) || "" },
      error: ""
    };
    renderApp();
  }
  function renderTxSheet() {
    var s = ui.sheet, f = s.form;
    var cats = f.type === "income" ? [INCOME_CAT] : CATEGORIES;

    var typeToggle = h("div", { class: "type-toggle" });
    ["expense", "income"].forEach(function (t) {
      var btn = h("button", { class: f.type === t ? "active " + t : "" }, t === "income" ? "수입" : "지출");
      btn.addEventListener("click", function () { f.type = t; f.category = t === "income" ? "income" : "etc"; refreshSheet(); });
      typeToggle.appendChild(btn);
    });

    var amountInput = h("input", { class: "input", type: "number", inputmode: "numeric", placeholder: "0", value: f.amount });
    amountInput.addEventListener("input", function () { f.amount = amountInput.value; });

    var memoInput = h("input", { class: "input", placeholder: "예: 스타벅스", value: f.memo });
    memoInput.addEventListener("input", function () { f.memo = memoInput.value; });

    var catGroup = h("div", { class: "pill-group" });
    cats.forEach(function (c) {
      var pill = h("button", { class: "pill" + (f.category === c.id ? " active" : "") }, icon(c.icon, { size: 13, color: f.category === c.id ? "#fff" : COLORS.ink }), " " + c.label);
      pill.addEventListener("click", function () { f.category = c.id; refreshSheet(); });
      catGroup.appendChild(pill);
    });

    var dateInput = h("input", { class: "input", type: "date", value: f.date });
    dateInput.addEventListener("change", function () { f.date = dateInput.value; });

    var assetSelect = h("select", { class: "input" }, h("option", { value: "" }, "선택 안 함"));
    state.assets.forEach(function (a) { assetSelect.appendChild(h("option", { value: a.id, selected: f.assetId === a.id ? "selected" : null }, a.name)); });
    assetSelect.value = f.assetId || "";
    assetSelect.addEventListener("change", function () { f.assetId = assetSelect.value; });

    var errorEl = s.error ? h("div", { class: "error-text" }, s.error) : null;

    var saveBtn = h("button", { class: "btn-primary" }, "저장");
    saveBtn.addEventListener("click", function () {
      var n = parseFloat(f.amount);
      if (!n || n <= 0) { s.error = "금액을 입력해주세요"; refreshSheet(); return; }
      if (!f.memo.trim()) { s.error = "내용을 입력해주세요"; refreshSheet(); return; }
      var newTx = { id: f.id, type: f.type, amount: n, category: f.category, memo: f.memo.trim(), date: f.date, assetId: f.assetId || null };
      if (s.isNew) commitTransaction(newTx);
      else updateTransaction(state.transactions.find(function (t) { return t.id === f.id; }), newTx);
      closeSheet();
    });

    var body = [
      typeToggle,
      fieldWrap("금액", amountInput),
      fieldWrap("내용", memoInput),
      fieldWrap("카테고리", catGroup),
      fieldWrap("날짜", dateInput),
      state.assets.length ? fieldWrap("자산 (선택)", assetSelect) : null,
      errorEl,
      saveBtn
    ];
    if (!s.isNew) {
      var delBtn = h("button", { class: "btn-danger" }, "이 거래 삭제");
      delBtn.addEventListener("click", function () {
        if (delBtn.dataset.confirm === "1") { deleteTransaction(f.id); closeSheet(); }
        else { delBtn.dataset.confirm = "1"; delBtn.textContent = "정말 삭제할까요? (한 번 더 탭)"; }
      });
      body.push(delBtn);
    }
    return sheetShell(s.isNew ? "거래 추가" : "거래 수정", body);
  }

  function openAssetSheet(asset) {
    ui.sheet = { kind: "asset", isNew: !asset, form: asset ? Object.assign({}, asset, { balance: String(asset.balance) }) : { id: uid(), name: "", balance: "" }, error: "" };
    renderApp();
  }
  function renderAssetSheet() {
    var s = ui.sheet, f = s.form;
    var nameInput = h("input", { class: "input", placeholder: "예: 우리은행 통장", value: f.name });
    nameInput.addEventListener("input", function () { f.name = nameInput.value; });
    var balInput = h("input", { class: "input", type: "number", inputmode: "numeric", placeholder: "0", value: f.balance });
    balInput.addEventListener("input", function () { f.balance = balInput.value; });
    var errorEl = s.error ? h("div", { class: "error-text" }, s.error) : null;
    var saveBtn = h("button", { class: "btn-primary" }, "저장");
    saveBtn.addEventListener("click", function () {
      if (!f.name.trim()) { s.error = "이름을 입력해주세요"; refreshSheet(); return; }
      saveAsset({ id: f.id, name: f.name.trim(), balance: parseFloat(f.balance) || 0 }, s.isNew);
      closeSheet();
    });
    var body = [fieldWrap("이름", nameInput), fieldWrap("현재 잔액", balInput), errorEl, saveBtn];
    if (!s.isNew) {
      var delBtn = h("button", { class: "btn-danger" }, "이 자산 삭제");
      delBtn.addEventListener("click", function () {
        if (delBtn.dataset.confirm === "1") { deleteAsset(f.id); closeSheet(); }
        else { delBtn.dataset.confirm = "1"; delBtn.textContent = "정말 삭제할까요? (한 번 더 탭)"; }
      });
      body.push(delBtn);
    }
    return sheetShell(s.isNew ? "자산 추가" : "자산 수정", body);
  }

  function openRecurringSheet(item) {
    ui.sheet = {
      kind: "recurring", isNew: !item,
      form: item ? Object.assign({}, item, { day: String(item.day) }) : { id: uid(), type: "expense", name: "", amount: "", category: "bills", day: "1", assetId: (state.assets[0] && state.assets[0].id) || "", active: true },
      error: ""
    };
    renderApp();
  }
  function renderRecurringSheet() {
    var s = ui.sheet, f = s.form;
    var cats = f.type === "income" ? [INCOME_CAT] : CATEGORIES;

    var typeToggle = h("div", { class: "type-toggle" });
    ["expense", "income"].forEach(function (t) {
      var btn = h("button", { class: f.type === t ? "active " + t : "" }, t === "income" ? "수입" : "지출");
      btn.addEventListener("click", function () { f.type = t; f.category = t === "income" ? "income" : "bills"; refreshSheet(); });
      typeToggle.appendChild(btn);
    });

    var nameInput = h("input", { class: "input", placeholder: "예: 유튜브 프리미엄", value: f.name });
    nameInput.addEventListener("input", function () { f.name = nameInput.value; });
    var amountInput = h("input", { class: "input", type: "number", inputmode: "numeric", placeholder: "0", value: f.amount });
    amountInput.addEventListener("input", function () { f.amount = amountInput.value; });

    var catGroup = h("div", { class: "pill-group" });
    cats.forEach(function (c) {
      var pill = h("button", { class: "pill" + (f.category === c.id ? " active" : "") }, icon(c.icon, { size: 13, color: f.category === c.id ? "#fff" : COLORS.ink }), " " + c.label);
      pill.addEventListener("click", function () { f.category = c.id; refreshSheet(); });
      catGroup.appendChild(pill);
    });

    var dayInput = h("input", { class: "input", type: "text", inputmode: "numeric", placeholder: "예: 5", value: f.day });
    dayInput.addEventListener("input", function () { f.day = dayInput.value.replace(/[^0-9]/g, "").slice(0, 2); dayInput.value = f.day; s.error = ""; });

    var assetSelect = h("select", { class: "input" }, h("option", { value: "" }, "선택 안 함"));
    state.assets.forEach(function (a) { assetSelect.appendChild(h("option", { value: a.id }, a.name)); });
    assetSelect.value = f.assetId || "";
    assetSelect.addEventListener("change", function () { f.assetId = assetSelect.value; });

    var errorEl = s.error ? h("div", { class: "error-text" }, s.error) : null;

    var saveBtn = h("button", { class: "btn-primary" }, "저장");
    saveBtn.addEventListener("click", function () {
      var n = parseFloat(f.amount);
      var dayNum = parseInt(f.day, 10);
      if (!f.day || isNaN(dayNum) || dayNum < 1 || dayNum > 28) { s.error = "결제일은 1~28 사이 숫자로 입력해주세요"; refreshSheet(); return; }
      if (!n || n <= 0) { s.error = "금액을 입력해주세요"; refreshSheet(); return; }
      if (!f.name.trim()) { s.error = "이름을 입력해주세요"; refreshSheet(); return; }
      var item = {
        id: f.id, type: f.type, name: f.name.trim(), amount: n, category: f.category, day: dayNum,
        nextDate: s.isNew ? nextDateForDay(dayNum) : f.nextDate, assetId: f.assetId || null,
        active: f.active === undefined ? true : f.active
      };
      saveRecurring(item, s.isNew);
      closeSheet();
    });
    var body = [typeToggle, fieldWrap("이름", nameInput), fieldWrap("금액", amountInput), fieldWrap("카테고리", catGroup), fieldWrap("매월 결제일 (1~28)", dayInput), state.assets.length ? fieldWrap("자산 (선택)", assetSelect) : null, errorEl, saveBtn];
    if (!s.isNew) {
      var delBtn = h("button", { class: "btn-danger" }, "이 반복 항목 삭제");
      delBtn.addEventListener("click", function () {
        if (delBtn.dataset.confirm === "1") { deleteRecurring(f.id); closeSheet(); }
        else { delBtn.dataset.confirm = "1"; delBtn.textContent = "정말 삭제할까요? (한 번 더 탭)"; }
      });
      body.push(delBtn);
    }
    return sheetShell(s.isNew ? "반복 항목 추가" : "반복 항목 수정", body);
  }

  function sheetShell(title, bodyChildren) {
    var overlay = h("div", { class: "sheet-overlay" });
    overlay.addEventListener("click", function (e) { if (e.target === overlay) closeSheet(); });
    var closeBtn = h("button", { class: "sheet-close" }, icon("x", { size: 18, color: COLORS.inkSoft }));
    closeBtn.addEventListener("click", closeSheet);
    var sheet = h("div", { class: "sheet" }, h("div", { class: "sheet-head" }, h("div", { class: "sheet-title" }, title), closeBtn));
    bodyChildren.forEach(function (c) { appendChild(sheet, c); });
    sheet.addEventListener("click", function (e) { e.stopPropagation(); });
    overlay.appendChild(sheet);
    return overlay;
  }

  function refreshSheet() {
    if (!sheetRootEl) return;
    clearEl(sheetRootEl);
    if (!ui.sheet) return;
    var node;
    if (ui.sheet.kind === "tx") node = renderTxSheet();
    else if (ui.sheet.kind === "asset") node = renderAssetSheet();
    else if (ui.sheet.kind === "recurring") node = renderRecurringSheet();
    if (node) sheetRootEl.appendChild(node);
  }

  /* ============================ 상단 바 / 하단 내비 ============================ */
  var TABS = [
    { id: "home", label: "홈", icon: "home" },
    { id: "assets", label: "자산", icon: "landmark" },
    { id: "recurring", label: "반복", icon: "repeat" },
    { id: "budget", label: "예산", icon: "target" },
    { id: "analytics", label: "분석", icon: "barchart" }
  ];

  function renderTopbar(el) {
    clearEl(el);
    var showMonthNav = ui.tab === "home" || ui.tab === "budget";
    if (!showMonthNav) { el.style.visibility = "hidden"; return; }
    el.style.visibility = "visible";
    var prevBtn = h("button", { class: "icon-btn" }, icon("chevronLeft", { size: 20, color: COLORS.ink }));
    prevBtn.addEventListener("click", function () { setUI({ month: shiftMonth(ui.month, -1) }); });
    var nextBtn = h("button", { class: "icon-btn" }, icon("chevronRight", { size: 20, color: COLORS.ink }));
    nextBtn.addEventListener("click", function () { setUI({ month: shiftMonth(ui.month, 1) }); });
    mount(el, prevBtn, h("div", { class: "month-label tabular" }, monthLabel(ui.month)), nextBtn);
  }

  function renderBottomNav(el) {
    clearEl(el);
    TABS.forEach(function (t) {
      var active = ui.tab === t.id;
      var btn = h("button", {},
        icon(t.icon, { size: 19, color: active ? COLORS.ink : COLORS.inkSoft, strokeWidth: active ? 2.3 : 2 }),
        h("span", { class: "nav-label" + (active ? " active" : "") }, t.label)
      );
      btn.addEventListener("click", function () { setUI({ tab: t.id }); });
      el.appendChild(btn);
    });
  }

  /* ============================ 메인 렌더 ============================ */
  var contentEl, topbarEl, bottomNavEl;

  function renderApp() {
    var scrollTop = contentEl ? contentEl.scrollTop : 0;
    renderTopbar(topbarEl);
    clearEl(contentEl);
    if (ui.tab === "home") homeView(contentEl);
    else if (ui.tab === "assets") assetsView(contentEl);
    else if (ui.tab === "recurring") recurringView(contentEl);
    else if (ui.tab === "budget") budgetView(contentEl);
    else if (ui.tab === "analytics") analyticsView(contentEl);
    contentEl.scrollTop = scrollTop;
    renderBottomNav(bottomNavEl);
    refreshSheet();
  }

  /* ============================ 초기화 ============================ */
  function init() {
    var root = document.getElementById("app");
    topbarEl = h("div", { class: "topbar" });
    contentEl = h("div", { class: "content scroll-none" });
    qaEl = h("div", { class: "quickadd" });
    bottomNavEl = h("div", { class: "bottomnav" });
    sheetRootEl = h("div", {});
    mount(root, topbarEl, contentEl, qaEl, bottomNavEl, sheetRootEl);

    recomputeRecurring();
    renderQuickAdd();
    renderApp();

    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") recomputeRecurring();
    });
    setInterval(recomputeRecurring, 30 * 60 * 1000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
