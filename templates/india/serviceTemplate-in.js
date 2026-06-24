/* templates/india/serviceTemplate-in.js
 * India service page template — the workhorse for all 6 pSEO tiers.
 * Accepts { service, industry?, state?, city? } and renders a full HTML page
 * with India-specific H1 patterns, pricing, city context, nearby cities,
 * Hindi subtitle, WhatsApp CTAs, India trust signals, LocalBusiness schema,
 * and India FAQ additions.
 */
const H = require('./_inHelpers.js');
const { states } = require('../../data/india/locations-in.js');

const HINDI_STATES = ['uttar-pradesh', 'delhi', 'rajasthan', 'madhya-pradesh', 'haryana'];

/* Depth → relative prefixes.
 * URL layouts under /in/:
 *   services/{slug}/                       depth 2  (in -> ../../ to root, ../ to /in/)
 *   {service}-for-{industry}/              depth 1
 *   {state}/{service}/                     depth 2
 *   {state}/{service}-for-{industry}/      depth 2
 *   {state}/{city}/{service}/              depth 3
 *   {state}/{city}/{service}-for-{ind}/    depth 3
 */
function prefixes(depthBelowIn) {
  const inPrefix = '../'.repeat(depthBelowIn);            // back to /in/
  const rootPrefix = '../'.repeat(depthBelowIn + 1);     // back to site root
  return { inPrefix, rootPrefix };
}

function buildH1(service, industry, state, city) {
  if (city && industry) return `${service.name} for ${industry.name} in ${city.name}, ${state.abbr}`;
  if (city) return `${service.name} in ${city.name} | ${state.abbr}`;
  if (state && industry) return `${service.name} for ${industry.name} in ${state.name}`;
  if (state) return `${service.name} in ${state.name} | Local Experts`;
  if (industry) return `${service.name} for ${industry.name} in India`;
  return `${service.name} Agency in India`;
}

function buildMeta(service, industry, state, city) {
  let where = 'India';
  if (city) where = `${city.name}, ${state.abbr}`;
  else if (state) where = state.name;
  const titleBase = industry
    ? `${service.name} for ${industry.name} in ${where}`
    : `${service.name} in ${where}`;
  const title = `${titleBase} | PerfOptim`;
  const desc = industry
    ? `${service.name} for ${industry.name} businesses in ${where}. ${service.intro.split('. ')[0]}. Free audit, transparent pricing from ₹8,000/month.`
    : `${service.name} in ${where}. ${service.intro.split('. ')[0]}. Free audit & transparent pricing from ₹8,000/month. Chat on WhatsApp.`;
  return { title, desc: desc.slice(0, 300) };
}

function canonicalFor(service, industry, state, city) {
  const base = 'https://perfoptim.com/in';
  if (city && industry) return `${base}/${state.slug}/${city.slug}/${service.slug}-for-${industry.slug}/`;
  if (city) return `${base}/${state.slug}/${city.slug}/${service.slug}/`;
  if (state && industry) return `${base}/${state.slug}/${service.slug}-for-${industry.slug}/`;
  if (state) return `${base}/${state.slug}/${service.slug}/`;
  if (industry) return `${base}/${service.slug}-for-${industry.slug}/`;
  return `${base}/services/${service.slug}/`;
}

function depthFor(industry, state, city) {
  if (city) return 3;
  if (state) return 2;
  if (industry) return 1;
  return 2; // services/{slug}/
}

function pricingStrip() {
  return `    <section class="section in-pricing" style="padding:48px 0;background:linear-gradient(135deg,#f5f3ff,#fff0f4)">
      <div class="container">
        <div class="in-pricing-banner" style="text-align:center;margin-bottom:28px" data-aos="fade-up">
          <p style="font-size:1.15rem;font-weight:700;color:#0D0D1A">Starting from <span style="color:#6C63FF">₹8,000/month</span> &nbsp;·&nbsp; No Hidden Charges &nbsp;·&nbsp; Monthly Reports</p>
        </div>
        <div class="in-pricing-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;max-width:920px;margin:0 auto">
          <div class="card" style="text-align:center;padding:28px;border:2px solid #eee;border-radius:16px;background:#fff" data-aos="fade-up">
            <h3 style="color:#6C63FF">Starter</h3>
            <p style="font-size:2rem;font-weight:800;margin:8px 0">₹8,000<span style="font-size:.9rem;font-weight:400">/mo</span></p>
            <p style="color:#555">For small businesses & local shops getting started online.</p>
          </div>
          <div class="card" style="text-align:center;padding:28px;border:2px solid #6C63FF;border-radius:16px;background:#fff;box-shadow:0 12px 30px rgba(108,99,255,.15)" data-aos="fade-up" data-aos-delay="100">
            <span style="background:#6C63FF;color:#fff;font-size:.75rem;padding:4px 12px;border-radius:99px">MOST POPULAR</span>
            <h3 style="color:#6C63FF;margin-top:10px">Growth</h3>
            <p style="font-size:2rem;font-weight:800;margin:8px 0">₹18,000<span style="font-size:.9rem;font-weight:400">/mo</span></p>
            <p style="color:#555">Multi-channel growth for scaling businesses.</p>
          </div>
          <div class="card" style="text-align:center;padding:28px;border:2px solid #eee;border-radius:16px;background:#fff" data-aos="fade-up" data-aos-delay="200">
            <h3 style="color:#FF6584">Scale</h3>
            <p style="font-size:2rem;font-weight:800;margin:8px 0">₹35,000+<span style="font-size:.9rem;font-weight:400">/mo</span></p>
            <p style="color:#555">Aggressive growth with full-funnel performance marketing.</p>
          </div>
        </div>
      </div>
    </section>`;
}

