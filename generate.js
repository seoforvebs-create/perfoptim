/**
 * ============================================================
 * PERFOPTIM.COM — MASTER PROGRAMMATIC SEO GENERATOR
 * Version: 3.0 | All Regions: USA + India + Canada
 * Run: node generate.js
 * Run specific: node generate.js --region=usa
 *               node generate.js --region=india
 *               node generate.js --region=canada
 * ============================================================
 */

const fs   = require('fs');
const path = require('path');

// ─── CLI FLAGS ────────────────────────────────────────────────
const args        = process.argv.slice(2);
const regionFlag  = (args.find(a => a.startsWith('--region=')) || '').split('=')[1] || 'all';
const RUN_USA     = regionFlag === 'all' || regionFlag === 'usa';
const RUN_INDIA   = regionFlag === 'all' || regionFlag === 'india';
const RUN_CANADA  = regionFlag === 'all' || regionFlag === 'canada';

// ─── COUNTERS ─────────────────────────────────────────────────
let totalPages  = 0;
const sitemapUSA    = [];
const sitemapIndia  = [];
const sitemapCanada = [];

// ─── UTILITY ──────────────────────────────────────────────────
function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  totalPages++;
  if (totalPages % 100 === 0)
    console.log(`  ⏳ ${totalPages} pages generated so far...`);
}

function addSitemap(arr, url, priority = '0.8', changefreq = 'monthly', hreflang = 'en') {
  arr.push({ url, priority, changefreq, hreflang });
}

