/* build/build-india-home.js — regenerates /in/index.html (Part 6) */
const fs = require('fs');
const path = require('path');
const H = require('../templates/india/_inHelpers.js');
const industries = require('../data/india/industries-in.js');
const { states } = require('../data/india/locations-in.js');

const ROOT = path.join(__dirname, '..');
const inPrefix = '';        // homepage is /in/index.html → /in/ root
const rootPrefix = '../';   // back to site root

const featuredIndustries = [
  'education-coaching', 'healthcare-india', 'real-estate-india', 'yoga-ttc',
  'jewellery', 'manufacturing-india', 'tourism-travel', 'matrimonial-wedding'
];

const industryCards = featuredIndustries.map((slug, i) => {
  const ind = industries.find(x => x.slug === slug);
  return `          <a href="industries/${ind.slug}/" class="card" style="display:block;padding:26px;border-radius:16px;background:#fff;box-shadow:0 8px 24px rgba(0,0,0,.06);text-decoration:none;color:inherit" data-aos="fade-up" data-aos-delay="${i * 40}">
            <i class="fas ${ind.icon}" style="font-size:1.8rem;color:#6C63FF"></i>
            <h3 style="margin:12px 0 6px;font-size:1.1rem">${H.esc(ind.name)}</h3>
            <span style="color:#6C63FF;font-weight:600">Explore →</span>
          </a>`;
}).join('\n');

const cityGrid = states.map((st, i) => `          <a href="${st.slug}/seo-services/" class="card" style="display:flex;align-items:center;justify-content:space-between;padding:18px 22px;border-radius:14px;background:#fff;box-shadow:0 6px 18px rgba(0,0,0,.05);text-decoration:none;color:inherit" data-aos="fade-up" data-aos-delay="${(i % 5) * 30}">
            <span><strong>${H.esc(st.name)}</strong> <span style="color:#888;font-size:.85rem">(${H.esc(st.abbr)})</span><br><span style="color:#888;font-size:.82rem">${st.cities.length} cities · Tier ${st.tier}</span></span>
            <i class="fas fa-arrow-right" style="color:#6C63FF"></i>
          </a>`).join('\n');

const services = [
  ['seo-services', 'SEO Services', 'fa-magnifying-glass-chart'],
  ['ppc-advertising', 'PPC Advertising', 'fa-bullseye'],
  ['whatsapp-marketing', 'WhatsApp Marketing', 'fa-whatsapp', true],
  ['google-my-business-seo', 'GMB SEO', 'fa-map-marker-alt'],
  ['lead-generation', 'Lead Generation', 'fa-filter'],
  ['social-media-marketing', 'Social Media', 'fa-hashtag'],
  ['influencer-marketing', 'Influencer Marketing', 'fa-star'],
  ['performance-marketing', 'Performance Marketing', 'fa-rocket'],
];
const servicePills = services.map(([slug, name, icon, fab]) =>
  `          <a href="services/${slug}/" class="service-pill" style="display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:99px;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.06);text-decoration:none;color:#0D0D1A;font-weight:600;margin:6px"><i class="${fab ? 'fab' : 'fas'} ${icon}" style="color:#6C63FF"></i> ${name}</a>`
).join('\n');

