import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  MessageSquare,
  Layers,
  FileSpreadsheet,
  Eye,
  Check,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import {
  CONTACT_INFO,
  HERO_IMAGE,
  PORTFOLIO_ITEMS,
  PortfolioItem,
  ServiceOption
} from '../data/studioData';
import { BrandLogo } from '../components/BrandLogo';

export type AppPage = 'home' | 'services' | 'portfolio' | 'calculator' | 'contact' | 'admin';

export interface DirectOrderSelection {
  serviceName: string;
  packageTitle: string;
  deliverables: string[];
  turnaroundLabel: string;
}

interface HomePageProps {
  isDark: boolean;
  onNavigate: (page: AppPage) => void;
  onSelectServiceForQuote: (serviceId: ServiceOption['id']) => void;
  onDirectOrderToContact: (selection: DirectOrderSelection) => void;
  onOpenPortfolioModal: (item: PortfolioItem) => void;
  heroImgError: boolean;
  setHeroImgError: (val: boolean) => void;
  brokenPortfolioImgs: Record<string, boolean>;
  setBrokenPortfolioImgs: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export const HomePage: React.FC<HomePageProps> = ({
  isDark,
  onNavigate,
  onSelectServiceForQuote,
  onDirectOrderToContact,
  onOpenPortfolioModal,
  heroImgError,
  setHeroImgError,
  brokenPortfolioImgs,
  setBrokenPortfolioImgs,
}) => {
  const featuredItems = PORTFOLIO_ITEMS.slice(0, 3);

  const heroWhatsAppUrl = `${CONTACT_INFO.whatsappBase}?text=${encodeURIComponent(
    "Hello Kuadjo! I'm visiting your Kuadjo Fila Studio website and would like to discuss a graphic design, print/souvenir, or document formatting project."
  )}`;

  return (
    <div className="space-y-4">
      {/* 1. DYNAMIC HERO SECTION (Split-Screen 12-Col with Matching Height Visual & Motion) */}
      <section className="py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left 7 Cols: Brand Identity & High-Impact Copywriting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col justify-center space-y-6"
            >
              <div className="text-xs sm:text-sm font-semibold tracking-wide text-amber-500">
                Fast Turnaround · Flawless Precision · Stand-Out Designs
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.08]"
                style={{ textWrap: 'balance' }}
              >
                Elevate Your Brand.{' '}
                <span className="font-serif-editorial italic font-normal text-amber-500">
                  Perfect Your Documents.
                </span>
              </h1>

              <p
                className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                High-impact graphic design & expert document formatting that turns heads, boosts credibility, and grows your business in Accra (New Bortianor & Tudu), Kasoa, Jei-Krodua, and beyond.
              </p>

              {/* Quick Service Highlights Strip — Direct Order Triggers */}
              <div
                className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    onDirectOrderToContact({
                      serviceName: 'Graphic Designing',
                      packageTitle: 'Flyers, Banners, Posters & Stickers Package',
                      deliverables: [
                        '300 DPI CMYK Print-Ready Artwork (PDF, PNG, PSD/AI)',
                        'Social Media Promotional Formats (Instagram, WhatsApp Status, Facebook)',
                        '24–48 Hour Fast Studio Turnaround & Revisions',
                      ],
                      turnaroundLabel: 'Express Priority (24–48 Hours)',
                    })
                  }
                  className="hover:text-amber-500 transition-colors cursor-pointer"
                >
                  Flyers, Banners & Stickers
                </button>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={() =>
                    onDirectOrderToContact({
                      serviceName: 'Editing & Formatting Document',
                      packageTitle: 'MS Word Thesis, Report & Corporate Proposal Formatting',
                      deliverables: [
                        'Automated Dynamic Table of Contents & List of Figures/Tables',
                        'Consistent Heading Styles, Page Numbering (Roman & Arabic) & Margins',
                        'Clean Editable DOCX + Print-Ready PDF/A Handover',
                      ],
                      turnaroundLabel: 'Standard Turnaround (3–5 Days)',
                    })
                  }
                  className="hover:text-amber-500 transition-colors cursor-pointer"
                >
                  MS Word Documentation
                </button>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={() =>
                    onDirectOrderToContact({
                      serviceName: 'Excel Database & Dashboard',
                      packageTitle: 'MS Excel Automated Database & Executive KPI Dashboard',
                      deliverables: [
                        'Structured Data Entry Tables with Drop-Down Validation',
                        'Automated Formulas (XLOOKUP, SUMIFS) & Dynamic KPI Charts',
                        'Print-Ready Executive Summary Views & Unlocked Master XLSX',
                      ],
                      turnaroundLabel: 'Standard Turnaround (3–5 Days)',
                    })
                  }
                  className="hover:text-amber-500 transition-colors cursor-pointer"
                >
                  Excel Databases & Dashboards
                </button>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={() =>
                    onDirectOrderToContact({
                      serviceName: 'Full Branding Package',
                      packageTitle: 'Full Corporate Brand Identity & Executive Stationery Suite',
                      deliverables: [
                        'Primary & Secondary Vector Logo Marks (AI, EPS, SVG, PNG)',
                        'Call & Business Cards, Official Letterhead & Envelope Templates',
                        'Brand Color Palette, Typography Guide & Mockup Presentation',
                      ],
                      turnaroundLabel: 'Standard Turnaround (3–5 Days)',
                    })
                  }
                  className="hover:text-amber-500 transition-colors cursor-pointer"
                >
                  Full Corporate Branding
                </button>
              </div>

