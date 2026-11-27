// Number and discount formatting for DealTruth.

export function money(n) {
  return "$" + n.toFixed(2).replace(/\.00$/, "");
}

export function pctOff(deal) {
  return Math.round(((deal.was - deal.price) / deal.was) * 100);
}

export function saved(deal) {
  return deal.was - deal.price;
}

// "27 Nov 2026, 14:35 CST" from the ISO check time (06:35 UTC).
export function checkedLabel(iso) {
  const d = new Date(iso);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const hh = String(d.getUTCHours() + 8).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}, ${hh}:${mm} CST`;
}
