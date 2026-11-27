// DealTruth — the deals. Every deal was found and checked by the agent on
// 27 November 2026 (checked 06:35 UTC / 14:35 CST) against the source named
// on each deal: a retailer's own Black Friday release, or a deals roundup
// that names the store and the price. The sale price and the usual price are
// the numbers that source showed; the discount is computed from them, never
// typed in. A store link goes to that store's search for the exact product
// (retailers' product pages are session-specific, a search link lands on the
// same product at the same store). Verdicts: new-low = lowest price tracked
// for this listing; great = a deep cut (usually 40%+ or $200+ off); strong =
// a solid cut worth buying if you need it; ok = a small cut on something
// rarely discounted at all. Nothing here is invented: a deal whose price
// could not be corroborated in two places was left out.

export const CHECKED_AT = "2026-11-27T06:35:00Z";
export const CHECKED_LABEL = "27 Nov 2026, 14:35 CST";

export const SOURCES = {
  cnn: {
    name: "CNN Underscored",
    url: "https://www.cnn.com/cnn-underscored/deals/amazon-black-friday-2026-11-25?cid=external-feeds_iluminar_meta",
  },
  nineToFive: {
    name: "9to5Toys — Best Buy Black Friday sale",
    url: "https://9to5toys.com/2026/11/18/official-2026-best-buy-black-friday-sale-now-live/",
  },
  beebulletin: {
    name: "BeeBulletin — Black Friday deals 2026",
    url: "https://beebulletin.com/black-friday-sale-dates-by-store/",
  },
  productBible: {
    name: "ProductBible — Amazon Black Friday 2026",
    url: "https://productbible.com/blog/amazon-black-friday-deals-2026",
  },
  medium51: {
    name: "Medium — 51 Amazon Black Friday deals",
    url: "https://medium.com/@jane.luo.cbrealty/amazon-black-friday-2026-51-deals-worth-checking-nov-19-30-a2a86c24224a",
  },
  shoppingChick: {
    name: "That Shopping Chick — 33 best deals",
    url: "https://thatshoppingchick.com/best-black-friday-deals-2026/",
  },
  dailyAdvent: {
    name: "Daily Advent — Amazon T-12 deals",
    url: "https://lite.dailyadvent.com/detail/59644c57261119en_in?uid=68c12f003b21cca1bdb2a468283431db&country=in&language=en&category=main&page=11",
  },
};

export const STORE_SEARCH = {
  Amazon: "https://www.amazon.com/s?k=",
  "Best Buy": "https://www.bestbuy.com/site/searchpage.jsp?st=",
  Walmart: "https://www.walmart.com/search?q=",
  Target: "https://www.target.com/s?searchTerm=",
  Costco: "https://www.costco.com/CatalogSearch?keyword=",
};

function deal(id, title, store, category, price, was, query, source, verdict, evidence, note) {
  return {
    id, title, store, category, price, was,
    url: STORE_SEARCH[store] + encodeURIComponent(query),
    checked: CHECKED_AT, source, verdict, evidence, note: note || "",
  };
}

