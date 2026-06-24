/**
 * PERFOPTIM MASTER GENERATOR
 * Replaces old generate.js completely
 * Run:
 *   node generate.js
 *   node generate.js --region=usa
 *   node generate.js --region=india
 *   node generate.js --region=canada
 *   node generate.js --region=knowledge
 */

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://perfoptim.com";
const TODAY = "2026-06-24";

const args = process.argv.slice(2);
const regionArg = (args.find(a => a.startsWith("--region=")) || "").split("=")[1] || "all";

const RUN_USA = regionArg === "all" || regionArg === "usa";
const RUN_INDIA = regionArg === "all" || regionArg === "india";
const RUN_CANADA = regionArg === "all" || regionArg === "canada";
const RUN_KNOWLEDGE = regionArg === "all" || regionArg === "knowledge";

const BUSINESS = {
  brandName: "Perfoptim",
  legalName: "Perfoptim Labs LLP",
  founderName: "Sachin Saxena",
  yearFounded: "",
  businessType: "Digital Marketing Agency",
  phoneIndia: "+91 91059 48249",
  email: "info@perfoptim.com",
  address: {
    streetAddress: "35G/9, behind Dr. Rashmi Goel Clinic, Rampur Garden",
    addressLocality: "Bareilly",
    addressRegion: "Uttar Pradesh",
    postalCode: "243001",
    addressCountry: "IN"
  },
  gstNumber: "09ABFFP4536J1ZW",
  canadaBusinessNumber: "",
  domain: SITE_URL,
  logo: "https://perfoptim.com/wp-content/uploads/2024/11/perfoptim-logo-1-1024x576.png",
  socialProfiles: [
    "https://www.linkedin.com/company/perfoptim/",
    "https://www.instagram.com/perfoptim/",
    "https://www.facebook.com/perfoptim/",
    "https://x.com/perfoptim"
  ],
  googleReviewsText: "100+ Google reviews",
  ratingValue: "4.8",
  reviewCount: "100",
  clientsServed: "50+",
  yearsInBusiness: "15+",
  teamSize: "10+",
  topServiceSlugs: ["web-design-development", "ai-seo-services", "lead-generation"],
  freeAuditOffer: true,
  offices: {
    india: "Bareilly",
    usa: "Digital-only service area",
    canada: "Digital-only service area"
  }
};

const STYLE = `
:root{
  --bg:#f7f7f5;--card:#fff;--text:#1d1f20;--muted:#5f666c;--line:#e2e6ea;
  --brand:#0f766e;--brand2:#164e63;--soft:#eef8f7;--accent:#0ea5e9;
  --radius:16px;--shadow:0 10px 30px rgba(15,23,42,.06)
}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;font:16px/1.7 Inter,Segoe UI,Arial,sans-serif;color:var(--text);background:var(--bg)}
a{color:var(--brand2);text-decoration:none}
a:hover{text-decoration:underline}
img{max-width:100%;height:auto}
.wrap{max-width:1120px;margin:auto;padding:0 20px}
.skip{position:absolute;left:-9999px}.skip:focus{left:12px;top:12px;background:#fff;padding:8px 12px;border-radius:8px;border:1px solid var(--line);z-index:99}
header{background:#fff;border-bottom:1px solid var(--line);position:sticky;top:0;z-index:20}
.nav{display:flex;gap:18px;align-items:center;justify-content:space-between;padding:14px 0}
.nav .links{display:flex;gap:16px;flex-wrap:wrap}
.logo{font-weight:800;color:var(--text)}
.hero{padding:46px 0 18px}
.hero h1{font-size:clamp(30px,5vw,48px);line-height:1.1;margin:0 0 12px}
.hero p{font-size:18px;color:var(--muted);max-width:820px}
.badges{display:flex;flex-wrap:wrap;gap:10px;margin:14px 0 0}
.badge{background:var(--soft);border:1px solid #d7efec;color:var(--brand2);padding:8px 12px;border-radius:999px;font-size:14px}
.grid{display:grid;gap:18px}
.grid-2{grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}
.grid-3{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
.card{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);padding:22px;box-shadow:var(--shadow)}
.card h2,.card h3{margin-top:0;line-height:1.2}
.section{padding:18px 0}
.kicker{font-size:13px;font-weight:700;color:var(--brand2);letter-spacing:.08em;text-transform:uppercase}
.breadcrumbs{font-size:14px;color:var(--muted);margin:14px 0}
.breadcrumbs a{color:var(--muted)}
ul.clean{padding-left:18px;margin:10px 0}
.cta{background:linear-gradient(135deg,var(--brand),var(--brand2));color:#fff}
.cta a{color:#fff}
.columns{columns:2 280px;column-gap:22px}
.note{font-size:14px;color:var(--muted)}
details{background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px 16px}
details+details{margin-top:10px}
summary{cursor:pointer;font-weight:700}
footer{margin-top:34px;background:#fff;border-top:1px solid var(--line)}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:18px;padding:28px 0}
.small{font-size:14px;color:var(--muted)}
.link-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}
.link-box{background:#fff;border:1px solid var(--line);padding:14px 16px;border-radius:12px}
table{width:100%;border-collapse:collapse}
td,th{padding:10px;border-bottom:1px solid var(--line);text-align:left}
@media(max-width:700px){.footer-grid{grid-template-columns:1fr}.nav{align-items:flex-start;flex-direction:column}}
`;

