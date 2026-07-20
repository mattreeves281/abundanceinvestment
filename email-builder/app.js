const CDN = "https://cdn4.sharein.com/abundance/assets/images";
const LOGO = "https://cdn4.sharein.com/abundance/assets/icons/logo-new-2.svg";

const colors = {
  ink: "#363635",
  body: "#4d4a46",
  muted: "#71716e",
  line: "#e5e1e0",
  page: "#faf8f8",
  pink: "#f27fae",
  pinkDark: "#c1658b",
  teal: "#00a4b6",
  yellow: "#ffb72c",
  grey: "#e2e2e2",
  civicGrey: "#e2e2e2",
  indigo: "#312b6b",
  white: "#ffffff"
};

const dividerOptions = [
  ["divider-rise-left-yellow-to-white@6x.png", "Yellow rise left"],
  ["divider-rise-right-yellow-to-white@6x.png", "Yellow rise right"],
  ["divider-fall-left-yellow-to-white@6x.png", "Yellow fall left"],
  ["divider-rise-left-pink-to-white@6x.png", "Pink rise left"],
  ["divider-fall-left-pink-to-white@6x.png", "Pink fall left"],
  ["divider-rise-right-teal-to-white@6x.png", "Teal rise right"],
  ["divider-fall-left-teal-to-white@6x.png", "Teal fall left"],
  ["divider-rise-left-indigo-to-white@6x.png", "Indigo rise left"],
  ["divider-rise-right-indigo-to-white@6x.png", "Indigo rise right"],
  ["divider-fall-left-indigo-to-white@6x.png", "Indigo fall left"]
];

const maskOptions = [
  ["pink", "Pink", "mask-top-white-to-pink@6x.png", "mask-bottom-pink-to-white@6x.png", colors.pink],
  ["teal", "Teal", "mask-top-white-to-teal@6x.png", "mask-bottom-teal-to-white@6x.png", colors.teal],
  ["grey", "Grey", "mask-top-white-to-grey-ui@6x.png", "mask-bottom-grey-ui-to-white@6x.png", colors.grey]
];

const sampleImages = {
  caseStudy: "https://cdn4.sharein.com/abundance/e535089b-3a08-41a2-bc8d-25f46f871368.jpg",
  place: "https://shareinmicrosite.blob.core.windows.net/abundance/60837d49-e6e9-4a92-bdb6-63bba7d20e6d.jpg",
  camden: "https://cdn4.sharein.com/abundance/5af77a81-6107-4c76-a675-0ea1de1d8767.png",
  news: "https://cdn4.sharein.com/abundance/cms/93767e61-d92b-4695-b5c6-e0a470aaa620.png",
  tileOne: "https://cdn4.sharein.com/abundance/cms/c74b11d9-c836-4b88-b09c-dd116c6a417f.png",
  tileTwo: "https://cdn4.sharein.com/abundance/cms/cb1d8048-f56d-44c0-8288-962b6ef58f34.png",
  headshot: "https://cdn4.sharein.com/abundance/721452c5-0310-4766-847e-fbca0e347335.png"
};

