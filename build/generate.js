/* PerfOptim static page generator — runs once at build time (Node) */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

/* ---------- Shared data ---------- */
const SERVICES = [
  ['seo-services', 'SEO Services', 'fa-magnifying-glass-chart', 'Search Engine Optimization'],
  ['ppc-advertising', 'PPC Advertising', 'fa-bullseye', 'Pay-Per-Click Advertising'],
  ['performance-marketing', 'Performance Marketing', 'fa-rocket', 'Performance Marketing'],
  ['content-marketing', 'Content Marketing', 'fa-pen-nib', 'Content Marketing'],
  ['web-design-development', 'Web Design & Development', 'fa-code', 'Web Design & Development'],
  ['cro-services', 'CRO Services', 'fa-arrow-trend-up', 'Conversion Rate Optimization'],
  ['orm-services', 'ORM Services', 'fa-shield-halved', 'Online Reputation Management'],
  ['social-media-marketing', 'Social Media Marketing', 'fa-hashtag', 'Social Media Marketing'],
  ['lead-generation', 'Lead Generation', 'fa-filter', 'Lead Generation'],
  ['branding-design', 'Branding & Design', 'fa-palette', 'Branding & Design'],
  ['video-marketing', 'Video Marketing', 'fa-video', 'Video Marketing'],
  ['email-marketing', 'Email Marketing', 'fa-envelope-open-text', 'Email Marketing'],
];

const INDUSTRIES = [
  ['healthcare', 'Healthcare', 'fa-heart-pulse', 'patient acquisition'],
  ['law-firms', 'Law Firms', 'fa-scale-balanced', 'case lead generation'],
  ['real-estate', 'Real Estate', 'fa-house', 'buyer & seller leads'],
  ['ecommerce', 'eCommerce', 'fa-cart-shopping', 'profitable online sales'],
  ['saas-technology', 'SaaS & Technology', 'fa-cloud', 'demand generation'],
  ['finance-insurance', 'Finance & Insurance', 'fa-coins', 'compliant lead growth'],
  ['manufacturers-oem', 'Manufacturers & OEM', 'fa-industry', 'B2B pipeline'],
  ['small-business', 'Small Business', 'fa-store', 'local growth'],
  ['fitness-wellness', 'Fitness & Wellness', 'fa-dumbbell', 'member acquisition'],
  ['dental-clinics', 'Dental Clinics', 'fa-tooth', 'new patient bookings'],
  ['restaurants-hospitality', 'Restaurants & Hospitality', 'fa-utensils', 'reservations & footfall'],
];

