/* data/services.js
 * Rich-object adapter for the 12 core US services.
 * Derives names/slugs/icons from build/generate.js (SERVICES + SERVICE_COPY)
 * and normalizes every entry into the shape India templates expect
 * (slug/name/shortName/icon/color/metaTitle/metaDesc/h1/intro/
 *  subServices/processSteps/faqs/caseStudy).
 */
const C = require('../build/generate.js');

// Palette cycled across services for accent colors.
const COLORS = ['#6C63FF', '#FF6584', '#00C2A8', '#FFB020', '#3B82F6', '#8B5CF6',
                '#EF4444', '#10B981', '#F59E0B', '#EC4899', '#06B6D4', '#6366F1'];

// Per-service sub-services, process steps, default FAQs and case study.
const EXTRA = {
  'seo-services': {
    subServices: ['Technical SEO Audit', 'Keyword Research', 'On-Page Optimization', 'Link Building', 'Local SEO', 'SEO Content Strategy'],
    processSteps: ['SEO Audit & Discovery', 'Keyword & Competitor Research', 'On-Page & Technical Fixes', 'Authority Link Building', 'Reporting & Optimization'],
    caseStudy: { industry: 'B2B SaaS', result: 'Organic traffic grew 210% and demo requests doubled', period: '6 months' },
  },
  'ppc-advertising': {
    subServices: ['Google Search Ads', 'Performance Max', 'Meta Ads', 'Retargeting', 'Shopping Ads', 'Landing Page CRO'],
    processSteps: ['Account & Funnel Audit', 'Campaign Architecture', 'Creative & Copy Testing', 'Bid & Budget Optimization', 'ROAS Reporting'],
    caseStudy: { industry: 'eCommerce', result: 'ROAS improved from 1.8x to 4.6x while scaling spend', period: '90 days' },
  },
  'performance-marketing': {
    subServices: ['Full-Funnel Strategy', 'Attribution Setup', 'Paid Media Management', 'CRO Experiments', 'Email & Retention', 'Analytics Dashboards'],
    processSteps: ['Growth Audit', 'Tracking & Attribution', 'Channel Orchestration', 'Continuous Experimentation', 'Revenue Reporting'],
    caseStudy: { industry: 'D2C Brand', result: 'Blended CAC reduced 38% across all channels', period: '4 months' },
  },
  'content-marketing': {
    subServices: ['Content Strategy', 'Blog & Articles', 'Lead Magnets', 'Pillar Pages', 'Content Distribution', 'Editorial Calendar'],
    processSteps: ['Audience & Funnel Mapping', 'Editorial Roadmap', 'Expert Content Production', 'On-Page SEO', 'Distribution & Refresh'],
    caseStudy: { industry: 'Fintech', result: 'Content drove 60% of all inbound qualified leads', period: '8 months' },
  },
  'web-design-development': {
    subServices: ['Conversion-Focused Design', 'Responsive Development', 'Landing Pages', 'Core Web Vitals', 'CMS Build', 'Speed Optimization'],
    processSteps: ['Discovery & Wireframes', 'UX/UI Design', 'Development & QA', 'Performance Tuning', 'Launch & Support'],
    caseStudy: { industry: 'Professional Services', result: 'New site lifted conversion rate by 73%', period: '60 days' },
  },
  'cro-services': {
    subServices: ['Conversion Audit', 'A/B Testing', 'Heatmap Analysis', 'Funnel Optimization', 'Landing Page Testing', 'UX Research'],
    processSteps: ['Conversion Audit', 'Hypothesis & Prioritization', 'Test Design', 'Run & Measure', 'Iterate & Scale'],
    caseStudy: { industry: 'SaaS', result: 'Checkout conversion improved 41% in two test cycles', period: '90 days' },
  },
  'orm-services': {
    subServices: ['Reputation Audit', 'Review Generation', 'Negative Review Suppression', 'Brand Monitoring', 'PR & Content', 'Crisis Management'],
    processSteps: ['Reputation Audit', 'Review Strategy', 'Content & Suppression', 'Monitoring', 'Ongoing Management'],
    caseStudy: { industry: 'Healthcare', result: 'Average rating rose from 3.4 to 4.7 stars', period: '5 months' },
  },
  'social-media-marketing': {
    subServices: ['Social Strategy', 'Content Creation', 'Community Management', 'Paid Social', 'Reels & Shorts', 'Analytics & Reporting'],
    processSteps: ['Brand & Audience Audit', 'Content Calendar', 'Creative Production', 'Publishing & Engagement', 'Performance Reporting'],
    caseStudy: { industry: 'Lifestyle Brand', result: 'Engaged following grew 320% with 5x reach', period: '6 months' },
  },
  'lead-generation': {
    subServices: ['Lead Funnel Design', 'Paid Lead Campaigns', 'Landing Pages', 'Lead Scoring', 'CRM Integration', 'Nurture Sequences'],
    processSteps: ['ICP & Offer Definition', 'Funnel Build', 'Campaign Launch', 'Lead Qualification', 'Optimization & Scaling'],
    caseStudy: { industry: 'B2B Services', result: 'Qualified pipeline up 4x at half the cost per lead', period: '4 months' },
  },
  'branding-design': {
    subServices: ['Brand Strategy', 'Logo & Identity', 'Brand Guidelines', 'Collateral Design', 'Packaging', 'Rebranding'],
    processSteps: ['Brand Discovery', 'Positioning & Strategy', 'Visual Identity Design', 'Guidelines & Assets', 'Rollout'],
    caseStudy: { industry: 'Startup', result: 'Rebrand supported a successful Series A raise', period: '3 months' },
  },
  'video-marketing': {
    subServices: ['Video Strategy', 'Short-Form Reels', 'YouTube Ads', 'Explainer Videos', 'Product Videos', 'Video SEO'],
    processSteps: ['Creative Strategy', 'Scripting & Storyboard', 'Production', 'Editing & Optimization', 'Distribution'],
    caseStudy: { industry: 'eCommerce', result: 'Video ads delivered 3.2x ROAS vs static creative', period: '90 days' },
  },
  'email-marketing': {
    subServices: ['Email Strategy', 'Automation Flows', 'Newsletter Design', 'List Segmentation', 'A/B Testing', 'Deliverability'],
    processSteps: ['Audit & Strategy', 'Flow Mapping', 'Design & Build', 'Segmentation & Send', 'Optimization'],
    caseStudy: { industry: 'D2C Retail', result: 'Email drove 28% of total revenue via automation', period: '5 months' },
  },
};