const blockSchemas = {
  header: {
    label: "Header",
    defaults: { loginUrl: "https://www.abundanceinvestment.com/login", loginLabel: "Log in" },
    fields: [
      field("loginLabel", "Login label"),
      field("loginUrl", "Login URL", "url")
    ]
  },
  hero: {
    label: "Full-width hero",
    defaults: {
      heading: "How it works",
      body: "Municipal investments are loans to UK councils. Councils use the funds to improve local places while offering investors a stable long-term income.",
      links: "Benefits|#benefits\nHow to invest|#invest\nOur rates|#rates"
    },
    fields: [
      field("heading", "Heading"),
      field("body", "Body", "textarea"),
      field("links", "Inline links, one per line as Label|URL", "textarea")
    ]
  },
  divider: {
    label: "Image divider",
    defaults: { image: "divider-rise-left-yellow-to-white@6x.png", spacing: "18" },
    fields: [
      field("image", "Divider image", "select", dividerOptions),
      field("spacing", "Vertical padding")
    ]
  },
  imageText: {
    label: "Image + text row",
    defaults: {
      imageUrl: `${CDN}/illustration-placeholder.png`,
      imageAlt: "Line illustration",
      heading: "Invest in local change",
      body: "Your money is lent to a council and repaid with fixed interest over the investment term.",
      linkLabel: "Learn how it works",
      linkUrl: "https://www.abundanceinvestment.com/how-it-works"
    },
    fields: [
      field("imageUrl", "Image URL", "url"),
      field("imageAlt", "Image alt text"),
      field("heading", "Heading"),
      field("body", "Body", "textarea"),
      field("linkLabel", "Text link label"),
      field("linkUrl", "Text link URL", "url")
    ]
  },
  simpleContent: {
    label: "Simple content",
    defaults: {
      eyebrow: "",
      heading: "A simple content section",
      body: "Use this row for normal campaign copy, investor updates, product explainers or short editorial notes. It deliberately keeps the structure plain so it can be dropped between richer V2-style modules.",
      ctaLabel: "",
      ctaUrl: ""
    },
    fields: [
      field("eyebrow", "Eyebrow"),
      field("heading", "Heading"),
      field("body", "Body", "textarea"),
      field("ctaLabel", "Button label"),
      field("ctaUrl", "Button URL", "url")
    ]
  },
  featureCards: {
    label: "Colour card stack",
    defaults: {
      heading: "Benefits at a glance",
      intro: "Municipal investments are designed for people looking for long-term investments with fixed cash interest payments.",
      cards: [
        { title: "Regular interest payments", body: "Cash payments every 6 months to reinvest or withdraw.", color: "pink" },
        { title: "£5 minimum investment", body: "Everyone invests on the same terms.", color: "teal" },
        { title: "ISA eligible", body: "Invest through an Innovative Finance ISA.", color: "yellow" },
        { title: "No investing fees", body: "The rates you see are the rates you get.", color: "green" }
      ]
    },
    fields: [field("heading", "Heading"), field("intro", "Intro", "textarea")],
    repeats: [{ key: "cards", label: "Cards", itemFields: [field("title", "Title"), field("body", "Body", "textarea"), field("color", "Colour", "select", [["pink", "Pink"], ["teal", "Teal"], ["yellow", "Yellow"], ["green", "Green"]])] }]
  },
  twoUpCards: {
    label: "2-up card buttons",
    defaults: {
      heading: "Two ways to build your pot with Abundance",
      intro: "Choose the approach that suits how you want to add money and manage returns.",
      cards: [
        { title: "Invest regularly", body: "Build your pot through regular deposits. No fees means all your money gets invested.", ctaLabel: "Read more", ctaUrl: "https://www.abundanceinvestment.com" },
        { title: "Make a single deposit", body: "Add money when it suits you and choose one council or split across several.", ctaLabel: "Read more", ctaUrl: "https://www.abundanceinvestment.com" }
      ]
    },
    fields: [field("heading", "Heading"), field("intro", "Intro", "textarea")],
    repeats: [{ key: "cards", label: "Cards", itemFields: [field("title", "Title"), field("body", "Body", "textarea"), field("ctaLabel", "Button label"), field("ctaUrl", "Button URL", "url")] }]
  },
  threeUpBlobCards: {
    label: "3-up blob cards",
    defaults: {
      heading: "Benefits of ISA investing",
      intro: "Investing through an ISA offers a range of benefits for savers and investors.",
      cards: [
        { numberImage: "1.png", title: "Invest up to £20,000 tax free", body: "You get a new ISA allowance each tax year.", linkLabel: "Read ISA rules", linkUrl: "#" },
        { numberImage: "2.png", title: "Open as many ISAs as you like", body: "You can open ISA accounts with any number of providers.", linkLabel: "Explore ISAs", linkUrl: "#" },
        { numberImage: "3.png", title: "Transfer existing ISAs", body: "Transfer previous tax year ISA savings to Abundance.", linkLabel: "Transfer an ISA", linkUrl: "#" }
      ]
    },
    fields: [field("heading", "Heading"), field("intro", "Intro", "textarea")],
    repeats: [{ key: "cards", label: "Cards", itemFields: [field("numberImage", "Number image filename"), field("title", "Title"), field("body", "Body", "textarea"), field("linkLabel", "Text link label"), field("linkUrl", "Text link URL", "url")] }]
  },
  stepsList: {
    label: "How-to steps list",
    defaults: {
      heading: "How to invest",
      intro: "It is simple to invest with us. There are no fees and the minimum investment is just £5.",
      steps: [
        { numberImage: "1.png", title: "Sign up for a free account", body: "Create an Abundance account and choose whether to receive investment updates." },
        { numberImage: "2.png", title: "Choose how you want to invest", body: "Pick investments yourself or use automatic investment options." },
        { numberImage: "3.png", title: "Complete account setup", body: "Before investing, complete a simple online identity check." },
        { numberImage: "4.png", title: "Add money to your account", body: "Transfer money by debit card or bank transfer, then choose how much you want to invest." },
        { numberImage: "5.png", title: "Start earning interest", body: "Once your investment is complete, you receive fixed interest payments according to the offer terms." }
      ]
    },
    fields: [field("heading", "Heading"), field("intro", "Intro", "textarea")],
    repeats: [{ key: "steps", label: "Steps", itemFields: [field("numberImage", "Number image filename"), field("title", "Title"), field("body", "Body", "textarea")] }]
  },
  rateCards: {
    label: "Rate comparison cards",
    defaults: {
      heading: "How our rates compare",
      intro: "We don’t do teaser rates, promotions, or tiered rates based on how much you invest.",
      cards: [
        { label: "Today", value: "4-5.35%", color: "pink" },
        { label: "2025 avg", value: "4.2%", color: "teal" },
        { label: "2024 avg", value: "4.2%", color: "yellow" },
        { label: "2023 avg", value: "4.1%", color: "grey" }
      ]
    },
    fields: [field("heading", "Heading"), field("intro", "Intro", "textarea")],
    repeats: [{ key: "cards", label: "Rate cards", itemFields: [field("label", "Label"), field("value", "Value"), field("color", "Colour", "select", [["pink", "Pink"], ["teal", "Teal"], ["yellow", "Yellow"], ["grey", "Grey"], ["indigo", "Indigo"]])] }]
  },
  caseStudyRows: {
    label: "Case study rows",
    defaults: {
      heading: "Real positive stories",
      intro: "Placeholder intro for impact-led editorial rows or campaign story modules.",
      stories: [
        { imageUrl: sampleImages.caseStudy, imageAlt: "Green public space project", title: "Greening the grey in Hammersmith & Fulham", body: "Transforming hard, grey spaces into vibrant green areas, enhancing biodiversity and climate resilience.", linkLabel: "Read more", linkUrl: "#" },
        { imageUrl: sampleImages.caseStudy, imageAlt: "Leisure centre green upgrade", title: "Creating greener leisure facilities", body: "Investing in ways to reduce the environmental impact of local leisure facilities.", linkLabel: "Watch the video", linkUrl: "#" },
        { imageUrl: sampleImages.caseStudy, imageAlt: "Electric vehicle charging project", title: "Driving greener in the Cotswolds", body: "Installing electric vehicle chargers and making greener transport options more accessible.", linkLabel: "Watch the video", linkUrl: "#" }
      ]
    },
    fields: [field("heading", "Heading"), field("intro", "Intro", "textarea")],
    repeats: [{ key: "stories", label: "Stories", itemFields: [field("imageUrl", "Image URL", "url"), field("imageAlt", "Image alt text"), field("title", "Title"), field("body", "Body", "textarea"), field("linkLabel", "Text link label"), field("linkUrl", "Text link URL", "url")] }]
  },
  statsTable: {
    label: "Stats + bars",
    defaults: {
      heading: "How councils have spent the money",
      intro: "Hard-coded email-safe bars using all-caps report project allocations.",
      stats: "Amount spent|£9.68m\nProjects|66\nInvestors|32",
      bars: "Renewable energy|£3.68m|92|pink\nEnergy efficiency|£1.88m|70|teal\nClean transportation|£994k|55|yellow\nClimate change adaptation|£861k|48|pink"
    },
    fields: [
      field("heading", "Heading"),
      field("intro", "Intro", "textarea"),
      field("stats", "Stats, one per line as Label|Value", "textarea"),
      field("bars", "Bars as Label|Value|Percent|Colour", "textarea")
    ]
  },
  statColorCards: {
    label: "Stat colour cards",
    defaults: {
      heading: "Stat colour card stack",
      intro: "Use compact coloured cards for key offer facts, summaries or council metrics.",
      cards: [
        { eyebrow: "Rate of return", value: "4.2%", body: "Fixed yearly return for the example offer shown here.", color: "pink" },
        { eyebrow: "Minimum investment", value: "£5", body: "Start investing from a small amount.", color: "yellow" },
        { eyebrow: "Investors", value: "680", body: "Example number of people invested.", color: "teal" },
        { eyebrow: "Fees", value: "£0", body: "No investing fees from Abundance.", color: "grey" }
      ]
    },
    fields: [field("heading", "Heading"), field("intro", "Intro", "textarea")],
    repeats: [{ key: "cards", label: "Stat cards", itemFields: [field("eyebrow", "Eyebrow"), field("value", "Value"), field("body", "Body", "textarea"), field("color", "Colour", "select", [["pink", "Pink"], ["teal", "Teal"], ["yellow", "Yellow"], ["grey", "Grey"], ["indigo", "Indigo"]])] }]
  },
  maskedCta: {
    label: "Masked CTA section",
    defaults: {
      mask: "pink",
      heading: "Make a difference",
      body: "Every pound invested is connected to real projects. We report on what is being funded, how projects are progressing and what your investment helps make possible.",
      statOneValue: "65",
      statOneLabel: "projects financed so far",
      statTwoValue: "£9.6m",
      statTwoLabel: "spent on projects so far",
      ctaLabel: "Learn more",
      ctaUrl: "https://www.abundanceinvestment.com/make-a-positive-difference"
    },
    fields: [
      field("mask", "Mask colour", "select", maskOptions.map(([value, label]) => [value, label])),
      field("heading", "Heading"),
      field("body", "Body", "textarea"),
      field("statOneValue", "Stat 1 value"),
      field("statOneLabel", "Stat 1 label"),
      field("statTwoValue", "Stat 2 value"),
      field("statTwoLabel", "Stat 2 label"),
      field("ctaLabel", "Button label"),
      field("ctaUrl", "Button URL", "url")
    ]
  },
  maskedImageCta: {
    label: "Masked image CTA section",
    defaults: {
      mask: "pink",
      imageUrl: sampleImages.place,
      imageAlt: "Project and place image",
      heading: "See where the money goes",
      body: "A shorter image-led version for impact storytelling or project updates.",
      ctaLabel: "View impact stories",
      ctaUrl: "https://www.abundanceinvestment.com/make-a-positive-difference"
    },
    fields: [
      field("mask", "Mask colour", "select", maskOptions.map(([value, label]) => [value, label])),
      field("imageUrl", "Image URL", "url"),
      field("imageAlt", "Image alt text"),
      field("heading", "Heading"),
      field("body", "Body", "textarea"),
      field("ctaLabel", "Button label"),
      field("ctaUrl", "Button URL", "url")
    ]
  },
  investmentCard: {
    label: "Open investment card",
    defaults: {
      imageUrl: sampleImages.camden,
      imageAlt: "Camden Climate Investment tile",
      title: "Camden Climate Investment 2027",
      body: "Funding EV charging facilities, electrifying council vehicles, green energy measures and greening streets.",
      statOneLabel: "Return",
      statOneValue: "4.2%",
      statTwoLabel: "Term",
      statTwoValue: "5 years",
      ctaLabel: "Invest now",
      ctaUrl: "https://www.abundanceinvestment.com/invest/camden-climate-investment-2027"
    },
    fields: [field("imageUrl", "Image URL", "url"), field("imageAlt", "Image alt text"), field("title", "Title"), field("body", "Body", "textarea"), field("statOneLabel", "Stat 1 label"), field("statOneValue", "Stat 1 value"), field("statTwoLabel", "Stat 2 label"), field("statTwoValue", "Stat 2 value"), field("ctaLabel", "Button label"), field("ctaUrl", "Button URL", "url")]
  },
  twoUpImageCards: {
    label: "2-up image cards",
    defaults: {
      cards: [
        { imageUrl: sampleImages.tileOne, imageAlt: "Camden investment tile", title: "Camden Climate Investment 2027", body: "Fund local climate work through a municipal investment.", ctaLabel: "Invest now", ctaUrl: "#" },
        { imageUrl: sampleImages.tileTwo, imageAlt: "Glasgow investment tile", title: "Glasgow Green Investment", body: "Support practical local change with fixed interest.", ctaLabel: "Read more", ctaUrl: "#" }
      ]
    },
    fields: [],
    repeats: [{ key: "cards", label: "Image cards", itemFields: [field("imageUrl", "Image URL", "url"), field("imageAlt", "Image alt text"), field("title", "Title"), field("body", "Body", "textarea"), field("ctaLabel", "Button label"), field("ctaUrl", "Button URL", "url")] }]
  },
  nextSteps: {
    label: "Next steps links",
    defaults: {
      heading: "Next steps",
      links: [
        { title: "Browse investments", body: "See current opportunities and choose what suits your goals.", linkLabel: "Browse now", linkUrl: "#" },
        { title: "Read the help centre", body: "Find answers about ISAs, risk, selling and payments.", linkLabel: "Visit help centre", linkUrl: "#" },
        { title: "Understand risk", body: "Read the key risk information before making investment decisions.", linkLabel: "Read more", linkUrl: "#" }
      ]
    },
    fields: [field("heading", "Heading")],
    repeats: [{ key: "links", label: "Links", itemFields: [field("title", "Title"), field("body", "Body", "textarea"), field("linkLabel", "Link label"), field("linkUrl", "Link URL", "url")] }]
  },
  newsRows: {
    label: "News rows",
    defaults: {
      heading: "News and insight",
      articles: [
        { imageUrl: sampleImages.news, imageAlt: "Local project detail", title: "What makes council investments different?", body: "A short description for an article or update.", linkLabel: "Read article", linkUrl: "#" },
        { imageUrl: sampleImages.place, imageAlt: "Project location", title: "Five things to check before investing", body: "A practical guide for investors.", linkLabel: "Read guide", linkUrl: "#" }
      ]
    },
    fields: [field("heading", "Heading")],
    repeats: [{ key: "articles", label: "Articles", itemFields: [field("imageUrl", "Image URL", "url"), field("imageAlt", "Image alt text"), field("title", "Title"), field("body", "Body", "textarea"), field("linkLabel", "Link label"), field("linkUrl", "Link URL", "url")] }]
  },
  quoteBlock: {
    label: "Quote block",
    defaults: {
      quote: "Abundance has helped us connect residents directly with practical local climate projects.",
      imageUrl: sampleImages.headshot,
      imageAlt: "Portrait",
      name: "Councillor name",
      role: "Council spokesperson"
    },
    fields: [field("quote", "Quote", "textarea"), field("imageUrl", "Headshot URL", "url"), field("imageAlt", "Headshot alt text"), field("name", "Name"), field("role", "Role")]
  },
  transferDetails: {
    label: "Transfer details",
    defaults: {
      heading: "Transfer details",
      intro: "Use this system-style card for bank, transfer or payment instructions.",
      rows: "Account name|Abundance Investment Ltd\nSort code|00-00-00\nAccount number|12345678\nReference|{{ payment_reference }}"
    },
    fields: [field("heading", "Heading"), field("intro", "Intro", "textarea"), field("rows", "Rows as Label|Value", "textarea")]
  },
  dataTable: {
    label: "Data table",
    defaults: {
      heading: "Investment history",
      columns: "Investment|Amount|Status",
      rows: "H&F Green Investment 2025|£500|Active\nH&F Green Investment 2024|£250|Active\nH&F Green Investment 2023|£250|Repaid"
    },
    fields: [field("heading", "Heading"), field("columns", "Columns as A|B|C", "textarea"), field("rows", "Rows as A|B|C", "textarea")]
  },
  faqRows: {
    label: "FAQ rows",
    defaults: {
      heading: "Investing FAQs",
      faqs: [
        { question: "Can I sell early?", answer: "Investments may be hard to sell. Where available, the marketplace can help you find another investor." },
        { question: "Are returns guaranteed?", answer: "No. Capital is at risk and returns are not guaranteed." }
      ]
    },
    fields: [field("heading", "Heading")],
    repeats: [{ key: "faqs", label: "FAQs", itemFields: [field("question", "Question"), field("answer", "Answer", "textarea")] }]
  },
  systemHeading: {
    label: "System heading + paragraphs",
    defaults: {
      heading: "Invitation to negotiate a trade on the marketplace ({listing_transaction_id})",
      body: "Hi {user_first_name},\n\nA buyer and seller have been matched on the marketplace. Please review the details below and reply to confirm your agreement."
    },
    fields: [field("heading", "Heading"), field("body", "Body", "textarea")]
  },
  bulletList: {
    label: "Bullet list",
    defaults: {
      heading: "Bullet list",
      items: "Use for short confirmation details.\nKeep each item brief and scannable.\nInclude only action-critical information."
    },
    fields: [field("heading", "Heading"), field("items", "Items, one per line", "textarea")]
  },
  numberedList: {
    label: "Numbered list",
    defaults: {
      heading: "What do you need to do?",
      items: "Come to an agreement on the trade.\nConfirm your agreement to Abundance in writing.\nOnce both parties have replied, we will complete the trade."
    },
    fields: [field("heading", "Heading"), field("items", "Items, one per line", "textarea")]
  },
  buttonRow: {
    label: "Button row",
    defaults: { ctaLabel: "Reply to confirm", ctaUrl: "mailto:trades@abundanceinvestment.com", color: "pink" },
    fields: [field("ctaLabel", "Button label"), field("ctaUrl", "Button URL", "url"), field("color", "Colour", "select", [["pink", "Pink"], ["teal", "Teal"], ["indigo", "Indigo"], ["ink", "Ink"]])]
  },
  tableCard: {
    label: "Table card",
    defaults: {
      heading: "Simple table inside a card",
      rows: "Minimum investment|£5\nInterest payment|Every 6 months\nInvesting fees|None"
    },
    fields: [field("heading", "Heading"), field("rows", "Rows as Label|Value", "textarea")]
  },
  warning: {
    label: "Warning/disclaimer",
    defaults: {
      heading: "Important information",
      body: "Investments are long term and may be hard to sell. This email is not financial advice."
    },
    fields: [field("heading", "Heading"), field("body", "Body", "textarea")]
  },
  footer: {
    label: "Footer",
    defaults: {
      footerColor: "yellow",
      address: "{{ html_postal_address }}",
      fca: "We are authorised and regulated by the Financial Conduct Authority (525432)",
      legal: "You received this email because you are an Abundance account holder."
    },
    fields: [
      field("footerColor", "Footer colour", "select", [["yellow", "Yellow"], ["grey", "Grey"]]),
      field("address", "Address / placeholder", "textarea"),
      field("fca", "FCA copy", "textarea"),
      field("legal", "Legal copy", "textarea")
    ]
  }
};