/* ---------- Service descriptions ---------- */
const SERVICE_COPY = {
  'seo-services': {
    desc: 'Rank higher, capture intent-driven traffic, and own your category on Google with technical, on-page, and authority-building SEO.',
    whatis: 'SEO (Search Engine Optimization) is the discipline of improving your website so it earns higher, more consistent rankings in organic search results. At PerfOptim, SEO is not about chasing algorithms — it is about aligning your site with genuine buyer intent. We combine deep technical audits, content strategy, on-page optimization, and authoritative link acquisition into a single revenue-focused program. Every recommendation is tied to keywords your ideal customers actually search, and every win is measured against pipeline and revenue, not vanity rankings. Whether you are a multi-location healthcare group, a law firm competing in a saturated metro, or a D2C brand fighting for category share, our SEO process is engineered to compound month after month — building a durable organic moat that lowers your blended customer acquisition cost over time.',
    features: [['fa-gauge-high','Technical SEO','Crawlability, site speed, Core Web Vitals & schema.'],['fa-file-lines','On-Page SEO','Optimized titles, content, and internal linking.'],['fa-link','Link Building','High-authority, relevant backlink acquisition.'],['fa-location-dot','Local SEO','Google Business Profile & local pack dominance.']],
  },
  'ppc-advertising': {
    desc: 'Profitable Google & Meta ad campaigns engineered for low CPA and high ROAS, managed by certified specialists.',
    whatis: 'PPC (Pay-Per-Click) advertising lets you buy your way to the top of search and social feeds — but only profitably if the account is engineered correctly. PerfOptim builds and manages paid media programs across Google Search, Performance Max, Meta, Microsoft Ads, and more. We start by mapping your true unit economics, then structure campaigns around high-intent keywords and tightly-defined audiences. Continuous bid management, negative keyword sculpting, ad copy testing, and landing page alignment keep your cost per acquisition falling while volume scales. You get full transparency into every dollar spent and every conversion earned — no black boxes, no inflated agency markups.',
    features: [['fa-magnifying-glass','Google Search Ads','Capture high-intent buyers actively searching.'],['fa-rectangle-ad','Meta & Social Ads','Targeted prospecting and retargeting at scale.'],['fa-money-bill-trend-up','Bid Management','Automated, ROI-driven bidding strategies.'],['fa-flask','A/B Testing','Continuous creative and landing page testing.']],
  },
  'performance-marketing': {
    desc: 'Full-funnel growth tied directly to revenue, not vanity metrics — every channel held accountable to ROI.',
    whatis: 'Performance marketing is a results-first approach where every channel, campaign, and creative is measured against a clear business outcome — leads, sales, or revenue. PerfOptim acts as your fractional growth team, orchestrating SEO, paid media, email, and CRO into one accountable system. We instrument your funnel with clean tracking and attribution, identify your highest-leverage growth levers, and then relentlessly optimize toward your target CAC and LTV. This integrated approach removes the silos that waste budget when channels work in isolation. The result is predictable, scalable growth where you always know exactly what you are paying to acquire a customer — and exactly how to grow without breaking your margins.',
    features: [['fa-chart-line','Full-Funnel Strategy','Awareness to retention, mapped to revenue.'],['fa-bullseye','Attribution','Clean tracking across every touchpoint.'],['fa-arrows-rotate','Continuous Optimization','Weekly experiments to lower CAC.'],['fa-coins','Revenue Focus','Held accountable to ROI, not impressions.']],
  },
  'content-marketing': {
    desc: 'Authority-building content that ranks, educates, and converts visitors into qualified, sales-ready leads.',
    whatis: 'Content marketing turns your expertise into an always-on growth engine. PerfOptim builds content programs that do double duty: ranking for the keywords your buyers search while genuinely educating them toward a purchase decision. We start with a data-backed content strategy mapped to your funnel — top-of-funnel guides that capture demand, middle-of-funnel comparisons that build trust, and bottom-of-funnel pages that convert. Every piece is written by specialists who understand your industry, optimized for search, and distributed across the channels your audience actually uses. Over time, this compounding library of assets lowers your reliance on paid media and positions your brand as the obvious authority in your category.',
    features: [['fa-pen','Content Strategy','Funnel-mapped editorial roadmaps.'],['fa-blog','Blog & Articles','SEO-driven, expert-written long-form content.'],['fa-book-open','Lead Magnets','Guides, ebooks, and tools that capture leads.'],['fa-share-nodes','Distribution','Multi-channel amplification for reach.']],
  },
  'web-design-development': {
    desc: 'Fast, conversion-focused websites built to perform on every device and convert your hard-won traffic.',
    whatis: 'Your website is the hub every marketing dollar flows through — if it loads slowly or confuses visitors, every channel underperforms. PerfOptim designs and builds conversion-focused websites that are fast, accessible, and engineered to turn traffic into action. We blend brand-aligned design with rigorous UX research, technical performance, and SEO best practices baked in from day one. From responsive layouts that work flawlessly on a 320px phone to a 4K monitor, to Core Web Vitals tuning and clean, semantic code, every decision is made to maximize both search visibility and conversion rate. The outcome is a site that does not just look great — it actively grows your business.',
    features: [['fa-mobile-screen','Responsive Design','Flawless on every screen from mobile to desktop.'],['fa-bolt','Performance','Sub-second loads and Core Web Vitals tuned.'],['fa-universal-access','Accessibility','WCAG-aware, inclusive experiences.'],['fa-screwdriver-wrench','SEO-Ready Build','Semantic, crawlable, schema-rich code.']],
  },
  'cro-services': {
    desc: 'Turn more of your existing traffic into leads and sales with rigorous, data-driven conversion testing.',
    whatis: 'CRO (Conversion Rate Optimization) is the fastest way to grow revenue without spending more on traffic. PerfOptim runs structured experimentation programs that systematically lift the percentage of visitors who become leads and customers. We combine quantitative analytics, heatmaps, session recordings, and user research to uncover exactly where and why visitors drop off. From there, we prioritize high-impact hypotheses and run statistically valid A/B tests on your pages, forms, and funnels. Even a modest conversion lift compounds dramatically across your entire traffic volume — meaning lower CAC, higher ROAS, and more revenue from the visitors you already have. CRO is the highest-leverage investment most businesses overlook.',
    features: [['fa-magnifying-glass-chart','Funnel Analysis','Pinpoint exactly where visitors drop off.'],['fa-flask-vial','A/B Testing','Statistically valid experiments that win.'],['fa-fire','Heatmaps','See how users really interact with pages.'],['fa-wand-magic-sparkles','Landing Pages','High-converting pages built to test.']],
  },
  'orm-services': {
    desc: 'Protect and elevate your brand reputation across reviews, search results, and social channels.',
    whatis: 'Online Reputation Management (ORM) ensures that what people find when they search your brand reflects the truth of the value you deliver. PerfOptim helps you generate a steady stream of authentic positive reviews, respond professionally to feedback, and suppress or outrank misleading content. We monitor brand mentions across review platforms, social media, and search, and build proactive strategies that strengthen trust at the exact moment a prospect is deciding whether to buy. For regulated industries like healthcare, legal, and finance, a strong reputation is often the single biggest factor in conversion. Our ORM programs turn your reputation into a measurable competitive advantage.',
    features: [['fa-star','Review Generation','Systematic acquisition of authentic reviews.'],['fa-bell','Brand Monitoring','Real-time alerts across the web.'],['fa-comments','Response Management','Professional, on-brand review responses.'],['fa-ranking-star','Search Suppression','Outrank negative or misleading content.']],
  },
  'social-media-marketing': {
    desc: 'Build engaged communities and pipeline across LinkedIn, Meta, Instagram, and TikTok.',
    whatis: 'Social media marketing builds the brand affinity and top-of-funnel demand that makes every other channel cheaper and more effective. PerfOptim manages organic and paid social programs that grow engaged audiences and drive real business results — not just likes. We develop platform-native content strategies for LinkedIn, Meta, Instagram, TikTok, and beyond, then execute with consistent, on-brand creative and community management. Paired with paid amplification and precise audience targeting, your social presence becomes a reliable engine for awareness, engagement, and lead flow. We measure what matters: reach among your ideal customers, engagement quality, and the pipeline your social efforts ultimately influence.',
    features: [['fa-calendar-days','Content Calendars','Consistent, platform-native publishing.'],['fa-bullhorn','Paid Social','Targeted amplification and retargeting.'],['fa-users','Community Mgmt','Engagement that builds brand loyalty.'],['fa-chart-simple','Social Analytics','Insights tied to pipeline impact.']],
  },
  'lead-generation': {
    desc: 'Predictable, qualified lead flow engineered for your sales team — across search, social, and outbound.',
    whatis: 'Lead generation is about building a predictable, qualified pipeline your sales team can actually close. PerfOptim engineers multi-channel lead engines that combine high-intent search, paid social, conversion-optimized landing pages, and lead nurturing automation. We focus relentlessly on lead quality, not just volume — qualifying and scoring leads so your team spends time on the prospects most likely to convert. With clean tracking and CRM integration, you gain full visibility into cost per lead, cost per qualified lead, and cost per closed deal. Whether you need to fill a B2B sales pipeline or drive consumer inquiries, our programs deliver consistent, measurable lead flow that scales with your goals.',
    features: [['fa-filter','Multi-Channel Funnels','Search, social, and outbound combined.'],['fa-clipboard-check','Lead Qualification','Scoring that prioritizes sales-ready leads.'],['fa-robot','Automation','Nurture sequences that warm leads.'],['fa-diagram-project','CRM Integration','Seamless handoff to your sales team.']],
  },
  'branding-design': {
    desc: 'Distinct brand identities that earn trust and stand out in a crowded, competitive market.',
    whatis: 'Branding is what makes you the memorable, trusted choice in a sea of competitors. PerfOptim builds distinctive brand identities — from positioning and messaging to logo systems, color, typography, and design language — that resonate with your ideal customers and command premium trust. A strong brand lowers acquisition costs, improves conversion rates, and creates the consistency that makes all your marketing more effective. We ground every creative decision in strategy: who you serve, what you stand for, and why customers should choose you. The result is a cohesive visual and verbal identity that travels seamlessly across your website, ads, social, and sales materials.',
    features: [['fa-lightbulb','Brand Strategy','Positioning, messaging, and voice.'],['fa-pen-ruler','Identity Design','Logos, color systems, and typography.'],['fa-swatchbook','Brand Guidelines','Consistent application everywhere.'],['fa-images','Marketing Collateral','On-brand assets across channels.']],
  },
  'video-marketing': {
    desc: 'Scroll-stopping video that drives awareness, engagement, and conversions across every platform.',
    whatis: 'Video is the highest-engagement format across every major platform — and the most under-utilized by most businesses. PerfOptim produces and distributes video content engineered to stop the scroll and move viewers to action. From short-form social clips and explainer videos to testimonials, product demos, and YouTube SEO, we craft video strategies mapped to each stage of your funnel. We handle concept, scripting, production, editing, and platform-specific optimization, then distribute across the channels where your audience spends time. Combined with paid amplification and clear calls to action, video becomes a powerful driver of awareness, trust, and measurable conversions.',
    features: [['fa-film','Short-Form Video','Scroll-stopping clips for social.'],['fa-clapperboard','Explainers & Demos','Clarify your offer and build trust.'],['fa-circle-play','YouTube SEO','Rank and grow on the world\'s #2 search engine.'],['fa-comment-dots','Testimonials','Social proof that converts prospects.']],
  },
  'email-marketing': {
    desc: 'Lifecycle and automation flows that maximize customer lifetime value and re-engage your audience.',
    whatis: 'Email marketing remains the highest-ROI channel in digital — when it is done with strategy rather than spray-and-pray blasts. PerfOptim designs lifecycle email and automation programs that nurture leads, convert prospects, and maximize the lifetime value of every customer. We build segmented flows — welcome series, abandoned cart, post-purchase, win-back, and more — that deliver the right message at the right moment. Combined with thoughtful list growth, deliverability management, and continuous testing of subject lines and creative, your email program becomes a dependable, high-margin revenue channel. Every send is measured against revenue, so you always know what your list is truly worth.',
    features: [['fa-envelope','Automation Flows','Welcome, cart, win-back & more.'],['fa-layer-group','Segmentation','Right message to the right segment.'],['fa-inbox','Deliverability','Land in the inbox, not spam.'],['fa-vial','Testing','Subject line and creative optimization.']],
  },
};

