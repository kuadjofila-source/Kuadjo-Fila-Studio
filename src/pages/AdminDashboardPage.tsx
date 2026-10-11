import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Shield,
  Lock,
  Users,
  Eye,
  TrendingUp,
  Search,
  RefreshCw,
  Trash2,
  ArrowLeft,
  Monitor,
  Smartphone,
  Globe,
  Clock,
  CheckCircle2,
  AlertCircle,
  Database
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { AppPage } from './HomePage';

export interface VisitorRecord {
  id: string;
  timestamp: string;
  ip: string;
  route: string;
  deviceInfo: string;
  browser: string;
  os: string;
  referrer: string;
}

interface VisitorSummary {
  totalVisits: number;
  uniqueIps: number;
  topPage: string;
  topPageCount: number;
  topPages: { route: string; count: number }[];
}

interface AdminDashboardPageProps {
  isDark: boolean;
  onNavigate: (page: AppPage) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  isDark,
  onNavigate,
}) => {
  const [passcode, setPasscode] = useState<string>(() => {
    return sessionStorage.getItem('kf_admin_passcode') || '';
  });
  const [inputPasscode, setInputPasscode] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [logs, setLogs] = useState<VisitorRecord[]>([]);
  const [summary, setSummary] = useState<VisitorSummary>({
    totalVisits: 0,
    uniqueIps: 0,
    topPage: '/home',
    topPageCount: 0,
    topPages: [],
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [routeFilter, setRouteFilter] = useState<string>('ALL');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const fetchVisitorAnalytics = async (codeToUse: string) => {
    setLoading(true);
    setAuthError('');
    try {
      const response = await fetch('/api/admin/visitors', {
        method: 'GET',
        headers: {
          'x-admin-password': codeToUse.trim(),
        },
      });

      if (response.status === 401) {
        setIsAuthenticated(false);
        sessionStorage.removeItem('kf_admin_passcode');
        setAuthError('Invalid studio admin passcode. Default studio code: KF2026');
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to load visitor logs');
      }

      const data = await response.json();
      setLogs(data.logs || []);
      setSummary(
        data.summary || {
          totalVisits: 0,
          uniqueIps: 0,
          topPage: '/home',
          topPageCount: 0,
          topPages: [],
        }
      );
      setIsAuthenticated(true);
      sessionStorage.setItem('kf_admin_passcode', codeToUse.trim());
    } catch (err) {
      setAuthError('Unable to reach the tracking server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (passcode) {
      fetchVisitorAnalytics(passcode);
    }
  }, []);

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPasscode.trim()) {
      setAuthError('Please enter the studio admin passcode.');
      return;
    }
    setPasscode(inputPasscode.trim());
    fetchVisitorAnalytics(inputPasscode.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem('kf_admin_passcode');
    setPasscode('');
    setInputPasscode('');
    setIsAuthenticated(false);
  };

  const handleClearLogs = async () => {
    try {
      const res = await fetch('/api/admin/visitors', {
        method: 'DELETE',
        headers: {
          'x-admin-password': passcode,
        },
      });
      if (res.ok) {
        setStatusMessage('Visitor log history cleared.');
        fetchVisitorAnalytics(passcode);
        setTimeout(() => setStatusMessage(''), 3500);
      }
    } catch {
      setStatusMessage('Failed to clear visitor logs.');
    }
  };

  const filteredLogs = logs.filter((entry) => {
    const matchesRoute =
      routeFilter === 'ALL' || entry.route.toLowerCase() === routeFilter.toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesRoute;
    return (
      matchesRoute &&
      (entry.ip.toLowerCase().includes(q) ||
        entry.route.toLowerCase().includes(q) ||
        entry.deviceInfo.toLowerCase().includes(q) ||
        entry.referrer.toLowerCase().includes(q))
    );
  });

  // Password Security Prompt / Overlay
  if (!isAuthenticated) {
    return (
      <div className="py-20 sm:py-28 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`max-w-md mx-auto rounded-2xl border p-7 sm:p-9 shadow-2xl ${
            isDark
              ? 'bg-slate-900 border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BrandLogo size="md" />
              <div>
                <span className="text-xs font-mono-tabular font-semibold text-amber-500 block">
                  SECURITY GATEWAY
                </span>
                <h1 className="text-lg font-bold">Studio Admin Access</h1>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
              <Lock className="w-5 h-5" />
            </div>
          </div>

          <p
            className={`text-xs leading-relaxed mb-6 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Enter your Kuadjo Fila Studio administrator passcode to unlock real-time visitor IP logs, route analytics, and device telemetry.
          </p>

          {authError && (
            <div
              role="alert"
              className="mb-5 p-3.5 rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-400 flex items-center gap-2.5 text-xs font-medium"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleUnlockSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-passcode"
                className={`block text-xs font-semibold mb-2 ${
                  isDark ? 'text-slate-200' : 'text-slate-700'
                }`}
              >
                Admin Security Passcode
              </label>
              <input
                id="admin-passcode"
                type="password"
                value={inputPasscode}
                onChange={(e) => {
                  setInputPasscode(e.target.value);
                  if (authError) setAuthError('');
                }}
                placeholder="Enter passcode (e.g. KF2026)"
                className={`w-full px-4 py-3 rounded-xl border text-sm font-mono-tabular focus:outline-none focus:border-amber-500 ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
              <p className="text-[11px] text-slate-400 mt-1.5 font-mono-tabular">
                Default Passcode: <strong className="text-amber-500">KF2026</strong> (or <code className="text-amber-400">ADMIN_PASSWORD</code> env var)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Shield className="w-4 h-4" />
              <span>{loading ? 'Verifying Access...' : 'Unlock Visitor Dashboard'}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('home')}
              className={`w-full py-2.5 px-4 rounded-xl border text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                isDark
                  ? 'border-slate-800 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Studio Home</span>
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800/60 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-amber-500 font-semibold mb-2">
              <Shield className="w-4 h-4" />
              <span>KUADJO FILA STUDIO · ADMIN VISITOR TRACKING DASHBOARD</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Visitor IP & Route Telemetry
            </h1>
            <p
              className={`mt-2 text-sm ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Automatically captures client visits across <code className="text-amber-500">/home</code>, <code className="text-amber-500">/services</code>, <code className="text-amber-500">/portfolio</code>, <code className="text-amber-500">/calculator</code>, and <code className="text-amber-500">/contact</code> (excluding <code className="text-amber-500">/admin</code>).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => fetchVisitorAnalytics(passcode)}
              className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Logs</span>
            </button>

            <button
              type="button"
              onClick={handleClearLogs}
              className={`py-2.5 px-4 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
                isDark
                  ? 'border-slate-800 hover:border-rose-500/50 text-slate-300 hover:text-rose-400'
                  : 'border-slate-300 hover:border-rose-500 text-slate-700 hover:text-rose-600'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Logs</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className={`py-2.5 px-4 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
                isDark
                  ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span>Lock Admin</span>
            </button>
          </div>
        </div>

        {statusMessage && (
          <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 flex items-center gap-2.5 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* 3 Summary Cards: Total Visits, Unique IPs, Top Pages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`p-6 rounded-2xl border ${
              isDark
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono-tabular font-semibold text-amber-500">
                01 · TOTAL VISITS
              </span>
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                <Eye className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-mono-tabular">
              {summary.totalVisits}
            </div>
            <p
              className={`text-xs mt-2 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Cumulative non-admin page views logged
            </p>
          </div>

          <div
            className={`p-6 rounded-2xl border ${
              isDark
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono-tabular font-semibold text-amber-500">
                02 · UNIQUE VISITOR IPs
              </span>
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-mono-tabular">
              {summary.uniqueIps}
            </div>
            <p
              className={`text-xs mt-2 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Distinct client IP addresses detected
            </p>
          </div>

          <div
            className={`p-6 rounded-2xl border ${
              isDark
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono-tabular font-semibold text-amber-500">
                03 · TOP VISITED ROUTES
              </span>
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono-tabular text-amber-500">
                {summary.topPage}
              </span>
              <span className="text-xs font-mono-tabular text-emerald-500 font-semibold">
                {summary.topPageCount} visits
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800/50 flex flex-wrap gap-2">
              {summary.topPages.slice(0, 4).map((tp) => (
                <span
                  key={tp.route}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono-tabular ${
                    isDark
                      ? 'bg-slate-950 text-slate-300 border border-slate-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {tp.route}: {tp.count}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Search & Route Filter Bar + Visitor Log Table */}
        <div
          className={`rounded-2xl border overflow-hidden ${
            isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="p-5 sm:p-6 border-b border-slate-800/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by IP address, route (/services), or device..."
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:border-amber-500 ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {['ALL', '/home', '/services', '/portfolio', '/calculator', '/contact'].map(
                (r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRouteFilter(r)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono-tabular font-semibold transition-colors cursor-pointer ${
                      routeFilter === r
                        ? 'bg-amber-500 text-slate-950'
                        : isDark
                        ? 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-amber-500/40'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {r}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className={`border-b text-[11px] font-mono-tabular uppercase tracking-wider ${
                    isDark
                      ? 'bg-slate-950/60 border-slate-800 text-slate-400'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <th className="py-3.5 px-5">Date / Time</th>
                  <th className="py-3.5 px-5">Visitor IP Address</th>
                  <th className="py-3.5 px-5">Visited Route</th>
                  <th className="py-3.5 px-5">Device & Browser Info</th>
                  <th className="py-3.5 px-5">Referrer / Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-xs sm:text-sm">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 px-6 text-center text-slate-400"
                    >
                      No visitor records match your current filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => {
                    const isMobileDevice = log.deviceInfo
                      .toLowerCase()
                      .includes('mobile');
                    const formattedDate = new Date(log.timestamp).toLocaleString(
                      'en-GB',
                      {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      }
                    );
                    return (
                      <tr
                        key={log.id}
                        className={`transition-colors ${
                          isDark
                            ? 'hover:bg-slate-950/40'
                            : 'hover:bg-slate-50/90'
                        }`}
                      >
                        <td className="py-3.5 px-5 font-mono-tabular text-xs whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span>{formattedDate}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-5 font-mono-tabular font-semibold text-amber-500 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 shrink-0" />
                            <span>{log.ip}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-5 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-md text-xs font-mono-tabular font-semibold ${
                              isDark
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {log.route}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 whitespace-nowrap">
                          <span className="inline-flex items-center gap-2 text-xs">
                            {isMobileDevice ? (
                              <Smartphone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            ) : (
                              <Monitor className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                            )}
                            <span>{log.deviceInfo}</span>
                          </span>
                        </td>
                        <td
                          className={`py-3.5 px-5 text-xs ${
                            isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        >
                          {log.referrer}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Database & Serverless Architecture Note */}
        <div
          className={`p-6 rounded-2xl border text-xs leading-relaxed ${
            isDark
              ? 'bg-slate-950 border-slate-800 text-slate-400'
              : 'bg-slate-100 border-slate-200 text-slate-600'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-amber-500 mb-2">
            <Database className="w-4 h-4" />
            <span>SERVERLESS TRACKING & DATABASE PERSISTENCE</span>
          </div>
          <p>
            Visitor page loads automatically trigger <code className="text-amber-400">POST /api/track-visit</code> (excluding <code className="text-amber-400">/admin</code> routes) and persist to <code className="text-amber-400">data/visitor_logs.json</code> on the backend server. You can also connect Supabase or PostgreSQL by setting <code className="text-amber-400">SUPABASE_URL</code> and <code className="text-amber-400">SUPABASE_SERVICE_ROLE_KEY</code> in your environment variables.
          </p>
        </div>
      </div>
    </div>
  );
};