const CORE_SERVICES = [
  { slug: "seo-services", name: "SEO Services", summary: "Organic growth strategy, technical cleanup, content planning, internal linking, and authority building." },
  { slug: "ai-seo-services", name: "AI SEO Services", summary: "Entity-first SEO, knowledge graph structuring, AI search visibility, and structured content systems." },
  { slug: "ppc-advertising", name: "PPC Advertising", summary: "Google Ads, paid search architecture, landing page alignment, and lead-focused campaign management." },
  { slug: "performance-marketing", name: "Performance Marketing", summary: "Integrated paid, creative, CRO, and funnel optimization tied to measurable revenue goals." },
  { slug: "content-marketing", name: "Content Marketing", summary: "Topic clusters, editorial planning, commercial pages, and supporting blog content that compounds authority." },
  { slug: "web-design-development", name: "Website Design & Development", summary: "Conversion-ready websites, service landing pages, speed optimization, and scalable information architecture." },
  { slug: "cro-services", name: "CRO Services", summary: "Conversion rate optimization, experimentation, form improvement, UX fixes, and funnel analytics." },
  { slug: "orm-services", name: "Online Reputation Management", summary: "Brand SERP control, review response planning, profile cleanup, and trust signal improvement." },
  { slug: "social-media-marketing", name: "Social Media Marketing", summary: "Channel strategy, campaign creative, audience targeting, and pipeline-focused social media execution." },
  { slug: "video-marketing", name: "Video Marketing", summary: "Explainer, ad creative, authority content, and performance-led video distribution." },
  { slug: "branding-design", name: "Branding & Design", summary: "Positioning, messaging, visual identity, trust assets, and conversion-centered brand systems." },
  { slug: "lead-generation", name: "Lead Generation Services", summary: "Channel mix, landing pages, forms, retargeting, CRM handoff, and qualified pipeline growth." },
  { slug: "email-marketing", name: "Email Marketing", summary: "Lifecycle flows, nurture sequences, campaigns, deliverability, and revenue automation." }
];

const CORE_INDUSTRIES = [
  { slug: "healthcare", name: "Healthcare", summary: "Clinics, medical practices, and patient-acquisition focused healthcare brands." },
  { slug: "law-firms", name: "Law Firms", summary: "Lead-sensitive legal services where trust and local visibility matter." },
  { slug: "real-estate", name: "Real Estate", summary: "Agents, developers, brokers, and location-heavy real estate funnels." },
  { slug: "ecommerce", name: "eCommerce", summary: "Catalog, conversion, retention, and paid-media heavy commerce brands." },
  { slug: "saas-technology", name: "SaaS & Technology", summary: "Demand generation, product positioning, and lifecycle growth for software companies." },
  { slug: "small-business", name: "Small Business", summary: "Owner-led service businesses that need visibility, calls, and consistent local demand." },
  { slug: "dental-clinics", name: "Dental Clinics", summary: "Treatment-focused local acquisition for dentists and specialty clinics." },
  { slug: "restaurants-hospitality", name: "Restaurants & Hospitality", summary: "Bookings, local discovery, reviews, and visual-first demand generation." },
  { slug: "finance-accounting", name: "Finance & Accounting", summary: "Trust-based B2B and B2C acquisition for finance, tax, and accounting services." },
  { slug: "education", name: "Education", summary: "Schools, institutes, coaching brands, and student lead-generation systems." },
  { slug: "manufacturing-oem", name: "Manufacturing & OEM", summary: "B2B search demand, long sales cycles, and industrial service visibility." },
  { slug: "fitness-wellness", name: "Fitness & Wellness", summary: "Studios, wellness centers, and recurring-member growth programs." }
];

