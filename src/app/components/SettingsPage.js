'use client';

import { useState } from 'react';

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

function SectionTitle({ icon, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <h2 style={{
        fontFamily: 'Space Mono, monospace', fontSize: 16,
        fontWeight: 700, color: '#F8FAFC',
      }}>{title}</h2>
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: '#1E293B', border: '1px solid #334155',
      borderRadius: 12, padding: 24, ...style,
    }}>{children}</div>
  );
}

function Toast({ message, type }) {
  if (!message) return null;
  const color = type === 'success' ? '#34D399' : '#F87171';
  return (
    <div style={{
      position: 'fixed', bottom: 32, right: 32, zIndex: 999,
      background: '#1E293B', border: `1px solid ${color}55`,
      borderLeft: `3px solid ${color}`,
      borderRadius: 10, padding: '12px 20px',
      display: 'flex', alignItems: 'center', gap: 10,
      animation: 'scale-in 0.2s ease',
      boxShadow: `0 0 20px ${color}22`,
    }}>
      <span style={{ color, fontSize: 16 }}>{type === 'success' ? '✓' : '✗'}</span>
      <span style={{ fontSize: 13, color: '#F8FAFC', fontFamily: 'DM Sans, sans-serif' }}>{message}</span>
    </div>
  );
}

// ─── ALL POSSIBLE BADGES (earned + locked) ───────────────────────────────────
const allBadges = [
  { id: 1,  name: 'First Steps',    icon: '⚡', desc: 'Complete first lesson',     earned: true,  rarity: 'common',    color: '#22D3EE' },
  { id: 2,  name: 'Week Warrior',   icon: '🔥', desc: '7-day streak',              earned: false, rarity: 'rare',      color: '#A78BFA' },
  { id: 3,  name: 'Code Master',    icon: '⚔️', desc: 'Complete 5 lessons',        earned: true,  rarity: 'rare',      color: '#A78BFA' },
  { id: 4,  name: 'Swift Learner',  icon: '💨', desc: 'Finish quest under 10 mins',earned: true,  rarity: 'common',    color: '#22D3EE' },
  { id: 5,  name: 'Night Owl',      icon: '🦉', desc: 'Code after midnight',       earned: false, rarity: 'epic',      color: '#F59E0B' },
  { id: 6,  name: 'Bug Hunter',     icon: '🐛', desc: 'Fix 10 errors',             earned: false, rarity: 'legendary', color: '#F87171' },
  { id: 7,  name: 'Hello World',    icon: '🌍', desc: 'Complete Hello World quest', earned: true,  rarity: 'common',    color: '#22D3EE' },
  { id: 8,  name: 'Variable Guru',  icon: '📦', desc: 'Complete Variables quest',   earned: true,  rarity: 'common',    color: '#22D3EE' },
  { id: 9,  name: 'Func Master',    icon: '🎯', desc: 'Complete Functions quest',   earned: false, rarity: 'rare',      color: '#A78BFA' },
  { id: 10, name: 'Array Slayer',   icon: '🗡️', desc: 'Complete Arrays quest',      earned: false, rarity: 'rare',      color: '#A78BFA' },
  { id: 11, name: 'Coastal Hero',   icon: '🌊', desc: 'Complete Coastal Region',    earned: false, rarity: 'epic',      color: '#F59E0B' },
  { id: 12, name: 'Neural Pioneer', icon: '🧠', desc: 'Complete Data Highlands',    earned: false, rarity: 'legendary', color: '#F87171' },
];

const rarityOrder = { common: 1, rare: 2, epic: 3, legendary: 4 };
const rarityColor = {
  common:    '#22D3EE',
  rare:      '#A78BFA',
  epic:      '#F59E0B',
  legendary: '#F87171',
};

