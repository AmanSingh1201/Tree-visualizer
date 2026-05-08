# 🌳 Tree Visualizer — Infollion Frontend Task 4

An interactive hierarchical tree visualization system built using **React + Vite + Tailwind CSS + React Flow**.

This project was developed as part of the **Infollion Software Developer Intern Assignment**, focusing on recursive layout computation, dynamic node positioning, and interactive tree rendering.

---

## 🔗 Live Demo

**Deployment:**
https://tree-visualizer-e5hr-c4kqz9pqm-amansingh1201s-projects.vercel.app

**GitHub Repository:**
https://github.com/AmanSingh1201/Tree-visualizer

---

# 📌 Task Objective

The goal of this assignment was to design a visual tree renderer capable of:

* Displaying hierarchical data with clean spacing
* Centering parent nodes above their children
* Preventing node overlap
* Supporting expand/collapse interactions
* Dynamically recalculating layout after interactions

---

# ✨ Features Implemented

## Core Requirements

| Requirement                           | Status |
| ------------------------------------- | ------ |
| Recursive tree layout engine          | ✅      |
| Parent centered above children        | ✅      |
| Automatic sibling spacing             | ✅      |
| Expand / Collapse nodes               | ✅      |
| Dynamic layout recalculation          | ✅      |
| React Flow edge rendering             | ✅      |
| Multi-level tree support (3–6 levels) | ✅      |
| Fully frontend/client-side            | ✅      |

---

## Additional Features

| Feature                  | Status |
| ------------------------ | ------ |
| Hover highlighting       | ✅      |
| Node selection panel     | ✅      |
| Search + auto-focus      | ✅      |
| MiniMap navigation       | ✅      |
| Zoom / Pan controls      | ✅      |
| Depth-based color coding | ✅      |
| Responsive interactions  | ✅      |
| Metadata display         | ✅      |

---

# 🧠 Layout Algorithm

The core challenge was implementing a layout engine that dynamically positions nodes while maintaining proper hierarchy alignment.

The solution uses a **recursive post-order traversal algorithm** implemented in:

```text id="t7cl9z"
src/utils/layoutTree.js
```

### Layout Strategy

```text id="x4rxn9"
1. Process child nodes first (post-order traversal)
2. Assign sequential x positions to leaf nodes
3. Calculate parent position using child boundaries

   parentX = (firstChildX + lastChildX) / 2

4. Vertical spacing determined by tree depth
```

### Why This Works

* Prevents node overlap
* Keeps sibling spacing balanced
* Ensures parents remain centered above subtrees
* Automatically recalculates layout after collapse/expand operations

---

# ⚙️ Tech Stack

| Technology              | Purpose                 |
| ----------------------- | ----------------------- |
| React 18                | UI framework            |
| Vite 5                  | Build tool & dev server |
| Tailwind CSS            | Styling                 |
| React Flow              | Graph rendering engine  |
| Lucide React            | Icons                   |
| IBM Plex Sans + DM Mono | Typography              |

---

# 📁 Project Structure

```bash id="x7o5x5"
tree-visualizer/
├── src/
│   ├── components/
│   │   ├── CustomNode.jsx
│   │   └── TreeFlow.jsx
│   │
│   ├── utils/
│   │   └── layoutTree.js
│   │
│   ├── data/
│   │   └── treeData.js
│   │
│   ├── styles/
│   │   └── index.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
├── tailwind.config.js
├── vercel.json
└── README.md
```

---

# 🚀 Running Locally

## Prerequisites

* Node.js v18+
* npm v9+

---

## Installation

```bash id="3w2d10"
# Clone repository
git clone https://github.com/AmanSingh1201/Tree-visualizer.git

# Navigate into project
cd Tree-visualizer

# Install dependencies
npm install
```

---

## Start Development Server

```bash id="s7bycq"
npm run dev
```

Application runs at:

```text id="psuzjx"
http://localhost:5173
```

---

## Production Build

```bash id="duzw84"
npm run build
npm run preview
```

---

# 🖱️ User Interactions

| Action                 | Interaction            |
| ---------------------- | ---------------------- |
| Expand / Collapse node | Click the +/- toggle   |
| Select node            | Click node card        |
| Search node            | Use search input       |
| Zoom                   | Mouse wheel / controls |
| Pan canvas             | Drag background        |
| Reset viewport         | Use fit-view control   |

---

# 🌐 Deployment

The application is deployed on **Vercel** with automatic CI/CD integration.

Every push to the `main` branch triggers automatic redeployment.

**Live URL:**
https://tree-visualizer-e5hr-c4kqz9pqm-amansingh1201s-projects.vercel.app

---

## 👨‍💻 Author

**Aman Singh**  
IIT kharagpur — Computer Science and Data Processing 
GitHub: [@AmanSingh1201](https://github.com/AmanSingh1201)
