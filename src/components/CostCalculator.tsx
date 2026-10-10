import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  MessageSquare,
  Mail,
  Clock,
  Zap,
  ArrowRight,
  Copy,
  FileCheck2
} from 'lucide-react';
import { CALCULATOR_SERVICES, CONTACT_INFO, ServiceOption } from '../data/studioData';

interface CostCalculatorProps {
  selectedServiceId: ServiceOption['id'];
  onSelectServiceId: (id: ServiceOption['id']) => void;
  onPrefillContactForm: (summary: {
    serviceName: string;
    urgencyLabel: string;
    estimatedRange: string;
    notes: string;
  }) => void;
  isDark: boolean;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({
  selectedServiceId,
  onSelectServiceId,
  onPrefillContactForm,
  isDark,
}) => {
  const [urgency, setUrgency] = useState<'standard' | 'express'>('standard');
  const [scopeIndex, setScopeIndex] = useState<number>(0);
  const [extraRevisions, setExtraRevisions] = useState<boolean>(false);
  const [sourceFilesIncluded, setSourceFilesIncluded] = useState<boolean>(true);
  const [copiedQuote, setCopiedQuote] = useState<boolean>(false);

  const activeService =
    CALCULATOR_SERVICES.find((s) => s.id === selectedServiceId) ||
    CALCULATOR_SERVICES[0];

  const activeScope =
    activeService.complexityMultipliers[scopeIndex] ||
    activeService.complexityMultipliers[0];

  const turnaroundDisplay =
    urgency === 'express'
      ? `Express Priority (${activeService.expressHours})`
      : `Standard (${activeService.standardDays})`;

  const quoteSummaryText = `Hello Kuadjo! I configured a project request on your studio website:
• Service: ${activeService.name}
• Scope Tier: ${activeScope.label} (${activeScope.detail})
• Turnaround: ${turnaroundDisplay}
• Editable Source Files: ${sourceFilesIncluded ? 'Yes (Included)' : 'Standard Output'}
• Priority Live Revisions: ${extraRevisions ? 'Yes (Requested)' : 'Standard 2 Rounds'}

Please share a tailored quote so we can kick off today!`;

  const whatsappUrl = `${CONTACT_INFO.whatsappBase}?text=${encodeURIComponent(
    quoteSummaryText
  )}`;

  const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
    `Project Quote Request: ${activeService.shortLabel} (${turnaroundDisplay})`
  )}&body=${encodeURIComponent(quoteSummaryText)}`;

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(quoteSummaryText);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2500);
  };

  return (
    <section
      id="calculator"
      className={`py-20 sm:py-24 border-t transition-colors ${
        isDark
          ? 'bg-slate-900/40 border-slate-800/80'
          : 'bg-slate-100/70 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <p className="text-xs font-semibold tracking-wider text-amber-500 mb-2">
              03. Interactive Client Project & Scope Configurator
            </p>
            <h2
              className="text-2xl sm:text-4xl font-bold tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Configure Your Project Scope & Request an Instant Quote
            </h2>
            <p
              className={`mt-3 text-base max-w-2xl ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Select your service, project volume, and turnaround speed below to send a structured brief directly to our studio desk in Accra (New Bortianor & Tudu), Kasoa, or Jei-Krodua.
            </p>
          </div>
        </motion.div>

        {/* Main Calculator 12-Col Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Cols: Interactive Configuration Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className={`lg:col-span-7 p-6 sm:p-8 rounded-2xl border space-y-8 ${
              isDark
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            {/* STEP 1: Select Service */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold tracking-tight">
                  Step 1: Select Primary Service Needed
                </h3>
                <span className="text-xs font-mono-tabular text-amber-500">
                  1 of 3
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CALCULATOR_SERVICES.map((service) => {
                  const isSelected = service.id === selectedServiceId;

                  return (
                    <motion.button
                      key={service.id}
                      type="button"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        onSelectServiceId(service.id);
                        setScopeIndex(0);
                      }}
                      className={`text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                        isSelected
                          ? isDark
                            ? 'bg-amber-500/10 border-amber-500 text-white'
                            : 'bg-amber-50/70 border-amber-500 text-slate-900'
                          : isDark
                          ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-sm">
                          {service.shortLabel}
                        </span>
                        <span
                          className={`text-xs font-mono-tabular font-semibold whitespace-nowrap ${
                            isSelected ? 'text-amber-500' : 'text-slate-400'
                          }`}
                        >
                          {service.standardDays}
                        </span>
                      </div>
                      <p
                        className={`text-xs line-clamp-2 ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {service.description}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Scope / Complexity Tier */}
            <div
              className={`pt-6 border-t ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold tracking-tight">
                  Step 1B: Choose Project Volume / Scope
                </h3>
                <span
                  className={`text-xs ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {activeService.name}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeService.complexityMultipliers.map((tier, idx) => {
                  const active = scopeIndex === idx;
                  return (
                    <button
                      key={tier.label}
                      type="button"
                      onClick={() => setScopeIndex(idx)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        active
                          ? isDark
                            ? 'bg-amber-500/10 border-amber-500 text-white'
                            : 'bg-amber-50/70 border-amber-500 text-slate-900'
                          : isDark
                          ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold mb-1">{tier.label}</div>
                      <div
                        className={`text-xs leading-snug ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {tier.detail}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: Select Urgency / Turnaround */}
            <div
              className={`pt-6 border-t ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold tracking-tight">
                  Step 2: Select Urgency & Turnaround Speed
                </h3>
                <span className="text-xs font-mono-tabular text-amber-500">
                  2 of 3
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setUrgency('standard')}
                  className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                    urgency === 'standard'
                      ? isDark
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-amber-50/70 border-amber-500 text-slate-900'
                      : isDark
                      ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm">
                      Standard Turnaround (3–5 Days)
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      Ideal for scheduled launches, thesis reviews, and standard corporate projects.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setUrgency('express')}
                  className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                    urgency === 'express'
                      ? isDark
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-amber-50/70 border-amber-500 text-slate-900'
                      : isDark
                      ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <Zap className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm flex items-center gap-2">
                      <span>Express Priority (24–48 Hours)</span>
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      Dedicated overnight & weekend studio slot for urgent deadlines and express dispatch.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Optional Precision Add-ons */}
            <div
              className={`pt-6 border-t ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}
            >
              <h3 className="text-xs font-semibold tracking-wider text-slate-400 mb-3">
                Optional Delivery Preferences
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                    isDark
                      ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={sourceFilesIncluded}
                      onChange={(e) => setSourceFilesIncluded(e.target.checked)}
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                    <span className="text-xs font-medium">
                      Include Editable Master Source Files
                    </span>
                  </div>
                  <span className="text-xs font-mono-tabular text-emerald-500 font-semibold">
                    INCLUDED
                  </span>
                </label>

                <label
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                    isDark
                      ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={extraRevisions}
                      onChange={(e) => setExtraRevisions(e.target.checked)}
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                    <span className="text-xs font-medium">
                      Priority Live Revision Session
                    </span>
                  </div>
                  <span className="text-xs font-mono-tabular text-amber-500 font-semibold">
                    OPTIONAL
                  </span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Right 5 Cols: Step 3 Live Project Specification Summary & Conversion Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`lg:col-span-5 p-6 sm:p-8 rounded-2xl border sticky top-24 ${
              isDark
                ? 'bg-slate-950 border-amber-500/40 text-white'
                : 'bg-slate-900 border-slate-800 text-white'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <span className="text-xs font-mono-tabular text-amber-400">
                  STEP 3 · PROJECT SPECIFICATION SUMMARY
                </span>
                <h3 className="text-lg font-bold mt-0.5">{activeService.name}</h3>
              </div>
              <FileCheck2 className="w-6 h-6 text-amber-400 shrink-0" />
            </div>

            {/* Selected Scope & Turnaround Display */}
            <div className="mb-6">
              <div className="text-xs text-slate-400 mb-1">
                Selected Scope & Delivery Tier
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeScope.label}-${urgency}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="text-2xl sm:text-3xl font-bold text-amber-400 tracking-tight"
                >
                  {activeScope.label}
                </motion.div>
              </AnimatePresence>
              <div className="flex items-center gap-2 text-xs text-slate-300 mt-2">
                <span>Turnaround: {turnaroundDisplay}</span>
                <span aria-hidden="true">·</span>
                <span>Tailored Studio Quote</span>
              </div>
            </div>

            {/* Included Deliverables */}
            <div className="border-t border-slate-800 pt-5 mb-6">
              <div className="text-xs font-semibold text-slate-300 mb-3">
                What You Receive with This Package:
              </div>
              <ul className="space-y-2.5">
                {activeService.includedFeatures.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-slate-300"
                  >
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step 3 Primary & Secondary Actions */}
            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-amber-500/10"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send This Request via WhatsApp</span>
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={mailtoUrl}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Submit via Email</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    onPrefillContactForm({
                      serviceName: activeService.shortLabel,
                      urgencyLabel: turnaroundDisplay,
                      estimatedRange: activeScope.label,
                      notes: `Scope: ${activeScope.label} (${activeScope.detail}).`,
                    });
                  }}
                  className="py-3 px-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  <span>Load into Order Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopyQuote}
                className="w-full py-2 text-xs text-slate-400 hover:text-amber-400 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>
                  {copiedQuote
                    ? 'Project Summary Copied to Clipboard!'
                    : 'Copy Project Specification Text'}
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