// ─── MAIN SETTINGS PAGE ───────────────────────────────────────────────────────
export default function SettingsPage({ username, setUsername }) {
  const [displayName,   setDisplayName]   = useState(username || 'Raffi akbar');
  const [bio,           setBio]           = useState('Aspiring developer | JavaScript enthusiast');
  const [heroClass,     setHeroClass]     = useState('Web Warrior');
  const [editingName,   setEditingName]   = useState(false);
  const [tempName,      setTempName]      = useState(displayName);

  const [badges,        setBadges]        = useState(allBadges);
  const [featuredBadges,setFeaturedBadges]= useState([1, 3, 4]);
  const [filterTab,     setFilterTab]     = useState('earned');
  const [sortBy,        setSortBy]        = useState('rarity');

  const [activeSection, setActiveSection] = useState('profile');
  const [toast,         setToast]         = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const saveName = () => {
    if (!tempName.trim()) return showToast('Username tidak boleh kosong!', 'error');
    if (tempName.trim().length < 3) return showToast('Username minimal 3 karakter!', 'error');
    setDisplayName(tempName.trim());
    setUsername && setUsername(tempName.trim());
    setEditingName(false);
    showToast('Username berhasil diperbarui! ✨');
  };

  const toggleFeatured = (id) => {
    const badge = badges.find(b => b.id === id);
    if (!badge?.earned) return showToast('Kamu belum mendapatkan badge ini!', 'error');
    setFeaturedBadges(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return showToast('Maksimal 3 badge unggulan!', 'error') || prev;
      return [...prev, id];
    });
  };

  const visibleBadges = badges
    .filter(b => filterTab === 'all' ? true : b.earned)
    .sort((a, b) => sortBy === 'rarity'
      ? rarityOrder[b.rarity] - rarityOrder[a.rarity]
      : a.name.localeCompare(b.name)
    );

  const heroClasses = ['Web Warrior', 'Data Mage', 'Logic Knight', 'UI Sorcerer', 'Backend Paladin'];

  const sidebarItems = [
    { id: 'profile', icon: '👤', label: 'Profil & Username' },
    { id: 'badges',  icon: '🏅', label: 'Badge & Lencana'  },
    { id: 'display', icon: '🎨', label: 'Tampilan Profil'  },
  ];

  return (
    <div style={{ padding: '80px 32px 40px', minHeight: '100vh', color: '#F8FAFC' }}>
      {/* Page Header */}
      <div style={{ marginBottom: 32, animation: 'fade-up 0.4s ease both' }}>
        <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: 28, fontWeight: 700, color: '#F8FAFC' }}>
          ⚙️ Settings
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 14, marginTop: 4 }}>
          Kelola profil, badge, dan tampilan akun SIRA kamu
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24 }}>

        {/* ── Sidebar ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {sidebarItems.map(item => (
            <button key={item.id} onClick={() => setActiveSection(item.id)} style={{
              background: activeSection === item.id ? 'rgba(34,211,238,0.1)' : 'transparent',
              border: `1px solid ${activeSection === item.id ? '#22D3EE55' : 'transparent'}`,
              borderLeft: `3px solid ${activeSection === item.id ? '#22D3EE' : 'transparent'}`,
              borderRadius: 8, padding: '10px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
              color: activeSection === item.id ? '#22D3EE' : '#94A3B8',
              fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 500,
            }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}

          {/* Preview Card */}
          <div style={{
            marginTop: 16, background: '#1E293B', border: '1px solid #334155',
            borderRadius: 12, padding: 16,
          }}>
            <div style={{ fontSize: 11, color: '#94A3B8', fontFamily: 'Space Mono, monospace', marginBottom: 12 }}>PREVIEW</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(34,211,238,0.3), rgba(167,139,250,0.3))',
                border: '2px solid #22D3EE',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 700, color: '#F8FAFC',
                fontFamily: 'Space Mono, monospace',
              }}>{displayName.charAt(0).toUpperCase()}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: '#F8FAFC' }}>{displayName}</div>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>{heroClass}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {featuredBadges.map(id => {
                const badge = badges.find(b => b.id === id);
                if (!badge) return null;
                return (
                  <div key={id} title={badge.name} style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: `${rarityColor[badge.rarity]}22`,
                    border: `1px solid ${rarityColor[badge.rarity]}55`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14,
                  }}>{badge.icon}</div>
                );
              })}
              {featuredBadges.length === 0 && (
                <span style={{ fontSize: 11, color: '#94A3B8' }}>Belum ada badge unggulan</span>
              )}
            </div>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div style={{ animation: 'fade-up 0.4s ease both' }}>

          {/* ════ SECTION: PROFIL & USERNAME ════ */}
          {activeSection === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Card>
                <SectionTitle icon="👤" title="Informasi Profil" />

                {/* Display Name */}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 12, color: '#94A3B8', fontFamily: 'Space Mono, monospace', display: 'block', marginBottom: 8 }}>
                    DISPLAY NAME
                  </label>
                  {editingName ? (
                    <div style={{ display: 'flex', gap: 10 }}>
                      <input
                        value={tempName}
                        onChange={e => setTempName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && saveName()}
                        maxLength={30}
                        autoFocus
                        style={{
                          flex: 1, background: '#0F172A',
                          border: '1px solid #22D3EE',
                          borderRadius: 8, padding: '10px 14px',
                          color: '#F8FAFC', fontSize: 14,
                          fontFamily: 'DM Sans, sans-serif',
                          outline: 'none',
                          boxShadow: '0 0 0 3px rgba(34,211,238,0.1)',
                        }}
                      />
                      <button onClick={saveName} style={{
                        background: '#22D3EE', border: 'none', borderRadius: 8,
                        padding: '10px 20px', color: '#0F172A', cursor: 'pointer',
                        fontWeight: 700, fontSize: 13, fontFamily: 'Space Mono, monospace',
                      }}>Simpan</button>
                      <button onClick={() => { setEditingName(false); setTempName(displayName); }} style={{
                        background: 'none', border: '1px solid #334155', borderRadius: 8,
                        padding: '10px 16px', color: '#94A3B8', cursor: 'pointer', fontSize: 13,
                      }}>Batal</button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        flex: 1, background: '#0F172A', border: '1px solid #334155',
                        borderRadius: 8, padding: '10px 14px',
                        color: '#F8FAFC', fontSize: 14,
                        fontFamily: 'DM Sans, sans-serif',
                      }}>{displayName}</div>
                      <button onClick={() => { setEditingName(true); setTempName(displayName); }} style={{
                        background: 'none', border: '1px solid #22D3EE55', borderRadius: 8,
                        padding: '10px 16px', color: '#22D3EE', cursor: 'pointer',
                        fontSize: 13, fontFamily: 'Space Mono, monospace',
                        transition: 'all 0.2s',
                      }}>✏️ Edit</button>
                    </div>
                  )}
                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 6 }}>
                    {tempName.length}/30 karakter · Nama ini tampil di semua halaman publik
                  </div>
                </div>

                {/* Bio */}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 12, color: '#94A3B8', fontFamily: 'Space Mono, monospace', display: 'block', marginBottom: 8 }}>
                    BIO
                  </label>
                  <textarea
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    maxLength={120}
                    rows={3}
                    style={{
                      width: '100%', background: '#0F172A', border: '1px solid #334155',
                      borderRadius: 8, padding: '10px 14px',
                      color: '#F8FAFC', fontSize: 14, fontFamily: 'DM Sans, sans-serif',
                      outline: 'none', resize: 'none',
                      transition: 'border 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#22D3EE'}
                    onBlur={e => e.target.style.borderColor = '#334155'}
                  />
                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>{bio.length}/120 karakter</div>
                </div>

                {/* Hero Class */}
                <div>
                  <label style={{ fontSize: 12, color: '#94A3B8', fontFamily: 'Space Mono, monospace', display: 'block', marginBottom: 8 }}>
                    HERO CLASS
                  </label>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {heroClasses.map(cls => (
                      <button key={cls} onClick={() => setHeroClass(cls)} style={{
                        background: heroClass === cls ? 'rgba(167,139,250,0.15)' : '#0F172A',
                        border: `1px solid ${heroClass === cls ? '#A78BFA' : '#334155'}`,
                        borderRadius: 8, padding: '8px 16px', cursor: 'pointer',
                        color: heroClass === cls ? '#A78BFA' : '#94A3B8',
                        fontSize: 13, fontFamily: 'DM Sans, sans-serif',
                        transition: 'all 0.2s',
                      }}>{cls}</button>
                    ))}
                  </div>
                </div>
              </Card>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => showToast('Profil berhasil disimpan! ✨')} style={{
                  background: 'linear-gradient(135deg, #22D3EE, #A78BFA)',
                  border: 'none', borderRadius: 8,
                  padding: '12px 32px', color: '#0F172A',
                  fontWeight: 700, fontSize: 14, cursor: 'pointer',
                  fontFamily: 'Space Mono, monospace',
                  boxShadow: '0 0 20px rgba(34,211,238,0.3)',
                }}>💾 Simpan Perubahan</button>
              </div>
            </div>
          )}

          {/* ════ SECTION: BADGE & LENCANA ════ */}
          {activeSection === 'badges' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Card>
                <SectionTitle icon="⭐" title="Badge Unggulan" />
                <p style={{ color: '#94A3B8', fontSize: 13, marginBottom: 20 }}>
                  Pilih hingga <strong style={{ color: '#22D3EE' }}>3 badge</strong> untuk ditampilkan di profil publikmu.
                  Klik badge di bawah untuk menambah/melepas dari unggulan.
                </p>

                <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                  {[0, 1, 2].map(slot => {
                    const id    = featuredBadges[slot];
                    const badge = badges.find(b => b.id === id);
                    return (
                      <div key={slot} style={{
                        flex: 1, minHeight: 90, borderRadius: 12,
                        background: badge ? `${rarityColor[badge.rarity]}11` : '#0F172A',
                        border: `2px dashed ${badge ? rarityColor[badge.rarity] + '66' : '#334155'}`,
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', gap: 6,
                        transition: 'all 0.2s',
                        position: 'relative',
                      }}>
                        {badge ? (
                          <>
                            <span style={{ fontSize: 28 }}>{badge.icon}</span>
                            <span style={{ fontSize: 11, color: rarityColor[badge.rarity], fontWeight: 600 }}>{badge.name}</span>
                            <NeonBadge color={rarityColor[badge.rarity]}>{badge.rarity}</NeonBadge>
                            <button onClick={() => toggleFeatured(id)} style={{
                              position: 'absolute', top: 6, right: 6,
                              background: 'rgba(248,113,113,0.15)', border: '1px solid #F87171',
                              borderRadius: 6, width: 22, height: 22, cursor: 'pointer',
                              color: '#F87171', fontSize: 12, display: 'flex',
                              alignItems: 'center', justifyContent: 'center',
                            }}>×</button>
                          </>
                        ) : (
                          <>
                            <span style={{ fontSize: 24, opacity: 0.3 }}>🏅</span>
                            <span style={{ fontSize: 11, color: '#94A3B8' }}>Slot {slot + 1}</span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card>
                <SectionTitle icon="🎖️" title="Koleksi Badge" />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[['earned','✅ Diperoleh'],['all','🔓 Semua']].map(([val, label]) => (
                      <button key={val} onClick={() => setFilterTab(val)} style={{
                        background: filterTab === val ? 'rgba(34,211,238,0.15)' : '#0F172A',
                        border: `1px solid ${filterTab === val ? '#22D3EE' : '#334155'}`,
                        borderRadius: 8, padding: '6px 14px', cursor: 'pointer',
                        color: filterTab === val ? '#22D3EE' : '#94A3B8',
                        fontSize: 12, fontFamily: 'Space Mono, monospace',
                      }}>{label}</button>
                    ))}
                  </div>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                    background: '#0F172A', border: '1px solid #334155', borderRadius: 8,
                    padding: '6px 12px', color: '#94A3B8', fontSize: 12,
                    fontFamily: 'Space Mono, monospace', cursor: 'pointer', outline: 'none',
                  }}>
                    <option value="rarity">Sort: Rarity</option>
                    <option value="name">Sort: Nama</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {visibleBadges.map(badge => {
                    const isFeatured = featuredBadges.includes(badge.id);
                    const col = rarityColor[badge.rarity];
                    return (
                      <div key={badge.id}
                        onClick={() => badge.earned && toggleFeatured(badge.id)}
                        style={{
                          background: isFeatured ? `${col}15` : '#0F172A',
                          border: `1px solid ${isFeatured ? col : badge.earned ? '#334155' : '#1E293B'}`,
                          borderRadius: 10, padding: '14px 16px',
                          display: 'flex', alignItems: 'center', gap: 12,
                          cursor: badge.earned ? 'pointer' : 'not-allowed',
                          opacity: badge.earned ? 1 : 0.4,
                          transition: 'all 0.2s',
                          position: 'relative',
                          filter: badge.earned ? 'none' : 'grayscale(1)',
                        }}>
                        {isFeatured && (
                          <div style={{
                            position: 'absolute', top: 6, right: 6,
                            width: 16, height: 16, borderRadius: '50%',
                            background: col, display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            fontSize: 9, color: '#0F172A', fontWeight: 700,
                          }}>★</div>
                        )}
                        <div style={{
                          width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                          background: `${col}22`, border: `1px solid ${col}44`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 22,
                          boxShadow: isFeatured ? `0 0 12px ${col}44` : 'none',
                        }}>{badge.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2, color: '#F8FAFC' }}>{badge.name}</div>
                          <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 6 }}>{badge.desc}</div>
                          <NeonBadge color={col}>{badge.rarity}</NeonBadge>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {visibleBadges.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#94A3B8' }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>🔒</div>
                    <div style={{ fontSize: 14 }}>Belum ada badge yang diperoleh</div>
                    <div style={{ fontSize: 12, marginTop: 4 }}>Selesaikan quest untuk mendapatkan badge!</div>
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* ════ SECTION: TAMPILAN PROFIL ════ */}
          {activeSection === 'display' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Card>
                <SectionTitle icon="🎨" title="Tampilan Profil Publik" />
                <p style={{ color: '#94A3B8', fontSize: 13, marginBottom: 24 }}>
                  Atur informasi yang tampil ketika orang lain mengunjungi profilmu.
                </p>

                {[
                  ['Tampilkan Level', true],
                  ['Tampilkan Streak', true],
                  ['Tampilkan Badge Unggulan', true],
                  ['Tampilkan Activity Heatmap', false],
                  ['Tampilkan Total XP', true],
                  ['Profil dapat ditemukan di pencarian', true],
                ].map(([label, defaultVal], i) => (
                  <ToggleRow key={i} label={label} defaultChecked={defaultVal} />
                ))}
              </Card>

              <Card>
                <SectionTitle icon="🔗" title="Link Profil" />
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{
                    flex: 1, background: '#0F172A', border: '1px solid #334155',
                    borderRadius: 8, padding: '10px 14px',
                    color: '#94A3B8', fontSize: 13, fontFamily: 'Space Mono, monospace',
                  }}>
                    sira.app/profile/<span style={{ color: '#22D3EE' }}>
                      {displayName.toLowerCase().replace(/\s+/g, '-')}
                    </span>
                  </div>
                  <button onClick={() => showToast('Link disalin! 🔗')} style={{
                    background: 'none', border: '1px solid #22D3EE55', borderRadius: 8,
                    padding: '10px 16px', color: '#22D3EE', cursor: 'pointer',
                    fontSize: 13, fontFamily: 'Space Mono, monospace',
                  }}>📋 Salin</button>
                </div>
              </Card>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => showToast('Pengaturan tampilan disimpan! ✨')} style={{
                  background: 'linear-gradient(135deg, #22D3EE, #A78BFA)',
                  border: 'none', borderRadius: 8,
                  padding: '12px 32px', color: '#0F172A',
                  fontWeight: 700, fontSize: 14, cursor: 'pointer',
                  fontFamily: 'Space Mono, monospace',
                  boxShadow: '0 0 20px rgba(34,211,238,0.3)',
                }}>💾 Simpan Perubahan</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

// ─── TOGGLE ROW COMPONENT ─────────────────────────────────────────────────────
function ToggleRow({ label, defaultChecked }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 0', borderBottom: '1px solid #1E293B',
    }}>
      <span style={{ fontSize: 14, color: checked ? '#F8FAFC' : '#94A3B8' }}>{label}</span>
      <div
        onClick={() => setChecked(!checked)}
        style={{
          width: 44, height: 24, borderRadius: 999, cursor: 'pointer',
          background: checked ? '#22D3EE' : '#334155',
          position: 'relative', transition: 'background 0.2s',
          boxShadow: checked ? '0 0 10px rgba(34,211,238,0.4)' : 'none',
        }}>
        <div style={{
          position: 'absolute', top: 3, left: checked ? 23 : 3,
          width: 18, height: 18, borderRadius: '50%',
          background: '#F8FAFC', transition: 'left 0.2s',
        }} />
      </div>
    </div>
  );
}