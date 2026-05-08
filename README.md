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

# ⚡ Tech Stack

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss)
![ReactFlow](https://img.shields.io/badge/ReactFlow-11-FF0072)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript)

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

```text id="4hdy22"
src/utils/layoutTree.js
```

### Layout Strategy

```text id="zbuzx9"
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

# 📁 Project Structure

```bash id="o7o1em"
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

```bash id="u3hcxm"
# Clone repository
git clone https://github.com/AmanSingh1201/Tree-visualizer.git

# Navigate into project
cd Tree-visualizer

# Install dependencies
npm install
```

---

## Start Development Server

```bash id="18zqib"
npm run dev
```

Application runs at:

```text id="7txe7x"
http://localhost:5173
```

---

## Production Build

```bash id="y1u7fx"
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

# 👨‍💻 Author

**Aman Singh**
IIT Kharagpur — Computer Science and Data Processing
Roll No: 25MA60R31

GitHub: @AmanSingh1201