const INDIA_EXTRA_SERVICES = [
  { slug: "whatsapp-marketing", name: "WhatsApp Marketing", summary: "Broadcast strategy, conversational funnels, catalog flows, and WhatsApp-driven lead capture." },
  { slug: "google-my-business-india", name: "Google Business Profile Optimization", summary: "Map pack visibility, profile optimization, reviews, and local demand capture." }
];

const INDIA_EXTRA_INDUSTRIES = [
  { slug: "ca-cs-advisory", name: "CA & CS Advisory", summary: "Accounting, tax, ROC, and advisory firms seeking qualified compliance leads." },
  { slug: "jewellery-fashion", name: "Jewellery & Fashion", summary: "High-visual acquisition for jewelry, apparel, and local retail brands." },
  { slug: "edtech-coaching", name: "EdTech & Coaching", summary: "Course enrollments, high-volume inquiries, and seasonal admissions planning." },
  { slug: "ayurveda-wellness", name: "Ayurveda & Wellness", summary: "Traditional wellness, consultation bookings, and authority-led organic demand." }
];

const CANADA_EXTRA_SERVICES = [
  { slug: "bilingual-seo", name: "Bilingual SEO", summary: "English and French SEO architecture, hreflang, and Quebec-friendly content systems." },
  { slug: "google-my-business-canada", name: "Google Business Profile Optimization", summary: "Local map visibility, multi-location optimization, and bilingual local search support." }
];

const CANADA_EXTRA_INDUSTRIES = [
  { slug: "real-estate-canada", name: "Real Estate Canada", summary: "Canadian real estate acquisition with local market and city-intent targeting." },
  { slug: "healthcare-canada", name: "Healthcare Canada", summary: "Clinic growth with local SEO, trust, and appointment-generation systems." },
  { slug: "immigration-legal", name: "Immigration & Legal", summary: "Trust-led legal acquisition with multilingual demand capture." },
  { slug: "construction-trades", name: "Construction & Trades", summary: "Calls, estimates, and map visibility for contractors and trades." }
];

const USA_LOCATIONS = [
  { slug: "california", name: "California", abbr: "CA", cities: [{ slug: "los-angeles", name: "Los Angeles" }, { slug: "san-francisco", name: "San Francisco" }, { slug: "san-diego", name: "San Diego" }] },
  { slug: "texas", name: "Texas", abbr: "TX", cities: [{ slug: "houston", name: "Houston" }, { slug: "dallas", name: "Dallas" }, { slug: "austin", name: "Austin" }] },
  { slug: "florida", name: "Florida", abbr: "FL", cities: [{ slug: "miami", name: "Miami" }, { slug: "orlando", name: "Orlando" }, { slug: "tampa", name: "Tampa" }] },
  { slug: "new-york", name: "New York", abbr: "NY", cities: [{ slug: "new-york-city", name: "New York City" }, { slug: "brooklyn", name: "Brooklyn" }, { slug: "buffalo", name: "Buffalo" }] },
  { slug: "illinois", name: "Illinois", abbr: "IL", cities: [{ slug: "chicago", name: "Chicago" }, { slug: "naperville", name: "Naperville" }, { slug: "aurora", name: "Aurora" }] },
  { slug: "washington", name: "Washington", abbr: "WA", cities: [{ slug: "seattle", name: "Seattle" }, { slug: "spokane", name: "Spokane" }, { slug: "bellevue", name: "Bellevue" }] },
  { slug: "georgia", name: "Georgia", abbr: "GA", cities: [{ slug: "atlanta", name: "Atlanta" }, { slug: "savannah", name: "Savannah" }, { slug: "augusta", name: "Augusta" }] },
  { slug: "arizona", name: "Arizona", abbr: "AZ", cities: [{ slug: "phoenix", name: "Phoenix" }, { slug: "scottsdale", name: "Scottsdale" }, { slug: "tucson", name: "Tucson" }] },
  { slug: "colorado", name: "Colorado", abbr: "CO", cities: [{ slug: "denver", name: "Denver" }, { slug: "colorado-springs", name: "Colorado Springs" }, { slug: "boulder", name: "Boulder" }] },
  { slug: "pennsylvania", name: "Pennsylvania", abbr: "PA", cities: [{ slug: "philadelphia", name: "Philadelphia" }, { slug: "pittsburgh", name: "Pittsburgh" }, { slug: "allentown", name: "Allentown" }] }
];