function buildSitemapXml(urls, baseUrl, lastmod = '2026-06-24') {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${baseUrl}/</loc>
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
    <lastmod>${lastmod}</lastmod>
  </url>
${urls.map(u => `  <url>
    <loc>${u.url}</loc>
    <priority>${u.priority}</priority>
    <changefreq>${u.changefreq}</changefreq>
    <lastmod>${lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>`;
}

// ─── SHARED: 12 CORE SERVICES ────────────────────────────────
const CORE_SERVICES = [
  { slug: 'seo-services',           name: 'SEO Services' },
  { slug: 'ppc-advertising',        name: 'PPC Advertising' },
  { slug: 'performance-marketing',  name: 'Performance Marketing' },
  { slug: 'content-marketing',      name: 'Content Marketing' },
  { slug: 'web-design-development', name: 'Web Design & Development' },
  { slug: 'cro-services',           name: 'CRO Services' },
  { slug: 'orm-services',           name: 'Online Reputation Management' },
  { slug: 'social-media-marketing', name: 'Social Media Marketing' },
  { slug: 'video-marketing',        name: 'Video Marketing' },
  { slug: 'branding-design',        name: 'Branding & Design' },
  { slug: 'lead-generation',        name: 'Lead Generation' },
  { slug: 'email-marketing',        name: 'Email Marketing' },
];

// ─── SHARED: 12 CORE INDUSTRIES ──────────────────────────────
const CORE_INDUSTRIES = [
  { slug: 'healthcare',              name: 'Healthcare' },
  { slug: 'law-firms',               name: 'Law Firms' },
  { slug: 'real-estate',             name: 'Real Estate' },
  { slug: 'ecommerce',               name: 'eCommerce' },
  { slug: 'saas-technology',         name: 'SaaS & Technology' },
  { slug: 'small-business',          name: 'Small Business' },
  { slug: 'dental-clinics',          name: 'Dental Clinics' },
  { slug: 'restaurants-hospitality', name: 'Restaurants & Hospitality' },
  { slug: 'finance-accounting',      name: 'Finance & Accounting' },
  { slug: 'education',               name: 'Education' },
  { slug: 'manufacturing-oem',       name: 'Manufacturing & OEM' },
  { slug: 'fitness-wellness',        name: 'Fitness & Wellness' },
];

// ─── PAGE TEMPLATE ────────────────────────────────────────────
function makePage({ h1, title, desc, canonical, hreflangTags = '', schema = '', region = 'USA' }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
  <meta name="description" content="${desc}"/>
  <link rel="canonical" href="${canonical}"/>
  ${hreflangTags}
  <script type="application/ld+json">
  ${schema || JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "name": h1, "description": desc })}
  </script>
</head>
<body>
  <main>
    <h1>${h1}</h1>
    <p>${desc}</p>
    <!-- Region: ${region} | Generated: 2026-06-24 -->
  </main>
</body>
</html>`;
}

function makeFrPage({ h1, title, desc, canonical, hreflangEn = '' }) {
  return `<!DOCTYPE html>
<html lang="fr-CA">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
  <meta name="description" content="${desc}"/>
  <link rel="canonical" href="${canonical}"/>
  <link rel="alternate" hreflang="fr-CA" href="${canonical}"/>
  ${hreflangEn ? `<link rel="alternate" hreflang="en-CA" href="${hreflangEn}"/>` : ''}
  <link rel="alternate" hreflang="x-default" href="https://perfoptim.com/"/>
</head>
<body>
  <main>
    <h1>${h1}</h1>
    <p>${desc}</p>
    <!-- French Canada | Généré: 2026-06-24 -->
  </main>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════
// ██████████████████  REGION 1: USA  ███████████████████████████
// ═══════════════════════════════════════════════════════════════

function buildUSA() {
  const BASE = 'https://perfoptim.com';
  const OUT  = './';

  const USA_STATES = [
    { slug: 'new-york',       name: 'New York',       abbr: 'NY',
      cities: [{slug:'new-york-city',name:'New York City'},{slug:'brooklyn',name:'Brooklyn'},{slug:'buffalo',name:'Buffalo'}] },
    { slug: 'california',     name: 'California',     abbr: 'CA',
      cities: [{slug:'los-angeles',name:'Los Angeles'},{slug:'san-francisco',name:'San Francisco'},{slug:'san-diego',name:'San Diego'}] },
    { slug: 'texas',          name: 'Texas',          abbr: 'TX',
      cities: [{slug:'houston',name:'Houston'},{slug:'dallas',name:'Dallas'},{slug:'austin',name:'Austin'}] },
    { slug: 'florida',        name: 'Florida',        abbr: 'FL',
      cities: [{slug:'miami',name:'Miami'},{slug:'orlando',name:'Orlando'},{slug:'tampa',name:'Tampa'}] },
    { slug: 'illinois',       name: 'Illinois',       abbr: 'IL',
      cities: [{slug:'chicago',name:'Chicago'},{slug:'naperville',name:'Naperville'},{slug:'aurora',name:'Aurora'}] },
    { slug: 'georgia',        name: 'Georgia',        abbr: 'GA',
      cities: [{slug:'atlanta',name:'Atlanta'},{slug:'savannah',name:'Savannah'},{slug:'augusta',name:'Augusta'}] },
    { slug: 'arizona',        name: 'Arizona',        abbr: 'AZ',
      cities: [{slug:'phoenix',name:'Phoenix'},{slug:'scottsdale',name:'Scottsdale'},{slug:'tucson',name:'Tucson'}] },
    { slug: 'washington',     name: 'Washington',     abbr: 'WA',
      cities: [{slug:'seattle',name:'Seattle'},{slug:'spokane',name:'Spokane'},{slug:'bellevue',name:'Bellevue'}] },
    { slug: 'colorado',       name: 'Colorado',       abbr: 'CO',
      cities: [{slug:'denver',name:'Denver'},{slug:'colorado-springs',name:'Colorado Springs'},{slug:'boulder',name:'Boulder'}] },
    { slug: 'north-carolina', name: 'North Carolina', abbr: 'NC',
      cities: [{slug:'charlotte',name:'Charlotte'},{slug:'raleigh',name:'Raleigh'},{slug:'durham',name:'Durham'}] },
    { slug: 'ohio',           name: 'Ohio',           abbr: 'OH',
      cities: [{slug:'columbus',name:'Columbus'},{slug:'cleveland',name:'Cleveland'},{slug:'cincinnati',name:'Cincinnati'}] },
    { slug: 'michigan',       name: 'Michigan',       abbr: 'MI',
      cities: [{slug:'detroit',name:'Detroit'},{slug:'grand-rapids',name:'Grand Rapids'},{slug:'ann-arbor',name:'Ann Arbor'}] },
    { slug: 'pennsylvania',   name: 'Pennsylvania',   abbr: 'PA',
      cities: [{slug:'philadelphia',name:'Philadelphia'},{slug:'pittsburgh',name:'Pittsburgh'},{slug:'allentown',name:'Allentown'}] },
    { slug: 'nevada',         name: 'Nevada',         abbr: 'NV',
      cities: [{slug:'las-vegas',name:'Las Vegas'},{slug:'henderson',name:'Henderson'},{slug:'reno',name:'Reno'}] },
    { slug: 'massachusetts',  name: 'Massachusetts',  abbr: 'MA',
      cities: [{slug:'boston',name:'Boston'},{slug:'worcester',name:'Worcester'},{slug:'cambridge',name:'Cambridge'}] },
  ];

  const USA_PRIORITY_COMBOS = [
    ['seo-services','healthcare'],['lead-generation','law-firms'],
    ['ppc-advertising','real-estate'],['cro-services','ecommerce'],
    ['orm-services','healthcare'],['performance-marketing','saas-technology'],
    ['seo-services','law-firms'],['lead-generation','dental-clinics'],
    ['web-design-development','small-business'],['social-media-marketing','restaurants-hospitality'],
    ['email-marketing','ecommerce'],['branding-design','saas-technology'],
    ['ppc-advertising','dental-clinics'],['content-marketing','finance-accounting'],
    ['lead-generation','real-estate'],
  ];

  console.log('\n🇺🇸  Building USA pages...');

  CORE_SERVICES.forEach(s => {
    const url = `${BASE}/${s.slug}/`;
    writeFile(`${OUT}${s.slug}/index.html`,
      makePage({ h1: `${s.name} Agency USA | PerfOptim`, title: `${s.name} Agency USA | PerfOptim`,
        desc: `Top-rated ${s.name} agency in the USA. Results-driven campaigns. Free audit today.`,
        canonical: url, region: 'USA' }));
    addSitemap(sitemapUSA, url, '0.9');
  });

  CORE_SERVICES.forEach(s => {
    CORE_INDUSTRIES.forEach(i => {
      const url = `${BASE}/${s.slug}-for-${i.slug}/`;
      writeFile(`${OUT}${s.slug}-for-${i.slug}/index.html`,
        makePage({ h1: `${s.name} for ${i.name} USA | PerfOptim`, title: `${s.name} for ${i.name} | USA | PerfOptim`,
          desc: `Specialized ${s.name} for ${i.name} businesses in USA. Proven ROI. Free consultation.`,
          canonical: url, region: 'USA' }));
      addSitemap(sitemapUSA, url, '0.9');
    });
  });

  CORE_SERVICES.forEach(s => {
    USA_STATES.forEach(st => {
      const url = `${BASE}/${st.slug}/${s.slug}/`;
      writeFile(`${OUT}${st.slug}/${s.slug}/index.html`,
        makePage({ h1: `${s.name} in ${st.name} | PerfOptim`, title: `${s.name} in ${st.name}, ${st.abbr} | PerfOptim`,
          desc: `Expert ${s.name} across ${st.name}. Local campaigns driving real results.`,
          canonical: url, region: 'USA' }));
      addSitemap(sitemapUSA, url, '0.75');
    });
  });

  USA_PRIORITY_COMBOS.forEach(([sSl, iSl]) => {
    const s = CORE_SERVICES.find(x => x.slug === sSl);
    const i = CORE_INDUSTRIES.find(x => x.slug === iSl);
    if (!s || !i) return;
    USA_STATES.forEach(st => {
      const url = `${BASE}/${st.slug}/${sSl}-for-${iSl}/`;
      writeFile(`${OUT}${st.slug}/${sSl}-for-${iSl}/index.html`,
        makePage({ h1: `${s.name} for ${i.name} in ${st.name} | PerfOptim`, title: `${s.name} for ${i.name} in ${st.name} | PerfOptim`,
          desc: `${s.name} for ${i.name} in ${st.name}. Hyper-local strategies, industry expertise.`,
          canonical: url, region: 'USA' }));
      addSitemap(sitemapUSA, url, '0.85');
    });
  });

  CORE_SERVICES.forEach(s => {
    USA_STATES.forEach(st => {
      st.cities.forEach(c => {
        const url = `${BASE}/${st.slug}/${c.slug}/${s.slug}/`;
        writeFile(`${OUT}${st.slug}/${c.slug}/${s.slug}/index.html`,
          makePage({ h1: `${s.name} in ${c.name}, ${st.abbr} | PerfOptim`, title: `${s.name} in ${c.name}, ${st.abbr} | PerfOptim`,
            desc: `${s.name} for businesses in ${c.name}. Local market expertise + proven digital strategy.`,
            canonical: url, region: 'USA' }));
        addSitemap(sitemapUSA, url, '0.75');
      });
    });
  });

  USA_PRIORITY_COMBOS.forEach(([sSl, iSl]) => {
    const s = CORE_SERVICES.find(x => x.slug === sSl);
    const i = CORE_INDUSTRIES.find(x => x.slug === iSl);
    if (!s || !i) return;
    USA_STATES.forEach(st => {
      st.cities.slice(0, 2).forEach(c => {
        const url = `${BASE}/${st.slug}/${c.slug}/${sSl}-for-${iSl}/`;
        writeFile(`${OUT}${st.slug}/${c.slug}/${sSl}-for-${iSl}/index.html`,
          makePage({ h1: `${s.name} for ${i.name} in ${c.name}, ${st.abbr}`, title: `${s.name} for ${i.name} in ${c.name} | PerfOptim`,
            desc: `Specialized ${s.name} for ${i.name} in ${c.name}, ${st.name}.`,
            canonical: url, region: 'USA' }));
        addSitemap(sitemapUSA, url, '0.85');
      });
    });
  });

  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(`${OUT}sitemap-usa.xml`, buildSitemapXml(sitemapUSA, BASE), 'utf8');
  console.log(`  ✅ USA done. Sitemap: ${sitemapUSA.length + 1} URLs`);
}

// ═══════════════════════════════════════════════════════════════
// █████████████████  REGION 2: INDIA  ██████████████████████████
// ═══════════════════════════════════════════════════════════════

function buildIndia() {
  const BASE = 'https://perfoptim.com/in';
  const OUT  = './in/';

  const INDIA_SERVICES = [
    ...CORE_SERVICES,
    { slug: 'whatsapp-marketing',       name: 'WhatsApp Marketing' },
    { slug: 'google-my-business-india', name: 'Google My Business India' },
  ];

  const INDIA_INDUSTRIES = [
    ...CORE_INDUSTRIES,
    { slug: 'ca-cs-advisory',        name: 'CA & CS Advisory' },
    { slug: 'jewellery-fashion',      name: 'Jewellery & Fashion' },
    { slug: 'edtech-coaching',        name: 'EdTech & Coaching' },
    { slug: 'ayurveda-wellness',      name: 'Ayurveda & Wellness' },
    { slug: 'logistics-supply-chain', name: 'Logistics & Supply Chain' },
    { slug: 'matrimonial-events',     name: 'Matrimonial & Events' },
  ];

  const INDIA_STATES = [
    { slug: 'uttar-pradesh',  name: 'Uttar Pradesh',  abbr: 'UP',
      cities: [{slug:'lucknow',name:'Lucknow'},{slug:'kanpur',name:'Kanpur'},{slug:'agra',name:'Agra'},{slug:'bareilly',name:'Bareilly'},{slug:'varanasi',name:'Varanasi'}] },
    { slug: 'maharashtra',    name: 'Maharashtra',    abbr: 'MH',
      cities: [{slug:'mumbai',name:'Mumbai'},{slug:'pune',name:'Pune'},{slug:'nagpur',name:'Nagpur'},{slug:'nashik',name:'Nashik'},{slug:'aurangabad',name:'Aurangabad'}] },
    { slug: 'karnataka',      name: 'Karnataka',      abbr: 'KA',
      cities: [{slug:'bangalore',name:'Bangalore'},{slug:'mysore',name:'Mysore'},{slug:'hubli',name:'Hubli'},{slug:'mangalore',name:'Mangalore'},{slug:'belgaum',name:'Belgaum'}] },
    { slug: 'delhi',          name: 'Delhi',          abbr: 'DL',
      cities: [{slug:'new-delhi',name:'New Delhi'},{slug:'dwarka',name:'Dwarka'},{slug:'rohini',name:'Rohini'},{slug:'janakpuri',name:'Janakpuri'},{slug:'laxmi-nagar',name:'Laxmi Nagar'}] },
    { slug: 'tamil-nadu',     name: 'Tamil Nadu',     abbr: 'TN',
      cities: [{slug:'chennai',name:'Chennai'},{slug:'coimbatore',name:'Coimbatore'},{slug:'madurai',name:'Madurai'},{slug:'salem',name:'Salem'},{slug:'trichy',name:'Trichy'}] },
    { slug: 'gujarat',        name: 'Gujarat',        abbr: 'GJ',
      cities: [{slug:'ahmedabad',name:'Ahmedabad'},{slug:'surat',name:'Surat'},{slug:'vadodara',name:'Vadodara'},{slug:'rajkot',name:'Rajkot'},{slug:'gandhinagar',name:'Gandhinagar'}] },
    { slug: 'rajasthan',      name: 'Rajasthan',      abbr: 'RJ',
      cities: [{slug:'jaipur',name:'Jaipur'},{slug:'jodhpur',name:'Jodhpur'},{slug:'udaipur',name:'Udaipur'},{slug:'kota',name:'Kota'},{slug:'ajmer',name:'Ajmer'}] },
    { slug: 'west-bengal',    name: 'West Bengal',    abbr: 'WB',
      cities: [{slug:'kolkata',name:'Kolkata'},{slug:'howrah',name:'Howrah'},{slug:'durgapur',name:'Durgapur'},{slug:'siliguri',name:'Siliguri'},{slug:'asansol',name:'Asansol'}] },
    { slug: 'telangana',      name: 'Telangana',      abbr: 'TS',
      cities: [{slug:'hyderabad',name:'Hyderabad'},{slug:'warangal',name:'Warangal'},{slug:'nizamabad',name:'Nizamabad'},{slug:'karimnagar',name:'Karimnagar'},{slug:'khammam',name:'Khammam'}] },
    { slug: 'madhya-pradesh', name: 'Madhya Pradesh', abbr: 'MP',
      cities: [{slug:'bhopal',name:'Bhopal'},{slug:'indore',name:'Indore'},{slug:'jabalpur',name:'Jabalpur'},{slug:'gwalior',name:'Gwalior'},{slug:'ujjain',name:'Ujjain'}] },
    { slug: 'andhra-pradesh', name: 'Andhra Pradesh', abbr: 'AP',
      cities: [{slug:'visakhapatnam',name:'Visakhapatnam'},{slug:'vijayawada',name:'Vijayawada'},{slug:'guntur',name:'Guntur'},{slug:'tirupati',name:'Tirupati'},{slug:'kakinada',name:'Kakinada'}] },
    { slug: 'punjab',         name: 'Punjab',         abbr: 'PB',
      cities: [{slug:'ludhiana',name:'Ludhiana'},{slug:'amritsar',name:'Amritsar'},{slug:'jalandhar',name:'Jalandhar'},{slug:'patiala',name:'Patiala'},{slug:'mohali',name:'Mohali'}] },
  ];

  const INDIA_PRIORITY_COMBOS = [
    ['seo-services','healthcare'],['lead-generation','real-estate'],
    ['ppc-advertising','ecommerce'],['social-media-marketing','restaurants-hospitality'],
    ['seo-services','ca-cs-advisory'],['whatsapp-marketing','ecommerce'],
    ['lead-generation','edtech-coaching'],['seo-services','law-firms'],
    ['google-my-business-india','healthcare'],['content-marketing','ayurveda-wellness'],
    ['lead-generation','dental-clinics'],['ppc-advertising','real-estate'],
    ['social-media-marketing','jewellery-fashion'],['email-marketing','ecommerce'],
    ['performance-marketing','saas-technology'],
  ];

  console.log('\n🇮🇳  Building India pages...');

  INDIA_SERVICES.forEach(s => {
    const url = `${BASE}/services/${s.slug}/`;
    writeFile(`${OUT}services/${s.slug}/index.html`,
      makePage({ h1: `${s.name} Agency India | PerfOptim`, title: `${s.name} Agency India | PerfOptim`,
        desc: `Top ${s.name} agency in India. Data-driven strategies. Free audit available.`,
        canonical: url,
        hreflangTags: `<link rel="alternate" hreflang="en-IN" href="${url}"/>\n  <link rel="alternate" hreflang="x-default" href="https://perfoptim.com/"/>`,
        region: 'India' }));
    addSitemap(sitemapIndia, url, '0.9', 'monthly', 'en-IN');
  });

  INDIA_SERVICES.forEach(s => {
    INDIA_INDUSTRIES.forEach(i => {
      const url = `${BASE}/${s.slug}-for-${i.slug}/`;
      writeFile(`${OUT}${s.slug}-for-${i.slug}/index.html`,
        makePage({ h1: `${s.name} for ${i.name} India | PerfOptim`, title: `${s.name} for ${i.name} in India | PerfOptim`,
          desc: `Industry-specific ${s.name} for ${i.name} businesses across India. Transparent reporting.`,
          canonical: url, region: 'India' }));
      addSitemap(sitemapIndia, url, '0.9', 'monthly', 'en-IN');
    });
  });

  INDIA_SERVICES.forEach(s => {
    INDIA_STATES.forEach(st => {
      const url = `${BASE}/${st.slug}/${s.slug}/`;
      writeFile(`${OUT}${st.slug}/${s.slug}/index.html`,
        makePage({ h1: `${s.name} in ${st.name} | PerfOptim`, title: `${s.name} in ${st.name} | PerfOptim`,
          desc: `${s.name} for businesses across ${st.name}. Local language understanding, pan-India network.`,
          canonical: url, region: 'India' }));
      addSitemap(sitemapIndia, url, '0.75', 'monthly', 'en-IN');
    });
  });

  INDIA_PRIORITY_COMBOS.forEach(([sSl, iSl]) => {
    const s = INDIA_SERVICES.find(x => x.slug === sSl);
    const i = INDIA_INDUSTRIES.find(x => x.slug === iSl);
    if (!s || !i) return;
    INDIA_STATES.forEach(st => {
      const url = `${BASE}/${st.slug}/${sSl}-for-${iSl}/`;
      writeFile(`${OUT}${st.slug}/${sSl}-for-${iSl}/index.html`,
        makePage({ h1: `${s.name} for ${i.name} in ${st.name}`, title: `${s.name} for ${i.name} in ${st.name} | PerfOptim`,
          desc: `${s.name} for ${i.name} businesses in ${st.name}. City-level targeting + industry focus.`,
          canonical: url, region: 'India' }));
      addSitemap(sitemapIndia, url, '0.85', 'monthly', 'en-IN');
    });
  });

  INDIA_SERVICES.forEach(s => {
    INDIA_STATES.forEach(st => {
      st.cities.slice(0, 3).forEach(c => {
        const url = `${BASE}/${st.slug}/${c.slug}/${s.slug}/`;
        writeFile(`${OUT}${st.slug}/${c.slug}/${s.slug}/index.html`,
          makePage({ h1: `${s.name} in ${c.name}, ${st.abbr} | PerfOptim`, title: `${s.name} in ${c.name} | ${st.name} | PerfOptim`,
            desc: `${s.name} for businesses in ${c.name}. Hyperlocal campaigns targeting ${c.name} customers.`,
            canonical: url, region: 'India' }));
        addSitemap(sitemapIndia, url, '0.75', 'monthly', 'en-IN');
      });
    });
  });

  INDIA_PRIORITY_COMBOS.forEach(([sSl, iSl]) => {
    const s = INDIA_SERVICES.find(x => x.slug === sSl);
    const i = INDIA_INDUSTRIES.find(x => x.slug === iSl);
    if (!s || !i) return;
    INDIA_STATES.forEach(st => {
      st.cities.slice(0, 2).forEach(c => {
        const url = `${BASE}/${st.slug}/${c.slug}/${sSl}-for-${iSl}/`;
        writeFile(`${OUT}${st.slug}/${c.slug}/${sSl}-for-${iSl}/index.html`,
          makePage({ h1: `${s.name} for ${i.name} in ${c.name}, ${st.abbr}`, title: `${s.name} for ${i.name} in ${c.name} | PerfOptim`,
            desc: `Specialized ${s.name} for ${i.name} in ${c.name}. Get more customers with proven digital strategy.`,
            canonical: url, region: 'India' }));
        addSitemap(sitemapIndia, url, '0.85', 'monthly', 'en-IN');
      });
    });
  });

  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(`${OUT}sitemap.xml`, buildSitemapXml(sitemapIndia, BASE), 'utf8');
  console.log(`  ✅ India done. Sitemap: ${sitemapIndia.length + 1} URLs`);
}

// ═══════════════════════════════════════════════════════════════
// ████████████████  REGION 3: CANADA  ██████████████════════════
// ═══════════════════════════════════════════════════════════════

function buildCanada() {
  const BASE = 'https://perfoptim.com/ca';
  const OUT  = './ca/';

  const CA_SERVICES = [
    ...CORE_SERVICES,
    { slug: 'bilingual-seo',             name: 'Bilingual SEO (EN+FR)' },
    { slug: 'google-my-business-canada', name: 'Google My Business Canada' },
  ];

  const CA_INDUSTRIES = [
    ...CORE_INDUSTRIES,
    { slug: 'real-estate-canada',   name: 'Real Estate Canada' },
    { slug: 'healthcare-canada',    name: 'Healthcare Canada' },
    { slug: 'immigration-legal',    name: 'Immigration & Legal' },
    { slug: 'construction-trades',  name: 'Construction & Trades' },
    { slug: 'ecommerce-canada',     name: 'eCommerce Canada' },
    { slug: 'education-canada',     name: 'Education & Colleges' },
  ];

  const CA_PROVINCES = [
    { slug: 'ontario',          name: 'Ontario',          abbr: 'ON', bilingual: false,
      cities: [{slug:'toronto',name:'Toronto'},{slug:'mississauga',name:'Mississauga'},{slug:'ottawa',name:'Ottawa'},{slug:'brampton',name:'Brampton'}] },
    { slug: 'british-columbia', name: 'British Columbia', abbr: 'BC', bilingual: false,
      cities: [{slug:'vancouver',name:'Vancouver'},{slug:'surrey',name:'Surrey'},{slug:'burnaby',name:'Burnaby'},{slug:'victoria',name:'Victoria'}] },
    { slug: 'quebec',           name: 'Quebec',           abbr: 'QC', bilingual: true,
      cities: [{slug:'montreal',name:'Montréal'},{slug:'quebec-city',name:'Québec City'},{slug:'laval',name:'Laval'},{slug:'gatineau',name:'Gatineau'}] },
    { slug: 'alberta',          name: 'Alberta',          abbr: 'AB', bilingual: false,
      cities: [{slug:'calgary',name:'Calgary'},{slug:'edmonton',name:'Edmonton'},{slug:'red-deer',name:'Red Deer'},{slug:'lethbridge',name:'Lethbridge'}] },
    { slug: 'manitoba',         name: 'Manitoba',         abbr: 'MB', bilingual: false,
      cities: [{slug:'winnipeg',name:'Winnipeg'},{slug:'brandon',name:'Brandon'}] },
    { slug: 'saskatchewan',     name: 'Saskatchewan',     abbr: 'SK', bilingual: false,
      cities: [{slug:'saskatoon',name:'Saskatoon'},{slug:'regina',name:'Regina'}] },
    { slug: 'nova-scotia',      name: 'Nova Scotia',      abbr: 'NS', bilingual: false,
      cities: [{slug:'halifax',name:'Halifax'},{slug:'dartmouth',name:'Dartmouth'}] },
    { slug: 'new-brunswick',    name: 'New Brunswick',    abbr: 'NB', bilingual: true,
      cities: [{slug:'moncton',name:'Moncton'},{slug:'fredericton',name:'Fredericton'},{slug:'saint-john',name:'Saint John'}] },
  ];

  const FR_SERVICES = {
    'seo-services':              { name: 'Services SEO',            slug: 'services-seo' },
    'ppc-advertising':           { name: 'Publicité PPC',           slug: 'publicite-ppc' },
    'performance-marketing':     { name: 'Marketing Performance',   slug: 'marketing-performance' },
    'content-marketing':         { name: 'Marketing de Contenu',    slug: 'marketing-contenu' },
    'web-design-development':    { name: 'Conception Web',          slug: 'conception-web' },
    'cro-services':              { name: 'Optimisation Conversion', slug: 'optimisation-conversion' },
    'orm-services':              { name: 'Gestion Réputation',      slug: 'gestion-reputation' },
    'social-media-marketing':    { name: 'Médias Sociaux',          slug: 'medias-sociaux' },
    'lead-generation':           { name: 'Génération de Leads',     slug: 'generation-leads' },
    'branding-design':           { name: 'Image de Marque',         slug: 'image-de-marque' },
    'video-marketing':           { name: 'Marketing Vidéo',         slug: 'marketing-video' },
    'email-marketing':           { name: 'Marketing par Courriel',  slug: 'marketing-courriel' },
    'bilingual-seo':             { name: 'SEO Bilingue',            slug: 'seo-bilingue' },
    'google-my-business-canada': { name: 'Google Mon Entreprise',   slug: 'google-mon-entreprise' },
  };

  const QC_CITIES_FR = [
    { slug: 'montreal',   name: 'Montréal' },
    { slug: 'quebec',     name: 'Québec' },
    { slug: 'laval',      name: 'Laval' },
    { slug: 'gatineau',   name: 'Gatineau' },
    { slug: 'sherbrooke', name: 'Sherbrooke' },
  ];

  const CA_PRIORITY_COMBOS = [
    ['seo-services','real-estate-canada'],['lead-generation','immigration-legal'],
    ['ppc-advertising','healthcare-canada'],['bilingual-seo','real-estate-canada'],
    ['lead-generation','construction-trades'],['seo-services','education-canada'],
    ['social-media-marketing','restaurants-hospitality'],['content-marketing','ecommerce-canada'],
    ['google-my-business-canada','healthcare-canada'],['ppc-advertising','immigration-legal'],
    ['seo-services','law-firms'],['lead-generation','real-estate-canada'],
    ['email-marketing','ecommerce-canada'],['performance-marketing','saas-technology'],
    ['orm-services','healthcare-canada'],
  ];

  console.log('\n🇨🇦  Building Canada pages...');

  CA_SERVICES.forEach(s => {
    const url = `${BASE}/services/${s.slug}/`;
    writeFile(`${OUT}services/${s.slug}/index.html`,
      makePage({ h1: `${s.name} Agency Canada | PerfOptim`, title: `${s.name} Agency Canada | PerfOptim`,
        desc: `${s.name} for Canadian businesses. CASL-compliant. English & French. Free Canadian market audit.`,
        canonical: url,
        hreflangTags: `<link rel="alternate" hreflang="en-CA" href="${url}"/>\n  <link rel="alternate" hreflang="x-default" href="https://perfoptim.com/"/>`,
        region: 'Canada' }));
    addSitemap(sitemapCanada, url, '0.9', 'monthly', 'en-CA');
  });

  CA_SERVICES.forEach(s => {
    CA_INDUSTRIES.forEach(i => {
      const url = `${BASE}/${s.slug}-for-${i.slug}/`;
      writeFile(`${OUT}${s.slug}-for-${i.slug}/index.html`,
        makePage({ h1: `${s.name} for ${i.name} in Canada | PerfOptim`, title: `${s.name} for ${i.name} Canada | PerfOptim`,
          desc: `${s.name} for ${i.name} across Canada. CASL-compliant, bilingual-ready.`,
          canonical: url, region: 'Canada' }));
      addSitemap(sitemapCanada, url, '0.9', 'monthly', 'en-CA');
    });
  });

  CA_SERVICES.forEach(s => {
    CA_PROVINCES.forEach(p => {
      const url = `${BASE}/${p.slug}/${s.slug}/`;
      writeFile(`${OUT}${p.slug}/${s.slug}/index.html`,
        makePage({ h1: `${s.name} in ${p.name}, ${p.abbr} | PerfOptim`, title: `${s.name} in ${p.name} | PerfOptim`,
          desc: `${s.name} for businesses in ${p.name}. Local market expertise across ${p.name}.`,
          canonical: url,
          hreflangTags: `<link rel="alternate" hreflang="en-CA" href="${url}"/>`,
          region: 'Canada' }));
      addSitemap(sitemapCanada, url, '0.75', 'monthly', 'en-CA');
    });
  });

  CA_PRIORITY_COMBOS.forEach(([sSl, iSl]) => {
    const s = CA_SERVICES.find(x => x.slug === sSl);
    const i = CA_INDUSTRIES.find(x => x.slug === iSl);
    if (!s || !i) return;
    CA_PROVINCES.forEach(p => {
      const url = `${BASE}/${p.slug}/${sSl}-for-${iSl}/`;
      writeFile(`${OUT}${p.slug}/${sSl}-for-${iSl}/index.html`,
        makePage({ h1: `${s.name} for ${i.name} in ${p.name}`, title: `${s.name} for ${i.name} in ${p.name} | PerfOptim`,
          desc: `${s.name} for ${i.name} in ${p.name}. Province-specific strategy, measurable ROI.`,
          canonical: url, region: 'Canada' }));
      addSitemap(sitemapCanada, url, '0.85', 'monthly', 'en-CA');
    });
  });

  CA_SERVICES.forEach(s => {
    CA_PROVINCES.forEach(p => {
      p.cities.slice(0, 3).forEach(c => {
        const url = `${BASE}/${p.slug}/${c.slug}/${s.slug}/`;
        writeFile(`${OUT}${p.slug}/${c.slug}/${s.slug}/index.html`,
          makePage({ h1: `${s.name} in ${c.name}, ${p.abbr} | PerfOptim`, title: `${s.name} in ${c.name}, ${p.abbr} | PerfOptim`,
            desc: `${s.name} for businesses in ${c.name}. Hyperlocal digital marketing. CASL-compliant.`,
            canonical: url, region: 'Canada' }));
        addSitemap(sitemapCanada, url, '0.75', 'monthly', 'en-CA');
      });
    });
  });

  CA_PRIORITY_COMBOS.forEach(([sSl, iSl]) => {
    const s = CA_SERVICES.find(x => x.slug === sSl);
    const i = CA_INDUSTRIES.find(x => x.slug === iSl);
    if (!s || !i) return;
    CA_PROVINCES.forEach(p => {
      p.cities.slice(0, 2).forEach(c => {
        const url = `${BASE}/${p.slug}/${c.slug}/${sSl}-for-${iSl}/`;
        writeFile(`${OUT}${p.slug}/${c.slug}/${sSl}-for-${iSl}/index.html`,
          makePage({ h1: `${s.name} for ${i.name} in ${c.name}, ${p.abbr}`, title: `${s.name} for ${i.name} in ${c.name} | PerfOptim`,
            desc: `Specialized ${s.name} for ${i.name} in ${c.name}. CAD pricing. CASL compliant.`,
            canonical: url, region: 'Canada' }));
        addSitemap(sitemapCanada, url, '0.85', 'monthly', 'en-CA');
      });
    });
  });

  // French /ca/fr/ pages
  Object.entries(FR_SERVICES).forEach(([enSlug, frData]) => {
    const s = CA_SERVICES.find(x => x.slug === enSlug);
    if (!s) return;
    const frUrl = `${BASE}/fr/services/${frData.slug}/`;
    const enUrl = `${BASE}/services/${enSlug}/`;
    writeFile(`${OUT}fr/services/${frData.slug}/index.html`,
      makeFrPage({ h1: `Agence ${frData.name} au Canada | PerfOptim`, title: `${frData.name} Canada | Agence Marketing | PerfOptim`,
        desc: `${frData.name} pour entreprises canadiennes. Conformes CASL. Audit gratuit.`,
        canonical: frUrl, hreflangEn: enUrl }));
    addSitemap(sitemapCanada, frUrl, '0.85', 'monthly', 'fr-CA');

    QC_CITIES_FR.forEach(city => {
      const frCityUrl = `${BASE}/fr/${city.slug}/${frData.slug}/`;
      const enCityUrl = `${BASE}/quebec/${city.slug === 'quebec' ? 'quebec-city' : city.slug}/${enSlug}/`;
      writeFile(`${OUT}fr/${city.slug}/${frData.slug}/index.html`,
        makeFrPage({ h1: `${frData.name} à ${city.name} | PerfOptim`, title: `${frData.name} ${city.name} | Agence Marketing | PerfOptim`,
          desc: `${frData.name} pour entreprises à ${city.name}. Marketing numérique bilingue. Conformes CASL.`,
          canonical: frCityUrl, hreflangEn: enCityUrl }));
      addSitemap(sitemapCanada, frCityUrl, '0.8', 'monthly', 'fr-CA');
    });
  });

  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(`${OUT}sitemap.xml`, buildSitemapXml(sitemapCanada, BASE), 'utf8');
  console.log(`  ✅ Canada done. Sitemap: ${sitemapCanada.length + 1} URLs`);
}

// ═══════════════════════════════════════════════════════════════
// ████████████████  MASTER SITEMAP INDEX  ██████████████████████
// ═══════════════════════════════════════════════════════════════

function buildSitemapIndex() {
  const entries = [];
  if (RUN_USA)    entries.push(`  <sitemap><loc>https://perfoptim.com/sitemap-usa.xml</loc><lastmod>2026-06-24</lastmod></sitemap>`);
  if (RUN_INDIA)  entries.push(`  <sitemap><loc>https://perfoptim.com/in/sitemap.xml</loc><lastmod>2026-06-24</lastmod></sitemap>`);
  if (RUN_CANADA) entries.push(`  <sitemap><loc>https://perfoptim.com/ca/sitemap.xml</loc><lastmod>2026-06-24</lastmod></sitemap>`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</sitemapindex>`;
  fs.writeFileSync('./sitemap-index.xml', xml, 'utf8');
  console.log('\n  🗺️  sitemap-index.xml updated');
}

// ═══════════════════════════════════════════════════════════════
// ████████████████  ENTRY POINT  ███████████████████════════════
// ═══════════════════════════════════════════════════════════════

console.log('╔══════════════════════════════════════════════════╗');
console.log('║  PERFOPTIM — MASTER PROGRAMMATIC SEO GENERATOR  ║');
console.log('║  Regions: USA + India + Canada                   ║');
console.log('╚══════════════════════════════════════════════════╝');
console.log(`  Mode: ${regionFlag.toUpperCase()}\n`);

const startTime = Date.now();

if (RUN_USA)    buildUSA();
if (RUN_INDIA)  buildIndia();
if (RUN_CANADA) buildCanada();

buildSitemapIndex();

const secs = ((Date.now() - startTime) / 1000).toFixed(1);
console.log('\n╔══════════════════════════════════════════════════╗');
console.log(`║  ✅ DONE in ${secs}s`);
console.log(`║  📄 Total pages: ${totalPages.toLocaleString()}`);
console.log(`║  🇺🇸  USA URLs:    ${sitemapUSA.length}`);
console.log(`║  🇮🇳  India URLs:  ${sitemapIndia.length}`);
console.log(`║  🇨🇦  Canada URLs: ${sitemapCanada.length}`);
console.log('║');
console.log('║  Next steps:');
console.log('║  git add .');
console.log('║  git commit -m "feat: programmatic SEO pages v3"');
console.log('║  git push origin main');
console.log('╚══════════════════════════════════════════════════╝');
