import React from 'react';
import { motion } from 'motion/react';
import {
  Layers,
  FileSpreadsheet,
  ArrowRight,
  MessageSquare,
  ShoppingBag,
  Check
} from 'lucide-react';
import { CONTACT_INFO, ServiceOption } from '../data/studioData';
import { AppPage, DirectOrderSelection } from './HomePage';

interface ServicesPageProps {
  isDark: boolean;
  onSelectServiceForQuote: (serviceId: ServiceOption['id']) => void;
  onDirectOrderToContact: (selection: DirectOrderSelection) => void;
  onNavigate: (page: AppPage) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  isDark,
  onSelectServiceForQuote,
  onDirectOrderToContact,
  onNavigate,
}) => {
  const visualDesignPackages = [
    {
      title: 'Brand Logos, Call Cards, Business Cards & Letterheads',
      desc: 'Complete corporate identity systems, executive stationery, and custom brand guidelines.',
      serviceName: 'Full Branding Package',
      calcId: 'branding' as const,
      turnaroundLabel: 'Standard Turnaround (3–5 Days)',
      deliverables: [
        'Primary & Secondary Vector Logo Suite (AI, EPS, PDF, PNG)',
        'Double-Sided Call / Business Card & Official Company Letterhead',
        'Brand Color Codes, Typography System & 3D Mockup Presentation',
      ],
    },
    {
      title: 'Stickers, Banners, Posters & Promotional Flyers',
      desc: 'High-converting marketing flyers, large roll-up banners, and die-cut product stickers.',
      serviceName: 'Graphic Designing',
      calcId: 'flyer' as const,
      turnaroundLabel: 'Express Priority (24–48 Hours)',
      deliverables: [
        '300 DPI CMYK Print-Ready Master File with Bleed Marks',
        'Instagram, Facebook & WhatsApp Status Web-Optimized Versions',
        'Editable Source File (PSD / AI) & Fast Revisions',
      ],
    },
    {
      title: 'T-Shirt Printing, Souvenirs & Custom Event Merch',
      desc: 'Branded corporate apparel, mugs, lanyards, and promotional souvenir mockups & print files.',
      serviceName: 'T-Shirt, Souvenirs & Merch',
      calcId: 'flyer' as const,
      turnaroundLabel: 'Standard Turnaround (3–5 Days)',
      deliverables: [
        'Color-Separated Vector Artwork for Screen Printing / Embroidery',
        'Realistic T-Shirt, Polo, Mug & Souvenir Placement Previews',
        'Print-Ready Production Spec Sheet for Immediate Manufacturing',
      ],
    },
    {
      title: 'Certificates, Wedding/Gala Invitations & Music Cover Arts',
      desc: 'Embossed certificates of honour, bespoke invitation cards, and streaming-ready music cover arts.',
      serviceName: 'Certificates & Event Invitations',
      calcId: 'flyer' as const,
      turnaroundLabel: 'Express Priority (24–48 Hours)',
      deliverables: [
        'Gold-Foil / Emboss-Ready Certificate or Invitation Layout',
        '3000×3000px DSP-Compliant Artwork (Spotify, Apple Music, Boomplay)',
        'High-Resolution Print PDF + Digital Sharing Formats',
      ],
    },
  ];

  const documentPackages = [
    {
      title: 'Advanced MS Word Editing & Formatting (Theses, Reports, Proposals)',
      desc: 'Automated Table of Contents, List of Figures/Tables, Roman/Arabic section breaks, and APA/Harvard compliance.',
      serviceName: 'Editing & Formatting Document',
      calcId: 'document' as const,
      turnaroundLabel: 'Standard Turnaround (3–5 Days)',
      deliverables: [
        'Automated Dynamic Table of Contents, List of Tables & Figures',
        'Front-Matter Roman Numerals (i, ii, iii) & Main Body Arabic Pages (1, 2, 3)',
        'Consistent Heading Hierarchy, Margins & Editable DOCX + PDF/A',
      ],
    },
    {
      title: 'Corporate Documentation, Forms, BoQs & Letterheads',
      desc: 'Locked company letterheads, official contracts, certificates, and standardized SOP manuals.',
      serviceName: 'Editing & Formatting Document',
      calcId: 'document' as const,
      turnaroundLabel: 'Express Priority (24–48 Hours)',
      deliverables: [
        'Branded MS Word Template (.dotx / .docx) with Locked Header/Footer',
        'Clean Structured Tables, Clause Numbering & Signature Blocks',
        'Ready-to-Print PDF & Reusable Office Master File',
      ],
    },
    {
      title: 'MS Excel Databases, Data Dashboards & Spreadsheets',
      desc: 'Automated client/inventory databases, dynamic KPI dashboards, XLOOKUP formulas, and clean print layouts.',
      serviceName: 'Excel Database & Dashboard',
      calcId: 'excel' as const,
      turnaroundLabel: 'Standard Turnaround (3–5 Days)',
      deliverables: [
        'Validated Data Entry Sheets with Drop-Down Lists & Error Alerts',
        'Automated Formulas (XLOOKUP, SUMIFS, INDEX/MATCH) & Pivot Charts',
        'Interactive Executive KPI Dashboard & A4 Landscape Print Setup',
      ],
    },
    {
      title: 'High-Impact PowerPoint Presentations',
      desc: 'Investor pitch decks, AGM boardroom presentations, custom slide masters, and clear data visualizations.',
      serviceName: 'Excel Database & Dashboard',
      calcId: 'excel' as const,
      turnaroundLabel: 'Express Priority (24–48 Hours)',
      deliverables: [
        '16:9 Widescreen Custom Branded Slide Master & Layouts',
        'Executive Infographics, Financial Charts & Clean Visual Hierarchy',
        'Editable PPTX Deck + High-Resolution Presentation PDF',
      ],
    },
  ];

  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-800/60 pb-10"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wider text-amber-500 mb-2">
              STUDIO SERVICE CATALOG & DELIVERABLES BREAKDOWN
            </p>
            <h1
              className="text-3xl sm:text-5xl font-bold tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              See Exactly What You Get & Place Your Order
            </h1>
            <p
              className={`mt-4 text-base sm:text-lg leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Operating across Accra (New Bortianor & Tudu), Kasoa, Jei-Krodua (Central Region), and remotely worldwide. Inspect the exact deliverables included with each service below and click <strong>Place Order via Contact</strong> to start immediately.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                onDirectOrderToContact({
                  serviceName: 'Graphic Designing',
                  packageTitle: 'Custom Studio Project Order',
                  deliverables: [
                    '1-on-1 Project Consultation & Scope Confirmation',
                    'High-Resolution Draft Previews Within 24–48 Hours',
                    'Full Print-Ready & Editable Master Deliverables',
                  ],
                  turnaroundLabel: 'Express Priority (24–48 Hours)',
                })
              }
              className="py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/15"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Place Order via Contact</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('calculator')}
              className={`py-3 px-5 rounded-xl border font-semibold text-xs sm:text-sm transition-colors cursor-pointer ${
                isDark
                  ? 'border-slate-700 hover:bg-slate-900 text-slate-200'
                  : 'border-slate-300 hover:bg-slate-100 text-slate-800'
              }`}
            >
              Configure Scope in Calculator
            </button>
          </div>
        </motion.div>

        {/* Two Main Service Divisions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Category 1: Brand & Visual Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`lg:col-span-6 p-7 sm:p-9 rounded-2xl border flex flex-col justify-between transition-colors ${
              isDark
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-800/50">
                <div>
                  <span className="text-xs font-mono-tabular text-amber-500 font-semibold">
                    CATEGORY 01 · BRAND, PRINT & VISUAL DESIGN
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold mt-1">
                    Eye-Catching Visuals That Sell
                  </h2>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                  <Layers className="w-6 h-6" />
                </div>
              </div>

              <p
                className={`text-sm leading-relaxed mb-6 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Distinctive brand identities, print collateral, and custom event souvenirs engineered to turn heads in Accra (New Bortianor & Tudu), Kasoa, Jei-Krodua, and across social media.
              </p>

              <div className="space-y-4 mb-8">
                {visualDesignPackages.map((srv, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-xl border transition-colors ${
                      isDark
                        ? 'bg-slate-950/60 border-slate-800/80 hover:border-amber-500/40'
                        : 'bg-slate-50 border-slate-200/80 hover:border-amber-500'
                    }`}
                  >
                    <div className="flex flex-col justify-between gap-3">
                      <div>
                        <h3 className="text-sm sm:text-base font-bold">{srv.title}</h3>
                        <p
                          className={`text-xs mt-1 ${
                            isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        >
                          {srv.desc}
                        </p>
                      </div>

                      {/* What You Get Deliverables List */}
                      <div
                        className={`pt-3 mt-1 border-t ${
                          isDark ? 'border-slate-800/70' : 'border-slate-200/80'
                        }`}
                      >
                        <div className="text-[11px] font-mono-tabular font-semibold text-amber-500 mb-2">
                          WHAT YOU GET WITH THIS ORDER:
                        </div>
                        <ul className="space-y-1.5 text-xs mb-4">
                          {srv.deliverables.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => onSelectServiceForQuote(srv.calcId)}
                            className={`text-xs font-semibold hover:text-amber-500 transition-colors cursor-pointer ${
                              isDark ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            Configure in Calculator →
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              onDirectOrderToContact({
                                serviceName: srv.serviceName,
                                packageTitle: srv.title,
                                deliverables: srv.deliverables,
                                turnaroundLabel: srv.turnaroundLabel,
                              })
                            }
                            className="py-2 px-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Place Order via Contact</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/40 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono-tabular text-slate-400">
                Formats: PSD · AI · EPS · PDF · PNG
              </span>
              <button
                type="button"
                onClick={() =>
                  onDirectOrderToContact({
                    serviceName: 'Graphic Designing',
                    packageTitle: 'Complete Brand & Visual Design Order',
                    deliverables: [
                      '300 DPI CMYK Print-Ready Master Artwork',
                      'Editable Vector & Source Files (AI, PSD, PDF)',
                      'Social Media Promotional Sizes Included',
                    ],
                    turnaroundLabel: 'Express Priority (24–48 Hours)',
                  })
                }
                className="py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors whitespace-nowrap inline-flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Order Graphic Design Now</span>
              </button>
            </div>
          </motion.div>

          {/* Category 2: Professional Document Administration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className={`lg:col-span-6 p-7 sm:p-9 rounded-2xl border flex flex-col justify-between transition-colors ${
              isDark
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-800/50">
                <div>
                  <span className="text-xs font-mono-tabular text-amber-500 font-semibold">
                    CATEGORY 02 · PROFESSIONAL DOCUMENT ADMINISTRATION
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold mt-1">
                    Flawless & Corporate-Ready Documents
                  </h2>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
              </div>

              <p
                className={`text-sm leading-relaxed mb-6 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Eliminate broken page numbers, messy spreadsheets, and unconvincing slide decks. We edit, format, and structure executive-ready MS Office documents that pass strict scrutiny.
              </p>

              <div className="space-y-4 mb-8">
                {documentPackages.map((srv, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-xl border transition-colors ${
                      isDark
                        ? 'bg-slate-950/60 border-slate-800/80 hover:border-amber-500/40'
                        : 'bg-slate-50 border-slate-200/80 hover:border-amber-500'
                    }`}
                  >
                    <div className="flex flex-col justify-between gap-3">
                      <div>
                        <h3 className="text-sm sm:text-base font-bold">{srv.title}</h3>
                        <p
                          className={`text-xs mt-1 ${
                            isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        >
                          {srv.desc}
                        </p>
                      </div>

                      {/* What You Get Deliverables List */}
                      <div
                        className={`pt-3 mt-1 border-t ${
                          isDark ? 'border-slate-800/70' : 'border-slate-200/80'
                        }`}
                      >
                        <div className="text-[11px] font-mono-tabular font-semibold text-amber-500 mb-2">
                          WHAT YOU GET WITH THIS ORDER:
                        </div>
                        <ul className="space-y-1.5 text-xs mb-4">
                          {srv.deliverables.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => onSelectServiceForQuote(srv.calcId)}
                            className={`text-xs font-semibold hover:text-amber-500 transition-colors cursor-pointer ${
                              isDark ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            Configure in Calculator →
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              onDirectOrderToContact({
                                serviceName: srv.serviceName,
                                packageTitle: srv.title,
                                deliverables: srv.deliverables,
                                turnaroundLabel: srv.turnaroundLabel,
                              })
                            }
                            className="py-2 px-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Place Order via Contact</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/40 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono-tabular text-slate-400">
                Formats: DOCX · XLSX · PPTX · PDF/A
              </span>
              <button
                type="button"
                onClick={() =>
                  onDirectOrderToContact({
                    serviceName: 'Editing & Formatting Document',
                    packageTitle: 'Executive Document Formatting & Excel Database Order',
                    deliverables: [
                      'Automated TOC, Figures/Tables & Section Numbering',
                      'Clean Editable DOCX / XLSX + Print-Ready PDF',
                      '24–48 Hour Fast Turnaround Guarantee',
                    ],
                    turnaroundLabel: 'Standard Turnaround (3–5 Days)',
                  })
                }
                className="py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors whitespace-nowrap inline-flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Order Document Service Now</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Studio Production Workflow Banner */}
        <div
          className={`p-8 rounded-2xl border ${
            isDark
              ? 'bg-slate-950 border-slate-800'
              : 'bg-slate-100 border-slate-200'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-mono-tabular text-amber-500 font-semibold">
                HOW WE DELIVER IN 24–48 HOURS
              </span>
              <h3 className="text-xl font-bold mt-1">
                Streamlined 3-Step Client Execution Process
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Proceed to Order Form</span>
              </button>
              <a
                href={`${CONTACT_INFO.whatsappBase}?text=${encodeURIComponent(
                  'Hello Kuadjo! I have a question about your services and turnaround speed.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat With Studio on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01. Share Your Brief or Raw File',
                detail:
                  'Send your unformatted MS Word draft, Excel data, or design concept via our Contact Order Form, WhatsApp, or Email.',
              },
              {
                step: '02. Live Studio Draft & Review',
                detail:
                  'Receive high-resolution visual previews or structured document proofs within 24 hours for fast feedback and precision revisions.',
              },
              {
                step: '03. Final Master Handover',
                detail:
                  'Download your print-ready CMYK PDFs, vector logos, editable DOCX templates, or automated XLSX databases ready for immediate use.',
              },
            ].map((w) => (
              <div
                key={w.step}
                className={`p-5 rounded-xl border ${
                  isDark
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-sm font-bold text-amber-500 mb-2">
                  {w.step}
                </div>
                <p
                  className={`text-xs leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {w.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
