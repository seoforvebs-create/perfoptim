/* templates/india/_inHelpers.js
 * Shared building blocks for all India (/in/) pages.
 * Every helper takes a `prefix` — the relative path back to site root
 * (e.g. "../" from /in/, "../../" from /in/{state}/, etc.)
 * `inPrefix` is the relative path back to the /in/ root.
 */

const WA_NUMBER = '919876543210';
const SITE = 'https://perfoptim.com';

function waLink(text) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

function head(prefix, { title, desc, canonical, keywords }) {
  return `  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  ${keywords ? `<meta name="keywords" content="${esc(keywords)}">` : ''}
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:image" content="https://placehold.co/1200x630/6C63FF/FFFFFF?text=PerfOptim+India">
  <meta property="og:url" content="${canonical}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(desc)}">
  <link rel="alternate" hreflang="en-US" href="${SITE}/">
  <link rel="alternate" hreflang="en-IN" href="${SITE}/in/">
  <link rel="alternate" hreflang="x-default" href="${SITE}/">
  <link rel="icon" type="image/svg+xml" href="${prefix}assets/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
  <link rel="stylesheet" href="${prefix}css/style.css">
  <link rel="stylesheet" href="${prefix}css/components.css">
  <link rel="stylesheet" href="${prefix}css/responsive.css">`;
}

function nav(prefix, inPrefix) {
  return `  <header class="site-nav nav-solid" id="siteNav">
    <nav class="nav-inner" aria-label="Primary">
      <a href="${inPrefix}index.html" class="nav-logo"><i class="fas fa-bolt"></i> PerfOptim <span style="font-size:.7em;opacity:.7">India</span></a>
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
      <ul class="nav-menu">
        <li class="nav-item has-children">
          <a href="${inPrefix}services/seo-services/" class="nav-link has-dropdown">Services <i class="fas fa-chevron-down"></i></a>
          <div class="dropdown">
            <a href="${inPrefix}services/seo-services/"><i class="fas fa-magnifying-glass-chart"></i> SEO Services</a>
            <a href="${inPrefix}services/ppc-advertising/"><i class="fas fa-bullseye"></i> PPC Advertising</a>
            <a href="${inPrefix}services/whatsapp-marketing/"><i class="fab fa-whatsapp"></i> WhatsApp Marketing</a>
            <a href="${inPrefix}services/google-my-business-seo/"><i class="fas fa-map-marker-alt"></i> GMB SEO</a>
            <a href="${inPrefix}services/lead-generation/"><i class="fas fa-filter"></i> Lead Generation</a>
            <a href="${inPrefix}services/influencer-marketing/"><i class="fas fa-star"></i> Influencer Marketing</a>
          </div>
        </li>
        <li class="nav-item has-children">
          <a href="${inPrefix}industries/education-coaching/" class="nav-link has-dropdown">Industries <i class="fas fa-chevron-down"></i></a>
          <div class="dropdown">
            <a href="${inPrefix}industries/education-coaching/"><i class="fas fa-graduation-cap"></i> Education & Coaching</a>
            <a href="${inPrefix}industries/healthcare-india/"><i class="fas fa-hospital"></i> Healthcare</a>
            <a href="${inPrefix}industries/real-estate-india/"><i class="fas fa-building"></i> Real Estate</a>
            <a href="${inPrefix}industries/yoga-ttc/"><i class="fas fa-leaf"></i> Yoga & TTC</a>
            <a href="${inPrefix}industries/jewellery/"><i class="fas fa-gem"></i> Jewellery</a>
            <a href="${inPrefix}industries/manufacturing-india/"><i class="fas fa-cogs"></i> Manufacturing</a>
          </div>
        </li>
        <li class="nav-item has-children">
          <a href="#" class="nav-link has-dropdown">Locations <i class="fas fa-chevron-down"></i></a>
          <div class="dropdown">
            <a href="${prefix}index.html"><i class="fas fa-flag-usa"></i> United States</a>
            <a href="${inPrefix}index.html"><i class="fas fa-globe-asia"></i> India</a>
          </div>
        </li>
        <li class="nav-item"><a href="${inPrefix}blog/local-seo-bareilly-businesses/" class="nav-link">Blog</a></li>
        <li class="nav-item"><a href="${prefix}about.html" class="nav-link">About</a></li>
        <li class="nav-item"><a href="${waLink('Hi, I would like to talk to PerfOptim about digital marketing.')}" target="_blank" rel="noopener" class="nav-link nav-cta">Contact</a></li>
      </ul>
    </nav>
  </header>`;
}

