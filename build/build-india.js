const fs = require('fs');
const path = require('path');
const G = require('./generate.js');

const P = '../'; // /in/index.html -> root

function leadFormIndia() {
  const svcOpts = G.SERVICES.map(([,n]) => `                  <option>${n}</option>`).join('\n');
  const inds = ['Healthcare','Education','Real Estate','Yoga TTC','Tourism','Jewellery','Manufacturing','Matrimonial','eCommerce','Finance','Restaurants'];
  const indOpts = inds.map(n => `                  <option>${n}</option>`).join('\n');
  return `    <section class="section lead-section" id="lead-form">
      <div class="container">
        <div class="section-head" data-aos="fade-up">
          <h2 style="color:#fff">Get Your Free Digital Marketing Audit</h2>
          <p style="color:rgba(255,255,255,.8)">No commitment. 100% free. Delivered in 48 hours.</p>
        </div>
        <div class="lead-card" data-aos="fade-up">
          <form data-validate>
            <div class="form-grid">
              <div class="form-field"><label>Name</label><input type="text" name="name" placeholder="Rahul Sharma" required><span class="error-msg">Please enter your name.</span></div>
              <div class="form-field"><label>Business Email</label><input type="email" name="email" placeholder="rahul@company.in" required><span class="error-msg">Enter a valid email.</span></div>
              <div class="form-field"><label>Phone</label><input type="tel" name="phone" placeholder="+91 98765 43210" required><span class="error-msg">Enter a valid phone number.</span></div>
              <div class="form-field"><label>Website URL</label><input type="url" name="website" placeholder="https://yourcompany.in" required><span class="error-msg">Enter a valid URL.</span></div>
              <div class="form-field"><label>Service Interested In</label><select name="service" required><option value="">Select a service</option>
${svcOpts}
              </select><span class="error-msg">Please select a service.</span></div>
              <div class="form-field"><label>Industry</label><select name="industry" required><option value="">Select an industry</option>
${indOpts}
              </select><span class="error-msg">Please select an industry.</span></div>
              <div class="form-field full"><button type="submit" class="btn btn-primary btn-full btn-lg">Request Free Audit <i class="fas fa-arrow-right"></i></button></div>
            </div>
          </form>
          <div class="form-success"><i class="fas fa-circle-check"></i><h3 style="color:#fff">We'll reach out within 24 hours!</h3><p>Thanks for requesting your free audit.</p></div>
          <p class="form-trust">🔒 No spam. No cold calls. Just strategy.</p>
        </div>
      </div>
    </section>`;
}

