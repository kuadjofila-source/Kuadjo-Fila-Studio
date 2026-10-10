/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Sun,
  Moon,
  ArrowUp,
  Phone,
  Mail,
  Menu,
  X
} from 'lucide-react';
import {
  CONTACT_INFO,
  PortfolioItem,
  ServiceOption
} from './data/studioData';
import { CostCalculator } from './components/CostCalculator';
import { PortfolioModal } from './components/PortfolioModal';
import { ContactOrderForm } from './components/ContactOrderForm';
import { HomePage, AppPage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';

const NAV_ITEMS: { id: AppPage; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'calculator', label: 'Calculator' },
  { id: 'contact', label: 'Contact' },
];

export default function App() {
  const [activePage, setActivePage] = useState<AppPage>('home');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedPortfolioItem, setSelectedPortfolioItem] =
    useState<PortfolioItem | null>(null);
  const [calculatorServiceId, setCalculatorServiceId] =
    useState<ServiceOption['id']>('flyer');
  const [prefillContactData, setPrefillContactData] = useState<{
    serviceName: string;
    urgencyLabel: string;
    estimatedRange: string;
    notes: string;
  } | null>(null);
  const [heroImgError, setHeroImgError] = useState<boolean>(false);
  const [brokenPortfolioImgs, setBrokenPortfolioImgs] = useState<
    Record<string, boolean>
  >({});

  // Sync URL hash for multi-page browser history support
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '') as AppPage;
      if (['home', 'services', 'portfolio', 'calculator', 'contact'].includes(rawHash)) {
        setActivePage(rawHash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToPage = (page: AppPage) => {
    setMobileMenuOpen(false);
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceForCalculator = (serviceId: ServiceOption['id']) => {
    setCalculatorServiceId(serviceId);
    navigateToPage('calculator');
  };

  const handlePortfolioModalToQuote = (
    categoryName: string,
    projectTitle: string
  ) => {
    if (categoryName === 'Word & Reports') {
      setCalculatorServiceId('document');
    } else if (categoryName === 'Excel & Presentations') {
      setCalculatorServiceId('excel');
    } else if (
      projectTitle.toLowerCase().includes('flyer') ||
      projectTitle.toLowerCase().includes('certificate') ||
      projectTitle.toLowerCase().includes('cover art')
    ) {
      setCalculatorServiceId('flyer');
    } else {
      setCalculatorServiceId('branding');
    }
    navigateToPage('calculator');
  };

  const handlePrefillFromCalculator = (summary: {
    serviceName: string;
    urgencyLabel: string;
    estimatedRange: string;
    notes: string;
  }) => {
    setPrefillContactData(summary);
    navigateToPage('contact');
  };

  const heroWhatsAppUrl = `${CONTACT_INFO.whatsappBase}?text=${encodeURIComponent(
    "Hello Kuadjo! I'm visiting your Kuadjo Fila Studio website and would like to discuss a graphic design, print/souvenir, or document formatting project."
  )}`;

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        isDark
          ? 'bg-[#0F172A] text-slate-100 selection:bg-amber-500 selection:text-slate-950'
          : 'bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-slate-950'
      }`}
    >
      {/* 1. STICKY GLASSMORPHISM TOP NAVIGATION (Strict 3-Zone Contract) */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
          isDark
            ? 'bg-[#0F172A]/85 border-slate-800/80'
            : 'bg-white/85 border-slate-200/90'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single Text Element Wordmark */}
          <button
            type="button"
            onClick={() => navigateToPage('home')}
            className={`text-lg font-bold tracking-tight whitespace-nowrap shrink-0 cursor-pointer ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Kuadjo Fila Studio
          </button>

          {/* Zone 2: 5 Concise Single-Line Multi-Page Navigation Links */}
          <nav
            aria-label="Primary Multi-Page Navigation"
            className="hidden md:flex items-center gap-8 text-sm font-medium"
          >
            {NAV_ITEMS.map((item) => {
              const isCurrent = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateToPage(item.id)}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                    isCurrent
                      ? 'text-amber-500 font-bold underline underline-offset-8 decoration-2 decoration-amber-500'
                      : isDark
                      ? 'text-slate-300 hover:text-amber-400'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action (plus mobile menu button on small viewports) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigateToPage('calculator')}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Get Instant Quote
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className={`md:hidden p-2 rounded-lg border transition-colors ${
                isDark
                  ? 'border-slate-800 text-slate-200 hover:bg-slate-800'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className={`md:hidden border-t px-4 py-4 space-y-3 overflow-hidden ${
                isDark
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-col space-y-2 text-sm font-medium">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigateToPage(item.id)}
                    className={`text-left py-2 px-2 rounded-lg transition-colors ${
                      activePage === item.id
                        ? 'text-amber-500 font-bold bg-amber-500/10'
                        : 'hover:text-amber-500'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Regional & Theme Utility Bar (With Multi-Page Breadcrumb Indicator) */}
      <div
        className={`border-b ${
          isDark
            ? 'bg-slate-950/60 border-slate-800/70'
            : 'bg-slate-100/80 border-slate-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div
            className={`flex flex-wrap items-center gap-2 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            <button
              type="button"
              onClick={() => navigateToPage('home')}
              className="hover:text-amber-500 transition-colors cursor-pointer"
            >
              Kuadjo Fila Studio
            </button>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-amber-500 capitalize">
              {activePage === 'calculator' ? 'Cost Calculator' : activePage}
            </span>
            <span aria-hidden="true">·</span>
            <span className="hidden sm:inline">
              Accra, Kasoa, Jei-Krodua & Remote Worldwide
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className={`hidden sm:inline-flex items-center gap-1.5 font-mono-tabular font-semibold hover:text-amber-500 transition-colors ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{CONTACT_INFO.phoneDisplay}</span>
            </a>

            {/* Dark / Light Mode Toggle Switch */}
            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle Dark or Light Mode"
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-md border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400'
              }`}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MULTI-PAGE VIEWPORT ROUTER */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div
              key="page-home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              <HomePage
                isDark={isDark}
                onNavigate={navigateToPage}
                onSelectServiceForQuote={handleSelectServiceForCalculator}
                onOpenPortfolioModal={setSelectedPortfolioItem}
                heroImgError={heroImgError}
                setHeroImgError={setHeroImgError}
                brokenPortfolioImgs={brokenPortfolioImgs}
                setBrokenPortfolioImgs={setBrokenPortfolioImgs}
              />
            </motion.div>
          )}

          {activePage === 'services' && (
            <motion.div
              key="page-services"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              <ServicesPage
                isDark={isDark}
                onSelectServiceForQuote={handleSelectServiceForCalculator}
                onNavigate={navigateToPage}
              />
            </motion.div>
          )}

          {activePage === 'portfolio' && (
            <motion.div
              key="page-portfolio"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              <PortfolioPage
                isDark={isDark}
                onOpenPortfolioModal={setSelectedPortfolioItem}
                onNavigate={navigateToPage}
                brokenPortfolioImgs={brokenPortfolioImgs}
                setBrokenPortfolioImgs={setBrokenPortfolioImgs}
              />
            </motion.div>
          )}

          {activePage === 'calculator' && (
            <motion.div
              key="page-calculator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              <CostCalculator
                selectedServiceId={calculatorServiceId}
                onSelectServiceId={setCalculatorServiceId}
                onPrefillContactForm={handlePrefillFromCalculator}
                isDark={isDark}
              />
            </motion.div>
          )}

          {activePage === 'contact' && (
            <motion.div
              key="page-contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              <ContactOrderForm
                prefillData={prefillContactData}
                isDark={isDark}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* GLOBAL MULTI-PAGE FOOTER */}
      <footer
        className={`border-t transition-colors ${
          isDark
            ? 'bg-slate-950 border-slate-800 text-slate-400'
            : 'bg-slate-900 border-slate-800 text-slate-300'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Catchy Closing Statement Banner */}
          <div className="pb-12 mb-12 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-xs font-mono-tabular text-amber-400 mb-2">
                READY FOR IMMEDIATE DISPATCH IN ACCRA, KASOA, JEI-KRODUA & WORLDWIDE
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Ready to make your business look world-class? Let's talk today!
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={heroWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp +233 (0) 55 560 4924</span>
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="py-3.5 px-5 rounded-xl border border-slate-700 hover:bg-slate-800 text-white font-semibold text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>{CONTACT_INFO.email}</span>
              </a>
            </div>
          </div>

          {/* Regional Hubs & Multi-Page Directory */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80 text-xs">
            <div className="md:col-span-4 space-y-2">
              <div className="text-base font-bold text-white">
                Kuadjo Fila Studio
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed">
                For a quality and affordable graphic design & executive documentation: Stickers, Banners, Posters, Flyers, Call & Business Cards, Letterheads, Certificates, T-Shirts/Souvenirs, Logo Design, Invitations, Music Cover Arts, MS Word & Excel Databases.
              </p>
              <div className="pt-2 text-amber-400 font-medium">
                Unique · Clean · Professional · Affordable
              </div>
            </div>

            {/* Multi-Page Links Column */}
            <div className="md:col-span-2 space-y-2">
              <div className="text-white font-semibold mb-2">Pages</div>
              <ul className="space-y-1.5">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => navigateToPage(item.id)}
                      className={`hover:text-amber-400 transition-colors cursor-pointer ${
                        activePage === item.id
                          ? 'text-amber-400 font-semibold'
                          : 'text-slate-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3 space-y-2">
              <div className="text-white font-semibold mb-2">
                Regional Client Desks
              </div>
              <p className="text-slate-300">
                <strong className="text-white">Accra Desk:</strong> New Bortianor & Tudu
              </p>
              <p className="text-slate-300">
                <strong className="text-white">Kasoa & Central Region:</strong> Kasoa Central & Jei-Krodua Studio
              </p>
              <p className="text-slate-300">
                <strong className="text-white">Remote Worldwide:</strong> Instant WhatsApp & Email Delivery
              </p>
            </div>

            <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
              <div className="space-y-2 md:text-right">
                <div className="text-white font-semibold">Direct Contact</div>
                <a
                  href={`tel:${CONTACT_INFO.phoneRaw}`}
                  className="block font-mono-tabular text-slate-300 hover:text-amber-400"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="block font-mono-tabular text-slate-300 hover:text-amber-400"
                >
                  {CONTACT_INFO.email}
                </a>
                <div className="text-slate-400 pt-1">
                  Facebook: <strong className="text-white">KUADJO FILA STUDIO</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-800 bg-slate-900 hover:border-amber-500/50 text-white font-semibold text-xs transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Copyright Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © {new Date().getFullYear()} Kuadjo Fila Studio. All rights reserved.
            </div>
            <div className="flex items-center gap-2">
              <span>Accra</span>
              <span aria-hidden="true">·</span>
              <span>Kasoa</span>
              <span aria-hidden="true">·</span>
              <span>Jei-Krodua (Central Region)</span>
              <span aria-hidden="true">·</span>
              <span>Remote Worldwide</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Portfolio Demo Modal (Accessible from Home & Portfolio Pages) */}
      <PortfolioModal
        item={selectedPortfolioItem}
        onClose={() => setSelectedPortfolioItem(null)}
        onSelectForQuote={handlePortfolioModalToQuote}
        isDark={isDark}
      />
    </div>
  );
}
