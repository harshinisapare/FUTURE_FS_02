import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Layers } from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      setLoading(false);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Incorrect email or password. Please try again.');
      }
    }, 600);
  };

  return (
    <div style={s.root}>
      {/* Left panel — blue brand side */}
      <div style={s.left}>
        <div style={s.leftInner}>
          <div style={s.brandLogo}>
            <Layers size={22} color="#fff" strokeWidth={2} />
          </div>
          <h2 style={s.brandName}>Forge CRM</h2>
          <p style={s.brandTagline}>
            The command centre for your client pipeline.
          </p>
          <div style={s.brandFeatures}>
            {[
              'Track every lead in real time',
              'Visual analytics & conversion charts',
              'Notes, follow-ups & deal values',
              'Secure, role-based admin access',
            ].map((f, i) => (
              <div key={i} style={s.brandFeature}>
                <span style={s.featureCheck}>✓</span>
                {f}
              </div>
            ))}
          </div>
        </div>
        {/* Decorative circles */}
        <div style={s.circle1} />
        <div style={s.circle2} />
      </div>

      {/* Right panel — white login form */}
      <div style={s.right}>
        <div style={s.formWrap}>

          {/* Back link */}
          <button style={s.backBtn} onClick={() => navigate('/')}>
            <ArrowLeft size={14} />
            Back to home
          </button>

          {/* Header */}
          <div style={s.formHeader}>
            <h1 style={s.formTitle}>Welcome back</h1>
            <p style={s.formSub}>Sign in to your admin panel</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={s.form}>

            <div style={s.field}>
              <label style={s.label}>Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@forgecrm.in"
                style={s.input}
                onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
                onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
              />
            </div>

            <div style={s.field}>
              <label style={s.label}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ ...s.input, paddingRight: 44 }}
                  onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
                  onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={s.eyeBtn}
                >
                  {showPassword
                    ? <EyeOff size={16} color="#94a3b8" />
                    : <Eye size={16} color="#94a3b8" />}
                </button>
              </div>
            </div>

            {error && (
              <div style={s.errorBox}>
                <span style={s.errorDot} />
                {error}
              </div>
            )}

            <button
              type="submit"
              style={{ ...s.submitBtn, opacity: loading ? 0.75 : 1 }}
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Demo hint */}
          <div style={s.demoHint}>
            <span style={s.demoLabel}>Demo credentials</span>
            <code style={s.demoCode}>admin@forgecrm.in</code>
            <span style={{ color: '#cbd5e1', fontSize: 12 }}>/</span>
            <code style={s.demoCode}>admin123</code>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
      `}</style>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  root: {
    minHeight: '100vh',
    display: 'flex',
    fontFamily: "'DM Sans', sans-serif",
    background: '#fff',
  },

  // LEFT — blue panel
  left: {
    width: '45%',
    background: 'linear-gradient(145deg, #1d4ed8 0%, #1e40af 50%, #1e3a8a 100%)',
    padding: '48px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  leftInner: { position: 'relative', zIndex: 2 },
  brandLogo: {
    width: 48, height: 48, borderRadius: 12,
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.25)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 20,
  },
  brandName: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 28, fontWeight: 800,
    color: '#fff', letterSpacing: '-0.03em',
    marginBottom: 12,
  },
  brandTagline: {
    fontSize: 15, color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.6, marginBottom: 36, maxWidth: 300,
  },
  brandFeatures: { display: 'flex', flexDirection: 'column', gap: 14 },
  brandFeature: {
    display: 'flex', alignItems: 'center', gap: 10,
    fontSize: 14, color: 'rgba(255,255,255,0.85)',
  },
  featureCheck: {
    width: 20, height: 20, borderRadius: '50%',
    background: 'rgba(255,255,255,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 11, color: '#fff', flexShrink: 0,
    lineHeight: '20px', textAlign: 'center',
  },
  circle1: {
    position: 'absolute', width: 300, height: 300,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    bottom: -80, right: -80, zIndex: 1,
  },
  circle2: {
    position: 'absolute', width: 180, height: 180,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    bottom: 60, right: -40, zIndex: 1,
  },

  // RIGHT — white form
  right: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 32px',
    background: '#fff',
  },
  formWrap: { width: '100%', maxWidth: 380 },
  backBtn: {
    display: 'flex', alignItems: 'center', gap: 6,
    background: 'none', border: 'none',
    color: '#94a3b8', fontSize: 13, cursor: 'pointer',
    marginBottom: 36, padding: 0,
    transition: 'color 0.15s',
  },
  formHeader: { marginBottom: 28 },
  formTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 26, fontWeight: 800,
    color: '#0f172a', letterSpacing: '-0.03em',
    marginBottom: 6,
  },
  formSub: { fontSize: 14, color: '#94a3b8' },
  form: { display: 'flex', flexDirection: 'column', gap: 18 },
  field: { display: 'flex', flexDirection: 'column', gap: 7 },
  label: {
    fontSize: 13, fontWeight: 500,
    color: '#374151', letterSpacing: '-0.01em',
  },
  input: {
    width: '100%', padding: '11px 14px',
    fontSize: 14, color: '#0f172a',
    background: '#f8fafc',
    border: '1.5px solid #e2e8f0',
    borderRadius: 10, outline: 'none',
    transition: 'border-color 0.15s',
    fontFamily: "'DM Sans', sans-serif",
  },
  eyeBtn: {
    position: 'absolute', right: 12,
    top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: 'none',
    cursor: 'pointer', display: 'flex',
    alignItems: 'center', padding: 0,
  },
  errorBox: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '10px 14px', borderRadius: 8,
    background: '#fef2f2',
    border: '1px solid #fecaca',
    fontSize: 13, color: '#dc2626',
  },
  errorDot: {
    width: 6, height: 6, borderRadius: '50%',
    background: '#ef4444', flexShrink: 0,
    display: 'block',
  },
  submitBtn: {
    width: '100%', padding: '12px',
    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    color: '#fff', fontWeight: 700, fontSize: 15,
    border: 'none', borderRadius: 10,
    cursor: 'pointer', letterSpacing: '-0.01em',
    fontFamily: "'Sora', sans-serif",
    transition: 'opacity 0.2s',
    marginTop: 4,
  },
  demoHint: {
    marginTop: 24,
    padding: '12px 16px',
    background: '#f1f5f9',
    borderRadius: 10,
    display: 'flex', alignItems: 'center',
    gap: 8, flexWrap: 'wrap',
  },
  demoLabel: { fontSize: 12, color: '#94a3b8', marginRight: 2 },
  demoCode: {
    fontFamily: 'monospace', fontSize: 12,
    color: '#1d4ed8', background: '#dbeafe',
    padding: '2px 7px', borderRadius: 5,
  },
};