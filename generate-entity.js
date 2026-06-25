/* generate-entity.js
 * Programmatic generator for perfoptim.com knowledge-base pages:
 *   /entity/{slug}/  — 40 digital-marketing concept definitions + index
 *   /wiki/{slug}/    — 15 industry figure profiles + index
 *   sitemap-entity-wiki.xml — combined sitemap
 *
 * No external dependencies — Node.js built-ins only.
 * Run:  node generate-entity.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://perfoptim.com';
const TODAY = new Date().toISOString().split('T')[0];
const ROOT = __dirname;

/* ===================================================================
 * ENTITY CONCEPTS DATA (40 topics)
 * =================================================================== */
const ENTITY_CONCEPTS = [
  { slug: "search-engine-optimization", name: "Search Engine Optimization (SEO)",
    alt: "The process of improving website visibility in organic search results",
    definition: "Search Engine Optimization (SEO) is the practice of optimizing websites, content, and technical infrastructure to rank higher in search engine results pages (SERPs) for relevant queries — without paying for placement.",
    category: "Core SEO",
    relatedServices: ["seo-services", "content-marketing", "web-design-development"],
    relatedEntities: ["technical-seo", "on-page-seo", "backlink", "topical-authority", "schema-markup"] },

  { slug: "technical-seo", name: "Technical SEO",
    alt: "Backend optimization for crawlability and indexation",
    definition: "Technical SEO covers the non-content aspects of SEO — site speed, crawlability, indexation, Core Web Vitals, mobile-friendliness, HTTPS, structured data, and XML sitemaps — that determine whether search engines can properly access and rank your content.",
    category: "Core SEO",
    relatedServices: ["seo-services", "web-design-development"],
    relatedEntities: ["search-engine-optimization", "schema-markup", "core-web-vitals"] },

  { slug: "on-page-seo", name: "On-Page SEO",
    alt: "Optimizing individual pages for target keywords",
    definition: "On-page SEO refers to optimizing the content and HTML elements of individual web pages — title tags, meta descriptions, headers (H1-H6), internal linking, keyword placement, and content quality — to improve relevance signals for search engines.",
    category: "Core SEO",
    relatedServices: ["seo-services", "content-marketing"],
    relatedEntities: ["search-engine-optimization", "technical-seo", "topical-authority"] },

  { slug: "off-page-seo", name: "Off-Page SEO",
    alt: "Building authority through external signals",
    definition: "Off-page SEO encompasses all optimization activities that happen outside your website — primarily link building, brand mentions, social signals, and digital PR — that build domain authority and trust in the eyes of search engines.",
    category: "Core SEO",
    relatedServices: ["seo-services", "content-marketing"],
    relatedEntities: ["backlink", "search-engine-optimization", "topical-authority"] },

  { slug: "backlink", name: "Backlink",
    alt: "External links pointing to your website",
    definition: "A backlink is a hyperlink from one website pointing to another. Backlinks remain one of Google's top ranking factors — each quality backlink acts as a 'vote of confidence' that signals authority and trustworthiness to search engines.",
    category: "Core SEO",
    relatedServices: ["seo-services", "content-marketing"],
    relatedEntities: ["off-page-seo", "domain-authority", "search-engine-optimization"] },

  { slug: "topical-authority", name: "Topical Authority",
    alt: "Being the definitive source on a subject",
    definition: "Topical authority is the level of expertise and comprehensiveness a website demonstrates on a specific subject. Sites with high topical authority cover a topic more completely than competitors — earning trust from both users and search engines.",
    category: "Advanced SEO",
    relatedServices: ["seo-services", "content-marketing", "ai-seo-services"],
    relatedEntities: ["search-engine-optimization", "entity-seo", "knowledge-graph"] },

  { slug: "schema-markup", name: "Schema Markup",
    alt: "Structured data code that helps search engines understand content",
    definition: "Schema markup is structured data vocabulary (from Schema.org) added to HTML that helps search engines understand the context of content — enabling rich results like star ratings, FAQs, events, and product prices in SERPs.",
    category: "Technical SEO",
    relatedServices: ["seo-services", "web-design-development"],
    relatedEntities: ["technical-seo", "entity-seo", "knowledge-graph"] },

  { slug: "entity-seo", name: "Entity SEO",
    alt: "Optimizing for entities rather than just keywords",
    definition: "Entity SEO is the practice of optimizing a brand or person as a recognized entity in Google's Knowledge Graph — going beyond keyword matching to build topical associations, structured data, and entity disambiguation that AI-driven search algorithms reward.",
    category: "Advanced SEO",
    relatedServices: ["seo-services", "ai-seo-services", "orm-services"],
    relatedEntities: ["knowledge-graph", "schema-markup", "topical-authority"] },

  { slug: "knowledge-graph", name: "Knowledge Graph",
    alt: "Google's database of real-world entities and relationships",
    definition: "Google's Knowledge Graph is a structured database of real-world entities (people, places, organizations, concepts) and their relationships. Appearing in the Knowledge Graph via a Knowledge Panel establishes brand authority and entity recognition.",
    category: "Advanced SEO",
    relatedServices: ["seo-services", "ai-seo-services", "orm-services"],
    relatedEntities: ["entity-seo", "schema-markup", "topical-authority"] },

  { slug: "ai-seo", name: "AI SEO",
    alt: "Optimizing content for AI-powered search engines",
    definition: "AI SEO refers to optimizing websites and content for AI-powered search engines and answer engines — including Google AI Overviews, ChatGPT, Perplexity, and Bing Copilot. It focuses on entity clarity, topical depth, and citation worthiness rather than traditional keyword density.",
    category: "Advanced SEO",
    relatedServices: ["ai-seo-services", "seo-services", "content-marketing"],
    relatedEntities: ["entity-seo", "knowledge-graph", "topical-authority"] },

  { slug: "core-web-vitals", name: "Core Web Vitals",
    alt: "Google's user experience page quality metrics",
    definition: "Core Web Vitals are Google's standardized metrics for user experience: LCP (Largest Contentful Paint — loading), INP (Interaction to Next Paint — interactivity), and CLS (Cumulative Layout Shift — visual stability). Passing all three is a confirmed Google ranking factor.",
    category: "Technical SEO",
    relatedServices: ["seo-services", "web-design-development", "cro-services"],
    relatedEntities: ["technical-seo", "search-engine-optimization"] },

  { slug: "google-search-console", name: "Google Search Console",
    alt: "Google's free tool for monitoring search performance",
    definition: "Google Search Console (GSC) is a free Google tool that lets website owners monitor search performance, submit sitemaps, identify crawl errors, and see which queries drive traffic. It is essential for diagnosing and improving SEO performance.",
    category: "SEO Tools",
    relatedServices: ["seo-services"],
    relatedEntities: ["search-engine-optimization", "technical-seo", "core-web-vitals"] },

  { slug: "google-ads", name: "Google Ads",
    alt: "Google's pay-per-click advertising platform",
    definition: "Google Ads (formerly Google AdWords) is Google's pay-per-click advertising platform that displays ads in search results, YouTube, Gmail, and the Google Display Network. It enables advertisers to target specific keywords, audiences, and locations with full budget control.",
    category: "Paid Advertising",
    relatedServices: ["ppc-advertising", "performance-marketing", "lead-generation"],
    relatedEntities: ["pay-per-click", "conversion-rate-optimization", "lead-generation"] },

  { slug: "pay-per-click", name: "Pay-Per-Click (PPC)",
    alt: "Advertising model where you pay only per click",
    definition: "Pay-per-click (PPC) is a digital advertising model where advertisers pay a fee each time someone clicks their ad. Unlike organic SEO, PPC delivers immediate visibility and is fully measurable — making it ideal for lead generation and direct response campaigns.",
    category: "Paid Advertising",
    relatedServices: ["ppc-advertising", "performance-marketing"],
    relatedEntities: ["google-ads", "conversion-rate-optimization", "lead-generation"] },

  { slug: "conversion-rate-optimization", name: "Conversion Rate Optimization (CRO)",
    alt: "Improving the percentage of visitors who take action",
    definition: "Conversion Rate Optimization (CRO) is the systematic process of increasing the percentage of website visitors who complete a desired action — filling a form, making a purchase, calling a number — through A/B testing, UX improvements, and data analysis.",
    category: "Performance Marketing",
    relatedServices: ["cro-services", "performance-marketing", "web-design-development"],
    relatedEntities: ["lead-generation", "google-ads", "pay-per-click"] },

  { slug: "lead-generation", name: "Lead Generation",
    alt: "Attracting and converting prospects into business inquiries",
    definition: "Lead generation is the process of attracting potential customers (leads) and converting them into business inquiries through digital channels — SEO, PPC, social media, email, and content — with the goal of filling a sales pipeline with qualified prospects.",
    category: "Performance Marketing",
    relatedServices: ["lead-generation", "ppc-advertising", "performance-marketing"],
    relatedEntities: ["conversion-rate-optimization", "google-ads", "pay-per-click"] },

  { slug: "content-marketing", name: "Content Marketing",
    alt: "Creating valuable content to attract and retain customers",
    definition: "Content marketing is a strategic approach focused on creating and distributing valuable, relevant content — blog posts, videos, infographics, whitepapers — to attract and retain a clearly defined audience and ultimately drive profitable customer action.",
    category: "Content",
    relatedServices: ["content-marketing", "seo-services", "social-media-marketing"],
    relatedEntities: ["search-engine-optimization", "topical-authority", "lead-generation"] },

  { slug: "social-media-marketing", name: "Social Media Marketing",
    alt: "Using social platforms to build brand and generate leads",
    definition: "Social media marketing involves using platforms like Instagram, Facebook, LinkedIn, and X (Twitter) to build brand awareness, engage audiences, and drive traffic and leads — through both organic content and paid social advertising.",
    category: "Social Media",
    relatedServices: ["social-media-marketing", "content-marketing", "branding-design"],
    relatedEntities: ["content-marketing", "lead-generation", "branding"] },

  { slug: "local-seo", name: "Local SEO",
    alt: "Ranking for location-based searches",
    definition: "Local SEO is the optimization of a business's online presence to rank in location-based searches — 'dentist near me', 'plumber in Toronto' — through Google Business Profile optimization, local citations, reviews, and location-specific landing pages.",
    category: "Local Search",
    relatedServices: ["seo-services", "google-my-business"],
    relatedEntities: ["search-engine-optimization", "google-business-profile", "schema-markup"] },

  { slug: "google-business-profile", name: "Google Business Profile",
    alt: "Free Google listing for local businesses",
    definition: "Google Business Profile (formerly Google My Business) is a free tool that lets businesses manage their presence in Google Search and Maps. An optimized GBP with complete information, photos, and consistent reviews is the #1 local SEO ranking factor.",
    category: "Local Search",
    relatedServices: ["seo-services", "google-my-business"],
    relatedEntities: ["local-seo", "schema-markup", "online-reputation-management"] },

  { slug: "online-reputation-management", name: "Online Reputation Management (ORM)",
    alt: "Controlling what appears when people search for your brand",
    definition: "Online Reputation Management (ORM) is the practice of monitoring, influencing, and controlling a brand's online presence — managing reviews, suppressing negative content, and building positive signals across Google, social media, and review platforms.",
    category: "Brand",
    relatedServices: ["orm-services", "seo-services", "content-marketing"],
    relatedEntities: ["branding", "social-media-marketing", "entity-seo"] },

  { slug: "email-marketing", name: "Email Marketing",
    alt: "Direct communication via email to nurture and convert leads",
    definition: "Email marketing is the use of email campaigns to communicate with prospects and customers — newsletters, drip sequences, promotional offers, and transactional messages — to nurture relationships, drive repeat business, and convert leads into customers.",
    category: "Direct Marketing",
    relatedServices: ["email-marketing", "content-marketing", "lead-generation"],
    relatedEntities: ["lead-generation", "conversion-rate-optimization", "content-marketing"] },

  { slug: "performance-marketing", name: "Performance Marketing",
    alt: "Advertising where you pay only for measurable outcomes",
    definition: "Performance marketing is a results-based digital advertising approach where advertisers pay only for specific, measurable outcomes — clicks, leads, sales, or installs — rather than impressions. It encompasses PPC, affiliate marketing, CPA campaigns, and paid social.",
    category: "Performance Marketing",
    relatedServices: ["performance-marketing", "ppc-advertising", "lead-generation"],
    relatedEntities: ["pay-per-click", "conversion-rate-optimization", "google-ads"] },

  { slug: "domain-authority", name: "Domain Authority",
    alt: "A metric predicting a website's search ranking potential",
    definition: "Domain Authority (DA) is a search ranking score (1-100) developed by Moz that predicts how well a website will rank in SERPs. While not a direct Google metric, DA correlates strongly with ranking performance and is widely used to assess site strength and backlink quality.",
    category: "SEO Metrics",
    relatedServices: ["seo-services"],
    relatedEntities: ["backlink", "off-page-seo", "search-engine-optimization"] },

  { slug: "keyword-research", name: "Keyword Research",
    alt: "Finding the search terms your customers use",
    definition: "Keyword research is the process of identifying the specific words and phrases people type into search engines when looking for products or services. It informs content strategy, on-page optimization, and PPC targeting by revealing search volume, competition, and intent.",
    category: "Core SEO",
    relatedServices: ["seo-services", "content-marketing", "ppc-advertising"],
    relatedEntities: ["search-engine-optimization", "on-page-seo", "topical-authority"] },

  { slug: "search-intent", name: "Search Intent",
    alt: "The reason behind a user's search query",
    definition: "Search intent (user intent) is the primary goal a user has when entering a query into a search engine — informational, navigational, commercial, or transactional. Matching content to search intent is the most critical on-page SEO factor in modern Google algorithms.",
    category: "Core SEO",
    relatedServices: ["seo-services", "content-marketing"],
    relatedEntities: ["keyword-research", "on-page-seo", "topical-authority"] },

  { slug: "serp", name: "SERP (Search Engine Results Page)",
    alt: "The page Google shows after a search query",
    definition: "A SERP (Search Engine Results Page) is the page displayed by a search engine in response to a query. Modern SERPs include organic results, paid ads, local map packs, featured snippets, image carousels, and AI Overviews — each requiring different optimization strategies.",
    category: "SEO Concepts",
    relatedServices: ["seo-services", "ppc-advertising"],
    relatedEntities: ["search-engine-optimization", "featured-snippet", "google-ads"] },

  { slug: "featured-snippet", name: "Featured Snippet",
    alt: "The answer box at the top of Google results",
    definition: "A featured snippet is a selected search result that appears above organic results in a box, directly answering the user's query with text, a list, or a table extracted from a webpage. Ranking in position zero via featured snippets dramatically increases click-through rate.",
    category: "SEO Concepts",
    relatedServices: ["seo-services", "content-marketing"],
    relatedEntities: ["serp", "search-intent", "on-page-seo"] },

  { slug: "xml-sitemap", name: "XML Sitemap",
    alt: "A file that tells search engines which pages to crawl",
    definition: "An XML sitemap is a file that lists all the important URLs on a website, helping search engine crawlers discover and index pages efficiently. Submitting an XML sitemap via Google Search Console accelerates indexation — critical for large programmatic SEO sites.",
    category: "Technical SEO",
    relatedServices: ["seo-services", "web-design-development"],
    relatedEntities: ["technical-seo", "google-search-console", "search-engine-optimization"] },

  { slug: "crawlability", name: "Crawlability",
    alt: "How easily search engines can access your website",
    definition: "Crawlability refers to how easily search engine bots (Googlebot) can access, crawl, and index a website's pages. Poor crawlability — from broken internal links, blocked robots.txt, slow load speeds, or redirect chains — directly causes ranking losses.",
    category: "Technical SEO",
    relatedServices: ["seo-services", "web-design-development"],
    relatedEntities: ["technical-seo", "xml-sitemap", "core-web-vitals"] },

  { slug: "indexation", name: "Indexation",
    alt: "Whether Google has added your pages to its search index",
    definition: "Indexation is the process by which search engines add web pages to their searchable index. Pages not in Google's index cannot rank. Common indexation issues include noindex tags, duplicate content, thin content, and canonicalization errors.",
    category: "Technical SEO",
    relatedServices: ["seo-services"],
    relatedEntities: ["crawlability", "xml-sitemap", "technical-seo"] },

  { slug: "branding", name: "Branding",
    alt: "Building a distinctive and memorable brand identity",
    definition: "Branding is the process of creating a distinctive identity for a business — including name, logo, visual design, messaging, and brand values — that differentiates it from competitors and builds emotional connection and trust with customers.",
    category: "Brand",
    relatedServices: ["branding-design", "social-media-marketing", "content-marketing"],
    relatedEntities: ["online-reputation-management", "content-marketing", "social-media-marketing"] },

  { slug: "programmatic-seo", name: "Programmatic SEO",
    alt: "Automatically generating large numbers of SEO-optimized pages",
    definition: "Programmatic SEO is the practice of automatically generating large numbers of unique, SEO-optimized pages from structured data — targeting long-tail keywords at scale. Used by companies like Tripadvisor, Zillow, and Nomad List to rank for millions of search queries.",
    category: "Advanced SEO",
    relatedServices: ["seo-services", "web-design-development"],
    relatedEntities: ["search-engine-optimization", "indexation", "topical-authority"] },

  { slug: "hreflang", name: "Hreflang",
    alt: "HTML attribute that specifies language and region for a page",
    definition: "Hreflang is an HTML attribute that tells search engines the language and geographic targeting of a webpage — essential for multilingual and multi-regional websites. Correct hreflang implementation prevents duplicate content issues and serves the right language page to the right user.",
    category: "International SEO",
    relatedServices: ["seo-services", "bilingual-seo"],
    relatedEntities: ["international-seo", "technical-seo", "search-engine-optimization"] },

  { slug: "international-seo", name: "International SEO",
    alt: "Optimizing websites for multiple countries and languages",
    definition: "International SEO is the practice of optimizing a website to rank in multiple countries and languages — using hreflang tags, geotargeting, ccTLDs or subdirectories, and localized content to ensure the right version of your site reaches the right global audience.",
    category: "International SEO",
    relatedServices: ["seo-services", "bilingual-seo"],
    relatedEntities: ["hreflang", "search-engine-optimization", "technical-seo"] },

  { slug: "page-speed", name: "Page Speed",
    alt: "How fast a web page loads for users",
    definition: "Page speed refers to how quickly a webpage's content fully loads for a user. Google uses page speed as a ranking factor — measured through Core Web Vitals (LCP, INP, CLS). Faster pages improve rankings, reduce bounce rates, and increase conversion rates.",
    category: "Technical SEO",
    relatedServices: ["seo-services", "web-design-development"],
    relatedEntities: ["core-web-vitals", "technical-seo", "crawlability"] },

  { slug: "mobile-seo", name: "Mobile SEO",
    alt: "Optimizing websites for mobile device users",
    definition: "Mobile SEO is the optimization of websites for mobile devices. Since Google uses mobile-first indexing, the mobile version of your site is what Google crawls and ranks. Mobile SEO covers responsive design, touch UX, mobile page speed, and mobile-specific content considerations.",
    category: "Technical SEO",
    relatedServices: ["seo-services", "web-design-development"],
    relatedEntities: ["technical-seo", "core-web-vitals", "search-engine-optimization"] },

  { slug: "anchor-text", name: "Anchor Text",
    alt: "The clickable text of a hyperlink",
    definition: "Anchor text is the visible, clickable text of a hyperlink. Google uses anchor text as a relevance signal — exact-match anchor text (containing the target keyword) is a strong ranking signal, while over-optimized or spammy anchor profiles can trigger manual penalties.",
    category: "Link Building",
    relatedServices: ["seo-services"],
    relatedEntities: ["backlink", "off-page-seo", "search-engine-optimization"] },

  { slug: "bounce-rate", name: "Bounce Rate",
    alt: "Percentage of visitors who leave after viewing only one page",
    definition: "Bounce rate is the percentage of website sessions where a visitor views only a single page and leaves without any interaction. While not a direct Google ranking factor, high bounce rates often indicate poor content-to-intent match, slow page speed, or UX problems.",
    category: "Analytics",
    relatedServices: ["cro-services", "seo-services", "web-design-development"],
    relatedEntities: ["conversion-rate-optimization", "core-web-vitals", "search-intent"] },

  { slug: "canonical-tag", name: "Canonical Tag",
    alt: "HTML tag that tells Google which version of a page is the master",
    definition: "A canonical tag (rel='canonical') is an HTML element that tells search engines which version of a URL is the 'master' or preferred version — preventing duplicate content issues when the same content is accessible via multiple URLs.",
    category: "Technical SEO",
    relatedServices: ["seo-services"],
    relatedEntities: ["technical-seo", "indexation", "programmatic-seo"] },

  { slug: "robots-txt", name: "Robots.txt",
    alt: "File that controls which pages search engines can crawl",
    definition: "Robots.txt is a text file placed at the root of a website that instructs search engine crawlers which pages or directories to crawl or avoid. Misconfigured robots.txt files can accidentally block Google from indexing important pages — a critical technical SEO issue.",
    category: "Technical SEO",
    relatedServices: ["seo-services"],
    relatedEntities: ["crawlability", "technical-seo", "indexation"] }
];