const starterEmail = {
  name: "Example Abundance content email",
  subject: "How it works",
  previewText: "How Abundance municipal investments work.",
  blocks: [
    block("header"),
    block("hero"),
    block("divider"),
    block("simpleContent", {
      heading: "A simple content section",
      body: "This starter email is intentionally short. Add rows from the picker to build out a full campaign, onboarding or system email."
    }),
    block("footer")
  ]
};

let state = loadState();
let selectedId = state.blocks[0]?.id || null;
let draggedId = null;

const els = {
  picker: document.getElementById("blockPicker"),
  addBlockButton: document.getElementById("addBlockButton"),
  list: document.getElementById("blockList"),
  frame: document.getElementById("previewFrame"),
  rowPreviewFrame: document.getElementById("rowPreviewFrame"),
  selectedRowName: document.getElementById("selectedRowName"),
  emailName: document.getElementById("emailName"),
  subjectLine: document.getElementById("subjectLine"),
  previewText: document.getElementById("previewText"),
  saveButton: document.getElementById("saveButton"),
  loadButton: document.getElementById("loadButton"),
  loadInput: document.getElementById("loadInput"),
  copyHtmlButton: document.getElementById("copyHtmlButton"),
  downloadHtmlButton: document.getElementById("downloadHtmlButton"),
  resetButton: document.getElementById("resetButton"),
  mobilePreview: document.getElementById("mobilePreview"),
  previewPanel: document.querySelector(".preview-column"),
  toast: document.getElementById("toast")
};

render();

function field(key, label, type = "text", options = []) {
  return { key, label, type, options };
}

