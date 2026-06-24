/* build/build-bareilly.js
 * Hand-written, long-form (1,200+ word) Bareilly pages.
 * Run after generate-india.js. These pages are intentionally NOT generated
 * by the pSEO generator (they are excluded via MANUAL_PAGES).
 */
const fs = require('fs');
const path = require('path');
const H = require('../templates/india/_inHelpers.js');

const ROOT = path.join(__dirname, '..');

function page({ rel, lang = 'en-IN', title, desc, canonical, breadcrumbTrail, schemaExtra = '', heroSpan, h1, hindiSub = '', body, faqs = [], waText, cta }) {
  const depth = rel.replace(/\/$/, '').split('/').length - 1; // depth below /in/ (rel starts with "in/")
  const belowIn = rel.replace(/^in\//, '').replace(/\/$/, '').split('/').length; // segments below /in/
  const inPrefix = '../'.repeat(belowIn);
  const rootPrefix = '../'.repeat(belowIn + 1);
  const bc = H.breadcrumb(inPrefix, breadcrumbTrail);

  const faqHtml = faqs.map((f, i) => `          <details class="faq-item"${i === 0 ? ' open' : ''}><summary>${H.esc(f.q)}</summary><div class="faq-answer"><p>${f.a}</p></div></details>`).join('\n');
  const faqSchema = faqs.length ? `  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${faqs.map(f => `{"@type":"Question","name":"${H.esc(f.q)}","acceptedAnswer":{"@type":"Answer","text":"${H.esc(f.a.replace(/<[^>]+>/g, ''))}"}}`).join(',')}]}
  </script>` : '';

  const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
${H.head(rootPrefix, { title, desc, canonical, keywords: 'Bareilly digital marketing, SEO Bareilly, marketing agency Bareilly, Civil Lines, Rohilkhand' })}
${schemaExtra}
${bc.schema}
${faqSchema}
</head>
<body>
${H.nav(rootPrefix, inPrefix)}
${bc.html}
  <main>
    <section class="hero hero-inner" style="padding:80px 0 56px;background:linear-gradient(135deg,#0D0D1A,#1a1a3e);color:#fff">
      <div class="container" style="max-width:900px;text-align:center" data-aos="fade-up">
        <span style="display:inline-block;background:rgba(108,99,255,.25);padding:6px 16px;border-radius:99px;font-size:.85rem;font-weight:600;margin-bottom:18px">${heroSpan}</span>
        <h1 style="font-size:2.5rem;line-height:1.2">${h1}</h1>
        ${hindiSub ? `<p class="hindi-sub">${hindiSub}</p>` : ''}
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:28px">
          <a href="${H.waLink(waText)}" target="_blank" rel="noopener" class="btn-whatsapp btn-lg"><i class="fab fa-whatsapp"></i> Chat on WhatsApp</a>
          <a href="${rootPrefix}contact.html" class="btn btn-primary btn-lg">Get Free Audit <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
    </section>

    <section class="section" style="padding:56px 0">
      <div class="container blog-body" style="max-width:780px;font-size:1.08rem;line-height:1.85;color:#333">
${body}
      </div>
    </section>

    ${faqs.length ? `<section class="section in-faq" style="padding:56px 0;background:#faf9ff">
      <div class="container" style="max-width:820px">
        <div class="section-head" data-aos="fade-up"><h2>Frequently Asked Questions — Bareilly</h2></div>
        <div class="faq-list" data-aos="fade-up">
${faqHtml}
        </div>
      </div>
    </section>` : ''}

    <section class="section lead-section" style="padding:64px 0;background:linear-gradient(135deg,#6C63FF,#FF6584)">
      <div class="container" style="max-width:680px;text-align:center" data-aos="fade-up">
        <h2 style="color:#fff">${cta.heading}</h2>
        <p style="color:rgba(255,255,255,.9);margin:10px 0 24px">${cta.sub}</p>
        <a href="${H.waLink(waText)}" target="_blank" rel="noopener" class="btn-whatsapp btn-lg"><i class="fab fa-whatsapp"></i> Chat on WhatsApp</a>
      </div>
    </section>
  </main>
${H.footer(rootPrefix, inPrefix)}
${H.whatsappFloat(waText)}
${H.scripts(rootPrefix)}
</body>
</html>`;

  const dir = path.join(ROOT, rel);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`  ✓ ${rel}  (~${words} words body)`);
}

const localBiz = (name, region) => `  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"LocalBusiness","name":"${name}","url":"https://perfoptim.com/in/uttar-pradesh/bareilly/","priceRange":"₹₹","telephone":"+91-98765-43210","address":{"@type":"PostalAddress","streetAddress":"Civil Lines","addressLocality":"Bareilly","addressRegion":"Uttar Pradesh","postalCode":"243001","addressCountry":"IN"},"areaServed":{"@type":"City","name":"Bareilly"},"availableLanguage":["English","Hindi"],"serviceArea":{"@type":"Country","name":"India"}}
  </script>`;

console.log('Building hand-written Bareilly pages…');

/* ============ PAGE 1: SEO Services in Bareilly ============ */
page({
  rel: 'in/uttar-pradesh/bareilly/seo-services/',
  title: 'SEO Services in Bareilly | #1 SEO Company | PerfOptim',
  desc: 'Top-rated SEO services in Bareilly, UP. Rank #1 on Google for your business across Civil Lines, Subhash Nagar & Rohilkhand. Free SEO audit. From ₹8,000/month.',
  canonical: 'https://perfoptim.com/in/uttar-pradesh/bareilly/seo-services/',
  breadcrumbTrail: [{ label: 'Uttar Pradesh', href: 'uttar-pradesh/seo-services/' }, { label: 'Bareilly', href: 'uttar-pradesh/bareilly/seo-services/' }, { label: 'SEO Services', href: null }],
  schemaExtra: localBiz('PerfOptim SEO Services Bareilly'),
  heroSpan: '<i class="fas fa-magnifying-glass-chart"></i> SEO Services · Bareilly, UP',
  h1: 'SEO Services in Bareilly That Put Your Business on Page 1',
  hindiSub: 'बरेली में नंबर 1 SEO कंपनी — अपने बिज़नेस को Google पर टॉप पर लाएं',
  waText: 'Hi, I need SEO services for my business in Bareilly',
  cta: { heading: 'Ready to Rank #1 in Bareilly?', sub: "Get a free SEO audit of your website and see exactly how we'll get you to Page 1 of Google." },
  faqs: [
    { q: 'How much do SEO services cost in Bareilly?', a: 'Our SEO packages for Bareilly businesses start from <strong>₹8,000/month</strong> for local SEO and scale to ₹35,000+/month for competitive verticals. Every engagement begins with a free audit so pricing reflects real opportunity.' },
    { q: 'How long does SEO take to show results in Bareilly?', a: 'For most Bareilly businesses, local map-pack rankings improve within 30–60 days. Organic rankings for competitive keywords like "furniture shop in Bareilly" or "coaching in Bareilly" typically compound over 3–6 months.' },
    { q: 'Do you serve all areas of Bareilly?', a: 'Yes — we work with businesses across Civil Lines, Subhash Nagar, Rajendra Nagar, the CBD market, Cantonment, and the wider Rohilkhand region.' },
    { q: 'Do you provide SEO support in Hindi?', a: 'हाँ, बिल्कुल। We provide complete SEO consultation and reporting in Hindi as well as English. You can reach our Bareilly team directly on WhatsApp.' },
    { q: 'Will SEO work for my small Bareilly shop?', a: 'Absolutely. Local SEO and Google My Business optimisation are the highest-ROI channels for local Bareilly shops, clinics, coaching institutes and showrooms.' },
  ],
  body: `<p>Bareilly is one of Western Uttar Pradesh's most important commercial hubs — a city of over 1.1 million people known for its thriving furniture industry, steel trade, sprawling educational institutions, and the historic Rohilkhand market that draws buyers from across the region. Yet most Bareilly businesses are still invisible on Google. When a customer in Civil Lines searches for "best furniture shop near me" or a parent in Subhash Nagar looks up "top coaching institute in Bareilly", the businesses that appear on Page 1 win the customer — and everyone else loses out. <strong>PerfOptim's SEO services in Bareilly</strong> are built to put your business exactly where your customers are looking.</p>

<h2>Why Bareilly Businesses Need SEO Now</h2>
<p>The digital shift in tier-2 cities like Bareilly has been dramatic. Smartphone penetration across Rohilkhand is now near-universal, and over 80% of local buying decisions begin with a Google search or a look at Google Maps. Whether you run a showroom on Pilibhit Bypass Road, a clinic near the District Hospital, a coaching centre in Rajendra Nagar, or a wholesale operation in the CBD market, your future customers are searching online right now. If your competitors rank above you, they are quietly capturing the customers that should have been yours.</p>
<p>This is the gap PerfOptim closes. We are a performance-driven SEO company that treats rankings not as a vanity metric, but as a direct line to revenue. Every keyword we target is one your real customers in Bareilly actually type — and every result we deliver is measured against calls, walk-ins, and enquiries, not just position numbers on a report.</p>

<h2>Our Bareilly SEO Process</h2>
<p>We follow a disciplined, transparent five-stage process honed across hundreds of Indian businesses:</p>
<ol>
<li><strong>Local SEO Audit:</strong> We analyse your website, your Google Business Profile, and your top competitors in Bareilly. We identify exactly why you aren't ranking and where the fastest wins are.</li>
<li><strong>Keyword & Locality Research:</strong> We map the searches your customers use — from broad terms like "digital marketing Bareilly" to hyperlocal queries naming Civil Lines, Subhash Nagar, Cantonment, and the Rohilkhand belt.</li>
<li><strong>On-Page & Technical Optimisation:</strong> We fix site speed, mobile usability, schema markup, titles, and content so Google understands and trusts your site.</li>
<li><strong>Local Authority Building:</strong> We build citations across Indian directories (JustDial, Sulekha, IndiaMART), earn local backlinks, and optimise your Google My Business profile for the Bareilly map pack.</li>
<li><strong>Reporting & Optimisation:</strong> Every month you receive a clear, jargon-free report — in English or Hindi — showing rankings, traffic, and enquiries.</li>
</ol>

<h2>Hyperlocal SEO Across Bareilly</h2>
<p>Bareilly is not one market — it is many. The premium retail and professional services cluster around Civil Lines behaves very differently from the dense wholesale activity of the CBD market or the residential demand in Subhash Nagar and Rajendra Nagar. Our SEO strategy reflects this. We create locality-aware content and Google Business optimisation so that whether someone searches from the Cantonment area, near Phoenix United Mall, or out on the Pilibhit Bypass, your business shows up as the obvious local choice.</p>

<h2>Industries We Help Rank in Bareilly</h2>
<p>We have deep playbooks for the sectors that drive Bareilly's economy: furniture and home décor showrooms, coaching institutes and schools (Bareilly is a major education hub), healthcare clinics and diagnostic centres, real estate builders and property agents, manufacturers and traders, and the city's growing roster of restaurants and retail outlets. Each of these verticals needs a different keyword strategy — and we bring the specific experience to execute it.</p>

<h2>Transparent, Affordable Pricing for Bareilly</h2>
<p>We believe great SEO should be accessible to ambitious tier-2 businesses, not just big-city corporations. Our packages start at just <strong>₹8,000/month</strong> for local SEO, ₹18,000/month for our most popular growth plan, and scale from ₹35,000/month for businesses competing in highly contested categories. There are no hidden charges, no long lock-in contracts, and you can pay conveniently via UPI or bank transfer.</p>

<h2>Why Choose PerfOptim in Bareilly</h2>
<p>We combine the analytical rigour of a metro performance-marketing agency with genuine, on-the-ground understanding of the Bareilly and Rohilkhand market. We speak your language — literally — offering full Hindi support. We are GST-registered, ISO 9001 certified, and trusted by 300+ Indian businesses. Most importantly, we hold ourselves accountable to the only metric that matters: the growth of your business. Chat with us on WhatsApp today for a free, no-obligation SEO audit and discover exactly how to dominate Google in Bareilly.</p>`,
});

/* ============ PAGE 2: Digital Marketing Agency in Bareilly ============ */
page({
  rel: 'in/uttar-pradesh/bareilly/digital-marketing-agency/',
  title: 'Digital Marketing Agency in Bareilly | PerfOptim',
  desc: "Bareilly's leading digital marketing agency. SEO, Google Ads, social media, WhatsApp marketing & lead generation for Rohilkhand businesses. Free strategy call.",
  canonical: 'https://perfoptim.com/in/uttar-pradesh/bareilly/digital-marketing-agency/',
  breadcrumbTrail: [{ label: 'Uttar Pradesh', href: 'uttar-pradesh/seo-services/' }, { label: 'Bareilly', href: 'uttar-pradesh/bareilly/seo-services/' }, { label: 'Digital Marketing Agency', href: null }],
  schemaExtra: localBiz('PerfOptim Digital Marketing Agency Bareilly'),
  heroSpan: '<i class="fas fa-rocket"></i> Digital Marketing Agency · Bareilly',
  h1: "Bareilly's Performance-Driven Digital Marketing Agency",
  hindiSub: 'बरेली की सबसे भरोसेमंद डिजिटल मार्केटिंग एजेंसी',
  waText: 'Hi, I want to grow my Bareilly business with digital marketing',
  cta: { heading: 'Grow Your Bareilly Business Online', sub: 'Book a free 30-minute strategy call. We\'ll map out exactly how to get you more customers from Google, social media and WhatsApp.' },
  faqs: [
    { q: 'What services does your Bareilly digital marketing agency offer?', a: 'We offer the full stack: SEO, Google Ads (PPC), social media marketing, WhatsApp marketing, Google My Business SEO, lead generation, web design, and content marketing — all tailored for Bareilly and Rohilkhand businesses.' },
    { q: 'How much does digital marketing cost in Bareilly?', a: 'Our retainers start from <strong>₹8,000/month</strong>. The right budget depends on your goals; we recommend a plan after a free audit so you never overpay for services you don\'t need.' },
    { q: 'Do you work with small businesses in Bareilly?', a: 'Yes — small shops, clinics, coaching centres and local service businesses are the core of our Bareilly client base. Local marketing delivers exceptional ROI for them.' },
    { q: 'Where is your office located?', a: 'PerfOptim is headquartered in Bareilly (Civil Lines area) and serves clients across India both on-site and remotely.' },
    { q: 'Can you communicate in Hindi?', a: 'हाँ — हमारी पूरी टीम हिंदी में बात करती है। All strategy, support and reporting is available in Hindi and English.' },
  ],
  body: `<p>Choosing the right digital marketing agency in Bareilly can be the single most important growth decision a local business makes. The city's economy — anchored by furniture manufacturing, the bustling Rohilkhand trade, a powerhouse education sector, and rapidly expanding healthcare and real estate — is more competitive online than ever. <strong>PerfOptim is the digital marketing agency built for Bareilly's ambitious businesses</strong>, combining metro-grade strategy with deep local knowledge of Civil Lines, Subhash Nagar, the CBD market and the wider Rohilkhand region.</p>

<h2>A Full-Funnel Agency, Not Just an SEO Shop</h2>
<p>Many "agencies" in tier-2 cities do one thing — usually just running a few Facebook ads. PerfOptim is different. We are a true full-funnel performance marketing agency. That means we orchestrate every channel that matters for a Bareilly business into one accountable system: search engine optimisation to capture demand, Google and Meta advertising to accelerate it, WhatsApp marketing to nurture and convert leads, social media to build your brand, and conversion-focused web design to turn visitors into customers. Because these channels work together rather than in silos, your marketing budget works far harder.</p>

<h2>Marketing Channels We Master</h2>
<ul>
<li><strong>SEO & Local SEO:</strong> Rank on Google and dominate the Bareilly map pack for searches that bring walk-ins and calls.</li>
<li><strong>Google Ads (PPC):</strong> Profitable, intent-driven campaigns that put you at the top of search results instantly.</li>
<li><strong>WhatsApp Marketing:</strong> With 98% open rates, WhatsApp is the highest-converting channel in India — we build automated funnels that nurture every lead.</li>
<li><strong>Social Media Marketing:</strong> Build a loyal local following on Instagram, Facebook and YouTube.</li>
<li><strong>Lead Generation:</strong> Predictable, qualified enquiries for coaching institutes, real estate, healthcare and manufacturers.</li>
<li><strong>Web Design & Development:</strong> Fast, mobile-first websites engineered to convert Bareilly traffic into revenue.</li>
</ul>

<h2>Understanding the Bareilly Market</h2>
<p>What sets PerfOptim apart is that we genuinely understand how Bareilly buys. The professional and premium-retail audience around Civil Lines responds to different messaging than the value-driven wholesale buyers of the CBD market. Families in Subhash Nagar and Rajendra Nagar searching for coaching, clinics and home services have distinct needs. The furniture and steel traders who built Bareilly's reputation need B2B lead generation that reaches buyers across the Rohilkhand belt and beyond. We tailor every campaign to these realities — something no out-of-town or template-driven agency can match.</p>

<h2>Results, Reported Transparently</h2>
<p>We are obsessive about accountability. From day one we instrument your campaigns with proper tracking so you always know exactly what you are paying to acquire each customer. Every month you receive a clear report — available in Hindi or English — showing rankings, ad performance, leads generated, and return on investment. No vanity metrics, no black boxes, no jargon. Just honest numbers tied to the growth of your business.</p>

<h2>Why Bareilly Businesses Trust PerfOptim</h2>
<p>We are headquartered right here in Bareilly, GST-registered and ISO 9001 certified, and trusted by more than 300 businesses across India. Our pricing is transparent and tier-2 friendly, starting at just ₹8,000/month with no long-term lock-ins. We offer complete Hindi support and are reachable instantly on WhatsApp. Whether you are a first-generation shop owner in the Rohilkhand market or an established institution looking to scale, we bring the strategy, execution, and honesty to grow your business online.</p>

<h2>From First Click to Loyal Customer</h2>
<p>Acquiring a customer is only half the battle; great agencies help you keep them. PerfOptim builds retention into every Bareilly engagement. Once a lead becomes a customer, we use WhatsApp broadcast campaigns, email nurture sequences, festive and seasonal offers tuned to the Rohilkhand calendar, and Google review requests to turn one-time buyers into repeat customers and vocal advocates. For a furniture showroom near the CBD market or a clinic in Civil Lines, a strong base of returning customers and five-star reviews compounds month after month — lowering your overall cost of acquisition and building a moat competitors cannot easily cross.</p>

<h2>Common Mistakes Bareilly Businesses Make Online</h2>
<p>In our years working with tier-2 businesses, we see the same costly mistakes repeated again and again. Many spend on boosted Facebook posts with no clear goal and no tracking, so they never learn what actually works. Others ignore their Google Business Profile entirely, handing the map pack to competitors. Some build a website but never optimise it for mobile or speed, losing the majority of Bareilly visitors who browse on their phones. And too many stop their campaigns after a month or two, just as results begin to compound. PerfOptim helps you avoid every one of these traps with a disciplined, data-driven approach where every rupee is accounted for and every channel is held to a measurable standard.</p>

<h2>Let's Grow Together</h2>
<p>Your customers are already searching for what you offer — the only question is whether they find you or a competitor. Book a free 30-minute strategy call with PerfOptim today. We'll audit your current presence, identify your biggest opportunities, and give you a clear roadmap to dominate digital marketing in Bareilly. Reach us on WhatsApp to get started in minutes.</p>`,
});