/* ===================================================================
 * WIKI PEOPLE DATA (15 profiles)
 * =================================================================== */
const WIKI_PEOPLE = [
  { slug: "neil-patel", name: "Neil Patel",
    role: "Digital Marketing Entrepreneur and SEO Educator",
    nationality: "American-British", city: "Las Vegas", country: "USA",
    knownFor: "Co-founding Crazy Egg, Hello Bar, and NP Digital. Publishing free SEO content at NeilPatel.com.",
    contribution: "Democratized SEO and content marketing education for millions of small business owners globally through free tools and blog content.",
    wikipedia: "Neil_Patel_(entrepreneur)",
    relatedEntities: ["search-engine-optimization", "content-marketing", "lead-generation"],
    relatedWiki: ["rand-fishkin", "brian-dean"],
    relatedServices: ["seo-services", "content-marketing"] },

  { slug: "rand-fishkin", name: "Rand Fishkin",
    role: "SEO Entrepreneur and Search Visibility Advocate",
    nationality: "American", city: "Seattle", country: "USA",
    knownFor: "Founding Moz (originally SEOmoz) and SparkToro. Creator of the concept of Domain Authority.",
    contribution: "Built the modern SEO tooling ecosystem through Moz and pioneered audience research methodology through SparkToro.",
    wikipedia: "Rand_Fishkin",
    relatedEntities: ["search-engine-optimization", "domain-authority", "topical-authority"],
    relatedWiki: ["neil-patel", "brian-dean"],
    relatedServices: ["seo-services", "content-marketing"] },

  { slug: "brian-dean", name: "Brian Dean",
    role: "SEO Publisher and Link Building Educator",
    nationality: "American", city: "Lisbon", country: "Portugal",
    knownFor: "Founding Backlinko and creating the Skyscraper Technique for link building.",
    contribution: "Created the Skyscraper Technique — a widely adopted link acquisition methodology — and built Backlinko into a top SEO education resource.",
    wikipedia: "Brian_Dean_(SEO)",
    relatedEntities: ["backlink", "off-page-seo", "search-engine-optimization"],
    relatedWiki: ["neil-patel", "rand-fishkin"],
    relatedServices: ["seo-services"] },

  { slug: "gary-vaynerchuk", name: "Gary Vaynerchuk",
    role: "Brand Builder, Social Media Strategist, and Entrepreneur",
    nationality: "American-Belarusian", city: "New York", country: "USA",
    knownFor: "Building Wine Library, founding VaynerMedia, and popularizing social media marketing as a business tool.",
    contribution: "Pioneered the concept of documenting over creating and drove mainstream adoption of social media marketing by businesses through VaynerMedia.",
    wikipedia: "Gary_Vaynerchuk",
    relatedEntities: ["social-media-marketing", "content-marketing", "branding"],
    relatedWiki: ["neil-patel"],
    relatedServices: ["social-media-marketing", "branding-design"] },

  { slug: "larry-kim", name: "Larry Kim",
    role: "Paid Media Innovator and Demand Generation Founder",
    nationality: "Canadian", city: "Boston", country: "USA",
    knownFor: "Founding WordStream (acquired for $150M+) and MobileMonkey (now Customers.ai).",
    contribution: "Revolutionized SMB access to Google Ads management through WordStream and pioneered chatbot-driven lead generation for businesses.",
    wikipedia: "Larry_Kim",
    relatedEntities: ["google-ads", "pay-per-click", "lead-generation"],
    relatedWiki: ["neil-patel"],
    relatedServices: ["ppc-advertising", "lead-generation"] },

  { slug: "aleyda-solis", name: "Aleyda Solis",
    role: "International SEO Consultant and Speaker",
    nationality: "Spanish", city: "Barcelona", country: "Spain",
    knownFor: "International and technical SEO consultancy at Orainti, hreflang.com, and SEOFOMO newsletter.",
    contribution: "Became the leading global authority on international SEO and hreflang implementation, helping enterprises rank in multiple countries and languages.",
    wikipedia: "Aleyda_Solis",
    relatedEntities: ["international-seo", "hreflang", "technical-seo"],
    relatedWiki: ["rand-fishkin"],
    relatedServices: ["seo-services"] },

  { slug: "barry-schwartz", name: "Barry Schwartz",
    role: "Search Industry Publisher and Google Algorithm Tracker",
    nationality: "American", city: "New York", country: "USA",
    knownFor: "Founding Search Engine Roundtable and serving as News Editor at Search Engine Land.",
    contribution: "Became the search industry's most reliable real-time tracker of Google algorithm updates through Search Engine Roundtable.",
    wikipedia: "Barry_Schwartz_(technologist)",
    relatedEntities: ["search-engine-optimization", "google-search-console", "serp"],
    relatedWiki: ["rand-fishkin", "neil-patel"],
    relatedServices: ["seo-services"] },

  { slug: "sundar-pichai", name: "Sundar Pichai",
    role: "CEO of Alphabet and Google",
    nationality: "Indian-American", city: "San Francisco", country: "USA",
    knownFor: "Leading Google and Alphabet as CEO, overseeing the development of Google Search, AI Overviews, and Gemini AI.",
    contribution: "Directed Google's AI-first transformation of Search, leading to AI Overviews and the integration of Gemini into SERP features that reshape modern SEO.",
    wikipedia: "Sundar_Pichai",
    relatedEntities: ["google-search-console", "google-ads", "ai-seo"],
    relatedWiki: ["satya-nadella"],
    relatedServices: ["seo-services", "ppc-advertising"] },

  { slug: "satya-nadella", name: "Satya Nadella",
    role: "CEO of Microsoft",
    nationality: "Indian-American", city: "Seattle", country: "USA",
    knownFor: "Leading Microsoft's AI-first transformation and integrating OpenAI's GPT into Bing Copilot search.",
    contribution: "Forced Google to accelerate its AI search development by integrating ChatGPT into Bing — reshaping the competitive landscape of search and SEO.",
    wikipedia: "Satya_Nadella",
    relatedEntities: ["ai-seo", "search-engine-optimization", "knowledge-graph"],
    relatedWiki: ["sundar-pichai"],
    relatedServices: ["seo-services"] },

  { slug: "pradeep-chopra", name: "Pradeep Chopra",
    role: "Indian Digital Marketing Educator and Entrepreneur",
    nationality: "Indian", city: "Delhi", country: "India",
    knownFor: "Co-founding Digital Vidya — India's first and largest digital marketing training company.",
    contribution: "Trained over 100,000 digital marketing professionals across India through Digital Vidya, shaping an entire generation of Indian digital marketers.",
    wikipedia: null,
    relatedEntities: ["search-engine-optimization", "content-marketing", "lead-generation"],
    relatedWiki: ["sorav-jain", "deepak-kanakaraju"],
    relatedServices: ["seo-services", "content-marketing"] },

  { slug: "sorav-jain", name: "Sorav Jain",
    role: "Digital Marketing Trainer and Social Media Strategist",
    nationality: "Indian", city: "Chennai", country: "India",
    knownFor: "Founding echoVME Digital and the Digital Scholar training institute. Building one of India's most followed digital marketing presences.",
    contribution: "Built a large-scale digital marketing education ecosystem in India through Digital Scholar and helped hundreds of Indian businesses build social media-first marketing strategies.",
    wikipedia: null,
    relatedEntities: ["social-media-marketing", "content-marketing", "branding"],
    relatedWiki: ["pradeep-chopra", "deepak-kanakaraju"],
    relatedServices: ["social-media-marketing", "content-marketing"] },

  { slug: "harsh-agrawal", name: "Harsh Agrawal",
    role: "Blogger, Publisher, and SEO Content Creator",
    nationality: "Indian", city: "Delhi", country: "India",
    knownFor: "Founding ShoutMeLoud — one of India's most read blogging and SEO resource sites.",
    contribution: "Inspired thousands of Indian content creators and bloggers to build SEO-driven publishing businesses through ShoutMeLoud.",
    wikipedia: null,
    relatedEntities: ["content-marketing", "search-engine-optimization", "backlink"],
    relatedWiki: ["pradeep-chopra", "sorav-jain"],
    relatedServices: ["content-marketing", "seo-services"] },

  { slug: "deepak-kanakaraju", name: "Deepak Kanakaraju",
    role: "Performance Marketing Educator and Email Marketing Authority",
    nationality: "Indian", city: "Bengaluru", country: "India",
    knownFor: "Founding PixelTrack, Digital Deepak blog, and running India's most known digital marketing mentorship program.",
    contribution: "Popularized email marketing and personal branding as career tools for Indian digital marketers through the Digital Deepak Internship Program.",
    wikipedia: null,
    relatedEntities: ["email-marketing", "performance-marketing", "lead-generation"],
    relatedWiki: ["pradeep-chopra", "sorav-jain"],
    relatedServices: ["email-marketing", "performance-marketing"] },

  { slug: "matt-diggity", name: "Matt Diggity",
    role: "SEO Operator, Affiliate Marketer, and Systems Builder",
    nationality: "American", city: "Chiang Mai", country: "Thailand",
    knownFor: "Building a portfolio of affiliate SEO sites, founding The Search Initiative agency, and running Chiang Mai SEO Conference.",
    contribution: "Systemized white-hat link building at scale and pioneered the model of SEO agencies run by practitioners who actively manage their own sites.",
    wikipedia: null,
    relatedEntities: ["off-page-seo", "backlink", "programmatic-seo"],
    relatedWiki: ["brian-dean"],
    relatedServices: ["seo-services"] },

  { slug: "lily-ray", name: "Lily Ray",
    role: "SEO Strategist and E-E-A-T Specialist",
    nationality: "American", city: "New York", country: "USA",
    knownFor: "Pioneering research into Google's E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) quality guidelines and their impact on rankings.",
    contribution: "Became the foremost authority on Google's quality rater guidelines and E-E-A-T — helping brands recover from Google Helpful Content and Core updates.",
    wikipedia: null,
    relatedEntities: ["topical-authority", "search-engine-optimization", "entity-seo"],
    relatedWiki: ["rand-fishkin", "barry-schwartz"],
    relatedServices: ["seo-services"] }
];