function block(type, overrides = {}) {
  return {
    id: `${type}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type,
    fields: structuredCloneSafe({ ...blockSchemas[type].defaults, ...overrides })
  };
}

function structuredCloneSafe(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  const saved = localStorage.getItem("abundance-email-builder");
  if (!saved) return structuredCloneSafe(starterEmail);
  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed.blocks)) throw new Error("No blocks");
    return parsed;
  } catch {
    return structuredCloneSafe(starterEmail);
  }
}

function persist() {
  localStorage.setItem("abundance-email-builder", JSON.stringify(state));
}

function render() {
  els.emailName.value = state.name || "";
  els.subjectLine.value = state.subject || "";
  els.previewText.value = state.previewText || "";
  renderPicker();
  renderList();
  renderSelectedRowPreview();
  renderPreview();
  persist();
}

function renderPicker() {
  const selected = els.picker.value;
  els.picker.innerHTML = Object.entries(blockSchemas).map(([type, schema]) => (
    `<option value="${escapeAttr(type)}">${escapeHtml(schema.label)}</option>`
  )).join("");
  if (selected && blockSchemas[selected]) els.picker.value = selected;
}

function renderList() {
  if (!state.blocks.length) {
    els.list.innerHTML = `<p class="empty">Add a row to start building.</p>`;
    return;
  }

  els.list.innerHTML = state.blocks.map((item, index) => {
    const schema = blockSchemas[item.type];
    const isSelected = item.id === selectedId;
    return `
      <article class="block-item${draggedId === item.id ? " dragging" : ""}" draggable="true" data-id="${item.id}">
        <div class="block-summary">
          <div class="block-title">
            <span class="drag-handle" title="Drag to reorder">::</span>
            <span>${index + 1}. ${escapeHtml(schema.label)}</span>
          </div>
          <div class="block-actions">
            <button type="button" data-select="${item.id}">${isSelected ? "Close" : "Edit"}</button>
            <button type="button" data-duplicate="${item.id}">Duplicate</button>
            <button type="button" data-up="${item.id}">Up</button>
            <button type="button" data-down="${item.id}">Down</button>
            <button type="button" data-delete="${item.id}">Delete</button>
          </div>
        </div>
        ${isSelected ? renderFields(item, schema) : ""}
      </article>
    `;
  }).join("");
}

function renderFields(item, schema) {
  const fieldMarkup = schema.fields.map((spec) => renderInput(item.id, `fields.${spec.key}`, item.fields[spec.key], spec)).join("");
  const repeatMarkup = (schema.repeats || []).map((repeat) => renderRepeat(item, repeat)).join("");
  return `<div class="fields">${fieldMarkup}${repeatMarkup}</div>`;
}

function renderRepeat(item, repeat) {
  const rows = item.fields[repeat.key] || [];
  return `
    <div class="repeat-group">
      <div class="repeat-title">
        <span>${escapeHtml(repeat.label)}</span>
        <button type="button" data-add-repeat="${item.id}:${repeat.key}">Add item</button>
      </div>
      ${rows.map((row, index) => `
        <div class="repeat-group">
          <div class="repeat-title">
            <span>${escapeHtml(repeat.label)} ${index + 1}</span>
            <button type="button" data-delete-repeat="${item.id}:${repeat.key}:${index}">Remove</button>
          </div>
          ${repeat.itemFields.map((spec) => renderInput(item.id, `fields.${repeat.key}.${index}.${spec.key}`, row[spec.key], spec)).join("")}
        </div>
      `).join("")}
    </div>
  `;
}

function renderInput(id, path, value, spec) {
  const inputId = `${id}-${path}`.replaceAll(".", "-");
  if (spec.type === "textarea") {
    return `<label for="${inputId}">${escapeHtml(spec.label)}<textarea id="${inputId}" data-path="${id}:${path}">${escapeHtml(value || "")}</textarea></label>`;
  }
  if (spec.type === "select") {
    return `<label for="${inputId}">${escapeHtml(spec.label)}<select id="${inputId}" data-path="${id}:${path}">${spec.options.map(([optionValue, optionLabel]) => `<option value="${escapeAttr(optionValue)}"${String(value) === String(optionValue) ? " selected" : ""}>${escapeHtml(optionLabel)}</option>`).join("")}</select></label>`;
  }
  return `<label for="${inputId}">${escapeHtml(spec.label)}<input id="${inputId}" type="${spec.type === "url" ? "url" : "text"}" value="${escapeAttr(value || "")}" data-path="${id}:${path}"></label>`;
}

els.addBlockButton.addEventListener("click", () => {
  const item = block(els.picker.value);
  state.blocks.push(item);
  selectedId = item.id;
  render();
});

els.picker.addEventListener("change", renderSelectedRowPreview);

document.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;

  const selectId = target.dataset.select;
  if (selectId) {
    selectedId = selectedId === selectId ? null : selectId;
    render();
    return;
  }

  const duplicateId = target.dataset.duplicate;
  if (duplicateId) {
    const index = state.blocks.findIndex((item) => item.id === duplicateId);
    const copy = structuredCloneSafe(state.blocks[index]);
    copy.id = `${copy.type}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    state.blocks.splice(index + 1, 0, copy);
    selectedId = copy.id;
    render();
    return;
  }

  const deleteId = target.dataset.delete;
  if (deleteId) {
    state.blocks = state.blocks.filter((item) => item.id !== deleteId);
    if (selectedId === deleteId) selectedId = state.blocks[0]?.id || null;
    render();
    return;
  }

  const upId = target.dataset.up;
  if (upId) moveBlock(upId, -1);

  const downId = target.dataset.down;
  if (downId) moveBlock(downId, 1);

  const addRepeat = target.dataset.addRepeat;
  if (addRepeat) {
    const [id, key] = addRepeat.split(":");
    const item = state.blocks.find((entry) => entry.id === id);
    const schema = blockSchemas[item.type].repeats.find((repeat) => repeat.key === key);
    const empty = Object.fromEntries(schema.itemFields.map((spec) => [spec.key, ""]));
    item.fields[key].push(empty);
    render();
  }

  const deleteRepeat = target.dataset.deleteRepeat;
  if (deleteRepeat) {
    const [id, key, index] = deleteRepeat.split(":");
    const item = state.blocks.find((entry) => entry.id === id);
    item.fields[key].splice(Number(index), 1);
    render();
  }
});

document.addEventListener("input", (event) => {
  if (event.target === els.emailName) state.name = event.target.value;
  if (event.target === els.subjectLine) state.subject = event.target.value;
  if (event.target === els.previewText) state.previewText = event.target.value;

  const path = event.target.dataset.path;
  if (path) {
    const [id, fieldPath] = path.split(":");
    const item = state.blocks.find((entry) => entry.id === id);
    setPath(item, fieldPath, event.target.value);
  }
  renderPreview();
  persist();
});

els.saveButton.addEventListener("click", () => {
  download(`${slug(state.name || "abundance-email")}.abundance-email.json`, JSON.stringify(state, null, 2), "application/json");
});

els.loadButton.addEventListener("click", () => els.loadInput.click());

els.loadInput.addEventListener("change", async () => {
  const file = els.loadInput.files[0];
  if (!file) return;
  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed.blocks)) throw new Error("File does not contain blocks");
    state = parsed;
    selectedId = state.blocks[0]?.id || null;
    render();
    toast("Email loaded");
  } catch (error) {
    toast(`Could not load file: ${error.message}`);
  } finally {
    els.loadInput.value = "";
  }
});

