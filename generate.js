/* ============================================================
   PerfOptim — Programmatic SEO Generator (generate.js)
   Builds /{state}/{city}/{service}/index.html  (clean folder URLs)
   Run from project root:  node generate.js
   ============================================================ */
'use strict';
const fs = require('fs');
const path = require('path');
const C = require('./build/generate.js'); // shared components (nav/footer/templates)

const ROOT = __dirname;
const PREFIX = '../../../'; // location page depth: state/city/service/ -> root

/* ---------- States → Cities (slug, label) ---------- */
/* Top US states with major cities. Total city/state combos chosen so that
   combos × 12 services ≈ 1341 pages. */
const STATES = [
  ['california', 'California', ['Los Angeles','San Diego','San Jose','San Francisco','Fresno','Sacramento','Long Beach','Oakland','Bakersfield','Anaheim']],
  ['texas', 'Texas', ['Houston','San Antonio','Dallas','Austin','Fort Worth','El Paso','Arlington','Plano','Corpus Christi']],
  ['florida', 'Florida', ['Jacksonville','Miami','Tampa','Orlando','St. Petersburg','Hialeah','Tallahassee','Fort Lauderdale']],
  ['new-york', 'New York', ['New York City','Buffalo','Rochester','Yonkers','Syracuse','Albany']],
  ['illinois', 'Illinois', ['Chicago','Aurora','Naperville','Joliet','Rockford']],
  ['pennsylvania', 'Pennsylvania', ['Philadelphia','Pittsburgh','Allentown','Erie']],
  ['ohio', 'Ohio', ['Columbus','Cleveland','Cincinnati','Toledo','Akron']],
  ['georgia', 'Georgia', ['Atlanta','Augusta','Columbus','Savannah','Athens']],
  ['north-carolina', 'North Carolina', ['Charlotte','Raleigh','Greensboro','Durham','Winston-Salem']],
  ['michigan', 'Michigan', ['Detroit','Grand Rapids','Ann Arbor','Lansing']],
  ['arizona', 'Arizona', ['Phoenix','Tucson','Mesa','Chandler','Scottsdale']],
  ['washington', 'Washington', ['Seattle','Spokane','Tacoma','Bellevue']],
  ['massachusetts', 'Massachusetts', ['Boston','Worcester','Springfield','Cambridge']],
  ['colorado', 'Colorado', ['Denver','Colorado Springs','Aurora','Boulder']],
  ['new-jersey', 'New Jersey', ['Newark','Jersey City','Paterson','Trenton']],
  ['virginia', 'Virginia', ['Virginia Beach','Richmond','Norfolk','Arlington']],
  ['tennessee', 'Tennessee', ['Nashville','Memphis','Knoxville','Chattanooga']],
  ['nevada', 'Nevada', ['Las Vegas','Reno','Henderson','Sparks']],
  ['oregon', 'Oregon', ['Portland','Salem','Eugene','Beaverton']],
  ['minnesota', 'Minnesota', ['Minneapolis','Saint Paul','Rochester','Bloomington']],
  ['missouri', 'Missouri', ['Kansas City','Saint Louis','Springfield','Columbia']],
  ['wisconsin', 'Wisconsin', ['Milwaukee','Madison','Green Bay']],
  ['maryland', 'Maryland', ['Baltimore','Columbia','Germantown']],
  ['indiana', 'Indiana', ['Indianapolis','Fort Wayne','Evansville']],
];

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/* ---------- Varied intro copy (rotated so pages aren't duplicates) ---------- */
const INTRO_TEMPLATES = [
  (svc, city, st) => `Looking for results-driven ${svc.toLowerCase()} in ${city}, ${st}? PerfOptim helps ${city} businesses capture local demand and turn it into measurable revenue. Our ${st}-focused strategies are built on real market data — not guesswork — so every dollar you invest works harder in the ${city} market.`,
  (svc, city, st) => `${city} is a competitive market, and standing out takes more than a generic playbook. PerfOptim delivers ${svc.toLowerCase()} engineered specifically for ${city}, ${st} — combining local search intent, competitor analysis, and transparent reporting to grow your pipeline predictably.`,
  (svc, city, st) => `Businesses across ${city} trust PerfOptim for ${svc.toLowerCase()} that move the needle. We map your ${st} customers' search behavior, build a localized strategy, and optimize relentlessly so you win more customers in ${city} without overspending.`,
  (svc, city, st) => `From startups to established brands, ${city}, ${st} companies choose PerfOptim to make ${svc.toLowerCase()} accountable to revenue. We focus on the metrics that matter in your local ${city} market — qualified leads, lower acquisition costs, and durable growth.`,
];