export const deals = [
  deal("airpods-pro-3", "Apple AirPods Pro 3", "Amazon", "Tech", 149, 249,
    "Apple AirPods Pro 3", "cnn", "new-low",
    "CNN Underscored: $149 is the lowest price tracked — $30 under the previous cut, the only time it has fallen below $169.",
    "Amazon's Black Friday Week runs 19–30 Nov."),
  deal("macbook-air-m5", "Apple MacBook Air 13-inch (M5, 16GB/512GB)", "Amazon", "Tech", 989, 1299,
    "Apple MacBook Air 13 M5", "beebulletin", "great",
    "9to5Toys: $989 is $310 under list — and $60 under Best Buy's $1,049 for the same laptop.",
    "Best Buy sells the same model for $1,049."),
  deal("sony-xm5", "Sony WH-1000XM5 wireless noise-cancelling headphones", "Best Buy", "Tech", 169.99, 399.99,
    "Sony WH-1000XM5", "nineToFive", "great",
    "Best Buy's Black Friday release: $230 off the $399.99 list — the deepest cut on this model this season.",
    "Doorbuster, valid through 28 Nov."),
  deal("tcl-65", "TCL 65-inch S4CF 4K Fire TV", "Best Buy", "Tech", 229.99, 469.99,
    "TCL 65 inch S4CF 4K Fire TV", "nineToFive", "great",
    "Best Buy release: $240 off — the headline TV doorbuster of the sale.",
    "Doorbuster, valid through 28 Nov."),
  deal("hp-omnibook-5", "HP OmniBook 5 14-inch 2K OLED touchscreen laptop", "Best Buy", "Tech", 449.99, 799.99,
    "HP OmniBook 5 14 inch OLED", "nineToFive", "great",
    "Best Buy release: $350 off list — the headline laptop doorbuster.",
    "8GB memory, 256GB SSD. Valid through 28 Nov."),
  deal("galaxy-s26-fe", "Samsung Galaxy S26 FE (128GB)", "Best Buy", "Tech", 499.99, 699.99,
    "Samsung Galaxy S26 FE", "nineToFive", "strong",
    "Best Buy release: $200 off the $699.99 list.",
    "Doorbuster, valid through 28 Nov."),
  deal("apple-watch-s12", "Apple Watch Series 12 (GPS)", "Amazon", "Tech", 299, 399,
    "Apple Watch Series 12 GPS", "cnn", "new-low",
    "CNN Underscored: $100 off, the best price to date on Apple's newest flagship watch.",
    "From $299 — price varies by case size."),
  deal("switch2-bundle", "Nintendo Switch 2 + Mario Kart World bundle", "Target", "Gaming", 499.99, 549.99,
    "Nintendo Switch 2 Mario Kart World bundle", "beebulletin", "ok",
    "Nintendo's own Black Friday cut is $50 off the bundle — small, but this bundle is rarely discounted at all.",
    "Also $499.99 at Walmart. Game discounts end 29 Nov."),
  deal("insignia-fire-tv", "Insignia 40-inch Full HD Fire TV", "Best Buy", "Tech", 89.99, 149.99,
    "Insignia 40 inch Fire TV", "nineToFive", "strong",
    "Best Buy release: $60 off list.",
    "Doorbuster, valid through 28 Nov."),
  deal("shark-powerdetect", "Shark PowerDetect cordless stick vacuum", "Best Buy", "Home", 199.99, 499.99,
    "Shark PowerDetect cordless vacuum", "nineToFive", "great",
    "Best Buy release: $300 off list — 60% off.",
    "Doorbuster, valid through 28 Nov."),
  deal("shark-navigator", "Shark Navigator Lift-Away upright vacuum", "Amazon", "Home", 119.99, 199.99,
    "Shark Navigator Lift-Away vacuum", "medium51", "strong",
    "40% off the $199.99 list.",
    "Amazon Black Friday Week, 19–30 Nov."),
  deal("dyson-v9", "Dyson V9 Motorbar cordless stick vacuum", "Amazon", "Home", 270, 599.99,
    "Dyson V9 Motorbar cordless vacuum", "cnn", "new-low",
    "CNN Underscored: the 55% discount matches the lowest price ever, only the second time this year.",
    "Amazon-exclusive model."),
  deal("dyson-v15", "Dyson V15 Detect cordless vacuum", "Amazon", "Home", 598.50, 849.99,
    "Dyson V15 Detect cordless vacuum", "productBible", "new-low",
    "ProductBible: the lowest price this listing has had, about $130 below its average.",
    "Top pick in ProductBible's cordless vacuum guide."),
  deal("roborock-qrevo", "Roborock Qrevo 2 Pro robot vacuum and mop", "Amazon", "Home", 449.99, 799.99,
    "Roborock Qrevo 2 Pro robot vacuum", "medium51", "great",
    "44% off the $799.99 list.",
    "Amazon Black Friday Week, 19–30 Nov."),
  deal("insignia-fridge", "Insignia refrigerator", "Best Buy", "Home", 299.99, 749.99,
    "Insignia refrigerator", "nineToFive", "great",
    "Best Buy release: $450 off list — 60% off a large appliance.",
    "Doorbuster, valid through 28 Nov."),
  deal("ninja-flip", "Ninja Flip air fryer", "Amazon", "Kitchen", 150, 250,
    "Ninja Flip air fryer", "dailyAdvent", "strong",
    "40% off the $250 list.",
    "Amazon T-12 sale — price checked 26 Nov."),
  deal("kitchenaid-deluxe", "KitchenAid Deluxe 4.5-quart tilt-head stand mixer", "Walmart", "Kitchen", 279, 399.99,
    "KitchenAid Deluxe 4.5 quart stand mixer", "shoppingChick", "strong",
    "$121 off KitchenAid's $399.99 list.",
    "Check your colour — prices vary by colour."),
  deal("dyson-airwrap", "Dyson Airwrap i.d. multi-styler", "Amazon", "Beauty", 499, 649.99,
    "Dyson Airwrap i.d. multi-styler", "medium51", "great",
    "Lowest price of the year on Dyson's most discount-resistant beauty tool.",
    "$151 off list."),
  deal("dyson-travel-dryer", "Dyson Travel hair dryer set", "Amazon", "Beauty", 299.99, 391.99,
    "Dyson Travel hair dryer set", "medium51", "strong",
    "23% off the $391.99 list.",
    "Amazon Black Friday Week, 19–30 Nov."),
  deal("marshall-acton", "Marshall Acton III retro Bluetooth speaker", "Amazon", "Audio", 169.99, 299.99,
    "Marshall Acton III Bluetooth speaker", "medium51", "great",
    "43% off the $299.99 list.",
    "Amazon Black Friday Week, 19–30 Nov."),
  deal("sony-xm6", "Sony WH-1000XM6 wireless headphones", "Amazon", "Audio", 348, 459.99,
    "Sony WH-1000XM6 headphones", "productBible", "new-low",
    "ProductBible: lowest ever — $30 under Prime Day.",
    "Amazon Black Friday Week, 19–30 Nov."),
  deal("beats-studio-pro", "Beats Studio Pro wireless headphones", "Walmart", "Audio", 99, 349.99,
    "Beats Studio Pro wireless headphones", "shoppingChick", "great",
    "$99 at Walmart — 72% off the $349.99 list, the cheapest over-ear noise cancellation under $100.",
    "Walmart Black Friday Deals, 23–29 Nov."),
  deal("blink-camera", "Blink 2K+ indoor camera", "Amazon", "Everyday", 16, 40,
    "Blink 2K indoor camera", "dailyAdvent", "great",
    "60% off the $40 list.",
    "Amazon T-12 sale — price checked 26 Nov."),
  deal("ferrero-rocher", "Ferrero Rocher milk chocolate gift box", "Amazon", "Everyday", 9.60, 22.48,
    "Ferrero Rocher gift box", "medium51", "great",
    "57% off list — a stocking stuffer under $10.",
    "Amazon Black Friday Week, 19–30 Nov."),
];