els.copyHtmlButton.addEventListener("click", async () => {
  const html = renderEmailHtml(state);
  try {
    await navigator.clipboard.writeText(html);
    toast("HTML copied");
  } catch {
    const area = document.createElement("textarea");
    area.value = html;
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.append(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    toast("HTML copied");
  }
});

els.downloadHtmlButton.addEventListener("click", () => {
  download(`${slug(state.name || "abundance-email")}.html`, renderEmailHtml(state), "text/html");
});

els.resetButton.addEventListener("click", () => {
  state = structuredCloneSafe(starterEmail);
  selectedId = state.blocks[0]?.id || null;
  render();
});

els.mobilePreview.addEventListener("change", () => {
  els.previewPanel.classList.toggle("mobile", els.mobilePreview.checked);
});

els.list.addEventListener("dragstart", (event) => {
  const item = event.target.closest(".block-item");
  if (!item) return;
  draggedId = item.dataset.id;
  event.dataTransfer.effectAllowed = "move";
});

els.list.addEventListener("dragover", (event) => {
  event.preventDefault();
  const item = event.target.closest(".block-item");
  if (!item || !draggedId || item.dataset.id === draggedId) return;
  const from = state.blocks.findIndex((entry) => entry.id === draggedId);
  const to = state.blocks.findIndex((entry) => entry.id === item.dataset.id);
  const [moved] = state.blocks.splice(from, 1);
  state.blocks.splice(to, 0, moved);
  renderList();
});

els.list.addEventListener("dragend", () => {
  draggedId = null;
  render();
});

function moveBlock(id, direction) {
  const index = state.blocks.findIndex((item) => item.id === id);
  const next = index + direction;
  if (next < 0 || next >= state.blocks.length) return;
  const [item] = state.blocks.splice(index, 1);
  state.blocks.splice(next, 0, item);
  render();
}

function setPath(item, path, value) {
  const parts = path.split(".");
  let cursor = item;
  for (let index = 0; index < parts.length - 1; index += 1) {
    cursor = cursor[parts[index]];
  }
  cursor[parts.at(-1)] = value;
}

function renderPreview() {
  els.frame.srcdoc = renderEmailHtml(state);
}

function renderSelectedRowPreview() {
  const type = els.picker.value || Object.keys(blockSchemas)[0];
  const previewBlock = block(type);
  els.selectedRowName.textContent = `Row preview: ${blockSchemas[type].label}`;
  els.rowPreviewFrame.srcdoc = renderEmailHtml({
    name: `${blockSchemas[type].label} preview`,
    subject: `${blockSchemas[type].label} preview`,
    previewText: "",
    blocks: [previewBlock]
  });
}

function renderEmailHtml(email) {
  const body = email.blocks.map(renderBlock).join("\n");
  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>${escapeHtml(email.subject || email.name || "Abundance email")}</title>
  <style>
    html, body { margin:0 !important; padding:0 !important; width:100% !important; height:100% !important; }
    * { -ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; }
    table, td { border-collapse:collapse !important; mso-table-lspace:0pt !important; mso-table-rspace:0pt !important; }
    img { -ms-interpolation-mode:bicubic; border:0; outline:none; text-decoration:none; }
    a { text-decoration:underline; }
    .cta-link { border-radius:999px !important; overflow:hidden !important; }
    @media screen and (max-width:640px) {
      .email-container { width:100% !important; max-width:100% !important; min-width:0 !important; }
      .mobile-pad { padding-left:20px !important; padding-right:20px !important; box-sizing:border-box !important; }
      .mobile-stack { display:block !important; width:100% !important; max-width:100% !important; box-sizing:border-box !important; padding-left:0 !important; padding-right:0 !important; padding-bottom:16px !important; }
      .mobile-stack-spacer { display:block !important; width:100% !important; height:12px !important; }
      .hero-title { font-size:38px !important; line-height:40px !important; }
      .section-title { font-size:31px !important; line-height:34px !important; }
      .body-lg { font-size:18px !important; line-height:28px !important; }
      .cta-link { display:block !important; }
      .mobile-image { width:100% !important; max-width:260px !important; height:auto !important; margin:0 auto !important; }
    }
  </style>
</head>
<body width="100%" style="margin:0;padding:0;background-color:${colors.page};">
  <center role="article" aria-roledescription="email" aria-label="${escapeAttr(email.name || "Abundance email")}" lang="en" style="width:100%;background-color:${colors.page};">
    <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;font-family:Arial,sans-serif;color:${colors.page};">${escapeHtml(email.previewText || "")}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${colors.page};">
      <tr>
        <td align="center">
          <table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" class="email-container" style="width:640px;max-width:640px;background-color:#ffffff;">
${body}
          </table>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>`;
}

function renderBlock(item) {
  const fields = item.fields;
  const renderers = {
    header: () => row(`<td class="mobile-pad" style="padding:24px 32px 24px 32px;background-color:#ffffff;border-bottom:4px solid ${colors.ink};">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
        <td valign="middle" align="left"><a href="https://www.abundanceinvestment.com" style="text-decoration:none;"><img src="${LOGO}" width="172" alt="Abundance Investment" style="display:block;width:172px;max-width:172px;height:auto;border:0;font-family:Georgia,Cambria,'Times New Roman',Times,serif;letter-spacing:-0.02em;font-size:26px;line-height:30px;font-weight:bold;color:${colors.ink};"></a></td>
        <td valign="middle" align="right" style="padding-left:16px;"><a href="${escapeAttr(fields.loginUrl)}" style="${textStyle("15px", "20px", colors.pinkDark)}font-weight:bold;text-decoration:underline;">${escapeHtml(fields.loginLabel)}</a></td>
      </tr></table>
    </td>`),
    hero: () => row(`<td class="mobile-pad" style="padding:34px 32px 30px 32px;background-color:#ffffff;">
      <h1 class="hero-title" style="${headingStyle("44px", "46px")}margin:0 0 16px 0;">${escapeHtml(fields.heading)}</h1>
      ${paragraph(fields.body, "body-lg", "18px", "29px", "0 0 20px 0")}
      ${renderInlineLinks(fields.links)}
    </td>`),
    divider: () => row(`<td style="padding:${number(fields.spacing, 18)}px 0;line-height:0;font-size:0;background-color:#ffffff;"><img src="${CDN}/${escapeAttr(fields.image)}" width="640" height="74" alt="" role="presentation" style="display:block;width:100%;max-width:640px;height:auto;border:0;"></td>`),
    imageText: () => row(`<td class="mobile-pad" style="padding:8px 32px 28px 32px;background-color:#ffffff;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
        <td class="mobile-stack" width="218" valign="top" style="width:218px;padding:0 24px 0 0;"><img class="mobile-image" src="${escapeAttr(fields.imageUrl)}" width="172" alt="${escapeAttr(fields.imageAlt)}" style="display:block;width:172px;max-width:172px;height:auto;border:0;color:${colors.ink};font-family:Arial,sans-serif;font-size:13px;line-height:18px;"></td>
        <td class="mobile-stack" valign="top"><h2 style="${headingStyle("27px", "31px")}margin:0 0 10px 0;">${escapeHtml(fields.heading)}</h2>${paragraph(fields.body, "", "16px", "25px", "0 0 14px 0")}<a href="${escapeAttr(fields.linkUrl)}" style="${textStyle("15px", "22px", colors.pinkDark)}font-weight:bold;text-decoration:underline;">${escapeHtml(fields.linkLabel)}</a></td>
      </tr></table>
    </td>`),
    simpleContent: () => row(`<td class="mobile-pad" style="padding:12px 32px 34px 32px;background-color:#ffffff;">${fields.eyebrow ? eyebrow(fields.eyebrow) : ""}<h2 class="section-title" style="${headingStyle("36px", "39px")}margin:0 0 16px 0;">${escapeHtml(fields.heading)}</h2>${paragraph(fields.body, "body-lg", "18px", "29px", fields.ctaLabel ? "0 0 22px 0" : "0")}${fields.ctaLabel ? button(fields.ctaLabel, fields.ctaUrl, colors.pinkDark, colors.pink) : ""}</td>`),
    featureCards: () => row(`<td class="mobile-pad" style="padding:8px 32px 34px 32px;background-color:#ffffff;"><h2 class="section-title" style="${headingStyle("36px", "39px")}margin:0 0 16px 0;">${escapeHtml(fields.heading)}</h2>${paragraph(fields.intro, "body-lg", "18px", "29px", "0 0 22px 0")}${renderFeatureCards(fields.cards)}</td>`),
    twoUpCards: () => row(`<td class="mobile-pad" style="padding:8px 32px 42px 32px;background-color:#ffffff;"><h2 class="section-title" style="${headingStyle("32px", "35px")}margin:0 0 10px 0;">${escapeHtml(fields.heading)}</h2>${paragraph(fields.intro, "", "15px", "23px", "0 0 18px 0")}${renderTwoUpCards(fields.cards)}</td>`),
    threeUpBlobCards: () => row(`<td class="mobile-pad" style="padding:8px 32px 34px 32px;background-color:#ffffff;"><h2 class="section-title" style="${headingStyle("32px", "35px")}margin:0 0 10px 0;">${escapeHtml(fields.heading)}</h2>${paragraph(fields.intro, "", "15px", "23px", "0 0 20px 0")}${renderThreeUpCards(fields.cards)}</td>`),
    stepsList: () => row(`<td class="mobile-pad" style="padding:8px 32px 34px 32px;background-color:#ffffff;">${card(`<h2 class="section-title" style="${headingStyle("32px", "35px")}margin:0 0 8px 0;">${escapeHtml(fields.heading)}</h2>${paragraph(fields.intro, "", "16px", "25px", "0 0 20px 0")}${renderSteps(fields.steps)}`)}</td>`),
    rateCards: () => row(`<td class="mobile-pad" style="padding:8px 32px 34px 32px;background-color:#ffffff;"><h2 class="section-title" style="${headingStyle("34px", "37px")}margin:0 0 16px 0;">${escapeHtml(fields.heading)}</h2>${paragraph(fields.intro, "", "15px", "23px", "0 0 18px 0")}${renderRateCards(fields.cards)}</td>`),
    caseStudyRows: () => row(`<td class="mobile-pad" style="padding:8px 32px 34px 32px;background-color:#ffffff;"><h2 class="section-title" style="${headingStyle("32px", "35px")}margin:0 0 12px 0;">${escapeHtml(fields.heading)}</h2>${paragraph(fields.intro, "", "15px", "23px", "0 0 18px 0")}${renderCaseRows(fields.stories)}</td>`),
    statsTable: () => row(`<td class="mobile-pad" style="padding:8px 32px 34px 32px;background-color:#ffffff;">${card(`<h2 class="section-title" style="${headingStyle("32px", "35px")}margin:0 0 10px 0;">${escapeHtml(fields.heading)}</h2>${paragraph(fields.intro, "", "15px", "23px", "0 0 18px 0")}${renderStats(fields.stats)}${renderBars(fields.bars)}`)}</td>`),
    statColorCards: () => row(`<td class="mobile-pad" style="padding:8px 32px 34px 32px;background-color:#ffffff;"><h2 class="section-title" style="${headingStyle("32px", "35px")}margin:0 0 12px 0;">${escapeHtml(fields.heading)}</h2>${paragraph(fields.intro, "", "15px", "23px", "0 0 18px 0")}${renderStatColorCards(fields.cards)}</td>`),
    maskedCta: () => renderMaskedCta(fields),
    maskedImageCta: () => renderMaskedImageCta(fields),
    investmentCard: () => row(`<td class="mobile-pad" style="padding:8px 32px 34px 32px;background-color:#ffffff;">${renderInvestmentCard(fields)}</td>`),
    twoUpImageCards: () => row(`<td class="mobile-pad" style="padding:8px 32px 42px 32px;background-color:#ffffff;">${renderTwoUpImageCards(fields.cards)}</td>`),
    nextSteps: () => row(`<td class="mobile-pad" style="padding:26px 32px;background-color:${colors.teal};"><h2 class="section-title" style="${headingStyle("34px", "37px")}margin:0 0 18px 0;">${escapeHtml(fields.heading)}</h2>${renderNextSteps(fields.links)}</td>`),
    newsRows: () => row(`<td class="mobile-pad" style="padding:8px 32px 34px 32px;background-color:#ffffff;"><h2 class="section-title" style="${headingStyle("34px", "37px")}margin:0 0 20px 0;">${escapeHtml(fields.heading)}</h2>${renderNewsRows(fields.articles)}</td>`),
    quoteBlock: () => row(`<td class="mobile-pad" style="padding:8px 32px 34px 32px;background-color:#ffffff;">${renderQuote(fields)}</td>`),
    transferDetails: () => row(`<td class="mobile-pad" style="padding:8px 32px 34px 32px;background-color:#ffffff;">${card(`<h2 class="section-title" style="${headingStyle("32px", "35px")}margin:0 0 12px 0;">${escapeHtml(fields.heading)}</h2>${paragraph(fields.intro, "", "15px", "23px", "0 0 18px 0")}${renderTransferDetails(fields.rows)}`)}</td>`),
    dataTable: () => row(`<td class="mobile-pad" style="padding:8px 32px 34px 32px;background-color:#ffffff;">${card(`<h2 class="section-title" style="${headingStyle("32px", "35px")}margin:0 0 16px 0;">${escapeHtml(fields.heading)}</h2>${renderDataTable(fields.columns, fields.rows)}`)}</td>`),
    faqRows: () => row(`<td class="mobile-pad" style="padding:8px 32px 34px 32px;background-color:#ffffff;"><h2 class="section-title" style="${headingStyle("32px", "35px")}margin:0 0 18px 0;">${escapeHtml(fields.heading)}</h2>${renderFaqRows(fields.faqs)}</td>`),
    systemHeading: () => row(`<td class="mobile-pad" style="padding:34px 32px 24px 32px;background-color:#ffffff;"><h1 class="hero-title" style="${headingStyle("38px", "41px")}margin:0 0 20px 0;">${escapeHtml(fields.heading)}</h1>${paragraph(fields.body, "", "16px", "25px", "0 0 18px 0")}</td>`),
    bulletList: () => row(`<td class="mobile-pad" style="padding:8px 32px 28px 32px;background-color:#ffffff;"><h2 style="${headingStyle("24px", "27px")}margin:0 0 12px 0;">${escapeHtml(fields.heading)}</h2>${renderListItems(fields.items, "ul")}</td>`),
    numberedList: () => row(`<td class="mobile-pad" style="padding:8px 32px 28px 32px;background-color:#ffffff;"><h2 class="section-title" style="${headingStyle("30px", "33px")}margin:0 0 16px 0;">${escapeHtml(fields.heading)}</h2>${renderListItems(fields.items, "ol")}</td>`),
    buttonRow: () => row(`<td class="mobile-pad" style="padding:0 32px 38px 32px;background-color:#ffffff;">${button(fields.ctaLabel, fields.ctaUrl, buttonColor(fields.color).text, buttonColor(fields.color).border)}</td>`),
    tableCard: () => row(`<td class="mobile-pad" style="padding:8px 32px 34px 32px;background-color:#ffffff;">${card(`<h2 style="${headingStyle("27px", "31px")}margin:0 0 16px 0;">${escapeHtml(fields.heading)}</h2>${renderTableRows(fields.rows)}`)}</td>`),
    warning: () => row(`<td class="mobile-pad" style="padding:8px 32px 34px 32px;background-color:#ffffff;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#faf8f8;border-left:4px solid ${colors.pink};border-radius:0 14px 14px 0;border-collapse:separate !important;"><tr><td style="padding:22px;"><h2 style="${headingStyle("30px", "33px")}margin:0 0 14px 0;">${escapeHtml(fields.heading)}</h2>${paragraph(fields.body, "", "16px", "25px", "0")}</td></tr></table></td>`),
    footer: () => renderFooter(fields)
  };
  return renderers[item.type]?.() || "";
}

function renderFeatureCards(cards) {
  const palette = { pink: colors.pink, teal: colors.teal, yellow: colors.yellow, green: "#42c95b" };
  return grid(cards, 2, (cardItem) => `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${palette[cardItem.color] || colors.yellow};border-radius:14px;border-collapse:separate !important;"><tr><td style="padding:18px;"><h3 style="${headingStyle("21px", "24px")}margin:0 0 8px 0;">${escapeHtml(cardItem.title)}</h3>${paragraph(cardItem.body, "", "14px", "21px", "0", colors.ink)}</td></tr></table>`);
}

function renderTwoUpCards(cards) {
  return grid(cards, 2, (item, index) => card(`<h3 style="${headingStyle("24px", "27px")}margin:0 0 10px 0;">${escapeHtml(item.title)}</h3>${paragraph(item.body, "", "14px", "22px", "0 0 18px 0")}${button(item.ctaLabel, item.ctaUrl, index % 2 ? colors.teal : colors.pinkDark, index % 2 ? colors.teal : colors.pink, true)}`));
}

function renderThreeUpCards(cards) {
  return grid(cards, 3, (item) => card(`<img src="${CDN}/${escapeAttr(item.numberImage)}" width="58" height="58" alt="" role="presentation" style="display:block;width:58px;height:58px;border:0;margin:0 0 14px 0;"><h3 style="${headingStyle("21px", "24px")}margin:0 0 8px 0;">${escapeHtml(item.title)}</h3>${paragraph(item.body, "", "14px", "22px", "0 0 12px 0")}<a href="${escapeAttr(item.linkUrl)}" style="${textStyle("14px", "21px", colors.pinkDark)}font-weight:bold;text-decoration:underline;">${escapeHtml(item.linkLabel)}</a>`));
}

function renderSteps(steps) {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${(steps || []).map((step, index) => `<tr><td width="72" valign="top" style="width:72px;padding:0 16px ${index === steps.length - 1 ? "0" : "16px"} 0;"><img src="${CDN}/${escapeAttr(step.numberImage)}" width="58" height="58" alt="Step ${index + 1}" style="display:block;width:58px;height:58px;border:0;"></td><td valign="top" style="padding:0 0 ${index === steps.length - 1 ? "0" : "16px"} 0;"><h3 style="${textStyle("17px", "23px", colors.ink)}font-weight:bold;margin:0 0 4px 0;">${escapeHtml(step.title)}</h3>${paragraph(step.body, "", "15px", "23px", "0")}</td></tr>`).join("")}</table>`;
}

function renderRateCards(cards) {
  return grid(cards, 4, (item) => {
    const bg = palette(item.color);
    return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${bg};border-radius:14px;border-collapse:separate !important;"><tr><td style="padding:16px 12px;"><p style="${textStyle("11px", "15px", colors.ink)}margin:0 0 6px 0;text-transform:uppercase;font-weight:bold;">${escapeHtml(item.label)}</p><p style="${headingStyle("25px", "28px")}margin:0;">${escapeHtml(item.value)}</p></td></tr></table>`;
  });
}

