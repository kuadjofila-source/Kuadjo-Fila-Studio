import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Layers, ArrowRight } from 'lucide-react';
import {
  PORTFOLIO_ITEMS,
  PortfolioCategory,
  PortfolioItem
} from '../data/studioData';
import { AppPage } from './HomePage';

const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  'All',
  'Visual Graphics',
  'Print & Souvenirs',
  'Word & Reports',
  'Excel & Presentations',
];

interface PortfolioPageProps {
  isDark: boolean;
  onOpenPortfolioModal: (item: PortfolioItem) => void;
  onNavigate: (page: AppPage) => void;
  brokenPortfolioImgs: Record<string, boolean>;
  setBrokenPortfolioImgs: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  isDark,
  onOpenPortfolioModal,
  onNavigate,
  brokenPortfolioImgs,
  setBrokenPortfolioImgs,
}) => {
  const [activePortfolioFilter, setActivePortfolioFilter] =
    useState<PortfolioCategory>('All');

  const filteredPortfolio =
    activePortfolioFilter === 'All'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activePortfolioFilter);

  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header & Category Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-800/60 pb-10"
        >
          <div>
            <p className="text-xs font-semibold tracking-wider text-amber-500 mb-2">
              STUDIO ARCHIVE & INTERACTIVE CASE STUDIES
            </p>
            <h1
              className="text-3xl sm:text-5xl font-bold tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Realistic Studio Deliverables & Case Studies
            </h1>
            <p
              className={`mt-3 text-base max-w-2xl ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Explore our work across brand identities, t-shirts & souvenirs, certificates, music cover arts, MS Word theses, and Excel databases. Click any sample to launch the interactive demo and Before/After inspection.
            </p>
          </div>

          {/* Filterable Gallery Tabs (Functional Segmented Control) */}
          <div
            role="tablist"
            aria-label="Filter Portfolio by Category"
            className={`flex flex-wrap items-center gap-1 p-1.5 rounded-xl border self-start lg:self-auto ${
              isDark
                ? 'bg-slate-900 border-slate-800'
                : 'bg-slate-100 border-slate-200'
            }`}
          >
            {PORTFOLIO_CATEGORIES.map((category) => {
              const isActive = activePortfolioFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActivePortfolioFilter(category)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Animated Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filteredPortfolio.map((item, idx) => {
              const hasImgError = brokenPortfolioImgs[item.id];
              return (
                <motion.article
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.28, delay: idx * 0.04 }}
                  whileHover={{ y: -5 }}
                  onClick={() => onOpenPortfolioModal(item)}
                  className={`group rounded-2xl border overflow-hidden flex flex-col justify-between transition-colors duration-200 cursor-pointer ${
                    isDark
                      ? 'bg-slate-900/90 border-slate-800 hover:border-amber-500/60'
                      : 'bg-white border-slate-200 hover:border-amber-500'
                  }`}
                >
                  <div>
                    {/* Image Container with Hover Light-Up "View Demo" Trigger */}
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

                      {/* Hover Light-Up "View Demo" Overlay */}
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
                        <span className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transform translate-y-1 group-hover:translate-y-0 transition-transform duration-200">
                          <Eye className="w-4 h-4" />
                          <span>View Demo & Spec</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
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
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">{item.turnaround}</span>
                      </div>

                      <h2 className="text-lg font-bold tracking-tight group-hover:text-amber-500 transition-colors">
                        {item.title}
                      </h2>

                      <p
                        className={`text-xs leading-relaxed mt-2 line-clamp-2 ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  {/* Quantified Proof Footer inside Card */}
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
                      View Demo →
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA to Calculator */}
        <div
          className={`p-8 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
            isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200'
          }`}
        >
          <div>
            <h3 className="text-lg font-bold">
              Seen a sample that matches your vision?
            </h3>
            <p
              className={`text-xs mt-1 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Configure your project scope and book your 24–48 hour studio slot in Accra (New Bortianor & Tudu), Kasoa, or remotely.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('calculator')}
            className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer whitespace-nowrap"
          >
            <span>Configure Project Scope</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
