/* templates/india/blogTemplate-in.js
 * India blog post page: /in/blog/{slug}/  (depth 2 below /in/)
 * Generates substantial unique body content from post metadata.
 */
const H = require('./_inHelpers.js');
const services = require('../../data/india/services-in.js');
const { states } = require('../../data/india/locations-in.js');

function findService(slug) { return services.find(s => s.slug === slug); }
function findCity(stateSlug, citySlug) {
  if (!stateSlug || !citySlug) return null;
  const st = states.find(s => s.slug === stateSlug);
  if (!st) return null;
  const c = st.cities.find(x => x.slug === citySlug);
  return c ? { city: c, state: st } : null;
}

function bodyParagraphs(post, svc, loc) {
  const cityName = loc ? loc.city.name : null;
  const stateName = loc ? loc.state.name : null;
  const where = cityName ? `${cityName}, ${stateName}` : 'India';
  const svcName = svc ? svc.name : post.category;

  const paras = [];
  if (post.lang === 'hi') {
    paras.push(`<p>आज के डिजिटल युग में, ${where} के व्यवसायों के लिए <strong>${svcName}</strong> सिर्फ एक विकल्प नहीं, बल्कि ज़रूरत बन गई है। चाहे आप एक छोटा बिज़नेस चलाते हों या बड़ा संस्थान — Google पर टॉप रैंकिंग आपके ग्राहकों तक पहुँचने का सबसे प्रभावी तरीका है।</p>`);
    paras.push(`<h2>${svcName} क्यों ज़रूरी है?</h2><p>जब कोई ग्राहक किसी सेवा या उत्पाद की तलाश करता है, तो वह सबसे पहले Google पर सर्च करता है। अगर आपका बिज़नेस पहले पेज पर नहीं है, तो आप संभावित ग्राहकों को अपने प्रतिस्पर्धियों के हाथों खो रहे हैं। PerfOptim ${where} के व्यवसायों को डेटा-आधारित रणनीति के साथ टॉप रैंकिंग दिलाता है।</p>`);
    paras.push(`<h2>मुख्य फायदे</h2><ul><li><strong>अधिक ट्रैफिक:</strong> ऑर्गेनिक सर्च से लगातार लीड्स।</li><li><strong>कम लागत:</strong> पेड विज्ञापनों की तुलना में बेहतर ROI।</li><li><strong>विश्वसनीयता:</strong> टॉप रैंकिंग ब्रांड में भरोसा बढ़ाती है।</li><li><strong>लोकल विज़िबिलिटी:</strong> ${cityName || 'आपके शहर'} में Google Maps पर टॉप 3 में।</li></ul>`);
    paras.push(`<h2>PerfOptim के साथ शुरुआत करें</h2><p>हमारी टीम बरेली में स्थित है और पूरे भारत में सेवाएं प्रदान करती है। हम हिंदी में भी पूरी सहायता देते हैं। मुफ्त ऑडिट के लिए आज ही WhatsApp पर संपर्क करें।</p>`);
    return paras.join('\n');
  }

  paras.push(`<p>${post.excerpt} In this guide, we break down exactly how businesses${cityName ? ` in ${where}` : ' across India'} can use <strong>${svcName}</strong> to generate measurable growth in 2026 — without wasting budget on tactics that don't move the needle.</p>`);
  paras.push(`<h2>Why ${svcName} Matters${cityName ? ` in ${cityName}` : ' in India'}</h2><p>The Indian digital market is the fastest-growing in the world, with over 850 million internet users. ${cityName ? `${cityName} — ${loc.city.localNote.toLowerCase()} — ` : 'Tier 1 and Tier 2 cities alike '}represent a massive, under-tapped opportunity. Businesses that invest in ${svcName.toLowerCase()} today build a durable competitive moat that compounds month over month.</p>`);
  paras.push(`<h2>The PerfOptim Framework</h2><p>Our approach is rooted in performance, not vanity metrics. Every campaign we run${cityName ? ` for ${where} clients` : ''} ties back to a clear business outcome — leads, calls, or revenue.</p><ol><li><strong>Audit & Discovery:</strong> We map your market, competitors, and the keywords your customers actually search.</li><li><strong>Strategy:</strong> A tailored roadmap built for your budget and goals (from ₹8,000/month).</li><li><strong>Execution:</strong> On-page, technical, content, and off-page work delivered by specialists.</li><li><strong>Optimization & Reporting:</strong> Transparent monthly reports showing exactly what you're paying to acquire each customer.</li></ol>`);
  paras.push(`<h2>Common Mistakes to Avoid</h2><ul><li>Chasing vanity metrics like impressions instead of qualified leads.</li><li>Ignoring Google My Business — 83% of Indian consumers use Google Maps to find local businesses.</li><li>Underusing WhatsApp, which has 98% open rates vs 22% for email.</li><li>Stopping campaigns too early — ${svcName.toLowerCase()} compounds over 3–6 months.</li></ul>`);
  paras.push(`<h2>Real Results</h2><p>${svc && svc.caseStudy ? `For a recent ${svc.caseStudy.industry} client, ${svc.caseStudy.result.toLowerCase()} in just ${svc.caseStudy.period}.` : 'Our clients consistently see 200%+ growth in qualified leads within the first two quarters.'} These results aren't luck — they're the product of a disciplined, data-driven process.</p>`);
  paras.push(`<h2>Get Started Today</h2><p>PerfOptim is headquartered in Bareilly, UP, and serves businesses across all of India — in English and Hindi. Whether you're${cityName ? ` in ${where} or` : ''} anywhere in the country, we'd love to show you what's possible. Request a free digital audit or chat with us directly on WhatsApp.</p>`);
  return paras.join('\n');
}