/* ===================================================================
 * LOOKUPS & HELPERS
 * =================================================================== */
const ENTITY_BY_SLUG = Object.fromEntries(ENTITY_CONCEPTS.map(e => [e.slug, e]));
const PERSON_BY_SLUG = Object.fromEntries(WIKI_PEOPLE.map(p => [p.slug, p]));

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function jsonEsc(s) {
  return String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}
function clip(str, n) {
  const s = String(str).replace(/\s+/g, ' ').trim();
  if (s.length <= n) return s;
  return s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…';
}
function firstSentence(str) {
  const m = String(str).match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : String(str)).trim();
}
// Convert a service slug into a readable label, e.g. "ai-seo-services" → "AI SEO Services"
function serviceLabel(slug) {
  return slug.split('-').map(w => {
    const up = { seo: 'SEO', ppc: 'PPC', cro: 'CRO', orm: 'ORM', ai: 'AI' };
    return up[w] || (w.charAt(0).toUpperCase() + w.slice(1));
  }).join(' ');
}
function writeFile(relPath, html) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html);
}

// =====================================================================
// SHARED STYLES + LAYOUT
// =====================================================================

const STYLE = `
    :root { --primary:#0a5c5c; --primary-dark:#074545; --ink:#1a1a1a; --muted:#5a6b6b; --line:#e2eaea; --bg-soft:#f4f8f8; }
    * { box-sizing: border-box; }
    html { -webkit-text-size-adjust: 100%; }
    body { margin:0; background:#ffffff; color:var(--ink);
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height:1.65; font-size:17px; }
    a { color:var(--primary); text-decoration:none; }
    a:hover { text-decoration:underline; }
    .site-header { border-bottom:1px solid var(--line); background:#ffffff; }
    .site-header .inner { max-width:860px; margin:0 auto; padding:18px 20px;
      display:flex; align-items:center; justify-content:space-between; gap:16px; }
    .logo { font-weight:800; font-size:21px; letter-spacing:-0.02em; color:var(--primary); }
    .logo:hover { text-decoration:none; }
    .nav a { color:var(--muted); font-weight:600; font-size:15px; margin-left:18px; }
    main { max-width:860px; margin:0 auto; padding:28px 20px 64px; }
    .breadcrumb { font-size:13.5px; color:var(--muted); margin:6px 0 22px; }
    .breadcrumb a { color:var(--muted); }
    .breadcrumb a:hover { color:var(--primary); }
    .breadcrumb span.sep { margin:0 7px; opacity:0.6; }
    .breadcrumb .current { color:var(--ink); font-weight:600; }
    h1 { font-size:34px; line-height:1.2; letter-spacing:-0.02em; margin:0 0 10px; }
    h2 { font-size:21px; letter-spacing:-0.01em; margin:34px 0 12px; padding-bottom:6px; border-bottom:1px solid var(--line); }
    .lede { font-size:18.5px; color:#2c3a3a; margin:0 0 8px; }
    .alt-tag { display:inline-block; font-size:13px; color:var(--muted); background:var(--bg-soft);
      border:1px solid var(--line); padding:4px 11px; border-radius:999px; margin-bottom:18px; }
    .category-tag { display:inline-block; font-size:12px; font-weight:700; text-transform:uppercase;
      letter-spacing:0.04em; color:var(--primary); background:var(--bg-soft);
      padding:4px 10px; border-radius:6px; margin-bottom:14px; }
    .badge-row { display:flex; flex-wrap:wrap; gap:10px; margin:4px 0 20px; }
    .badge { display:inline-flex; align-items:center; gap:6px; font-size:14px; font-weight:600;
      color:#fff; background:var(--primary); padding:6px 13px; border-radius:8px; }
    .badge.alt { background:var(--bg-soft); color:var(--primary); border:1px solid var(--line); }
    .link-list { list-style:none; padding:0; margin:0; display:grid;
      grid-template-columns:1fr 1fr; gap:10px; }
    .link-list li { margin:0; }
    .link-list a { display:block; border:1px solid var(--line); border-radius:9px;
      padding:11px 14px; background:#fff; font-weight:600; transition:border-color .15s, background .15s; }
    .link-list a:hover { text-decoration:none; border-color:var(--primary); background:var(--bg-soft); }
    .link-list a small { display:block; font-weight:400; color:var(--muted); font-size:13px; margin-top:2px; }
    .wiki-ext { margin:14px 0 0; }
    .wiki-ext a { font-weight:600; }
    .back-link { display:inline-block; margin-top:34px; font-weight:600; }
    .card-grid { display:grid; grid-template-columns:repeat(2, 1fr); gap:16px; margin-top:22px; }
    .card { border:1px solid var(--line); border-radius:12px; padding:18px 18px 16px;
      background:#fff; transition:border-color .15s, box-shadow .15s, transform .15s; }
    .card:hover { border-color:var(--primary); box-shadow:0 6px 20px rgba(10,92,92,.08); transform:translateY(-2px); }
    .card a.card-title { font-size:17.5px; font-weight:700; color:var(--ink); }
    .card:hover a.card-title { color:var(--primary); }
    .card a.card-title:hover { text-decoration:none; }
    .card p { margin:7px 0 0; font-size:14px; color:var(--muted); line-height:1.5; }
    .card .meta { margin-top:9px; font-size:13px; color:var(--primary); font-weight:600; }
    .intro-block { color:var(--muted); font-size:16px; margin:2px 0 6px; }
    .site-footer { border-top:1px solid var(--line); color:var(--muted); font-size:13.5px; }
    .site-footer .inner { max-width:860px; margin:0 auto; padding:24px 20px 40px; }
    @media (max-width:640px) {
      body { font-size:16px; }
      h1 { font-size:27px; }
      .link-list, .card-grid { grid-template-columns:1fr; }
      .site-header .inner { padding:14px 16px; }
      main { padding:22px 16px 52px; }
      .nav a { margin-left:12px; font-size:14px; }
    }
`;