const INDIA_LOCATIONS = [
  { slug: "uttar-pradesh", name: "Uttar Pradesh", abbr: "UP", cities: [{ slug: "lucknow", name: "Lucknow" }, { slug: "kanpur", name: "Kanpur" }, { slug: "bareilly", name: "Bareilly" }] },
  { slug: "maharashtra", name: "Maharashtra", abbr: "MH", cities: [{ slug: "mumbai", name: "Mumbai" }, { slug: "pune", name: "Pune" }, { slug: "nagpur", name: "Nagpur" }] },
  { slug: "karnataka", name: "Karnataka", abbr: "KA", cities: [{ slug: "bangalore", name: "Bangalore" }, { slug: "mysore", name: "Mysore" }, { slug: "mangalore", name: "Mangalore" }] },
  { slug: "delhi", name: "Delhi", abbr: "DL", cities: [{ slug: "new-delhi", name: "New Delhi" }, { slug: "dwarka", name: "Dwarka" }, { slug: "rohini", name: "Rohini" }] },
  { slug: "tamil-nadu", name: "Tamil Nadu", abbr: "TN", cities: [{ slug: "chennai", name: "Chennai" }, { slug: "coimbatore", name: "Coimbatore" }, { slug: "madurai", name: "Madurai" }] },
  { slug: "gujarat", name: "Gujarat", abbr: "GJ", cities: [{ slug: "ahmedabad", name: "Ahmedabad" }, { slug: "surat", name: "Surat" }, { slug: "vadodara", name: "Vadodara" }] },
  { slug: "rajasthan", name: "Rajasthan", abbr: "RJ", cities: [{ slug: "jaipur", name: "Jaipur" }, { slug: "jodhpur", name: "Jodhpur" }, { slug: "udaipur", name: "Udaipur" }] },
  { slug: "west-bengal", name: "West Bengal", abbr: "WB", cities: [{ slug: "kolkata", name: "Kolkata" }, { slug: "howrah", name: "Howrah" }, { slug: "siliguri", name: "Siliguri" }] },
  { slug: "telangana", name: "Telangana", abbr: "TS", cities: [{ slug: "hyderabad", name: "Hyderabad" }, { slug: "warangal", name: "Warangal" }, { slug: "karimnagar", name: "Karimnagar" }] },
  { slug: "madhya-pradesh", name: "Madhya Pradesh", abbr: "MP", cities: [{ slug: "bhopal", name: "Bhopal" }, { slug: "indore", name: "Indore" }, { slug: "gwalior", name: "Gwalior" }] }
];

const CANADA_LOCATIONS = [
  { slug: "ontario", name: "Ontario", abbr: "ON", bilingual: false, cities: [{ slug: "toronto", name: "Toronto" }, { slug: "mississauga", name: "Mississauga" }, { slug: "ottawa", name: "Ottawa" }] },
  { slug: "british-columbia", name: "British Columbia", abbr: "BC", bilingual: false, cities: [{ slug: "vancouver", name: "Vancouver" }, { slug: "surrey", name: "Surrey" }, { slug: "victoria", name: "Victoria" }] },
  { slug: "quebec", name: "Quebec", abbr: "QC", bilingual: true, cities: [{ slug: "montreal", name: "Montréal" }, { slug: "quebec-city", name: "Québec City" }, { slug: "laval", name: "Laval" }] },
  { slug: "alberta", name: "Alberta", abbr: "AB", bilingual: false, cities: [{ slug: "calgary", name: "Calgary" }, { slug: "edmonton", name: "Edmonton" }, { slug: "red-deer", name: "Red Deer" }] },
  { slug: "manitoba", name: "Manitoba", abbr: "MB", bilingual: false, cities: [{ slug: "winnipeg", name: "Winnipeg" }, { slug: "brandon", name: "Brandon" }] },
  { slug: "saskatchewan", name: "Saskatchewan", abbr: "SK", bilingual: false, cities: [{ slug: "saskatoon", name: "Saskatoon" }, { slug: "regina", name: "Regina" }] },
  { slug: "nova-scotia", name: "Nova Scotia", abbr: "NS", bilingual: false, cities: [{ slug: "halifax", name: "Halifax" }, { slug: "dartmouth", name: "Dartmouth" }] },
  { slug: "new-brunswick", name: "New Brunswick", abbr: "NB", bilingual: true, cities: [{ slug: "moncton", name: "Moncton" }, { slug: "fredericton", name: "Fredericton" }] }
];

