const usIndustries = require('../industries');

const indiaOnlyIndustries = [
  { slug: "education-coaching", name: "Education & Coaching", icon: "fa-graduation-cap",
    h1: "Digital Marketing for Schools, Colleges & Coaching Institutes",
    metaTitle: "Education Digital Marketing India | SEO & Lead Gen | PerfOptim",
    metaDesc: "Digital marketing for schools, colleges, universities, and coaching institutes in India. Student lead generation, admissions marketing. Free audit.",
    painPoints: [
      { title: "Admissions Targets Not Being Met", desc: "Competition from edtech and other institutions is fierce. Digital channels fill your admission pipeline." },
      { title: "Zero Online Visibility for Courses", desc: "Students search for 'best coaching in [city]' — if you're not on Page 1, you don't exist." },
      { title: "Overdependence on Word-of-Mouth", desc: "Referrals scale slowly. Digital marketing creates a 12-month admissions pipeline." }
    ],
    services: ["seo-services","lead-generation","whatsapp-marketing","google-my-business-seo","ppc-advertising","content-marketing"],
    stats: ["350% increase in admission inquiries","₹180 average cost per student lead","Top 3 GMB rankings for 25+ coaching institutes"],
    indiaSpecific: true,
    faqs: [
      { q: "Do you work with NEET/JEE coaching institutes?", a: "Yes — competitive exam coaching lead gen is a specialty with proven playbooks." },
      { q: "Can you market to parents as well as students?", a: "Yes — we segment campaigns for both student and parent decision-makers." },
      { q: "Do you manage admissions landing pages?", a: "Yes — high-converting admissions landing pages with form + WhatsApp CTAs." },
      { q: "Can you help with YouTube marketing for education?", a: "Yes — YouTube is a powerful organic channel for coaching institutes." },
      { q: "Do you work with online ed-tech platforms?", a: "Yes — both offline institutes and online learning platforms are in our portfolio." }
    ]
  },
  { slug: "yoga-ttc", name: "Yoga & Yoga TTC", icon: "fa-leaf",
    h1: "Digital Marketing for Yoga Studios and Yoga Teacher Training Programs",
    metaTitle: "Yoga & Yoga TTC Digital Marketing India | PerfOptim",
    metaDesc: "Specialized digital marketing for yoga studios and Yoga Teacher Training (TTC/YTTC) programs in India. International student enrollment campaigns.",
    painPoints: [
      { title: "Struggling to Attract International Students", desc: "The global YTTC market is worth $11B. SEO and Meta Ads in English target overseas students directly." },
      { title: "Low Google Visibility for 'Yoga TTC in Rishikesh/Goa'", desc: "These are gold-standard keywords. We rank your TTC program where international seekers search." },
      { title: "No System for Consistent Enrollments", desc: "Most yoga schools rely on Instagram alone. We build multi-channel funnels." }
    ],
    services: ["seo-services","ppc-advertising","social-media-marketing","content-marketing","influencer-marketing","web-design-development"],
    stats: ["45 international enrollments in one YTTC campaign","280% increase in website inquiries","Top 5 Google rankings for 'yoga TTC in Rishikesh'"],
    indiaSpecific: true,
    faqs: [
      { q: "Do you target international students for yoga TTC?", a: "Yes — this is our specialty. We run English-language SEO and ads targeting US, EU, and Australian markets." },
      { q: "Which locations do you cover for yoga marketing?", a: "Rishikesh, Goa, Mysore, Dharamsala, Pune — all major yoga tourism hubs." },
      { q: "Can you help with 200-hour and 300-hour YTTC programs?", a: "Yes — all Yoga Alliance certified program levels are covered." },
      { q: "Do you create multilingual content for yoga schools?", a: "Yes — English content for international students, Hindi for domestic reach." },
      { q: "How do you generate yoga retreat bookings?", a: "Through Instagram Ads, Google Ads targeting 'yoga retreat India', and SEO-optimized landing pages." }
    ]
  },
  { slug: "tourism-travel", name: "Tourism & Travel", icon: "fa-plane",
    h1: "Digital Marketing for Tour Operators and Travel Businesses in India",
    metaTitle: "Tourism & Travel Digital Marketing India | PerfOptim",
    metaDesc: "Digital marketing for Indian tour operators, travel agencies, and hospitality businesses. SEO, Google Ads, social media. Domestic & international tourists.",
    painPoints: [
      { title: "OTAs Taking All Your Bookings", desc: "MakeMyTrip and Cleartrip take a cut of every booking. Direct booking SEO changes that." },
      { title: "Seasonal Revenue Swings", desc: "Digital marketing builds off-season demand through content and retargeting." },
      { title: "No Brand Differentiation", desc: "Hundreds of tour operators look the same. Brand and content strategy sets you apart." }
    ],
    services: ["seo-services","social-media-marketing","content-marketing","ppc-advertising","influencer-marketing","web-design-development"],
    stats: ["190% increase in direct tour bookings","Top 5 Google rankings for 30+ destination keywords","₹320 average CPL for international tour packages"],
    indiaSpecific: true,
    faqs: [
      { q: "Do you work with inbound tourism businesses?", a: "Yes — inbound (foreign tourists to India) and outbound (Indians traveling abroad) campaigns both." },
      { q: "Can you target international tourists for Rajasthan/Kerala trips?", a: "Yes — English-language SEO and Google Ads targeting international markets is a core service." },
      { q: "Do you create destination content and travel blogs?", a: "Yes — travel content for SEO is one of the highest-ROI strategies for tour operators." },
      { q: "How do you handle peak vs. off-season marketing?", a: "We build year-round content calendars and adjust ad budgets dynamically by season." },
      { q: "Do you work with pilgrimage tour operators?", a: "Yes — Char Dham, Vaishno Devi, Kashi — religious tourism is a significant vertical we serve." }
    ]
  },
  { slug: "real-estate-india", name: "Real Estate India", icon: "fa-building",
    h1: "Digital Marketing for Real Estate Builders and Agents in India",
    metaTitle: "Real Estate Digital Marketing India | Lead Gen | PerfOptim",
    metaDesc: "Real estate digital marketing for Indian builders, developers, and agents. Google Ads, Facebook Ads, and SEO for property lead generation.",
    painPoints: [
      { title: "High Ad Spend, Unqualified Leads", desc: "99acres and Housing.com leads are expensive and often unqualified. We build owned lead funnels." },
      { title: "No Video or Social Strategy", desc: "Property buyers research extensively on YouTube and Instagram before visiting sites." },
      { title: "Slow Project Sales Velocity", desc: "Data-driven targeting and retargeting accelerate sales cycles from discovery to site visit." }
    ],
    services: ["ppc-advertising","lead-generation","social-media-marketing","content-marketing","video-marketing","whatsapp-marketing"],
    stats: ["₹420 average CPL for 2BHK property leads","150 qualified site visits per month for builder client","280% ROI on Meta Ads for luxury apartments"],
    indiaSpecific: true,
    faqs: [
      { q: "Do you work with residential and commercial projects?", a: "Yes — residential, commercial, plotted development, and luxury real estate." },
      { q: "Can you target NRI buyers?", a: "Yes — NRI-targeted campaigns on Meta and Google with UAE/US/UK geo targeting." },
      { q: "Do you run walk-in/site visit campaigns?", a: "Yes — site visit generation campaigns are our most requested real estate service." },
      { q: "What's your average CPL for real estate in India?", a: "₹350-600 for tier 1 metros, ₹150-300 for tier 2 cities." },
      { q: "Do you create property walkthroughs and video ads?", a: "Yes — drone videos, 3D walkthrough promotion, and property Reels for social media." }
    ]
  },
  { slug: "healthcare-india", name: "Healthcare India", icon: "fa-hospital",
    h1: "Digital Marketing for Hospitals, Clinics and Doctors in India",
    metaTitle: "Healthcare Digital Marketing India | Patient Lead Gen | PerfOptim",
    metaDesc: "Healthcare digital marketing for Indian hospitals, clinics, and doctors. Patient lead gen, GMB SEO, ORM. Serving all major cities.",
    painPoints: [
      { title: "Patients Going to Bigger Hospitals", desc: "Brand and digital presence keeps patients local. GMB and SEO are your competitive weapons." },
      { title: "Doctor Reputation Under Attack Online", desc: "One bad review on Google or Practo can cost dozens of patients. ORM is essential." },
      { title: "No Systematic Patient Acquisition", desc: "Referrals are unreliable. Digital channels create consistent new patient flow." }
    ],
    services: ["google-my-business-seo","orm-services","seo-services","ppc-advertising","content-marketing","whatsapp-marketing"],
    stats: ["280% increase in patient appointment calls","4.8★ Google rating maintained for clinic clients","₹220 average CPL for specialist doctor consultations"],
    indiaSpecific: true,
    faqs: [
      { q: "Do you manage Practo and JustDial listings too?", a: "Yes — we manage GMB, Practo, JustDial, and Lybrate listings as part of our healthcare local SEO." },
      { q: "Can you help a new clinic get patients fast?", a: "Yes — GMB SEO + Google Ads combo delivers patient inquiries within 2-4 weeks." },
      { q: "Do you work with Ayurveda and alternative medicine clinics?", a: "Yes — Ayurveda, homeopathy, and naturopathy clinics are a growing segment we serve." },
      { q: "What about medical tourism marketing?", a: "Yes — India is a global medical tourism destination and we build campaigns for international patients." },
      { q: "Can you help hospitals promote specific departments?", a: "Yes — department-specific campaigns (ortho, cardio, maternity, etc.) are highly effective." }
    ]
  },
  { slug: "jewellery", name: "Jewellery Brands", icon: "fa-gem",
    h1: "Digital Marketing for Jewellery Brands and Stores in India",
    metaTitle: "Jewellery Digital Marketing India | Social & SEO | PerfOptim",
    metaDesc: "Digital marketing for Indian jewellery brands and stores. Instagram marketing, SEO, Google Shopping, and bridal campaign management.",
    painPoints: [
      { title: "Offline Store Not Getting Enough Footfall", desc: "GMB SEO, Google Ads, and social media drive local customers to your store." },
      { title: "Missing the Bridal & Wedding Season Online", desc: "Brides plan jewelry purchases months in advance via Pinterest and Instagram." },
      { title: "D2C Jewellery Struggling Against Big Brands", desc: "Niche positioning and influencer marketing give indie jewellery brands an edge." }
    ],
    services: ["social-media-marketing","seo-services","ppc-advertising","influencer-marketing","google-my-business-seo","content-marketing"],
    stats: ["240% Instagram reach growth for jewellery brand","₹280 CPL for bridal jewellery inquiries","4.9★ Google rating for jewellery store clients"],
    indiaSpecific: true,
    faqs: [
      { q: "Do you run Google Shopping campaigns for jewellery?", a: "Yes — Google Shopping and Performance Max are highly effective for jewellery e-commerce." },
      { q: "Do you work with gold, diamond, and imitation jewellery brands?", a: "Yes — all jewellery categories including silver, gemstone, and fashion jewellery." },
      { q: "How do you approach wedding season marketing?", a: "We build 3-4 month pre-season campaigns targeting brides, mothers, and gifters." },
      { q: "Can you help with Tanishq-style brand positioning for local brands?", a: "Yes — local jewellery brand building through content, PR, and digital campaigns." },
      { q: "Do you create jewellery photography/videography direction?", a: "Yes — we provide creative direction for product shoots and style the digital presentation." }
    ]
  },
  { slug: "manufacturing-india", name: "Manufacturing & Industrial", icon: "fa-cogs",
    h1: "Digital Marketing for Manufacturers and Industrial Businesses in India",
    metaTitle: "Manufacturing Digital Marketing India | B2B Lead Gen | PerfOptim",
    metaDesc: "B2B digital marketing for Indian manufacturers, exporters, and industrial companies. IndiaMART alternative lead gen, SEO, Google Ads.",
    painPoints: [
      { title: "Over-Reliant on IndiaMART / TradeIndia", desc: "Platform dependency is risky. Own your lead generation through website SEO and Google Ads." },
      { title: "Not Visible to Export Buyers", desc: "International B2B buyers search Google in English. SEO and Google Ads reach them directly." },
      { title: "No Digital Presence for B2B Credibility", desc: "A modern website and LinkedIn presence are now table stakes for winning export contracts." }
    ],
    services: ["seo-services","lead-generation","content-marketing","web-design-development","ppc-advertising","email-marketing"],
    stats: ["₹580 average CPL for B2B manufacturing leads","200% increase in export inquiry form submissions","Top 5 Google rankings for 40+ industrial product keywords"],
    indiaSpecific: true,
    faqs: [
      { q: "Can you help replace IndiaMART dependency?", a: "Yes — we build organic and paid channels that generate direct buyer inquiries at lower cost." },
      { q: "Do you work with exporters targeting global buyers?", a: "Yes — international SEO in English targeting US, EU, and Middle East buyers." },
      { q: "Can you create product catalog websites?", a: "Yes — SEO-optimized product catalog sites with RFQ forms are our manufacturing specialty." },
      { q: "Do you work with MSMEs and small manufacturers?", a: "Yes — MSME-focused packages with affordable pricing are available." },
      { q: "Can you help with government tender marketing?", a: "Yes — GeM portal optimization and government sector positioning are services we offer." }
    ]
  },
  { slug: "matrimonial-wedding", name: "Matrimonial & Wedding", icon: "fa-heart",
    h1: "Digital Marketing for Wedding Planners and Matrimonial Businesses",
    metaTitle: "Wedding & Matrimonial Digital Marketing India | PerfOptim",
    metaDesc: "Digital marketing for wedding planners, venues, photographers, and matrimonial services in India. Lead gen, social media, and bridal campaign management.",
    painPoints: [
      { title: "Invisible During Peak Wedding Search Season", desc: "Wedding season searches spike November-February. Year-round SEO captures all of it." },
      { title: "No Instagram Strategy for Vendor Showcase", desc: "Wedding businesses live on Instagram. A strategic presence converts browsers into bookings." },
      { title: "Competing with WeddingWire and Shaadi.com", desc: "Direct booking SEO and targeted ads reduce platform dependency and commissions." }
    ],
    services: ["social-media-marketing","seo-services","influencer-marketing","content-marketing","ppc-advertising","video-marketing"],
    stats: ["₹390 average CPL for wedding venue inquiries","180% Instagram growth for wedding planner clients","Top 3 Google rankings for 'wedding planner in [city]'"],
    indiaSpecific: true,
    faqs: [
      { q: "Do you work with destination wedding companies?", a: "Yes — destination weddings in Rajasthan, Goa, and Udaipur are a specialty." },
      { q: "How important is Instagram for wedding businesses?", a: "Critical — 78% of brides use Instagram to discover wedding vendors. We manage it strategically." },
      { q: "Can you help a wedding photographer market digitally?", a: "Yes — portfolio SEO, Instagram growth, and Google Ads for wedding photographers." },
      { q: "Do you run campaigns during wedding season specifically?", a: "Yes — October to March sprint campaigns with increased ad budgets and fresh content." },
      { q: "Can you help with NRI wedding inquiries from abroad?", a: "Yes — we target NRI communities in USA, UK, and Canada for India destination weddings." }
    ]
  }
];

module.exports = [...usIndustries, ...indiaOnlyIndustries];