/* ============ PAGE 3: Lead Generation for Education & Coaching in Bareilly ============ */
page({
  rel: 'in/uttar-pradesh/bareilly/lead-generation-for-education-coaching/',
  title: 'Lead Generation for Coaching Institutes in Bareilly | PerfOptim',
  desc: 'Student lead generation for coaching institutes, schools & colleges in Bareilly. Fill every batch with qualified admission enquiries. Free demo. From ₹8,000/month.',
  canonical: 'https://perfoptim.com/in/uttar-pradesh/bareilly/lead-generation-for-education-coaching/',
  breadcrumbTrail: [{ label: 'Uttar Pradesh', href: 'uttar-pradesh/seo-services/' }, { label: 'Bareilly', href: 'uttar-pradesh/bareilly/seo-services/' }, { label: 'Lead Gen for Education & Coaching', href: null }],
  schemaExtra: localBiz('PerfOptim Education Lead Generation Bareilly'),
  heroSpan: '<i class="fas fa-graduation-cap"></i> Education Lead Generation · Bareilly',
  h1: 'Lead Generation for Coaching Institutes & Schools in Bareilly',
  hindiSub: 'बरेली के कोचिंग संस्थानों के लिए स्टूडेंट लीड जनरेशन',
  waText: 'Hi, I run a coaching institute in Bareilly and need student leads',
  cta: { heading: 'Fill Your Next Batch in Bareilly', sub: 'Get a free admissions marketing audit and a clear plan to generate qualified student enquiries every single month.' },
  faqs: [
    { q: 'How do you generate student leads for Bareilly coaching institutes?', a: 'We combine Google Ads targeting searches like "best NEET coaching in Bareilly", Meta lead-form ads aimed at parents and students, local SEO, Google My Business optimisation, and WhatsApp follow-up automation to convert enquiries into admissions.' },
    { q: 'What is the cost per student lead in Bareilly?', a: 'For Bareilly and Rohilkhand institutes, qualified student leads typically range from <strong>₹120–₹250</strong> depending on the course. Competitive exam coaching sits at the higher end; school and tuition leads at the lower end.' },
    { q: 'Do you target both students and parents?', a: 'Yes — we run segmented campaigns. Decision-making for school admissions and many coaching enrolments rests with parents, so we craft separate messaging for each audience.' },
    { q: 'Can you help during admission season specifically?', a: 'Absolutely. We build pre-season sprint campaigns timed to Bareilly\'s admission cycles, scaling budgets when intent peaks and nurturing leads in the off-season.' },
    { q: 'Do you provide WhatsApp follow-up for leads?', a: 'Yes — instant WhatsApp automation is core to our education lead-gen. With 98% open rates, it dramatically improves the percentage of enquiries that convert to admissions.' },
  ],
  body: `<p>Bareilly has earned a reputation as one of Western Uttar Pradesh's most important education hubs. From competitive-exam coaching institutes preparing students for NEET, JEE and government jobs, to CBSE and ICSE schools, degree colleges, and skill-development academies, the city's education sector is vast — and fiercely competitive. Every institute is chasing the same finite pool of students each admission season. The ones that win are not always the ones with the best teaching; they are the ones whose name appears first when a student or parent searches online. <strong>PerfOptim's lead generation for education and coaching in Bareilly</strong> ensures that institute is yours.</p>

<h2>The Admissions Challenge in Bareilly</h2>
<p>Most Bareilly coaching institutes still rely heavily on word-of-mouth, banners, and the occasional newspaper insert. These channels are slow, hard to measure, and impossible to scale. Meanwhile, the modern student journey has moved entirely online. A parent in Subhash Nagar researching "best coaching for class 10 in Bareilly", or a student near Civil Lines comparing NEET institutes, makes their shortlist on Google, YouTube and Instagram long before they ever visit a campus. If your institute isn't visible at that decisive moment, you've already lost the admission.</p>

<h2>How We Fill Your Batches</h2>
<p>PerfOptim builds a predictable, year-round admissions pipeline using a proven multi-channel system designed specifically for the education sector:</p>
<ol>
<li><strong>High-Intent Google Ads:</strong> We capture students at the exact moment they search for courses like yours in Bareilly — "best NEET coaching in Bareilly", "government job coaching near Rajendra Nagar", and dozens of variations.</li>
<li><strong>Meta Lead Campaigns:</strong> Targeted Facebook and Instagram lead-form ads reach students and parents across Bareilly and the Rohilkhand region with compelling offers and instant enquiry capture.</li>
<li><strong>Local SEO & Google My Business:</strong> We optimise your profile so your institute dominates the Bareilly map pack and ranks organically for course keywords — driving free, compounding enquiries.</li>
<li><strong>High-Converting Landing Pages:</strong> Every campaign points to a dedicated landing page built to convert, with prominent enquiry forms and one-tap WhatsApp buttons.</li>
<li><strong>WhatsApp Follow-Up Automation:</strong> The moment a lead comes in, automated WhatsApp sequences engage them instantly — the single biggest lever for turning enquiries into enrolled students.</li>
</ol>

<h2>Built for the Bareilly Education Market</h2>
<p>We understand the rhythms of Bareilly's admission cycles and the specific concerns of local families — fee structures, batch timings, faculty credentials, and results. Our ad copy and creatives speak directly to those concerns in both Hindi and English, the languages your audience actually uses. We also know the geography: campaigns are tuned for the residential demand around Subhash Nagar and Rajendra Nagar, the premium expectations near Civil Lines, and the broader catchment that brings students into Bareilly from across Rohilkhand.</p>

<h2>Measurable Return on Every Rupee</h2>
<p>Education marketing only matters if it produces enrolled, fee-paying students. That's why we track every lead from first click to final admission. You'll see exactly how many enquiries each channel produced, the cost per lead, and ultimately the cost per admission — typically a fraction of what institutes spend on traditional advertising. Most of our coaching clients see a 200–350% increase in qualified admission enquiries within a single season.</p>

<h2>Affordable Plans for Bareilly Institutes</h2>
<p>Our education lead-generation retainers start from just <strong>₹8,000/month</strong>, plus your ad budget — making professional admissions marketing accessible even to small and mid-sized Bareilly institutes. There are no long lock-ins, payment is simple via UPI or bank transfer, and full support is available in Hindi.</p>

<h2>Beyond Leads: Building Your Institute's Brand</h2>
<p>While immediate admission enquiries are the priority, the strongest coaching institutes in Bareilly also invest in long-term brand authority. PerfOptim helps you build that reputation through consistent social media content showcasing your results and toppers, YouTube videos of demo lectures and student testimonials, a steady stream of genuine Google reviews from satisfied parents, and locally optimised content that positions your faculty as the experts in their field. Over time this brand equity reduces your cost per admission dramatically — students begin seeking you out by name, and word-of-mouth referrals multiply because your digital reputation reinforces them. For an education hub as competitive as Bareilly, this combination of performance lead generation and patient brand building is what separates the institutes that merely survive from those that dominate their category year after year.</p>

<h2>Start Filling Seats Today</h2>
<p>The next admission season is closer than you think, and the institutes that prepare their digital pipeline now will capture the lion's share of students. Chat with PerfOptim on WhatsApp for a free admissions marketing audit, and let's build a system that keeps your batches full — season after season — right here in Bareilly.</p>`,
});