const CANADA_FRENCH_SERVICES = {
  "seo-services": "services-seo",
  "ai-seo-services": "seo-ia",
  "ppc-advertising": "publicite-ppc",
  "performance-marketing": "marketing-performance",
  "content-marketing": "marketing-contenu",
  "web-design-development": "conception-web",
  "cro-services": "optimisation-conversion",
  "orm-services": "gestion-reputation",
  "social-media-marketing": "medias-sociaux",
  "video-marketing": "marketing-video",
  "branding-design": "image-de-marque",
  "lead-generation": "generation-leads",
  "email-marketing": "marketing-courriel",
  "bilingual-seo": "seo-bilingue",
  "google-my-business-canada": "google-mon-entreprise"
};

const ENTITY_TOPICS = [
  { slug: "search-engine-optimization", name: "Search Engine Optimization", short: "SEO", summary: "The practice of improving visibility, crawlability, relevance, and trust so a website earns more qualified organic traffic.", services: ["seo-services", "ai-seo-services"], related: ["technical-seo", "on-page-seo", "off-page-seo", "entity-seo", "topical-authority"] },
  { slug: "ai-seo", name: "AI SEO", short: "AI SEO", summary: "Optimization designed for AI-influenced search systems, entity understanding, and answer-surface visibility.", services: ["ai-seo-services", "seo-services"], related: ["entity-seo", "knowledge-graph", "schema-markup", "topical-authority"] },
  { slug: "entity-seo", name: "Entity SEO", short: "Entity SEO", summary: "A content model built around entities and relationships instead of isolated keyword strings.", services: ["ai-seo-services", "seo-services"], related: ["knowledge-graph", "schema-markup", "topical-authority", "ai-seo"] },
  { slug: "topical-authority", name: "Topical Authority", short: "Topical Authority", summary: "The perception that a site covers a subject deeply, consistently, and with useful internal structure.", services: ["content-marketing", "seo-services"], related: ["entity-seo", "search-engine-optimization", "internal-linking", "knowledge-graph"] },
  { slug: "technical-seo", name: "Technical SEO", short: "Technical SEO", summary: "The crawl, index, render, speed, canonicals, and site architecture layer behind search visibility.", services: ["seo-services", "web-design-development"], related: ["core-web-vitals", "canonical-url", "hreflang", "schema-markup"] },
  { slug: "on-page-seo", name: "On-Page SEO", short: "On-Page SEO", summary: "Relevance signals built through titles, headings, copy structure, internal links, and topical alignment.", services: ["seo-services", "content-marketing"], related: ["search-engine-optimization", "anchor-text", "topical-authority"] },
  { slug: "off-page-seo", name: "Off-Page SEO", short: "Off-Page SEO", summary: "Authority and trust signals created outside the page, including links, citations, and brand mentions.", services: ["seo-services", "orm-services"], related: ["backlink", "search-engine-optimization", "brand-authority"] },
  { slug: "local-seo", name: "Local SEO", short: "Local SEO", summary: "Optimization for map packs, location pages, citations, reviews, and city-level commercial intent.", services: ["seo-services", "google-my-business-india", "google-my-business-canada"], related: ["google-business-profile", "schema-markup", "lead-generation"] },
  { slug: "international-seo", name: "International SEO", short: "International SEO", summary: "Search architecture for multiple countries or languages, including localization and geo-targeting.", services: ["seo-services", "bilingual-seo"], related: ["hreflang", "technical-seo", "entity-seo"] },
  { slug: "backlink", name: "Backlink", short: "Backlink", summary: "A link from another site that helps search engines understand authority, references, and relationships.", services: ["seo-services", "orm-services"], related: ["off-page-seo", "anchor-text", "search-engine-optimization"] },
  { slug: "anchor-text", name: "Anchor Text", short: "Anchor Text", summary: "The clickable wording of a link, which influences relevance, user guidance, and internal link clarity.", services: ["seo-services", "content-marketing"], related: ["backlink", "on-page-seo", "entity-seo"] },
  { slug: "canonical-url", name: "Canonical URL", short: "Canonical URL", summary: "A preferred URL signal used to reduce duplicate-content confusion and consolidate ranking signals.", services: ["seo-services", "web-design-development"], related: ["technical-seo", "schema-markup", "hreflang"] },
  { slug: "hreflang", name: "Hreflang", short: "Hreflang", summary: "A language and regional targeting signal used on multilingual or multi-country websites.", services: ["bilingual-seo", "seo-services"], related: ["international-seo", "canonical-url", "technical-seo"] },
  { slug: "schema-markup", name: "Schema Markup", short: "Schema Markup", summary: "Structured data added to pages so search systems can better understand page entities and attributes.", services: ["ai-seo-services", "seo-services", "web-design-development"], related: ["knowledge-graph", "entity-seo", "technical-seo"] },
  { slug: "knowledge-graph", name: "Knowledge Graph", short: "Knowledge Graph", summary: "A network of entities and relationships that helps search systems connect concepts, brands, and people.", services: ["ai-seo-services", "seo-services"], related: ["entity-seo", "schema-markup", "ai-seo"] },
  { slug: "core-web-vitals", name: "Core Web Vitals", short: "Core Web Vitals", summary: "A performance framework focused on loading, responsiveness, and visual stability.", services: ["web-design-development", "cro-services", "seo-services"], related: ["technical-seo", "conversion-rate-optimization"] },
  { slug: "google-search-console", name: "Google Search Console", short: "Google Search Console", summary: "A core diagnostic platform for indexing, query visibility, coverage, sitemaps, and page health.", services: ["seo-services", "ai-seo-services"], related: ["search-engine-optimization", "schema-markup", "technical-seo"] },
  { slug: "google-ads", name: "Google Ads", short: "Google Ads", summary: "Google’s advertising platform for search, display, remarketing, and performance acquisition.", services: ["ppc-advertising", "lead-generation"], related: ["cost-per-lead", "landing-page", "conversion-rate-optimization"] },
  { slug: "conversion-rate-optimization", name: "Conversion Rate Optimization", short: "CRO", summary: "A testing and UX discipline focused on turning more visitors into leads, calls, demos, or sales.", services: ["cro-services", "lead-generation", "web-design-development"], related: ["landing-page", "core-web-vitals", "lead-generation"] },
  { slug: "lead-generation", name: "Lead Generation", short: "Lead Generation", summary: "The process of capturing, qualifying, and converting interest into sales-ready opportunities.", services: ["lead-generation", "ppc-advertising", "seo-services"], related: ["conversion-rate-optimization", "google-ads", "local-seo"] }
];

