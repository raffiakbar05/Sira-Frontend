'use client';

import { badgesData } from '../lib/data';

// ─── SHARED UI ────────────────────────────────────────────────────────────────
function NeonBadge({ children, color = '#22D3EE' }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 10px', borderRadius: 999,
      border: `1px solid ${color}33`, background: `${color}15`,
      color, fontSize: 11, fontFamily: 'Space Mono, monospace',
      fontWeight: 700, letterSpacing: '0.05em',
    }}>{children}</span>
  );
}

function XPBar({ current, max, color = '#22D3EE', height = 6 }) {
  const pct = Math.min((current / max) * 100, 100);
  return (
    <div style={{ width: '100%', background: '#334155', borderRadius: 999, height, overflow: 'hidden' }}>
      <div style={{
        height: '100%', borderRadius: 999,
        background: `linear-gradient(90deg, ${color}99, ${color})`,
        boxShadow: `0 0 8px ${color}66`, width: `${pct}%`,
        transition: 'width 1s cubic-bezier(.4,0,.2,1)',
      }} />
    </div>
  );
}

function RadarChart() {
  const stats = [
    { label: 'Algorithm', value: 0.3  },
    { label: 'Web Dev',   value: 0.55 },
    { label: 'ML / AI',  value: 0.1  },
    { label: 'Logic',    value: 0.45 },
    { label: 'Frontend', value: 0.6  },
  ];
  const cx = 100, cy = 100, r = 70, n = stats.length;
  const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const point = (i, val) => [
    cx + r * val * Math.cos(angle(i)),
    cy + r * val * Math.sin(angle(i)),
  ];
  const poly = stats.map((s, i) => point(i, s.value).join(',')).join(' ');
  return (
    <svg width={200} height={200} viewBox="0 0 200 200">
      {[0.25, 0.5, 0.75, 1.0].map(g => (
        <polygon key={g}
          points={stats.map((_, i) => point(i, g).join(',')).join(' ')}
          fill="none" stroke="#334155" strokeWidth="1" />
      ))}
      {stats.map((_, i) => {
        const [x, y] = point(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#334155" strokeWidth="1" />;
      })}
      <polygon points={poly} fill="#22D3EE" fillOpacity="0.2" stroke="#22D3EE" strokeWidth="2" />
      {stats.map((s, i) => {
        const [x, y] = point(i, s.value);
        return <circle key={i} cx={x} cy={y} r={3} fill="#22D3EE" />;
      })}
      {stats.map((s, i) => {
        const [x, y] = point(i, 1.22);
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="central"
            fontSize={9} fill="#475569" fontFamily="Space Mono">{s.label}</text>
        );
      })}
    </svg>
  );
}

const rarityColor = {
  common:    '#22D3EE',
  rare:      '#A78BFA',
  epic:      '#F59E0B',
  legendary: '#F87171',
};

