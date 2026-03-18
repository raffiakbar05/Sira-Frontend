'use client';

import { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [mode, setMode]         = useState('login'); // 'login' | 'register'
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    if (!email.trim())    return 'Email tidak boleh kosong!';
    if (!password.trim()) return 'Password tidak boleh kosong!';
    if (mode === 'register') {
      if (!username.trim())        return 'Username tidak boleh kosong!';
      if (username.length < 3)     return 'Username minimal 3 karakter!';
      if (password.length < 6)     return 'Password minimal 6 karakter!';
      if (password !== confirm)    return 'Password tidak cocok!';
    }
    return null;
  };

  const handleSubmit = () => {
    const err = validate();
    if (err) return setError(err);
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(mode === 'register' ? username : (username || email.split('@')[0]));
    }, 1200);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0F172A',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'DM Sans, sans-serif',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* ── Animated background grid ── */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }}>
        <defs>
          <pattern id="login-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#334155" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#login-grid)" />
      </svg>

      {/* ── Glow orbs ── */}
      <div style={{
        position: 'absolute', top: '15%', left: '10%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '8%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Card ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: 420,
        margin: '0 16px',
        background: 'rgba(30,41,59,0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        padding: '40px 36px',
        boxShadow: '0 0 60px rgba(34,211,238,0.06), 0 24px 48px rgba(0,0,0,0.4)',
        animation: 'scale-in 0.4s ease both',
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: 'linear-gradient(135deg, #22D3EE, #A78BFA)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 700, color: '#fff',
            fontFamily: 'Space Mono, monospace',
            boxShadow: '0 0 24px rgba(34,211,238,0.4)',
            marginBottom: 14,
          }}>S</div>
          <h1 style={{
            fontFamily: 'Space Mono, monospace', fontSize: 22,
            fontWeight: 700, color: '#F8FAFC', marginBottom: 6,
            letterSpacing: '0.05em',
          }}>SIRA</h1>
          <p style={{ color: '#475569', fontSize: 13 }}>
            Socratic Interactive RPG Academy
          </p>
        </div>

        {/* Tab toggle */}
        <div style={{
          display: 'flex', background: '#0F172A',
          borderRadius: 10, padding: 4, marginBottom: 28,
          border: '1px solid #334155',
        }}>
          {[['login','Masuk'], ['register','Daftar']].map(([val, label]) => (
            <button key={val} onClick={() => { setMode(val); setError(''); }} style={{
              flex: 1, padding: '8px 0', borderRadius: 8, border: 'none',
              cursor: 'pointer', fontSize: 13, fontWeight: 600,
              fontFamily: 'Space Mono, monospace',
              background: mode === val
                ? 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(167,139,250,0.15))'
                : 'transparent',
              color: mode === val ? '#22D3EE' : '#475569',
              borderBottom: mode === val ? '2px solid #22D3EE' : '2px solid transparent',
              transition: 'all 0.2s',
            }}>{label}</button>
          ))}
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Username — register only */}
          {mode === 'register' && (
            <InputField
              label="USERNAME"
              type="text"
              value={username}
              onChange={setUsername}
              placeholder="hero_name_123"
              icon="👤"
              onKeyDown={handleKey}
            />
          )}

          {/* Email */}
          <InputField
            label="EMAIL"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="hero@sira.app"
            icon="📧"
            onKeyDown={handleKey}
          />

          {/* Password */}
          <InputField
            label="PASSWORD"
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            icon="🔑"
            onKeyDown={handleKey}
            rightAction={
              <button onClick={() => setShowPass(!showPass)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#475569', fontSize: 14, padding: '0 4px',
              }}>{showPass ? '🙈' : '👁️'}</button>
            }
          />

          {/* Confirm password — register only */}
          {mode === 'register' && (
            <InputField
              label="KONFIRMASI PASSWORD"
              type={showPass ? 'text' : 'password'}
              value={confirm}
              onChange={setConfirm}
              placeholder="••••••••"
              icon="🔒"
              onKeyDown={handleKey}
            />
          )}

          {/* Forgot password — login only */}
          {mode === 'login' && (
            <div style={{ textAlign: 'right', marginTop: -6 }}>
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#475569', fontSize: 12,
                fontFamily: 'DM Sans, sans-serif',
              }}>Lupa password?</button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{
              background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)',
              borderRadius: 8, padding: '10px 14px',
              color: '#F87171', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
              animation: 'scale-in 0.2s ease',
            }}>
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Submit Button */}
          <button onClick={handleSubmit} disabled={loading} style={{
            marginTop: 4,
            background: loading
              ? '#334155'
              : 'linear-gradient(135deg, #22D3EE, #A78BFA)',
            border: 'none', borderRadius: 10,
            padding: '13px 0', width: '100%',
            color: loading ? '#475569' : '#0F172A',
            fontWeight: 700, fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'Space Mono, monospace',
            letterSpacing: '0.05em',
            boxShadow: loading ? 'none' : '0 0 20px rgba(34,211,238,0.3)',
            transition: 'all 0.3s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            {loading ? (
              <>
                <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span>
                {mode === 'login' ? 'Memasuki dunia...' : 'Membuat akun...'}
              </>
            ) : (
              mode === 'login' ? '⚔️ Mulai Petualangan' : '🚀 Buat Akun'
            )}
          </button>
        </div>

        {/* Divider */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          margin: '24px 0',
        }}>
          <div style={{ flex: 1, height: 1, background: '#334155' }} />
          <span style={{ color: '#475569', fontSize: 12 }}>atau lanjutkan dengan</span>
          <div style={{ flex: 1, height: 1, background: '#334155' }} />
        </div>

        {/* Social Login */}
        <div style={{ display: 'flex', gap: 10 }}>
          {[['🌐', 'Google'], ['🐙', 'GitHub']].map(([icon, label]) => (
            <button key={label} style={{
              flex: 1, background: '#0F172A', border: '1px solid #334155',
              borderRadius: 10, padding: '10px 0', cursor: 'pointer',
              color: '#94A3B8', fontSize: 13, display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#22D3EE55';
              e.currentTarget.style.color = '#F8FAFC';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#334155';
              e.currentTarget.style.color = '#94A3B8';
            }}>
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Footer */}
        <p style={{
          textAlign: 'center', marginTop: 24,
          color: '#475569', fontSize: 12,
        }}>
          {mode === 'login' ? 'Belum punya akun? ' : 'Sudah punya akun? '}
          <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#22D3EE', fontSize: 12, fontWeight: 600,
            fontFamily: 'DM Sans, sans-serif',
          }}>
            {mode === 'login' ? 'Daftar sekarang →' : 'Masuk →'}
          </button>
        </p>
      </div>

      {/* Bottom tagline */}
      <div style={{
        position: 'absolute', bottom: 24, left: 0, right: 0,
        textAlign: 'center', color: '#334155', fontSize: 11,
        fontFamily: 'Space Mono, monospace',
      }}>
        SIRA v2.0 · Cyber-Tech Minimalist · The Neural Network
      </div>
    </div>
  );
}

// ─── INPUT FIELD COMPONENT ────────────────────────────────────────────────────
function InputField({ label, type, value, onChange, placeholder, icon, onKeyDown, rightAction }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{
        fontSize: 11, color: '#475569',
        fontFamily: 'Space Mono, monospace',
        display: 'block', marginBottom: 6,
        letterSpacing: '0.08em',
      }}>{label}</label>
      <div style={{
        display: 'flex', alignItems: 'center',
        background: '#0F172A',
        border: `1px solid ${focused ? '#22D3EE' : '#334155'}`,
        borderRadius: 10, overflow: 'hidden',
        boxShadow: focused ? '0 0 0 3px rgba(34,211,238,0.1)' : 'none',
        transition: 'all 0.2s',
      }}>
        <span style={{
          padding: '0 12px', fontSize: 16,
          borderRight: `1px solid ${focused ? '#22D3EE33' : '#334155'}`,
          transition: 'border 0.2s',
        }}>{icon}</span>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={onKeyDown}
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            padding: '11px 14px', color: '#F8FAFC', fontSize: 14,
            fontFamily: 'DM Sans, sans-serif',
          }}
        />
        {rightAction}
      </div>
    </div>
  );
}