const WIKI_PEOPLE = [
  { slug: "neil-patel", name: "Neil Patel", role: "Marketer and SEO educator", relatedEntities: ["search-engine-optimization", "content-marketing", "lead-generation"], relatedServices: ["seo-services", "content-marketing"] },
  { slug: "rand-fishkin", name: "Rand Fishkin", role: "SEO entrepreneur and audience research advocate", relatedEntities: ["search-engine-optimization", "topical-authority", "entity-seo"], relatedServices: ["seo-services", "content-marketing"] },
  { slug: "brian-dean", name: "Brian Dean", role: "SEO publisher and link-building educator", relatedEntities: ["backlink", "on-page-seo", "search-engine-optimization"], relatedServices: ["seo-services"] },
  { slug: "gary-vaynerchuk", name: "Gary Vaynerchuk", role: "Brand and social media operator", relatedEntities: ["lead-generation", "content-marketing"], relatedServices: ["social-media-marketing", "branding-design"] },
  { slug: "larry-kim", name: "Larry Kim", role: "Paid media and demand generation founder", relatedEntities: ["google-ads", "lead-generation"], relatedServices: ["ppc-advertising", "lead-generation"] },
  { slug: "aleyda-solis", name: "Aleyda Solis", role: "Technical and international SEO consultant", relatedEntities: ["international-seo", "technical-seo", "hreflang"], relatedServices: ["seo-services", "bilingual-seo"] },
  { slug: "barry-schwartz", name: "Barry Schwartz", role: "Search industry publisher", relatedEntities: ["search-engine-optimization", "google-search-console"], relatedServices: ["seo-services"] },
  { slug: "sundar-pichai", name: "Sundar Pichai", role: "Technology executive associated with Google", relatedEntities: ["google-search-console", "google-ads", "knowledge-graph"], relatedServices: ["seo-services", "ppc-advertising"] },
  { slug: "satya-nadella", name: "Satya Nadella", role: "Technology executive associated with Microsoft", relatedEntities: ["ai-seo", "knowledge-graph"], relatedServices: ["ai-seo-services"] },
  { slug: "pradeep-chopra", name: "Pradeep Chopra", role: "Indian digital marketing educator", relatedEntities: ["search-engine-optimization", "lead-generation"], relatedServices: ["seo-services", "lead-generation"] },
  { slug: "sorav-jain", name: "Sorav Jain", role: "Digital marketing trainer and consultant", relatedEntities: ["social-media-marketing", "lead-generation"], relatedServices: ["social-media-marketing", "lead-generation"] },
  { slug: "harsh-agrawal", name: "Harsh Agrawal", role: "Publisher and SEO content creator", relatedEntities: ["content-marketing", "search-engine-optimization"], relatedServices: ["content-marketing", "seo-services"] },
  { slug: "deepak-kanakaraju", name: "Deepak Kanakaraju", role: "Performance marketing educator", relatedEntities: ["performance-marketing", "lead-generation"], relatedServices: ["performance-marketing", "lead-generation"] },
  { slug: "matt-diggins", name: "Matt Diggity", role: "SEO operator and systems builder", relatedEntities: ["off-page-seo", "search-engine-optimization", "entity-seo"], relatedServices: ["seo-services", "ai-seo-services"] },
  { slug: "lily-ray", name: "Lily Ray", role: "SEO strategist focused on trust and quality signals", relatedEntities: ["topical-authority", "search-engine-optimization", "schema-markup"], relatedServices: ["seo-services", "ai-seo-services"] }
];