function renderCaseRows(stories) {
  return (stories || []).map((story) => card(`<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr><td class="mobile-stack" width="156" valign="top" style="width:156px;padding:0 18px 0 0;"><img src="${escapeAttr(story.imageUrl)}" width="138" height="138" alt="${escapeAttr(story.imageAlt)}" style="display:block;width:138px;height:138px;border-radius:20px;background-color:${colors.line};object-fit:cover;object-position:center center;"></td><td class="mobile-stack" valign="top"><h3 style="${headingStyle("22px", "25px")}margin:0 0 8px 0;">${escapeHtml(story.title)}</h3>${paragraph(story.body, "", "14px", "21px", "0 0 8px 0")}<a href="${escapeAttr(story.linkUrl)}" style="${textStyle("14px", "21px", colors.pinkDark)}font-weight:bold;text-decoration:underline;">${escapeHtml(story.linkLabel)}</a></td></tr></table>`)).map((html) => `<div style="margin:0 0 12px 0;">${html}</div>`).join("");
}

function renderStatColorCards(cards) {
  return grid(cards, 2, (item) => `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${palette(item.color)};border-radius:18px;border-collapse:separate !important;"><tr><td style="padding:22px;"><p style="${textStyle("12px", "16px", colors.ink)}margin:0 0 8px 0;text-transform:uppercase;font-weight:bold;">${escapeHtml(item.eyebrow)}</p><p style="${headingStyle("34px", "36px")}margin:0 0 8px 0;">${escapeHtml(item.value)}</p>${paragraph(item.body, "", "14px", "21px", "0", colors.ink)}</td></tr></table>`);
}

