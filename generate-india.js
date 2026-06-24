/* generate-india.js
 * India (/in/) programmatic SEO generator.
 * Tiers:
 *   T1  service root            /in/services/{service}/
 *   T2  service+industry (nat)  /in/{service}-for-{industry}/
 *   T3  service+state           /in/{state}/{service}/
 *   T4  service+industry+state  /in/{state}/{service}-for-{industry}/   (priority combos)
 *   T5  service+city            /in/{state}/{city}/{service}/           (top 4 cities/state)
 *   T6  service+industry+city   /in/{state}/{city}/{service}-for-{industry}/ (priority, top 3 cities)
 * Plus: industry hubs, blog posts, in/sitemap.xml
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const IN_ROOT = path.join(ROOT, 'in');

const services = require('./data/india/services-in.js');
const industries = require('./data/india/industries-in.js');
const { states } = require('./data/india/locations-in.js');
const blogPosts = require('./data/india/blog-in.js');

const { generateServicePageIN } = require('./templates/india/serviceTemplate-in.js');
const { generateIndustryPageIN } = require('./templates/india/industryTemplate-in.js');
const { generateBlogPostIN } = require('./templates/india/blogTemplate-in.js');

function svc(slug) { return services.find(s => s.slug === slug); }
function ind(slug) { return industries.find(i => i.slug === slug); }

const urls = []; // collected for sitemap
let count = 0;

function write(relUrlPath, html) {
  // relUrlPath like "in/services/seo-services/" -> writes index.html inside
  const dir = path.join(ROOT, relUrlPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  urls.push('https://perfoptim.com/' + relUrlPath.replace(/\\/g, '/'));
  count++;
}

/* ---------- Bareilly manual pages: skip in generator (hand-written) ---------- */
const MANUAL_PAGES = new Set([
  'in/uttar-pradesh/bareilly/seo-services/',
  'in/uttar-pradesh/bareilly/digital-marketing-agency/',
  'in/uttar-pradesh/bareilly/lead-generation-for-education-coaching/',
  'in/uttar-pradesh/bareilly/google-my-business-seo/',
  'in/blog/local-seo-bareilly-businesses/',
]);
function writeUnlessManual(relUrlPath, builder) {
  if (MANUAL_PAGES.has(relUrlPath)) {
    // still register the URL for sitemap so manual pages are indexed
    urls.push('https://perfoptim.com/' + relUrlPath);
    return;
  }
  write(relUrlPath, builder());
}

/* ---------- Priority combos ---------- */
// T4: 15 priority service+industry+state combos
const T4_COMBOS = [
  ['lead-generation', 'education-coaching', 'uttar-pradesh'],
  ['seo-services', 'education-coaching', 'rajasthan'],
  ['seo-services', 'yoga-ttc', 'uttarakhand'],
  ['ppc-advertising', 'real-estate-india', 'maharashtra'],
  ['lead-generation', 'real-estate-india', 'karnataka'],
  ['google-my-business-seo', 'healthcare-india', 'telangana'],
  ['social-media-marketing', 'jewellery', 'gujarat'],
  ['seo-services', 'manufacturing-india', 'gujarat'],
  ['whatsapp-marketing', 'education-coaching', 'madhya-pradesh'],
  ['social-media-marketing', 'matrimonial-wedding', 'rajasthan'],
  ['content-marketing', 'tourism-travel', 'rajasthan'],
  ['seo-services', 'healthcare-india', 'delhi'],
  ['ppc-advertising', 'real-estate-india', 'haryana'],
  ['influencer-marketing', 'yoga-ttc', 'uttarakhand'],
  ['lead-generation', 'manufacturing-india', 'tamil-nadu'],
];

// T6: priority service+industry combos for top cities
const T6_COMBOS = [
  ['seo-services', 'education-coaching'],
  ['lead-generation', 'real-estate-india'],
  ['google-my-business-seo', 'healthcare-india'],
  ['social-media-marketing', 'jewellery'],
  ['seo-services', 'yoga-ttc'],
];