// Build the full HTML document shell shared by every page.
function layout({ title, description, canonical, jsonld, breadcrumbHtml, body }) {
  const ld = (Array.isArray(jsonld) ? jsonld : [jsonld]).filter(Boolean)
    .map(obj => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`).join('\n  ');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${esc(canonical)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${esc(canonical)}">
  <style>${STYLE}</style>
  ${ld}
</head>
<body>
  <header class="site-header">
    <div class="inner">
      <a class="logo" href="${SITE_URL}/">Perfoptim</a>
      <nav class="nav" aria-label="Primary">
        <a href="${SITE_URL}/">Home</a>
        <a href="/entity/">Knowledge Base</a>
        <a href="/wiki/">Wiki</a>
      </nav>
    </div>
  </header>
  <main>
    ${breadcrumbHtml || ''}
    ${body}
  </main>
  <footer class="site-footer">
    <div class="inner">© ${new Date().getFullYear()} Perfoptim — Digital Marketing Agency. All rights reserved.</div>
  </footer>
</body>
</html>`;
}

// Render a list of related-entity links (filters out unknown slugs).
function entityLinks(slugs) {
  return (slugs || []).map(s => ENTITY_BY_SLUG[s]).filter(Boolean).map(e =>
    `<li><a href="/entity/${e.slug}/">${esc(e.name)}<small>${esc(e.alt)}</small></a></li>`).join('\n      ');
}
// Render a list of related-people links (filters out unknown slugs).
function peopleLinks(slugs) {
  return (slugs || []).map(s => PERSON_BY_SLUG[s]).filter(Boolean).map(p =>
    `<li><a href="/wiki/${p.slug}/">${esc(p.name)}<small>${esc(p.role)}</small></a></li>`).join('\n      ');
}
// Render a list of related-service links.
function serviceLinks(slugs) {
  return (slugs || []).map(s =>
    `<li><a href="/${esc(s)}/">${esc(serviceLabel(s))}<small>Perfoptim Service</small></a></li>`).join('\n      ');
}

// =====================================================================
// ENTITY PAGE BUILDER
// =====================================================================

function buildEntityPage(entity) {
  const title = `${entity.name} — Definition & Guide | Perfoptim`;
  const description = clip(firstSentence(entity.definition), 155);
  const canonical = `${SITE_URL}/entity/${entity.slug}/`;

  const breadcrumbHtml = `<nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="${SITE_URL}/">Home</a><span class="sep">›</span>
      <a href="/entity/">Knowledge Base</a><span class="sep">›</span>
      <span class="current">${esc(entity.name)}</span>
    </nav>`;

  const relatedConcepts = entityLinks(entity.relatedEntities);
  const relatedServices = serviceLinks(entity.relatedServices);

  const body = `
    <article>
      <span class="category-tag">${esc(entity.category)}</span>
      <h1>${esc(entity.name)}</h1>
      <span class="alt-tag">${esc(entity.alt)}</span>
      <p class="lede">${esc(entity.definition)}</p>

      ${relatedConcepts ? `<h2>Related Concepts</h2>
      <ul class="link-list">
      ${relatedConcepts}
      </ul>` : ''}

      ${relatedServices ? `<h2>Related Services</h2>
      <ul class="link-list">
      ${relatedServices}
      </ul>` : ''}

      <a class="back-link" href="/entity/">← Back to Knowledge Base</a>
    </article>`;

  const definedTerm = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": entity.name,
    "alternateName": entity.alt,
    "description": entity.definition,
    "url": canonical,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "Perfoptim Digital Marketing Knowledge Base",
      "url": `${SITE_URL}/entity/`
    }
  };
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
      { "@type": "ListItem", "position": 2, "name": "Knowledge Base", "item": `${SITE_URL}/entity/` },
      { "@type": "ListItem", "position": 3, "name": entity.name, "item": canonical }
    ]
  };

  return layout({ title, description, canonical, jsonld: [definedTerm, breadcrumbList], breadcrumbHtml, body });
}

