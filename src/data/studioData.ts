export type PortfolioCategory =
  | 'All'
  | 'Visual Graphics'
  | 'Print & Souvenirs'
  | 'Word & Reports'
  | 'Excel & Presentations';

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  location: string;
  year: string;
  category: Exclude<PortfolioCategory, 'All'>;
  turnaround: string;
  outcomeMetric: string;
  summary: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  imageUrl: string;
  featured?: boolean;
  interactivePreviewType: 'brand' | 'flyer' | 'document' | 'dashboard';
}

export interface ServiceOption {
  id: 'flyer' | 'document' | 'excel' | 'branding';
  name: string;
  shortLabel: string;
  category: string;
  standardDays: string;
  expressHours: string;
  description: string;
  includedFeatures: string[];
  complexityMultipliers: {
    label: string;
    detail: string;
  }[];
}

export const CONTACT_INFO = {
  phoneDisplay: '+233 (0) 55 560 4924',
  phoneRaw: '+233555604924',
  whatsappBase: 'https://wa.me/233555604924',
  email: 'kuadjofila@gmail.com',
  locations: 'Accra (New Bortianor & Tudu), Kasoa, Jei-Krodua (Central Region) & Remote Worldwide',
  accraHubs: 'New Bortianor & Tudu, Accra',
  socialHandle: 'KUADJO FILA STUDIO',
  brandPromise: 'Unique · Clean · Professional · Affordable',
};