const SERVICE_ENTITY_MAP = {
  "seo-services": ["search-engine-optimization", "technical-seo", "on-page-seo", "backlink", "schema-markup"],
  "ai-seo-services": ["ai-seo", "entity-seo", "knowledge-graph", "schema-markup", "topical-authority"],
  "ppc-advertising": ["google-ads", "lead-generation", "conversion-rate-optimization"],
  "performance-marketing": ["lead-generation", "conversion-rate-optimization", "google-ads"],
  "content-marketing": ["topical-authority", "on-page-seo", "entity-seo"],
  "web-design-development": ["core-web-vitals", "technical-seo", "conversion-rate-optimization", "schema-markup"],
  "cro-services": ["conversion-rate-optimization", "core-web-vitals", "lead-generation"],
  "orm-services": ["off-page-seo", "backlink", "search-engine-optimization"],
  "social-media-marketing": ["lead-generation", "conversion-rate-optimization"],
  "video-marketing": ["lead-generation", "content-marketing"],
  "branding-design": ["topical-authority", "knowledge-graph"],
  "lead-generation": ["lead-generation", "conversion-rate-optimization", "google-ads", "local-seo"],
  "email-marketing": ["lead-generation", "conversion-rate-optimization"],
  "whatsapp-marketing": ["lead-generation", "conversion-rate-optimization"],
  "google-my-business-india": ["local-seo", "schema-markup", "lead-generation"],
  "bilingual-seo": ["international-seo", "hreflang", "entity-seo", "schema-markup"],
  "google-my-business-canada": ["local-seo", "lead-generation", "schema-markup"]
};