              {/* Primary CTA Buttons (Direct Order via Contact + Calculator + WhatsApp) */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() =>
                    onDirectOrderToContact({
                      serviceName: 'Graphic Designing',
                      packageTitle: 'Custom Studio Design or Document Formatting Order',
                      deliverables: [
                        'Dedicated 1-on-1 Creative & Technical Brief Review',
                        'High-Resolution Proofs Delivered via WhatsApp / Email',
                        'Master Print-Ready & Editable Source Files Included',
                      ],
                      turnaroundLabel: 'Express Priority (24–48 Hours)',
                    })
                  }
                  className="py-4 px-7 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm sm:text-base transition-colors flex items-center justify-center gap-2.5 whitespace-nowrap shadow-lg shadow-amber-500/15 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 shrink-0" />
                  <span>Place an Order via Contact</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => onNavigate('services')}
                  className={`py-4 px-6 rounded-xl border font-bold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
                    isDark
                      ? 'bg-slate-900/90 border-slate-700 hover:border-amber-500/60 text-white'
                      : 'bg-white border-slate-300 hover:border-amber-500 text-slate-900'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>See What You Get & Order</span>
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={heroWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`py-4 px-5 rounded-xl border font-bold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 whitespace-nowrap ${
                    isDark
                      ? 'bg-slate-900/90 border-slate-700 hover:border-emerald-500/60 hover:bg-slate-900 text-white'
                      : 'bg-white border-slate-300 hover:border-emerald-600 text-slate-900'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>WhatsApp</span>
                </motion.a>
              </div>

              {/* Unboxed Direct Metadata Line */}
              <div
                className={`pt-2 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                <span>Direct Desk: {CONTACT_INFO.phoneDisplay}</span>
                <span aria-hidden="true">·</span>
                <span>{CONTACT_INFO.email}</span>
                <span aria-hidden="true">·</span>
                <span>Stickers · Banners · T-Shirts · Certificates · Documentation</span>
              </div>
            </motion.div>

            {/* Right 5 Cols: Studio Showcase Visual at Matching Height */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex"
            >
              <div
                className={`relative w-full rounded-2xl overflow-hidden border flex flex-col justify-end min-h-[340px] lg:h-full ${
                  isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-slate-900'
                }`}
              >
                {!heroImgError ? (
                  <img
                    src={HERO_IMAGE}
                    alt="Kuadjo Fila Studio Graphic Design and Document Formatting Workspace"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgError(true)}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/40 flex items-center justify-center p-8">
                    <Layers className="w-16 h-16 text-amber-500/60" />
                  </div>
                )}

                {/* Measured Contrast Scrim for Legibility */}
                <div className="relative z-10 bg-gradient-to-t from-slate-950/95 via-slate-950/65 to-transparent p-6 pt-20">
                  <div className="flex items-center gap-3 mb-2.5">
                    <BrandLogo size="md" showWordmarkInside />
                    <div>
                      <div className="text-xs font-mono-tabular text-amber-400">
                        KUADJO FILA STUDIO
                      </div>
                      <div className="text-xs text-slate-300">
                        Unique · Clean · Professional · Affordable
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    Brand Logos, Flyers, T-Shirts & Souvenirs · MS Word Theses · Automated Excel Databases
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-300 mt-3 pt-3 border-t border-white/15">
                    <span>Accra (New Bortianor & Tudu), Kasoa & Jei-Krodua</span>
                    <button
                      type="button"
                      onClick={() => onNavigate('portfolio')}
                      className="text-amber-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All 9 Samples</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 2. "WHY WORK WITH ME?" VALUE HIGHLIGHTS (Full-Width 4-Column Row Below Hero Split) */}
          <div className="mt-12 lg:mt-16 pt-10 border-t border-slate-800/60">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-xs font-semibold tracking-wider text-amber-500">
                01. Why Work With Me? — Studio Value Guarantees
              </h2>
              <span
                className={`text-xs font-mono-tabular ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                450+ Corporate, Event & Academic Projects Delivered Across Ghana & Remote
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  index: '01 / SPEED',
                  title: '24–48 Hour Fast Delivery',
                  desc: 'Rapid milestone previews via WhatsApp so you never miss a print deadline, pitch meeting, or university submission.',
                },
                {
                  index: '02 / CRAFT',
                  title: 'Pixel-Perfect Graphic Design',
                  desc: '300 DPI CMYK print-ready flyers, banners, stickers, certificates, and vector identities that command authority.',
                },
                {
                  index: '03 / STRUCTURE',
                  title: 'Enterprise-Grade Excel & Word Formatting',
                  desc: 'Automated Tables of Contents, strict academic/corporate style sheets, dynamic Excel databases, and executive slide decks.',
                },
                {
                  index: '04 / ACCESS',
                  title: 'Local Expertise in Accra & Kasoa',
                  desc: 'Operating across Accra (New Bortianor & Tudu), Kasoa, and Jei-Krodua (Central Region) with seamless remote delivery.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  whileHover={{ y: -3 }}
                  className={`p-5 rounded-xl border transition-colors ${
                    isDark
                      ? 'bg-slate-900/70 border-slate-800/90 hover:border-amber-500/40'
                      : 'bg-white border-slate-200/90 hover:border-amber-500'
                  }`}
                >
                  <div className="text-xs font-mono-tabular text-amber-500 font-semibold mb-1.5">
                    {item.index}
                  </div>
                  <h3 className="text-base font-bold mb-1.5">{item.title}</h3>
                  <p
                    className={`text-xs leading-relaxed ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE STUDIO CAPABILITIES OVERVIEW — WHAT YOU GET & DIRECT ORDER */}
      <section
        className={`py-16 sm:py-20 border-t transition-colors ${
          isDark
            ? 'bg-slate-900/30 border-slate-800/80'
            : 'bg-slate-100/60 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-xs font-semibold tracking-wider text-amber-500 mb-2">
                02. Core Studio Divisions — Know Exactly What You Are Getting
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Explore Deliverables & Place Your Order Directly
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-400 transition-colors cursor-pointer self-start md:self-auto"
            >
              <span>Explore Full Services Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pillar 1 */}
            <motion.div
              whileHover={{ y: -4 }}
              className={`p-7 rounded-2xl border flex flex-col justify-between transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-800 hover:border-amber-500/50'
                  : 'bg-white border-slate-200 hover:border-amber-500'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono-tabular font-semibold text-amber-500">
                    PILLAR 01 · BRAND & VISUAL DESIGN
                  </span>
                  <Layers className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Eye-Catching Visuals, Print & Event Souvenirs
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-4 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  Stickers, banners, posters, flyers, call & business cards, letterheads, embossed certificates, t-shirts/souvenirs, wedding/gala invitations, music cover arts, and full brand identity packages.
                </p>

                <div
                  className={`p-4 rounded-xl border mb-6 ${
                    isDark
                      ? 'bg-slate-950/60 border-slate-800'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-[11px] font-mono-tabular font-semibold text-amber-500 uppercase mb-2.5">
                    What You Get In Your Handover Package:
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    {[
                      '300 DPI CMYK Print-Ready Files',
                      'Editable Source Files (PSD / AI / PDF)',
                      'Web & WhatsApp Promo Versions',
                      'Custom Brand Color & Font Guide',
                      'Realistic 3D Product Mockups',
                      'Fast Revisions Until 100% Satisfied',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-800/40 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="text-xs font-semibold text-amber-500 hover:underline cursor-pointer"
                >
                  Inspect All Visual Services →
                </button>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => onSelectServiceForQuote('flyer')}
                    className={`px-3.5 py-2 rounded-lg border font-semibold text-xs transition-colors cursor-pointer ${
                      isDark
                        ? 'border-slate-700 hover:bg-slate-800 text-slate-200'
                        : 'border-slate-300 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    Configure Scope
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onDirectOrderToContact({
                        serviceName: 'Graphic Designing',
                        packageTitle: 'Brand & Visual Design Package (Flyers, Banners, Logos & Print)',
                        deliverables: [
                          '300 DPI CMYK Print-Ready Artwork (PDF, PNG)',
                          'Editable Master Source Files (PSD / AI / EPS)',
                          'Social Media & WhatsApp Optimized Promotional Formats',
                        ],
                        turnaroundLabel: 'Express Priority (24–48 Hours)',
                      })
                    }
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Order This Service → Contact</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div
              whileHover={{ y: -4 }}
              className={`p-7 rounded-2xl border flex flex-col justify-between transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-800 hover:border-amber-500/50'
                  : 'bg-white border-slate-200 hover:border-amber-500'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono-tabular font-semibold text-amber-500">
                    PILLAR 02 · DOCUMENT ADMINISTRATION
                  </span>
                  <FileSpreadsheet className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Flawless MS Word Documentation & Excel Databases
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-4 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  Advanced MS Word formatting for academic theses, corporate reports, and grant proposals alongside automated MS Excel databases, financial KPI dashboards, and boardroom PowerPoint decks.
                </p>

                <div
                  className={`p-4 rounded-xl border mb-6 ${
                    isDark
                      ? 'bg-slate-950/60 border-slate-800'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-[11px] font-mono-tabular font-semibold text-amber-500 uppercase mb-2.5">
                    What You Get In Your Handover Package:
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    {[
                      'Automated Dynamic Table of Contents',
                      'Roman & Arabic Section Page Numbering',
                      'APA / Harvard / Corporate Style Sheets',
                      'Automated Excel Formulas & Dashboards',
                      'Executive Slide Master PowerPoint Decks',
                      'Editable DOCX / XLSX + Locked PDF/A',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-800/40 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="text-xs font-semibold text-amber-500 hover:underline cursor-pointer"
                >
                  Inspect Document Services →
                </button>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => onSelectServiceForQuote('document')}
                    className={`px-3.5 py-2 rounded-lg border font-semibold text-xs transition-colors cursor-pointer ${
                      isDark
                        ? 'border-slate-700 hover:bg-slate-800 text-slate-200'
                        : 'border-slate-300 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    Configure Scope
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onDirectOrderToContact({
                        serviceName: 'Editing & Formatting Document',
                        packageTitle: 'Executive MS Word Formatting & Excel Database Administration',
                        deliverables: [
                          'Automated Table of Contents, List of Figures & Tables',
                          'Strict Academic or Corporate Typography & Margin Compliance',
                          'Clean Editable DOCX / XLSX Master + Print-Ready PDF',
                        ],
                        turnaroundLabel: 'Standard Turnaround (3–5 Days)',
                      })
                    }
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Order This Service → Contact</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED WORK SPOTLIGHT (3 Marquee Case Studies with Link to Full Portfolio Page) */}
      <section className="py-16 sm:py-20 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-xs font-semibold tracking-wider text-amber-500 mb-2">
                03. Featured Studio Works
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Recent Deliverables Across Accra, Kasoa & Remote
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('portfolio')}
              className="px-5 py-2.5 rounded-xl border border-amber-500/50 hover:bg-amber-500 hover:text-slate-950 text-amber-500 font-bold text-xs transition-colors flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <span>Browse All 9 Portfolio Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {featuredItems.map((item, idx) => {
              const hasImgError = brokenPortfolioImgs[item.id];
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  whileHover={{ y: -5 }}
                  onClick={() => onOpenPortfolioModal(item)}
                  className={`group rounded-2xl border overflow-hidden flex flex-col justify-between transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-slate-900/90 border-slate-800 hover:border-amber-500/60'
                      : 'bg-white border-slate-200 hover:border-amber-500'
                  }`}
                >
                  <div>
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-950">
                      {!hasImgError ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setBrokenPortfolioImgs((prev) => ({
                              ...prev,
                              [item.id]: true,
                            }))
                          }
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 to-slate-950">
                          <Layers className="w-10 h-10 text-amber-500 mb-2" />
                          <span className="text-xs font-semibold text-white">
                            {item.title}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
                        <span className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg">
                          <Eye className="w-4 h-4" />
                          <span>View Demo & Spec</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div
                        className={`flex items-center gap-2 text-xs mb-2 ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        <span className="text-amber-500 font-medium">
                          {item.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{item.location}</span>
                      </div>
                      <h3 className="text-lg font-bold tracking-tight group-hover:text-amber-500 transition-colors">
                        {item.title}
                      </h3>
                      <p
                        className={`text-xs leading-relaxed mt-2 line-clamp-2 ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`px-6 py-3.5 border-t flex items-center justify-between text-xs ${
                      isDark
                        ? 'border-slate-800/80 bg-slate-950/40'
                        : 'border-slate-100 bg-slate-50/70'
                    }`}
                  >
                    <span className="font-mono-tabular font-semibold text-emerald-500 truncate pr-2">
                      {item.outcomeMetric}
                    </span>
                    <span className="font-semibold text-amber-500 whitespace-nowrap shrink-0">
                      Inspect →
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
