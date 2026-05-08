/**
 * App.jsx
 * -------
 * Root application component.
 * Renders the header, stats bar, and the main TreeFlow canvas.
 */

import TreeFlow from './components/TreeFlow';

export default function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#0d1117',
        color: '#e6edf3',
        fontFamily: '"IBM Plex Sans", sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* ── Header ────────────────────────────────────────────────── */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          height: 52,
          background: '#161b22',
          borderBottom: '1px solid #21262d',
          flexShrink: 0,
        }}
      >
        {/* Logo / Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#58a6ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="5" r="3" />
            <line x1="12" y1="8" x2="12" y2="11" />
            <line x1="12" y1="11" x2="6" y2="14" />
            <line x1="12" y1="11" x2="18" y2="14" />
            <circle cx="6" cy="17" r="3" />
            <circle cx="18" cy="17" r="3" />
          </svg>
          <span
            style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: 15,
              fontWeight: 500,
              color: '#e6edf3',
              letterSpacing: '-0.02em',
            }}
          >
            tree<span style={{ color: '#58a6ff' }}>.</span>visualizer
          </span>
        </div>

        {/* Right side info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Chip label="Depth 3–4" color="#3fb950" />
          <Chip label="React Flow" color="#58a6ff" />
          <Chip label="Infollion Task 4" color="#f0883e" />
          <div
            style={{
              fontSize: 11,
              color: '#8b949e',
              fontFamily: '"DM Mono", monospace',
            }}
          >
            Click nodes to select · Toggle ± to expand/collapse
          </div>
        </div>
      </header>

      {/* ── Main Canvas ───────────────────────────────────────────── */}
      <main style={{ flex: 1, overflow: 'hidden' }}>
        <TreeFlow />
      </main>
    </div>
  );
}

/** Small label chip used in header */
function Chip({ label, color }) {
  return (
    <span
      style={{
        fontSize: 10,
        fontFamily: '"DM Mono", monospace',
        color,
        background: `${color}18`,
        border: `1px solid ${color}44`,
        borderRadius: 4,
        padding: '2px 7px',
        letterSpacing: '0.04em',
      }}
    >
      {label}
    </span>
  );
}