const INDUSTRY_COPY = {
  'healthcare': { pains:[['fa-user-doctor','Patients can\'t find you','Without local SEO, nearby patients book with competitors who rank higher.'],['fa-file-shield','Compliance complexity','HIPAA-aware marketing requires specialist care most agencies lack.'],['fa-calendar-xmark','Empty appointment slots','Generic ads waste budget and fail to fill your schedule.']], results:[['340%','more patient inquiries'],['62%','lower cost per booking'],['4.8x','return on ad spend']] },
  'law-firms': { pains:[['fa-gavel','Brutal competition','Legal keywords are among the most expensive and competitive online.'],['fa-dollar-sign','High cost per lead','Without optimization, a single case lead can cost hundreds.'],['fa-user-slash','Unqualified inquiries','Generic campaigns flood you with non-viable cases.']], results:[['423%','more qualified case leads'],['77%','reduction in cost per lead'],['5.1x','return on ad spend']] },
  'real-estate': { pains:[['fa-house-circle-xmark','Thin listing pipeline','Inconsistent lead flow makes growth unpredictable.'],['fa-people-arrows','Buyer & seller mismatch','Untargeted ads attract the wrong audience.'],['fa-clock','Slow follow-up','Leads go cold without automated nurturing.']], results:[['40+','qualified buyer leads/month'],['58%','lower cost per lead'],['3.9x','return on ad spend']] },
  'ecommerce': { pains:[['fa-cart-arrow-down','Cart abandonment','High traffic but low conversion drains your margins.'],['fa-chart-pie','Unprofitable ad spend','Scaling ads without CRO destroys ROAS.'],['fa-box-open','Weak retention','One-time buyers never return without lifecycle marketing.']], results:[['5.2x','return on ad spend'],['46%','higher conversion rate'],['2.3x','customer lifetime value']] },
  'saas-technology': { pains:[['fa-coins','Rising CAC','Acquisition costs climb as channels saturate.'],['fa-users-slash','Low trial-to-paid','Traffic converts to trials but not revenue.'],['fa-magnifying-glass','Long sales cycles','Without nurturing, qualified leads stall and churn.']], results:[['38%','lower customer acquisition cost'],['2.7x','more product-qualified leads'],['31%','higher trial-to-paid rate']] },
  'finance-insurance': { pains:[['fa-scale-unbalanced','Strict compliance','Regulated messaging limits most ad strategies.'],['fa-shield-virus','Trust barriers','Prospects hesitate without strong reputation signals.'],['fa-hand-holding-dollar','Expensive keywords','Finance terms are among the priciest in PPC.']], results:[['290%','more qualified inquiries'],['51%','lower cost per lead'],['4.2x','return on ad spend']] },
  'manufacturers-oem': { pains:[['fa-diagram-project','Complex buying cycles','Long, multi-stakeholder B2B sales need nurturing.'],['fa-globe','Niche audiences','Reaching engineers and procurement is hard.'],['fa-handshake-slash','Weak digital presence','Outdated sites lose deals to modern competitors.']], results:[['215%','more B2B inquiries'],['44%','lower cost per qualified lead'],['3.6x','pipeline growth']] },
  'small-business': { pains:[['fa-wallet','Tight budgets','Every marketing dollar must work harder.'],['fa-store-slash','Low local visibility','Competitors dominate the local map pack.'],['fa-hourglass-half','No time for marketing','Owners are too busy to run campaigns.']], results:[['280%','more local leads'],['49%','lower cost per lead'],['4.1x','return on ad spend']] },
  'fitness-wellness': { pains:[['fa-person-running','Seasonal swings','Membership demand spikes and crashes.'],['fa-door-closed','High churn','Members leave without engagement campaigns.'],['fa-bullhorn','Cluttered market','Standing out among studios and apps is hard.']], results:[['320%','more membership sign-ups'],['43%','lower cost per acquisition'],['2.5x','member retention lift']] },
  'dental-clinics': { pains:[['fa-tooth','Empty chairs','Open appointment slots mean lost revenue.'],['fa-map-location-dot','Local competition','Nearby clinics outrank you on Google.'],['fa-comment-medical','Low reviews','Weak reputation deters new patients.']], results:[['360%','more new patient bookings'],['55%','lower cost per patient'],['4.6x','return on ad spend']] },
  'restaurants-hospitality': { pains:[['fa-utensils','Inconsistent footfall','Slow nights hurt margins.'],['fa-star-half-stroke','Review pressure','A few bad reviews can sink bookings.'],['fa-mobile','Discovery gap','Diners can\'t find you on search and maps.']], results:[['250%','more online reservations'],['47%','lower cost per cover'],['3.4x','repeat visit rate']] },
};

