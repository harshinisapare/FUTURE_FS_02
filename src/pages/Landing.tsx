import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Layers, BarChart3, Users,
  Zap, TrendingUp, Shield, Globe, ChevronRight,
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    { icon: Users,      title: 'Lead Pipeline',      desc: 'Capture, track, and nurture every lead from first touch to closed deal in one place.' },
    { icon: BarChart3,  title: 'Live Analytics',      desc: 'Real-time dashboards with conversion funnels, source breakdowns, and revenue charts.' },
    { icon: Zap,        title: 'Instant Actions',     desc: 'Update statuses, log notes, and move deals forward in seconds — not minutes.' },
    { icon: TrendingUp, title: 'Revenue Tracking',    desc: 'See exactly where your pipeline value sits and which stage is losing the most deals.' },
    { icon: Shield,     title: 'Secure Access',       desc: 'Role-based admin authentication built in from day one — no setup required.' },
    { icon: Globe,      title: 'Any Lead Source',     desc: 'Website, referral, LinkedIn, cold email — all your leads unified in one view.' },
  ];

  const stats = [
    { value: '3×',   label: 'Faster follow-ups'  },
    { value: '94%',  label: 'Lead capture rate'  },
    { value: '<2s',  label: 'Status update time' },
    { value: '100%', label: 'Free to use'        },
  ];

  return (
    <div style={s.root}>

      {/* subtle dot grid background */}
      <div style={s.dotGrid} />

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <div style={s.logo}>
            <div style={s.logoIcon}>
              <Layers size={18} color="#fff" strokeWidth={2.2} />
            </div>
            <span style={s.logoText}>Forge CRM</span>
          </div>
          <div style={s.navRight}>
            {/* <button style={s.navLinkBtn} onClick={() => navigate('/login')}>
              Sign In
            </button> */}
            <button style={s.navPrimaryBtn} onClick={() => navigate('/login')}>
              Sign in <ArrowRight size={14} style={{ marginLeft: 4 }} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <section style={s.hero}>

        {/* pill badge */}
        <div style={s.badge}>
          <span style={s.badgeDot} />
          Built for agencies, freelancers & startups
        </div>

        <h1 style={s.heroTitle}>
          Manage your clients<br />
          <span style={s.heroBlue}>like a pro.</span>
        </h1>

        <p style={s.heroSub}>
          Forge CRM gives you a clean, powerful system to track leads,
          follow up faster, and close more deals — without the enterprise bloat.
        </p>

        <div style={s.heroBtns}>
          <button style={s.primaryBtn} onClick={() => navigate('/login')}>
            Enter Dashboard
            <ArrowRight size={16} style={{ marginLeft: 8 }} />
          </button>
          {/* <button style={s.ghostBtn} onClick={() => navigate('/login')}> */}
            
          {/* </button> */}
        </div>

        <p style={s.heroHint}>
          Demo credentials: <code style={s.code}>admin@forgecrm.in</code> /{' '}
          <code style={s.code}>admin123</code>
        </p>

        {/* stat pills */}
        <div style={s.statsRow}>
          {stats.map((st, i) => (
            <div key={i} style={s.statCard}>
              <div style={s.statVal}>{st.value}</div>
              <div style={s.statLbl}>{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DASHBOARD MOCKUP ────────────────────────────── */}
      <section style={s.mockupSection}>
        <div style={s.mockupFrame}>
          {/* browser bar */}
          <div style={s.browserBar}>
            <div style={s.dots}>
              <span style={{ ...s.dot, background: '#f87171' }} />
              <span style={{ ...s.dot, background: '#fbbf24' }} />
              <span style={{ ...s.dot, background: '#34d399' }} />
            </div>
            <div style={s.urlBar}>forge-crm · dashboard</div>
          </div>

          {/* mock UI */}
          <div style={s.mockUI}>
            {/* sidebar */}
            <div style={s.mockSidebar}>
              <div style={s.mockBrand}>
                <div style={s.mockBrandIcon}><Layers size={12} color="#fff" /></div>
                <span style={s.mockBrandName}>Forge</span>
              </div>
              {['Dashboard','Leads','Analytics','Settings'].map((item, i) => (
                <div key={i} style={{ ...s.mockNavItem, ...(i === 0 ? s.mockNavActive : {}) }}>
                  <span style={{ ...s.mockNavDot, background: i === 0 ? '#fff' : 'rgba(255,255,255,0.25)' }} />
                  {item}
                </div>
              ))}
            </div>

            {/* main area */}
            <div style={s.mockContent}>
              {/* KPI row */}
              <div style={s.mockKpiRow}>
                {[
                  { label: 'Total Leads', val: '124', color: '#2563eb' },
                  { label: 'Converted',   val: '38',  color: '#059669' },
                  { label: 'Pipeline',    val: '₹4.2L', color: '#7c3aed' },
                  { label: 'This Month',  val: '+12', color: '#dc2626' },
                ].map((k, i) => (
                  <div key={i} style={s.mockKpi}>
                    <div style={{ ...s.mockKpiVal, color: k.color }}>{k.val}</div>
                    <div style={s.mockKpiLbl}>{k.label}</div>
                  </div>
                ))}
              </div>

              {/* charts row */}
              <div style={s.mockChartsRow}>
                {/* bar chart */}
                <div style={s.mockBarChart}>
                  {[55, 80, 45, 92, 68, 75, 88, 60].map((h, i) => (
                    <div key={i} style={{ ...s.mockBar, height: `${h}%` }} />
                  ))}
                </div>
                {/* donut */}
                <div style={s.mockDonutWrap}>
                  <svg viewBox="0 0 72 72" width="64" height="64">
                    <circle cx="36" cy="36" r="26" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                    <circle cx="36" cy="36" r="26" fill="none" stroke="#2563eb" strokeWidth="10"
                      strokeDasharray="49 115" strokeLinecap="round"
                      transform="rotate(-90 36 36)" />
                    <circle cx="36" cy="36" r="26" fill="none" stroke="#7c3aed" strokeWidth="10"
                      strokeDasharray="35 115" strokeDashoffset="-49" strokeLinecap="round"
                      transform="rotate(-90 36 36)" />
                    <circle cx="36" cy="36" r="26" fill="none" stroke="#059669" strokeWidth="10"
                      strokeDasharray="31 115" strokeDashoffset="-84" strokeLinecap="round"
                      transform="rotate(-90 36 36)" />
                    <text x="36" y="40" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="700">124</text>
                  </svg>
                </div>
              </div>

              {/* leads table */}
              <div style={s.mockLeads}>
                {[
                  { name: 'Arjun Mehta',   status: 'converted', val: '₹85K', color: '#dcfce7', tc: '#166534' },
                  { name: 'Priya Sharma',  status: 'contacted', val: '₹42K', color: '#fef9c3', tc: '#854d0e' },
                  { name: 'Rohan Kapoor',  status: 'new',       val: '₹1.2L', color: '#dbeafe', tc: '#1e40af' },
                ].map((lead, i) => (
                  <div key={i} style={s.mockLeadRow}>
                    <div style={{ ...s.mockAvatar, background: ['#bfdbfe','#bbf7d0','#ddd6fe'][i] }}>
                      <span style={{ color: ['#1d4ed8','#065f46','#6d28d9'][i], fontWeight: 700, fontSize: 9 }}>
                        {lead.name[0]}
                      </span>
                    </div>
                    <span style={s.mockLeadName}>{lead.name}</span>
                    <span style={{ ...s.mockStatusBadge, background: lead.color, color: lead.tc }}>
                      {lead.status}
                    </span>
                    <span style={s.mockLeadVal}>{lead.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* soft glow under frame */}
        <div style={s.frameGlow} />
      </section>

      {/* ── FEATURES ────────────────────────────────────── */}
      <section style={s.featSection}>
        <div style={s.featHeader}>
          <span style={s.sectionEyebrow}>What's inside</span>
          <h2 style={s.sectionTitle}>Everything you need to close more deals</h2>
          <p style={s.sectionSub}>
            No bloat. Just the tools that actually move leads through your pipeline.
          </p>
        </div>
        <div style={s.featGrid}>
          {features.map((f, i) => (
            <div key={i} style={s.featCard}>
              <div style={s.featIconWrap}>
                <f.icon size={20} color="#2563eb" strokeWidth={1.8} />
              </div>
              <div style={s.featTitle}>{f.title}</div>
              <div style={s.featDesc}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────── */}
      <section style={s.howSection}>
        <div style={s.howInner}>
          <span style={s.sectionEyebrow}>How it works</span>
          <h2 style={s.sectionTitle}>Up and running in 3 steps</h2>
          <div style={s.stepsRow}>
            {[
              { num: '01', title: 'Sign in',        desc: 'Use the admin credentials to access your secure dashboard.' },
              { num: '02', title: 'Add your leads',  desc: 'Manually add leads or capture them from any source.' },
              { num: '03', title: 'Track & convert', desc: 'Update statuses, log notes, and watch your pipeline grow.' },
            ].map((step, i) => (
              <div key={i} style={s.stepCard}>
                <div style={s.stepNum}>{step.num}</div>
                <div style={s.stepTitle}>{step.title}</div>
                <div style={s.stepDesc}>{step.desc}</div>
                {i < 2 && <ChevronRight size={18} color="#cbd5e1" style={s.stepArrow} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section style={s.ctaSection}>
        <div style={s.ctaCard}>
          <div style={s.ctaBlob1} />
          <div style={s.ctaBlob2} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={s.ctaTitle}>Ready to take control of your pipeline?</h2>
            <p style={s.ctaSub}>Sign in with demo credentials and explore the full system.</p>
            <button style={s.ctaBtn} onClick={() => navigate('/login')}>
              Get Started Free
              <ArrowRight size={16} style={{ marginLeft: 8 }} />
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer style={s.footer}>
        <div style={s.footerLogo}>
          <div style={{ ...s.logoIcon, width: 28, height: 28 }}>
            <Layers size={14} color="#fff" strokeWidth={2.2} />
          </div>
          <span style={{ ...s.logoText, fontSize: 14 }}>Forge CRM</span>
        </div>
        <p style={s.footerNote}>Built with React · TypeScript · Tailwind · Zustand</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {

  root: {
    minHeight: '100vh',
    background: '#ffffff',
    fontFamily: "'DM Sans', sans-serif",
    color: '#0f172a',
    overflowX: 'hidden',
  },

  dotGrid: {
    position: 'fixed',
    inset: 0,
    backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
    backgroundSize: '28px 28px',
    opacity: 0.45,
    pointerEvents: 'none',
    zIndex: 0,
  },

  // NAV
  nav: {
    position: 'sticky', top: 0, zIndex: 50,
    background: 'rgba(255,255,255,0.9)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid #f1f5f9',
  },
  navInner: {
    maxWidth: 1100, margin: '0 auto',
    padding: '14px 32px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  logo: { display: 'flex', alignItems: 'center', gap: 10 },
  logoIcon: {
    width: 34, height: 34, borderRadius: 9,
    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  logoText: {
    fontFamily: "'Sora', sans-serif",
    fontWeight: 700, fontSize: 16,
    color: '#0f172a', letterSpacing: '-0.02em',
  },
  navRight: { display: 'flex', alignItems: 'center', gap: 8 },
  navLinkBtn: {
    background: 'none', border: 'none',
    color: '#64748b', fontSize: 14, fontWeight: 500,
    cursor: 'pointer', padding: '8px 14px', borderRadius: 8,
  },
  navPrimaryBtn: {
    display: 'flex', alignItems: 'center',
    padding: '8px 18px', borderRadius: 8,
    background: '#2563eb', color: '#fff',
    fontSize: 14, fontWeight: 600,
    border: 'none', cursor: 'pointer',
    fontFamily: "'Sora', sans-serif",
  },

  // HERO
  hero: {
    position: 'relative', zIndex: 1,
    maxWidth: 780, margin: '0 auto',
    padding: '88px 32px 56px',
    textAlign: 'center',
  },
  badge: {
    display: 'inline-flex', alignItems: 'center', gap: 7,
    padding: '5px 14px', borderRadius: 20,
    background: '#eff6ff',
    border: '1px solid #bfdbfe',
    color: '#1d4ed8', fontSize: 12, fontWeight: 500,
    marginBottom: 28,
    animation: 'fadeUp 0.5s ease both',
  },
  badgeDot: {
    width: 6, height: 6, borderRadius: '50%',
    background: '#2563eb', display: 'inline-block',
  },
  heroTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 'clamp(36px, 5.5vw, 64px)',
    fontWeight: 800, lineHeight: 1.1,
    letterSpacing: '-0.03em',
    color: '#0f172a',
    marginBottom: 22,
    animation: 'fadeUp 0.5s 0.08s ease both',
  },
  heroBlue: { color: '#2563eb' },
  heroSub: {
    fontSize: 17, color: '#64748b',
    lineHeight: 1.7, maxWidth: 520,
    margin: '0 auto 36px',
    animation: 'fadeUp 0.5s 0.16s ease both',
  },
  heroBtns: {
    display: 'flex', justifyContent: 'center',
    gap: 12, flexWrap: 'wrap',
    marginBottom: 16,
    animation: 'fadeUp 0.5s 0.24s ease both',
  },
  primaryBtn: {
    display: 'inline-flex', alignItems: 'center',
    padding: '13px 28px', borderRadius: 10,
    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    color: '#fff', fontWeight: 700, fontSize: 15,
    border: 'none', cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(37,99,235,0.35)',
    fontFamily: "'Sora', sans-serif",
    letterSpacing: '-0.01em',
  },
  ghostBtn: {
    display: 'inline-flex', alignItems: 'center',
    padding: '13px 24px', borderRadius: 10,
    background: '#fff',
    border: '1.5px solid #e2e8f0',
    color: '#374151', fontSize: 15, fontWeight: 500,
    cursor: 'pointer',
  },
  heroHint: {
    fontSize: 12, color: '#94a3b8', marginBottom: 36,
    animation: 'fadeUp 0.5s 0.28s ease both',
  },
  code: {
    fontFamily: 'monospace', fontSize: 12,
    background: '#eff6ff', color: '#1d4ed8',
    padding: '1px 6px', borderRadius: 4,
  },
  statsRow: {
    display: 'flex', justifyContent: 'center',
    gap: 12, flexWrap: 'wrap',
    animation: 'fadeUp 0.5s 0.34s ease both',
  },
  statCard: {
    padding: '14px 24px', borderRadius: 12,
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    textAlign: 'center', minWidth: 110,
  },
  statVal: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 22, fontWeight: 800,
    color: '#0f172a', letterSpacing: '-0.03em',
  },
  statLbl: { fontSize: 11, color: '#94a3b8', marginTop: 3 },

  // MOCKUP
  mockupSection: {
    position: 'relative', zIndex: 1,
    maxWidth: 960, margin: '0 auto',
    padding: '0 32px 80px',
  },
  mockupFrame: {
    borderRadius: 16, overflow: 'hidden',
    border: '1px solid #e2e8f0',
    boxShadow: '0 24px 80px rgba(15,23,42,0.1), 0 4px 20px rgba(37,99,235,0.08)',
  },
  browserBar: {
    background: '#f8fafc',
    borderBottom: '1px solid #e2e8f0',
    padding: '10px 16px',
    display: 'flex', alignItems: 'center', gap: 12,
  },
  dots: { display: 'flex', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: '50%', display: 'block' },
  urlBar: {
    background: '#fff', border: '1px solid #e2e8f0',
    borderRadius: 6, padding: '3px 12px',
    fontSize: 11, color: '#94a3b8',
  },
  mockUI: { display: 'flex', height: 310, background: '#fff' },
  mockSidebar: {
    width: 130, background: '#1e40af',
    padding: '16px 10px',
    display: 'flex', flexDirection: 'column', gap: 4,
  },
  mockBrand: {
    display: 'flex', alignItems: 'center', gap: 7,
    marginBottom: 16, padding: '0 6px',
  },
  mockBrandIcon: {
    width: 22, height: 22, borderRadius: 6,
    background: 'rgba(255,255,255,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  mockBrandName: {
    fontWeight: 700, fontSize: 12,
    color: '#fff', letterSpacing: '-0.01em',
  },
  mockNavItem: {
    display: 'flex', alignItems: 'center', gap: 7,
    padding: '7px 8px', borderRadius: 6,
    fontSize: 11, color: 'rgba(255,255,255,0.6)',
  },
  mockNavActive: {
    background: 'rgba(255,255,255,0.15)',
    color: '#fff',
  },
  mockNavDot: { width: 5, height: 5, borderRadius: '50%', flexShrink: 0 },
  mockContent: { flex: 1, padding: '14px 16px', overflow: 'hidden' },
  mockKpiRow: { display: 'flex', gap: 8, marginBottom: 12 },
  mockKpi: {
    flex: 1, padding: '8px 10px',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: 8,
  },
  mockKpiVal: { fontSize: 16, fontWeight: 800, fontFamily: "'Sora', sans-serif" },
  mockKpiLbl: { fontSize: 9, color: '#94a3b8', marginTop: 2 },
  mockChartsRow: {
    display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-end',
  },
  mockBarChart: {
    flex: 1, height: 70,
    display: 'flex', alignItems: 'flex-end', gap: 4,
    background: '#f8fafc', borderRadius: 8, padding: '8px 8px 6px',
    border: '1px solid #e2e8f0',
  },
  mockBar: {
    flex: 1, borderRadius: '3px 3px 0 0',
    background: 'linear-gradient(180deg, #2563eb, #93c5fd)',
  },
  mockDonutWrap: {
    width: 84, height: 70,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#f8fafc', borderRadius: 8,
    border: '1px solid #e2e8f0',
  },
  mockLeads: { display: 'flex', flexDirection: 'column', gap: 5 },
  mockLeadRow: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '5px 8px', borderRadius: 7,
    background: '#f8fafc', border: '1px solid #f1f5f9',
  },
  mockAvatar: {
    width: 22, height: 22, borderRadius: 6,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  mockLeadName: { flex: 1, fontSize: 11, color: '#374151', fontWeight: 500 },
  mockStatusBadge: {
    fontSize: 9, fontWeight: 600, padding: '2px 7px',
    borderRadius: 20, textTransform: 'capitalize',
  },
  mockLeadVal: { fontSize: 11, color: '#2563eb', fontWeight: 700 },
  frameGlow: {
    position: 'absolute', bottom: 50, left: '50%',
    transform: 'translateX(-50%)',
    width: '50%', height: 60,
    background: 'radial-gradient(ellipse, rgba(37,99,235,0.12), transparent 70%)',
    pointerEvents: 'none',
  },

  // FEATURES
  featSection: {
    position: 'relative', zIndex: 1,
    background: '#f8fafc',
    borderTop: '1px solid #e2e8f0',
    borderBottom: '1px solid #e2e8f0',
    padding: '72px 32px',
  },
  featHeader: {
    maxWidth: 560, margin: '0 auto 48px',
    textAlign: 'center',
  },
  sectionEyebrow: {
    display: 'inline-block',
    fontSize: 11, fontWeight: 600,
    letterSpacing: '0.1em', textTransform: 'uppercase',
    color: '#2563eb', marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 'clamp(22px, 3.5vw, 34px)',
    fontWeight: 800, color: '#0f172a',
    letterSpacing: '-0.02em', marginBottom: 14,
  },
  sectionSub: { fontSize: 15, color: '#64748b', lineHeight: 1.65 },
  featGrid: {
    maxWidth: 1000, margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 16,
  },
  featCard: {
    padding: '24px',
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 14,
    transition: 'box-shadow 0.2s',
  },
  featIconWrap: {
    width: 44, height: 44, borderRadius: 11,
    background: '#eff6ff',
    border: '1px solid #bfdbfe',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 16,
  },
  featTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 15, fontWeight: 700,
    color: '#0f172a', marginBottom: 8,
    letterSpacing: '-0.01em',
  },
  featDesc: { fontSize: 13, color: '#64748b', lineHeight: 1.65 },

  // HOW IT WORKS
  howSection: {
    position: 'relative', zIndex: 1,
    padding: '72px 32px',
    background: '#fff',
  },
  howInner: { maxWidth: 900, margin: '0 auto', textAlign: 'center' },
  stepsRow: {
    display: 'flex', gap: 16, marginTop: 40,
    justifyContent: 'center', flexWrap: 'wrap',
    position: 'relative',
  },
  stepCard: {
    flex: '1 1 220px', maxWidth: 260,
    padding: '28px 24px',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: 14,
    textAlign: 'left',
    position: 'relative',
  },
  stepNum: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 32, fontWeight: 800,
    color: '#dbeafe', letterSpacing: '-0.04em',
    marginBottom: 12, lineHeight: 1,
  },
  stepTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 16, fontWeight: 700,
    color: '#0f172a', marginBottom: 8,
  },
  stepDesc: { fontSize: 13, color: '#64748b', lineHeight: 1.6 },
  stepArrow: {
    position: 'absolute',
    right: -18, top: '50%',
    transform: 'translateY(-50%)',
  },

  // CTA
  ctaSection: {
    position: 'relative', zIndex: 1,
    padding: '0 32px 80px',
    background: '#f8fafc',
    borderTop: '1px solid #e2e8f0',
  },
  ctaCard: {
    maxWidth: 700, margin: '0 auto',
    padding: '60px 48px',
    background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)',
    borderRadius: 20,
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginTop: 0,
    top: -1,
  },
  ctaBlob1: {
    position: 'absolute', width: 300, height: 300,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.05)',
    top: -100, right: -80, zIndex: 1,
  },
  ctaBlob2: {
    position: 'absolute', width: 200, height: 200,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.05)',
    bottom: -60, left: -60, zIndex: 1,
  },
  ctaTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 'clamp(20px, 3vw, 30px)',
    fontWeight: 800, color: '#fff',
    letterSpacing: '-0.02em', marginBottom: 12,
  },
  ctaSub: { fontSize: 15, color: 'rgba(255,255,255,0.75)', marginBottom: 28 },
  ctaBtn: {
    display: 'inline-flex', alignItems: 'center',
    padding: '13px 28px', borderRadius: 10,
    background: '#fff', color: '#1d4ed8',
    fontWeight: 700, fontSize: 15,
    border: 'none', cursor: 'pointer',
    fontFamily: "'Sora', sans-serif",
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  },

  // FOOTER
  footer: {
    position: 'relative', zIndex: 1,
    background: '#fff',
    borderTop: '1px solid #e2e8f0',
    padding: '24px 32px',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: 8,
  },
  footerLogo: { display: 'flex', alignItems: 'center', gap: 8 },
  footerNote: { fontSize: 12, color: '#cbd5e1' },
};