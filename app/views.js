// DealTruth — one renderer per page. Views return HTML strings; main.js
// owns state, routing and events.
import { deals, COMPARES, CATEGORIES, STORES, VERDICTS, SOURCES, CHECKED_LABEL } from "./data.js";
import { money, pctOff, saved, checkedLabel } from "./format.js";

export function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function verdictPill(v) {
  const def = VERDICTS[v];
  return `<span class="verdict ${esc(v)}" title="${esc(def.hint)}">${esc(def.label)}</span>`;
}

export function dealCard(d) {
  const src = SOURCES[d.source];
  return `<article class="card">
    ${verdictPill(d.verdict)}
    <h3><a href="#/deal/${esc(d.id)}">${esc(d.title)}</a></h3>
    <p class="store-line"><b>${esc(d.store)}</b> · ${esc(d.category)}</p>
    <p class="price-row"><span class="price">${money(d.price)}</span><span class="was">${money(d.was)}</span><span class="off-badge">−${pctOff(d)}%</span></p>
    <p class="save-line">You save ${money(saved(d))}</p>
    <p class="evidence">${esc(d.evidence)}</p>
    <p class="checked-line">Checked ${esc(checkedLabel(d.checked))} · Source: <a href="${esc(src.url)}" target="_blank" rel="noopener">${esc(src.name)}</a></p>
    <div class="card-actions">
      <a class="btn" href="${esc(d.url)}" target="_blank" rel="noopener">View at ${esc(d.store)} ↗</a>
      <a class="btn ghost" href="#/deal/${esc(d.id)}">Details</a>
    </div>
  </article>`;
}

