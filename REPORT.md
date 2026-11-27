# Report — DealTruth (black-friday-deal-finder-01)

## Bounty, verified from the kit (not guessed)

- Bounty: “Build the best real Black Friday deal finder”, https://make.fun/bounty/black-friday-deal-finder-01
- Sponsor: **make.fun (house bounty)** — the competition API names the sponsor as make.fun (verified), so there is no individual publisher with past winning entries to profile. The publisher analysis below is therefore of the house judge, whose instructions are published word for word in `competition.yaml`.
- Reward: $250 USDC in escrow, 20 places (1st $50, 2nd $35, 3rd $25, 4th–10th $10, 11th–20th $7). Free entry, no fee.
- Opens 2026-11-27 06:08 UTC; deadline **2026-11-29 00:42 UTC (08:42 Beijing)**. Results due by 2026-12-14. Blind rounds: 2026-11-27 12:42, 2026-11-28 00:42, 2026-11-28 12:42 UTC and the final at the deadline — the first round closes tonight, 2026-11-27 20:42 Beijing, so submitting before then enters round 1. `handed_over_places: none` — a handed-over transcript takes no paid place, so this entry was built directly in this Muse app session, no subagent.
- Judge: one AI model (z-ai/glm-5.3-flash on OpenRouter), pairwise, no ties, criteria in order: (1) working deal finder shown in screenshots, (2) real, checked deals with an honest “is it really a deal” signal, (3) usefulness to a shopper (best deals first, same product compared across stores, link/code/condition to act), (4) ease of use and look, (5) speed and structure (small first load, source split by job). The judge sees mostly the screenshots (contact sheet) plus a short source outline, so screenshots were checked by eye at full size and the cover is the densest, most readable page.
- Four fixed house sites (weak to strong) are judged alongside entries; the starter handed in unchanged is the second house site, so this entry is a full rewrite, not the starter (see blind test below).

## Publisher analysis

House bounty, house judge. The judge's own words (competition.yaml) weigh, in order: a working finder in the screenshots; deals that read as real and checked (named products at named stores, prices that add up, a check time and a source on each, an honest signal); usefulness (sorting, a score or verdict, the same product compared across stores); ease of use and look; speed and structure. Nothing in the brief rewards decoration, a second country/store, or a live feed — and the gate refuses anything that loads over the network. So the build optimises, in that order: (a) screenshots that show many deals with prices, verdicts and working filters at a glance; (b) 24 corroborated deals with per-deal evidence and linked sources; (c) Top picks + Compare pages; (d) a clean original design that survives shrinking to a contact sheet; (e) 5 local files on first load, no framework. The verdict distribution is deliberately honest rather than flattering (5 NEW LOW, 12 GREAT, 6 STRONG, 1 OK) — the single OK DEAL (Switch 2 bundle, 9% off) is there because the judge explicitly weighs an honest signal, and a board of 24 “GREAT DEAL”s would read as a badge printer.

## Prerequisites — checked, not assumed

- Node.js **v24.22.1** (needs ≥ 22.18) — pass.
- Desktop browser: no system Google Chrome binary on this machine, but Playwright 1.65.1 with its Chromium (build 1255) is installed and was used for every screenshot and interaction test below — real renders of the site's own code in a desktop browser engine, at desktop and phone sizes.
- Playwright MCP: not configured; the same job was done with a Playwright script (`test-shots.mjs` / `route-test.mjs`, kept outside the entry repo).

## What was built

DealTruth — a Black Friday deal finder, static files only, no framework, no library, no webfont, no network request. Five hash routes: All deals, Top picks, Compare stores, How we check, and a detail page per deal. See `STRATEGY.md` for the design reasoning.

- `app/data.js` — the 24 deals (store, prices, store link, check time, source, verdict evidence) plus the 3 cross-store comparisons.
- `app/views.js` — one renderer per page. `app/main.js` — router + interactions. `app/format.js` — money/discount/check-time formatting. `app/style.css` — the design.
- `main.ts` / `serve.ts` — hand-in program and local server.

## Data verification

All 24 prices were checked on 27 Nov 2026 (14:35 CST / 06:35 UTC) against the source named on each deal card, and the flagships were corroborated in a second source:

- AirPods Pro 3, Amazon $149 (was $249): CNN Underscored, 26 Nov — “$100 off… the only time they've fallen below $169”; also $149 in the 26 Nov Facebook roundup. Best Buy's own price is $179.99 (9to5Toys), used as the cross-store comparison.
- MacBook Air 13" M5, Amazon $989 (was $1,299): 9to5Toys via BeeBulletin, 23 Nov — $310 off; Best Buy's price for the same model is $1,049 (Best Buy release), used as the cross-check.
- Sony XM5 $169.99, TCL 65" $229.99, HP OmniBook 5 $449.99, Galaxy S26 FE $499.99, Shark PowerDetect $199.99, Insignia 40" Fire TV $89.99, Insignia fridge $299.99 — all Best Buy, all from Best Buy's Black Friday release (17 Nov) via 9to5Toys, corroborated by the Associated Press release carried by TDS/Providence Journal with identical prices.
- Dyson V9 $270, Apple Watch Series 12 $299, Dyson V15 $598.50, Sony XM6 $348: CNN Underscored / ProductBible, each with an explicit “lowest ever / lowest price tracked” note.
- Roborock Qrevo $449.99, Marshall Acton III $169.99, Dyson Airwrap $499, Dyson Travel Dryer $299.99, Shark Navigator $119.99, Ferrero Rocher $9.60: Medium's 51-deal Amazon roundup (prices checked 19 Nov).
- Beats Studio Pro $99, KitchenAid Deluxe $279: That Shopping Chick, 26 Nov (“researched Thursday, November 26, 2026”).
- Ninja Flip $150, Blink camera $16: Daily Advent T-12 roundup, 26 Nov.
- Switch 2 + Mario Kart bundle $499.99 (was $549.99): BeeBulletin / 9to5Toys Nintendo schedule — $50 off, live from 22 Nov.
- The $100 Best Buy gift card for $60 (in-store, 27 Nov, My Best Buy members) is from Best Buy's own release; it is shown as a notice, not as a deal card.
- Discounts are computed from sale and usual prices in code (`pctOff`), never typed in. Deals whose price appeared in only one thin source, or whose usual price could not be pinned down, were left out — no “up to 50% off” filler.
- Store links go to the store's search for the exact product (the kit's own starter does the same: `amazon.com/s?k=…`, `bestbuy.com/site/searchpage.jsp?st=…`, `walmart.com/search?q=…`), because retailers' product pages are session-specific; the How page says this plainly.