/* ---------- TIER 1: service root ---------- */
services.forEach(service => {
  write(`in/services/${service.slug}/`, generateServicePageIN({ service }));
});

/* ---------- TIER 2: service+industry national ---------- */
// All India-specific industries x their listed services, plus a curated core set
industries.filter(i => i.indiaSpecific).forEach(industry => {
  (industry.services || []).forEach(sl => {
    const service = svc(sl);
    if (!service) return;
    write(`in/${service.slug}-for-${industry.slug}/`, generateServicePageIN({ service, industry }));
  });
});

/* ---------- TIER 3: service+state ---------- */
// Core revenue services across every state
const T3_SERVICES = ['seo-services', 'ppc-advertising', 'lead-generation', 'google-my-business-seo', 'whatsapp-marketing', 'social-media-marketing'];
states.forEach(state => {
  T3_SERVICES.forEach(sl => {
    const service = svc(sl);
    write(`in/${state.slug}/${service.slug}/`, generateServicePageIN({ service, state }));
  });
});

/* ---------- TIER 4: service+industry+state (priority) ---------- */
T4_COMBOS.forEach(([ss, is, st]) => {
  const service = svc(ss), industry = ind(is), state = states.find(s => s.slug === st);
  if (!service || !industry || !state) return;
  write(`in/${state.slug}/${service.slug}-for-${industry.slug}/`, generateServicePageIN({ service, industry, state }));
});

/* ---------- TIER 5: service+city (top 4 cities/state) ---------- */
const T5_SERVICES = ['seo-services', 'ppc-advertising', 'google-my-business-seo', 'lead-generation'];
states.forEach(state => {
  const topCities = state.cities.slice(0, 4);
  topCities.forEach(city => {
    T5_SERVICES.forEach(sl => {
      const service = svc(sl);
      const rel = `in/${state.slug}/${city.slug}/${service.slug}/`;
      writeUnlessManual(rel, () => generateServicePageIN({ service, state, city }));
    });
  });
});

/* ---------- TIER 6: service+industry+city (priority combos, top 3 cities) ---------- */
states.forEach(state => {
  const topCities = state.cities.slice(0, 3);
  topCities.forEach(city => {
    T6_COMBOS.forEach(([ss, is]) => {
      const service = svc(ss), industry = ind(is);
      if (!service || !industry) return;
      const rel = `in/${state.slug}/${city.slug}/${service.slug}-for-${industry.slug}/`;
      writeUnlessManual(rel, () => generateServicePageIN({ service, industry, state, city }));
    });
  });
});

/* ---------- INDUSTRY HUBS ---------- */
industries.forEach(industry => {
  write(`in/industries/${industry.slug}/`, generateIndustryPageIN({ industry }));
});

/* ---------- BLOG POSTS ---------- */
blogPosts.forEach(post => {
  const rel = `in/blog/${post.slug}/`;
  writeUnlessManual(rel, () => generateBlogPostIN({ post, allPosts: blogPosts }));
});

/* ---------- SITEMAP for /in/ ---------- */
const uniqueUrls = [...new Set(urls)].sort();
const sitemapClean = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url><loc>https://perfoptim.com/in/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
${uniqueUrls.map(u => `  <url><loc>${u}</loc><changefreq>weekly</changefreq><priority>0.7</priority><xhtml:link rel="alternate" hreflang="en-IN" href="${u}"/></url>`).join('\n')}
</urlset>`;
fs.writeFileSync(path.join(IN_ROOT, 'sitemap.xml'), sitemapClean);

fs.writeFileSync(path.join(ROOT, 'build', 'india-urls.json'), JSON.stringify(uniqueUrls, null, 2));

console.log(`Generated ${count} India pages (+${MANUAL_PAGES.size} manual). Sitemap: ${uniqueUrls.length + 1} URLs.`);
