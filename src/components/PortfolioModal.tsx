import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  ArrowUpRight,
  MessageSquare,
  Mail,
  FileText,
  Layers,
  BarChart3,
  Layout,
  Sparkles,
  Download
} from 'lucide-react';
import { PortfolioItem, CONTACT_INFO } from '../data/studioData';

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onSelectForQuote: (categoryName: string, projectTitle: string) => void;
  isDark: boolean;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  item,
  onClose,
  onSelectForQuote,
  isDark,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'interactive'>('overview');
  const [imgError, setImgError] = useState(false);
  const [beforeAfterMode, setBeforeAfterMode] = useState<'after' | 'before'>('after');

  useEffect(() => {
    setActiveTab('overview');
    setImgError(false);
    setBeforeAfterMode('after');
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  const whatsappText = encodeURIComponent(
    `Hello Kuadjo! I just viewed your "${item.title}" sample in the portfolio and I'd like to discuss a similar ${item.category} project.`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border transition-colors ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        } shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div
          className={`sticky top-0 z-20 flex items-center justify-between gap-4 px-6 py-4 border-b backdrop-blur-md ${
            isDark
              ? 'bg-slate-900/95 border-slate-800'
              : 'bg-white/95 border-slate-200'
          }`}
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-amber-500 font-medium">
              <span>{item.category}</span>
              <span aria-hidden="true">·</span>
              <span>{item.location}</span>
              <span aria-hidden="true">·</span>
              <span>Delivered in {item.turnaround}</span>
            </div>
            <h3
              id="modal-project-title"
              className="text-lg sm:text-xl font-bold tracking-tight truncate mt-0.5"
            >
              {item.title}
            </h3>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Segmented Mode Switch inside Modal */}
            <div
              className={`hidden sm:flex items-center p-1 rounded-lg border ${
                isDark
                  ? 'bg-slate-950 border-slate-800'
                  : 'bg-slate-100 border-slate-200'
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'overview'
                    ? 'bg-amber-500 text-slate-950'
                    : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Visual Case Study
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('interactive')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'interactive'
                    ? 'bg-amber-500 text-slate-950'
                    : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Interactive Spec & Before/After
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close demo modal"
              className={`p-2 rounded-lg border transition-colors ${
                isDark
                  ? 'border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex sm:hidden px-6 pt-4">
          <div
            className={`flex w-full p-1 rounded-lg border ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'overview'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-500'
              }`}
            >
              Visual Case Study
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('interactive')}
              className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'interactive'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-500'
              }`}
            >
              Interactive Spec
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {activeTab === 'overview' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 7 cols: High-Res Visual */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl border border-slate-800/40 bg-slate-950">
                  {!imgError ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/30">
                      <Layers className="w-12 h-12 text-amber-500 mb-3" />
                      <p className="text-base font-semibold text-white">{item.title}</p>
                      <p className="text-xs text-slate-400 mt-1">{item.category} Preview</p>
                    </div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-200">
                      Client: {item.client}
                    </span>
                    <span className="text-xs font-mono-tabular font-semibold text-amber-400">
                      {item.outcomeMetric}
                    </span>
                  </div>
                </div>

                {/* Challenge & Solution Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div
                    className={`p-4 rounded-xl border ${
                      isDark
                        ? 'bg-slate-950/60 border-slate-800/80'
                        : 'bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <p className="text-xs font-semibold text-amber-500 mb-1.5">
                      01. The Client Challenge
                    </p>
                    <p
                      className={`text-sm leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {item.challenge}
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-xl border ${
                      isDark
                        ? 'bg-slate-950/60 border-slate-800/80'
                        : 'bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <p className="text-xs font-semibold text-amber-500 mb-1.5">
                      02. Studio Execution
                    </p>
                    <p
                      className={`text-sm leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right 5 cols: Deliverables & Direct Conversion */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs font-mono-tabular text-amber-500 mb-2">
                    VERIFIED OUTCOME · {item.year}
                  </div>
                  <div
                    className={`text-xl font-bold tracking-tight mb-4 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {item.outcomeMetric}
                  </div>
                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {item.summary}
                  </p>

                  <div
                    className={`pt-5 border-t ${
                      isDark ? 'border-slate-800' : 'border-slate-200'
                    }`}
                  >
                    <h4 className="text-xs font-semibold tracking-wider text-slate-400 mb-3">
                      Included Deliverables & Specifications
                    </h4>
                    <ul className="space-y-2.5">
                      {item.deliverables.map((deliv, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-sm">
                          <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                            {deliv}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Block */}
                <div
                  className={`p-5 rounded-xl border space-y-3 ${
                    isDark
                      ? 'bg-slate-950 border-slate-800'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                      Typical Turnaround
                    </span>
                    <span className="font-mono-tabular font-semibold text-amber-500">
                      {item.turnaround} (Accra / Kasoa / Remote)
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectForQuote(item.category, item.title);
                      onClose();
                    }}
                    className="w-full py-3 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span>Calculate Quote for Similar Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <a
                      href={`${CONTACT_INFO.whatsappBase}?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Order via WhatsApp</span>
                    </a>
                    <a
                      href={`mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
                        `Project Inquiry: Similar to ${item.title}`
                      )}`}
                      className={`py-2.5 px-3 rounded-lg border font-medium text-xs transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap ${
                        isDark
                          ? 'border-slate-700 hover:bg-slate-800 text-slate-200'
                          : 'border-slate-300 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email Brief</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Interactive Transformation Inspection View */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/40">
                <div>
                  <h4 className="text-base font-bold">
                    Before & After Quality Inspection
                  </h4>
                  <p
                    className={`text-xs mt-0.5 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Toggle between the raw client submission and the finished studio master deliverable.
                  </p>
                </div>

                <div
                  className={`inline-flex p-1 rounded-lg border self-start ${
                    isDark
                      ? 'bg-slate-950 border-slate-800'
                      : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setBeforeAfterMode('before')}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                      beforeAfterMode === 'before'
                        ? 'bg-rose-600 text-white'
                        : isDark
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Raw Client Draft (Before)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBeforeAfterMode('after')}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                      beforeAfterMode === 'after'
                        ? 'bg-amber-500 text-slate-950'
                        : isDark
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Finished Studio Master (After)
                  </button>
                </div>
              </div>

              {beforeAfterMode === 'before' ? (
                <div
                  className={`p-6 sm:p-8 rounded-xl border font-mono text-xs space-y-4 ${
                    isDark
                      ? 'bg-slate-950 border-rose-900/50 text-slate-400'
                      : 'bg-slate-50 border-rose-200 text-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between text-rose-500 font-semibold border-b border-rose-500/20 pb-2">
                    <span>DIAGNOSTIC AUDIT: RAW UNFORMATTED SUBMISSION</span>
                    <span>ISSUES DETECTED: 14</span>
                  </div>
                  {item.interactivePreviewType === 'document' && (
                    <div className="space-y-3 leading-relaxed">
                      <p className="text-rose-400">
                        [!] Broken Table of Contents: Manual dots "..........." instead of dynamic tab leaders.
                      </p>
                      <p>
                        CHAPTER 1 INTRODUCTION (Inconsistent Times New Roman 14pt bold mixed with Calibri 11pt)
                      </p>
                      <p className="pl-6">
                        1.1 Background... Page numbers restart randomly on page 14 due to corrupted section break. Regression table overflows right margin by 2.4 inches.
                      </p>
                    </div>
                  )}
                  {item.interactivePreviewType === 'dashboard' && (
                    <div className="space-y-3 leading-relaxed">
                      <p className="text-rose-400">
                        [!] Hardcoded #REF! and #VALUE! errors across 8 regional Kasoa/Tema sheets.
                      </p>
                      <p>
                        Raw unformatted CSV dump: 14,200 rows with merged cells blocking PivotTable refresh and zero visual hierarchy for board presentation.
                      </p>
                    </div>
                  )}
                  {(item.interactivePreviewType === 'brand' ||
                    item.interactivePreviewType === 'flyer') && (
                    <div className="space-y-3 leading-relaxed">
                      <p className="text-rose-400">
                        [!] Low-resolution 72 DPI WhatsApp compressed JPEG logo with pixelated white background box.
                      </p>
                      <p>
                        Cluttered flyer layout with 6 competing fonts, low contrast text over busy background, and missing CMYK print bleed margins.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className={`p-6 sm:p-8 rounded-xl border space-y-5 ${
                    isDark
                      ? 'bg-slate-950 border-amber-500/40'
                      : 'bg-amber-50/30 border-amber-300'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
                    <span className="text-xs font-semibold text-amber-500">
                      STUDIO QUALITY ASSURANCE PASSED · 100% PRINT & DIGITAL READY
                    </span>
                    <span className="text-xs font-mono-tabular text-emerald-500 font-semibold">
                      Outcome: {item.outcomeMetric}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      className={`p-4 rounded-lg border ${
                        isDark
                          ? 'bg-slate-900 border-slate-800'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="text-xs text-slate-400 mb-1">Typography & Grid</div>
                      <div className="text-sm font-semibold">
                        Strict Baseline & Automated Hierarchy
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Every heading, table cell, and visual callout locked to a mathematical grid.
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-lg border ${
                        isDark
                          ? 'bg-slate-900 border-slate-800'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="text-xs text-slate-400 mb-1">File Architecture</div>
                      <div className="text-sm font-semibold">
                        Editable Source + Locked Print Master
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Delivered with clean layers, dynamic formulas, and zero broken references.
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-lg border ${
                        isDark
                          ? 'bg-slate-900 border-slate-800'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="text-xs text-slate-400 mb-1">Delivery Speed</div>
                      <div className="text-sm font-semibold font-mono-tabular">
                        Completed in {item.turnaround}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Direct WhatsApp milestone previews and rapid iteration for Accra & Kasoa teams.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
