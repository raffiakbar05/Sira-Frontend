'use client';

import { useState, useEffect } from 'react';

// ─── DATA HERO CLASS ──────────────────────────────────────────────────────────
const heroClasses = [
  {
    id: 'warrior',
    icon: '⚔️',
    name: 'Logic Warrior',
    tagline: 'Kuasai logika, taklukkan algoritma',
    focus: 'Algoritma & Struktur Data',
    startRegion: 'Logic Citadel',
    regionColor: '#F59E0B',
    desc: 'Kamu adalah pejuang yang memecahkan masalah dengan logika tajam. Jalur ini melatih kemampuan berpikir algoritmik, struktur data, dan pemecahan masalah kompleks.',
    skills: ['Algoritma', 'Struktur Data', 'Problem Solving', 'Complexity'],
    quests: ['Binary Search', 'Sorting Algorithms', 'Linked Lists', 'Dynamic Programming'],
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.03))',
    border: '#F59E0B',
    glow: 'rgba(245,158,11,0.3)',
  },
  {
    id: 'mage',
    icon: '🧙',
    name: 'Web Mage',
    tagline: 'Ciptakan dunia digital dengan sihir kode',
    focus: 'HTML / CSS / JS / React',
    startRegion: 'Coastal Republic',
    regionColor: '#22D3EE',
    desc: 'Kamu adalah penyihir yang membangun antarmuka indah dan aplikasi web yang hidup. Jalur ini mencakup frontend development dari dasar hingga React modern.',
    skills: ['HTML & CSS', 'JavaScript', 'React', 'UI/UX'],
    quests: ['Hello World', 'Flexbox Sorcery', 'React Components', 'State Management'],
    gradient: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(34,211,238,0.03))',
    border: '#22D3EE',
    glow: 'rgba(34,211,238,0.3)',
  },
  {
    id: 'ranger',
    icon: '🏹',
    name: 'Data Ranger',
    tagline: 'Jelajahi hutan data, temukan pola tersembunyi',
    focus: 'Python & AI / ML',
    startRegion: 'Data Highlands',
    regionColor: '#A78BFA',
    desc: 'Kamu adalah penjelajah yang mahir membaca pola tersembunyi di balik tumpukan data. Jalur ini membawamu menyelami dunia Python, machine learning, dan kecerdasan buatan.',
    skills: ['Python', 'Data Analysis', 'Machine Learning', 'Neural Networks'],
    quests: ['Python Basics', 'NumPy & Pandas', 'ML Fundamentals', 'Neural Networks'],
    gradient: 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(167,139,250,0.03))',
    border: '#A78BFA',
    glow: 'rgba(167,139,250,0.3)',
  },  
];

