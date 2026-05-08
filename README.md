# 🌳 Tree Visualizer — Infollion Frontend Task 4

A production-ready interactive tree structure renderer built as part of the **Infollion Software Developer Intern Assignment**.

🔗 **Live Demo:** [tree-visualizer-e5hr-c4kqz9pqm-amansingh1201s-projects.vercel.app](https://tree-visualizer-e5hr-c4kqz9pqm-amansingh1201s-projects.vercel.app)

---

## 📌 Task Overview

The goal was to design a visual tree-structure renderer that:
- Displays hierarchical data with clean spacing
- Centers parent nodes above their children
- Supports expand/collapse of subtrees
- Recalculates layout dynamically after any interaction

---

## ✨ Features Implemented

### Core Requirements
| Requirement | Status |
|---|---|
| Proper tree layout with calculated sibling spacing | ✅ |
| Parent node centered above its entire group of children | ✅ |
| Edges connecting parent and child nodes | ✅ |
| Expand / Collapse for any node with children | ✅ |
| Layout recalculates automatically after expand/collapse | ✅ |
| Tree depth 3–4 levels | ✅ |
| Fully client-side, no backend | ✅ |

### Bonus Challenges
| Bonus Feature | Status |
|---|---|
| Hover highlighting | ✅ |
| Node selection with styled info panel | ✅ |
| Node metadata display | ✅ |
| Search + auto-pan to matching node | ✅ |
| Auto-fit / zoom for large trees | ✅ |
| MiniMap for navigation | ✅ |
| Depth-based colour coding | ✅ |

---

## 🧠 How It Works — Layout Algorithm

The core challenge was building a layout engine that prevents node overlap and always centers parents above children.

I implemented a **recursive post-order traversal** algorithm in `src/utils/layoutTree.js`:

```
Step 1: Visit children BEFORE the parent (post-order)
Step 2: Leaf nodes get sequential x positions from a shared counter
Step 3: Internal nodes center above their children:
        parentX = (firstChildX + lastChildX) / 2
Step 4: Depth controls vertical position:
        y = depth × 130px
```

This guarantees:
- **No overlapping** — the counter always moves right
- **Perfect centering** — parent always sits above the midpoint of its subtree
- **Dynamic recalculation** — collapse removes nodes from the counter, everything shifts

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI library |
| Vite 5 | Build tool & dev server |
| Tailwind CSS 3 | Utility-first styling |
| React Flow 11 | Graph/tree rendering engine |
| DM Mono + IBM Plex Sans | Typography |

---

## 📁 Project Structure

```
tree-visualizer/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── vercel.json
└── src/
    ├── main.jsx                  # Entry point
    ├── App.jsx                   # Root component + header
    ├── components/
    │   ├── CustomNode.jsx        # React Flow custom node with toggle button
    │   └── TreeFlow.jsx          # Main canvas, state, search logic
    ├── utils/
    │   └── layoutTree.js         # Recursive layout engine (core algorithm)
    ├── data/
    │   └── treeData.js           # Sample hierarchical tree data
    └── styles/
        └── index.css             # Global styles + Tailwind
```

---

## 🚀 Setup & Run Locally

### Prerequisites
- Node.js v18 or higher → [nodejs.org](https://nodejs.org)
- npm v9 or higher

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/AmanSingh1201/Tree-visualizer.git

# 2. Navigate into the project
cd Tree-visualizer

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

Open your browser at **http://localhost:5173**

### Build for production

```bash
npm run build
npm run preview
```

---

## 🖱️ How to Use

| Action | How to do it |
|---|---|
| **Expand a node** | Click the **+** button below any node |
| **Collapse a node** | Click the **−** button below any node |
| **Select a node** | Click on the node card — info panel opens on right |
| **Search** | Type a node name in the search bar → click **Find** |
| **Pan the canvas** | Click and drag on the background |
| **Zoom in/out** | Scroll wheel or use the controls (bottom left) |
| **Fit all nodes** | Click the fit-view icon in the controls panel |

---

## 📸 Preview

```
Root
├── Module A
│   ├── Component A1
│   │   ├── Service A1a
│   │   └── Service A1b
│   └── Component A2
│       └── Util A2a
├── Module B
│   ├── Component B1
│   │   ├── Service B1a
│   │   ├── Service B1b
│   │   └── Service B1c
│   └── Component B2
│       ├── Util B2a
│       └── Util B2b
└── Module C
    ├── Component C1
    │   ├── Step C1a
    │   └── Step C1b
    └── Component C2
        ├── Step C2a
        └── Step C2b
```

---

## 🌐 Deployment

Deployed on **Vercel** with automatic CI/CD — every push to `main` triggers a redeploy.

**Live URL:** https://tree-visualizer-e5hr-c4kqz9pqm-amansingh1201s-projects.vercel.app

---

## 👨‍💻 Author

**Aman Singh**  
Software Developer Intern Applicant — Infollion  
GitHub: [@AmanSingh1201](https://github.com/AmanSingh1201)