export const HERO_IMAGE = '/src/assets/images/hero_creative_studio_workspace_1791644409147.jpg';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'orile-brand-suite',
    title: 'Orile Corporate Identity, Call Cards & Letterheads',
    client: 'Orile Ventures Ltd.',
    location: 'Tudu, Accra',
    year: '2026',
    category: 'Visual Graphics',
    turnaround: '48 Hours',
    outcomeMetric: '+65% Partner Pitch Conversion in Q1',
    summary: 'Complete West African luxury corporate brand identity system with gold-foil call & business cards, executive letterheads, and 28-page brand usage guidelines.',
    challenge: 'Orile Ventures needed an authoritative visual identity ahead of an international investor summit in Accra, replacing inconsistent legacy logos.',
    solution: 'Engineered a geometric Adinkra-inspired monogram paired with deep navy and metallic gold typography, delivered with print-ready CMYK dielines.',
    deliverables: [
      'Master Vector Logo Suite (AI, EPS, SVG, PNG)',
      'Print-Ready Gold Foil Call & Business Cards + Letterheads',
      '28-Page Brand Guidelines & Color System Book',
      'Social Media Executive Profile Kit'
    ],
    imageUrl: '/src/assets/images/portfolio_brand_identity_mockup_1791644422423.jpg',
    featured: true,
    interactivePreviewType: 'brand'
  },
  {
    id: 'novatech-tshirt-souvenirs',
    title: 'Corporate T-Shirts, Custom Stickers & Event Souvenirs',
    client: 'NovaTech Solutions Summit',
    location: 'New Bortianor & Kasoa',
    year: '2026',
    category: 'Print & Souvenirs',
    turnaround: '48 Hours',
    outcomeMetric: '500+ Branded Merch Kits Produced Zero-Defect',
    summary: 'Custom screen-printed corporate polo/t-shirts, die-cut vinyl stickers, branded ceramic mugs, and woven event lanyards with ID badges.',
    challenge: 'The client needed cohesive, durable physical merchandise and promotional souvenirs for 500 summit attendees on a tight 48-hour print deadline.',
    solution: 'Prepared high-precision vector color separations for screen printing alongside contour-cut sticker dielines and sublimated lanyard artwork.',
    deliverables: [
      'Screen-Print Ready T-Shirt & Apparel Vector Separations',
      'Die-Cut Glossy Vinyl Stickers & Product Labels',
      'Branded Ceramic Mug & Souvenir Packaging Mockups',
      'Woven Lanyard & Attendee Call-Card / Badge Templates'
    ],
    imageUrl: '/src/assets/images/portfolio_tshirt_souvenirs_mockup_1791645690267.jpg',
    featured: true,
    interactivePreviewType: 'brand'
  },
  {
    id: 'vision-2030-report',
    title: 'Vision 2030 Annual Strategy & Empirical Thesis',
    client: 'West African Policy Institute & Post-Grad Fellowship',
    location: 'Accra & Remote',
    year: '2026',
    category: 'Word & Reports',
    turnaround: '36 Hours',
    outcomeMetric: '100% University & Board Compliance on First Submission',
    summary: '184-page MS Word master documentation featuring automated multi-level headings, dynamic Table of Contents, APA 7th citations, and executive KPI tables.',
    challenge: 'A raw 180-page draft suffered from broken section breaks, misaligned regression tables, and manual page numbering that corrupted on every edit.',
    solution: 'Rebuilt the entire file using strict MS Word style sheets, linked cross-references, automated Lists of Tables/Figures, and custom vector flowcharts.',
    deliverables: [
      'Automated Dynamic TOC, List of Figures & Tables',
      'Custom Section Breaks (Roman Preliminaries + Arabic Body)',
      '32 Re-typeset Empirical Regression & Financial Tables',
      'Print-Ready PDF/A & Editable DOCX Master Template'
    ],
    imageUrl: '/src/assets/images/portfolio_word_thesis_report_1791644447277.jpg',
    featured: true,
    interactivePreviewType: 'document'
  },
  {
    id: 'enterprise-kpi-dashboard',
    title: 'Q4 Enterprise Financial & Cash Flow Excel Database',
    client: 'Synthees Logistics & Distribution',
    location: 'Kasoa & Tudu Corridor',
    year: '2026',
    category: 'Excel & Presentations',
    turnaround: '48 Hours',
    outcomeMetric: '14 Hours Saved Weekly on Executive Reporting',
    summary: 'Automated MS Excel database, KPI dashboard, and 24-slide investor PowerPoint deck tracking revenue growth, EBITDA margins, and regional cash flow.',
    challenge: 'Regional managers were manually consolidating 12 separate spreadsheets every Friday, leading to formula errors.',
    solution: 'Built a locked, formula-driven Excel database & dashboard with dynamic slicers, automated variance alerts, and a matching boardroom pitch deck.',
    deliverables: [
      'Dynamic Excel Database & Dashboard (XLSX) with Slicer Controls',
      'Automated Revenue, EBITDA & Cash Flow Forecasting',
      '24-Slide Widescreen 16:9 Investor Pitch Deck (PPTX)',
      'One-Click Executive PDF Print Macro Layout'
    ],
    imageUrl: '/src/assets/images/portfolio_excel_dashboard_deck_1791644459156.jpg',
    interactivePreviewType: 'dashboard'
  },
  {
    id: 'gala-certificates-invitations',
    title: 'Embossed Certificates of Excellence & Luxury Invitations',
    client: 'Royal Prestige Gala & Academic Board',
    location: 'New Bortianor & Jei-Krodua',
    year: '2026',
    category: 'Print & Souvenirs',
    turnaround: '24 Hours',
    outcomeMetric: '350 Personalized Certificates & Invites Delivered',
    summary: 'Bespoke gold-foil certificates of honour, graduation diplomas, and wax-sealed wedding/corporate gala invitation card suites with RSVP envelopes.',
    challenge: 'Creating tamper-proof, prestigious certificates and matching luxury event invitations with automated guest name mail-merging.',
    solution: 'Designed intricate guilloché vector borders, gold foil stamping plates, and automated variable data printing for all 350 recipient names.',
    deliverables: [
      'Gold-Foil Certificate of Excellence Master Print File',
      'Wedding & Corporate Gala Invitation Suite + RSVP Cards',
      'Automated Variable-Data Guest Name Personalization',
      'Presentation Folder & Wax Seal Monogram Vector Die'
    ],
    imageUrl: '/src/assets/images/portfolio_certificates_invitations_suite_1791645704505.jpg',
    interactivePreviewType: 'flyer'
  },
  {
    id: 'vibrant-beats-coverart',
    title: 'Music Cover Arts, Roll-Up Banners & Promo Stickers',
    client: 'Yaw Kesse / AfroForce Records',
    location: 'Tudu, Accra',
    year: '2026',
    category: 'Visual Graphics',
    turnaround: '24 Hours',
    outcomeMetric: '120K+ First-Week Streams & Sold-Out Release Show',
    summary: 'Illustrated Afrobeats album cover artwork formatted for Spotify/Apple Music alongside retractable event roll-up banners, vinyl sleeves, and die-cut stickers.',
    challenge: 'The artist needed an iconic, culturally resonant visual identity that worked seamlessly on 3000x3000px streaming platforms and 85x200cm stage banners.',
    solution: 'Crafted a high-contrast digital illustration with bold custom typography, exported with both digital DSP metadata and CMYK large-format banner files.',
    deliverables: [
      '3000x3000px Spotify, Apple Music & Audiomack Cover Art',
      '85cm x 200cm Retractable Roll-Up Banner Print File',
      'Die-Cut Promotional Merch Sticker Sheet',
      'Animated Social Media Release Teaser Layout'
    ],
    imageUrl: '/src/assets/images/portfolio_music_coverart_banners_1791645717777.jpg',
    interactivePreviewType: 'flyer'
  },
  {
    id: 'urban-collective-campaign',
    title: 'Accra Design Symposium Flyers & Event Posters',
    client: 'Creative Urban Collective Ghana',
    location: 'New Bortianor, Accra',
    year: '2026',
    category: 'Visual Graphics',
    turnaround: '24 Hours',
    outcomeMetric: '2,400+ Event Registrations via Social Shares',
    summary: 'High-contrast promotional print posters, A4 workshop flyers, and Instagram/WhatsApp story assets engineered for rapid mobile engagement.',
    challenge: 'The event needed an urgent 24-hour visual turnaround to launch registrations across WhatsApp status networks and print billboards in Accra.',
    solution: 'Created a bold typographic poster series using high-visibility amber gold and deep slate contrast, optimized for both 300 DPI print and mobile screens.',
    deliverables: [
      'A3 & A4 CMYK Print-Ready Event Posters (300 DPI)',
      'WhatsApp Status & Instagram Story Vertical Cutdowns',
      'Speaker Spotlight Social Media Carousel Templates',
      'Event Lanyard & Stage Backdrop Vector Artwork'
    ],
    imageUrl: '/src/assets/images/portfolio_event_flyer_showcase_1791644434135.jpg',
    interactivePreviewType: 'flyer'
  },
  {
    id: 'kasoa-agro-proposal',
    title: 'Agro-Processing Expansion Proposal & Documentation',
    client: 'Golden Harvest Processing Ltd.',
    location: 'Kasoa Central',
    year: '2026',
    category: 'Word & Reports',
    turnaround: '24 Hours',
    outcomeMetric: '100% Commercial Credit Officer Approval',
    summary: 'Corporate bankable business plan formatted in MS Word alongside an integrated 5-year capital expenditure schedule.',
    challenge: 'The client had strong operational data but an unformatted Word draft that credit officers rejected for poor readability.',
    solution: 'Structured the proposal into a clean corporate layout with executive callout summaries, branded headers, and aligned schedules.',
    deliverables: [
      '45-Page Corporate Bankable Proposal (DOCX & PDF)',
      'Custom Branded Cover Page & Executive Summary Layout',
      'Integrated Bill of Quantities (BoQ) & Schedule Tables',
      'Editable Style Guide for Internal Team Updates'
    ],
    imageUrl: '/src/assets/images/portfolio_word_thesis_report_1791644447277.jpg',
    interactivePreviewType: 'document'
  },
  {
    id: 'boardroom-investor-deck',
    title: 'Executive FinTech Pitch Deck & Excel Tracker',
    client: 'PayVantage West Africa',
    location: 'Accra & Remote',
    year: '2026',
    category: 'Excel & Presentations',
    turnaround: '48 Hours',
    outcomeMetric: '3 Institutional Partnerships Secured in 30 Days',
    summary: 'Executive PowerPoint presentation redesign and linked Excel operational database for cross-border growth.',
    challenge: 'Founders had dense text-heavy slides that obscured their strong operational metrics during 15-minute partner pitches.',
    solution: 'Converted dense bullet points into high-impact visual data charts, custom vector architecture diagrams, and clean tabular slides.',
    deliverables: [
      '30-Slide Custom Master PowerPoint Presentation',
      'Linked Excel Cohort & Operational Database',
      'Custom Vector System Architecture Diagrams',
      'Dark & Light Mode Printable Handout Deck'
    ],
    imageUrl: '/src/assets/images/portfolio_excel_dashboard_deck_1791644459156.jpg',
    interactivePreviewType: 'dashboard'
  }
];