/* ---------- Shared HTML builders ---------- */
function navHtml(prefix) {
  const svc = SERVICES.map(([slug,name,icon]) => `            <a href="${prefix}services/${slug}.html"><i class="fas ${icon}"></i> ${name}</a>`).join('\n');
  const ind = INDUSTRIES.map(([slug,name,icon]) => `            <a href="${prefix}industries/${slug}.html"><i class="fas ${icon}"></i> ${name}</a>`).join('\n');
  return `  <header class="site-nav nav-solid" id="siteNav">
    <nav class="nav-inner" aria-label="Primary">
      <a href="${prefix}index.html" class="nav-logo"><i class="fas fa-bolt"></i> PerfOptim</a>
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
      <ul class="nav-menu">
        <li class="nav-item has-children">
          <a href="${prefix}services/index.html" class="nav-link has-dropdown">Services <i class="fas fa-chevron-down"></i></a>
          <div class="dropdown mega">
${svc}
          </div>
        </li>
        <li class="nav-item has-children">
          <a href="${prefix}industries/index.html" class="nav-link has-dropdown">Industries <i class="fas fa-chevron-down"></i></a>
          <div class="dropdown">
${ind}
          </div>
        </li>
        <li class="nav-item has-children">
          <a href="#" class="nav-link has-dropdown">Locations <i class="fas fa-chevron-down"></i></a>
          <div class="dropdown">
            <a href="${prefix}index.html"><i class="fas fa-flag-usa"></i> United States</a>
            <a href="${prefix}in/index.html"><i class="fas fa-globe"></i> India</a>
            <a href="#"><i class="fas fa-maple-leaf"></i> Canada</a>
            <a href="#"><i class="fas fa-globe"></i> Gulf</a>
          </div>
        </li>
        <li class="nav-item"><a href="${prefix}blog/index.html" class="nav-link">Blog</a></li>
        <li class="nav-item"><a href="${prefix}about.html" class="nav-link">About</a></li>
        <li class="nav-item"><a href="${prefix}contact.html" class="nav-link nav-cta">Contact</a></li>
      </ul>
    </nav>
  </header>`;
}

