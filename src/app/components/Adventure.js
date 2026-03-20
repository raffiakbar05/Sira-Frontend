'use client';

import { useState } from 'react';
import { questsData, connections, regionColors } from '../lib/data';

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

function Card({ children, style = {}, glow, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#1E293B',
        border: `1px solid ${hovered && glow ? glow + '55' : '#334155'}`,
        borderRadius: 12, padding: '20px', transition: 'all 0.2s ease',
        transform: hovered && onClick ? 'translateY(-2px)' : 'none',
        boxShadow: hovered && glow ? `0 0 20px ${glow}22` : 'none',
        cursor: onClick ? 'pointer' : 'default', ...style,
      }}>{children}</div>
  );
}

export default function AdventurePage({ setPage }) {
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [hoveredNode, setHoveredNode]     = useState(null);

  const getNodeStyle = (quest) => {
    const col = regionColors[quest.region];
    if (quest.status === 'done')   return { bg: col + '33', border: col, color: col };
    if (quest.status === 'active') return { bg: 'transparent', border: col, color: col, glow: col };
    return { bg: 'transparent', border: '#475569', color: '#475569' };
  };

  return (
    <div style={{ paddingTop: 60, minHeight: '100vh', color: '#F8FAFC' }}>
      <div style={{ padding: '32px 32px 0' }}>
        <div style={{ animation: 'fade-up 0.5s ease both' }}>
          <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: 32, fontWeight: 700, marginBottom: 6, color: '#F8FAFC' }}>Adventure Map</h1>
          <p style={{ color: '#94A3B8', fontSize: 14 }}>Selamat datang kembali, Raffi akbar! Lanjutkan petualangan coding Anda</p>
        </div>

        <Card style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700, fontSize: 18, marginBottom: 4, color: '#F8FAFC' }}>Level 1</div>
            <div style={{ color: '#94A3B8', fontSize: 13 }}>0 / 5000 EXP</div>
          </div>
          <div style={{ width: '55%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: '#94A3B8' }}>Progress</span>
              <NeonBadge color="#22D3EE">0%</NeonBadge>
            </div>
            <XPBar current={0} max={5000} />
          </div>
        </Card>
      </div>

      <div style={{ padding: '24px 32px' }}>
        {/* SVG Map */}
        <div style={{ background: '#1E293B', borderRadius: 16, border: '1px solid #334155', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 5, display: 'flex', gap: 12 }}>
            {[['coastal','#22D3EE','Coastal Republic'],['highlands','#A78BFA','Data Highlands'],['citadel','#F59E0B','Logic Citadel']].map(([key,col,label]) => (
              <div key={key} style={{
                background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(8px)',
                border: `1px solid ${col}44`, borderRadius: 8,
                padding: '4px 12px', fontSize: 11, color: col,
                fontFamily: 'Space Mono, monospace', fontWeight: 700,
              }}>{label}</div>
            ))}
          </div>

          <svg width="100%" height="440" style={{ display: 'block' }}>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(71,85,105,0.15)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {connections.map(([a,b],i) => {
              const qa = questsData.find(q => q.id===a);
              const qb = questsData.find(q => q.id===b);
              if (!qa||!qb) return null;
              const col = regionColors[qa.region];
              const active = qa.status!=='locked' && qb.status!=='locked';
              return <line key={i} x1={qa.x} y1={qa.y} x2={qb.x} y2={qb.y}
                stroke={active?col:'#334155'} strokeWidth={active?1.5:1}
                strokeDasharray={active?'none':'4,4'} opacity={active?0.6:0.3} />;
            })}
            {questsData.map((quest,i) => {
              const ns = getNodeStyle(quest);
              const col = regionColors[quest.region];
              const isHovered  = hoveredNode===quest.id;
              const isSelected = selectedQuest?.id===quest.id;
              const r = 22;
              return (
                <g key={quest.id}
                  style={{ cursor:'pointer', animation:`node-appear 0.5s ${i*0.06}s ease both` }}
                  onMouseEnter={() => setHoveredNode(quest.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setSelectedQuest(quest.status!=='locked'?quest:null)}
                  transform={`translate(${quest.x},${quest.y})`}>
                  {quest.status==='active' && (
                    <circle r={r+8} fill="none" stroke={col} strokeWidth="1" opacity="0.3"
                      style={{ animation:'pulse-glow 2s infinite' }} />
                  )}
                  <circle r={isHovered?r+4:r} fill={ns.bg} stroke={ns.border}
                    strokeWidth={quest.status==='locked'?1.5:2}
                    strokeDasharray={quest.status==='locked'?'4,2':'none'}
                    style={{ transition:'r 0.15s ease', filter:ns.glow?`drop-shadow(0 0 8px ${ns.glow})`:'none' }} />
                  <text textAnchor="middle" dominantBaseline="central"
                    fontSize={quest.status==='locked'?14:16} fill={ns.color} style={{ userSelect:'none' }}>
                    {quest.status==='done'?'✓':quest.status==='active'?'▶':'🔒'}
                  </text>
                  {(isHovered||isSelected) && (
                    <g>
                      <rect x={-50} y={r+6} width={100} height={20} rx={4}
                        fill="rgba(15,23,42,0.95)" stroke={col} strokeWidth="1" />
                      <text x={0} y={r+19} textAnchor="middle" fontSize={10}
                        fill={col} fontFamily="Space Mono" style={{ userSelect:'none' }}>
                        {quest.title}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Quest Detail */}
        {selectedQuest && (
          <div style={{
            marginTop: 16, background: '#1E293B',
            border: `1px solid ${regionColors[selectedQuest.region]}55`,
            borderLeft: `3px solid ${regionColors[selectedQuest.region]}`,
            borderRadius: 12, padding: 20, animation: 'scale-in 0.2s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 18, fontWeight: 700, color: '#F8FAFC' }}>{selectedQuest.title}</span>
                <NeonBadge color={regionColors[selectedQuest.region]}>+{selectedQuest.xp} XP</NeonBadge>
              </div>
              <p style={{ color: '#94A3B8', fontSize: 14 }}>{selectedQuest.desc}</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setSelectedQuest(null)} style={{
                background: 'none', border: '1px solid #334155', borderRadius: 8,
                padding: '8px 16px', color: '#94A3B8', cursor: 'pointer', fontSize: 13,
              }}>Tutup</button>
              <button onClick={() => setPage('workshop')} style={{
                background: regionColors[selectedQuest.region], border: 'none', borderRadius: 8,
                padding: '8px 20px', color: '#0F172A', cursor: 'pointer',
                fontWeight: 700, fontSize: 13, fontFamily: 'Space Mono, monospace',
              }}>Mulai Quest →</button>
            </div>
          </div>
        )}

        {/* Lesson Cards */}
        <div style={{ marginTop: 32 }}>
          <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F8FAFC' }}>Pelajaran</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {questsData.slice(0,6).map((quest,i) => {
              const col = regionColors[quest.region];
              return (
                <Card key={quest.id} glow={quest.status!=='locked'?col:null}
                  onClick={quest.status!=='locked'?()=>setPage('workshop'):null}
                  style={{ animation:`fade-up ${0.3+i*0.06}s ease both`, opacity:quest.status==='locked'?0.5:1 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                    <div>
                      <div style={{ fontWeight:600, fontSize:15, color: '#F8FAFC' }}>{quest.title}</div>
                      <div style={{ color:'#94A3B8', fontSize:12, marginTop:2 }}>{quest.desc}</div>
                    </div>
                    <span style={{ fontSize:20 }}>
                      {quest.status==='done'?'✅':quest.status==='active'?'⏱️':'🔒'}
                    </span>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:16 }}>
                    <NeonBadge color={col}>+{quest.xp} XP</NeonBadge>
                    {quest.status!=='locked' && (
                      <button style={{
                        background: quest.status==='active'?col:'transparent',
                        border:`1px solid ${col}`, color:quest.status==='active'?'#0F172A':col,
                        borderRadius:6, padding:'4px 14px', fontSize:12,
                        fontWeight:700, cursor:'pointer', fontFamily:'Space Mono, monospace',
                      }}>{quest.status==='active'?'Lanjutkan':'Mulai'}</button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}