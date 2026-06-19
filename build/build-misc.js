const fs = require('fs');
const path = require('path');
const G = require('./generate.js');

/* Inject footer into homepage (prefix '') */
let home = fs.readFileSync(path.join(G.ROOT, 'index.html'), 'utf8');
home = home.replace('  <!--#FOOTER#-->', G.footerHtml(''));
fs.writeFileSync(path.join(G.ROOT, 'index.html'), home);

/* ---------------- SERVICES OVERVIEW ---------------- */
function servicesOverview() {
  const P = '../';
  const bc = G.breadcrumb(P, [{ label:'Home', href:'index.html' }, { label:'Services' }]);
  const cards = G.SERVICE_COPY ? G.SERVICES.map(([slug,name,icon]) => {
    const desc = G.SERVICE_COPY[slug].desc;
    return `          <article class="service-card"><div class="icon"><i class="fas ${icon}"></i></div><h3>${name}</h3><p>${desc}</p><a href="${P}services/${slug}.html" class="learn-more">Learn More <i class="fas fa-arrow-right"></i></a></article>`;
  }).join('\n') : '';
  return `<!DOCTYPE html>
<html lang="en-US">
<head>
${G.headCommon(P)}
  <title>Digital Marketing Services | SEO, PPC & More | PerfOptim</title>
  <meta name="description" content="Explore PerfOptim's full suite of performance-driven digital marketing services — SEO, PPC, content, CRO, social, lead gen and more. Get your free audit.">
  <meta name="keywords" content="digital marketing services, seo, ppc, content marketing, cro, lead generation, social media marketing">
  <link rel="canonical" href="https://perfoptim.com/services/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Digital Marketing Services | PerfOptim">
  <meta property="og:description" content="Full-funnel, performance-driven marketing services engineered for ROI.">
  <meta property="og:image" content="https://placehold.co/1200x630/6C63FF/FFFFFF?text=Services">
  <meta property="og:url" content="https://perfoptim.com/services/">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Digital Marketing Services | PerfOptim">
  <meta name="twitter:description" content="Full-funnel marketing services engineered for ROI.">
  <meta name="twitter:image" content="https://placehold.co/1200x630/6C63FF/FFFFFF?text=Services">
  <link rel="alternate" hreflang="en-US" href="https://perfoptim.com/services/">
  <link rel="alternate" hreflang="en-IN" href="https://perfoptim.com/in/">
${G.assets(P)}
${bc.schema}
</head>
<body>
${G.navHtml(P)}
  <main>
    <section class="page-hero">
      <div class="container">
        <span class="badge badge-dark" data-aos="fade-up">Our Services</span>
        <h1 data-aos="fade-up">Full-Funnel <span class="text-primary">Performance</span> Marketing Services</h1>
        <p data-aos="fade-up">From SEO to CRO, from content to paid ads — every service is engineered to drive measurable revenue, not vanity metrics.</p>
        <div class="hero-ctas" data-aos="fade-up"><a href="#lead-form" class="btn btn-primary btn-lg">Get Free Audit <i class="fas fa-arrow-right"></i></a></div>
      </div>
    </section>
${bc.html}
    <section class="section section-light">
      <div class="container">
        <div class="grid-3" data-aos="fade-up">
${cards}
        </div>
      </div>
    </section>
${G.leadForm()}
  </main>
${G.footerHtml(P)}
${G.scriptsHtml(P)}
</body>
</html>
`;
}

/* ---------------- INDUSTRIES OVERVIEW ---------------- */
function industriesOverview() {
  const P = '../';
  const bc = G.breadcrumb(P, [{ label:'Home', href:'index.html' }, { label:'Industries' }]);
  const cards = G.INDUSTRIES.map(([slug,name,icon,focus]) =>
    `          <article class="service-card"><div class="icon"><i class="fas ${icon}"></i></div><h3>${name}</h3><p>Specialized digital marketing built around ${focus} for ${name.toLowerCase()}.</p><a href="${P}industries/${slug}.html" class="learn-more">Explore <i class="fas fa-arrow-right"></i></a></article>`
  ).join('\n');
  return `<!DOCTYPE html>
<html lang="en-US">
<head>
${G.headCommon(P)}
  <title>Industries We Serve | Specialized Marketing | PerfOptim</title>
  <meta name="description" content="PerfOptim delivers industry-specialized digital marketing for healthcare, law firms, real estate, eCommerce, SaaS, finance and more. Explore your industry.">
  <meta name="keywords" content="industry marketing, healthcare marketing, law firm marketing, ecommerce marketing, saas marketing, real estate marketing">
  <link rel="canonical" href="https://perfoptim.com/industries/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Industries We Serve | PerfOptim">
  <meta property="og:description" content="Industry-specialized digital marketing across 11+ verticals.">
  <meta property="og:image" content="https://placehold.co/1200x630/6C63FF/FFFFFF?text=Industries">
  <meta property="og:url" content="https://perfoptim.com/industries/">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Industries We Serve | PerfOptim">
  <meta name="twitter:description" content="Industry-specialized marketing across 11+ verticals.">
  <meta name="twitter:image" content="https://placehold.co/1200x630/6C63FF/FFFFFF?text=Industries">
  <link rel="alternate" hreflang="en-US" href="https://perfoptim.com/industries/">
  <link rel="alternate" hreflang="en-IN" href="https://perfoptim.com/in/">
${G.assets(P)}
${bc.schema}
</head>
<body>
${G.navHtml(P)}
  <main>
    <section class="page-hero">
      <div class="container">
        <span class="badge badge-dark" data-aos="fade-up">Industries</span>
        <h1 data-aos="fade-up">Specialized Marketing for <span class="text-primary">Your Industry</span></h1>
        <p data-aos="fade-up">We run industry-specialized teams so your strategy reflects your buyers, your compliance needs, and your competitive landscape.</p>
        <div class="hero-ctas" data-aos="fade-up"><a href="#lead-form" class="btn btn-primary btn-lg">Get Free Audit <i class="fas fa-arrow-right"></i></a></div>
      </div>
    </section>
${bc.html}
    <section class="section section-light">
      <div class="container">
        <div class="grid-3" data-aos="fade-up">
${cards}
        </div>
      </div>
    </section>
${G.leadForm()}
  </main>
${G.footerHtml(P)}
${G.scriptsHtml(P)}
</body>
</html>
`;
}

fs.writeFileSync(path.join(G.ROOT, 'services', 'index.html'), servicesOverview());
fs.writeFileSync(path.join(G.ROOT, 'industries', 'index.html'), industriesOverview());

console.log('Footer injected into index.html; services/ and industries/ overview pages written.');