function indiaPage() {
  const indCards = [
    ['fa-heart-pulse','Healthcare','Patient growth for hospitals & clinics'],
    ['fa-graduation-cap','Education','Admissions & lead gen for institutes'],
    ['fa-house','Real Estate','Buyer & investor leads across metros'],
    ['fa-spa','Yoga TTC','Global enrollments for yoga schools'],
    ['fa-plane','Tourism','Bookings for travel & hospitality'],
    ['fa-gem','Jewellery','D2C & retail growth for jewellers'],
    ['fa-industry','Manufacturing','B2B pipeline for exporters & OEMs'],
    ['fa-ring','Matrimonial','Membership growth for matrimony brands'],
    ['fa-cart-shopping','eCommerce','Profitable scale for D2C brands'],
  ].map(([i,n,d]) => `          <article class="service-card"><div class="icon"><i class="fas ${i}"></i></div><h3>${n}</h3><p>${d}</p><a href="${P}contact.html" class="learn-more">Talk to Us <i class="fas fa-arrow-right"></i></a></article>`).join('\n');

  const states = ['Maharashtra','Uttar Pradesh','Delhi','Karnataka','Tamil Nadu','Gujarat','Rajasthan','Telangana','West Bengal','Punjab'];
  const stateGrid = states.map(s => `          <a href="#">${s}</a>`).join('\n');
  const cities = ['Mumbai','Delhi','Bangalore','Hyderabad','Pune','Chennai','Bareilly','Lucknow','Jaipur','Ahmedabad'];
  const cityGrid = cities.map(c => `          <a href="#">${c}</a>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
${G.headCommon(P)}
  <title>PerfOptim India | #1 Performance Marketing Agency</title>
  <meta name="description" content="PerfOptim helps Indian businesses across healthcare, education, real estate, yoga TTC & manufacturing grow with data-driven digital marketing. Free audit.">
  <meta name="keywords" content="digital marketing agency india, performance marketing india, seo company india, ppc agency india, lead generation india">
  <link rel="canonical" href="https://perfoptim.com/in/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="PerfOptim India | #1 Performance Marketing Agency">
  <meta property="og:description" content="Data-driven digital marketing for Indian businesses across 15+ industries.">
  <meta property="og:image" content="https://placehold.co/1200x630/6C63FF/FFFFFF?text=PerfOptim+India">
  <meta property="og:url" content="https://perfoptim.com/in/">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="PerfOptim India">
  <meta name="twitter:description" content="Data-driven digital marketing for Indian businesses.">
  <meta name="twitter:image" content="https://placehold.co/1200x630/6C63FF/FFFFFF?text=PerfOptim+India">
  <link rel="alternate" hreflang="en-US" href="https://perfoptim.com/">
  <link rel="alternate" hreflang="en-IN" href="https://perfoptim.com/in/">
  <link rel="alternate" hreflang="x-default" href="https://perfoptim.com/">
${G.assets(P)}
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Organization","name":"PerfOptim India","url":"https://perfoptim.com/in/","logo":"https://perfoptim.com/assets/logo.png","areaServed":{"@type":"Country","name":"India"},"address":{"@type":"PostalAddress","addressRegion":"Uttar Pradesh","addressCountry":"IN"},"contactPoint":{"@type":"ContactPoint","telephone":"+91-98765-43210","contactType":"customer service","areaServed":"IN"}}
  </script>
</head>
<body>
${G.navHtml(P)}
  <main>
    <section class="page-hero" style="min-height:auto;padding-bottom:90px">
      <div class="container">
        <span class="badge badge-dark" data-aos="fade-up">🇮🇳 Trusted by 300+ Indian Businesses</span>
        <h1 data-aos="fade-up">India ka <span class="text-primary">#1</span> Performance Marketing Agency</h1>
        <p data-aos="fade-up">Helping Indian businesses across healthcare, education, real estate, yoga TTCs, and manufacturing grow with data-driven digital marketing.</p>
        <div class="hero-ctas" data-aos="fade-up">
          <a href="#lead-form" class="btn btn-primary btn-lg">Get Free Audit <i class="fas fa-arrow-right"></i></a>
          <a href="#industries-in" class="btn btn-secondary btn-lg">Our Industries</a>
        </div>
      </div>
    </section>

    <section class="stats-bar">
      <div class="container">
        <div class="stats-grid">
          <div><div class="stat-num"><span data-count="300" data-suffix="+">0</span></div><div class="stat-label">Indian Clients</div></div>
          <div><div class="stat-num"><span data-count="50" data-suffix="+">0</span></div><div class="stat-label">Cities Covered</div></div>
          <div><div class="stat-num"><span data-count="15" data-suffix="+">0</span></div><div class="stat-label">Industries Served</div></div>
          <div><div class="stat-num"><span data-count="4.9" data-suffix="/5" data-decimals="1">0</span></div><div class="stat-label">Client Rating</div></div>
        </div>
      </div>
    </section>

    <section class="section section-light" id="industries-in">
      <div class="container">
        <div class="section-head" data-aos="fade-up">
          <span class="eyebrow">Industries</span>
          <h2>Marketing Built for Indian Industries</h2>
          <p>From yoga teacher training schools to jewellery brands and manufacturing exporters — we know your market.</p>
        </div>
        <div class="grid-3" data-aos="fade-up">
${indCards}
        </div>
      </div>
    </section>

    <section class="section section-dark">
      <div class="container">
        <div class="section-head" data-aos="fade-up">
          <span class="eyebrow">Services</span>
          <h2>Full-Funnel Performance Marketing</h2>
          <p>The same data-driven services that power our US clients — localized for the Indian market.</p>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center" data-aos="fade-up">
${G.SERVICES.map(([slug,name,icon]) => `          <a href="${P}services/${slug}.html" class="pill">${name}</a>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="section" style="background:linear-gradient(135deg,#6C63FF,#5750d6);color:#fff">
      <div class="container">
        <div class="section-head" data-aos="fade-up">
          <h2 style="color:#fff">Serving Businesses Across India</h2>
          <p style="color:rgba(255,255,255,.85)">Hyperlocal strategies for every state and major city.</p>
        </div>
        <h3 style="color:#fff;text-align:center;margin-bottom:18px">Top States</h3>
        <div class="location-grid" data-aos="fade-up">
${stateGrid}
        </div>
        <h3 style="color:#fff;text-align:center;margin:40px 0 18px">City Highlights</h3>
        <div class="location-grid" data-aos="fade-up">
${cityGrid}
        </div>
      </div>
    </section>

    <section class="section section-light">
      <div class="container grid-2" style="align-items:center">
        <div data-aos="fade-right">
          <span class="eyebrow" style="color:var(--color-primary);font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:.85rem">Why PerfOptim India</span>
          <h2 style="margin:14px 0 24px">Why Indian Businesses Choose Us</h2>
          <ul class="usp-list">
            <li><i class="fas fa-circle-check"></i> Local market expertise across 50+ cities</li>
            <li><i class="fas fa-circle-check"></i> Data-first strategies, transparent reporting</li>
            <li><i class="fas fa-circle-check"></i> Specialized teams for Indian industries</li>
            <li><i class="fas fa-circle-check"></i> Global quality with India-friendly pricing</li>
            <li><i class="fas fa-circle-check"></i> No long-term lock-ins — results earn retention</li>
          </ul>
        </div>
        <div data-aos="fade-left">
          <div class="compare-stack">
            <div class="compare-card compare-before"><h4>Before PerfOptim</h4><div class="metric bad"><span>Leads / month</span><span>Low</span></div><div class="metric bad"><span>Cost per Lead</span><span>₹1,200</span></div><div class="metric bad"><span>ROAS</span><span>1.6x</span></div></div>
            <div class="compare-card compare-after"><h4>After PerfOptim</h4><div class="metric good"><span>Leads / month</span><span>↑ 4x</span></div><div class="metric good"><span>Cost per Lead</span><span>₹340</span></div><div class="metric good"><span>ROAS</span><span>5.4x</span></div></div>
          </div>
        </div>
      </div>
    </section>

${leadFormIndia()}
  </main>
${G.footerHtml(P)}
${G.scriptsHtml(P)}
</body>
</html>
`;
}

fs.writeFileSync(path.join(G.ROOT, 'in', 'index.html'), indiaPage());
console.log('Wrote in/index.html');
