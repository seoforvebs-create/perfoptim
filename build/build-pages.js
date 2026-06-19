const fs = require('fs');
const path = require('path');
const G = require('./generate.js');

const PREFIX = '../'; // service & industry pages live in subfolders

/* ---------------- SERVICE PAGES ---------------- */
function buildServicePage([slug, name, icon, fullname]) {
  const copy = G.SERVICE_COPY[slug];
  const bc = G.breadcrumb(PREFIX, [
    { label: 'Home', href: 'index.html' },
    { label: 'Services', href: 'services/index.html' },
    { label: name },
  ]);

  const features = copy.features.map(([fi, ft, fd]) =>
    `          <div class="service-card"><div class="icon"><i class="fas ${fi}"></i></div><h4>${ft}</h4><p>${fd}</p></div>`
  ).join('\n');

  const benefits = [
    ['fa-chart-line', 'Measurable Growth', `Every ${name.toLowerCase()} initiative is tied to revenue KPIs you can track in real time.`],
    ['fa-user-gear', 'Specialist Team', `Dedicated ${name.toLowerCase()} experts who know your industry and your goals.`],
    ['fa-eye', 'Full Transparency', 'Live dashboards and plain-English reporting — no jargon, no black boxes.'],
  ].map(([bi, bt, bd]) => `          <div class="card"><div class="service-card-icon" style="color:var(--color-primary);font-size:1.8rem;margin-bottom:14px"><i class="fas ${bi}"></i></div><h3>${bt}</h3><p>${bd}</p></div>`).join('\n');

  const steps = [
    ['Discover', `Audit your current ${name.toLowerCase()} performance and uncover opportunities.`],
    ['Strategize', 'Build a custom roadmap aligned to your revenue goals.'],
    ['Implement', 'Execute with precision across every relevant channel.'],
    ['Optimize', 'Continuously test and refine for compounding results.'],
    ['Scale', 'Double down on what works to accelerate growth.'],
  ].map(([t, d], i) => `          <div class="process-step"><div class="num">${i+1}</div><h4>${t}</h4><p>${d}</p></div>`).join('\n');

  const indPills = G.INDUSTRIES.map(([islug, iname]) =>
    `          <a href="${PREFIX}industries/${islug}.html" class="pill" style="background:rgba(108,99,255,.1);border-color:rgba(108,99,255,.25);color:var(--color-primary)">${iname}</a>`
  ).join('\n');

  const locations = G.US_LOCATIONS.map(l => `<a href="#" style="color:var(--color-primary)">${l}</a>`).join(' &nbsp;|&nbsp; ');

  const faqs = [
    [`How long until I see results from ${name}?`, `Timelines vary by service and competition, but most ${name.toLowerCase()} clients see early momentum within 30–90 days, with compounding results over 6–12 months.`],
    [`How much does ${name} cost?`, `We build custom programs around your goals and budget. After a free audit, we provide transparent pricing with no long-term lock-ins.`],
    [`Do you work with my industry?`, `Yes. We run industry-specialized teams across healthcare, legal, real estate, eCommerce, SaaS, and more — so strategy is tailored to your vertical.`],
    [`How do you report on performance?`, `You get a live dashboard plus regular plain-English reviews tied to revenue KPIs — never vanity metrics.`],
    [`Is there a long-term contract?`, `No. We earn retention through results. Our agreements are flexible because we are confident in the outcomes we deliver.`],
  ];
  const faqHtml = faqs.map(([q, a]) => `          <details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`).join('\n');
  const faqSchema = faqs.map(([q, a]) => `      {"@type":"Question","name":${JSON.stringify(q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(a)}}}`).join(',\n');

  return `<!DOCTYPE html>
<html lang="en-US">
<head>
${G.headCommon(PREFIX)}
  <title>${name} | Performance-Driven ${fullname} | PerfOptim</title>
  <meta name="description" content="PerfOptim's ${name.toLowerCase()} drive measurable growth for US businesses. Data-first ${fullname.toLowerCase()} engineered for ROI. Get your free audit.">
  <meta name="keywords" content="${name.toLowerCase()}, ${fullname.toLowerCase()}, digital marketing, ${slug.replace(/-/g,' ')}, marketing agency">
  <link rel="canonical" href="https://perfoptim.com/services/${slug}.html">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${name} | PerfOptim">
  <meta property="og:description" content="Data-first ${fullname.toLowerCase()} engineered for measurable ROI.">
  <meta property="og:image" content="https://placehold.co/1200x630/6C63FF/FFFFFF?text=${encodeURIComponent(name)}">
  <meta property="og:url" content="https://perfoptim.com/services/${slug}.html">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${name} | PerfOptim">
  <meta name="twitter:description" content="Data-first ${fullname.toLowerCase()} engineered for ROI.">
  <meta name="twitter:image" content="https://placehold.co/1200x630/6C63FF/FFFFFF?text=${encodeURIComponent(name)}">
  <link rel="alternate" hreflang="en-US" href="https://perfoptim.com/services/${slug}.html">
  <link rel="alternate" hreflang="en-IN" href="https://perfoptim.com/in/">
${G.assets(PREFIX)}
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Service","serviceType":"${fullname}","provider":{"@type":"Organization","name":"PerfOptim","url":"https://perfoptim.com"},"areaServed":"US","description":${JSON.stringify(copy.desc)}}
  </script>
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
${faqSchema}
  ]}
  </script>
${bc.schema}
</head>
<body>
${G.navHtml(PREFIX)}

  <main>
    <section class="page-hero">
      <div class="container">
        <span class="badge badge-dark" data-aos="fade-up"><i class="fas ${icon}"></i> ${fullname}</span>
        <h1 data-aos="fade-up">${name} That Drive <span class="text-primary">Measurable Growth</span></h1>
        <p data-aos="fade-up">${copy.desc}</p>
        <div class="hero-ctas" data-aos="fade-up">
          <a href="#lead-form" class="btn btn-primary btn-lg">Get Free Audit <i class="fas fa-arrow-right"></i></a>
          <a href="#faq" class="btn btn-secondary btn-lg">Read FAQs</a>
        </div>
      </div>
    </section>

${bc.html}

    <section class="section">
      <div class="container">
        <div class="section-head" data-aos="fade-up">
          <span class="eyebrow">Overview</span>
          <h2>What Is ${name}?</h2>
        </div>
        <p data-aos="fade-up" style="max-width:880px;margin:0 auto 50px;text-align:center;font-size:1.05rem">${copy.whatis}</p>
        <div class="grid-4" data-aos="fade-up">
${features}
        </div>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <div class="section-head" data-aos="fade-up">
          <span class="eyebrow">Why It Matters</span>
          <h2>The PerfOptim Advantage</h2>
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
          <h2>Our 5-Step ${name} Process</h2>
        </div>
        <div class="process-timeline" style="grid-template-columns:repeat(5,1fr)" data-aos="fade-up">
${steps}
        </div>
      </div>
    </section>

    <section class="section section-dark">
      <div class="container">
        <div class="section-head" data-aos="fade-up">
          <span class="eyebrow">Industries</span>
          <h2>Industries We Serve with ${name}</h2>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center" data-aos="fade-up">
${indPills}
        </div>
      </div>
    </section>

    <section class="section section-light">
      <div class="container text-center" data-aos="fade-up">
        <h2 style="margin-bottom:16px">Available Across the USA</h2>
        <p style="max-width:680px;margin:0 auto 20px">We deliver ${name.toLowerCase()} for businesses nationwide. Popular markets include:</p>
        <p style="font-weight:600">${locations}</p>
      </div>
    </section>

    <section class="section section-dark">
      <div class="container">
        <div class="case-card" style="max-width:760px;margin:0 auto" data-aos="fade-up">
          <span class="case-tag">Client Result</span>
          <div class="case-metric">+312%</div>
          <p>A mid-market client transformed their ${name.toLowerCase()} performance with PerfOptim — tripling qualified leads while lowering cost per acquisition within two quarters. Transparent reporting kept every stakeholder aligned on revenue impact.</p>
          <a href="#lead-form" class="learn-more" style="color:var(--color-secondary)">Get results like this <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
    </section>

    <section class="section" id="faq">
      <div class="container">
        <div class="section-head" data-aos="fade-up">
          <span class="eyebrow">FAQ</span>
          <h2>${name} — Frequently Asked Questions</h2>
        </div>
        <div class="faq-list" data-aos="fade-up">
${faqHtml}
        </div>
      </div>
    </section>

${G.leadForm()}
  </main>

${G.footerHtml(PREFIX)}

${G.scriptsHtml(PREFIX)}
</body>
</html>
`;
}