export function controlsHtml(state) {
  const chips = ["All", ...CATEGORIES].map((c) =>
    `<button type="button" class="chip${state.category === c ? " on" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
  const stores = ["All stores", ...STORES].map((s) =>
    `<option${state.store === s ? " selected" : ""}>${esc(s)}</option>`).join("");
  const discounts = [["Any discount", 0], ["20% off or more", 20], ["30% off or more", 30], ["40% off or more", 40], ["50% off or more", 50]]
    .map(([label, v]) => `<option value="${v}"${state.minOff === v ? " selected" : ""}>${esc(label)}</option>`).join("");
  const sorts = [["Best verdict first", "verdict"], ["Biggest % off", "pct"], ["Biggest $ saving", "save"], ["Lowest price", "price"]]
    .map(([label, v]) => `<option value="${v}"${state.sort === v ? " selected" : ""}>${esc(label)}</option>`).join("");
  return `<section class="controls" aria-label="Search and filter deals">
    <div class="search-box"><label for="q">Search deals</label><input id="q" type="search" placeholder="Try “headphones”, “Dyson”, “TV”…" value="${esc(state.q)}"></div>
    <div><label for="store">Store</label><select id="store">${stores}</select></div>
    <div><label for="minoff">Discount</label><select id="minoff">${discounts}</select></div>
    <div><label for="sort">Sort by</label><select id="sort">${sorts}</select></div>
  </section>
  <div class="chips" role="group" aria-label="Category">${chips}</div>
  <div id="grid-wrap"></div>`;
}

const VERDICT_RANK = { "new-low": 0, great: 1, strong: 2, ok: 3 };

export function filterDeals(state) {
  const q = state.q.trim().toLowerCase();
  let list = deals.filter((d) => {
    if (state.category !== "All" && d.category !== state.category) return false;
    if (state.store !== "All stores" && d.store !== state.store) return false;
    if (pctOff(d) < state.minOff) return false;
    if (q && !(d.title + " " + d.store + " " + d.category).toLowerCase().includes(q)) return false;
    return true;
  });
  const by = {
    verdict: (a, b) => VERDICT_RANK[a.verdict] - VERDICT_RANK[b.verdict] || pctOff(b) - pctOff(a),
    pct: (a, b) => pctOff(b) - pctOff(a),
    save: (a, b) => saved(b) - saved(a),
    price: (a, b) => a.price - b.price,
  }[state.sort];
  return [...list].sort(by);
}

export function gridHtml(state) {
  const list = filterDeals(state);
  const line = `<p class="count-line">Showing <strong>${list.length}</strong> of <strong>${deals.length}</strong> deals · Sorted by ${esc(state.sortLabel)} · All prices checked ${esc(CHECKED_LABEL)}</p>`;
  if (!list.length) {
    return line + `<div class="empty"><p><strong>No deals match those filters.</strong></p><p>Try a lower discount, another store, or clear the search.</p></div>`;
  }
  return line + `<div class="grid">${list.map(dealCard).join("")}</div>`;
}

export function topPage() {
  const picks = deals
    .filter((d) => d.verdict === "new-low" || d.verdict === "great")
    .sort((a, b) => pctOff(b) - pctOff(a));
  return `<section class="panel">
    <p class="kicker">Top picks</p>
    <h2>The 17 deals worth buying first</h2>
    <p>Only NEW LOW and GREAT DEAL verdicts, sorted by biggest percentage off. Every one of these is either the lowest price tracked for its listing or a cut of 40% or more.</p>
  </section>
  <div class="grid">${picks.map(dealCard).join("")}</div>`;
}

export function comparePage() {
  return `<section class="panel">
    <p class="kicker">Compare stores</p>
    <h2>Same product, two stores</h2>
    <p>Black Friday prices for the same product differ by store. These are the products we found at two stores, with the cheaper one marked — check the store link before you pay, because prices move during the sale.</p>
    ${COMPARES.map((c) => `<h3>${esc(c.title)}</h3>
      <table><thead><tr><th>Store</th><th>Price</th><th>Why</th></tr></thead><tbody>
      ${c.rows.map((r) => `<tr><td>${esc(r.store)}</td><td class="${r.price === Math.min(...c.rows.map((x) => x.price)) ? "win" : ""}">${money(r.price)}</td><td>${esc(r.note)}</td></tr>`).join("")}
      </tbody></table><p><strong>${esc(c.winner)}</strong></p>`).join("")}
  </section>`;
}

export function dealPage(id) {
  const d = deals.find((x) => x.id === id);
  if (!d) return `<section class="panel"><h2>Deal not found</h2><p><a href="#/">Back to all deals</a></p></section>`;
  const src = SOURCES[d.source];
  const cmp = COMPARES.find((c) => c.title === d.title);
  return `<section class="panel">
    <p><a class="back-link" href="#/">← Back to all deals</a></p>
    <p class="kicker">${esc(d.category)} · ${esc(d.store)}</p>
    ${verdictPill(d.verdict)}
    <h2>${esc(d.title)}</h2>
    <p class="price-row"><span class="price">${money(d.price)}</span><span class="was">${money(d.was)}</span><span class="off-badge">−${pctOff(d)}%</span></p>
    <p class="save-line">You save ${money(saved(d))} off the usual price of ${money(d.was)}.</p>
    ${cmp ? `<h3>Same product at another store</h3>
    <table><thead><tr><th>Store</th><th>Price</th><th>Why</th></tr></thead><tbody>
    ${cmp.rows.map((r) => `<tr><td>${esc(r.store)}</td><td class="${r.price === Math.min(...cmp.rows.map((x) => x.price)) ? "win" : ""}">${money(r.price)}</td><td>${esc(r.note)}</td></tr>`).join("")}
    </tbody></table><p><strong>${esc(cmp.winner)}</strong></p>` : ""}
    <h3>Why this verdict</h3>
    <p>${esc(d.evidence)}</p>
    ${d.note ? `<p><strong>Note:</strong> ${esc(d.note)}</p>` : ""}
    <h3>Checked</h3>
    <p>Price checked <strong>${esc(checkedLabel(d.checked))}</strong>. Source: <a href="${esc(src.url)}" target="_blank" rel="noopener">${esc(src.name)}</a>. Prices can change during the sale — the price on the store page is the one to trust.</p>
    <h3>Before you pay</h3>
    <p>Check the exact model on the store page, confirm the seller is the store itself, and read the return window. A crossed-out price is the store's own number — this site judges a deal by its sale price and its track record, not by the badge.</p>
    <div class="card-actions"><a class="btn" href="${esc(d.url)}" target="_blank" rel="noopener">View at ${esc(d.store)} ↗</a></div>
  </section>`;
}

export function howPage() {
  return `<section class="panel">
    <p class="kicker">How we check</p>
    <h2>How a deal earns its place here</h2>
    <p>Every deal on this site was found and checked by the agent on <strong>27 November 2026</strong>. The price was read at the store or in a deals source that names the store, and each deal names that source on its card. A deal whose price could not be corroborated was left out — no invented products, no invented prices, no invented links.</p>
    <h3>The verdicts</h3>
    <ul class="verdict-list">
      <li><strong>NEW LOW</strong> — the lowest price tracked for this listing.</li>
      <li><strong>GREAT DEAL</strong> — a deep cut, usually 40% or more off, or $200 or more saved.</li>
      <li><strong>STRONG</strong> — a solid cut, worth buying if you need it.</li>
      <li><strong>OK DEAL</strong> — a small cut on something rarely discounted at all. The Nintendo Switch 2 bundle is the honest example: $50 off is small, but the bundle is almost never discounted.</li>
    </ul>
    <h3>What the crossed-out price means</h3>
    <p>The “usual price” is the list or reference price the source showed — the store's own number. Some stores show a “comparable value” instead of a price the item actually sold at, so this site judges a deal by its sale price and its track record, not by the size of the badge. That is why a 9% cut on the Switch 2 bundle is only an OK DEAL, while a 23% cut on the Dyson Airwrap is a GREAT DEAL: Dyson almost never discounts it, and this is its lowest price of the year.</p>
    <h3>Store links</h3>
    <p>Each “View at” link goes to the store's search for the exact product, because retailers' product pages are session-specific. The search lands on the same product at the same store.</p>
    <h3>Sources</h3>
    <ul class="verdict-list">
      ${Object.values(SOURCES).map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`).join("")}
      <li>Best Buy's Black Friday release, 17 Nov 2026 (via 9to5Toys and the Associated Press).</li>
    </ul>
    <h3>Sale windows</h3>
    <p>Amazon Black Friday Week runs 19–30 Nov; Best Buy's Black Friday Sale runs 19–28 Nov; Walmart's Black Friday Deals run 23–29 Nov with Cyber Monday 30 Nov–2 Dec; Target's sale runs 22–29 Nov. Cyber Monday is 30 Nov 2026.</p>
  </section>`;
}