/* ============ PAGE 4: Google My Business SEO in Bareilly ============ */
page({
  rel: 'in/uttar-pradesh/bareilly/google-my-business-seo/',
  title: 'Google My Business SEO in Bareilly | GMB Ranking | PerfOptim',
  desc: 'Rank in the Google Maps top 3 in Bareilly. GMB optimisation, review management & local SEO for Civil Lines, Subhash Nagar & Rohilkhand businesses. Free GMB audit.',
  canonical: 'https://perfoptim.com/in/uttar-pradesh/bareilly/google-my-business-seo/',
  breadcrumbTrail: [{ label: 'Uttar Pradesh', href: 'uttar-pradesh/seo-services/' }, { label: 'Bareilly', href: 'uttar-pradesh/bareilly/seo-services/' }, { label: 'Google My Business SEO', href: null }],
  schemaExtra: localBiz('PerfOptim GMB SEO Bareilly'),
  heroSpan: '<i class="fas fa-map-marker-alt"></i> Google My Business SEO · Bareilly',
  h1: 'Google My Business SEO in Bareilly — Rank in the Map Pack Top 3',
  hindiSub: 'बरेली में Google Maps पर टॉप 3 में आएं — ज्यादा कॉल, ज्यादा ग्राहक',
  waText: 'Hi, I want my Bareilly business in the Google Maps top 3',
  cta: { heading: 'Dominate Google Maps in Bareilly', sub: 'Get a free GMB audit and a step-by-step plan to rank in the local map pack and flood your phone with customer calls.' },
  faqs: [
    { q: 'How long to rank in the Google Maps top 3 in Bareilly?', a: 'For most Bareilly businesses, we achieve top-3 map pack rankings within <strong>30–60 days</strong>. Categories with fewer competitors can rank even faster.' },
    { q: 'What does Google My Business SEO include?', a: 'Complete profile optimisation, category and keyword tuning, weekly GMB posts, photo and video uploads, review generation and management, Q&A management, and monthly insights reporting.' },
    { q: 'Can you remove fake or negative reviews?', a: 'We flag and report policy-violating reviews through Google\'s official process and, more importantly, build a steady flow of genuine positive reviews to protect your rating.' },
    { q: 'Which Bareilly businesses benefit most from GMB SEO?', a: 'Clinics, restaurants, coaching institutes, showrooms, real estate offices and local service businesses across Civil Lines, Subhash Nagar, the CBD market and Cantonment see the strongest results.' },
    { q: 'Do you manage GMB for multiple locations?', a: 'Yes — whether you have one outlet in the Rohilkhand market or several branches across Bareilly and beyond, we manage and optimise every profile.' },
  ],
  body: `<p>For a local business in Bareilly, no single digital asset drives more phone calls, direction requests, and walk-ins than a well-optimised Google Business Profile. When someone in Bareilly searches "clinic near me", "furniture shop in Civil Lines", or "restaurant in Subhash Nagar", Google shows a map with three highlighted businesses — the coveted "local pack". Those top three capture the overwhelming majority of clicks and calls. <strong>PerfOptim's Google My Business SEO in Bareilly</strong> is engineered to put your business in that top three and keep it there.</p>

<h2>Why GMB Matters So Much in Bareilly</h2>
<p>Research consistently shows that 83% of Indian consumers use Google Maps to find and choose local businesses, and the figure is even higher in fast-growing tier-2 cities like Bareilly. A customer near the CBD market or out on the Pilibhit Bypass doesn't scroll through ten website results — they tap one of the top three map listings and call. If your business isn't there, you are invisible at the precise moment a ready-to-buy customer is choosing. Worse, an unclaimed or poorly managed profile actively sends those customers to your competitors.</p>

<h2>Our Bareilly GMB SEO Process</h2>
<ol>
<li><strong>GMB Audit:</strong> We assess your current profile, your map-pack rankings across different Bareilly localities, and your top competitors to find the fastest path to the top three.</li>
<li><strong>Profile Optimisation:</strong> We complete and perfect every element — business categories, services, attributes, hours, description, and contact details — using the keywords your Bareilly customers actually search.</li>
<li><strong>Local Keyword Tuning:</strong> We optimise for locality-specific searches naming Civil Lines, Subhash Nagar, Rajendra Nagar, Cantonment and the Rohilkhand market, so you rank wherever your customers are.</li>
<li><strong>Review Generation & Management:</strong> We build a systematic flow of authentic five-star reviews and respond professionally to every review — the single biggest ranking and trust factor in the map pack.</li>
<li><strong>Ongoing Posts & Monitoring:</strong> Weekly GMB posts, fresh photos and videos, Q&A management, and monthly insights reporting keep your profile active and climbing.</li>
</ol>

<h2>Hyperlocal Optimisation Across Bareilly</h2>
<p>Ranking in the map pack is about proximity, relevance and prominence — and proximity means a search from Civil Lines can return different results than one from Subhash Nagar. We optimise your profile and supporting local signals so your business performs strongly across all of Bareilly's key commercial zones, from the premium professional cluster in Civil Lines to the high-footfall wholesale activity of the CBD and Rohilkhand market, the residential demand of Subhash Nagar and Rajendra Nagar, and the Cantonment area.</p>

<h2>Real Results for Local Businesses</h2>
<p>Our GMB clients regularly see dramatic results — one Bareilly healthcare client saw their profile calls increase by 280% in just 45 days after we optimised their listing and launched a review campaign. Because GMB SEO drives calls and visits directly, it is consistently one of the highest-ROI investments a local Bareilly business can make, often paying for itself within the first month.</p>

<h2>Reviews: Your Most Powerful Local Asset</h2>
<p>In the Bareilly map pack, reviews are everything. They influence your ranking, and they are often the deciding factor when a customer chooses between the top three listings. A clinic with 120 reviews at 4.8 stars will almost always beat one with 15 reviews, even if both are equally close to the searcher. PerfOptim runs systematic, policy-compliant review generation campaigns — sending happy customers simple WhatsApp and SMS prompts at the right moment, making it effortless for them to leave a genuine five-star review. We also craft professional responses to every review, positive or negative, which signals to both Google and prospective customers that your business is active, trustworthy and customer-focused. For Bareilly businesses in competitive categories like healthcare, dining and education, this disciplined approach to reviews is frequently the difference between languishing on page two and owning the number-one map position.</p>

<h2>Pairing GMB with the Rest of Your Funnel</h2>
<p>Google My Business SEO is most powerful when it works alongside your other channels. We connect your optimised profile to a fast, mobile-friendly website, ensure your name, address and phone number are consistent across every Indian directory, and use WhatsApp click-to-chat so the customers who find you on Maps can reach you in a single tap. This integrated approach means every customer who discovers you in the Bareilly map pack has a frictionless path from search to enquiry to sale.</p>

<h2>Affordable, Transparent, Local</h2>
<p>Our Google My Business SEO is included in local packages starting from just <strong>₹8,000/month</strong>, with no long-term lock-ins and easy UPI or bank-transfer payment. We are headquartered right here in Bareilly, offer complete Hindi support, and are reachable instantly on WhatsApp. If you want more calls, more direction requests, and more walk-in customers from Google Maps, claim your free GMB audit today and let PerfOptim put your business on the Bareilly map — literally.</p>`,
});