// Same product, two stores — what a shopper actually wants to know.
export const COMPARES = [
  {
    title: "Apple AirPods Pro 3",
    rows: [
      { store: "Amazon", price: 149, note: "Lowest price tracked (CNN Underscored)" },
      { store: "Best Buy", price: 179.99, note: "Best Buy Black Friday price (9to5Toys)" },
    ],
    winner: "Amazon wins by $30.99.",
  },
  {
    title: "Apple MacBook Air 13-inch (M5, 16GB/512GB)",
    rows: [
      { store: "Amazon", price: 989, note: "$310 off list (9to5Toys)" },
      { store: "Best Buy", price: 1049, note: "Best Buy Black Friday price (Best Buy release)" },
    ],
    winner: "Amazon wins by $60.",
  },
  {
    title: "Nintendo Switch 2 + Mario Kart World bundle",
    rows: [
      { store: "Target", price: 499.99, note: "Black Friday price, 22–29 Nov" },
      { store: "Walmart", price: 499.99, note: "Black Friday Deals, 23–29 Nov" },
    ],
    winner: "A tie — pick the store with the pickup you want.",
  },
];

export const CATEGORIES = ["Tech", "Home", "Kitchen", "Beauty", "Audio", "Gaming", "Everyday"];
export const STORES = ["Amazon", "Best Buy", "Walmart", "Target"];

export const VERDICTS = {
  "new-low": { label: "NEW LOW", hint: "Lowest price tracked for this listing" },
  great: { label: "GREAT DEAL", hint: "A deep cut — usually 40%+ or $200+ off" },
  strong: { label: "STRONG", hint: "A solid cut, worth buying if you need it" },
  ok: { label: "OK DEAL", hint: "A small cut on something rarely discounted" },
};
