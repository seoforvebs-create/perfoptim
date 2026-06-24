/* data/industries.js
 * Rich-object adapter for the 11 core US industries.
 * Derives slug/name/icon/focus from build/generate.js (INDUSTRIES + INDUSTRY_COPY)
 * and normalizes into the shape India templates expect
 * (slug/name/icon/h1/metaTitle/metaDesc/painPoints/services/stats/faqs).
 */
const C = require('../build/generate.js');

// Default service mix for US industries when nothing more specific applies.
const DEFAULT_SERVICES = ['seo-services', 'ppc-advertising', 'lead-generation', 'content-marketing', 'web-design-development', 'social-media-marketing'];

const SERVICE_MIX = {
  'healthcare': ['seo-services', 'ppc-advertising', 'orm-services', 'lead-generation', 'content-marketing', 'web-design-development'],
  'law-firms': ['seo-services', 'ppc-advertising', 'lead-generation', 'content-marketing', 'orm-services', 'web-design-development'],
  'real-estate': ['ppc-advertising', 'lead-generation', 'social-media-marketing', 'seo-services', 'video-marketing', 'web-design-development'],
  'ecommerce': ['ppc-advertising', 'cro-services', 'social-media-marketing', 'email-marketing', 'seo-services', 'video-marketing'],
  'saas-technology': ['performance-marketing', 'content-marketing', 'seo-services', 'ppc-advertising', 'lead-generation', 'cro-services'],
  'finance-insurance': ['seo-services', 'ppc-advertising', 'lead-generation', 'content-marketing', 'orm-services', 'email-marketing'],
  'manufacturers-oem': ['seo-services', 'lead-generation', 'content-marketing', 'web-design-development', 'ppc-advertising', 'email-marketing'],
  'small-business': ['seo-services', 'ppc-advertising', 'social-media-marketing', 'lead-generation', 'web-design-development', 'content-marketing'],
  'fitness-wellness': ['social-media-marketing', 'ppc-advertising', 'lead-generation', 'seo-services', 'content-marketing', 'email-marketing'],
  'dental-clinics': ['seo-services', 'ppc-advertising', 'orm-services', 'lead-generation', 'social-media-marketing', 'web-design-development'],
  'restaurants-hospitality': ['social-media-marketing', 'seo-services', 'orm-services', 'ppc-advertising', 'content-marketing', 'web-design-development'],
};

function defaultFaqs(name) {
  return [
    { q: `Do you have experience marketing for ${name}?`, a: `Yes — we run proven, vertical-specific playbooks for ${name} and tailor every campaign to your market and goals.` },
    { q: `How quickly can ${name} expect results?`, a: `Most ${name} clients see measurable improvement within 30–90 days, with results compounding over time.` },
    { q: `What does it cost to market a ${name} business?`, a: `Pricing is scoped to your goals after a free audit, so investment always maps to real opportunity.` },
    { q: `Do you report on real ROI?`, a: `Always. We tie every ${name} engagement to revenue-focused KPIs with transparent reporting.` },
    { q: `Can you work alongside our existing team?`, a: `Yes — we operate as an extension of your team and collaborate closely with in-house staff.` },
  ];
}

const industries = C.INDUSTRIES.map(([slug, name, icon, focus]) => {
  const copy = C.INDUSTRY_COPY[slug] || {};
  const painPoints = (copy.pains || []).map(([picon, title, desc]) => ({ icon: picon, title, desc }));
  const stats = (copy.results || []).map(([num, label]) => `${num} ${label}`);
  return {
    slug,
    name,
    icon,
    focus,
    h1: `Digital Marketing for ${name}`,
    metaTitle: `${name} Digital Marketing Agency | PerfOptim`,
    metaDesc: `Performance-driven digital marketing for ${name}. We help you achieve ${focus} with SEO, PPC, and lead generation engineered for ROI.`,
    painPoints: painPoints.length ? painPoints : [
      { icon: 'fa-circle-exclamation', title: 'Inconsistent lead flow', desc: `${name} struggle to generate predictable, qualified leads.` },
      { icon: 'fa-magnifying-glass', title: 'Low online visibility', desc: `Without strong SEO, competitors capture your prospects first.` },
      { icon: 'fa-chart-line', title: 'Unmeasured marketing spend', desc: `Budget is wasted on channels that aren't tied to revenue.` },
    ],
    services: SERVICE_MIX[slug] || DEFAULT_SERVICES,
    stats: stats.length ? stats : ['Significant lead growth', 'Lower cost per acquisition', 'Strong return on ad spend'],
    faqs: defaultFaqs(name),
    indiaSpecific: false,
  };
});

module.exports = industries;