/* ============ PAGE 5: BLOG — Local SEO Guide for Bareilly (1,500 words) ============ */
function blogPage({ rel, title, desc, canonical, heroCat, h1, body, related }) {
  const inPrefix = '../../';
  const rootPrefix = '../../../';
  const bc = H.breadcrumb(inPrefix, [{ label: 'Blog', href: rel.replace(/^in\//, '') }, { label: 'Local SEO', href: null }]);
  const relatedHtml = related.map(r => `<a href="${inPrefix}${r.href}" class="card" style="display:block;padding:20px;border-radius:14px;background:#fff;box-shadow:0 6px 18px rgba(0,0,0,.05);text-decoration:none;color:inherit"><span style="color:#6C63FF;font-size:.8rem;font-weight:700;text-transform:uppercase">${r.tag}</span><h3 style="margin:8px 0;font-size:1.05rem">${r.title}</h3></a>`).join('\n          ');
  const articleSchema = `  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"BlogPosting","headline":"${H.esc(title)}","description":"${H.esc(desc)}","inLanguage":"en-IN","author":{"@type":"Organization","name":"PerfOptim"},"publisher":{"@type":"Organization","name":"PerfOptim"},"mainEntityOfPage":"${canonical}","datePublished":"2026-06-19","dateModified":"2026-06-19"}
  </script>`;
  const html = `<!DOCTYPE html>
<html lang="en-IN">
<head>
${H.head(rootPrefix, { title, desc, canonical, keywords: 'local SEO Bareilly, Bareilly business SEO, Google My Business Bareilly, Civil Lines, Rohilkhand' })}
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
          <span style="display:inline-block;background:rgba(108,99,255,.25);padding:6px 16px;border-radius:99px;font-size:.8rem;font-weight:700;text-transform:uppercase;margin-bottom:16px">${heroCat}</span>
          <h1 style="font-size:2.2rem;line-height:1.25">${h1}</h1>
          <p style="opacity:.85;margin-top:14px">By PerfOptim · Updated June 2026 · Bareilly, UP</p>
        </div>
      </section>
      <section class="section" style="padding:56px 0">
        <div class="container blog-body" style="max-width:760px;font-size:1.08rem;line-height:1.85;color:#333">
${body}
        </div>
      </section>
      <section class="section" style="padding:40px 0;background:linear-gradient(135deg,#6C63FF,#FF6584)">
        <div class="container" style="max-width:680px;text-align:center" data-aos="fade-up">
          <h2 style="color:#fff">Want to dominate local search in Bareilly?</h2>
          <p style="color:rgba(255,255,255,.9);margin:10px 0 22px">Get a free local SEO audit from PerfOptim — your hometown performance marketing team.</p>
          <a href="${H.waLink('Hi, I read your Bareilly local SEO guide and want a free audit')}" target="_blank" rel="noopener" class="btn-whatsapp btn-lg"><i class="fab fa-whatsapp"></i> Chat on WhatsApp</a>
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
${H.whatsappFloat('Hi PerfOptim, I have a question about local SEO in Bareilly.')}
${H.scripts(rootPrefix)}
</body>
</html>`;
  const dir = path.join(ROOT, rel);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`  ✓ ${rel}  (~${words} words body)`);
}

blogPage({
  rel: 'in/blog/local-seo-bareilly-businesses/',
  title: 'Local SEO Guide for Businesses in Bareilly, UP (2026) | PerfOptim',
  desc: 'A complete, practical local SEO guide for Bareilly businesses — from Civil Lines to Subhash Nagar. Rank on Google Maps, win the Rohilkhand market, and get more customers.',
  canonical: 'https://perfoptim.com/in/blog/local-seo-bareilly-businesses/',
  heroCat: 'Local SEO · 7 min read',
  h1: 'The Complete Local SEO Guide for Businesses in Bareilly, UP',
  related: [
    { href: 'uttar-pradesh/bareilly/seo-services/', tag: 'SEO', title: 'SEO Services in Bareilly' },
    { href: 'uttar-pradesh/bareilly/google-my-business-seo/', tag: 'Local SEO', title: 'Google My Business SEO in Bareilly' },
    { href: 'uttar-pradesh/bareilly/digital-marketing-agency/', tag: 'Agency', title: 'Digital Marketing Agency in Bareilly' },
  ],
  body: `<p>Bareilly is changing fast. The city that built its name on furniture, steel and the legendary <em>jhumka</em> is now home to a generation of business owners who understand that the next customer is just as likely to arrive from a Google search as from a referral down the lane. Yet despite this shift, the vast majority of Bareilly businesses — from showrooms in Civil Lines to traders in the Rohilkhand market and clinics across Subhash Nagar — have barely scratched the surface of local SEO. This guide changes that. Whether you run a shop, clinic, coaching institute or service business, here is a complete, practical roadmap to dominating local search in Bareilly in 2026.</p>

<h2>What Is Local SEO, and Why Does It Matter in Bareilly?</h2>
<p>Local SEO is the practice of optimising your online presence so that you appear when people nearby search for what you offer. When a resident of Bareilly types "best dentist near me", "furniture shop in Civil Lines", or "coaching institute in Subhash Nagar", Google shows a map with three highlighted businesses — the "local pack" — followed by organic results. Local SEO is what determines whether your business appears in that pack or gets buried where no one looks.</p>
<p>The stakes are enormous. Studies show that 83% of Indian consumers use Google Maps to find local businesses, and that nearly half of all Google searches have local intent. In a tightly-knit commercial city like Bareilly, where a single furniture cluster or coaching corridor can contain dozens of competing businesses, ranking in the top three is often the difference between a thriving enterprise and an empty showroom.</p>

<h2>Step 1: Claim and Perfect Your Google Business Profile</h2>
<p>Your Google Business Profile (formerly Google My Business) is the foundation of local SEO. If you do nothing else from this guide, do this. Claim your profile, then complete every single field: business name, accurate category, full address, phone number, website, hours, and a keyword-rich description. Add high-quality photos of your storefront, products, and team — businesses with photos receive far more clicks and direction requests.</p>
<p>Be precise about location. A profile that clearly establishes you in Civil Lines, Subhash Nagar, Rajendra Nagar, the Cantonment, or near the CBD market helps Google match you to nearby searchers. Choose your primary and secondary categories carefully; a "furniture store" and a "furniture manufacturer" rank for very different searches.</p>

<h2>Step 2: Win the Review Game</h2>
<p>Reviews are the single most powerful lever in the Bareilly map pack. They influence your ranking directly and act as social proof that tips undecided customers in your favour. A clinic with 150 reviews at 4.8 stars will almost always outrank — and out-convert — a competitor with a dozen reviews, even if both are equally close to the searcher.</p>
<p>Build reviews systematically, not sporadically. After every positive interaction, send the customer a simple WhatsApp message with a direct link to leave a review. Make it effortless. Respond to every review you receive — thank the happy ones and address concerns professionally and calmly. This ongoing activity signals to Google that your business is alive and trusted. Never buy fake reviews; Google's detection is sophisticated, and the penalties are severe.</p>

<h2>Step 3: Optimise Your Website for Bareilly Searches</h2>
<p>Your website should make crystal clear who you are, what you do, and where you do it. Create dedicated, genuinely useful pages for your core services and for the localities you serve. A page titled "Furniture Showroom in Civil Lines, Bareilly" with real, specific content will rank far better than a generic homepage. Naturally weave in terms your customers actually use — including Bareilly, Rohilkhand, and the specific neighbourhoods relevant to you.</p>
<p>Crucially, ensure your site is fast and mobile-first. The overwhelming majority of Bareilly searches happen on smartphones, often on patchy connections. A slow or clunky mobile site will lose visitors no matter how well it ranks. Add a prominent click-to-call button and a one-tap WhatsApp link so an interested searcher can reach you instantly.</p>

<h2>Step 4: Build Local Citations and Consistency</h2>
<p>A "citation" is any online mention of your business name, address and phone number (NAP). List your business accurately on the directories Indians actually use — JustDial, Sulekha, IndiaMART, and relevant industry-specific portals. The golden rule is consistency: your name, address and phone number must be identical everywhere, down to the abbreviations. Inconsistent listings confuse Google and dilute your local ranking power.</p>

<h2>Step 5: Create Locally Relevant Content</h2>
<p>Content marketing supercharges local SEO. Publish helpful articles that answer the questions your Bareilly customers ask — a furniture business might write "How to Choose Termite-Resistant Furniture for Bareilly's Climate"; a coaching institute might publish "NEET Preparation Tips for Students in Bareilly". This content captures searchers earlier in their journey, builds your authority, and gives you natural opportunities to mention your locality and services. Posting regularly to your Google Business Profile with offers, updates and photos has a similar effect, keeping your listing fresh and engaging.</p>

<h2>Step 6: Use WhatsApp to Convert Local Leads</h2>
<p>Ranking is only valuable if it produces customers, and in India no channel converts local interest faster than WhatsApp. With open rates around 98%, WhatsApp is where Bareilly customers prefer to enquire, negotiate and book. Add click-to-WhatsApp buttons across your website and Google profile, and respond promptly. Even simple automation — an instant greeting, a catalogue, a booking link — can dramatically increase the percentage of searchers who become paying customers.</p>

<h2>Common Local SEO Mistakes Bareilly Businesses Make</h2>
<p>Avoid these frequent pitfalls: leaving your Google profile unclaimed or half-filled; ignoring reviews entirely; using a slow, desktop-only website; listing inconsistent contact details across directories; and — most common of all — giving up after a few weeks. Local SEO compounds. The business that consistently optimises, gathers reviews and publishes content for six months will pull decisively ahead of competitors who dabble and quit.</p>

<h2>How Long Does Local SEO Take in Bareilly?</h2>
<p>The good news for tier-2 cities is that competition, while real, is far lighter than in metros. Most Bareilly businesses can reach the Google Maps top three within 30 to 60 days of disciplined optimisation, with organic rankings for tougher keywords strengthening over three to six months. The earlier you start, the sooner the compounding begins — and the harder it becomes for late-moving competitors to catch you.</p>

<h2>Local SEO by Business Type in Bareilly</h2>
<p>Different Bareilly businesses need slightly different local SEO emphases. <strong>Furniture and home décor showrooms</strong> should lean heavily on rich photography, product-category pages, and reviews that mention craftsmanship and delivery. <strong>Coaching institutes and schools</strong> benefit most from review velocity from parents, locality pages for Subhash Nagar and Rajendra Nagar, and content answering exam and admission questions. <strong>Clinics and diagnostic centres</strong> should prioritise their Google profile, doctor-specific pages, and rapid review responses, since trust is paramount in healthcare. <strong>Restaurants and cafés</strong> live and die by photos, menus on their profile, and a steady stream of recent reviews. <strong>Real estate offices and builders</strong> need locality-rich content and WhatsApp-driven enquiry capture for site visits. Tailoring these fundamentals to your category is how you turn a generic checklist into a genuine competitive advantage in the Bareilly market.</p>

<h2>Tracking What Actually Works</h2>
<p>Finally, never market in the dark. Set up Google Business Profile insights to see how many people called, requested directions, or visited your website from your listing. Use a simple analytics setup on your site to understand which pages and keywords drive enquiries. Tag your WhatsApp links so you know which channel produced each lead. With this visibility you can double down on what works and stop wasting money on what doesn't — the core discipline that separates businesses that grow predictably from those that merely hope.</p>

<h2>Get Expert Help — Right Here in Bareilly</h2>
<p>You can absolutely begin implementing this guide today. But if you'd rather focus on running your business while experts handle your local SEO, PerfOptim is headquartered right here in Bareilly. We've helped local businesses across Civil Lines, Subhash Nagar, the Cantonment and the wider Rohilkhand region climb to the top of Google Maps and turn searches into customers. Our local SEO packages start from just ₹8,000/month, with complete Hindi support and transparent monthly reporting. Message us on WhatsApp for a free local SEO audit, and let's put your Bareilly business exactly where your customers are looking.</p>`,
});

console.log('Hand-written Bareilly pages complete.');