// ─── PROLOGUE SCREEN ──────────────────────────────────────────────────────────
function PrologueScreen({ onSkip, onFinish }) {
  const [step, setStep] = useState(0);

  const lines = [
    { text: 'Di suatu masa...', sub: null },
    { text: 'Digital Realm sedang dalam bahaya.', sub: null },
    { text: '💀 Logic Bug menyerang dari segala penjuru.', sub: 'Sistem runtuh. Kode membusuk. Dunia digital menjerit.' },
    { text: 'Hanya satu harapan tersisa...', sub: null },
    { text: '⚡ Seorang Pahlawan Kode.', sub: 'Seseorang yang mampu menguasai ilmu koding dan memulihkan keseimbangan.' },
    { text: '🌟 Kamu dipilih.', sub: 'Perjalananmu dimulai sekarang. Pilih jalanmu, kuasai kekuatanmu.' },
  ];

  useEffect(() => {
    if (step >= lines.length) {
      setTimeout(onFinish, 800);
      return;
    }
    const timer = setTimeout(() => setStep(s => s + 1), 2200);
    return () => clearTimeout(timer);
  }, [step]);

  const progress = Math.min((step / lines.length) * 100, 100);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: '#070F1A',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Space Mono, monospace',
    }}>
      {/* Stars background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.4 }}>
        {[...Array(60)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            borderRadius: '50%',
            background: '#F8FAFC',
            opacity: Math.random() * 0.8 + 0.2,
            animation: `pulse-glow ${Math.random() * 3 + 2}s infinite`,
          }} />
        ))}
      </div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        textAlign: 'center', maxWidth: 600, padding: '0 32px',
      }}>
        {lines.slice(0, step).map((line, i) => (
          <div key={i} style={{
            animation: 'fade-up 0.6s ease both',
            marginBottom: i === step - 1 ? 0 : 24,
            opacity: i < step - 1 ? 0.35 : 1,
            transition: 'opacity 0.5s',
          }}>
            <p style={{
              fontSize: i === step - 1 ? 26 : 16,
              fontWeight: 700, color: '#F8FAFC',
              lineHeight: 1.4, marginBottom: line.sub ? 8 : 0,
              transition: 'font-size 0.4s',
            }}>{line.text}</p>
            {line.sub && i === step - 1 && (
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>{line.sub}</p>
            )}
          </div>
        ))}

        {/* Blinking cursor */}
        {step < lines.length && (
          <span style={{
            display: 'inline-block', width: 2, height: 24,
            background: '#22D3EE', marginLeft: 4,
            animation: 'pulse-glow 0.8s infinite',
            verticalAlign: 'middle',
          }} />
        )}
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute', bottom: 80, left: '50%',
        transform: 'translateX(-50%)',
        width: 200,
      }}>
        <div style={{ background: '#1E293B', borderRadius: 999, height: 3, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 999,
            background: 'linear-gradient(90deg, #22D3EE, #A78BFA)',
            width: `${progress}%`,
            transition: 'width 0.5s ease',
            boxShadow: '0 0 8px rgba(34,211,238,0.5)',
          }} />
        </div>
      </div>

      {/* Skip button */}
      <button onClick={onSkip} style={{
        position: 'absolute', bottom: 32, right: 32,
        background: 'none', border: '1px solid #334155', borderRadius: 8,
        padding: '8px 20px', color: '#475569', cursor: 'pointer',
        fontSize: 12, fontFamily: 'Space Mono, monospace',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#22D3EE55'; e.currentTarget.style.color = '#22D3EE'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#475569'; }}>
        Skip Prologue →
      </button>
    </div>
  );
}

