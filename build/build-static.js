const fs = require('fs');
const path = require('path');
const G = require('./generate.js');

/* =================== ABOUT =================== */
function aboutPage() {
  const P = '';
  const bc = G.breadcrumb(P, [{ label:'Home', href:'index.html' }, { label:'About' }]);
  const team = [
    ['Alex Morgan','Founder & CEO','AM'],
    ['Priya Sharma','Head of Performance','PS'],
    ['David Chen','Director of SEO','DC'],
    ['Maria Lopez','Creative Director','ML'],
  ].map(([n,r,i]) => `          <div class="team-card"><img src="https://placehold.co/120x120/6C63FF/FFFFFF?text=${i}" alt="${n}, ${r} at PerfOptim" loading="lazy" width="120" height="120"><h4>${n}</h4><span class="role">${r}</span></div>`).join('\n');
  const values = [
    ['fa-chart-simple','Data Over Opinions','Every decision is backed by data, not hunches or trends.'],
    ['fa-handshake','Radical Transparency','Live dashboards and honest reporting — always.'],
    ['fa-bullseye','Revenue First','We optimize for your bottom line, not vanity metrics.'],
    ['fa-arrows-rotate','Relentless Iteration','We test, learn, and improve every single week.'],
  ].map(([i,t,d]) => `          <div class="card value-card"><div class="icon"><i class="fas ${i}"></i></div><h3>${t}</h3><p>${d}</p></div>`).join('\n');
  const milestones = [
    ['2022','PerfOptim Founded','Launched with a mission to make marketing accountable to revenue.'],
    ['2023','First 50 Clients','Crossed 50 active clients and expanded into India.'],
    ['2024','Multi-Market Expansion','Opened service to Canada and Gulf markets; 200+ campaigns delivered.'],
    ['2026','500+ Campaigns','Now serving 200+ US businesses with a 4.9/5 average rating.'],
  ].map(([y,t,d]) => `        <div class="milestone"><div class="year">${y}</div><div class="m-body"><h4>${t}</h4><p>${d}</p></div></div>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en-US">
<head>
${G.headCommon(P)}
  <title>About PerfOptim | Built for Performance Marketing</title>
  <meta name="description" content="Meet PerfOptim — a results-driven digital marketing team built for performance. Learn about our mission, values, team and milestones serving the USA & India.">
  <meta name="keywords" content="about perfoptim, digital marketing team, marketing agency mission, performance marketing company">
  <link rel="canonical" href="https://perfoptim.com/about.html">
  <meta property="og:type" content="website">
  <meta property="og:title" content="About PerfOptim | Built for Performance">
  <meta property="og:description" content="A results-driven digital marketing team built for performance.">
  <meta property="og:image" content="https://placehold.co/1200x630/6C63FF/FFFFFF?text=About+PerfOptim">
  <meta property="og:url" content="https://perfoptim.com/about.html">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="About PerfOptim">
  <meta name="twitter:description" content="A results-driven digital marketing team built for performance.">
  <meta name="twitter:image" content="https://placehold.co/1200x630/6C63FF/FFFFFF?text=About+PerfOptim">
  <link rel="alternate" hreflang="en-US" href="https://perfoptim.com/about.html">
  <link rel="alternate" hreflang="en-IN" href="https://perfoptim.com/in/">
${G.assets(P)}
${bc.schema}
</head>
<body>
${G.navHtml(P)}
  <main>
    <section class="page-hero">
      <div class="container">
        <span class="badge badge-dark" data-aos="fade-up">About Us</span>
        <h1 data-aos="fade-up">We're PerfOptim — <span class="text-primary">Built for Performance</span></h1>
        <p data-aos="fade-up">We exist to make digital marketing accountable to what actually matters: revenue. No fluff, no vanity metrics — just measurable growth for ambitious businesses.</p>
      </div>
    </section>
${bc.html}
    <section class="section">
      <div class="container" style="max-width:820px;text-align:center" data-aos="fade-up">
        <span class="eyebrow" style="color:var(--color-primary);font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:.85rem">Our Mission</span>
        <h2 style="margin:14px 0 20px">Marketing That Earns Its Keep</h2>
        <p style="font-size:1.1rem">PerfOptim was founded on a simple belief: marketing should be held to the same standard as any other business investment. We combine deep specialization, rigorous data, and transparent reporting to deliver growth our clients can measure to the dollar. From healthcare and law firms to SaaS and eCommerce, we build performance engines that compound — across the USA, India, Canada and the Gulf.</p>
      </div>
    </section>
    <section class="section section-light">
      <div class="container">
        <div class="section-head" data-aos="fade-up"><span class="eyebrow">Our Team</span><h2>The People Behind the Performance</h2></div>
        <div class="grid-4" data-aos="fade-up">
${team}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-head" data-aos="fade-up"><span class="eyebrow">Our Values</span><h2>What We Stand For</h2></div>
        <div class="grid-4" data-aos="fade-up">
${values}
        </div>
      </div>
    </section>
    <section class="section section-light">
      <div class="container">
        <div class="section-head" data-aos="fade-up"><span class="eyebrow">Our Journey</span><h2>Company Milestones</h2></div>
        <div class="milestones" data-aos="fade-up">
${milestones}
        </div>
      </div>
    </section>
    <section class="section section-dark">
      <div class="container text-center" data-aos="fade-up">
        <span class="eyebrow">Recognition</span>
        <h2 style="margin:14px 0 24px">Awards & Certifications</h2>
        <p style="max-width:640px;margin:0 auto 8px;font-weight:600;letter-spacing:.04em">Google Partner &nbsp;|&nbsp; Meta Business Partner &nbsp;|&nbsp; 5★ Clutch Rated &nbsp;|&nbsp; ISO 9001 Certified &nbsp;|&nbsp; HubSpot Solutions Partner</p>
        <a href="contact.html" class="btn btn-primary btn-lg" style="margin-top:24px">Work With Our Team <i class="fas fa-arrow-right"></i></a>
      </div>
    </section>
  </main>
${G.footerHtml(P)}
${G.scriptsHtml(P)}
</body>
</html>
`;
}

/* =================== CONTACT =================== */
function contactPage() {
  const P = '';
  const bc = G.breadcrumb(P, [{ label:'Home', href:'index.html' }, { label:'Contact' }]);
  const svcOpts = G.SERVICES.map(([,n]) => `                  <option>${n}</option>`).join('\n');
  return `<!DOCTYPE html>
<html lang="en-US">
<head>
${G.headCommon(P)}
  <title>Contact PerfOptim | Let's Talk Performance Marketing</title>
  <meta name="description" content="Contact PerfOptim to discuss your digital marketing goals. Reach our USA & India teams by email or phone, or request your free marketing audit today.">
  <meta name="keywords" content="contact perfoptim, digital marketing agency contact, free marketing audit, marketing consultation">
  <link rel="canonical" href="https://perfoptim.com/contact.html">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Contact PerfOptim">
  <meta property="og:description" content="Let's talk performance. Reach our USA & India teams today.">
  <meta property="og:image" content="https://placehold.co/1200x630/6C63FF/FFFFFF?text=Contact">
  <meta property="og:url" content="https://perfoptim.com/contact.html">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Contact PerfOptim">
  <meta name="twitter:description" content="Let's talk performance marketing.">
  <meta name="twitter:image" content="https://placehold.co/1200x630/6C63FF/FFFFFF?text=Contact">
  <link rel="alternate" hreflang="en-US" href="https://perfoptim.com/contact.html">
  <link rel="alternate" hreflang="en-IN" href="https://perfoptim.com/in/">
${G.assets(P)}
${bc.schema}
</head>
<body>
${G.navHtml(P)}
  <main>
    <section class="page-hero">
      <div class="container">
        <span class="badge badge-dark" data-aos="fade-up">Contact</span>
        <h1 data-aos="fade-up">Let's Talk <span class="text-primary">Performance</span></h1>
        <p data-aos="fade-up">Tell us about your goals and we'll show you exactly how PerfOptim can help you grow. Expect a response within 24 hours.</p>
      </div>
    </section>
${bc.html}
    <section class="section">
      <div class="container grid-2" style="align-items:start">
        <div data-aos="fade-right">
          <h2 style="margin-bottom:24px">Send Us a Message</h2>
          <div class="lead-card" style="background:#fff;border-color:var(--color-border);box-shadow:var(--shadow-md)">
            <form data-validate>
              <div class="form-grid">
                <div class="form-field"><label style="color:var(--color-text)">Name</label><input type="text" name="name" placeholder="Jane Smith" required style="background:#fff;border-color:var(--color-border);color:var(--color-text)"><span class="error-msg">Please enter your name.</span></div>
                <div class="form-field"><label style="color:var(--color-text)">Email</label><input type="email" name="email" placeholder="jane@company.com" required style="background:#fff;border-color:var(--color-border);color:var(--color-text)"><span class="error-msg">Enter a valid email.</span></div>
                <div class="form-field"><label style="color:var(--color-text)">Phone</label><input type="tel" name="phone" placeholder="(555) 123-4567" required style="background:#fff;border-color:var(--color-border);color:var(--color-text)"><span class="error-msg">Enter a valid phone.</span></div>
                <div class="form-field"><label style="color:var(--color-text)">Company</label><input type="text" name="company" placeholder="Company Inc." required style="background:#fff;border-color:var(--color-border);color:var(--color-text)"><span class="error-msg">Please enter your company.</span></div>
                <div class="form-field full"><label style="color:var(--color-text)">Service</label><select name="service" required style="background:#fff;border-color:var(--color-border);color:var(--color-text)"><option value="">Select a service</option>
${svcOpts}
                </select><span class="error-msg">Please select a service.</span></div>
                <div class="form-field full"><label style="color:var(--color-text)">Message</label><textarea name="message" rows="4" placeholder="Tell us about your goals..." required style="background:#fff;border-color:var(--color-border);color:var(--color-text)"></textarea><span class="error-msg">Please enter a message.</span></div>
                <div class="form-field full"><button type="submit" class="btn btn-primary btn-full btn-lg">Send Message <i class="fas fa-arrow-right"></i></button></div>
              </div>
            </form>
            <div class="form-success" style="color:var(--color-text)"><i class="fas fa-circle-check"></i><h3>Message sent!</h3><p style="color:var(--color-text-muted)">We'll get back to you within 24 hours.</p></div>
          </div>
        </div>
        <aside data-aos="fade-left">
          <h2 style="margin-bottom:24px">Get in Touch</h2>
          <div class="contact-detail"><i class="fas fa-envelope"></i><div><strong>Email</strong><span>hello@perfoptim.com</span></div></div>
          <div class="contact-detail"><i class="fas fa-phone"></i><div><strong>USA</strong><span>+1 (555) 123-4567</span></div></div>
          <div class="contact-detail"><i class="fas fa-phone"></i><div><strong>India</strong><span>+91 (98765) 43210</span></div></div>
          <div class="contact-detail"><i class="fas fa-location-dot"></i><div><strong>Office</strong><span>Remote-first. Serving USA &amp; India.</span></div></div>
          <div class="footer-social" style="margin-top:24px">
            <a href="#" class="li" aria-label="LinkedIn" style="background:var(--color-light);color:var(--color-primary)"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" class="tw" aria-label="Twitter X" style="background:var(--color-light);color:var(--color-primary)"><i class="fab fa-x-twitter"></i></a>
            <a href="#" class="ig" aria-label="Instagram" style="background:var(--color-light);color:var(--color-primary)"><i class="fab fa-instagram"></i></a>
            <a href="#" class="yt" aria-label="YouTube" style="background:var(--color-light);color:var(--color-primary)"><i class="fab fa-youtube"></i></a>
          </div>
          <div style="margin-top:28px;border-radius:var(--radius-md);overflow:hidden;border:1px solid var(--color-border)">
            <iframe title="PerfOptim office map" src="https://www.openstreetmap.org/export/embed.html?bbox=-74.05%2C40.68%2C-73.86%2C40.82&amp;layer=mapnik" width="100%" height="240" style="border:0" loading="lazy"></iframe>
          </div>
        </aside>
      </div>
    </section>
    <section class="section section-light">
      <div class="container">
        <div class="section-head" data-aos="fade-up"><span class="eyebrow">Quick Questions</span><h2>Before You Reach Out</h2></div>
        <div class="faq-list" data-aos="fade-up">
          <details class="faq-item"><summary>How fast will you respond?</summary><p>We respond to all inquiries within 24 business hours, often much sooner.</p></details>
          <details class="faq-item"><summary>Is the audit really free?</summary><p>Yes — 100% free with no commitment. We deliver actionable findings within 48 hours.</p></details>
          <details class="faq-item"><summary>Do you work with my budget?</summary><p>We build custom programs around your goals and budget, with no long-term lock-ins.</p></details>
        </div>
      </div>
    </section>
  </main>
${G.footerHtml(P)}
${G.scriptsHtml(P)}
</body>
</html>
`;
}

/* =================== BLOG =================== */
function blogPage() {
  const P = 'blog/'; // file is in blog/, so prefix back to root is '../'
  const RP = '../';
  const bc = G.breadcrumb(RP, [{ label:'Home', href:'index.html' }, { label:'Blog' }]);
  const posts = [
    ['SEO','10 SEO Trends That Will Define 2026','From AI search to entity SEO — here is exactly where to focus your organic strategy this year.','Jun 12, 2026','SEO+2026'],
    ['PPC','How We 3x\'d ROAS on a Tight Budget','A practical breakdown of the account restructure that transformed a client\'s paid media performance.','Jun 04, 2026','PPC+ROAS'],
    ['CRO','The 7-Point Landing Page Audit','The exact checklist we use to lift conversion rates before spending another dollar on ads.','May 28, 2026','CRO+Audit'],
    ['Content','Building a Content Engine That Compounds','How to turn your expertise into an always-on organic growth machine.','May 19, 2026','Content'],
    ['Social Media','LinkedIn Demand Gen for B2B in 2026','The playbook we use to turn LinkedIn into a predictable pipeline channel.','May 09, 2026','LinkedIn'],
    ['ORM','Why Reviews Are Your Cheapest Conversion Lever','A data-backed look at how reputation directly impacts your bottom line.','Apr 30, 2026','Reviews'],
  ].map(([cat,title,exc,date,img]) => `          <article class="blog-card"><img src="https://placehold.co/400x220/6C63FF/FFFFFF?text=${img}" alt="${title} — PerfOptim blog" loading="lazy" width="400" height="220"><div class="blog-body"><span class="cat-tag">${cat}</span><h3>${title}</h3><p>${exc}</p><div class="blog-meta"><a href="#" class="learn-more">Read More <i class="fas fa-arrow-right"></i></a><span>${date}</span></div></div></article>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en-US">
<head>
${G.headCommon(RP)}
  <title>Blog | Performance Marketing Insights | PerfOptim</title>
  <meta name="description" content="Actionable performance marketing insights from PerfOptim — SEO, PPC, content, CRO, social media and ORM strategies that drive measurable growth.">
  <meta name="keywords" content="marketing blog, seo tips, ppc strategy, cro insights, content marketing, performance marketing blog">
  <link rel="canonical" href="https://perfoptim.com/blog/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Blog | PerfOptim">
  <meta property="og:description" content="Actionable performance marketing insights.">
  <meta property="og:image" content="https://placehold.co/1200x630/6C63FF/FFFFFF?text=Blog">
  <meta property="og:url" content="https://perfoptim.com/blog/">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Blog | PerfOptim">
  <meta name="twitter:description" content="Actionable performance marketing insights.">
  <meta name="twitter:image" content="https://placehold.co/1200x630/6C63FF/FFFFFF?text=Blog">
  <link rel="alternate" hreflang="en-US" href="https://perfoptim.com/blog/">
  <link rel="alternate" hreflang="en-IN" href="https://perfoptim.com/in/">
${G.assets(RP)}
${bc.schema}
</head>
<body>
${G.navHtml(RP)}
  <main>
    <section class="page-hero">
      <div class="container">
        <span class="badge badge-dark" data-aos="fade-up">Blog</span>
        <h1 data-aos="fade-up">Performance Marketing <span class="text-primary">Insights</span></h1>
        <p data-aos="fade-up">Actionable strategies, case study breakdowns, and data-driven playbooks to grow your business faster.</p>
      </div>
    </section>
${bc.html}
    <section class="section section-light">
      <div class="container">
        <div class="blog-layout">
          <aside class="blog-sidebar" data-aos="fade-right">
            <div class="widget"><h4>Search</h4><input type="search" placeholder="Search articles..." aria-label="Search blog"></div>
            <div class="widget"><h4>Categories</h4><ul>
              <li><a href="#">SEO</a></li><li><a href="#">PPC</a></li><li><a href="#">Content</a></li><li><a href="#">CRO</a></li><li><a href="#">Social Media</a></li><li><a href="#">ORM</a></li>
            </ul></div>
            <div class="widget"><h4>Recent Posts</h4><ul>
              <li><a href="#">10 SEO Trends for 2026</a></li><li><a href="#">How We 3x'd ROAS</a></li><li><a href="#">The 7-Point Landing Page Audit</a></li>
            </ul></div>
            <div class="widget sidebar-cta"><h4>Get Free Audit</h4><p>See exactly where your marketing is leaking revenue.</p><a href="${RP}contact.html" class="btn btn-primary btn-full">Request Audit</a></div>
          </aside>
          <div data-aos="fade-up">
            <div class="grid-2" style="grid-template-columns:repeat(2,1fr)">
${posts}
            </div>
            <nav class="pagination" aria-label="Blog pagination">
              <a href="#">Previous</a><a href="#" class="active">1</a><a href="#">2</a><a href="#">3</a><a href="#">Next</a>
            </nav>
          </div>
        </div>
      </div>
    </section>
  </main>
${G.footerHtml(RP)}
${G.scriptsHtml(RP)}
</body>
</html>
`;
}

/* =================== 404 =================== */
function notFoundPage() {
  const P = '';
  return `<!DOCTYPE html>
<html lang="en-US">
<head>
${G.headCommon(P)}
  <title>404 — Page Not Found | PerfOptim</title>
  <meta name="description" content="This page went on a performance audit. Head back home or explore PerfOptim's services and industries.">
  <meta name="robots" content="noindex">
  <link rel="canonical" href="https://perfoptim.com/404.html">
${G.assets(P)}
</head>
<body>
  <main class="error-page">
    <div class="container">
      <div class="error-code">404</div>
      <h1>Looks like this page went on a performance audit.</h1>
      <p style="color:rgba(255,255,255,.75);max-width:520px;margin:14px auto 0">We couldn't find the page you were looking for — but we can definitely find growth opportunities for your business.</p>
      <div class="hero-ctas" style="justify-content:center;margin-top:28px">
        <a href="index.html" class="btn btn-primary btn-lg">Go Back Home <i class="fas fa-arrow-right"></i></a>
      </div>
      <div class="error-links">
        <a href="services/index.html">Services</a>
        <a href="industries/index.html">Industries</a>
        <a href="contact.html">Contact</a>
      </div>
    </div>
  </main>
  <script src="js/main.js" defer></script>
</body>
</html>
`;
}

fs.writeFileSync(path.join(G.ROOT, 'about.html'), aboutPage());
fs.writeFileSync(path.join(G.ROOT, 'contact.html'), contactPage());
fs.writeFileSync(path.join(G.ROOT, 'blog', 'index.html'), blogPage());
fs.writeFileSync(path.join(G.ROOT, '404.html'), notFoundPage());
console.log('Wrote about.html, contact.html, blog/index.html, 404.html');
