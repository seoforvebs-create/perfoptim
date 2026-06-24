const usServices = require('../services'); // reuse all 12 US services

const indiaOnlyServices = [
  { slug: "whatsapp-marketing", name: "WhatsApp Marketing", shortName: "WhatsApp",
    icon: "fa-whatsapp", color: "#25D366",
    metaTitle: "WhatsApp Marketing Agency India | Business API | PerfOptim",
    metaDesc: "WhatsApp Business API marketing for Indian businesses. Bulk messaging, automation, and lead nurturing via WhatsApp. Free demo.",
    h1: "WhatsApp Marketing That Turns Chats into Customers",
    intro: "With 500 million+ WhatsApp users in India, it is the highest-response marketing channel available. PerfOptim builds automated WhatsApp funnels that generate, nurture, and convert leads 24/7.",
    subServices: ["WhatsApp Business API Setup","Broadcast Campaigns","Chatbot Automation","WhatsApp Drip Sequences","Catalog Marketing","Click-to-WhatsApp Ads"],
    processSteps: ["API Setup & Verification","Contact List Building","Message Template Approval","Automation Workflow Design","Campaign Launch & Optimization"],
    faqs: [
      { q: "Do you set up WhatsApp Business API?", a: "Yes — we handle the complete Meta Business API application, verification, and setup." },
      { q: "Is bulk WhatsApp messaging legal in India?", a: "Yes — via official WhatsApp Business API. Non-API bulk tools violate terms and risk bans." },
      { q: "Can WhatsApp replace email marketing in India?", a: "For many Indian businesses, yes — WhatsApp open rates are 98% vs 22% for email." },
      { q: "Do you create WhatsApp chatbots?", a: "Yes — from simple FAQ bots to full lead qualification and booking automation." },
      { q: "Can we run Click-to-WhatsApp Meta Ads?", a: "Absolutely — CTWA ads are our highest-converting format for Indian B2C businesses." }
    ],
    caseStudy: { industry: "Education", result: "Lead response rate improved from 12% to 67% via WhatsApp automation", period: "60 days" },
    indiaSpecific: true
  },
  { slug: "google-my-business-seo", name: "Google My Business SEO", shortName: "GMB SEO",
    icon: "fa-map-marker-alt", color: "#4285F4",
    metaTitle: "Google My Business SEO India | Local Map Rankings | PerfOptim",
    metaDesc: "GMB SEO services for Indian businesses. Rank in Google Maps, get more calls, and dominate local search in your city. Free GMB audit.",
    h1: "Google My Business SEO — Dominate Local Search in Your City",
    intro: "83% of Indian consumers use Google Maps to find local businesses. PerfOptim optimizes your Google My Business profile to rank in the top 3 map pack for your most valuable keywords.",
    subServices: ["GMB Profile Optimization","Review Management","GMB Post Strategy","Photo & Video Uploads","Q&A Management","GMB Insights Reporting"],
    processSteps: ["GMB Audit","Profile Completion","Keyword Optimization","Review Generation Campaign","Monthly Posting & Monitoring"],
    faqs: [
      { q: "How long to rank in Google Maps top 3?", a: "For most businesses in tier 2/3 cities, 30-60 days. Metro cities take 2-4 months." },
      { q: "Do you work on GMB for multi-location businesses?", a: "Yes — we manage GMB for businesses with 1 to 100+ locations across India." },
      { q: "Can you get fake reviews removed?", a: "Yes — we flag and report fake reviews via Google's review management process." },
      { q: "What categories see best results from GMB SEO?", a: "Healthcare, restaurants, education, real estate, and local service businesses." },
      { q: "Do you create GMB posts regularly?", a: "Yes — weekly GMB posts are part of all our local SEO packages." }
    ],
    caseStudy: { industry: "Healthcare", result: "GMB calls increased 280% in 45 days in Bareilly", period: "45 days" },
    indiaSpecific: true
  },
  { slug: "influencer-marketing", name: "Influencer Marketing", shortName: "Influencer",
    icon: "fa-star", color: "#FF6584",
    metaTitle: "Influencer Marketing Agency India | Instagram & YouTube | PerfOptim",
    metaDesc: "Influencer marketing for Indian brands. Micro, macro, and nano influencers on Instagram, YouTube, and Moj. Real results, not vanity metrics.",
    h1: "Influencer Marketing That Drives Real Sales in India",
    intro: "India has 100+ million content creators. PerfOptim connects your brand with the right influencers — from mega to nano — to build authentic reach, trust, and conversions.",
    subServices: ["Influencer Discovery & Vetting","Campaign Management","Instagram Influencers","YouTube Collaborations","Moj & Josh Creators","Influencer ROI Tracking"],
    processSteps: ["Brand Brief & ICP","Influencer Research & Shortlist","Outreach & Negotiation","Campaign Execution","Performance Reporting"],
    faqs: [
      { q: "Do you work with micro-influencers in Tier 2 cities?", a: "Yes — micro and nano influencers in Tier 2/3 cities often outperform metros for local businesses." },
      { q: "What platforms do you cover?", a: "Instagram, YouTube, Moj, Josh, Sharechat, and LinkedIn for B2B influencers." },
      { q: "How do you vet influencers for fake followers?", a: "We use HypeAuditor and manual analysis to check engagement authenticity before every campaign." },
      { q: "What is the minimum budget for influencer marketing?", a: "Micro-influencer campaigns start from ₹25,000/month. Macro campaigns from ₹1.5 lakh." },
      { q: "Do you manage the content creation process?", a: "Yes — from brief to final post approval, we manage the entire creative workflow." }
    ],
    caseStudy: { industry: "Yoga TTC", result: "45 international yoga TTC enrollments from Instagram influencer campaign", period: "3 months" },
    indiaSpecific: true
  }
];

module.exports = [...usServices, ...indiaOnlyServices];
