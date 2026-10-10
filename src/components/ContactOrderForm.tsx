import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Send
} from 'lucide-react';
import { CONTACT_INFO } from '../data/studioData';
import { BrandLogo } from './BrandLogo';

interface ContactOrderFormProps {
  prefillData: {
    serviceName: string;
    urgencyLabel: string;
    estimatedRange: string;
    notes: string;
  } | null;
  isDark: boolean;
}

export const ContactOrderForm: React.FC<ContactOrderFormProps> = ({
  prefillData,
  isDark,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState('Graphic Designing');
  const [turnaroundPreference, setTurnaroundPreference] = useState(
    'Standard Turnaround (3–5 Days)'
  );
  const [projectDetails, setProjectDetails] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedChannel, setSubmittedChannel] = useState<'whatsapp' | 'email' | null>(
    null
  );

  useEffect(() => {
    if (prefillData) {
      setServiceNeeded(prefillData.serviceName);
      setTurnaroundPreference(prefillData.urgencyLabel);
      setProjectDetails(prefillData.notes);
    }
  }, [prefillData]);

  const validateFields = () => {
    if (!name.trim()) {
      setErrorMessage('Please enter your full name or organization name.');
      return false;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMessage('Please enter a valid Phone or WhatsApp number.');
      return false;
    }
    if (!projectDetails.trim()) {
      setErrorMessage(
        'Please share a brief description of your project or document requirements.'
      );
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const buildOrderMessage = () => {
    return `Hello Kuadjo! New Client Project & Order Inquiry:
• Client Name: ${name.trim()}
• Phone / WhatsApp: ${phone.trim()}
• Service Needed: ${serviceNeeded}
• Turnaround / Scope Tier: ${turnaroundPreference}
• Project Brief: ${projectDetails.trim()}`;
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    const message = buildOrderMessage();
    const waLink = `${CONTACT_INFO.whatsappBase}?text=${encodeURIComponent(message)}`;
    setSubmittedChannel('whatsapp');
    window.open(waLink, '_blank', 'noopener,noreferrer');
  };

  const handleEmailSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    const message = buildOrderMessage();
    const mailtoLink = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
      `Client Order & Inquiry: ${serviceNeeded} — ${name.trim()}`
    )}&body=${encodeURIComponent(message)}`;
    setSubmittedChannel('email');
    window.location.href = mailtoLink;
  };

  const turnaroundOptions = [
    'Standard Turnaround (3–5 Days)',
    'Express Priority (24–48 Hours)',
    'Urgent Same-Day / Overnight Slot',
    'Flexible / Ongoing Retainer Project',
  ];

  return (
    <section
      id="contact"
      className={`py-20 sm:py-24 border-t transition-colors ${
        isDark
          ? 'bg-slate-950 border-slate-800/80'
          : 'bg-slate-50 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 5 Cols: Direct Contact Channels & Regional Studio Presence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <div className="mb-4">
                <BrandLogo size="lg" showWordmarkInside />
              </div>
              <p className="text-xs font-semibold tracking-wider text-amber-500 mb-2">
                05. Direct Client Intake & Studio Desk
              </p>
              <h2
                className="text-2xl sm:text-4xl font-bold tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Get In Touch With Us Now
              </h2>
              <p
                className={`mt-3 text-base leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Whether you need stickers, banners, posters, flyers, call & business cards, letterheads, certificates, t-shirts/souvenirs, music cover arts, or complete MS Word & Excel documentation—reach out directly below.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <div
                className={`p-5 rounded-xl border transition-colors ${
                  isDark
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div
                      className={`text-xs font-medium ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      Direct Phone / Call & WhatsApp Desk
                    </div>
                    <a
                      href={`tel:${CONTACT_INFO.phoneRaw}`}
                      className="text-base font-mono-tabular font-bold hover:text-amber-500 transition-colors block mt-0.5"
                    >
                      {CONTACT_INFO.phoneDisplay}
                    </a>
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      Available Mon–Sat · Instant WhatsApp file transfer & voice brief support
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`p-5 rounded-xl border transition-colors ${
                  isDark
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div
                      className={`text-xs font-medium ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      Official Studio Email (Large Document Attachments)
                    </div>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-base font-mono-tabular font-bold hover:text-amber-500 transition-colors block mt-0.5"
                    >
                      {CONTACT_INFO.email}
                    </a>
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      Send raw DOCX manuscripts, XLSX databases, or print artwork briefs
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`p-5 rounded-xl border transition-colors ${
                  isDark
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div
                      className={`text-xs font-medium ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      Studio Locations & Regional Desks
                    </div>
                    <div className="text-base font-bold mt-0.5">
                      {CONTACT_INFO.locations}
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      Accra Desk: New Bortianor & Tudu · Kasoa & Jei-Krodua (Central Region) · Remote Worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right 7 Cols: High-Converting Client Intake Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`lg:col-span-7 p-6 sm:p-8 rounded-2xl border ${
              isDark
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-800/40 pb-4 mb-6">
              <div>
                <h3 className="text-lg font-bold">
                  Client Project & Order Brief
                </h3>
                <p
                  className={`text-xs mt-0.5 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  Fill in your project details below to launch a pre-formatted WhatsApp chat or email inquiry.
                </p>
              </div>
              <span className="text-xs font-mono-tabular text-amber-500 font-semibold">
                24–48H SLOTS OPEN
              </span>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="mb-6 p-4 rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-400 flex items-center gap-3 text-xs font-medium"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {submittedChannel && !errorMessage && (
              <div
                role="status"
                className="mb-6 p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 flex items-center justify-between gap-3 text-xs font-medium"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    {submittedChannel === 'whatsapp'
                      ? 'Your project brief has been formatted for WhatsApp! Complete sending in the opened window.'
                      : 'Your email client has been opened with your complete project brief addressed to kuadjofila@gmail.com.'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmittedChannel(null)}
                  className="underline text-xs shrink-0"
                >
                  Dismiss
                </button>
              </div>
            )}

            <form onSubmit={handleWhatsAppSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="client-name"
                    className={`block text-xs font-semibold mb-2 ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}
                  >
                    Your Name or Organization *
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="e.g., Kwame Mensah / Apex Ltd."
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:border-amber-500 ${
                      isDark
                        ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>

                {/* Phone / WhatsApp Number */}
                <div>
                  <label
                    htmlFor="client-phone"
                    className={`block text-xs font-semibold mb-2 ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}
                  >
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="client-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="e.g., +233 55 560 4924"
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-mono-tabular transition-colors focus:outline-none focus:border-amber-500 ${
                      isDark
                        ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Service Needed */}
                <div>
                  <label
                    htmlFor="service-needed"
                    className={`block text-xs font-semibold mb-2 ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}
                  >
                    Service Needed *
                  </label>
                  <select
                    id="service-needed"
                    value={serviceNeeded}
                    onChange={(e) => setServiceNeeded(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:border-amber-500 ${
                      isDark
                        ? 'bg-slate-950 border-slate-800 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="Graphic Designing">Graphic Designing — Flyers, Posters, Banners & Stickers</option>
                    <option value="Editing & Formatting Document">Document Editing & MS Word Formatting</option>
                    <option value="Excel Database & Dashboard">MS Excel Database, Dashboard & PowerPoint</option>
                    <option value="Full Branding Package">Full Branding Package + Call Cards & Letterheads</option>
                    <option value="T-Shirt, Souvenirs & Merch">T-Shirt Printing, Souvenirs & Event Merch</option>
                    <option value="Certificates & Event Invitations">Certificates of Honour & Wedding/Gala Invitations</option>
                    <option value="Music Cover Arts & Social Kit">Music Cover Arts & Streaming Promo Graphics</option>
                  </select>
                </div>

                {/* Turnaround / Scope Preference */}
                <div>
                  <label
                    htmlFor="turnaround-preference"
                    className={`block text-xs font-semibold mb-2 ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}
                  >
                    Preferred Turnaround / Urgency *
                  </label>
                  <select
                    id="turnaround-preference"
                    value={turnaroundPreference}
                    onChange={(e) => setTurnaroundPreference(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:border-amber-500 ${
                      isDark
                        ? 'bg-slate-950 border-slate-800 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    {turnaroundOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                    {prefillData &&
                      !turnaroundOptions.includes(prefillData.urgencyLabel) && (
                        <option value={prefillData.urgencyLabel}>
                          {prefillData.urgencyLabel}
                        </option>
                      )}
                  </select>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label
                  htmlFor="project-details"
                  className={`block text-xs font-semibold mb-2 ${
                    isDark ? 'text-slate-200' : 'text-slate-700'
                  }`}
                >
                  Project Details, Quantity / Page Count & Target Deadline *
                </label>
                <textarea
                  id="project-details"
                  rows={4}
                  required
                  value={projectDetails}
                  onChange={(e) => {
                    setProjectDetails(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Describe your flyer/banner dimensions, t-shirt/souvenir quantity, document page count, Excel database columns, or target delivery date..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:border-amber-500 ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              {/* Dual Direct Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2.5 whitespace-nowrap shadow-lg shadow-emerald-600/15 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>Chat Directly on WhatsApp</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="button"
                  onClick={handleEmailSubmit}
                  className="py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2.5 whitespace-nowrap shadow-lg shadow-blue-600/15 cursor-pointer"
                >
                  <Send className="w-4 h-4 shrink-0" />
                  <span>Send Email Inquiry</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