function renderStats(lines, textColor = colors.body, ruleColor = colors.line) {
  const items = parseLines(lines, 2);
  if (!items.length) return "";
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:18px;"><tr>${items.map(([label, value]) => `<td class="mobile-stack" valign="top" style="padding:0 10px 14px 0;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:3px solid ${ruleColor};"><tr><td style="padding:10px 0 0 0;"><p style="${textStyle("11px", "15px", textColor)}margin:0 0 4px 0;text-transform:uppercase;font-weight:bold;">${escapeHtml(label)}</p><p style="${headingStyle("22px", "25px")}margin:0;color:${textColor};">${escapeHtml(value)}</p></td></tr></table></td>`).join("")}</tr></table>`;
}

function renderBars(lines) {
  return parseLines(lines, 4).map(([label, value, pct, color]) => {
    const fill = { pink: "#f4c8dc", teal: "#bfe9ed", yellow: "#ffe7b4" }[color] || "#f4c8dc";
    return `<p style="${textStyle("13px", "18px", colors.body)}margin:0 0 5px 0;">${escapeHtml(label)} <strong>${escapeHtml(value)}</strong></p><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 12px 0;background-color:#f0eeee;border-radius:999px;border-collapse:separate !important;"><tr><td width="${number(pct, 50)}%" style="background-color:${fill};height:12px;border-radius:999px;font-size:0;line-height:0;">&nbsp;</td><td style="font-size:0;line-height:0;">&nbsp;</td></tr></table>`;
  }).join("");
}

function renderMaskedCta(fields) {
  const mask = maskOptions.find(([value]) => value === fields.mask) || maskOptions[0];
  return `${row(`<td style="padding:0;line-height:0;font-size:0;background-color:#ffffff;"><img src="${CDN}/${mask[2]}" width="640" height="74" alt="" role="presentation" style="display:block;width:100%;max-width:640px;height:auto;border:0;"></td>`)}
${row(`<td class="mobile-pad" style="padding:24px 32px;background-color:${mask[4]};"><h2 class="section-title" style="${headingStyle("36px", "39px")}margin:0 0 14px 0;color:${colors.ink};">${escapeHtml(fields.heading)}</h2>${paragraph(fields.body, "", "16px", "25px", "0 0 20px 0", colors.ink)}${renderStats(`${fields.statOneLabel}|${fields.statOneValue}\n${fields.statTwoLabel}|${fields.statTwoValue}`, colors.ink, colors.ink)}${button(fields.ctaLabel, fields.ctaUrl, colors.ink, colors.ink)}</td>`)}
${row(`<td style="padding:0;line-height:0;font-size:0;background-color:#ffffff;"><img src="${CDN}/${mask[3]}" width="640" height="74" alt="" role="presentation" style="display:block;width:100%;max-width:640px;height:auto;border:0;"></td>`)}`;
}

function renderMaskedImageCta(fields) {
  const mask = maskOptions.find(([value]) => value === fields.mask) || maskOptions[0];
  return `${row(`<td style="padding:0;line-height:0;font-size:0;background-color:#ffffff;"><img src="${CDN}/${mask[2]}" width="640" height="74" alt="" role="presentation" style="display:block;width:100%;max-width:640px;height:auto;border:0;"></td>`)}
${row(`<td class="mobile-pad" style="padding:24px 32px;background-color:${mask[4]};"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr><td class="mobile-stack" width="268" valign="top" style="width:268px;padding:0 24px 0 0;"><img class="mobile-image" src="${escapeAttr(fields.imageUrl)}" width="246" alt="${escapeAttr(fields.imageAlt)}" style="display:block;width:246px;max-width:246px;height:auto;border-radius:28px;background-color:${colors.yellow};"></td><td class="mobile-stack" valign="top"><h2 class="section-title" style="${headingStyle("36px", "39px")}margin:0 0 14px 0;color:${colors.ink};">${escapeHtml(fields.heading)}</h2>${paragraph(fields.body, "", "16px", "25px", "0 0 20px 0", colors.ink)}${button(fields.ctaLabel, fields.ctaUrl, colors.ink, colors.ink)}</td></tr></table></td>`)}
${row(`<td style="padding:0;line-height:0;font-size:0;background-color:#ffffff;"><img src="${CDN}/${mask[3]}" width="640" height="74" alt="" role="presentation" style="display:block;width:100%;max-width:640px;height:auto;border:0;"></td>`)}`;
}

function renderInvestmentCard(fields) {
  return card(`<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr><td class="mobile-stack" width="246" valign="top" style="width:246px;padding:0 22px 0 0;"><img class="mobile-image" src="${escapeAttr(fields.imageUrl)}" width="220" alt="${escapeAttr(fields.imageAlt)}" style="display:block;width:220px;max-width:220px;height:auto;border-radius:24px;background-color:${colors.line};"></td><td class="mobile-stack" valign="top"><h2 style="${headingStyle("29px", "32px")}margin:0 0 10px 0;">${escapeHtml(fields.title)}</h2>${paragraph(fields.body, "", "16px", "25px", "0 0 18px 0")}${renderStats(`${fields.statOneLabel}|${fields.statOneValue}\n${fields.statTwoLabel}|${fields.statTwoValue}`, colors.ink, colors.ink)}${button(fields.ctaLabel, fields.ctaUrl, colors.pinkDark, colors.pink, true)}</td></tr></table>`);
}

function renderTwoUpImageCards(cards) {
  return grid(cards, 2, (item, index) => card(`<img src="${escapeAttr(item.imageUrl)}" width="232" height="132" alt="${escapeAttr(item.imageAlt)}" style="display:block;width:100%;max-width:232px;height:132px;border-radius:20px;background-color:${colors.teal};object-fit:cover;object-position:center center;margin:0 0 18px 0;"><h3 style="${headingStyle("25px", "28px")}margin:0 0 10px 0;">${escapeHtml(item.title)}</h3>${paragraph(item.body, "", "15px", "23px", "0 0 18px 0")}${button(item.ctaLabel, item.ctaUrl, index % 2 ? colors.teal : colors.pinkDark, index % 2 ? colors.teal : colors.pink, true)}`));
}

function renderNextSteps(links) {
  return (links || []).map((item) => `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr><td style="padding:0 0 16px 0;"><h3 style="${headingStyle("22px", "25px")}margin:0 0 6px 0;color:${colors.ink};">${escapeHtml(item.title)}</h3>${paragraph(item.body, "", "15px", "23px", "0 0 8px 0", colors.ink)}<a href="${escapeAttr(item.linkUrl)}" style="${textStyle("15px", "22px", colors.ink)}font-weight:bold;text-decoration:underline;">${escapeHtml(item.linkLabel)}</a></td></tr></table>`).join("");
}

function renderNewsRows(articles) {
  return (articles || []).map((article, index) => `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr><td class="mobile-stack" width="134" valign="top" style="width:134px;padding:${index ? "18px" : "0"} 22px 18px 0;"><img src="${escapeAttr(article.imageUrl)}" width="112" alt="${escapeAttr(article.imageAlt)}" style="display:block;width:112px;max-width:112px;height:auto;border-radius:18px;background-color:${colors.line};"></td><td class="mobile-stack" valign="top" style="padding:${index ? "18px" : "0"} 0 18px 0;${index ? `border-top:1px solid ${colors.line};` : ""}"><h3 style="${headingStyle("22px", "25px")}margin:0 0 8px 0;">${escapeHtml(article.title)}</h3>${paragraph(article.body, "", "14px", "21px", "0 0 8px 0")}<a href="${escapeAttr(article.linkUrl)}" style="${textStyle("14px", "21px", colors.pinkDark)}font-weight:bold;text-decoration:underline;">${escapeHtml(article.linkLabel)}</a></td></tr></table>`).join("");
}

