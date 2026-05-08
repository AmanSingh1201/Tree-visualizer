/**
 * CustomNode.jsx
 * --------------
 * Custom React Flow node component.
 *
 * Renders a single tree node with:
 *  - Node label
 *  - Expand / Collapse toggle button (only for nodes with children)
 *  - Hover highlight effect
 *  - Selected state styling
 *  - Metadata tooltip on hover
 *  - Depth-based colour accents
 */

import { memo, useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

/**
 * Depth-indexed accent colours.
 * Each level of the tree gets a distinct colour for visual hierarchy.
 */
const DEPTH_COLORS = [
  { border: '#58a6ff', bg: '#1a3a5c', dot: '#58a6ff' }, // depth 0 – blue
  { border: '#3fb950', bg: '#1a3b22', dot: '#3fb950' }, // depth 1 – green
  { border: '#f0883e', bg: '#3b2510', dot: '#f0883e' }, // depth 2 – orange
  { border: '#bc8cff', bg: '#2d1f4e', dot: '#bc8cff' }, // depth 3 – purple
  { border: '#ff7b72', bg: '#3b1a1a', dot: '#ff7b72' }, // depth 4 – red
  { border: '#79c0ff', bg: '#1a2d3b', dot: '#79c0ff' }, // depth 5 – sky
];

/**
 * CustomNode component
 *
 * Props are passed via React Flow's `data` property:
 *  @param {string}   data.label       - Display text
 *  @param {Object}   data.meta        - Metadata object { type, description }
 *  @param {boolean}  data.hasChildren - Whether node has children
 *  @param {boolean}  data.isCollapsed - Whether node is currently collapsed
 *  @param {number}   data.childCount  - Number of direct children
 *  @param {Function} data.onToggle    - Callback to toggle expand/collapse
 */
const CustomNode = memo(({ data, selected }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { label, meta, hasChildren, isCollapsed, childCount, onToggle } = data;

  // Determine accent colour based on depth (meta.depth)
  const depth = meta?.depth ?? 0;
  const accent = DEPTH_COLORS[Math.min(depth, DEPTH_COLORS.length - 1)];

  // Handle toggle click – stop propagation so React Flow doesn't deselect
  const handleToggle = useCallback(
    (e) => {
      e.stopPropagation();
      if (onToggle) onToggle();
    },
    [onToggle]
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
    >
      {/* ── Main Node Card ─────────────────────────────────────────── */}
      <div
        style={{
          width: 160,
          minHeight: 54,
          background: selected
            ? accent.bg
            : isHovered
            ? '#1e2736'
            : '#161b22',
          border: `1.5px solid ${selected || isHovered ? accent.border : '#30363d'}`,
          borderRadius: 8,
          padding: '10px 14px',
          cursor: 'default',
          transition: 'all 0.2s ease',
          boxShadow: selected
            ? `0 0 0 2px ${accent.border}44, 0 4px 20px #00000060`
            : isHovered
            ? `0 0 0 1px ${accent.border}33, 0 4px 12px #00000050`
            : '0 2px 8px #00000040',
          position: 'relative',
          zIndex: selected ? 10 : isHovered ? 5 : 1,
        }}
      >
        {/* Depth accent bar on the left */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 8,
            bottom: 8,
            width: 3,
            background: accent.border,
            borderRadius: '0 2px 2px 0',
            opacity: isHovered || selected ? 1 : 0.5,
            transition: 'opacity 0.2s',
          }}
        />

        {/* Type badge */}
        {meta?.type && (
          <div
            style={{
              fontSize: 9,
              fontFamily: '"DM Mono", monospace',
              color: accent.border,
              opacity: 0.8,
              marginBottom: 3,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {meta.type}
          </div>
        )}

        {/* Node Label */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: '#e6edf3',
            lineHeight: 1.3,
            paddingLeft: 6,
          }}
        >
          {label}
        </div>
      </div>

      {/* ── Expand / Collapse Toggle Button ───────────────────────── */}
      {hasChildren && (
        <button
          onClick={handleToggle}
          title={isCollapsed ? `Expand (${childCount} children)` : 'Collapse'}
          style={{
            position: 'absolute',
            bottom: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: isCollapsed ? accent.border : '#30363d',
            border: `2px solid ${accent.border}`,
            color: isCollapsed ? '#0d1117' : accent.border,
            fontSize: 14,
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 20,
            transition: 'all 0.2s ease',
            boxShadow: `0 0 8px ${accent.border}55`,
            fontFamily: '"DM Mono", monospace',
            fontWeight: 'bold',
          }}
          className={isCollapsed ? 'toggle-collapsed' : ''}
        >
          {isCollapsed ? '+' : '−'}
        </button>
      )}

      {/* ── Metadata Tooltip ──────────────────────────────────────── */}
      {isHovered && meta?.description && (
        <div
          style={{
            position: 'absolute',
            top: -46,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#21262d',
            border: '1px solid #30363d',
            borderRadius: 6,
            padding: '5px 10px',
            fontSize: 11,
            color: '#8b949e',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 100,
            fontFamily: '"IBM Plex Sans", sans-serif',
            boxShadow: '0 4px 12px #00000060',
          }}
        >
          {meta.description}
        </div>
      )}

      {/* ── React Flow Handles ────────────────────────────────────── */}
      {/* Top handle: receives edges from parent */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: accent.border, border: 'none', width: 8, height: 8 }}
      />
      {/* Bottom handle: emits edges to children */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: accent.border,
          border: 'none',
          width: 8,
          height: 8,
          bottom: hasChildren ? 0 : -4,
        }}
      />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';

export default CustomNode;
