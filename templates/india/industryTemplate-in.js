/* templates/india/industryTemplate-in.js
 * India industry hub page: /in/industries/{slug}/  (depth 2 below /in/ root... actually depth 2)
 */
const H = require('./_inHelpers.js');
const services = require('../../data/india/services-in.js');

function serviceMeta(slug) {
  const s = services.find(x => x.slug === slug);
  return s || { slug, name: slug, icon: 'fa-circle-check' };
}

function generateIndustryPageIN({ industry }) {
  // URL: /in/industries/{slug}/  → depth 2 below /in/
  const inPrefix = '../../';
  const rootPrefix = '../../../';
  const canonical = `https://perfoptim.com/in/industries/${industry.slug}/`;
  const title = industry.metaTitle || `${industry.name} Digital Marketing India | PerfOptim`;
  const desc = industry.metaDesc || `Digital marketing for ${industry.name} in India.`;

  const trail = [{ label: 'Industries', href: `industries/${industry.slug}/` }, { label: industry.name, href: null }];
  const bc = H.breadcrumb(inPrefix, trail);

  const allFaqs = (industry.faqs || []).concat([
    { q: 'Do you provide services in Hindi?', a: 'हाँ — हम हिंदी में भी सेवाएं प्रदान करते हैं। आप WhatsApp पर हमसे संपर्क कर सकते हैं।' },
    { q: 'What is your payment terms?', a: 'Monthly advance. We accept bank transfer, UPI, and all major payment methods.' },
  ]);
  const faqHtml = allFaqs.map((f, i) => `          <details class="faq-item"${i === 0 ? ' open' : ''}><summary>${H.esc(f.q)}</summary><div class="faq-answer"><p>${H.esc(f.a)}</p></div></details>`).join('\n');
  const faqSchema = `  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${allFaqs.map(f => `{"@type":"Question","name":"${H.esc(f.q)}","acceptedAnswer":{"@type":"Answer","text":"${H.esc(f.a)}"}}`).join(',')}]}
  </script>`;

  const servicesGrid = (industry.services || []).map((sl, i) => {
    const s = serviceMeta(sl);
    return `<a href="${inPrefix}${industry.slug && industry.indiaSpecific ? '' : ''}services/${s.slug}/" class="card" style="display:block;padding:24px;border-radius:14px;background:#fff;box-shadow:0 6px 18px rgba(0,0,0,.05);text-decoration:none;color:inherit" data-aos="fade-up" data-aos-delay="${i * 40}"><i class="fas ${s.icon}" style="color:#6C63FF;font-size:1.4rem"></i><h3 style="margin:10px 0 4px">${H.esc(s.name)}</h3><span style="color:#6C63FF;font-weight:600">Learn more →</span></a>`;
  }).join('\n          ');

  const painHtml = (industry.painPoints || []).map((p, i) => `<div class="card" style="padding:24px;border-radius:14px;background:#fff;box-shadow:0 6px 18px rgba(0,0,0,.05)" data-aos="fade-up" data-aos-delay="${i * 50}"><h3 style="color:#FF6584"><i class="fas fa-triangle-exclamation"></i> ${H.esc(p.title)}</h3><p style="color:#555">${H.esc(p.desc)}</p></div>`).join('\n          ');

  const statsHtml = (industry.stats || []).map(st => `<div style="text-align:center"><p style="font-size:1.3rem;font-weight:800;color:#fff;margin:0">${H.esc(st)}</p></div>`).join('\n          ');

  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
${H.head(rootPrefix, { title, desc, canonical, keywords: `${industry.name} digital marketing india, ${industry.name} marketing agency` })}
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Service","serviceType":"Digital Marketing for ${H.esc(industry.name)}","provider":{"@type":"Organization","name":"PerfOptim"},"areaServed":{"@type":"Country","name":"India"},"url":"${canonical}"}
  </script>
${bc.schema}
${faqSchema}
</head>
<body>
${H.nav(rootPrefix, inPrefix)}
${bc.html}
  <main>
    <section class="hero hero-inner" style="padding:80px 0 60px;background:linear-gradient(135deg,#0D0D1A,#1a1a3e);color:#fff">
      <div class="container" style="max-width:900px;text-align:center" data-aos="fade-up">
        <span style="display:inline-block;background:rgba(108,99,255,.25);padding:6px 16px;border-radius:99px;font-size:.85rem;font-weight:600;margin-bottom:18px"><i class="fas ${industry.icon}"></i> Industry Expertise</span>
        <h1 style="font-size:2.5rem;line-height:1.2">${H.esc(industry.h1 || industry.name)}</h1>
        <p style="font-size:1.15rem;opacity:.9;max-width:680px;margin:18px auto 0">PerfOptim delivers performance-driven digital marketing tailored for ${H.esc(industry.name)} businesses across India.</p>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:28px">
          <a href="${H.waLink('Hi, I need digital marketing for my ' + industry.name + ' business')}" target="_blank" rel="noopener" class="btn-whatsapp btn-lg"><i class="fab fa-whatsapp"></i> Chat on WhatsApp</a>
          <a href="${rootPrefix}contact.html" class="btn btn-primary btn-lg">Get Free Audit <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
    </section>

    <section class="section in-stats" style="padding:40px 0;background:linear-gradient(135deg,#6C63FF,#FF6584)">
      <div class="container">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-around;gap:24px" data-aos="fade-up">
          ${statsHtml}
        </div>
      </div>
    </section>

    <section class="section" style="padding:56px 0">
      <div class="container">
        <div class="section-head" data-aos="fade-up"><h2>Challenges We Solve for ${H.esc(industry.name)}</h2></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px">
          ${painHtml}
        </div>
      </div>
    </section>

    <section class="section" style="padding:56px 0;background:#faf9ff">
      <div class="container">
        <div class="section-head" data-aos="fade-up"><h2>Services for ${H.esc(industry.name)}</h2></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px">
          ${servicesGrid}
        </div>
      </div>
    </section>

    <section class="section in-faq" style="padding:56px 0">
      <div class="container" style="max-width:820px">
        <div class="section-head" data-aos="fade-up"><h2>Frequently Asked Questions</h2></div>
        <div class="faq-list" data-aos="fade-up">
${faqHtml}
        </div>
      </div>
    </section>

    <section class="section lead-section" style="padding:64px 0;background:#0D0D1A">
      <div class="container" style="max-width:680px;text-align:center" data-aos="fade-up">
        <h2 style="color:#fff">Grow Your ${H.esc(industry.name)} Business</h2>
        <p style="color:rgba(255,255,255,.85);margin:10px 0 24px">Free digital audit delivered in 48 hours. Transparent pricing from ₹8,000/month.</p>
        <a href="${H.waLink('Hi, I need digital marketing for my ' + industry.name + ' business')}" target="_blank" rel="noopener" class="btn-whatsapp btn-lg"><i class="fab fa-whatsapp"></i> Chat on WhatsApp</a>
      </div>
    </section>
  </main>
${H.footer(rootPrefix, inPrefix)}
${H.whatsappFloat('Hi, I need digital marketing for my ' + industry.name + ' business')}
${H.scripts(rootPrefix)}
</body>
</html>`;
}

module.exports = { generateIndustryPageIN };