function renderQuote(fields) {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#faf8f8;border-radius:18px;border-collapse:separate !important;"><tr><td style="padding:22px;">${paragraph(fields.quote, "", "16px", "25px", "0 0 18px 0")}<table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr><td width="66" style="width:66px;padding:0 12px 0 0;"><img src="${escapeAttr(fields.imageUrl)}" width="56" height="56" alt="${escapeAttr(fields.imageAlt)}" style="display:block;width:56px;height:56px;border-radius:50%;"></td><td><p style="${textStyle("14px", "20px", colors.ink)}margin:0;font-weight:bold;">${escapeHtml(fields.name)}</p><p style="${textStyle("13px", "19px", colors.body)}margin:0;">${escapeHtml(fields.role)}</p></td></tr></table></td></tr></table>`;
}

function renderTransferDetails(lines) {
  return grid(parseLines(lines, 2).map(([title, value]) => ({ title, value })), 2, (item) => `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#faf8f8;border-radius:18px;border-collapse:separate !important;"><tr><td style="padding:16px;"><p style="${textStyle("12px", "16px", colors.muted)}margin:0 0 6px 0;text-transform:uppercase;font-weight:bold;">${escapeHtml(item.title)}</p><p style="${textStyle("15px", "22px", colors.ink)}margin:0;font-weight:bold;">${escapeHtml(item.value)}</p></td></tr></table>`);
}

function renderDataTable(columns, rows) {
  const cols = parseLines(columns, 1)[0] || [];
  const data = parseLines(rows, 1);
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>${cols.map((col) => `<td style="padding:9px 8px;border-bottom:2px solid ${colors.ink};${textStyle("12px", "17px", colors.ink)}font-weight:bold;">${escapeHtml(col)}</td>`).join("")}</tr>${data.map((rowData, rowIndex) => `<tr>${cols.map((_, colIndex) => `<td style="padding:12px 8px;${rowIndex < data.length - 1 ? `border-bottom:1px solid ${colors.line};` : ""}${textStyle("13px", "19px", colors.body)}">${escapeHtml(rowData[colIndex] || "")}</td>`).join("")}</tr>`).join("")}</table>`;
}

function renderFaqRows(faqs) {
  return (faqs || []).map((faq) => card(`<h3 style="${headingStyle("22px", "25px")}margin:0 0 8px 0;">${escapeHtml(faq.question)}</h3>${paragraph(faq.answer, "", "15px", "23px", "0")}`)).map((html) => `<div style="margin:0 0 12px 0;">${html}</div>`).join("");
}

function renderListItems(items, tag) {
  const rows = String(items || "").split("\n").filter(Boolean);
  return `<${tag} style="margin:0;padding:0 0 0 22px;${textStyle("16px", "25px", colors.body)}">${rows.map((item, index) => `<li style="margin:0 0 ${index === rows.length - 1 ? "0" : "8px"} 0;">${escapeHtml(item)}</li>`).join("")}</${tag}>`;
}

function renderFooter(fields) {
  const isGrey = fields.footerColor === "grey";
  const bg = isGrey ? colors.grey : colors.yellow;
  const peak = isGrey ? "footer-peak-white-to-civic-grey-light@6x.png" : "footer-peak-white-to-yellow@6x.png";
  return `${row(`<td style="padding:0;line-height:0;font-size:0;background-color:${bg};"><img src="${CDN}/${peak}" width="640" height="74" alt="" role="presentation" style="display:block;width:100%;max-width:640px;height:auto;border:0;"></td>`)}
${row(`<td class="mobile-pad" style="padding:30px 32px 34px 32px;background-color:${bg};"><img src="${LOGO}" width="150" alt="Abundance Investment" style="display:block;width:150px;max-width:150px;height:auto;border:0;margin:0 0 18px 0;font-family:Georgia,Cambria,'Times New Roman',Times,serif;letter-spacing:-0.02em;font-size:24px;line-height:28px;font-weight:bold;color:${colors.ink};">${paragraph(fields.address, "", "12px", "18px", "0 0 18px 0", colors.ink)}${paragraph(fields.fca, "", "12px", "18px", "0 0 18px 0", colors.ink)}${paragraph(fields.legal, "", "11px", "16px", "0", colors.ink)}</td>`)}`;
}

function grid(items, columns, renderer) {
  const width = `${100 / columns}%`;
  const rows = [];
  for (let i = 0; i < items.length; i += columns) rows.push(items.slice(i, i + columns));
  return rows.map((rowItems) => `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>${rowItems.map((item, index) => `<td class="mobile-stack" width="${width}" valign="top" style="width:${width};padding:${index === 0 ? "0 8px 16px 0" : index === columns - 1 ? "0 0 16px 8px" : "0 8px 16px 8px"};">${renderer(item, index)}</td>`).join("")}</tr></table>`).join("");
}

function card(content) {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${colors.line};border-radius:24px;border-collapse:separate !important;box-shadow:0 10px 30px rgba(54,54,53,0.05);"><tr><td style="padding:1px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#ffffff;border-radius:23px;border-collapse:separate !important;"><tr><td style="padding:20px;">${content}</td></tr></table></td></tr></table>`;
}

function renderTableRows(lines) {
  const rows = parseLines(lines, 2);
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${rows.map(([label, value], index) => `<tr><td style="padding:12px 12px 12px 0;${index < rows.length - 1 ? `border-bottom:1px solid ${colors.line};` : ""}${textStyle("14px", "21px", colors.body)}font-weight:bold;">${escapeHtml(label)}</td><td align="right" style="padding:12px 0;${index < rows.length - 1 ? `border-bottom:1px solid ${colors.line};` : ""}${textStyle("14px", "21px", colors.body)}">${escapeHtml(value)}</td></tr>`).join("")}</table>`;
}

function renderInlineLinks(lines) {
  const links = parseLines(lines, 2);
  if (!links.length) return "";
  return `<p style="margin:0 0 8px 0;font-family:Arial,sans-serif;font-size:13px;line-height:18px;color:${colors.muted};text-transform:uppercase;letter-spacing:0.05em;">In this email</p><p style="${textStyle("15px", "24px", colors.body)}margin:0 0 22px 0;">${links.map(([label, url]) => `<a href="${escapeAttr(url)}" style="color:${colors.pinkDark};text-decoration:underline;">${escapeHtml(label)}</a>`).join(` <span style="color:#90908d;">/</span> `)}</p>`;
}

function button(label, url, color = colors.pinkDark, border = colors.pink, blockButton = false) {
  return `<a href="${escapeAttr(url || "#")}" class="cta-link" style="display:${blockButton ? "block" : "inline-block"};padding:14px 20px;font-family:Arial,sans-serif;letter-spacing:0.005em;font-size:15px;line-height:15px;font-weight:bold;color:${color};text-align:center;text-decoration:none;border:2px solid ${border};border-radius:999px;">${escapeHtml(label || "Read more")}</a>`;
}

function palette(name) {
  return {
    pink: colors.pink,
    teal: colors.teal,
    yellow: colors.yellow,
    grey: colors.grey,
    indigo: colors.indigo,
    green: "#42c95b"
  }[name] || colors.yellow;
}

function buttonColor(name) {
  return {
    pink: { text: colors.pinkDark, border: colors.pink },
    teal: { text: colors.teal, border: colors.teal },
    indigo: { text: colors.indigo, border: colors.indigo },
    ink: { text: colors.ink, border: colors.ink }
  }[name] || { text: colors.pinkDark, border: colors.pink };
}

function paragraph(value, className = "", fontSize = "16px", lineHeight = "25px", margin = "0", color = colors.body) {
  return String(value || "").split(/\n{2,}/).filter(Boolean).map((text) => `<p${className ? ` class="${className}"` : ""} style="${textStyle(fontSize, lineHeight, color)}margin:${margin};">${escapeHtml(text).replace(/\n/g, "<br>")}</p>`).join("");
}

function eyebrow(value) {
  return `<p style="margin:0 0 8px 0;font-family:Arial,sans-serif;font-size:12px;line-height:16px;color:${colors.muted};text-transform:uppercase;letter-spacing:0.05em;font-weight:bold;">${escapeHtml(value)}</p>`;
}

function row(content) {
  return `            <tr>
              ${content}
            </tr>`;
}

function headingStyle(fontSize, lineHeight) {
  return `font-family:Georgia,Cambria,'Times New Roman',Times,serif;letter-spacing:-0.02em;font-size:${fontSize};line-height:${lineHeight};font-weight:bold;color:${colors.ink};`;
}

function textStyle(fontSize, lineHeight, color) {
  return `font-family:Arial,sans-serif;letter-spacing:0.005em;font-size:${fontSize};line-height:${lineHeight};color:${color};`;
}

function parseLines(value, count) {
  return String(value || "").split("\n").map((line) => line.split("|").map((part) => part.trim())).filter((parts) => parts.length >= count && parts[0]);
}

function number(value, fallback) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? Math.max(0, Math.min(100, parsed)) : fallback;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function slug(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "abundance-email";
}

function download(filename, text, type) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => els.toast.classList.remove("show"), 2200);
}
