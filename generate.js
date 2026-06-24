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
  if (Array.isArray(bucket)) {
    bucket.push({ url: parts, priority, changefreq, lastmod: TODAY });
  } else {
    sitemaps[bucket].push({ url: toUrl(parts), priority, changefreq, lastmod: TODAY });
  }
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
          <div class="footer-brand">
            <img src="https://perfoptim.com/wp-content/uploads/2024/11/perfoptim-logo-1-1024x576.png" 
                 alt="Perfoptim Logo" width="160" height="90" loading="lazy"/>
            <p>Perfoptim Labs LLP — Performance Digital Marketing Agency. Serving USA, India, Canada and beyond.</p>
            <div class="footer-social">
              <a href="https://www.linkedin.com/company/perfoptim/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://www.instagram.com/perfoptim/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/perfoptim/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://x.com/perfoptim" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.213 5.567 5.95-5.567Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div>
          <h3>Top Services</h3>
          <ul>
            <li><a href="/seo-services/">SEO Services</a></li>
            <li><a href="/ppc-advertising/">PPC Advertising</a></li>
            <li><a href="/lead-generation/">Lead Generation</a></li>
            <li><a href="/web-design-development/">Web Design & Development</a></li>
            <li><a href="/performance-marketing/">Performance Marketing</a></li>
            <li><a href="/content-marketing/">Content Marketing</a></li>
            <li><a href="/social-media-marketing/">Social Media Marketing</a></li>
            <li><a href="/cro-services/">CRO Services</a></li>
          </ul>
        </div>

        <div>
          <h3>Regions</h3>
          <ul>
            <li><a href="/">USA Digital Marketing</a></li>
            <li><a href="/in/">India Digital Marketing</a></li>
            <li><a href="/ca/">Canada Digital Marketing</a></li>
            <li><a href="/in/uttar-pradesh/bareilly/seo-services/">SEO in Bareilly</a></li>
            <li><a href="/in/maharashtra/mumbai/seo-services/">SEO in Mumbai</a></li>
            <li><a href="/california/los-angeles/seo-services/">SEO in Los Angeles</a></li>
            <li><a href="/ca/ontario/toronto/seo-services/">SEO in Toronto</a></li>
          </ul>
        </div>

        <div>
          <h3>Knowledge Base</h3>
          <ul>
            <li><a href="/entity/search-engine-optimization/">What is SEO?</a></li>
            <li><a href="/entity/performance-marketing/">What is Performance Marketing?</a></li>
            <li><a href="/entity/lead-generation/">What is Lead Generation?</a></li>
            <li><a href="/entity/google-ads/">What is Google Ads?</a></li>
            <li><a href="/wiki/neil-patel/">Neil Patel Wiki</a></li>
            <li><a href="/wiki/rand-fishkin/">Rand Fishkin Wiki</a></li>
            <li><a href="/wiki/sachin-saxena-perfoptim/">Sachin Saxena — Perfoptim</a></li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <ul>
            <li>📍 35G/9, Rampur Garden, Bareilly, UP 243001</li>
            <li>📞 <a href="tel:+919105948249">+91 91059 48249</a></li>
            <li>✉️ <a href="mailto:info@perfoptim.com">info@perfoptim.com</a></li>
            <li>🏢 GST: 09ABFFP4536J1ZW</li>
          </ul>
          <div class="footer-trust">
            <span>⭐ 4.8/5 Google Rating</span>
            <span>👥 50+ Clients</span>
            <span>📅 15+ Years Experience</span>
            <span>🌍 USA | India | Canada</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="wrap">
          <p>© ${new Date().getFullYear()} Perfoptim Labs LLP. All rights reserved. 
             GST: 09ABFFP4536J1ZW | 
             <a href="/privacy-policy/">Privacy Policy</a> | 
             <a href="/terms-of-service/">Terms of Service</a> |
             <a href="/sitemap-index.xml">Sitemap</a>
          </p>
        </div>
      </div>
    </footer>`;
}

// ─── ORGANIZATION SCHEMA (Global — har page mein inject hoga) ────────────────
function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://perfoptim.com/#organization",
    "name": "Perfoptim",
    "legalName": "Perfoptim Labs LLP",
    "url": "https://perfoptim.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://perfoptim.com/wp-content/uploads/2024/11/perfoptim-logo-1-1024x576.png",
      "width": 1024,
      "height": 576
    },
    "foundingDate": "2009",
    "founder": {
      "@type": "Person",
      "name": "Sachin Saxena",
      "@id": "https://perfoptim.com/wiki/sachin-saxena-perfoptim/#person"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "35G/9, behind Dr. Rashmi Goel Clinic, Rampur Garden",
      "addressLocality": "Bareilly",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "243001",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-91059-48249",
        "contactType": "customer service",
        "areaServed": ["IN", "US", "CA"],
        "availableLanguage": ["English", "Hindi"]
      }
    ],
    "email": "info@perfoptim.com",
    "telephone": "+91-91059-48249",
    "taxID": "09ABFFP4536J1ZW",
    "numberOfEmployees": { "@type": "QuantitativeValue", "value": 10 },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "100",
      "bestRating": "5"
    },
    "sameAs": [
      "https://www.linkedin.com/company/perfoptim/",
      "https://www.instagram.com/perfoptim/",
      "https://www.facebook.com/perfoptim/",
      "https://x.com/perfoptim"
    ],
    "areaServed": [
      { "@type": "Country", "name": "India" },
      { "@type": "Country", "name": "United States" },
      { "@type": "Country", "name": "Canada" }
    ],
    "knowsAbout": [
      "Search Engine Optimization",
      "Performance Marketing",
      "Lead Generation",
      "Web Design and Development",
      "PPC Advertising",
      "Content Marketing"
    ]
  };
}

// ─── LOCAL BUSINESS SCHEMA (India office ke liye) ────────────────────────────
function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService", "MarketingAgency"],
    "@id": "https://perfoptim.com/#localbusiness",
    "name": "Perfoptim",
    "image": "https://perfoptim.com/wp-content/uploads/2024/11/perfoptim-logo-1-1024x576.png",
    "url": "https://perfoptim.com",
    "telephone": "+91-91059-48249",
    "email": "info@perfoptim.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "35G/9, behind Dr. Rashmi Goel Clinic, Rampur Garden",
      "addressLocality": "Bareilly",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "243001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.3670",
      "longitude": "79.4304"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "100",
      "bestRating": "5"
    },
    "priceRange": "₹₹",
    "currenciesAccepted": "INR, USD, CAD",
    "paymentAccepted": "Bank Transfer, UPI, Credit Card"
  };
}

// ─── PERSON SCHEMA — Sachin Saxena (Founder) ─────────────────────────────────
function founderSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://perfoptim.com/wiki/sachin-saxena-perfoptim/#person",
    "name": "Sachin Saxena",
    "jobTitle": "Founder & CEO",
    "worksFor": {
      "@type": "Organization",
      "@id": "https://perfoptim.com/#organization"
    },
    "url": "https://perfoptim.com/wiki/sachin-saxena-perfoptim/",
    "sameAs": [
      "https://www.linkedin.com/company/perfoptim/",
      "https://x.com/perfoptim"
    ],
    "knowsAbout": [
      "Digital Marketing", "SEO", "Performance Marketing",
      "Lead Generation", "Web Development", "AI SEO"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bareilly",
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "IN"
    }
  };
}

// ═══════════════════════════════════════════════════════════════
// ████████████  ENTITY PAGES — /entity/  ███████████████████████
// ═══════════════════════════════════════════════════════════════

const ENTITY_CONCEPTS = [
  // SEO
  { slug: 'search-engine-optimization', name: 'Search Engine Optimization', alt: 'SEO',
    wikidata: 'Q180711', wikipedia: 'Search_engine_optimization',
    relatedServices: ['seo-services','content-marketing','orm-services'],
    relatedEntities: ['technical-seo','on-page-seo','off-page-seo','backlink','google-algorithm'],
    relatedWiki: ['rand-fishkin','brian-dean','neil-patel'] },
  { slug: 'technical-seo', name: 'Technical SEO', alt: 'Technical Search Optimization',
    wikidata: 'Q180711', wikipedia: 'Search_engine_optimization',
    relatedServices: ['seo-services','web-design-development'],
    relatedEntities: ['search-engine-optimization','core-web-vitals','schema-markup','canonical-url'],
    relatedWiki: ['rand-fishkin','barry-schwartz'] },
  { slug: 'on-page-seo', name: 'On-Page SEO', alt: 'On-Site SEO',
    wikidata: 'Q180711', wikipedia: 'Search_engine_optimization',
    relatedServices: ['seo-services','content-marketing'],
    relatedEntities: ['search-engine-optimization','technical-seo','anchor-text','schema-markup'],
    relatedWiki: ['brian-dean','neil-patel'] },
  { slug: 'off-page-seo', name: 'Off-Page SEO', alt: 'Off-Site SEO',
    wikidata: 'Q180711', wikipedia: 'Search_engine_optimization',
    relatedServices: ['seo-services','orm-services'],
    relatedEntities: ['search-engine-optimization','backlink','domain-authority','anchor-text'],
    relatedWiki: ['rand-fishkin','brian-dean'] },
  { slug: 'local-seo', name: 'Local SEO', alt: 'Local Search Optimization',
    wikidata: 'Q180711', wikipedia: 'Local_search_(Internet)',
    relatedServices: ['seo-services','google-my-business-india'],
    relatedEntities: ['search-engine-optimization','schema-markup','knowledge-graph'],
    relatedWiki: ['neil-patel','joy-hawkins'] },
  { slug: 'e-e-a-t', name: 'E-E-A-T', alt: 'Experience Expertise Authoritativeness Trustworthiness',
    wikidata: 'Q180711', wikipedia: 'Search_engine_optimization',
    relatedServices: ['seo-services','content-marketing','orm-services'],
    relatedEntities: ['search-engine-optimization','knowledge-graph','entity-seo'],
    relatedWiki: ['barry-schwartz','rand-fishkin'] },
  { slug: 'core-web-vitals', name: 'Core Web Vitals', alt: 'CWV Google',
    wikidata: 'Q180711', wikipedia: 'Core_Web_Vitals',
    relatedServices: ['seo-services','web-design-development','cro-services'],
    relatedEntities: ['technical-seo','search-engine-optimization'],
    relatedWiki: ['barry-schwartz','sundar-pichai'] },
  { slug: 'google-algorithm', name: 'Google Algorithm', alt: 'Google Search Algorithm',
    wikidata: 'Q233267', wikipedia: 'Google_Search',
    relatedServices: ['seo-services','orm-services'],
    relatedEntities: ['search-engine-optimization','e-e-a-t','core-web-vitals','pagerank'],
    relatedWiki: ['barry-schwartz','sundar-pichai','rand-fishkin'] },
  { slug: 'pagerank', name: 'PageRank', alt: 'Google PageRank Algorithm',
    wikidata: 'Q180711', wikipedia: 'PageRank',
    relatedServices: ['seo-services'],
    relatedEntities: ['search-engine-optimization','backlink','domain-authority','google-algorithm'],
    relatedWiki: ['sundar-pichai','rand-fishkin'] },
  { slug: 'domain-authority', name: 'Domain Authority', alt: 'DA Moz Metric',
    wikidata: 'Q180711', wikipedia: 'Search_engine_optimization',
    relatedServices: ['seo-services','orm-services'],
    relatedEntities: ['backlink','pagerank','search-engine-optimization'],
    relatedWiki: ['rand-fishkin','brian-dean'] },
  { slug: 'backlink', name: 'Backlink', alt: 'Inbound Link Back Link',
    wikidata: 'Q846637', wikipedia: 'Backlink',
    relatedServices: ['seo-services','content-marketing'],
    relatedEntities: ['off-page-seo','domain-authority','anchor-text','pagerank'],
    relatedWiki: ['brian-dean','rand-fishkin'] },
  { slug: 'anchor-text', name: 'Anchor Text', alt: 'Link Anchor Text SEO',
    wikidata: 'Q180711', wikipedia: 'Anchor_text',
    relatedServices: ['seo-services','content-marketing'],
    relatedEntities: ['backlink','on-page-seo','off-page-seo'],
    relatedWiki: ['brian-dean'] },
  { slug: 'schema-markup', name: 'Schema Markup', alt: 'Structured Data Schema.org',
    wikidata: 'Q180711', wikipedia: 'Schema.org',
    relatedServices: ['seo-services','web-design-development'],
    relatedEntities: ['technical-seo','knowledge-graph','entity-seo','local-seo'],
    relatedWiki: ['barry-schwartz','rand-fishkin'] },
  { slug: 'knowledge-graph', name: 'Knowledge Graph', alt: 'Google Knowledge Graph',
    wikidata: 'Q5283767', wikipedia: 'Knowledge_Graph',
    relatedServices: ['seo-services','orm-services'],
    relatedEntities: ['entity-seo','schema-markup','e-e-a-t'],
    relatedWiki: ['sundar-pichai','barry-schwartz'] },
  { slug: 'entity-seo', name: 'Entity SEO', alt: 'Entity Based SEO',
    wikidata: 'Q180711', wikipedia: 'Search_engine_optimization',
    relatedServices: ['seo-services','content-marketing'],
    relatedEntities: ['knowledge-graph','schema-markup','e-e-a-t','search-engine-optimization'],
    relatedWiki: ['rand-fishkin','barry-schwartz'] },
  { slug: 'hreflang', name: 'Hreflang', alt: 'Hreflang Tag International SEO',
    wikidata: 'Q180711', wikipedia: 'Hreflang',
    relatedServices: ['seo-services'],
    relatedEntities: ['technical-seo','search-engine-optimization'],
    relatedWiki: ['aleyda-solis'] },
  { slug: 'canonical-url', name: 'Canonical URL', alt: 'Canonical Tag SEO',
    wikidata: 'Q180711', wikipedia: 'Canonical_link_element',
    relatedServices: ['seo-services','web-design-development'],
    relatedEntities: ['technical-seo','search-engine-optimization'],
    relatedWiki: ['barry-schwartz','rand-fishkin'] },
  // Marketing
  { slug: 'performance-marketing', name: 'Performance Marketing', alt: 'Performance Based Marketing',
    wikidata: 'Q1344251', wikipedia: 'Performance_marketing',
    relatedServices: ['performance-marketing','ppc-advertising','lead-generation'],
    relatedEntities: ['cost-per-click','cost-per-lead','return-on-ad-spend','marketing-funnel'],
    relatedWiki: ['neil-patel','gary-vaynerchuk'] },
  { slug: 'cost-per-click', name: 'Cost Per Click', alt: 'CPC Pay Per Click',
    wikidata: 'Q180711', wikipedia: 'Pay-per-click',
    relatedServices: ['ppc-advertising','performance-marketing'],
    relatedEntities: ['performance-marketing','return-on-ad-spend','google-ads'],
    relatedWiki: ['larry-kim','neil-patel'] },
  { slug: 'cost-per-lead', name: 'Cost Per Lead', alt: 'CPL Lead Generation Cost',
    wikidata: 'Q180711', wikipedia: 'Performance_marketing',
    relatedServices: ['lead-generation','ppc-advertising'],
    relatedEntities: ['performance-marketing','marketing-funnel','cost-per-click'],
    relatedWiki: ['neil-patel','gary-vaynerchuk'] },
  { slug: 'return-on-ad-spend', name: 'Return on Ad Spend', alt: 'ROAS',
    wikidata: 'Q180711', wikipedia: 'Return_on_advertising_spend',
    relatedServices: ['ppc-advertising','performance-marketing'],
    relatedEntities: ['cost-per-click','cost-per-lead','performance-marketing'],
    relatedWiki: ['larry-kim','neil-patel'] },
  { slug: 'conversion-rate-optimization', name: 'Conversion Rate Optimization', alt: 'CRO',
    wikidata: 'Q180711', wikipedia: 'Conversion_rate_optimization',
    relatedServices: ['cro-services','web-design-development','ppc-advertising'],
    relatedEntities: ['marketing-funnel','cost-per-lead','performance-marketing'],
    relatedWiki: ['neil-patel','rand-fishkin'] },
  { slug: 'customer-acquisition-cost', name: 'Customer Acquisition Cost', alt: 'CAC',
    wikidata: 'Q180711', wikipedia: 'Customer_acquisition_cost',
    relatedServices: ['performance-marketing','lead-generation'],
    relatedEntities: ['cost-per-lead','return-on-ad-spend','marketing-funnel'],
    relatedWiki: ['neil-patel'] },
  { slug: 'marketing-funnel', name: 'Marketing Funnel', alt: 'Sales Funnel Digital Marketing',
    wikidata: 'Q180711', wikipedia: 'Purchase_funnel',
    relatedServices: ['lead-generation','content-marketing','email-marketing'],
    relatedEntities: ['conversion-rate-optimization','cost-per-lead','performance-marketing'],
    relatedWiki: ['neil-patel','gary-vaynerchuk'] },
  { slug: 'lead-generation', name: 'Lead Generation', alt: 'B2B Lead Gen',
    wikidata: 'Q180711', wikipedia: 'Lead_generation',
    relatedServices: ['lead-generation','ppc-advertising','content-marketing'],
    relatedEntities: ['marketing-funnel','cost-per-lead','conversion-rate-optimization'],
    relatedWiki: ['neil-patel','gary-vaynerchuk'] },
  { slug: 'content-marketing', name: 'Content Marketing', alt: 'Content Strategy',
    wikidata: 'Q3283817', wikipedia: 'Content_marketing',
    relatedServices: ['content-marketing','seo-services','email-marketing'],
    relatedEntities: ['search-engine-optimization','marketing-funnel','lead-generation'],
    relatedWiki: ['brian-dean','neil-patel','gary-vaynerchuk'] },
  { slug: 'email-marketing', name: 'Email Marketing', alt: 'Email Campaign Marketing',
    wikidata: 'Q1344251', wikipedia: 'Email_marketing',
    relatedServices: ['email-marketing','content-marketing','lead-generation'],
    relatedEntities: ['marketing-funnel','lead-generation','conversion-rate-optimization'],
    relatedWiki: ['neil-patel','gary-vaynerchuk'] },
  { slug: 'social-media-marketing', name: 'Social Media Marketing', alt: 'SMM',
    wikidata: 'Q180711', wikipedia: 'Social_media_marketing',
    relatedServices: ['social-media-marketing','content-marketing','branding-design'],
    relatedEntities: ['content-marketing','influencer-marketing','marketing-funnel'],
    relatedWiki: ['gary-vaynerchuk','neil-patel'] },
  { slug: 'influencer-marketing', name: 'Influencer Marketing', alt: 'Influencer Campaign',
    wikidata: 'Q180711', wikipedia: 'Influencer_marketing',
    relatedServices: ['social-media-marketing','branding-design'],
    relatedEntities: ['social-media-marketing','content-marketing','branding'],
    relatedWiki: ['gary-vaynerchuk'] },
  // Tools
  { slug: 'google-ads', name: 'Google Ads', alt: 'Google AdWords PPC',
    wikidata: 'Q3340699', wikipedia: 'Google_Ads',
    relatedServices: ['ppc-advertising','performance-marketing','lead-generation'],
    relatedEntities: ['cost-per-click','return-on-ad-spend','performance-marketing'],
    relatedWiki: ['sundar-pichai','larry-kim','neil-patel'] },
  { slug: 'google-analytics-4', name: 'Google Analytics 4', alt: 'GA4',
    wikidata: 'Q180711', wikipedia: 'Google_Analytics',
    relatedServices: ['seo-services','performance-marketing','cro-services'],
    relatedEntities: ['conversion-rate-optimization','google-ads','search-engine-optimization'],
    relatedWiki: ['sundar-pichai','barry-schwartz'] },
  { slug: 'google-search-console', name: 'Google Search Console', alt: 'GSC Webmaster Tools',
    wikidata: 'Q180711', wikipedia: 'Google_Search_Console',
    relatedServices: ['seo-services'],
    relatedEntities: ['search-engine-optimization','technical-seo','core-web-vitals'],
    relatedWiki: ['barry-schwartz','rand-fishkin'] },
  { slug: 'semrush', name: 'SEMrush', alt: 'Semrush SEO Tool',
    wikidata: 'Q180711', wikipedia: 'Semrush',
    relatedServices: ['seo-services','content-marketing'],
    relatedEntities: ['search-engine-optimization','backlink','domain-authority'],
    relatedWiki: ['neil-patel','rand-fishkin'] },
  { slug: 'ahrefs', name: 'Ahrefs', alt: 'Ahrefs SEO Backlink Tool',
    wikidata: 'Q180711', wikipedia: 'Ahrefs',
    relatedServices: ['seo-services'],
    relatedEntities: ['backlink','domain-authority','search-engine-optimization'],
    relatedWiki: ['brian-dean','rand-fishkin'] },
  { slug: 'meta-ads', name: 'Meta Ads', alt: 'Facebook Ads Instagram Ads',
    wikidata: 'Q380057', wikipedia: 'Meta_Platforms',
    relatedServices: ['social-media-marketing','performance-marketing','lead-generation'],
    relatedEntities: ['social-media-marketing','cost-per-click','return-on-ad-spend'],
    relatedWiki: ['gary-vaynerchuk','neil-patel'] },
  // Business
  { slug: 'digital-marketing-agency', name: 'Digital Marketing Agency', alt: 'Online Marketing Agency',
    wikidata: 'Q1344251', wikipedia: 'Digital_marketing',
    relatedServices: ['seo-services','ppc-advertising','lead-generation'],
    relatedEntities: ['performance-marketing','search-engine-optimization','content-marketing'],
    relatedWiki: ['sachin-saxena-perfoptim','neil-patel'] },
  { slug: 'seo-agency', name: 'SEO Agency', alt: 'Search Engine Optimization Agency',
    wikidata: 'Q180711', wikipedia: 'Search_engine_optimization',
    relatedServices: ['seo-services'],
    relatedEntities: ['search-engine-optimization','digital-marketing-agency'],
    relatedWiki: ['sachin-saxena-perfoptim','rand-fishkin'] },
  { slug: 'white-label-seo', name: 'White Label SEO', alt: 'Reseller SEO',
    wikidata: 'Q180711', wikipedia: 'White-label_product',
    relatedServices: ['seo-services','lead-generation'],
    relatedEntities: ['seo-agency','digital-marketing-agency'],
    relatedWiki: ['neil-patel'] },
  { slug: 'b2b-marketing', name: 'B2B Marketing', alt: 'Business to Business Marketing',
    wikidata: 'Q180711', wikipedia: 'Business-to-business',
    relatedServices: ['lead-generation','content-marketing','email-marketing'],
    relatedEntities: ['lead-generation','marketing-funnel','performance-marketing'],
    relatedWiki: ['neil-patel','gary-vaynerchuk'] },
  { slug: 'programmatic-advertising', name: 'Programmatic Advertising', alt: 'Programmatic Display Ads',
    wikidata: 'Q180711', wikipedia: 'Programmatic_advertising',
    relatedServices: ['ppc-advertising','performance-marketing'],
    relatedEntities: ['cost-per-click','return-on-ad-spend','google-ads','meta-ads'],
    relatedWiki: ['larry-kim','neil-patel'] },
  { slug: 'branding', name: 'Branding', alt: 'Brand Identity Design',
    wikidata: 'Q180711', wikipedia: 'Brand',
    relatedServices: ['branding-design','social-media-marketing','content-marketing'],
    relatedEntities: ['content-marketing','social-media-marketing','influencer-marketing'],
    relatedWiki: ['gary-vaynerchuk','neil-patel'] },
];

// ─── ENTITY PAGE GENERATOR ────────────────────────────────────────────────────
function generateEntityPage(entity) {
  const schemaObj = {
    "@context": "https://schema.org",
    "@type": ["DefinedTerm", "Article"],
    "@id": `https://perfoptim.com/entity/${entity.slug}/#definedterm`,
    "name": entity.name,
    "alternateName": entity.alt,
    "description": `Complete guide to ${entity.name} — definition, how it works, best practices, and how Perfoptim uses it to drive results for clients.`,
    "inDefinedTermSet": "https://perfoptim.com/entity/",
    "sameAs": [
      `https://en.wikipedia.org/wiki/${entity.wikipedia}`,
      `https://www.wikidata.org/wiki/${entity.wikidata}`
    ],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://perfoptim.com/entity/${entity.slug}/`
    },
    "publisher": { "@type": "Organization", "@id": "https://perfoptim.com/#organization" },
    "author": { "@type": "Person", "@id": "https://perfoptim.com/wiki/sachin-saxena-perfoptim/#person" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": `What is ${entity.name}?`,
        "acceptedAnswer": { "@type": "Answer", "text": `${entity.name} (${entity.alt}) is a core digital marketing concept. It refers to the strategies and techniques used to improve online visibility and business results through ${entity.name.toLowerCase()}.` } },
      { "@type": "Question", "name": `Why is ${entity.name} important for businesses?`,
        "acceptedAnswer": { "@type": "Answer", "text": `${entity.name} is critical because it directly impacts your online visibility, lead generation, and revenue. Businesses that invest in ${entity.name} see measurable improvements in traffic, conversions, and brand authority.` } },
      { "@type": "Question", "name": `How does Perfoptim use ${entity.name}?`,
        "acceptedAnswer": { "@type": "Answer", "text": `Perfoptim integrates ${entity.name} into every client campaign. Our 15+ years of expertise and 50+ client base means we apply proven ${entity.name} strategies tailored to each business's market — whether in India, USA, or Canada.` } },
      { "@type": "Question", "name": `How long does ${entity.name} take to show results?`,
        "acceptedAnswer": { "@type": "Answer", "text": `Results from ${entity.name} typically become visible within 60-90 days, with significant improvements at 6 months. Paid channels show faster results while organic ${entity.name} compounds over time.` } }
    ]
  };

  const relatedServiceLinks = entity.relatedServices
    .map(s => `<li><a href="/${s}/">${s.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}</a></li>`)
    .join('\n            ');

  const relatedEntityLinks = entity.relatedEntities
    .map(e => `<li><a href="/entity/${e}/">${e.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}</a></li>`)
    .join('\n            ');

  const relatedWikiLinks = entity.relatedWiki
    .map(w => `<li><a href="/wiki/${w}/">${w.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}</a></li>`)
    .join('\n            ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>What is ${entity.name}? — Complete Guide 2026 | Perfoptim</title>
  <meta name="description" content="What is ${entity.name}? Complete definition, how it works, best practices and real examples. Learn how ${entity.alt} drives business growth in 2026."/>
  <link rel="canonical" href="https://perfoptim.com/entity/${entity.slug}/"/>
  <link rel="alternate" hreflang="en" href="https://perfoptim.com/entity/${entity.slug}/"/>
  <link rel="alternate" hreflang="x-default" href="https://perfoptim.com/entity/${entity.slug}/"/>
  <script type="application/ld+json">${JSON.stringify(schemaObj, null, 2)}</script>
  <script type="application/ld+json">${JSON.stringify(faqSchema, null, 2)}</script>
  <script type="application/ld+json">${JSON.stringify(orgSchema(), null, 2)}</script>
  <link rel="stylesheet" href="/assets/style.css"/>
</head>
<body>
  ${headerHtml()}
  <main>
    <article class="entity-page">
      <div class="wrap">

        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a> › 
          <a href="/entity/">Knowledge Base</a> › 
          <span>${entity.name}</span>
        </nav>

        <header class="entity-header">
          <span class="entity-badge">📚 Knowledge Base</span>
          <h1>What is ${entity.name}? — Complete Guide (2026)</h1>
          <p class="entity-alt">Also known as: <strong>${entity.alt}</strong></p>
          <p class="entity-intro">
            ${entity.name} is one of the most important concepts in modern digital marketing.
            This guide covers everything — definition, how it works, best practices, tools, 
            and how Perfoptim applies ${entity.alt} for clients across India, USA, and Canada.
          </p>
          <div class="entity-meta">
            <span>✍️ By <a href="/wiki/sachin-saxena-perfoptim/">Sachin Saxena</a></span>
            <span>📅 Updated: June 2026</span>
            <span>⏱️ 8 min read</span>
            <span>🔗 <a href="https://en.wikipedia.org/wiki/${entity.wikipedia}" target="_blank" rel="noopener noreferrer">Wikipedia Reference ↗</a></span>
          </div>
        </header>

        <div class="entity-body">

          <section>
            <h2>Definition of ${entity.name}</h2>
            <p>${entity.name} (commonly abbreviated as <strong>${entity.alt}</strong>) refers to the 
            systematic approach of leveraging ${entity.name.toLowerCase()} strategies to improve a 
            business's online presence, visibility, and revenue performance. It is a core component 
            of modern digital marketing and is used by agencies, brands, and businesses worldwide.</p>
            <p>According to <a href="https://en.wikipedia.org/wiki/${entity.wikipedia}" target="_blank" rel="noopener noreferrer nofollow">Wikipedia</a>, 
            ${entity.name} has evolved significantly with the growth of search engines and digital 
            platforms, becoming an essential discipline for any business competing online.</p>
          </section>

          <section>
            <h2>How ${entity.name} Works</h2>
            <p>${entity.name} works by combining technical implementation, content strategy, and 
            performance analysis to achieve measurable business outcomes. The process typically 
            involves research, strategy development, execution, and continuous optimization.</p>
            <p>When implemented correctly, ${entity.alt} creates a compounding effect — 
            early investments in ${entity.name.toLowerCase()} build long-term competitive advantages 
            that are difficult for competitors to replicate quickly.</p>
          </section>

          <section>
            <h2>Why ${entity.name} Matters in 2026</h2>
            <p>In 2026, ${entity.name} is more important than ever. With AI-driven search, 
            algorithm updates, and increased competition, businesses that invest in proper 
            ${entity.alt} strategies see significantly better results than those relying on 
            outdated approaches.</p>
            <ul>
              <li>Increased online visibility and brand awareness</li>
              <li>Higher quality leads at lower cost per acquisition</li>
              <li>Sustainable long-term competitive advantage</li>
              <li>Better ROI compared to traditional marketing channels</li>
              <li>Measurable, data-driven results with clear attribution</li>
            </ul>
          </section>

          <section>
            <h2>${entity.name} Best Practices</h2>
            <p>Perfoptim's 15+ years of experience across 50+ clients has helped us identify 
            the most effective ${entity.alt} practices for businesses in India, USA, and Canada:</p>
            <ol>
              <li><strong>Start with a comprehensive audit</strong> — understand your current position before implementing any ${entity.name.toLowerCase()} strategy</li>
              <li><strong>Set measurable KPIs</strong> — define what success looks like in concrete numbers</li>
              <li><strong>Implement systematically</strong> — follow a structured approach rather than random tactics</li>
              <li><strong>Monitor and optimize continuously</strong> — ${entity.alt} requires ongoing attention</li>
              <li><strong>Align with business goals</strong> — every ${entity.name.toLowerCase()} decision should tie back to revenue</li>
            </ol>
          </section>

          <section>
            <h2>Common ${entity.name} Mistakes to Avoid</h2>
            <ul>
              <li>Ignoring data and making decisions based on assumptions</li>
              <li>Focusing on vanity metrics instead of revenue-driving KPIs</li>
              <li>Neglecting mobile users and page speed</li>
              <li>Inconsistent implementation without a clear strategy</li>
              <li>Not adapting to algorithm updates and industry changes</li>
            </ul>
          </section>

          <section class="faq-section">
            <h2>Frequently Asked Questions about ${entity.name}</h2>
            <div class="faq-item">
              <h3>What is ${entity.name}?</h3>
              <p>${entity.name} (${entity.alt}) is a core digital marketing discipline focused on 
              improving online visibility and business performance through strategic implementation 
              of proven techniques and data-driven optimization.</p>
            </div>
            <div class="faq-item">
              <h3>Why is ${entity.name} important for businesses?</h3>
              <p>${entity.name} directly impacts your online visibility, lead generation, and 
              revenue. Businesses investing in ${entity.alt} see measurable improvements in 
              traffic, conversions, and brand authority over time.</p>
            </div>
            <div class="faq-item">
              <h3>How does Perfoptim use ${entity.name}?</h3>
              <p>Perfoptim integrates ${entity.name} into every client campaign. With 15+ years 
              of expertise and a 4.8★ Google rating, we apply proven ${entity.alt} strategies 
              tailored to each business's market in India, USA, or Canada.</p>
            </div>
            <div class="faq-item">
              <h3>How long does ${entity.name} take to show results?</h3>
              <p>Results typically become visible within 60-90 days, with significant improvements 
              at 6 months. Paid channels show faster results while organic ${entity.alt} compounds 
              over time for lasting impact.</p>
            </div>
          </section>

        </div>

        <aside class="entity-sidebar">

          <div class="sidebar-box">
            <h3>🔗 Related Services</h3>
            <ul>${relatedServiceLinks}</ul>
          </div>

          <div class="sidebar-box">
            <h3>📚 Related Concepts</h3>
            <ul>${relatedEntityLinks}</ul>
          </div>

          <div class="sidebar-box">
            <h3>👤 Expert Profiles</h3>
            <ul>${relatedWikiLinks}</ul>
          </div>

          <div class="sidebar-cta">
            <h3>Need ${entity.name} for Your Business?</h3>
            <p>Perfoptim has helped 50+ businesses with ${entity.alt} across India, USA & Canada.</p>
            <a href="/#contact" class="btn-primary">Get Free Audit →</a>
          </div>

        </aside>

      </div>
    </article>
  </main>
  ${footerHtml()}
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════
// █████████████████  WIKI PAGES — /wiki/  ██████████████████████
// ═══════════════════════════════════════════════════════════════

// ─── WIKI PAGE GENERATOR ──────────────────────────────────────────────────────
function generateWikiPage(person) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://perfoptim.com/wiki/${person.slug}/#person`,
    "name": person.name,
    "jobTitle": person.role,
    "nationality": person.nationality,
    "url": `https://perfoptim.com/wiki/${person.slug}/`,
    "sameAs": person.sameAs || [],
    "knowsAbout": person.relatedEntities.map(e => e.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://perfoptim.com/wiki/${person.slug}/`
    }
  };
  if (person.wikidata) {
    personSchema.sameAs.push(`https://www.wikidata.org/wiki/${person.wikidata}`);
  }
  if (person.organization) {
    personSchema.worksFor = { "@type": "Organization", "name": person.organization };
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": `Who is ${person.name}?`,
        "acceptedAnswer": { "@type": "Answer", "text": `${person.name} is a ${person.role} known for ${person.known_for}. Based in ${person.city}, ${person.country}.` } },
      { "@type": "Question", "name": `What is ${person.name} known for?`,
        "acceptedAnswer": { "@type": "Answer", "text": `${person.name} is known for ${person.known_for} and has significantly contributed to the digital marketing industry.` } },
      { "@type": "Question", "name": `Where is ${person.name} from?`,
        "acceptedAnswer": { "@type": "Answer", "text": `${person.name} is ${person.nationality}, based in ${person.city}, ${person.country}.` } },
    ]
  };

  const relatedEntityLinks = person.relatedEntities
    .map(e => `<li><a href="/entity/${e}/">${e.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}</a></li>`)
    .join('\n            ');

  const relatedWikiLinks = (person.relatedWiki || [])
    .map(w => `<li><a href="/wiki/${w}/">${w.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}</a></li>`)
    .join('\n            ');

  const outboundLink = person.wikipedia
    ? `<a href="https://en.wikipedia.org/wiki/${person.wikipedia}" target="_blank" rel="noopener noreferrer nofollow">Wikipedia ↗</a>`
    : '';

  const bioText = person.bio || `${person.name} is a renowned ${person.role} based in ${person.city}, ${person.country}. Known for ${person.known_for}, ${person.name.split(' ')[0]} has made significant contributions to the digital marketing industry. Their work with ${person.organization} has influenced countless marketers and businesses worldwide.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${person.name} — Wiki, Career & Digital Marketing Profile | Perfoptim</title>
  <meta name="description" content="${person.name} — ${person.role}. Known for ${person.known_for}. Complete profile, career, expertise, and digital marketing contributions."/>
  <link rel="canonical" href="https://perfoptim.com/wiki/${person.slug}/"/>
  <link rel="alternate" hreflang="en" href="https://perfoptim.com/wiki/${person.slug}/"/>
  <script type="application/ld+json">${JSON.stringify(personSchema, null, 2)}</script>
  <script type="application/ld+json">${JSON.stringify(faqSchema, null, 2)}</script>
  <script type="application/ld+json">${JSON.stringify(orgSchema(), null, 2)}</script>
  <link rel="stylesheet" href="/assets/style.css"/>
</head>
<body>
  ${headerHtml()}
  <main>
    <article class="wiki-page">
      <div class="wrap">

        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a> › 
          <a href="/wiki/">Wiki</a> › 
          <span>${person.name}</span>
        </nav>

        <header class="wiki-header">
          <span class="wiki-badge">👤 Wiki Profile</span>
          <h1>${person.name} — ${person.role}</h1>
          <div class="wiki-meta">
            <span>🌍 ${person.city}, ${person.country}</span>
            <span>🏢 ${person.organization}</span>
            <span>🎯 ${person.known_for}</span>
            ${outboundLink ? `<span>${outboundLink}</span>` : ''}
          </div>
        </header>

        <div class="wiki-body">

          <section>
            <h2>Who is ${person.name}?</h2>
            <p>${bioText}</p>
          </section>

          <section>
            <h2>${person.name}'s Expertise & Contributions</h2>
            <p>${person.name} is widely recognized in the digital marketing community for 
            contributions to ${person.known_for}. Their methodologies and frameworks have been 
            adopted by agencies and marketers worldwide, including the team at Perfoptim.</p>
            <ul>
              ${person.relatedEntities.slice(0,4).map(e => 
                `<li><a href="/entity/${e}/">${e.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}</a> — area of expertise</li>`
              ).join('\n              ')}
            </ul>
          </section>

          <section>
            <h2>${person.name} Key Achievements</h2>
            <p>Over the course of their career, ${person.name} has built a reputation as one of 
            the most trusted voices in digital marketing. Their work at ${person.organization} 
            has set industry benchmarks that continue to influence best practices today.</p>
          </section>

          <section>
            <h2>Digital Marketing Philosophy</h2>
            <p>${person.name}'s approach to digital marketing centers on data-driven decisions, 
            audience-first strategies, and measurable results. These principles align closely with 
            how Perfoptim operates — every campaign is rooted in real data and tied to business outcomes.</p>
          </section>

          <section class="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div class="faq-item">
              <h3>Who is ${person.name}?</h3>
              <p>${person.name} is a ${person.role} known for ${person.known_for}.</p>
            </div>
            <div class="faq-item">
              <h3>What is ${person.name} known for?</h3>
              <p>${person.name} is known for ${person.known_for} and their significant contributions to the digital marketing industry.</p>
            </div>
            <div class="faq-item">
              <h3>Where is ${person.name} based?</h3>
              <p>${person.name} is based in ${person.city}, ${person.country}.</p>
            </div>
          </section>

        </div>

        <aside class="wiki-sidebar">

          <div class="sidebar-box profile-card">
            <h3>📋 Quick Facts</h3>
            <table>
              <tr><th>Name</th><td>${person.name}</td></tr>
              <tr><th>Role</th><td>${person.role}</td></tr>
              <tr><th>Organization</th><td>${person.organization}</td></tr>
              <tr><th>Location</th><td>${person.city}, ${person.country}</td></tr>
              <tr><th>Nationality</th><td>${person.nationality}</td></tr>
              <tr><th>Known For</th><td>${person.known_for}</td></tr>
            </table>
          </div>

          <div class="sidebar-box">
            <h3>📚 Areas of Expertise</h3>
            <ul>${relatedEntityLinks}</ul>
          </div>

          <div class="sidebar-box">
            <h3>👥 Related Profiles</h3>
            <ul>${relatedWikiLinks}</ul>
          </div>

          <div class="sidebar-cta">
            <h3>Work With Perfoptim</h3>
            <p>Apply the same strategies used by industry leaders. 50+ clients, 4.8★ Google rating.</p>
            <a href="/#contact" class="btn-primary">Get Free Audit →</a>
          </div>

        </aside>

      </div>
    </article>
  </main>
  ${footerHtml()}
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════
// ████████  ENTITY & WIKI BUILD FUNCTIONS  █████████████████████
// ═══════════════════════════════════════════════════════════════

function buildEntityPages(sitemapArr) {
  console.log('\n📚 Building Entity pages...');
  const OUT = './';
  const BASE = 'https://perfoptim.com';

  // Entity index page
  const entityIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Digital Marketing Knowledge Base — Concepts & Definitions | Perfoptim</title>
  <meta name="description" content="Complete digital marketing knowledge base. Definitions, guides, and explanations for every SEO, PPC, and marketing concept. By Perfoptim."/>
  <link rel="canonical" href="https://perfoptim.com/entity/"/>
  <script type="application/ld+json">${JSON.stringify(orgSchema(), null, 2)}</script>
  <link rel="stylesheet" href="/assets/style.css"/>
</head>
<body>
  ${headerHtml()}
  <main>
    <div class="wrap">
      <h1>Digital Marketing Knowledge Base</h1>
      <p>Complete definitions, guides, and explanations for every major digital marketing concept. 
         Built by the Perfoptim team with 15+ years of industry experience.</p>
      <div class="entity-grid">
        ${ENTITY_CONCEPTS.map(e => `
        <a href="/entity/${e.slug}/" class="entity-card">
          <h2>${e.name}</h2>
          <p>${e.alt}</p>
        </a>`).join('')}
      </div>
    </div>
  </main>
  ${footerHtml()}
</body>
</html>`;

  writeFile(`${OUT}entity/index.html`, entityIndexHtml);
  addSitemap(sitemapArr, `${BASE}/entity/`, '0.8');

  ENTITY_CONCEPTS.forEach(entity => {
    writeFile(`${OUT}entity/${entity.slug}/index.html`, generateEntityPage(entity));
    addSitemap(sitemapArr, `${BASE}/entity/${entity.slug}/`, '0.8');
  });

  console.log(`  ✅ Entity pages done: ${ENTITY_CONCEPTS.length + 1} pages`);
}