const history = [
  { title: 'Hello World',            type: 'Lesson', time: '2 hours ago', xp: 100 },
  { title: 'Variables & Data Types', type: 'Lesson', time: '5 hours ago', xp: 150 },
  { title: 'JavaScript Basics Quiz', type: 'Quiz',   time: '1 day ago',   xp: 200 },
  { title: 'Functions Deep Dive',    type: 'Lesson', time: '2 days ago',  xp: 200 },
];

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
export default function ProfilePage({
  username       = 'Raffi akbar',
  bio            = 'Aspiring developer | JavaScript enthusiast',
  heroClass      = 'Web Warrior',
  featuredBadges = [1, 3, 4],
  setPage,
}) {
  const initial = (username || 'R').charAt(0).toUpperCase();

  // Resolve featured badge objects
  const allBadges = [
    { id: 1,  name: 'First Steps',    icon: '⚡', desc: 'Complete first lesson',      earned: true,  rarity: 'common'    },
    { id: 2,  name: 'Week Warrior',   icon: '🔥', desc: '7-day streak',               earned: false, rarity: 'rare'      },
    { id: 3,  name: 'Code Master',    icon: '⚔️', desc: 'Complete 5 lessons',         earned: true,  rarity: 'rare'      },
    { id: 4,  name: 'Swift Learner',  icon: '💨', desc: 'Finish quest under 10 mins', earned: true,  rarity: 'common'    },
    { id: 5,  name: 'Night Owl',      icon: '🦉', desc: 'Code after midnight',        earned: false, rarity: 'epic'      },
    { id: 6,  name: 'Bug Hunter',     icon: '🐛', desc: 'Fix 10 errors',              earned: false, rarity: 'legendary' },
    { id: 7,  name: 'Hello World',    icon: '🌍', desc: 'Complete Hello World quest', earned: true,  rarity: 'common'    },
    { id: 8,  name: 'Variable Guru',  icon: '📦', desc: 'Complete Variables quest',  earned: true,  rarity: 'common'    },
  ];

  const featuredList = featuredBadges
    .map(id => allBadges.find(b => b.id === id))
    .filter(Boolean);

  return (
    <div style={{ padding: '80px 32px 32px' }}>

      {/* ── Hero Card ── */}
      <div style={{
        background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
        border: '1px solid rgba(34,211,238,0.2)', borderRadius: 12,
        padding: 24, marginBottom: 24, animation: 'fade-up 0.4s ease both',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>

          {/* Avatar */}
          <div style={{
            width: 80, height: 80, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, rgba(34,211,238,0.3), rgba(167,139,250,0.3))',
            border: '3px solid #22D3EE',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 30, fontWeight: 700, fontFamily: 'Space Mono, monospace',
            boxShadow: '0 0 24px rgba(34,211,238,0.3)', color: '#F8FAFC',
          }}>{initial}</div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            {/* Name + Level + Edit button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 22, fontWeight: 700 }}>
                {username}
              </span>
              <NeonBadge color="#22D3EE">Level 1</NeonBadge>
              <NeonBadge color="#A78BFA">{heroClass}</NeonBadge>
              {setPage && (
                <button onClick={() => setPage('settings')} style={{
                  marginLeft: 'auto',
                  background: 'none', border: '1px solid #334155', borderRadius: 8,
                  padding: '4px 12px', color: '#475569', cursor: 'pointer',
                  fontSize: 12, display: 'flex', alignItems: 'center', gap: 6,
                  transition: 'all 0.2s',
                }}>✏️ Edit Profil</button>
              )}
            </div>

            {/* Bio */}
            <p style={{
              color: '#94A3B8', fontSize: 13, marginBottom: 10,
              fontStyle: 'italic', lineHeight: 1.5,
            }}>
              {bio || 'Belum ada bio. Tambahkan di Settings!'}
            </p>

            {/* Joined */}
            <div style={{ color: '#475569', fontSize: 12, marginBottom: 12 }}>
              📅 Joined Mar 2026
            </div>

            {/* Featured Badges */}
            {featuredList.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 11, color: '#475569', fontFamily: 'Space Mono, monospace' }}>
                  BADGE UNGGULAN
                </span>
                {featuredList.map(badge => (
                  <div key={badge.id} title={badge.name} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: `${rarityColor[badge.rarity]}15`,
                    border: `1px solid ${rarityColor[badge.rarity]}44`,
                    borderRadius: 8, padding: '4px 10px',
                  }}>
                    <span style={{ fontSize: 14 }}>{badge.icon}</span>
                    <span style={{ fontSize: 11, color: rarityColor[badge.rarity], fontWeight: 600 }}>
                      {badge.name}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* XP Bar */}
            <div style={{ fontSize: 12, color: '#475569', marginBottom: 6 }}>
              Level Progress — 0 / 5000 XP
            </div>
            <XPBar current={0} max={5000} height={8} />
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 28, flexShrink: 0 }}>
            {[
              ['📚', 'Lessons', '8'],
              ['⚡', 'Streak',  '5d'],
              ['🏆', 'Total XP','0'],
            ].map(([icon, label, value]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ color: '#22D3EE', marginBottom: 4, fontSize: 18 }}>{icon}</div>
                <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'Space Mono, monospace', color: '#F8FAFC' }}>{value}</div>
                <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body Grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>

        {/* Learning History */}
        <div style={{
          background: '#1E293B', border: '1px solid #334155',
          borderRadius: 12, padding: 20, animation: 'fade-up 0.5s ease both',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ color: '#22D3EE' }}>◎</span>
            <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: 18, fontWeight: 700 }}>
              Learning History
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {history.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', background: '#0F172A', borderRadius: 10,
                border: '1px solid #334155',
                animation: `slide-right ${0.4 + i * 0.07}s ease both`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                  }}>✓</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{item.title}</div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                      <NeonBadge color="#22D3EE">{item.type}</NeonBadge>
                      <span style={{ fontSize: 11, color: '#475569' }}>📅 {item.time}</span>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#22D3EE', fontFamily: 'Space Mono, monospace', fontWeight: 700, fontSize: 14 }}>
                    +{item.xp} XP
                  </div>
                  <div style={{ color: '#34D399', fontSize: 11, marginTop: 2 }}>completed</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Skill Chart */}
          <div style={{
            background: '#1E293B', border: '1px solid #334155',
            borderRadius: 12, padding: 20, textAlign: 'center',
            animation: 'fade-up 0.55s ease both',
          }}>
            <h3 style={{
              fontFamily: 'Space Mono, monospace', fontSize: 14,
              fontWeight: 700, marginBottom: 16, color: '#475569',
            }}>SKILL CHART</h3>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <RadarChart />
            </div>
          </div>

          {/* Achievements */}
          <div style={{
            background: '#1E293B', border: '1px solid #334155',
            borderRadius: 12, padding: 20, animation: 'fade-up 0.6s ease both',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: 16, fontWeight: 700 }}>
                Achievements
              </h2>
              {setPage && (
                <button onClick={() => setPage('settings')} style={{
                  background: 'none', border: '1px solid #334155', borderRadius: 6,
                  padding: '4px 10px', color: '#475569', cursor: 'pointer', fontSize: 11,
                  fontFamily: 'Space Mono, monospace',
                }}>⚙️ Kelola</button>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {badgesData.map((badge, i) => (
                <div key={badge.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 14px', borderRadius: 8,
                  background: badge.earned ? '#0F172A' : 'transparent',
                  border: `1px solid ${badge.earned ? 'rgba(245,158,11,0.2)' : '#334155'}`,
                  opacity: badge.earned ? 1 : 0.4,
                  animation: `fade-up ${0.6 + i * 0.06}s ease both`,
                  filter: badge.earned ? 'none' : 'grayscale(1)',
                }}>
                  <span style={{ fontSize: 22 }}>{badge.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{badge.name}</div>
                    <div style={{ fontSize: 11, color: '#475569' }}>{badge.desc}</div>
                  </div>
                  {badge.earned
                    ? <NeonBadge color="#F59E0B">✓</NeonBadge>
                    : <span style={{ fontSize: 11, color: '#475569' }}>🔒</span>
                  }
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}