// =====================================================================
// WIKI PAGE BUILDER
// =====================================================================

function buildWikiPage(person) {
  const title = `${person.name} — Digital Marketing Profile | Perfoptim`;
  const description = clip(`${person.role}. ${person.knownFor}`, 160);
  const canonical = `${SITE_URL}/wiki/${person.slug}/`;

  const breadcrumbHtml = `<nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="${SITE_URL}/">Home</a><span class="sep">›</span>
      <a href="/wiki/">Wiki</a><span class="sep">›</span>
      <span class="current">${esc(person.name)}</span>
    </nav>`;

  const relatedEntities = entityLinks(person.relatedEntities);
  const relatedPeople = peopleLinks(person.relatedWiki);
  const relatedServices = serviceLinks(person.relatedServices);

  const wikiExt = person.wikipedia
    ? `<p class="wiki-ext"><a href="https://en.wikipedia.org/wiki/${encodeURIComponent(person.wikipedia)}" target="_blank" rel="nofollow noopener">View on Wikipedia ↗</a></p>`
    : '';

  const body = `
    <article>
      <h1>${esc(person.name)}</h1>
      <p class="intro-block">${esc(person.role)}</p>
      <div class="badge-row">
        <span class="badge">${esc(person.role)}</span>
        <span class="badge alt">${esc(person.city)}, ${esc(person.country)}</span>
        <span class="badge alt">${esc(person.nationality)}</span>
      </div>

      <h2>Known For</h2>
      <p>${esc(person.knownFor)}</p>

      <h2>Contribution to Digital Marketing</h2>
      <p>${esc(person.contribution)}</p>
      ${wikiExt}

      ${relatedEntities ? `<h2>Related Concepts</h2>
      <ul class="link-list">
      ${relatedEntities}
      </ul>` : ''}

      ${relatedPeople ? `<h2>Related People</h2>
      <ul class="link-list">
      ${relatedPeople}
      </ul>` : ''}

      ${relatedServices ? `<h2>Related Services</h2>
      <ul class="link-list">
      ${relatedServices}
      </ul>` : ''}

      <a class="back-link" href="/wiki/">← Back to Wiki</a>
    </article>`;

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name,
    "jobTitle": person.role,
    "nationality": person.nationality,
    "description": `${person.role}. ${person.knownFor}`,
    "url": canonical,
    "homeLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": person.city,
        "addressCountry": person.country
      }
    },
    "knowsAbout": (person.relatedEntities || []).map(s => (ENTITY_BY_SLUG[s] || {}).name).filter(Boolean)
  };
  if (person.wikipedia) {
    personLd.sameAs = [`https://en.wikipedia.org/wiki/${person.wikipedia}`];
  }

  return layout({ title, description, canonical, jsonld: personLd, breadcrumbHtml, body });
}