const OUTBOUND_LIBRARY = {
  default: [
    { label: "Google Search Central", url: "https://developers.google.com/search/docs" },
    { label: "Schema.org", url: "https://schema.org/" }
  ],
  "schema-markup": [
    { label: "Google structured data introduction", url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" },
    { label: "Schema.org documentation", url: "https://schema.org/docs/gs.html" }
  ],
  "search-engine-optimization": [
    { label: "Google Search Central", url: "https://developers.google.com/search/docs" },
    { label: "Search Console docs", url: "https://developers.google.com/search/docs/monitor-debug/search-console-start" }
  ],
  "google-search-console": [
    { label: "Search Console Help", url: "https://support.google.com/webmasters/" },
    { label: "Google Search Central", url: "https://developers.google.com/search/docs" }
  ],
  "hreflang": [
    { label: "International SEO guidance", url: "https://developers.google.com/search/docs/specialty/international" },
    { label: "Google Search Central", url: "https://developers.google.com/search/docs" }
  ]
};

const USA_PRIORITY_COMBOS = [
  ["seo-services", "healthcare"],
  ["ai-seo-services", "saas-technology"],
  ["lead-generation", "law-firms"],
  ["ppc-advertising", "real-estate"],
  ["cro-services", "ecommerce"],
  ["web-design-development", "small-business"],
  ["social-media-marketing", "restaurants-hospitality"],
  ["content-marketing", "finance-accounting"],
  ["lead-generation", "dental-clinics"],
  ["email-marketing", "ecommerce"]
];

const INDIA_PRIORITY_COMBOS = [
  ["seo-services", "healthcare"],
  ["ai-seo-services", "edtech-coaching"],
  ["lead-generation", "real-estate"],
  ["ppc-advertising", "ecommerce"],
  ["social-media-marketing", "jewellery-fashion"],
  ["google-my-business-india", "dental-clinics"],
  ["whatsapp-marketing", "education"],
  ["content-marketing", "ayurveda-wellness"],
  ["web-design-development", "small-business"],
  ["lead-generation", "ca-cs-advisory"]
];

const CANADA_PRIORITY_COMBOS = [
  ["seo-services", "healthcare-canada"],
  ["bilingual-seo", "real-estate-canada"],
  ["lead-generation", "immigration-legal"],
  ["ppc-advertising", "real-estate-canada"],
  ["google-my-business-canada", "construction-trades"],
  ["ai-seo-services", "saas-technology"],
  ["web-design-development", "small-business"],
  ["lead-generation", "healthcare-canada"]
];

const ENTITY_MAP = Object.fromEntries(ENTITY_TOPICS.map(x => [x.slug, x]));
const SERVICE_MAP = Object.fromEntries(
  [...CORE_SERVICES, ...INDIA_EXTRA_SERVICES, ...CANADA_EXTRA_SERVICES].map(x => [x.slug, x])
);
const PERSON_MAP = Object.fromEntries(WIKI_PEOPLE.map(x => [x.slug, x]));

let totalPages = 0;
const sitemaps = {
  usa: [],
  india: [],
  canada: []
};

function unique(arr) {
  return [...new Set(arr.filter(Boolean))];
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
  totalPages++;
  if (totalPages % 100 === 0) console.log(`Generated ${totalPages} pages...`);
}

function toUrl(parts = []) {
  const clean = parts.filter(Boolean);
  return clean.length ? `${SITE_URL}/${clean.join("/")}/` : `${SITE_URL}/`;
}

function toFile(parts = []) {
  const clean = parts.filter(Boolean);
  return clean.length ? path.join(".", ...clean, "index.html") : "index.html";
}

function addSitemap(bucket, parts, priority = "0.8", changefreq = "monthly") {
  sitemaps[bucket].push({ url: toUrl(parts), priority, changefreq, lastmod: TODAY });
}

function esc(value = "") {
  return String(value)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function capWords(text = "") {
  return text.replace(/\b\w/g, s => s.toUpperCase());
}

function regionNav(prefix = "") {
  return `
    <header>
      <div class="wrap nav">
        <a class="logo" href="${prefix || "/"}">Perfoptim</a>
        <nav class="links" aria-label="Primary">
          <a href="${prefix}/about/">About</a>
          <a href="${prefix}/entity/">Entity</a>
          <a href="${prefix}/wiki/">Wiki</a>
          <a href="${prefix}/in/services/seo-services/">India</a>
          <a href="${prefix}/ca/services/seo-services/">Canada</a>
        </nav>
      </div>
    </header>
  `;
}

function footerHtml() {
  return `
    <footer>
      <div class="wrap footer-grid">
        <div>
          <stdiv>
          <st
