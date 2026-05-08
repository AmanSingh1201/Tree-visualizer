# 🌳 Tree Visualizer — Infollion Task 4

A production-quality interactive tree structure renderer built with **React + Vite + Tailwind CSS + React Flow**.

![Tree Visualizer](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite) ![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss) ![ReactFlow](https://img.shields.io/badge/ReactFlow-11-FF0072)

---

## ✨ Features

| Feature | Status |
|---|---|
| Recursive tree layout engine | ✅ |
| Parent centered above children | ✅ |
| Sibling spacing (no overlap) | ✅ |
| Expand / Collapse nodes | ✅ |
| Layout recalculates on toggle | ✅ |
| Custom node components | ✅ |
| Depth-based colour coding | ✅ |
| Hover highlight + tooltip | ✅ |
| Node selection + info panel | ✅ |
| Search + auto-pan | ✅ |
| MiniMap, Controls, Zoom/Pan | ✅ |
| Smooth transitions | ✅ |
| Fully client-side (no backend) | ✅ |

---

## 🧠 Layout Algorithm

The core layout logic lives in `src/utils/layoutTree.js`.

```
layoutTree(rootNode, collapsedIds)
  └── computeLayout(node, depth, collapsedIds, counter, nodes, edges)
        ├── LEAF: assign x = counter.value * X_GAP; counter++
        └── INTERNAL:
              ├── recurse into each child → get childX[]
              └── parentX = (firstChildX + lastChildX) / 2
```

This is a **post-order recursive traversal**: children are positioned before their parent, allowing the parent to perfectly center above its subtree.

---

## 📁 Project Structure

```
tree-visualizer/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Root component + header
    ├── components/
    │   ├── CustomNode.jsx    # React Flow custom node
    │   └── TreeFlow.jsx      # Main canvas + state management
    ├── utils/
    │   └── layoutTree.js     # Recursive layout engine
    ├── data/
    │   └── treeData.js       # Sample hierarchical data
    └── styles/
        └── index.css         # Tailwind + global styles
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/tree-visualizer.git
cd tree-visualizer

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

### Build for Production

```bash
npm run build
# Output goes to /dist folder

npm run preview
# Preview production build locally
```

---

## 🐙 GitHub Deployment

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "feat: initial tree visualizer implementation"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/tree-visualizer.git
git branch -M main
git push -u origin main
```

---

## ▲ Vercel Deployment

### Option 1: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts:
#   → Framework: Vite
#   → Build Command: npm run build
#   → Output Directory: dist
```

### Option 2: Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repository
3. Vercel auto-detects Vite — click **Deploy**
4. Your app is live at `https://tree-visualizer-xxx.vercel.app`

---

## 🖱️ Usage Guide

| Action | How |
|---|---|
| **Expand/Collapse** | Click the **+/−** button below any node |
| **Select a node** | Click on the node card |
| **Search** | Type in the search bar and press **Find** |
| **Pan** | Click and drag the canvas |
| **Zoom** | Scroll wheel or use Controls panel |
| **Fit view** | Click the fit-view button in Controls |

---

## 🛠 Tech Stack

- **React 18** — UI library
- **Vite 5** — Build tool & dev server
- **Tailwind CSS 3** — Utility-first CSS
- **React Flow 11** — Graph/tree rendering engine
- **Lucide React** — Icon library
- **DM Mono + IBM Plex Sans** — Typography

---

## 📝 License

MIT © 2025