function generateBlogPostIN({ post, allPosts }) {
  const inPrefix = '../../';
  const rootPrefix = '../../../';
  const canonical = `https://perfoptim.com/in/blog/${post.slug}/`;
  const svc = findService(post.service);
  const loc = findCity(post.targetState, post.targetCity);
  const title = `${post.title} | PerfOptim India Blog`;
  const desc = post.excerpt;

  const trail = [{ label: 'Blog', href: `blog/${post.slug}/` }, { label: post.category, href: null }];
  const bc = H.breadcrumb(inPrefix, trail);

  const related = allPosts.filter(p => p.slug !== post.slug && (p.category === post.category || p.service === post.service)).slice(0, 3);
  const relatedHtml = related.map(p => `<a href="${inPrefix}blog/${p.slug}/" class="card" style="display:block;padding:20px;border-radius:14px;background:#fff;box-shadow:0 6px 18px rgba(0,0,0,.05);text-decoration:none;color:inherit"><span style="color:#6C63FF;font-size:.8rem;font-weight:700;text-transform:uppercase">${H.esc(p.category)}</span><h3 style="margin:8px 0;font-size:1.05rem">${H.esc(p.title)}</h3><span style="color:#888;font-size:.85rem">${H.esc(p.readTime)} read</span></a>`).join('\n          ') || '<p style="color:#888">More articles coming soon.</p>';

  const articleSchema = `  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"BlogPosting","headline":"${H.esc(post.title)}","description":"${H.esc(post.excerpt)}","inLanguage":"${post.lang === 'hi' ? 'hi-IN' : 'en-IN'}","author":{"@type":"Organization","name":"PerfOptim"},"publisher":{"@type":"Organization","name":"PerfOptim"},"mainEntityOfPage":"${canonical}","datePublished":"2026-06-19","dateModified":"2026-06-19"}
  </script>`;

  return `<!DOCTYPE html>
<html lang="${post.lang === 'hi' ? 'hi-IN' : 'en-IN'}">
<head>
${H.head(rootPrefix, { title, desc, canonical, keywords: `${post.category}, ${svc ? svc.name : ''}, digital marketing india blog` })}
${articleSchema}
${bc.schema}
</head>
<body>
${H.nav(rootPrefix, inPrefix)}
${bc.html}
  <main>
    <article>
      <section class="hero hero-inner" style="padding:72px 0 48px;background:linear-gradient(135deg,#0D0D1A,#1a1a3e);color:#fff">
        <div class="container" style="max-width:800px;text-align:center" data-aos="fade-up">
          <span style="display:inline-block;background:rgba(108,99,255,.25);padding:6px 16px;border-radius:99px;font-size:.8rem;font-weight:700;text-transform:uppercase;margin-bottom:16px">${H.esc(post.category)} · ${H.esc(post.readTime)} read</span>
          <h1 style="font-size:2.3rem;line-height:1.25">${H.esc(post.title)}</h1>
          <p style="opacity:.85;margin-top:14px">By PerfOptim · Updated June 2026${loc ? ` · ${H.esc(loc.city.name)}, ${H.esc(loc.state.abbr)}` : ''}</p>
        </div>
      </section>

      <section class="section" style="padding:56px 0">
        <div class="container blog-body" style="max-width:760px;font-size:1.08rem;line-height:1.85;color:#333">
${bodyParagraphs(post, svc, loc)}
        </div>
      </section>

      <section class="section" style="padding:40px 0;background:linear-gradient(135deg,#6C63FF,#FF6584)">
        <div class="container" style="max-width:680px;text-align:center" data-aos="fade-up">
          <h2 style="color:#fff">Want results like these for your business?</h2>
          <p style="color:rgba(255,255,255,.9);margin:10px 0 22px">Get a free digital audit from India's performance-driven marketing team.</p>
          <a href="${H.waLink('Hi, I read your article on ' + post.title + ' and want a free audit')}" target="_blank" rel="noopener" class="btn-whatsapp btn-lg"><i class="fab fa-whatsapp"></i> Chat on WhatsApp</a>
        </div>
      </section>
    </article>

    <section class="section" style="padding:56px 0;background:#faf9ff">
      <div class="container">
        <div class="section-head" data-aos="fade-up"><h2>Related Articles</h2></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px">
          ${relatedHtml}
        </div>
      </div>
    </section>
  </main>
${H.footer(rootPrefix, inPrefix)}
${H.whatsappFloat('Hi PerfOptim, I have a question after reading your blog.')}
${H.scripts(rootPrefix)}
</body>
</html>`;
}

module.exports = { generateBlogPostIN };