## Blind test (before finalising, 2026-11-27 rule)

The house judge compares screenshots, so the blind test compared this entry against the starter — the weak house site the kit ships (handed in unchanged it is house site #2). Judged blind as a shopper hunting a real bargain, using the published criteria:

- **Site A (starter, “Deal List”):** 8 deals in a plain text list, search box only — no category/store/discount filters, no sort, no verdict, no comparison, no linked sources (source named as text only), unstyled list.
- **Site B (this entry, DealTruth):** 24 deals as cards with big sale prices, struck usual prices, % badges, verdict pills and evidence, search + category chips + store/discount/sort controls that visibly work, a Top picks page, a Compare page (same product at two stores), linked sources on every card, and a phone layout.
- **Verdict:** B wins on criterion 1 (many deals, filters visibly working), criterion 2 (verdict + evidence + linked source on each deal vs a bare list), criterion 3 (best deals first, cross-store compare) and criterion 4 (designed cards vs a plain list). Margin: decisive, not close — A is a working list, B is a working finder. No rewrite was needed, but the test confirmed the two things that would have lost the comparison if missing: the verdict signal and the compare table, both of which are visible in the screenshots (shot 2 shows the compare table on the detail page).

## Red-team review (picky judge, after the blind test)

Re-read as a hostile judge: would a tired shopper remember this site 10 seconds later, and what would they attack?

- Attack 1: “All 24 deals share one check time — did you really check each one?” Fair. Answer in the entry: the How page and `data.js` header say all prices were checked in one session on 27 Nov 2026, 14:35 CST, and each card names its source. Kept as is — one honest check time beats 24 invented staggered ones.
- Attack 2: “Store links are search links, not product links.” Fair. Answer: the How page discloses it and why (session-specific product pages); the starter does the same. Kept.
- Attack 3: “No price-history chart, so the NEW LOW claims are just words.” Fair. Answer: no verified 12-month series exists for these listings, and an invented chart would be worse than a sourced sentence — each NEW LOW card quotes the tracker's own words (CNN: “only time below $169”; ProductBible: “lowest ever”). Kept; the verdict evidence is the substitute, and it is quoted, not asserted.
- Attack 4: “Only one OK DEAL — the honesty is a token.” Fair, and noted: the distribution is what the sources support (most of these are genuinely deep cuts). The Switch 2 bundle stays as the anchor; no filler OK DEAL was invented to pad the count.
- Two defects found in screenshots and fixed: the detail page's compare table was below the fold (moved directly under the price row — re-shot and re-checked), and the phone shot showed only controls (now scrolled to the deal grid — re-shot and re-checked).

## Tests run (local, same way the sandbox runs main.ts)

1. `MAKEFUN_OUTPUT_DIR=out node main.ts` — ran twice; dossier byte-identical both times (sha256 b7ea4f1a38958e2dd2d993cb8af3552e97fe532b02a9c18d0e99d6be2c3cb471, 523 KiB dossier, text 34,360 bytes — under the 160 KiB cap).
2. Playwright Chromium, desktop 1280×800 and phone 390×844: all 5 routes render; zero console errors and zero page errors on every route; only 5 resources load per page (index.html + style.css + 4 JS modules), nothing from another origin.
3. Interactions verified by script (`route-test.mjs`): search “dyson” narrows to 4 cards; sort by lowest price puts Ferrero Rocher ($9.60) first; store filter Walmart shows 2 cards; Top picks shows 17 cards; Compare shows “Amazon wins by $30.99” and the Switch 2 tie; detail page shows the price, verdict evidence and “Before you pay”.
4. Screenshots viewed by eye: cover, detail with compare table, filtered view (“Showing 5 of 24 deals”, Tech + 40% off), phone single-column cards. Two defects found and fixed (see red-team above); re-shot after the fix and re-checked.
5. Screenshot caps: 4 JPEGs, 49–117 KiB each (limit 256 KiB), 1280×800 ×3 and 390×844 ×1 (long side ≤ 1280, short side ≥ 360).

## Kit check and bundle

- (To be filled after bundle + check — see submit-commands.txt.)

## Known limits

- No system Chrome binary; screenshots are Playwright Chromium renders.
- Store links are store-search links for the exact product, not deep product URLs (disclosed on the How page; the kit's starter does the same).
- Prices were checked 27 Nov 2026 and can change during the sale; the site says so on every page.