/* ---------------- INDUSTRY PAGES ---------------- */
function buildIndustryPage([slug, name, icon, focus]) {
  const copy = G.INDUSTRY_COPY[slug];
  const bc = G.breadcrumb(PREFIX, [
    { label: 'Home', href: 'index.html' },
    { label: 'Industries', href: 'industries/index.html' },
    { label: name },
  ]);

  const pains = copy.pains.map(([pi, pt, pd]) =>
    `          <div class="pain-card"><div class="icon"><i class="fas ${pi}"></i></div><h3>${pt}</h3><p>${pd}</p></div>`
  ).join('\n');

  // applicable services (first 6)
  const solutions = G.SERVICES.slice(0, 6).map(([sslug, sname, sicon]) =>
    `          <article class="service-card"><div class="icon"><i class="fas ${sicon}"></i></div><h3>${sname}</h3><p>Tailored ${sname.toLowerCase()} for ${name.toLowerCase()} — built around ${focus}.</p><a href="${PREFIX}services/${sslug}.html" class="learn-more">Learn More <i class="fas fa-arrow-right"></i></a></article>`
  ).join('\n');

  const results = copy.results.map(([num, label]) =>
    `          <div class="text-center"><div class="case-metric" style="font-size:2.6rem">${num}</div><p style="color:#fff">${label}</p></div>`
  ).join('\n');

  const locations = G.US_LOCATIONS.join(' &nbsp;|&nbsp; ');

  const faqs = [
    [`Do you specialize in marketing for ${name.toLowerCase()}?`, `Yes. We run a dedicated ${name.toLowerCase()} team that understands your buyers, compliance needs, and competitive landscape — so strategy is tailored, not generic.`],
    [`What results can ${name.toLowerCase()} businesses expect?`, `Clients typically see significant gains in qualified inquiries and lower acquisition costs within the first two quarters, with compounding returns over time.`],
    [`Which services work best for ${name.toLowerCase()}?`, `It depends on your goals, but most ${name.toLowerCase()} clients combine SEO, paid media, and conversion optimization for the strongest, most durable ROI.`],
    [`How do you handle compliance and sensitive industries?`, `We follow platform and industry guidelines carefully and craft messaging that builds trust while staying fully compliant.`],
    [`Is there a long-term contract?`, `No. We earn retention through results — our agreements are flexible because we are confident in the outcomes we deliver.`],
  ];
  const faqHtml = faqs.map(([q, a]) => `          <details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`).join('\n');
  const faqSchema = faqs.map(([q, a]) => `      {"@type":"Question","name":${JSON.stringify(q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(a)}}}`).join(',\n');

  return `<!DOCTYPE html>
<html lang="en-US">
<head>
${G.headCommon(PREFIX)}
  <title>Digital Marketing for ${name} | PerfOptim Agency</title>
  <meta name="description" content="PerfOptim delivers specialized digital marketing for ${name.toLowerCase()} — SEO, PPC & lead generation built around ${focus}. Get your free audit today.">
  <meta name="keywords" content="${name.toLowerCase()} marketing, digital marketing for ${name.toLowerCase()}, ${slug.replace(/-/g,' ')} seo, ${focus}, marketing agency">
  <link rel="canonical" href="https://perfoptim.com/industries/${slug}.html">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Digital Marketing for ${name} | PerfOptim">
  <meta property="og:description" content="Specialized digital marketing for ${name.toLowerCase()} built around ${focus}.">
  <meta property="og:image" content="https://placehold.co/1200x630/6C63FF/FFFFFF?text=${encodeURIComponent(name)}">
  <meta property="og:url" content="https://perfoptim.com/industries/${slug}.html">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Digital Marketing for ${name} | PerfOptim">
  <meta name="twitter:description" content="Specialized digital marketing for ${name.toLowerCase()}.">
  <meta name="twitter:image" content="https://placehold.co/1200x630/6C63FF/FFFFFF?text=${encodeURIComponent(name)}">
  <link rel="alternate" hreflang="en-US" href="https://perfoptim.com/industries/${slug}.html">
  <link rel="alternate" hreflang="en-IN" href="https://perfoptim.com/in/">
${G.assets(PREFIX)}
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Service","serviceType":"Digital Marketing for ${name}","provider":{"@type":"Organization","name":"PerfOptim","url":"https://perfoptim.com"},"areaServed":"US"}
  </script>
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
${faqSchema}
  ]}
  </script>
${bc.schema}
</head>
<body>
${G.navHtml(PREFIX)}

  <main>
    <section class="page-hero">
      <div class="container">
        <span class="badge badge-dark" data-aos="fade-up"><i class="fas ${icon}"></i> ${name}</span>
        <h1 data-aos="fade-up">Digital Marketing for <span class="text-primary">${name}</span></h1>
        <p data-aos="fade-up">Specialized, data-driven marketing built around ${focus} — so your ${name.toLowerCase()} business attracts the right customers and grows predictably.</p>
        <div class="hero-ctas" data-aos="fade-up">
          <a href="#lead-form" class="btn btn-primary btn-lg">Get Free Audit <i class="fas fa-arrow-right"></i></a>
          <a href="#solutions" class="btn btn-secondary btn-lg">Our Solutions</a>
        </div>
      </div>
    </section>

${bc.html}

    <section class="section">
      <div class="container">
        <div class="section-head" data-aos="fade-up">
          <span class="eyebrow">The Challenge</span>
          <h2>Why ${name} Businesses Struggle Online</h2>
        </div>
        <div class="grid-3" data-aos="fade-up">
${pains}
        </div>
      </div>
    </section>

    <section class="section section-light" id="solutions">
      <div class="container">
        <div class="section-head" data-aos="fade-up">
          <span class="eyebrow">Our Solutions</span>
          <h2>How PerfOptim Helps ${name}</h2>
        </div>
        <div class="grid-3" data-aos="fade-up">
${solutions}
        </div>
      </div>
    </section>

    <section class="section section-dark">
      <div class="container">
        <div class="section-head" data-aos="fade-up">
          <span class="eyebrow">Results Snapshot</span>
          <h2>Results We Drive for ${name}</h2>
        </div>
        <div class="grid-3" data-aos="fade-up">
${results}
        </div>
      </div>
    </section>

    <section class="section section-light">
      <div class="container text-center" data-aos="fade-up">
        <h2 style="margin-bottom:16px">Serving ${name} Clients Nationwide</h2>
        <p style="max-width:680px;margin:0 auto 20px">We help ${name.toLowerCase()} businesses grow in markets across the USA, including:</p>
        <p style="font-weight:600;color:var(--color-primary)">${locations}</p>
      </div>
    </section>

    <section class="section" id="faq">
      <div class="container">
        <div class="section-head" data-aos="fade-up">
          <span class="eyebrow">FAQ</span>
          <h2>${name} Marketing — FAQs</h2>
        </div>
        <div class="faq-list" data-aos="fade-up">
${faqHtml}
        </div>
      </div>
    </section>

${G.leadForm()}
  </main>

${G.footerHtml(PREFIX)}

${G.scriptsHtml(PREFIX)}
</body>
</html>
`;
}

/* ---------------- WRITE FILES ---------------- */
G.SERVICES.forEach((s) => {
  fs.writeFileSync(path.join(G.ROOT, 'services', s[0] + '.html'), buildServicePage(s));
});
G.INDUSTRIES.forEach((i) => {
  fs.writeFileSync(path.join(G.ROOT, 'industries', i[0] + '.html'), buildIndustryPage(i));
});

console.log('Generated', G.SERVICES.length, 'service pages and', G.INDUSTRIES.length, 'industry pages.');
