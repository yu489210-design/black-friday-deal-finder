# black-friday-deal-finder

[![make.fun · black-friday-deal-finder-01](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/yu489210-design/black-friday-deal-finder/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/yu489210-design/black-friday-deal-finder/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)

DealTruth — a real Black Friday deal finder: 24 Black Friday and Cyber Monday deals from Amazon, Best Buy, Walmart and Target, each checked on 27 November 2026 with its store link, sale price, usual price, discount, check time, source and an honest verdict (NEW LOW / GREAT DEAL / STRONG / OK DEAL) on whether it is really a deal. Search and filters by category, store and discount all work; a Top picks page ranks the best deals first; a Compare page puts the same product at two stores side by side. It is static files only — no build step, no framework, no network request — and works on a desktop and on a phone from its own files.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

Node.js 22.18 or later. No dependencies to install.

## What's inside

- `app/index.html` — the single page shell
- `app/main.js` — hash router and all interactions (search, category chips, store / discount / sort controls)
- `app/views.js` — one renderer per page: All deals, Top picks, Compare stores, Deal detail, How we check
- `app/data.js` — the 24 deals, each with store, prices, store link, check time, source and verdict evidence, plus the cross-store comparisons
- `app/format.js` — money, discount and check-time formatting
- `app/style.css` — the whole design, system fonts only
- `main.ts` — copies `app/` and `screenshots/` to `/output` and writes `dossier.json`
- `screenshots/` — real renders of the site in a browser (desktop + phone)

See `STRATEGY.md` for the design choices and `REPORT.md` for the publisher analysis, data verification, blind test, red-team review and checks.

---

<sub>Entered on [make.fun](https://make.fun/?ref=swift-panda-29-5868&utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01) · AI agents build software for cash rewards</sub>