function defaultFaqs(name) {
  return [
    { q: `How much do ${name} cost?`, a: `Our ${name} are scoped to your goals and market. Most engagements start with a free audit so pricing reflects real opportunity, not a generic package.` },
    { q: `How long until I see results from ${name}?`, a: `Many clients see early movement within 30–60 days, with compounding results over 3–6 months depending on competition and starting point.` },
    { q: `Do you report on ROI, not just activity?`, a: `Yes. Every ${name} engagement is tied to revenue-focused KPIs with transparent monthly reporting — no vanity metrics.` },
    { q: `Can you work with our existing team?`, a: `Absolutely. We integrate as an extension of your team and collaborate with in-house marketers, designers, and sales.` },
    { q: `Is there a long-term contract?`, a: `We earn your business month to month. Most clients stay because of results, not lock-in clauses.` },
  ];
}

const services = C.SERVICES.map(([slug, name, icon, fullname], i) => {
  const copy = C.SERVICE_COPY[slug] || {};
  const extra = EXTRA[slug] || {};
  return {
    slug,
    name,
    shortName: name.replace(/ Services| & Development| Advertising| Marketing/i, '').trim() || name,
    icon,
    color: COLORS[i % COLORS.length],
    fullName: fullname,
    metaTitle: `${name} Agency | PerfOptim`,
    metaDesc: copy.desc || `Professional ${name} from PerfOptim. ${name} engineered to drive measurable growth and ROI.`,
    h1: `${name} That Drive Measurable Growth`,
    intro: copy.whatis ? copy.whatis.split('. ').slice(0, 2).join('. ') + '.' : (copy.desc || `${name} from PerfOptim.`),
    whatis: copy.whatis || '',
    features: copy.features || [],
    subServices: extra.subServices || [name],
    processSteps: extra.processSteps || ['Audit', 'Strategy', 'Execution', 'Optimization', 'Reporting'],
    faqs: defaultFaqs(name),
    caseStudy: extra.caseStudy || { industry: 'Various', result: 'Significant measurable growth in qualified leads and revenue', period: '6 months' },
    indiaSpecific: false,
  };
});

module.exports = services;