const LOCAL_FACTS = [
  (city, st) => `As one of ${st}'s key markets, ${city} rewards brands that show up first in local search.`,
  (city, st) => `${city} buyers increasingly research online before they buy — local visibility is non-negotiable.`,
  (city, st) => `Competition in ${city} is fierce, which makes a data-first ${st} strategy your biggest advantage.`,
  (city, st) => `Mobile-first ${city} customers expect fast, relevant experiences at every touchpoint.`,
];

/* ---------- Page builder ---------- */
function buildLocationPage(service, citySlug, cityLabel, stateSlug, stateLabel, idx) {
  const [slug, name, icon, fullname] = service;
  const copy = C.SERVICE_COPY[slug];
  const url = `https://perfoptim.com/${stateSlug}/${citySlug}/${slug}/`;
  const intro = INTRO_TEMPLATES[idx % INTRO_TEMPLATES.length](name, cityLabel, stateLabel);
  const fact = LOCAL_FACTS[(idx + 1) % LOCAL_FACTS.length](cityLabel, stateLabel);

  const bc = C.breadcrumb(PREFIX, [
    { label: 'Home', href: 'index.html' },
    { label: stateLabel, href: `${stateSlug}/` },
    { label: cityLabel, href: `${stateSlug}/${citySlug}/` },
    { label: name },
  ]);

  const features = copy.features.map(([fi, ft, fd]) =>
    `          <div class="service-card"><div class="icon"><i class="fas ${fi}"></i></div><h4>${ft}</h4><p>${fd}</p></div>`
  ).join('\n');

  const benefits = [
    ['fa-location-dot', `Local ${cityLabel} Focus`, `Strategies tuned to how ${cityLabel}, ${stateLabel} customers actually search and buy.`],
    ['fa-chart-line', 'Revenue Accountability', `Every ${name.toLowerCase()} action is tied to leads and revenue you can track.`],
    ['fa-eye', 'Transparent Reporting', `Live dashboards so you always know your ${cityLabel} campaign performance.`],
  ].map(([bi, bt, bd]) => `          <div class="card"><div style="color:var(--color-primary);font-size:1.8rem;margin-bottom:14px"><i class="fas ${bi}"></i></div><h3>${bt}</h3><p>${bd}</p></div>`).join('\n');

  const steps = [
    ['Local Audit', `Analyze your ${cityLabel} market, competitors, and search demand.`],
    ['Strategy', `Build a ${stateLabel}-specific roadmap aligned to your goals.`],
    ['Execute', `Implement ${name.toLowerCase()} across every relevant channel.`],
    ['Optimize', 'Test and refine weekly for compounding local results.'],
    ['Scale', `Expand what works across ${cityLabel} and beyond.`],
  ].map(([t, d], i) => `          <div class="process-step"><div class="num">${i+1}</div><h4>${t}</h4><p>${d}</p></div>`).join('\n');

  // Nearby cities (other cities in same state) for internal linking
  const stateData = STATES.find(s => s[0] === stateSlug);
  const nearby = stateData[2].filter(c => slugify(c) !== citySlug).slice(0, 6)
    .map(c => `          <a href="${PREFIX}${stateSlug}/${slugify(c)}/${slug}/" class="pill" style="background:rgba(108,99,255,.1);border-color:rgba(108,99,255,.25);color:var(--color-primary)">${c}</a>`).join('\n');

  // Other services in same city for internal linking
  const otherSvc = C.SERVICES.filter(s => s[0] !== slug).slice(0, 6)
    .map(([osl, on, oi]) => `          <a href="${PREFIX}${stateSlug}/${citySlug}/${osl}/" class="pill" style="background:rgba(255,101,132,.1);border-color:rgba(255,101,132,.3);color:var(--color-secondary)"><i class="fas ${oi}"></i> ${on}</a>`).join('\n');

  const faqs = [
    [`Do you offer ${name} in ${cityLabel}, ${stateLabel}?`, `Yes. PerfOptim delivers ${name.toLowerCase()} for businesses throughout ${cityLabel} and the wider ${stateLabel} area, with strategies tailored to your local market.`],
    [`How long until I see results in ${cityLabel}?`, `Most ${cityLabel} clients see early momentum within 30–90 days, with results compounding over 6–12 months as your local authority grows.`],
    [`How much does ${name} cost in ${cityLabel}?`, `We build custom programs around your goals and budget. Request a free audit and we'll provide transparent ${cityLabel}-specific pricing with no long-term lock-ins.`],
    [`Why choose PerfOptim for ${cityLabel} ${name.toLowerCase()}?`, `We combine local ${stateLabel} market expertise with data-first execution and fully transparent reporting — so your ${cityLabel} campaigns stay accountable to revenue.`],
    [`Do you work with my industry in ${cityLabel}?`, `Almost certainly. We run industry-specialized teams across healthcare, legal, real estate, eCommerce, SaaS and more, all adaptable to the ${cityLabel} market.`],
  ];
  const faqHtml = faqs.map(([q, a]) => `          <details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`).join('\n');
  const faqSchema = faqs.map(([q, a]) => `      {"@type":"Question","name":${JSON.stringify(q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(a)}}}`).join(',\n');

  const metaTitle = `${name} in ${cityLabel}, ${stateLabel} | PerfOptim`;
  const metaDesc = `Results-driven ${name.toLowerCase()} for ${cityLabel}, ${stateLabel} businesses. Local, data-first ${fullname.toLowerCase()} engineered for ROI. Get your free audit.`;

  return `<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/svg+xml" href="${PREFIX}assets/favicon.svg">
  <title>${metaTitle}</title>
  <meta name="description" content="${metaDesc}">
  <meta name="keywords" content="${name.toLowerCase()} ${cityLabel.toLowerCase()}, ${slug.replace(/-/g,' ')} ${stateLabel.toLowerCase()}, ${cityLabel.toLowerCase()} digital marketing, ${name.toLowerCase()} agency ${cityLabel.toLowerCase()}, local ${slug.replace(/-/g,' ')}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${metaTitle}">
  <meta property="og:description" content="${metaDesc}">
  <meta property="og:image" content="https://placehold.co/1200x630/6C63FF/FFFFFF?text=${encodeURIComponent(name + ' ' + cityLabel)}">
  <meta property="og:url" content="${url}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${metaTitle}">
  <meta name="twitter:description" content="${metaDesc}">
  <meta name="twitter:image" content="https://placehold.co/1200x630/6C63FF/FFFFFF?text=${encodeURIComponent(name + ' ' + cityLabel)}">
  <link rel="alternate" hreflang="en-US" href="${url}">
  <link rel="alternate" hreflang="en-IN" href="https://perfoptim.com/in/">
${C.assets(PREFIX)}
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"LocalBusiness","name":"PerfOptim — ${name} ${cityLabel}","image":"https://perfoptim.com/assets/logo.png","url":"${url}","telephone":"+1-555-123-4567","priceRange":"$$","areaServed":{"@type":"City","name":"${cityLabel}"},"address":{"@type":"PostalAddress","addressLocality":"${cityLabel}","addressRegion":"${stateLabel}","addressCountry":"US"}}
  </script>
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Service","serviceType":"${fullname}","provider":{"@type":"Organization","name":"PerfOptim","url":"https://perfoptim.com"},"areaServed":{"@type":"City","name":"${cityLabel}"},"description":${JSON.stringify(metaDesc)}}
  </script>
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
${faqSchema}
  ]}
  </script>
${bc.schema}
</head>
<body>
${C.navHtml(PREFIX)}

  <main>
    <section class="page-hero">
      <div class="container">
        <span class="badge badge-dark" data-aos="fade-up"><i class="fas ${icon}"></i> ${cityLabel}, ${stateLabel}</span>
        <h1 data-aos="fade-up">${name} in <span class="text-primary">${cityLabel}, ${stateLabel}</span></h1>
        <p data-aos="fade-up">${intro}</p>
        <div class="hero-ctas" data-aos="fade-up">
          <a href="#lead-form" class="btn btn-primary btn-lg">Get Free ${cityLabel} Audit <i class="fas fa-arrow-right"></i></a>
          <a href="#faq" class="btn btn-secondary btn-lg">Read FAQs</a>
        </div>
      </div>
    </section>

${bc.html}

    <section class="section">
      <div class="container">
        <div class="section-head" data-aos="fade-up">
          <span class="eyebrow">${cityLabel} ${name}</span>
          <h2>Why ${cityLabel} Businesses Need ${name}</h2>
        </div>
        <p data-aos="fade-up" style="max-width:880px;margin:0 auto 24px;text-align:center;font-size:1.05rem">${copy.whatis}</p>
        <p data-aos="fade-up" style="max-width:760px;margin:0 auto 50px;text-align:center;color:var(--color-primary);font-weight:600">${fact}</p>
        <div class="grid-4" data-aos="fade-up">
${features}
        </div>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <div class="section-head" data-aos="fade-up">
          <span class="eyebrow">Why PerfOptim</span>
          <h2>The PerfOptim Advantage in ${cityLabel}</h2>
        </div>
        <div class="grid-3" data-aos="fade-up">
${benefits}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head" data-aos="fade-up">
          <span class="eyebrow">Our Process</span>
          <h2>Our ${name} Process for ${cityLabel}</h2>
        </div>
        <div class="process-timeline" style="grid-template-columns:repeat(5,1fr)" data-aos="fade-up">
${steps}
        </div>
      </div>
    </section>

    <section class="section section-dark">
      <div class="container">
        <div class="section-head" data-aos="fade-up">
          <span class="eyebrow">More in ${stateLabel}</span>
          <h2>${name} in Nearby ${stateLabel} Cities</h2>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center" data-aos="fade-up">
${nearby}
        </div>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <div class="section-head" data-aos="fade-up">
          <span class="eyebrow">More Services</span>
          <h2>Other Services in ${cityLabel}</h2>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center" data-aos="fade-up">
${otherSvc}
        </div>
      </div>
    </section>

    <section class="section" id="faq">
      <div class="container">
        <div class="section-head" data-aos="fade-up">
          <span class="eyebrow">FAQ</span>
          <h2>${name} in ${cityLabel} — FAQs</h2>
        </div>
        <div class="faq-list" data-aos="fade-up">
${faqHtml}
        </div>
      </div>
    </section>

${C.leadForm()}
  </main>

${C.footerHtml(PREFIX)}

${C.scriptsHtml(PREFIX)}
</body>
</html>
`;
}

/* ---------- Generate the matrix ---------- */
let count = 0;
const urls = [];
let idx = 0;

STATES.forEach(([stateSlug, stateLabel, cities]) => {
  cities.forEach((cityLabel) => {
    const citySlug = slugify(cityLabel);
    C.SERVICES.forEach((service) => {
      const dir = path.join(ROOT, stateSlug, citySlug, service[0]);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), buildLocationPage(service, citySlug, cityLabel, stateSlug, stateLabel, idx));
      urls.push(`https://perfoptim.com/${stateSlug}/${citySlug}/${service[0]}/`);
      count++; idx++;
    });
  });
});

/* ---------- Write a location URL list for the sitemap builder ---------- */
fs.writeFileSync(path.join(ROOT, 'build', 'location-urls.json'), JSON.stringify(urls, null, 0));

console.log(`Generated ${count} programmatic location pages across ${STATES.length} states.`);
console.log(`Location URLs written to build/location-urls.json`);
