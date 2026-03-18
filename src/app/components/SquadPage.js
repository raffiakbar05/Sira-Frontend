'use client';

import { useState } from 'react';
import { squadsData, leaderboard, levelColor } from '../lib/data';

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

export default function SquadPage() {
  const [squads, setSquads] = useState(squadsData);
  const toggleJoin = (id) => setSquads(prev => prev.map(s => s.id===id ? {...s, joined:!s.joined} : s));

  return (
    <div style={{ padding: '80px 32px 32px' }}>
      <div style={{ animation: 'fade-up 0.4s ease both', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: 28, fontWeight: 700 }}>Squad &amp; Community</h1>
        <p style={{ color: '#475569', fontSize: 14, marginTop: 4 }}>Learn together, grow together</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
        <div>
          <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: 16, color: '#475569', marginBottom: 16 }}>Available Squads</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {squads.map((squad,i) => {
              const col = levelColor[squad.level];
              return (
                <div key={squad.id} style={{
                  background: '#1E293B', borderRadius: 12, padding: 20,
                  borderLeft: `3px solid ${col}`, border: `1px solid ${col}33`,
                  animation: `fade-up ${0.4+i*0.08}s ease both`,
                }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:16, marginBottom:8 }}>{squad.name}</div>
                      <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                        <span style={{ fontSize:12, color:'#475569' }}>👥 {squad.members} members</span>
                        <NeonBadge color={col}>{squad.level}</NeonBadge>
                      </div>
                    </div>
                    <button onClick={() => toggleJoin(squad.id)} style={{
                      background: squad.joined?'transparent':col, border:`1px solid ${col}`,
                      borderRadius:8, padding:'7px 20px', color:squad.joined?col:'#0F172A',
                      cursor:'pointer', fontWeight:700, fontSize:13,
                      fontFamily:'Space Mono, monospace', transition:'all 0.2s',
                    }}>{squad.joined?'✓ Joined':'Join'}</button>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:8, color:'#34D399', fontSize:13 }}>
                    <span>↑</span>
                    <span style={{ fontFamily:'Space Mono, monospace', fontWeight:700 }}>{squad.xp.toLocaleString()}</span>
                    <span style={{ color:'#475569' }}>total XP earned</span>
                  </div>
                  {squad.joined && <div style={{ marginTop:14 }}><XPBar current={squad.xp} max={30000} color={col} height={4} /></div>}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div style={{ background:'#1E293B', border:'1px solid #334155', borderRadius:12, padding:20, position:'sticky', top:80 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
              <span style={{ color:'#F59E0B', fontSize:20 }}>🏆</span>
              <h2 style={{ fontFamily:'Space Mono, monospace', fontSize:16, fontWeight:700 }}>Global Top 5</h2>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {leaderboard.map((player,i) => {
                const rankColor = i===0?'#F59E0B':i===1?'#94A3B8':i===2?'#CD7F32':'#475569';
                return (
                  <div key={i} style={{
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                    padding:'10px 14px', borderRadius:10,
                    background: player.isYou?'rgba(34,211,238,0.08)':'#0F172A',
                    border:`1px solid ${player.isYou?'rgba(34,211,238,0.3)':'#334155'}`,
                    animation:`slide-right ${0.5+i*0.07}s ease both`,
                  }}>
                    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                      <div style={{
                        width:28, height:28, borderRadius:'50%',
                        background:`${rankColor}22`, border:`2px solid ${rankColor}`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:11, fontWeight:700, fontFamily:'Space Mono, monospace', color:rankColor,
                      }}>{player.rank}</div>
                      <div>
                        <div style={{ fontWeight:600, fontSize:13, color:player.isYou?'#22D3EE':'#F8FAFC' }}>{player.name}</div>
                        <div style={{ fontSize:10, color:'#475569' }}>Lvl {player.lvl}</div>
                      </div>
                    </div>
                    <span style={{ fontFamily:'Space Mono, monospace', fontWeight:700, fontSize:13, color:player.isYou?'#22D3EE':'#F8FAFC' }}>
                      {player.xp.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}