/**
 * layoutTree.js
 * -------------
 * Recursive tree layout engine.
 *
 * ALGORITHM OVERVIEW:
 * -------------------
 * 1. We traverse the tree recursively (post-order: children before parent).
 * 2. For each leaf node, we assign it a unique horizontal "slot".
 * 3. For each internal node, its x-position is:
 *      parentX = (firstChildX + lastChildX) / 2
 *    This guarantees perfect centering above its children subtree.
 * 4. A global `xCounter` (passed by reference via an object) keeps a running
 *    tally of horizontal slot positions so siblings never overlap.
 * 5. Depth determines the y-position: y = depth * Y_GAP
 *
 * This approach is essentially a simplified Reingold-Tilford algorithm.
 */

/** Horizontal gap between sibling nodes (in pixels) */
const X_GAP = 220;

/** Vertical gap between levels (in pixels) */
const Y_GAP = 130;

/** Node dimensions */
export const NODE_WIDTH = 160;
export const NODE_HEIGHT = 54;

/**
 * layoutTree
 * ----------
 * Main entry point. Takes the root of the tree data and a set of
 * collapsed node IDs. Returns React Flow-compatible nodes and edges arrays.
 *
 * @param {Object}  rootNode     - The root tree node object
 * @param {Set}     collapsedIds - Set of node IDs that are currently collapsed
 * @returns {{ nodes: Array, edges: Array }}
 */
export function layoutTree(rootNode, collapsedIds = new Set()) {
  const nodes = [];
  const edges = [];

  // xCounter is passed by reference so recursive calls share state
  const counter = { value: 0 };

  // Kick off recursion from depth 0
  computeLayout(rootNode, 0, collapsedIds, counter, nodes, edges);

  return { nodes, edges };
}

/**
 * computeLayout (recursive)
 * -------------------------
 * Recursively assigns x/y positions to every visible node.
 *
 * Strategy:
 *  - If this node is collapsed OR has no children → it's a leaf; assign
 *    the next available x slot, then increment the counter.
 *  - Otherwise → recurse into all children first (post-order), then
 *    center this node above its children using:
 *      x = (firstChildX + lastChildX) / 2
 *
 * @param {Object}  node         - Current tree node
 * @param {number}  depth        - Current depth level (0 = root)
 * @param {Set}     collapsedIds - Collapsed node IDs
 * @param {Object}  counter      - Shared mutable counter { value: number }
 * @param {Array}   nodes        - Accumulator for React Flow nodes
 * @param {Array}   edges        - Accumulator for React Flow edges
 * @returns {number} The x position assigned to this node
 */
function computeLayout(node, depth, collapsedIds, counter, nodes, edges) {
  const isCollapsed = collapsedIds.has(node.id);
  const hasVisibleChildren =
    !isCollapsed && node.children && node.children.length > 0;

  let nodeX;

  if (!hasVisibleChildren) {
    // ── LEAF CASE ──────────────────────────────────────────────────────────
    // Assign current counter value as the x slot, then advance.
    nodeX = counter.value * X_GAP;
    counter.value += 1;
  } else {
    // ── INTERNAL NODE CASE ────────────────────────────────────────────────
    // Recurse into children first. Collect their x positions.
    const childXPositions = node.children.map((child) => {
      // Create edge from this node to child
      edges.push({
        id: `edge-${node.id}-${child.id}`,
        source: node.id,
        target: child.id,
        type: 'smoothstep',
        style: {
          stroke: '#30363d',
          strokeWidth: 2,
        },
        animated: false,
      });

      // Recurse and get x position of child
      return computeLayout(
        child,
        depth + 1,
        collapsedIds,
        counter,
        nodes,
        edges
      );
    });

    // Center this node above children:
    //   parentX = (firstChildX + lastChildX) / 2
    const firstChildX = childXPositions[0];
    const lastChildX = childXPositions[childXPositions.length - 1];
    nodeX = (firstChildX + lastChildX) / 2;
  }

  // Build the React Flow node object
  nodes.push({
    id: node.id,
    type: 'customNode',
    position: {
      x: nodeX - NODE_WIDTH / 2, // Center the node rectangle on nodeX
      y: depth * Y_GAP,
    },
    data: {
      label: node.label,
      meta: node.meta || {},
      hasChildren: !!(node.children && node.children.length > 0),
      isCollapsed,
      childCount: node.children ? node.children.length : 0,
    },
  });

  return nodeX;
}

/**
 * getAllNodeIds
 * ------------
 * Utility: recursively collect all node IDs in the tree.
 * Used to initialise the collapsed state.
 *
 * @param {Object} node
 * @returns {string[]}
 */
export function getAllNodeIds(node) {
  const ids = [node.id];
  if (node.children) {
    node.children.forEach((child) => ids.push(...getAllNodeIds(child)));
  }
  return ids;
}
