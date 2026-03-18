'use client';

import { useState } from 'react';

export default function WorkshopPage() {
  const [html, setHtml] = useState(`<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My Project</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>`);
  const [css,  setCss]  = useState(`* {\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  font-family: Arial, sans-serif;\n}`);
  const [js,   setJs]   = useState(`console.log("Welcome to Workshop!");`);
  const [activeTab,  setActiveTab]  = useState('html');
  const [consoleLog, setConsoleLog] = useState([]);
  const [running,    setRunning]    = useState(false);

  const values  = { html, css, js };
  const setters = { html: setHtml, css: setCss, js: setJs };

  const runCode = () => {
    setRunning(true);
    setConsoleLog([{ type: 'success', msg: 'Code executed successfully' }]);
    setTimeout(() => setRunning(false), 500);
  };

  return (
    <div style={{ paddingTop: 60, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        padding: '16px 32px', borderBottom: '1px solid #334155',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: 20, fontWeight: 700 }}>Workshop — Free Coding</h1>
          <p style={{ color: '#475569', fontSize: 13, marginTop: 2 }}>Learn and practice coding with templates</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[['📋','Templates'],['↩','Reset']].map(([icon,label]) => (
            <button key={label} style={{
              background: 'none', border: '1px solid #334155', borderRadius: 8,
              padding: '7px 14px', color: '#475569', cursor: 'pointer', fontSize: 13,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>{icon} {label}</button>
          ))}
          <button onClick={runCode} style={{
            background: '#22D3EE', border: 'none', borderRadius: 8,
            padding: '7px 20px', color: '#0F172A', cursor: 'pointer',
            fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: 'Space Mono, monospace',
            boxShadow: running ? '0 0 20px #22D3EE' : 'none', transition: 'box-shadow 0.3s',
          }}>{running ? '⟳' : '▶'} Run</button>
          <button style={{
            background: 'none', border: '1px solid #334155', borderRadius: 8,
            padding: '7px 14px', color: '#475569', cursor: 'pointer', fontSize: 13,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>⬇ Download</button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', background: '#1E293B', borderBottom: '1px solid #334155' }}>
          {['html','css','js'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '10px 24px', fontSize: 12, fontFamily: 'Space Mono, monospace', fontWeight: 700,
              color: activeTab===tab ? '#22D3EE' : '#475569',
              borderBottom: activeTab===tab ? '2px solid #22D3EE' : '2px solid transparent',
              textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>{tab}</button>
          ))}
        </div>

        <div style={{ flex: 1, display: 'grid', gridTemplateRows: '1fr 1fr', overflow: 'hidden' }}>
          <textarea value={values[activeTab]} onChange={e => setters[activeTab](e.target.value)} style={{
            width: '100%', background: '#0D1117', color: '#F8FAFC',
            fontFamily: 'Space Mono, monospace', fontSize: 13, lineHeight: 1.7,
            border: 'none', outline: 'none', padding: '20px 24px', resize: 'none', overflow: 'auto',
          }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #334155' }}>
            <div style={{ overflow: 'hidden', borderRight: '1px solid #334155' }}>
              <div style={{ background: '#1E293B', padding: '8px 16px', fontSize: 11, color: '#475569', fontFamily: 'Space Mono, monospace', borderBottom: '1px solid #334155' }}>PREVIEW</div>
              <iframe srcDoc={`${html}<style>${css}</style><script>${js}</script>`}
                style={{ width: '100%', height: 'calc(100% - 33px)', border: 'none', background: '#fff' }} title="preview" />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ background: '#1E293B', padding: '8px 16px', fontSize: 11, color: '#475569', fontFamily: 'Space Mono, monospace', borderBottom: '1px solid #334155' }}>CONSOLE OUTPUT</div>
              <div style={{ padding: 16, fontFamily: 'Space Mono, monospace', fontSize: 12, background: '#070F1A', height: 'calc(100% - 33px)' }}>
                {consoleLog.length===0
                  ? <span style={{ color: '#475569' }}>Run code to see output</span>
                  : consoleLog.map((log,i) => (
                    <div key={i} style={{ color: log.type==='error'?'#F87171':'#34D399' }}>
                      {log.type==='error'?'✗':'✓'} {log.msg}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}