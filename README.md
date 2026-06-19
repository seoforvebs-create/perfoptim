# PerfOptim — Performance. Optimized.

A production-ready, multi-page marketing website for **PerfOptim**, a results-driven digital
marketing agency targeting the US market globally and India at `/in/`.

## Project Overview
- **Name**: PerfOptim
- **Tagline**: Performance. Optimized.
- **Goal**: Convert visitors into qualified leads through SEO-optimized, performance-focused pages
  for 12 services and 11 industries, across US and India markets.
- **Tech Stack**: Pure HTML5 + CSS3 + Vanilla JavaScript (no frameworks)
  - AOS.js (scroll animations), Swiper.js (testimonials), Font Awesome 6, Google Fonts (Inter) — all via CDN

## Completed Features
- ✅ US Homepage (`index.html`) — 11 sections: hero, stats, services, industries, why-us,
  process, case studies, testimonials, locations, lead capture, blog preview
- ✅ 12 Service pages (`/services/*.html`) — What-Is, benefits, 5-step process, industries,
  locations, case study, FAQ (FAQPage schema), lead form
- ✅ 11 Industry pages (`/industries/*.html`) — pain points, solutions, results, locations, FAQ, CTA
- ✅ Services & Industries overview pages
- ✅ India Homepage (`/in/index.html`) — India-specific industries, states, cities, `en-IN` hreflang
- ✅ About, Contact (with map embed + form), Blog listing (with sidebar + pagination), 404
- ✅ Global sticky nav with mega dropdown + glassmorphism on scroll; mobile slide-in menu
- ✅ 4-column footer with newsletter + social + geo line
- ✅ JSON-LD schema: Organization, WebSite (SearchAction), BreadcrumbList, Service, FAQPage
- ✅ Full meta tags per page: unique title/description/keywords, canonical, Open Graph, Twitter, hreflang
- ✅ `sitemap.xml` (30 URLs, prioritized) + `robots.txt`
- ✅ SVG favicon; lazy-loaded images; font preconnect; deferred JS

## Functional Entry URIs
| Path | Description |
|------|-------------|
| `/` | US homepage |
| `/in/` | India homepage |
| `/services/` | All services overview |
| `/services/{slug}.html` | Individual service (seo-services, ppc-advertising, performance-marketing, content-marketing, web-design-development, cro-services, orm-services, social-media-marketing, lead-generation, branding-design, video-marketing, email-marketing) |
| `/industries/` | All industries overview |
| `/industries/{slug}.html` | Individual industry (healthcare, law-firms, real-estate, ecommerce, saas-technology, finance-insurance, manufacturers-oem, small-business, fitness-wellness, dental-clinics, restaurants-hospitality) |
| `/about.html` | About / team / values / milestones |
| `/contact.html` | Contact form + details + map |
| `/blog/` | Blog listing with sidebar |
| `/404.html` | Not-found page |
| `/sitemap.xml`, `/robots.txt` | SEO files |

## Data / Architecture
- **Storage**: None — fully static site (no database). Forms validate client-side and show a
  success state (wire to a backend/serverless endpoint for production submission).
- **Build helper**: `build/` contains Node generator scripts used at author-time to produce the
  static HTML consistently (nav, footer, templates). These are NOT required at runtime.

## File Structure
```
perfoptim.com/
├── index.html, about.html, contact.html, 404.html, sitemap.xml, robots.txt
├── services/ (index + 12 pages)
├── industries/ (index + 11 pages)
├── in/index.html
├── blog/index.html
├── css/ (style.css, components.css, home.css, responsive.css)
├── js/ (main.js, counter.js, form.js)
├── assets/ (favicon.svg, README)
└── build/ (author-time generators — not deployed)
```

## JavaScript
- `js/main.js` — sticky nav blur, mobile menu, AOS init, Swiper init, smooth scroll, active link, dropdowns
- `js/counter.js` — IntersectionObserver CountUp for stats (handles `+`, `%`, decimals)
- `js/form.js` — required/email/phone/URL validation, loading state, success message

## User Guide
1. Open `index.html` in any browser (or serve the folder) — the site works standalone.
2. Navigate via the top nav (Services / Industries mega-menus, Locations, Blog, About, Contact).
3. Fill any "Get Free Audit" or contact form to see client-side validation + success state.

## Local Preview
Served with `http-server` on port 3000 via PM2 (`ecosystem.config.cjs`).

## Deployment
- **Platform**: Any static host (Cloudflare Pages, Vercel, Netlify, GitHub Pages)
- **Status**: ✅ Active (local preview)
- **Last Updated**: 2026-06-19

## Recommended Next Steps
- Wire forms to a serverless endpoint (e.g., Cloudflare Pages Function) or form service
- Replace placehold.co images and `assets/logo.png` with real brand assets
- Add individual blog post pages and service+industry combo landing pages
- Add Canada `/ca/` and Gulf `/gulf/` market homepages (nav links already stubbed)