const html = `<!DOCTYPE html>
<html lang="en-IN">
<head>
${H.head(rootPrefix, {
  title: "India's Performance-Driven Digital Marketing Agency | PerfOptim",
  desc: "PerfOptim is India's performance-driven digital marketing agency. SEO, PPC, WhatsApp marketing & lead generation for 19+ industries across 15 states. Free audit from ₹8,000/month.",
  canonical: 'https://perfoptim.com/in/',
  keywords: 'digital marketing agency india, performance marketing india, seo company india, ppc agency india, whatsapp marketing india, lead generation india'
})}
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Organization","name":"PerfOptim India","url":"https://perfoptim.com/in/","logo":"https://perfoptim.com/assets/favicon.svg","areaServed":{"@type":"Country","name":"India"},"address":{"@type":"PostalAddress","addressLocality":"Bareilly","addressRegion":"Uttar Pradesh","addressCountry":"IN"},"contactPoint":{"@type":"ContactPoint","telephone":"+91-98765-43210","contactType":"customer service","areaServed":"IN","availableLanguage":["English","Hindi"]}}
  </script>
</head>
<body>
${H.nav(rootPrefix, inPrefix)}
  <main>
    <section class="hero" style="padding:96px 0 72px;background:linear-gradient(135deg,#0D0D1A,#1a1a3e);color:#fff">
      <div class="container" style="max-width:920px;text-align:center" data-aos="fade-up">
        <span style="display:inline-block;background:rgba(108,99,255,.25);padding:6px 18px;border-radius:99px;font-size:.9rem;font-weight:600;margin-bottom:20px"><i class="fas fa-bolt"></i> Serving 300+ businesses across India</span>
        <h1 style="font-size:3rem;line-height:1.15">India's Performance-Driven Digital Marketing Agency</h1>
        <p class="hindi-sub" style="font-size:1.25rem">बरेली से बैंगलोर तक — आपके बिज़नेस की डिजिटल ग्रोथ</p>
        <p style="font-size:1.2rem;opacity:.9;max-width:720px;margin:18px auto 0">From Bareilly to Bangalore, we help Indian businesses grow with SEO, Google Ads, WhatsApp marketing, and lead generation — measured against revenue, not vanity metrics.</p>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:32px">
          <a href="${H.waLink('Hi PerfOptim, I want to grow my business with digital marketing')}" target="_blank" rel="noopener" class="btn-whatsapp btn-lg"><i class="fab fa-whatsapp"></i> Chat on WhatsApp</a>
          <a href="${rootPrefix}contact.html" class="btn btn-primary btn-lg">Get Free Audit <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
    </section>

    <section class="section in-stats" style="padding:48px 0;background:linear-gradient(135deg,#6C63FF,#FF6584)">
      <div class="container">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-around;gap:24px;text-align:center;color:#fff" data-aos="fade-up">
          <div><p style="font-size:2.4rem;font-weight:800;margin:0">300+</p><p style="margin:0;opacity:.9">Businesses Served</p></div>
          <div><p style="font-size:2.4rem;font-weight:800;margin:0">15+</p><p style="margin:0;opacity:.9">States Covered</p></div>
          <div><p style="font-size:2.4rem;font-weight:800;margin:0">₹180</p><p style="margin:0;opacity:.9">Avg. Cost / Lead</p></div>
          <div><p style="font-size:2.4rem;font-weight:800;margin:0">4.9★</p><p style="margin:0;opacity:.9">Client Rating</p></div>
        </div>
      </div>
    </section>

    <section class="section" style="padding:64px 0">
      <div class="container">
        <div class="section-head" data-aos="fade-up"><h2>Our Services for Indian Businesses</h2><p>Full-funnel digital marketing — from ₹8,000/month, no hidden charges.</p></div>
        <div style="text-align:center;max-width:840px;margin:0 auto" data-aos="fade-up">
${servicePills}
        </div>
      </div>
    </section>

    <section class="section" style="padding:64px 0;background:#faf9ff">
      <div class="container">
        <div class="section-head" data-aos="fade-up"><h2>Industries We Power Across India</h2><p>Specialised playbooks for India's fastest-growing sectors.</p></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px">
${industryCards}
        </div>
      </div>
    </section>

    <section class="section in-bareilly-spotlight" style="padding:64px 0;background:linear-gradient(135deg,#0D0D1A,#2a1a3e);color:#fff">
      <div class="container" style="max-width:960px">
        <div style="display:grid;grid-template-columns:1fr;gap:30px;align-items:center" data-aos="fade-up">
          <div>
            <span style="display:inline-block;background:rgba(108,99,255,.3);padding:6px 16px;border-radius:99px;font-size:.85rem;font-weight:600;margin-bottom:14px"><i class="fas fa-location-dot"></i> Our Headquarters</span>
            <h2 style="color:#fff;font-size:2rem">Proudly Headquartered in Bareilly, UP</h2>
            <p style="opacity:.9;font-size:1.1rem;line-height:1.8">We're a Bareilly-born agency serving the Rohilkhand region and all of India. From Civil Lines to Subhash Nagar, we help local businesses dominate Google — with full Hindi support and tier-2 friendly pricing.</p>
            <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:22px">
              <a href="uttar-pradesh/bareilly/digital-marketing-agency/" class="btn btn-primary">Digital Marketing in Bareilly</a>
              <a href="uttar-pradesh/bareilly/seo-services/" class="btn btn-secondary">SEO Services Bareilly</a>
            </div>
            <p style="margin-top:18px"><a href="blog/local-seo-bareilly-businesses/" style="color:#FFD166;font-weight:600">📖 Read: Complete Local SEO Guide for Bareilly →</a></p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding:64px 0">
      <div class="container">
        <div class="section-head" data-aos="fade-up"><h2>SEO & Digital Marketing Across 15 States</h2><p>Local expertise in every major Indian market — 71+ cities and growing.</p></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px">
${cityGrid}
        </div>
      </div>
    </section>

    <section class="section lead-section" style="padding:72px 0;background:linear-gradient(135deg,#6C63FF,#FF6584)">
      <div class="container" style="max-width:680px;text-align:center" data-aos="fade-up">
        <h2 style="color:#fff">Ready to Grow Your Business in India?</h2>
        <p style="color:rgba(255,255,255,.9);margin:10px 0 26px">Get a free, no-obligation digital audit delivered in 48 hours. Transparent pricing from ₹8,000/month · UPI & bank transfer accepted.</p>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
          <a href="${H.waLink('Hi PerfOptim, I would like a free digital audit')}" target="_blank" rel="noopener" class="btn-whatsapp btn-lg"><i class="fab fa-whatsapp"></i> Chat on WhatsApp</a>
          <a href="${rootPrefix}contact.html" class="btn btn-secondary btn-lg">Request Free Audit</a>
        </div>
      </div>
    </section>
  </main>
${H.footer(rootPrefix, inPrefix)}
${H.whatsappFloat('Hi PerfOptim, I want to grow my business in India')}
${H.scripts(rootPrefix)}
</body>
</html>`;

fs.writeFileSync(path.join(ROOT, 'in', 'index.html'), html);
console.log('Rebuilt /in/index.html (' + html.length + ' bytes)');