function buildWikiPages(sitemapArr) {
  console.log('\n👤 Building Wiki pages...');
  const OUT = './';
  const BASE = 'https://perfoptim.com';

  // Wiki index page
  const wikiIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Digital Marketing Experts Wiki — Profiles & Bios | Perfoptim</title>
  <meta name="description" content="Wiki profiles of top digital marketing experts, SEO leaders, and industry figures. Career bios, achievements, and contributions. By Perfoptim."/>
  <link rel="canonical" href="https://perfoptim.com/wiki/"/>
  <script type="application/ld+json">${JSON.stringify(orgSchema(), null, 2)}</script>
  <link rel="stylesheet" href="/assets/style.css"/>
</head>
<body>
  ${headerHtml()}
  <main>
    <div class="wrap">
      <h1>Digital Marketing Experts — Wiki Profiles</h1>
      <p>In-depth profiles of the world's leading digital marketing experts, SEO pioneers, 
         and industry innovators — curated by the Perfoptim team.</p>
      <div class="wiki-grid">
        ${WIKI_PEOPLE.map(p => `
        <a href="/wiki/${p.slug}/" class="wiki-card ${p.isPrimary ? 'wiki-card-primary' : ''}">
          <h2>${p.name}</h2>
          <p>${p.role}</p>
          <span>${p.city}, ${p.country}</span>
        </a>`).join('')}
      </div>
    </div>
  </main>
  ${footerHtml()}
</body>
</html>`;

  writeFile(`${OUT}wiki/index.html`, wikiIndexHtml);
  addSitemap(sitemapArr, `${BASE}/wiki/`, '0.8');

  WIKI_PEOPLE.forEach(person => {
    writeFile(`${OUT}wiki/${person.slug}/index.html`, generateWikiPage(person));
    addSitemap(sitemapArr, `${BASE}/wiki/${person.slug}/`, '0.8');
  });

  console.log(`  ✅ Wiki pages done: ${WIKI_PEOPLE.length + 1} pages`);
}

// ═══════════════════════════════════════════════════════════════
// ████████████  HEADER HTML  ███████████████████████════════════
// ═══════════════════════════════════════════════════════════════

function headerHtml() {
  return `<header class="site-header">
    <div class="wrap header-inner">
      <a href="/" class="logo-link" aria-label="Perfoptim Home">
        <img src="https://perfoptim.com/wp-content/uploads/2024/11/perfoptim-logo-1-1024x576.png"
             alt="Perfoptim Logo" width="140" height="79" loading="eager"/>
      </a>
      <nav class="main-nav" aria-label="Main Navigation">
        <ul>
          <li><a href="/seo-services/">SEO</a></li>
          <li><a href="/ppc-advertising/">PPC</a></li>
          <li><a href="/lead-generation/">Lead Gen</a></li>
          <li><a href="/web-design-development/">Web Design</a></li>
          <li><a href="/entity/">Knowledge Base</a></li>
          <li><a href="/wiki/">Wiki</a></li>
          <li><a href="/in/">India</a></li>
          <li><a href="/ca/">Canada</a></li>
        </ul>
      </nav>
      <a href="/#contact" class="btn-primary header-cta">Free Audit →</a>
    </div>
  </header>`;
}

// ═══════════════════════════════════════════════════════════════
// ████████████████  ENTRY POINT  ███████████████════════════════
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// ████████████  BUILD FUNCTIONS  ███════════════════════════════
// ═══════════════════════════════════════════════════════════════

function buildSitemapXml(urls) {
  const entries = urls.map(u => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastmod || TODAY}</lastmod>
    <changefreq>${u.changefreq || 'monthly'}</changefreq>
    <priority>${u.priority || '0.8'}</priority>
  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
}

function buildSitemapIndex(usaUrls, indiaUrls, canadaUrls, sharedUrls) {
  const files = [];
  if (usaUrls && usaUrls.length) {
    fs.writeFileSync('./sitemap-usa.xml', buildSitemapXml(usaUrls), 'utf8');
    files.push(`  <sitemap><loc>${SITE_URL}/sitemap-usa.xml</loc><lastmod>${TODAY}</lastmod></sitemap>`);
  }
  if (indiaUrls && indiaUrls.length) {
    fs.mkdirSync('./in', { recursive: true });
    fs.writeFileSync('./in/sitemap.xml', buildSitemapXml(indiaUrls), 'utf8');
    files.push(`  <sitemap><loc>${SITE_URL}/in/sitemap.xml</loc><lastmod>${TODAY}</lastmod></sitemap>`);
  }
  if (canadaUrls && canadaUrls.length) {
    fs.mkdirSync('./ca', { recursive: true });
    fs.writeFileSync('./ca/sitemap.xml', buildSitemapXml(canadaUrls), 'utf8');
    files.push(`  <sitemap><loc>${SITE_URL}/ca/sitemap.xml</loc><lastmod>${TODAY}</lastmod></sitemap>`);
  }
  if (sharedUrls && sharedUrls.length) {
    fs.writeFileSync('./sitemap-entity-wiki.xml', buildSitemapXml(sharedUrls), 'utf8');
    files.push(`  <sitemap><loc>${SITE_URL}/sitemap-entity-wiki.xml</loc><lastmod>${TODAY}</lastmod></sitemap>`);
  }
  fs.writeFileSync('./sitemap-index.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${files.join('\n')}\n</sitemapindex>`,
    'utf8');
  console.log(`  🗺️  Sitemap index: ${files.length} sitemaps`);
}