function footerHtml(prefix) {
  const svc = SERVICES.map(([slug,name]) => `            <li><a href="${prefix}services/${slug}.html">${name}</a></li>`).join('\n');
  const ind = INDUSTRIES.map(([slug,name]) => `            <li><a href="${prefix}industries/${slug}.html">${name}</a></li>`).join('\n');
  return `  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="footer-logo"><i class="fas fa-bolt"></i> PerfOptim</div>
          <p class="footer-tagline">Performance. Optimized. Data-driven digital marketing that turns clicks into customers.</p>
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
${svc}
          </ul>
        </div>
        <div class="footer-col">
          <h4>Industries</h4>
          <ul>
${ind}
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="${prefix}about.html">About</a></li>
            <li><a href="${prefix}blog/index.html">Blog</a></li>
            <li><a href="${prefix}contact.html">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms</a></li>
          </ul>
          <h4 style="margin-top:24px">Newsletter</h4>
          <form class="newsletter-form">
            <input type="email" placeholder="Your email" aria-label="Email" required>
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div class="footer-geo">Serving USA | India | Canada | Gulf</div>
      <div class="footer-bottom">
        <span>&copy; 2026 PerfOptim. All rights reserved.</span>
        <span>Crafted for Performance</span>
        <span><a href="#">Privacy</a> &nbsp;·&nbsp; <a href="#">Terms</a></span>
      </div>
    </div>
  </footer>`;
}