function cityContext(city, state) {
  return `    <section class="section in-city-context" style="padding:56px 0">
      <div class="container" style="max-width:840px" data-aos="fade-up">
        <h2>Local Expertise in ${H.esc(city.name)}</h2>
        <p style="font-size:1.1rem;line-height:1.8;color:#444">We serve businesses in ${H.esc(city.name)}, ${H.esc(state.name)} — ${H.esc(city.localNote)}. Our local digital marketing team understands the competitive landscape of ${H.esc(city.name)} and builds strategies specific to this market.</p>
        <p style="color:#666;margin-top:12px"><i class="fas fa-users"></i> Population served: ${H.esc(city.population)} &nbsp;·&nbsp; <i class="fas fa-map-marker-alt"></i> District: ${H.esc(city.district)} &nbsp;·&nbsp; <i class="fas fa-layer-group"></i> Tier ${state.tier} market</p>
      </div>
    </section>`;
}

function nearbyCities(service, state, city, inPrefix) {
  const others = state.cities.filter(c => c.slug !== city.slug).slice(0, 4);
  if (!others.length) return '';
  const links = others.map(c =>
    `<a href="${inPrefix}${state.slug}/${c.slug}/${service.slug}/" style="color:#6C63FF;font-weight:600">${H.esc(c.name)}</a>`
  ).join(' &nbsp;|&nbsp; ');
  return `    <section class="section in-nearby" style="padding:40px 0;background:#faf9ff">
      <div class="container" style="text-align:center" data-aos="fade-up">
        <h3 style="margin-bottom:10px">${H.esc(service.name)} — Also Serving Across ${H.esc(state.name)}</h3>
        <p style="font-size:1.05rem">Also serving: ${links}</p>
      </div>
    </section>`;
}

function hindiSub(service, state, city) {
  if (!state || !HINDI_STATES.includes(state.slug)) return '';
  const place = city ? city.name : state.name;
  return `      <p class="hindi-sub">हम ${H.esc(place)} में ${H.esc(service.name)} की बेहतरीन सेवाएं प्रदान करते हैं</p>`;
}

function trustSignals() {
  const items = [
    ['fa-handshake', 'Google Partner Agency'],
    ['fa-certificate', 'ISO 9001 Certified'],
    ['fa-building-user', 'Serving 300+ Indian Businesses'],
    ['fa-location-dot', 'Offices: Bareilly | Delhi | Remote'],
    ['fa-receipt', 'GST Registered'],
  ];
  return `    <section class="section in-trust" style="padding:40px 0;background:#0D0D1A;color:#fff">
      <div class="container">
        <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:28px" data-aos="fade-up">
          ${items.map(([ic, t]) => `<span style="display:inline-flex;align-items:center;gap:8px;font-weight:600"><i class="fas ${ic}" style="color:#6C63FF"></i> ${t}</span>`).join('\n          ')}
        </div>
      </div>
    </section>`;
}

function whatsappCta(service, city) {
  const place = city ? ` in ${city.name}` : '';
  const text = `Hi, I need ${service.name} for my business${place}`;
  return `        <a href="${H.waLink(text)}" target="_blank" rel="noopener" class="btn-whatsapp btn-lg"><i class="fab fa-whatsapp"></i> Chat on WhatsApp</a>`;
}