export const CALCULATOR_SERVICES: ServiceOption[] = [
  {
    id: 'flyer',
    name: 'Graphic Designing (Flyers, Posters, Banners, Stickers & Cover Arts)',
    shortLabel: 'Graphic Designing',
    category: 'Brand & Visual Design',
    standardDays: '2–3 Days',
    expressHours: '24 Hours',
    description: 'High-converting flyers, posters, banners, stickers, music cover arts, certificates, and event invitations tailored for print and social distribution.',
    includedFeatures: [
      '300 DPI CMYK Print-Ready PDF + RGB Web Formats',
      'Custom Typography, High-Contrast Layout & Bleed Marks',
      'WhatsApp Status, Instagram & Streaming Resizing',
      '2 Rounds of Precision Revisions Included'
    ],
    complexityMultipliers: [
      { label: 'Single Flyer / Cover Art / Certificate', detail: '1 primary concept + mobile social cutdown' },
      { label: 'Campaign Pack (3 Visual / Print Assets)', detail: 'Flyer + roll-up banner + sticker/invitation layout' },
      { label: 'Full Event & Souvenir Suite (6 Assets)', detail: 'Posters, t-shirt/souvenir art, invites & certificates' }
    ]
  },
  {
    id: 'document',
    name: 'Document Editing & MS Word Formatting',
    shortLabel: 'Editing & Formatting Document',
    category: 'Document Administration',
    standardDays: '3–4 Days',
    expressHours: '24–48 Hours',
    description: 'Corporate reports, academic theses, grant proposals, letterheads, and official documentation edited and structured with automated TOC and flawless pagination.',
    includedFeatures: [
      'Automated Dynamic TOC, List of Tables & Figures',
      'Strict APA / Harvard / Corporate Style Sheet Setup',
      'Complex Section Breaks (Roman & Arabic Numbering)',
      'Clean Re-formatting of All Data Tables & Diagrams'
    ],
    complexityMultipliers: [
      { label: 'Up to 35 Pages (Proposal / Report)', detail: 'Executive layout, custom cover & dynamic TOC' },
      { label: '36–100 Pages (Dissertation / Manual)', detail: 'Multi-chapter numbering, tables & citations' },
      { label: '100–250+ Pages (Full Thesis / Book)', detail: 'Full academic/enterprise master typesetting' }
    ]
  },
  {
    id: 'excel',
    name: 'Excel Database, Dashboard & PowerPoint Deck',
    shortLabel: 'Excel Database & Dashboard',
    category: 'Document Administration',
    standardDays: '3–5 Days',
    expressHours: '24–48 Hours',
    description: 'Automated MS Excel databases, KPI trackers, financial spreadsheets, and executive PowerPoint presentations that turn raw numbers into clear decisions.',
    includedFeatures: [
      'Automated Database Formulas (XLOOKUP, Dynamic Arrays, Slicers)',
      'Executive Visual KPI Charts & Conditional Alerts',
      'Protected Input Sheets & One-Click PDF Print Layout',
      'Custom Branded PowerPoint Slide Master Integration'
    ],
    complexityMultipliers: [
      { label: 'Core Excel Database / 12-Slide Deck', detail: 'Automated workbook or executive pitch deck' },
      { label: 'Multi-Sheet Database + 20-Slide Deck', detail: 'Integrated database + boardroom presentation' },
      { label: 'Enterprise Data Suite & Automation', detail: 'Full department reporting system + user guide' }
    ]
  },
  {
    id: 'branding',
    name: 'Full Corporate Branding & Souvenir Package',
    shortLabel: 'Full Branding Package',
    category: 'Brand & Visual Design',
    standardDays: '4–5 Days',
    expressHours: '48 Hours',
    description: 'Complete visual identity system including custom vector logo, call & business cards, letterheads, t-shirt/souvenir mockups, and document templates.',
    includedFeatures: [
      '3 Distinct Logo Concepts + Master Vector Source Files',
      'Call & Business Cards, Letterhead & Certificate Templates',
      'T-Shirt, Souvenir & Sticker Print-Ready Mockup Suite',
      'Brand Guidelines Book + Social Media Profile Kit'
    ],
    complexityMultipliers: [
      { label: 'Complete Brand Identity Essentials', detail: 'Logo suite, call cards, letterhead & brand sheet' },
      { label: 'Corporate Growth + Merch & Souvenirs', detail: 'Full stationery, t-shirt/souvenir kit & social templates' },
      { label: 'Executive Enterprise Rebrand + Doc Suite', detail: 'Complete brand book, PPTX deck & Word/Excel suite' }
    ]
  }
];