function scriptsHtml(prefix) {
  return `  <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" defer></script>
  <script src="${prefix}js/main.js" defer></script>
  <script src="${prefix}js/counter.js" defer></script>
  <script src="${prefix}js/form.js" defer></script>`;
}

function headCommon(prefix) {
  return `  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">`;
}

function assets(prefix) {
  return `  <link rel="icon" type="image/svg+xml" href="${prefix}assets/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
  <link rel="stylesheet" href="${prefix}css/style.css">
  <link rel="stylesheet" href="${prefix}css/components.css">
  <link rel="stylesheet" href="${prefix}css/responsive.css">`;
}

/* Lead form block (reused on service/industry/home-ish pages) */
function leadForm() {
  const svcOpts = SERVICES.map(([,name]) => `                  <option>${name}</option>`).join('\n');
  const indOpts = INDUSTRIES.map(([,name]) => `                  <option>${name}</option>`).join('\n');
  return `    <section class="section lead-section" id="lead-form">
      <div class="container">
        <div class="section-head" data-aos="fade-up">
          <h2 style="color:#fff">Get Your Free Digital Marketing Audit</h2>
          <p style="color:rgba(255,255,255,.8)">No commitment. 100% free. Delivered in 48 hours.</p>
        </div>
        <div class="lead-card" data-aos="fade-up">
          <form data-validate>
            <div class="form-grid">
              <div class="form-field"><label>Name</label><input type="text" name="name" placeholder="Jane Smith" required><span class="error-msg">Please enter your name.</span></div>
              <div class="form-field"><label>Business Email</label><input type="email" name="email" placeholder="jane@company.com" required><span class="error-msg">Enter a valid email.</span></div>
              <div class="form-field"><label>Phone</label><input type="tel" name="phone" placeholder="(555) 123-4567" required><span class="error-msg">Enter a valid phone number.</span></div>
              <div class="form-field"><label>Website URL</label><input type="url" name="website" placeholder="https://yourcompany.com" required><span class="error-msg">Enter a valid URL.</span></div>
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

function breadcrumb(prefix, trail) {
  const items = trail.map((t, i) => {
    if (i === trail.length - 1) return `        <li aria-current="page">${t.label}</li>`;
    return `        <li><a href="${prefix}${t.href}">${t.label}</a></li>`;
  }).join('\n');
  const listItems = trail.map((t, i) => `      {"@type":"ListItem","position":${i+1},"name":"${t.label}"${t.href!==undefined && i<trail.length-1 ? `,"item":"https://perfoptim.com/${t.href}"` : ''}}`).join(',\n');
  return { html: `  <nav class="breadcrumb" aria-label="Breadcrumb">
    <div class="container">
      <ol>
${items}
      </ol>
    </div>
  </nav>`, schema: `  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
${listItems}
  ]}
  </script>` };
}

const US_LOCATIONS = ['New York','California','Texas','Florida','Illinois','Georgia','Arizona','Washington','Colorado','Pennsylvania'];

module.exports = {
  ROOT, SERVICES, INDUSTRIES, SERVICE_COPY, INDUSTRY_COPY, US_LOCATIONS,
  navHtml, footerHtml, scriptsHtml, headCommon, assets, leadForm, breadcrumb,
};