function subServicesSection(service) {
  return `    <section class="section" style="padding:56px 0">
      <div class="container">
        <div class="section-head" data-aos="fade-up"><h2>What's Included in ${H.esc(service.name)}</h2></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px">
          ${service.subServices.map((s, i) => `<div class="card" style="padding:22px;border-radius:14px;background:#fff;box-shadow:0 6px 18px rgba(0,0,0,.05)" data-aos="fade-up" data-aos-delay="${i * 40}"><i class="fas fa-circle-check" style="color:${service.color || '#6C63FF'}"></i> <strong>${H.esc(s)}</strong></div>`).join('\n          ')}
        </div>
      </div>
    </section>`;
}

function processSection(service) {
  return `    <section class="section" style="padding:56px 0;background:#faf9ff">
      <div class="container">
        <div class="section-head" data-aos="fade-up"><h2>Our ${H.esc(service.name)} Process</h2></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:18px">
          ${service.processSteps.map((s, i) => `<div class="card" style="padding:24px;border-radius:14px;background:#fff;text-align:center" data-aos="fade-up" data-aos-delay="${i * 40}"><div style="width:42px;height:42px;border-radius:50%;background:#6C63FF;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;margin:0 auto 12px">${i + 1}</div><strong>${H.esc(s)}</strong></div>`).join('\n          ')}
        </div>
      </div>
    </section>`;
}

function caseStudySection(service) {
  const cs = service.caseStudy || {};
  return `    <section class="section" style="padding:48px 0">
      <div class="container" style="max-width:760px">
        <div class="card" style="padding:34px;border-radius:18px;background:linear-gradient(135deg,#6C63FF,#FF6584);color:#fff" data-aos="zoom-in">
          <p style="opacity:.85;font-weight:600;text-transform:uppercase;letter-spacing:.5px">Case Study · ${H.esc(cs.industry || 'Client')}</p>
          <p style="font-size:1.5rem;font-weight:800;margin:10px 0">${H.esc(cs.result || 'Significant measurable growth.')}</p>
          <p style="opacity:.9">Achieved in ${H.esc(cs.period || '6 months')}.</p>
        </div>
      </div>
    </section>`;
}

function faqSection(service) {
  const indiaFaqs = [
    { q: 'Do you provide services in Hindi?', a: 'हाँ — हम हिंदी में भी सेवाएं प्रदान करते हैं। आप WhatsApp पर हमसे संपर्क कर सकते हैं।' },
    { q: 'Do you work with businesses outside metro cities?', a: 'Yes — we specialize in Tier 2 and Tier 3 city businesses in UP, Rajasthan, MP, and beyond.' },
    { q: 'What is your payment terms?', a: 'Monthly advance. We accept bank transfer, UPI, and all major payment methods.' },
  ];
  const allFaqs = [...(service.faqs || []), ...indiaFaqs];
  const html = allFaqs.map((f, i) => `          <details class="faq-item"${i === 0 ? ' open' : ''}>
            <summary>${H.esc(f.q)}</summary>
            <div class="faq-answer"><p>${H.esc(f.a)}</p></div>
          </details>`).join('\n');
  const schema = `  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${allFaqs.map(f => `{"@type":"Question","name":"${H.esc(f.q)}","acceptedAnswer":{"@type":"Answer","text":"${H.esc(f.a)}"}}`).join(',')}]}
  </script>`;
  return {
    html: `    <section class="section in-faq" style="padding:56px 0;background:#faf9ff">
      <div class="container" style="max-width:820px">
        <div class="section-head" data-aos="fade-up"><h2>Frequently Asked Questions</h2></div>
        <div class="faq-list" data-aos="fade-up">
${html}
        </div>
      </div>
    </section>`, schema
  };
}

function localBusinessSchema(service, industry, state, city, canonical) {
  const name = `PerfOptim — ${service.name}${city ? ' ' + city.name : state ? ' ' + state.name : ' India'}`;
  return `  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"LocalBusiness","name":"${H.esc(name)}","url":"${canonical}","priceRange":"₹₹","image":"https://placehold.co/600x400/6C63FF/FFFFFF?text=PerfOptim","telephone":"+91-98765-43210","address":{"@type":"PostalAddress","addressLocality":"${H.esc(city ? city.name : 'Bareilly')}","addressRegion":"${H.esc(state ? state.name : 'Uttar Pradesh')}","addressCountry":"IN"},"serviceArea":{"@type":"Country","name":"India"},"availableLanguage":["English","Hindi"],"areaServed":{"@type":"${city ? 'City' : state ? 'State' : 'Country'}","name":"${H.esc(city ? city.name : state ? state.name : 'India')}"}}
  </script>
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Service","serviceType":"${H.esc(service.name)}","provider":{"@type":"Organization","name":"PerfOptim"},"areaServed":{"@type":"Country","name":"India"},"url":"${canonical}"}
  </script>`;
}