// =====================================================================
// INDEX PAGES
// =====================================================================

function buildEntityIndex() {
  const title = 'Digital Marketing Knowledge Base — Concepts & Definitions | Perfoptim';
  const description = clip(`Explore ${ENTITY_CONCEPTS.length} core digital marketing and SEO concepts — clear definitions, related ideas, and services from Perfoptim.`, 160);
  const canonical = `${SITE_URL}/entity/`;

  const breadcrumbHtml = `<nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="${SITE_URL}/">Home</a><span class="sep">›</span>
      <span class="current">Knowledge Base</span>
    </nav>`;

  const cards = ENTITY_CONCEPTS.map(e => `
      <article class="card">
        <a class="card-title" href="/entity/${e.slug}/">${esc(e.name)}</a>
        <p>${esc(e.alt)}</p>
        <div class="meta">${esc(e.category)}</div>
      </article>`).join('');

  const body = `
    <h1>Digital Marketing Knowledge Base</h1>
    <p class="intro-block">Clear, authoritative definitions of the ${ENTITY_CONCEPTS.length} most important SEO and digital marketing concepts — each linked to related ideas and Perfoptim services.</p>
    <div class="card-grid">${cards}
    </div>`;

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Digital Marketing Knowledge Base",
    "description": description,
    "url": canonical,
    "hasPart": ENTITY_CONCEPTS.map(e => ({
      "@type": "DefinedTerm", "name": e.name, "url": `${SITE_URL}/entity/${e.slug}/`
    }))
  };

  return layout({ title, description, canonical, jsonld: collection, breadcrumbHtml, body });
}

