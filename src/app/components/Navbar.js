'use client';

import { useState } from 'react';

export default function Navbar({ page, setPage, username, onLogout }) {
  const [avatarHovered, setAvatarHovered] = useState(false);

  const navItems = [
    { id: 'adventure', label: 'Adventure' },
    { id: 'workshop',  label: 'Workshop'  },
    { id: 'squad',     label: 'Squad'     },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(15,23,42,0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px', height: 60,
    }}>

      {/* Logo */}
      <div onClick={() => setPage('adventure')}
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, #22D3EE, #A78BFA)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Space Mono, monospace', fontWeight: 700, fontSize: 14, color: '#fff',
        }}>S</div>
        <span style={{
          fontFamily: 'Space Mono, monospace', fontWeight: 700,
          fontSize: 16, letterSpacing: '0.1em',
          color: '#F8FAFC',
        }}>SIRA</span>
      </div>

      {/* Nav Items */}
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 4 }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setPage(item.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '6px 16px', borderRadius: 8,
            fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 500,
            color: page === item.id ? '#22D3EE' : '#475569',
            borderBottom: page === item.id ? '2px solid #22D3EE' : '2px solid transparent',
            transition: 'all 0.2s',
          }}>{item.label}</button>
        ))}
      </div>

      {/* Right Side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

        {/* Avatar → Profile */}
        <div
          onClick={() => setPage('profile')}
          onMouseEnter={() => setAvatarHovered(true)}
          onMouseLeave={() => setAvatarHovered(false)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
            padding: '4px 10px 4px 4px', borderRadius: 999,
            background: avatarHovered ? 'rgba(34,211,238,0.08)' : 'transparent',
            border: `1px solid ${page === 'profile' ? '#22D3EE' : avatarHovered ? 'rgba(34,211,238,0.4)' : 'transparent'}`,
            transition: 'all 0.2s',
          }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(34,211,238,0.3), rgba(167,139,250,0.3))',
            border: `2px solid ${page === 'profile' ? '#22D3EE' : 'rgba(34,211,238,0.4)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: '#F8FAFC',
            transition: 'all 0.2s',
          }}>{(username || 'R').charAt(0).toUpperCase()}</div>
          <span style={{
            fontSize: 13,
            color: page === 'profile' ? '#22D3EE' : avatarHovered ? '#F8FAFC' : '#475569',
            fontWeight: page === 'profile' ? 600 : 400,
            transition: 'color 0.2s',
          }}>{username || 'Hero'}</span>
        </div>

        {/* Settings */}
        <button onClick={() => setPage('settings')} style={{
          background: page === 'settings' ? 'rgba(167,139,250,0.15)' : 'none',
          border: `1px solid ${page === 'settings' ? '#A78BFA' : '#334155'}`,
          borderRadius: 8, padding: '5px 12px',
          color: page === 'settings' ? '#A78BFA' : '#475569',
          fontSize: 16, cursor: 'pointer', transition: 'all 0.2s',
        }}>⚙️</button>

        {/* Logout */}
        <button
          onClick={() => onLogout && onLogout()}
          style={{
            background: 'none',
            border: '1px solid #334155',
            borderRadius: 8, padding: '5px 12px',
            color: '#475569', fontSize: 14, cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#F87171';
            e.currentTarget.style.color = '#F87171';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#334155';
            e.currentTarget.style.color = '#475569';
          }}
        >
          Logout
        </button>

      </div>
    </nav>
  );
}