// ─── HERO CLASS CARD ──────────────────────────────────────────────────────────
function HeroCard({ hero, selected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const active = selected || hovered;

  return (
    <div
      onClick={() => onSelect(hero.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: '100%',
        background: active ? hero.gradient : 'rgba(30,41,59,0.6)',
        border: `2px solid ${active ? hero.border : '#334155'}`,
        borderRadius: 16, padding: 24, cursor: 'pointer',
        transition: 'all 0.25s ease',
        transform: active ? 'translateY(-4px)' : 'none',
        boxShadow: active ? `0 0 32px ${hero.glow}, 0 8px 24px rgba(0,0,0,0.3)` : '0 2px 8px rgba(0,0,0,0.2)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Selected indicator */}
      {selected && (
        <div style={{
          position: 'absolute', top: 12, right: 12,
          width: 24, height: 24, borderRadius: '50%',
          background: hero.border,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, color: '#0F172A',
          boxShadow: `0 0 10px ${hero.glow}`,
        }}>✓</div>
      )}

      {/* Icon */}
      <div style={{
        fontSize: 48, marginBottom: 16, textAlign: 'center',
        filter: active ? 'drop-shadow(0 0 12px ' + hero.border + ')' : 'none',
        transition: 'filter 0.25s',
      }}>{hero.icon}</div>

      {/* Name */}
      <h3 style={{
        fontFamily: 'Space Mono, monospace', fontSize: 18, fontWeight: 700,
        color: active ? hero.border : '#F8FAFC',
        textAlign: 'center', marginBottom: 6, transition: 'color 0.2s',
      }}>{hero.name}</h3>

      {/* Tagline */}
      <p style={{
        fontSize: 12, color: '#94A3B8', textAlign: 'center',
        marginBottom: 16, fontStyle: 'italic', lineHeight: 1.5,
      }}>{hero.tagline}</p>

      {/* Focus badge */}
      <div style={{
        display: 'flex', justifyContent: 'center', marginBottom: 16,
      }}>
        <span style={{
          background: `${hero.border}15`,
          border: `1px solid ${hero.border}44`,
          color: hero.border, borderRadius: 999,
          padding: '4px 14px', fontSize: 11,
          fontFamily: 'Space Mono, monospace', fontWeight: 700,
        }}>📚 {hero.focus}</span>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: active ? `${hero.border}33` : '#334155', marginBottom: 16 }} />

      {/* Description */}
      <p style={{
        fontSize: 12, color: '#94A3B8', lineHeight: 1.7,
        marginBottom: 16, textAlign: 'center',
      }}>{hero.desc}</p>

      {/* Skills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 16 }}>
        {hero.skills.map(skill => (
          <span key={skill} style={{
            background: '#0F172A', border: `1px solid ${active ? hero.border + '55' : '#334155'}`,
            borderRadius: 6, padding: '3px 10px', fontSize: 11,
            color: active ? hero.border : '#475569',
            fontFamily: 'Space Mono, monospace',
            transition: 'all 0.2s',
          }}>{skill}</span>
        ))}
      </div>

      {/* Starting region */}
      <div style={{
        background: '#0F172A', borderRadius: 8, padding: '8px 12px',
        display: 'flex', alignItems: 'center', gap: 8,
        border: `1px solid ${active ? hero.border + '44' : '#334155'}`,
        transition: 'border 0.2s',
      }}>
        <span style={{ fontSize: 14 }}>🗺️</span>
        <div>
          <div style={{ fontSize: 10, color: '#475569', fontFamily: 'Space Mono, monospace' }}>STARTING REGION</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: active ? hero.border : '#F8FAFC', transition: 'color 0.2s' }}>
            {hero.startRegion}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN HERO CUSTOMIZATION PAGE ────────────────────────────────────────────
export default function HeroCustomization({ username, onComplete }) {
  const [showPrologue, setShowPrologue] = useState(true);
  const [selectedHero, setSelectedHero] = useState(null);
  const [confirming, setConfirming]     = useState(false);
  const [confirmed, setConfirmed]       = useState(false);

  const hero = heroClasses.find(h => h.id === selectedHero);

  const handleConfirm = () => {
    if (!selectedHero) return;
    setConfirming(true);
    setTimeout(() => {
      setConfirmed(true);
      setTimeout(() => onComplete(selectedHero, hero), 1500);
    }, 800);
  };

  if (showPrologue) {
    return (
      <PrologueScreen
        onSkip={() => setShowPrologue(false)}
        onFinish={() => setShowPrologue(false)}
      />
    );
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0F172A',
      fontFamily: 'DM Sans, sans-serif',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Background grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08, pointerEvents: 'none' }}>
        <defs>
          <pattern id="hero-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#334155" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* Glow orbs */}
      <div style={{
        position: 'absolute', top: '-10%', left: '30%',
        width: 600, height: 300, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(34,211,238,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1100, margin: '0 auto', padding: '60px 32px 40px',
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52, animation: 'fade-up 0.5s ease both' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)',
            borderRadius: 999, padding: '6px 16px', marginBottom: 20,
          }}>
            <span style={{ fontSize: 12, color: '#22D3EE', fontFamily: 'Space Mono, monospace' }}>
              ⚡ HERO CUSTOMIZATION
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Space Mono, monospace', fontSize: 36, fontWeight: 700,
            color: '#F8FAFC', marginBottom: 12, lineHeight: 1.2,
          }}>
            Selamat datang,{' '}
            <span style={{
              background: 'linear-gradient(135deg, #22D3EE, #A78BFA)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{username}</span>!
          </h1>

          <p style={{
            color: '#94A3B8', fontSize: 16, maxWidth: 520,
            margin: '0 auto', lineHeight: 1.7,
          }}>
            Digital Realm membutuhkanmu. Pilih <strong style={{ color: '#F8FAFC' }}>Hero Class</strong> untuk
            menentukan jalur belajarmu dan starting region petualangan pertamamu.
          </p>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16,
            background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: 8, padding: '8px 16px',
          }}>
            <span style={{ fontSize: 14 }}>💡</span>
            <span style={{ fontSize: 12, color: '#F59E0B' }}>
              Kamu bebas menjelajahi semua region setelah menyelesaikan quest pertama
            </span>
          </div>
        </div>

        {/* Hero Cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20, marginBottom: 40,
          alignItems: 'stretch',
          animation: 'fade-up 0.6s ease both',
        }}>
          {heroClasses.map(h => (
            <HeroCard
              key={h.id}
              hero={h}
              selected={selectedHero === h.id}
              onSelect={setSelectedHero}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
          animation: 'fade-up 0.7s ease both',
        }}>

          {/* Selected preview */}
          {hero && !confirmed && (
            <div style={{
              background: `${hero.border}10`,
              border: `1px solid ${hero.border}44`,
              borderRadius: 12, padding: '14px 28px',
              display: 'flex', alignItems: 'center', gap: 16,
              animation: 'scale-in 0.2s ease',
            }}>
              <span style={{ fontSize: 28 }}>{hero.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: hero.border }}>{hero.name}</div>
                <div style={{ fontSize: 12, color: '#94A3B8' }}>
                  Mulai di <strong style={{ color: '#F8FAFC' }}>{hero.startRegion}</strong>
                </div>
              </div>
              <div style={{ marginLeft: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {hero.quests.slice(0, 2).map(q => (
                  <span key={q} style={{ fontSize: 11, color: '#475569' }}>▶ {q}</span>
                ))}
                <span style={{ fontSize: 11, color: '#475569' }}>▶ + {hero.quests.length - 2} quest lainnya...</span>
              </div>
            </div>
          )}

          {/* Confirm button */}
          <button
            onClick={handleConfirm}
            disabled={!selectedHero || confirming}
            style={{
              background: selectedHero && !confirming
                ? `linear-gradient(135deg, ${hero?.border}, ${hero?.border}99)`
                : '#334155',
              border: 'none', borderRadius: 12,
              padding: '16px 56px', cursor: selectedHero && !confirming ? 'pointer' : 'not-allowed',
              color: selectedHero && !confirming ? '#0F172A' : '#475569',
              fontWeight: 700, fontSize: 16,
              fontFamily: 'Space Mono, monospace',
              letterSpacing: '0.05em',
              boxShadow: selectedHero && !confirming
                ? `0 0 24px ${hero?.glow}, 0 4px 16px rgba(0,0,0,0.3)`
                : 'none',
              transition: 'all 0.3s',
              display: 'flex', alignItems: 'center', gap: 10,
              transform: confirmed ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            {confirmed ? (
              <><span style={{ animation: 'pulse-glow 0.5s infinite' }}>✨</span> Memasuki dunia SIRA...</>
            ) : confirming ? (
              <><span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span> Menyiapkan petualangan...</>
            ) : selectedHero ? (
              <>⚔️ Mulai Petualangan</>
            ) : (
              <>Pilih Hero Class dahulu</>
            )}
          </button>

          {!selectedHero && (
            <p style={{ fontSize: 12, color: '#475569', fontFamily: 'Space Mono, monospace' }}>
              ↑ Klik salah satu Hero Class di atas untuk memilih
            </p>
          )}
        </div>
      </div>
    </div>
  );
}