// DealTruth — hash router and all interactions (search, category chips,
// store / discount / sort controls). One state object; the grid re-renders
// on its own so typing in the search box never loses focus.
import { controlsHtml, gridHtml, topPage, comparePage, dealPage, howPage } from "./views.js";

const app = document.getElementById("app");

const SORT_LABELS = {
  verdict: "best verdict first",
  pct: "biggest % off",
  save: "biggest $ saving",
  price: "lowest price",
};

const state = {
  q: "",
  category: "All",
  store: "All stores",
  minOff: 0,
  sort: "verdict",
  get sortLabel() { return SORT_LABELS[this.sort]; },
};

function renderGrid() {
  const wrap = document.getElementById("grid-wrap");
  if (wrap) wrap.innerHTML = gridHtml(state);
}

function render() {
  const hash = location.hash || "#/";
  const [_, route, arg] = hash.split("/");
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const on = (route === "" && a.dataset.nav === "all")
      || (route === "top" && a.dataset.nav === "top")
      || (route === "compare" && a.dataset.nav === "compare")
      || (route === "how" && a.dataset.nav === "how");
    a.classList.toggle("on", on);
  });
  if (route === "top") { app.innerHTML = topPage(); return; }
  if (route === "compare") { app.innerHTML = comparePage(); return; }
  if (route === "how") { app.innerHTML = howPage(); return; }
  if (route === "deal") { app.innerHTML = dealPage(arg || ""); return; }
  app.innerHTML = controlsHtml(state);
  renderGrid();
  bindControls();
}

function bindControls() {
  const q = document.getElementById("q");
  if (q) q.addEventListener("input", () => { state.q = q.value; renderGrid(); });
  const store = document.getElementById("store");
  if (store) store.addEventListener("change", () => { state.store = store.value; renderGrid(); });
  const minOff = document.getElementById("minoff");
  if (minOff) minOff.addEventListener("change", () => { state.minOff = Number(minOff.value); renderGrid(); });
  const sort = document.getElementById("sort");
  if (sort) sort.addEventListener("change", () => { state.sort = sort.value; renderGrid(); });
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.category = chip.dataset.cat;
      document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c === chip));
      renderGrid();
    });
  });
}

window.addEventListener("hashchange", render);
render();