function footer(prefix, inPrefix) {
  return `  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="footer-logo"><i class="fas fa-bolt"></i> PerfOptim India</div>
          <p class="footer-tagline">India's performance-driven digital marketing agency. From Bareilly to Bangalore — measurable growth for Indian businesses.</p>
          <div class="footer-social">
            <a href="#" class="li" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" class="tw" aria-label="Twitter X"><i class="fab fa-x-twitter"></i></a>
            <a href="#" class="ig" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" class="yt" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="${inPrefix}services/seo-services/">SEO Services</a></li>
            <li><a href="${inPrefix}services/ppc-advertising/">PPC Advertising</a></li>
            <li><a href="${inPrefix}services/whatsapp-marketing/">WhatsApp Marketing</a></li>
            <li><a href="${inPrefix}services/google-my-business-seo/">Google My Business SEO</a></li>
            <li><a href="${inPrefix}services/lead-generation/">Lead Generation</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Industries</h4>
          <ul>
            <li><a href="${inPrefix}industries/education-coaching/">Education & Coaching</a></li>
            <li><a href="${inPrefix}industries/healthcare-india/">Healthcare</a></li>
            <li><a href="${inPrefix}industries/real-estate-india/">Real Estate</a></li>
            <li><a href="${inPrefix}industries/yoga-ttc/">Yoga & TTC</a></li>
            <li><a href="${inPrefix}industries/jewellery/">Jewellery Brands</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Bareilly HQ</h4>
          <ul>
            <li><a href="${inPrefix}uttar-pradesh/bareilly/digital-marketing-agency/">Digital Marketing Bareilly</a></li>
            <li><a href="${inPrefix}uttar-pradesh/bareilly/seo-services/">SEO Services Bareilly</a></li>
            <li><a href="${inPrefix}uttar-pradesh/bareilly/google-my-business-seo/">GMB SEO Bareilly</a></li>
          </ul>
          <h4 style="margin-top:20px">Talk to Us</h4>
          <a href="${waLink('Hi PerfOptim, I would like a free digital audit.')}" target="_blank" rel="noopener" class="btn-whatsapp" style="display:inline-flex;margin-top:8px"><i class="fab fa-whatsapp"></i> WhatsApp Us</a>
        </div>
      </div>
      <div class="footer-geo">Serving USA | India | Canada | Gulf &nbsp;·&nbsp; GST Registered &nbsp;·&nbsp; ISO 9001 Certified</div>
      <div class="footer-bottom">
        <span>&copy; 2026 PerfOptim. All rights reserved.</span>
        <span>Offices: Bareilly · Delhi · Remote</span>
        <span><a href="#">Privacy</a> &nbsp;·&nbsp; <a href="#">Terms</a></span>
      </div>
    </div>
  </footer>`;
}

function whatsappFloat(label) {
  return `  <a href="${waLink(label || 'Hi PerfOptim, I have an enquiry.')}" class="whatsapp-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><i class="fab fa-whatsapp"></i></a>`;
}

function scripts(prefix) {
  return `  <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" defer></script>
  <script src="${prefix}js/main.js" defer></script>
  <script src="${prefix}js/counter.js" defer></script>
  <script src="${prefix}js/form.js" defer></script>`;
}

function breadcrumb(inPrefix, trail) {
  // trail: [{label, href (relative to inPrefix, no leading slash) | null}]
  const items = trail.map((t, i) => {
    if (i === trail.length - 1 || !t.href) return `        <li aria-current="page">${esc(t.label)}</li>`;
    return `        <li><a href="${inPrefix}${t.href}">${esc(t.label)}</a></li>`;
  }).join('\n');
  const listItems = trail.map((t, i) =>
    `      {"@type":"ListItem","position":${i + 1},"name":"${esc(t.label)}"${t.href && i < trail.length - 1 ? `,"item":"${SITE}/in/${t.href}"` : ''}}`
  ).join(',\n');
  return {
    html: `  <nav class="breadcrumb" aria-label="Breadcrumb">
    <div class="container">
      <ol>
        <li><a href="${inPrefix}index.html">India</a></li>
${items}
      </ol>
    </div>
  </nav>`,
    schema: `  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
      {"@type":"ListItem","position":0,"name":"India","item":"${SITE}/in/"},
${listItems}
  ]}
  </script>`
  };
}

function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

module.exports = { WA_NUMBER, SITE, waLink, head, nav, footer, whatsappFloat, scripts, breadcrumb, esc };