function buildWikiIndex() {
  const title = 'Digital Marketing Wiki — Industry Leaders & Pioneers | Perfoptim';
  const description = clip(`Profiles of ${WIKI_PEOPLE.length} influential digital marketing and SEO leaders — their roles, locations, and contributions to the industry.`, 160);
  const canonical = `${SITE_URL}/wiki/`;

  const breadcrumbHtml = `<nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="${SITE_URL}/">Home</a><span class="sep">›</span>
      <span class="current">Wiki</span>
    </nav>`;

  const cards = WIKI_PEOPLE.map(p => `
      <article class="card">
        <a class="card-title" href="/wiki/${p.slug}/">${esc(p.name)}</a>
        <p>${esc(p.role)}</p>
        <div class="meta">${esc(p.city)}, ${esc(p.country)}</div>
      </article>`).join('');

  const body = `
    <h1>Digital Marketing Wiki</h1>
    <p class="intro-block">Profiles of ${WIKI_PEOPLE.length} influential figures who shaped modern SEO and digital marketing — globally and across India.</p>
    <div class="card-grid">${cards}
    </div>`;

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Digital Marketing Wiki",
    "description": description,
    "url": canonical,
    "hasPart": WIKI_PEOPLE.map(p => ({
      "@type": "Person", "name": p.name, "url": `${SITE_URL}/wiki/${p.slug}/`
    }))
  };

  return layout({ title, description, canonical, jsonld: collection, breadcrumbHtml, body });
}

