import React from 'react';
import { motion } from 'motion/react';
import {
  Layers,
  FileSpreadsheet,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { CONTACT_INFO, ServiceOption } from '../data/studioData';
import { AppPage } from './HomePage';

interface ServicesPageProps {
  isDark: boolean;
  onSelectServiceForQuote: (serviceId: ServiceOption['id']) => void;
  onNavigate: (page: AppPage) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  isDark,
  onSelectServiceForQuote,
  onNavigate,
}) => {
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
              STUDIO SERVICE CATALOG & CAPABILITIES
            </p>
            <h1
              className="text-3xl sm:text-5xl font-bold tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Quality Graphic Design + Executive Documentation
            </h1>
            <p
              className={`mt-4 text-base sm:text-lg leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Operating across Accra (New Bortianor & Tudu), Kasoa, Jei-Krodua (Central Region), and remotely worldwide. Select any service below to configure your project scope and request an instant quote.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('calculator')}
              className="py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Configure Project Scope</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('portfolio')}
              className={`py-3 px-5 rounded-xl border font-semibold text-xs sm:text-sm transition-colors cursor-pointer ${
                isDark
                  ? 'border-slate-700 hover:bg-slate-900 text-slate-200'
                  : 'border-slate-300 hover:bg-slate-100 text-slate-800'
              }`}
            >
              View Portfolio Samples
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

              <div className="space-y-3.5 mb-8">
                {[
                  {
                    title: 'Brand Logos, Call Cards, Business Cards & Letterheads',
                    desc: 'Complete corporate identity systems, executive stationery, and custom brand guidelines.',
                    actionLabel: 'Select Service →',
                    calcId: 'branding' as const,
                  },
                  {
                    title: 'Stickers, Banners, Posters & Promotional Flyers',
                    desc: 'High-converting marketing flyers, large roll-up banners, and die-cut product stickers.',
                    actionLabel: 'Select Service →',
                    calcId: 'flyer' as const,
                  },
                  {
                    title: 'T-Shirt Printing, Souvenirs & Custom Event Merch',
                    desc: 'Branded corporate apparel, mugs, lanyards, and promotional souvenir mockups & print files.',
                    actionLabel: 'Select Service →',
                    calcId: 'flyer' as const,
                  },
                  {
                    title: 'Certificates, Wedding/Gala Invitations & Music Cover Arts',
                    desc: 'Embossed certificates of honour, bespoke invitation cards, and streaming-ready music cover arts.',
                    actionLabel: 'Select Service →',
                    calcId: 'flyer' as const,
                  },
                ].map((srv, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isDark
                        ? 'bg-slate-950/60 border-slate-800/80 hover:border-amber-500/40'
                        : 'bg-slate-50 border-slate-200/80 hover:border-amber-500'
                    }`}
                  >
                    <div>
                      <h3 className="text-sm font-bold">{srv.title}</h3>
                      <p
                        className={`text-xs mt-0.5 ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {srv.desc}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectServiceForQuote(srv.calcId)}
                      className="text-xs font-mono-tabular font-semibold text-amber-500 hover:text-amber-400 whitespace-nowrap shrink-0 self-start sm:self-center cursor-pointer"
                    >
                      {srv.actionLabel}
                    </button>
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
                onClick={() => onSelectServiceForQuote('flyer')}
                className="py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors whitespace-nowrap cursor-pointer"
              >
                Request Graphic Design Quote
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

              <div className="space-y-3.5 mb-8">
                {[
                  {
                    title: 'Advanced MS Word Editing & Formatting (Theses, Reports, Proposals)',
                    desc: 'Automated Table of Contents, List of Figures/Tables, Roman/Arabic section breaks, and APA/Harvard compliance.',
                    actionLabel: 'Select Service →',
                    calcId: 'document' as const,
                  },
                  {
                    title: 'Corporate Documentation, Forms, BoQs & Letterheads',
                    desc: 'Locked company letterheads, official contracts, certificates, and standardized SOP manuals.',
                    actionLabel: 'Select Service →',
                    calcId: 'document' as const,
                  },
                  {
                    title: 'MS Excel Databases, Data Dashboards & Spreadsheets',
                    desc: 'Automated client/inventory databases, dynamic KPI dashboards, XLOOKUP formulas, and clean print layouts.',
                    actionLabel: 'Select Service →',
                    calcId: 'excel' as const,
                  },
                  {
                    title: 'High-Impact PowerPoint Presentations',
                    desc: 'Investor pitch decks, AGM boardroom presentations, custom slide masters, and clear data visualizations.',
                    actionLabel: 'Select Service →',
                    calcId: 'excel' as const,
                  },
                ].map((srv, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isDark
                        ? 'bg-slate-950/60 border-slate-800/80 hover:border-amber-500/40'
                        : 'bg-slate-50 border-slate-200/80 hover:border-amber-500'
                    }`}
                  >
                    <div>
                      <h3 className="text-sm font-bold">{srv.title}</h3>
                      <p
                        className={`text-xs mt-0.5 ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {srv.desc}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectServiceForQuote(srv.calcId)}
                      className="text-xs font-mono-tabular font-semibold text-amber-500 hover:text-amber-400 whitespace-nowrap shrink-0 self-start sm:self-center cursor-pointer"
                    >
                      {srv.actionLabel}
                    </button>
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
                onClick={() => onSelectServiceForQuote('document')}
                className="py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors whitespace-nowrap cursor-pointer"
              >
                Request Document Editing Quote
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
            <a
              href={`${CONTACT_INFO.whatsappBase}?text=${encodeURIComponent(
                'Hello Kuadjo! I have a question about your services and turnaround speed.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-2 self-start md:self-auto"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat With Studio on WhatsApp</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01. Share Your Brief or Raw File',
                detail:
                  'Send your unformatted MS Word draft, Excel data, or design concept via WhatsApp or Email and pick your turnaround speed.',
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
