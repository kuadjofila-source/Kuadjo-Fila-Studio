import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';

interface VisitorRecord {
  id: string;
  timestamp: string;
  ip: string;
  route: string;
  deviceInfo: string;
  browser: string;
  os: string;
  referrer: string;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const VISITORS_FILE = path.join(DATA_DIR, 'visitor_logs.json');
const ADMIN_PASSCODE = process.env.ADMIN_PASSWORD || 'KF2026';

function ensureStorage(): VisitorRecord[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(VISITORS_FILE)) {
      const seedLogs: VisitorRecord[] = [
        {
          id: 'vis-1001',
          timestamp: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
          ip: '154.160.21.84',
          route: '/home',
          deviceInfo: 'Desktop · Chrome 131 · Windows 11',
          browser: 'Chrome',
          os: 'Windows',
          referrer: 'Direct / Bookmark',
        },
        {
          id: 'vis-1002',
          timestamp: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
          ip: '102.176.94.12',
          route: '/services',
          deviceInfo: 'Mobile · Safari 18 · iOS (iPhone)',
          browser: 'Safari',
          os: 'iOS',
          referrer: 'WhatsApp Share Link',
        },
        {
          id: 'vis-1003',
          timestamp: new Date(Date.now() - 1000 * 60 * 19).toISOString(),
          ip: '154.160.21.84',
          route: '/portfolio',
          deviceInfo: 'Desktop · Chrome 131 · Windows 11',
          browser: 'Chrome',
          os: 'Windows',
          referrer: 'Internal Navigation',
        },
        {
          id: 'vis-1004',
          timestamp: new Date(Date.now() - 1000 * 60 * 11).toISOString(),
          ip: '41.215.170.45',
          route: '/calculator',
          deviceInfo: 'Mobile · Chrome Mobile · Android 14',
          browser: 'Chrome Mobile',
          os: 'Android',
          referrer: 'Google Search (Accra)',
        },
        {
          id: 'vis-1005',
          timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
          ip: '102.176.65.209',
          route: '/contact',
          deviceInfo: 'Desktop · Edge 131 · Windows 11',
          browser: 'Edge',
          os: 'Windows',
          referrer: 'Facebook (KUADJO FILA STUDIO)',
        },
      ];
      fs.writeFileSync(VISITORS_FILE, JSON.stringify(seedLogs, null, 2), 'utf-8');
      return seedLogs;
    }
    const raw = fs.readFileSync(VISITORS_FILE, 'utf-8');
    return JSON.parse(raw) as VisitorRecord[];
  } catch (err) {
    console.error('Visitor log storage read error:', err);
    return [];
  }
}

function saveVisitorLogs(logs: VisitorRecord[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(VISITORS_FILE, JSON.stringify(logs.slice(0, 1000), null, 2), 'utf-8');
  } catch (err) {
    console.error('Visitor log storage write error:', err);
  }
}

function parseUserAgent(uaString: string): {
  deviceInfo: string;
  browser: string;
  os: string;
} {
  const ua = uaString || 'Unknown User-Agent';
  const isMobile = /Mobile|Android|iP(hone|od|ad)/i.test(ua);
  const deviceType = isMobile ? 'Mobile' : 'Desktop';

  let browser = 'Browser';
  if (/Edg\//i.test(ua)) browser = 'Edge';
  else if (/Chrome\//i.test(ua)) browser = isMobile ? 'Chrome Mobile' : 'Chrome';
  else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = 'Safari';
  else if (/Firefox\//i.test(ua)) browser = 'Firefox';

  let os = 'OS';
  if (/Windows NT 10|Windows NT 11/i.test(ua)) os = 'Windows';
  else if (/Mac OS X/i.test(ua) && !isMobile) os = 'macOS';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
  else if (/Linux/i.test(ua)) os = 'Linux';

  return {
    deviceInfo: `${deviceType} · ${browser} · ${os}`,
    browser,
    os,
  };
}

function extractClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim().length > 0) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers['x-real-ip'] || req.headers['cf-connecting-ip'];
  if (typeof realIp === 'string' && realIp.trim().length > 0) {
    return realIp.trim();
  }
  return req.socket.remoteAddress?.replace('::ffff:', '') || '127.0.0.1';
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. Serverless / API Route to Track Visitor Page Loads (Excludes /admin)
  app.post('/api/track-visit', (req: Request, res: Response) => {
    try {
      const { route, referrer } = req.body || {};
      const normalizedRoute = String(route || '/home').trim();

      // Exclude admin routes from tracking
      if (normalizedRoute.toLowerCase().includes('admin')) {
        return res.json({ tracked: false, reason: 'Admin route excluded' });
      }

      const ip = extractClientIp(req);
      const ua = String(req.headers['user-agent'] || '');
      const parsedUA = parseUserAgent(ua);

      const newEntry: VisitorRecord = {
        id: `vis-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        timestamp: new Date().toISOString(),
        ip,
        route: normalizedRoute.startsWith('/') ? normalizedRoute : `/${normalizedRoute}`,
        deviceInfo: parsedUA.deviceInfo,
        browser: parsedUA.browser,
        os: parsedUA.os,
        referrer: referrer ? String(referrer).slice(0, 120) : 'Direct / Navigation',
      };

      const logs = ensureStorage();
      logs.unshift(newEntry);
      saveVisitorLogs(logs);

      return res.status(201).json({ tracked: true, entry: newEntry });
    } catch (error) {
      console.error('Error logging visit:', error);
      return res.status(500).json({ error: 'Failed to log visit' });
    }
  });

  // 2. Verify Admin Password & Fetch Visitor Analytics
  app.get('/api/admin/visitors', (req: Request, res: Response) => {
    const providedPass = String(req.headers['x-admin-password'] || '');
    if (providedPass !== ADMIN_PASSCODE) {
      return res.status(401).json({ error: 'Unauthorized: Invalid studio admin passcode' });
    }

    const logs = ensureStorage();
    const totalVisits = logs.length;
    const uniqueIps = new Set(logs.map((l) => l.ip)).size;

    const routeCounts: Record<string, number> = {};
    for (const log of logs) {
      routeCounts[log.route] = (routeCounts[log.route] || 0) + 1;
    }

    const topPages = Object.entries(routeCounts)
      .map(([route, count]) => ({ route, count }))
      .sort((a, b) => b.count - a.count);

    return res.json({
      summary: {
        totalVisits,
        uniqueIps,
        topPage: topPages[0]?.route || '/home',
        topPageCount: topPages[0]?.count || 0,
        topPages,
      },
      logs,
    });
  });

  // 3. Optional Clear / Reset Logs or Log Test Visit from Admin
  app.delete('/api/admin/visitors', (req: Request, res: Response) => {
    const providedPass = String(req.headers['x-admin-password'] || '');
    if (providedPass !== ADMIN_PASSCODE) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    saveVisitorLogs([]);
    return res.json({ cleared: true });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Kuadjo Fila Studio server running on http://localhost:${PORT}`);
  });
}

startServer();