// =====================================================================
// SITEMAP
// =====================================================================

function buildSitemap() {
  const urls = [];
  const add = (loc, priority) => urls.push({ loc, priority });

  // Entity index + all entity pages
  add(`${SITE_URL}/entity/`, '0.8');
  ENTITY_CONCEPTS.forEach(e => add(`${SITE_URL}/entity/${e.slug}/`, '0.7'));

  // Wiki index + all wiki pages
  add(`${SITE_URL}/wiki/`, '0.8');
  WIKI_PEOPLE.forEach(p => add(`${SITE_URL}/wiki/${p.slug}/`, '0.7'));

  const entries = urls.map(u => `  <url>
    <loc>${esc(u.loc)}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

// =====================================================================
// MAIN RUN
// =====================================================================

function run() {
  // Entity pages
  writeFile('entity/index.html', buildEntityIndex());
  ENTITY_CONCEPTS.forEach(e => writeFile(`entity/${e.slug}/index.html`, buildEntityPage(e)));

  // Wiki pages
  writeFile('wiki/index.html', buildWikiIndex());
  WIKI_PEOPLE.forEach(p => writeFile(`wiki/${p.slug}/index.html`, buildWikiPage(p)));

  // Sitemap
  writeFile('sitemap-entity-wiki.xml', buildSitemap());

  const entityCount = ENTITY_CONCEPTS.length + 1; // + index
  const wikiCount = WIKI_PEOPLE.length + 1;        // + index
  const total = entityCount + wikiCount;

  console.log(`✅ Entity pages: ${entityCount}`);   // 40 + index
  console.log(`✅ Wiki pages: ${wikiCount}`);        // 15 + index
  console.log('✅ Sitemap written: sitemap-entity-wiki.xml');
  console.log(`✅ Total: ${total} pages generated`);
}

run();

module.exports = { ENTITY_CONCEPTS, WIKI_PEOPLE, buildEntityPage, buildWikiPage }; // for testing/import