function generateServicePage({ service, industry, location, city, prefix = '', region = 'usa' }) {
  const industryLabel = industry ? ` for ${industry.name}` : '';
  const locationLabel = city
    ? ` in ${city.name}, ${location ? location.abbr || location.name : ''}`
    : (location ? ` in ${location.name}` : '');
  const title = `${service.name}${industryLabel}${locationLabel} | Perfoptim`;
  const h1 = `${service.name}${industryLabel}${locationLabel}`;
  const urlParts = prefix
    ? [prefix, location?.slug, city?.slug, industry ? `${service.slug}-for-${industry.slug}` : service.slug]
    : [location?.slug, city?.slug, industry ? `${service.slug}-for-${industry.slug}` : service.slug];
  const canonical = toUrl(urlParts);
  const relatedEntities = (SERVICE_ENTITY_MAP[service.slug] || []).slice(0, 4);
  const entityLinks = relatedEntities.map(e => {
    const ent = ENTITY_TOPICS.find(x => x.slug === e);
    return ent ? `<a href="/entity/${ent.slug}/">${ent.name}</a>` : '';
  }).filter(Boolean).join(' · ');

  const breadcrumbs = [
    `<a href="/">Home</a>`,
    prefix ? `<a href="/${prefix}/">${prefix.toUpperCase()}</a>` : null,
    location ? `<a href="${prefix ? '/'+prefix : ''}/${location.slug}/">${location.name}</a>` : null,
    city ? `<a href="${prefix ? '/'+prefix : ''}/${location?.slug}/${city.slug}/">${city.name}</a>` : null,
    `<span>${service.name}${industry ? ' for '+industry.name : ''}</span>`
  ].filter(Boolean).join(' › ');

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": h1,
    "provider": { "@type": "Organization", "@id": `${SITE_URL}/#organization` },
    "areaServed": city?.name || location?.name || (region === 'india' ? 'India' : region === 'canada' ? 'Canada' : 'United States'),
    "url": canonical,
    "description": `${service.summary}${industry ? ' For '+industry.name+'.' : ''}`
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${esc(title)}</title>
<meta name="description" content="${esc(service.summary)}${industry ? ' For '+esc(industry.name)+'.' : ''}${locationLabel ? ' Serving'+esc(locationLabel)+'.' : ''}"/>
<link rel="canonical" href="${canonical}"/>
<script type="application/ld+json">${schema}</script>
<style>${STYLE}</style>
</head>
<body>
<a class="skip" href="#main">Skip to main content</a>
${regionNav(prefix ? '/'+prefix : '')}
<main id="main">
<div class="wrap">
  <nav class="breadcrumbs" aria-label="Breadcrumb">${breadcrumbs}</nav>
  <section class="hero">
    <h1>${esc(h1)}</h1>
    <p>${esc(service.summary)}${industry ? ' Built for '+esc(industry.name)+' businesses.' : ''}</p>
    <div class="badges">
      <span class="badge">⭐ ${BUSINESS.ratingValue} Google Rating</span>
      <span class="badge">✅ ${BUSINESS.clientsServed} Clients</span>
      <span class="badge">📅 ${BUSINESS.yearsInBusiness} Experience</span>
      <span class="badge">🎯 Free Audit</span>
    </div>
  </section>
  <section class="section">
    <h2>Why Choose Perfoptim for ${esc(service.name)}?</h2>
    <div class="grid grid-2">
      <div class="card"><h3>📊 Performance-First</h3><p>Every campaign tied to measurable revenue goals — not vanity metrics.</p></div>
      <div class="card"><h3>🔍 Deep Expertise</h3><p>${esc(service.summary)}</p></div>
      <div class="card"><h3>📍 Local Knowledge</h3><p>We understand${locationLabel ? esc(locationLabel)+' market dynamics' : ' your target market'} inside out.</p></div>
      <div class="card"><h3>🤝 Transparent Reporting</h3><p>Monthly reports with clear KPIs. No jargon. Just results.</p></div>
    </div>
  </section>
  ${relatedEntities.length ? `<section class="section"><p class="kicker">Related Concepts</p><p>${entityLinks}</p></section>` : ''}
  <section class="section cta card">
    <h2>Get a Free ${esc(service.name)} Audit</h2>
    <p>We'll review your setup and show exactly what's needed to grow${locationLabel ? esc(locationLabel) : ''}.</p>
    <p><a href="mailto:${BUSINESS.email}">📧 ${BUSINESS.email}</a> &nbsp;|&nbsp; <a href="tel:${BUSINESS.phoneIndia}">📞 ${BUSINESS.phoneIndia}</a></p>
  </section>
</div>
</main>
${footerHtml()}
</body>
</html>`;
}

function buildUSA() {
  console.log('\n🇺🇸 Building USA pages...');
  CORE_SERVICES.forEach(service => {
    writeFile(toFile([service.slug]), generateServicePage({ service }));
    addSitemap('usa', [service.slug], '0.9');
  });
  CORE_SERVICES.forEach(service => {
    CORE_INDUSTRIES.forEach(industry => {
      writeFile(toFile([`${service.slug}-for-${industry.slug}`]), generateServicePage({ service, industry }));
      addSitemap('usa', [`${service.slug}-for-${industry.slug}`], '0.85');
    });
  });
  USA_LOCATIONS.forEach(state => {
    CORE_SERVICES.forEach(service => {
      writeFile(toFile([state.slug, service.slug]), generateServicePage({ service, location: state }));
      addSitemap('usa', [state.slug, service.slug], '0.75');
    });
    USA_PRIORITY_COMBOS.forEach(([sS, iS]) => {
      const sv = CORE_SERVICES.find(s => s.slug === sS), ind = CORE_INDUSTRIES.find(i => i.slug === iS);
      if (!sv || !ind) return;
      writeFile(toFile([state.slug, `${sS}-for-${iS}`]), generateServicePage({ service: sv, industry: ind, location: state }));
      addSitemap('usa', [state.slug, `${sS}-for-${iS}`], '0.85');
    });
    state.cities.forEach(city => {
      CORE_SERVICES.forEach(service => {
        writeFile(toFile([state.slug, city.slug, service.slug]), generateServicePage({ service, location: state, city }));
        addSitemap('usa', [state.slug, city.slug, service.slug], '0.75');
      });
      USA_PRIORITY_COMBOS.forEach(([sS, iS]) => {
        const sv = CORE_SERVICES.find(s => s.slug === sS), ind = CORE_INDUSTRIES.find(i => i.slug === iS);
        if (!sv || !ind) return;
        writeFile(toFile([state.slug, city.slug, `${sS}-for-${iS}`]), generateServicePage({ service: sv, industry: ind, location: state, city }));
        addSitemap('usa', [state.slug, city.slug, `${sS}-for-${iS}`], '0.85');
      });
    });
  });
  console.log(`  ✅ USA done. URLs: ${sitemaps.usa.length}`);
}

function buildIndia() {
  console.log('\n🇮🇳 Building India pages...');
  const iSvcs = [...CORE_SERVICES, ...INDIA_EXTRA_SERVICES];
  const iInds = [...CORE_INDUSTRIES, ...INDIA_EXTRA_INDUSTRIES];
  const p = 'in';
  iSvcs.forEach(service => {
    writeFile(toFile([p, 'services', service.slug]), generateServicePage({ service, prefix: p, region: 'india' }));
    addSitemap('india', [p, 'services', service.slug], '0.9');
  });
  iSvcs.forEach(service => {
    iInds.forEach(industry => {
      writeFile(toFile([p, `${service.slug}-for-${industry.slug}`]), generateServicePage({ service, industry, prefix: p, region: 'india' }));
      addSitemap('india', [p, `${service.slug}-for-${industry.slug}`], '0.85');
    });
  });
  INDIA_LOCATIONS.forEach(state => {
    iSvcs.forEach(service => {
      writeFile(toFile([p, state.slug, service.slug]), generateServicePage({ service, location: state, prefix: p, region: 'india' }));
      addSitemap('india', [p, state.slug, service.slug], '0.75');
    });
    INDIA_PRIORITY_COMBOS.forEach(([sS, iS]) => {
      const sv = iSvcs.find(s => s.slug === sS), ind = iInds.find(i => i.slug === iS);
      if (!sv || !ind) return;
      writeFile(toFile([p, state.slug, `${sS}-for-${iS}`]), generateServicePage({ service: sv, industry: ind, location: state, prefix: p, region: 'india' }));
      addSitemap('india', [p, state.slug, `${sS}-for-${iS}`], '0.85');
    });
    state.cities.forEach(city => {
      iSvcs.forEach(service => {
        writeFile(toFile([p, state.slug, city.slug, service.slug]), generateServicePage({ service, location: state, city, prefix: p, region: 'india' }));
        addSitemap('india', [p, state.slug, city.slug, service.slug], '0.75');
      });
      INDIA_PRIORITY_COMBOS.forEach(([sS, iS]) => {
        const sv = iSvcs.find(s => s.slug === sS), ind = iInds.find(i => i.slug === iS);
        if (!sv || !ind) return;
        writeFile(toFile([p, state.slug, city.slug, `${sS}-for-${iS}`]), generateServicePage({ service: sv, industry: ind, location: state, city, prefix: p, region: 'india' }));
        addSitemap('india', [p, state.slug, city.slug, `${sS}-for-${iS}`], '0.85');
      });
    });
  });
  console.log(`  ✅ India done. URLs: ${sitemaps.india.length}`);
}

function buildCanada() {
  console.log('\n🇨🇦 Building Canada pages...');
  const cSvcs = [...CORE_SERVICES, ...CANADA_EXTRA_SERVICES];
  const cInds = [...CORE_INDUSTRIES, ...CANADA_EXTRA_INDUSTRIES];
  const p = 'ca';
  cSvcs.forEach(service => {
    writeFile(toFile([p, 'services', service.slug]), generateServicePage({ service, prefix: p, region: 'canada' }));
    addSitemap('canada', [p, 'services', service.slug], '0.9');
  });
  cSvcs.forEach(service => {
    cInds.forEach(industry => {
      writeFile(toFile([p, `${service.slug}-for-${industry.slug}`]), generateServicePage({ service, industry, prefix: p, region: 'canada' }));
      addSitemap('canada', [p, `${service.slug}-for-${industry.slug}`], '0.85');
    });
  });
  CANADA_LOCATIONS.forEach(province => {
    cSvcs.forEach(service => {
      writeFile(toFile([p, province.slug, service.slug]), generateServicePage({ service, location: province, prefix: p, region: 'canada' }));
      addSitemap('canada', [p, province.slug, service.slug], '0.75');
    });
    CANADA_PRIORITY_COMBOS.forEach(([sS, iS]) => {
      const sv = cSvcs.find(s => s.slug === sS), ind = cInds.find(i => i.slug === iS);
      if (!sv || !ind) return;
      writeFile(toFile([p, province.slug, `${sS}-for-${iS}`]), generateServicePage({ service: sv, industry: ind, location: province, prefix: p, region: 'canada' }));
      addSitemap('canada', [p, province.slug, `${sS}-for-${iS}`], '0.85');
    });
    province.cities.forEach(city => {
      cSvcs.forEach(service => {
        writeFile(toFile([p, province.slug, city.slug, service.slug]), generateServicePage({ service, location: province, city, prefix: p, region: 'canada' }));
        addSitemap('canada', [p, province.slug, city.slug, service.slug], '0.75');
      });
      CANADA_PRIORITY_COMBOS.forEach(([sS, iS]) => {
        const sv = cSvcs.find(s => s.slug === sS), ind = cInds.find(i => i.slug === iS);
        if (!sv || !ind) return;
        writeFile(toFile([p, province.slug, city.slug, `${sS}-for-${iS}`]), generateServicePage({ service: sv, industry: ind, location: province, city, prefix: p, region: 'canada' }));
        addSitemap('canada', [p, province.slug, city.slug, `${sS}-for-${iS}`], '0.85');
      });
    });
  });
  console.log(`  ✅ Canada done. URLs: ${sitemaps.canada.length}`);
}

// ════════════════════  ENTRY POINT  ════════════════════

console.log('╔══════════════════════════════════════════════════╗');
console.log('║  PERFOPTIM — MASTER PROGRAMMATIC SEO GENERATOR  ║');
console.log('║  USA + India + Canada + Entity + Wiki            ║');
console.log('╚══════════════════════════════════════════════════╝');

const startTime = Date.now();
const sitemapShared = [];

if (RUN_USA)    buildUSA();
if (RUN_INDIA)  buildIndia();
if (RUN_CANADA) buildCanada();

buildEntityPages(sitemapShared);
buildWikiPages(sitemapShared);
buildSitemapIndex(sitemaps.usa, sitemaps.india, sitemaps.canada, sitemapShared);

const secs = ((Date.now() - startTime) / 1000).toFixed(1);
console.log('\n╔══════════════════════════════════════════════════╗');
console.log(`║  ✅ BUILD COMPLETE in ${secs}s`);
console.log(`║  📄 Total pages: ${totalPages.toLocaleString()}`);
console.log(`║  🇺🇸  USA:    ${sitemaps.usa.length} URLs`);
console.log(`║  🇮🇳  India:  ${sitemaps.india.length} URLs`);
console.log(`║  🇨🇦  Canada: ${sitemaps.canada.length} URLs`);
console.log(`║  📚 Entity+Wiki: ${sitemapShared.length} URLs`);
console.log('╚══════════════════════════════════════════════════╝');