function generateServicePageIN({ service, industry, state, city }) {
  const depth = depthFor(industry, state, city);
  const { inPrefix, rootPrefix } = prefixes(depth);
  const h1 = buildH1(service, industry, state, city);
  const { title, desc } = buildMeta(service, industry, state, city);
  const canonical = canonicalFor(service, industry, state, city);
  const color = service.color || '#6C63FF';

  // Breadcrumb trail (hrefs relative to /in/)
  const trail = [];
  if (city) {
    trail.push({ label: state.name, href: `${state.slug}/${service.slug}/` });
    trail.push({ label: city.name, href: `${state.slug}/${city.slug}/${service.slug}/` });
    trail.push({ label: industry ? `${service.name} · ${industry.name}` : service.name, href: null });
  } else if (state) {
    trail.push({ label: state.name, href: `${state.slug}/${service.slug}/` });
    trail.push({ label: industry ? `${service.name} · ${industry.name}` : service.name, href: null });
  } else if (industry) {
    trail.push({ label: `${service.name} for ${industry.name}`, href: null });
  } else {
    trail.push({ label: service.name, href: null });
  }
  const bc = H.breadcrumb(inPrefix, trail);
  const faq = faqSection(service);

  const industryBlock = industry ? `    <section class="section" style="padding:48px 0">
      <div class="container" style="max-width:840px" data-aos="fade-up">
        <h2>Why ${H.esc(industry.name)} Businesses Choose PerfOptim</h2>
        <ul style="line-height:2;font-size:1.05rem;color:#444">
          ${(industry.painPoints || []).map(p => `<li><strong>${H.esc(p.title)}:</strong> ${H.esc(p.desc)}</li>`).join('\n          ')}
        </ul>
      </div>
    </section>` : '';

  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
${H.head(rootPrefix, { title, desc, canonical, keywords: `${service.name} India, ${service.name} ${city ? city.name : state ? state.name : 'India'}, digital marketing` })}
${localBusinessSchema(service, industry, state, city, canonical)}
${bc.schema}
${faq.schema}
</head>
<body>
${H.nav(rootPrefix, inPrefix)}
${bc.html}
  <main>
    <section class="hero hero-inner" style="padding:80px 0 60px;background:linear-gradient(135deg,#0D0D1A,#1a1a3e);color:#fff">
      <div class="container" style="max-width:900px;text-align:center" data-aos="fade-up">
        <span style="display:inline-block;background:rgba(108,99,255,.25);color:#fff;padding:6px 16px;border-radius:99px;font-size:.85rem;font-weight:600;margin-bottom:18px"><i class="fas ${service.icon}"></i> ${H.esc(service.name)}</span>
        <h1 style="font-size:2.6rem;line-height:1.2">${H.esc(h1)}</h1>
${hindiSub(service, state, city)}
        <p style="font-size:1.15rem;opacity:.9;max-width:680px;margin:18px auto 0">${H.esc(service.intro)}</p>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:28px">
${whatsappCta(service, city)}
          <a href="#lead-form" class="btn btn-primary btn-lg">Get Free Digital Audit <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
    </section>
${pricingStrip()}
${subServicesSection(service)}
${industryBlock}
${city ? cityContext(city, state) : ''}
${processSection(service)}
${caseStudySection(service)}
${city ? nearbyCities(service, state, city, inPrefix) : ''}
${trustSignals()}
${faq.html}
    <section class="section lead-section" id="lead-form" style="padding:64px 0;background:linear-gradient(135deg,#6C63FF,#FF6584)">
      <div class="container" style="max-width:680px;text-align:center" data-aos="fade-up">
        <h2 style="color:#fff">Ready to Grow ${city ? 'in ' + H.esc(city.name) : 'Your Business'}?</h2>
        <p style="color:rgba(255,255,255,.9);margin:10px 0 24px">Get a free, no-obligation digital audit. We'll show you exactly how ${H.esc(service.name)} can drive results for your business — delivered in 48 hours.</p>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
${whatsappCta(service, city)}
          <a href="${rootPrefix}contact.html" class="btn btn-secondary btn-lg">Request Free Audit</a>
        </div>
        <p style="color:rgba(255,255,255,.8);margin-top:18px;font-size:.9rem">🔒 No spam · UPI / Bank Transfer accepted · Monthly reporting</p>
      </div>
    </section>
  </main>
${H.footer(rootPrefix, inPrefix)}
${H.whatsappFloat(`Hi, I need ${service.name}${city ? ' in ' + city.name : ''}`)}
${H.scripts(rootPrefix)}
</body>
</html>`;
}

module.exports = { generateServicePageIN };
