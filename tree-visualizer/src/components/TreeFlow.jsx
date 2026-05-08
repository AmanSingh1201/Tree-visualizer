/**
 * TreeFlow.jsx
 * ------------
 * Main tree rendering component using React Flow.
 *
 * Responsibilities:
 *  1. Manage collapsed/expanded state for all nodes.
 *  2. Re-run layout engine whenever collapse state changes.
 *  3. Inject `onToggle` callbacks into each node's data.
 *  4. Render the React Flow canvas with Background, Controls, MiniMap.
 *  5. Handle node selection and expose selected node metadata.
 *  6. Provide search functionality with auto-pan.
 */

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  ReactFlowProvider,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomNode from './CustomNode';
import { layoutTree } from '../utils/layoutTree';
import { treeData } from '../data/treeData';

// Register custom node type once (outside component to avoid re-registration)
const nodeTypes = { customNode: CustomNode };

// ─────────────────────────────────────────────────────────────────────────────
// Inner component (must be inside ReactFlowProvider to use useReactFlow hook)
// ─────────────────────────────────────────────────────────────────────────────
function TreeFlowInner({ searchQuery, onNodeSelect, selectedNodeId }) {
  const { fitView, setCenter } = useReactFlow();

  // Set of collapsed node IDs
  const [collapsedIds, setCollapsedIds] = useState(new Set());

  // ── Toggle collapse/expand ──────────────────────────────────────────────
  const toggleNode = useCallback((nodeId) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId); // expand
      } else {
        next.add(nodeId);    // collapse
      }
      return next;
    });
  }, []);

  // ── Compute layout whenever collapse state changes ──────────────────────
  // layoutTree returns { nodes, edges } in React Flow format.
  const { nodes: layoutNodes, edges: layoutEdges } = useMemo(
    () => layoutTree(treeData, collapsedIds),
    [collapsedIds]
  );

  // ── Inject onToggle callbacks and selection state into node data ────────
  const nodes = useMemo(
    () =>
      layoutNodes.map((node) => ({
        ...node,
        selected: node.id === selectedNodeId,
        data: {
          ...node.data,
          onToggle: () => toggleNode(node.id),
        },
      })),
    [layoutNodes, toggleNode, selectedNodeId]
  );

  // ── Auto-fit view whenever layout changes ───────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      fitView({ padding: 0.15, duration: 400 });
    }, 50);
    return () => clearTimeout(timer);
  }, [collapsedIds, fitView]);

  // ── Search: find node matching query and pan to it ──────────────────────
  useEffect(() => {
    if (!searchQuery) return;
    const q = searchQuery.toLowerCase();
    const match = nodes.find(
      (n) =>
        n.data.label.toLowerCase().includes(q) ||
        n.id.toLowerCase().includes(q)
    );
    if (match) {
      const cx = match.position.x + 80;  // centre of node
      const cy = match.position.y + 27;
      setCenter(cx, cy, { zoom: 1.4, duration: 600 });
      onNodeSelect(match.id);
    }
  }, [searchQuery, nodes, setCenter, onNodeSelect]);

  // ── Handle node click for selection ─────────────────────────────────────
  const onNodeClick = useCallback(
    (_, node) => {
      onNodeSelect(node.id === selectedNodeId ? null : node.id);
    },
    [selectedNodeId, onNodeSelect]
  );

  // ── Pane click deselects ─────────────────────────────────────────────────
  const onPaneClick = useCallback(() => {
    onNodeSelect(null);
  }, [onNodeSelect]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={layoutEdges}
      nodeTypes={nodeTypes}
      onNodeClick={onNodeClick}
      onPaneClick={onPaneClick}
      fitView
      fitViewOptions={{ padding: 0.15 }}
      minZoom={0.2}
      maxZoom={2}
      attributionPosition="bottom-right"
      proOptions={{ hideAttribution: true }}
      style={{ background: '#0d1117' }}
    >
      {/* Dot-grid background */}
      <Background
        variant={BackgroundVariant.Dots}
        gap={28}
        size={1.2}
        color="#21262d"
      />

      {/* Zoom/fit controls */}
      <Controls
        style={{
          background: '#161b22',
          border: '1px solid #30363d',
          borderRadius: 8,
        }}
      />

      {/* Mini-map */}
      <MiniMap
        nodeColor={(n) => {
          const depth = n.data?.meta?.depth ?? 0;
          const colors = ['#58a6ff', '#3fb950', '#f0883e', '#bc8cff', '#ff7b72', '#79c0ff'];
          return colors[Math.min(depth, colors.length - 1)];
        }}
        style={{
          background: '#161b22',
          border: '1px solid #30363d',
          borderRadius: 8,
        }}
        maskColor="#0d111780"
      />
    </ReactFlow>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Exported wrapper – wraps inner component with ReactFlowProvider
// Also renders the search bar and selected-node info panel
// ─────────────────────────────────────────────────────────────────────────────
export default function TreeFlow() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // Derive selected node's metadata from treeData
  const selectedNodeMeta = useMemo(() => {
    if (!selectedNodeId) return null;
    return findNodeById(treeData, selectedNodeId);
  }, [selectedNodeId]);

  // Submit search
  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      setSearchQuery(searchInput.trim());
    },
    [searchInput]
  );

  // Clear search
  const handleClear = useCallback(() => {
    setSearchInput('');
    setSearchQuery('');
  }, []);

  return (
    <div className="flex flex-col h-full w-full" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
      {/* ── Top Bar: Search ─────────────────────────────────────── */}
      <div
        className="flex items-center gap-3 px-5 py-3"
        style={{ borderBottom: '1px solid #21262d', background: '#0d1117' }}
      >
        <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-sm">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search nodes…"
              style={{
                width: '100%',
                background: '#161b22',
                border: '1px solid #30363d',
                borderRadius: 6,
                padding: '7px 36px 7px 12px',
                color: '#e6edf3',
                fontSize: 13,
                outline: 'none',
                fontFamily: '"IBM Plex Sans", sans-serif',
              }}
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleClear}
                style={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#8b949e',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 16,
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            )}
          </div>
          <button
            type="submit"
            style={{
              background: '#21262d',
              border: '1px solid #30363d',
              borderRadius: 6,
              color: '#58a6ff',
              fontSize: 13,
              padding: '7px 14px',
              cursor: 'pointer',
              fontFamily: '"IBM Plex Sans", sans-serif',
            }}
          >
            Find
          </button>
        </form>

        {/* Legend */}
        <div className="flex items-center gap-4 ml-auto">
          {[
            { label: 'Root', color: '#58a6ff' },
            { label: 'Module', color: '#3fb950' },
            { label: 'Component', color: '#f0883e' },
            { label: 'Service', color: '#bc8cff' },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: color,
                }}
              />
              <span style={{ fontSize: 11, color: '#8b949e' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Canvas Area ─────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden relative">
        <ReactFlowProvider>
          <TreeFlowInner
            searchQuery={searchQuery}
            onNodeSelect={setSelectedNodeId}
            selectedNodeId={selectedNodeId}
          />
        </ReactFlowProvider>

        {/* ── Selected Node Info Panel ─────────────────────────── */}
        {selectedNodeMeta && (
          <div
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 220,
              background: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 10,
              padding: '14px 16px',
              zIndex: 100,
              boxShadow: '0 8px 24px #00000060',
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontFamily: '"DM Mono", monospace',
                color: '#58a6ff',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              Selected Node
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#e6edf3', marginBottom: 4 }}>
              {selectedNodeMeta.label}
            </div>
            {selectedNodeMeta.meta && (
              <div className="flex flex-col gap-1 mt-2">
                {Object.entries(selectedNodeMeta.meta).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span style={{ fontSize: 11, color: '#8b949e', textTransform: 'capitalize' }}>
                      {k}
                    </span>
                    <span style={{ fontSize: 11, color: '#c9d1d9' }}>{String(v)}</span>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => setSelectedNodeId(null)}
              style={{
                marginTop: 12,
                width: '100%',
                background: '#21262d',
                border: '1px solid #30363d',
                borderRadius: 6,
                color: '#8b949e',
                fontSize: 11,
                padding: '5px 0',
                cursor: 'pointer',
                fontFamily: '"IBM Plex Sans", sans-serif',
              }}
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: find node by ID in tree (recursive)
// ─────────────────────────────────────────────────────────────────────────────
function findNodeById(node, id) {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const result = findNodeById(child, id);
      if (result) return result;
    }
  }
  return null;
}
