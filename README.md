# ⚡ AYAN.DEV — 3D Liquid Glass Portfolio & Skill Manager API

An ultra-modern, high-performance developer portfolio featuring **3D animated typography**, **3D rotating skill cubes**, **translucent Liquid Glass UI**, **Three.js WebGL particle mesh**, **GraphicMama curated color schemes**, and a full-stack **Python REST API + SQLite database** skill management backend.

---

## 🌟 Key Features & Sections

### 1. 🚀 Introduction Section
- **Mouse-Parallax 3D Title**: Kinetic typewriter text and 3D floating header.
- **Animated 3D Holographic Logo**: 3D perspective rotation with glowing aura rings.
- **Glassmorphic Hero Card**: Translucent obsidian glass panel with real-time stats counter and profile visualizer.

### 2. 🧰 Skills Matrix & 3D Skill Cube
- **3D Interactive Rotating Skill Cube**: Drag or hover to rotate a 6-faced 3D holographic cube displaying core technologies (Python, JS, React, SQLite, Glassmorphism, Git).
- **SQLite Database Manager**: Live skill matrix backed by Python REST API (`/api/skills`) with search, category tabs, proficiency dropdown filters, and modal CRUD editor.

### 3. 💼 Interactive 3D Projects Showcase
- **3D Tilt Physics & Light Sheen**: Project cards tilt dynamically in 3D perspective following mouse coordinates.
- **3D Modal Detail Viewer**: Interactive modal displaying architecture, tech stack tags, live links, and GitHub source code.

### 4. ⏳ Experience Timeline
- Translucent Liquid Glass timeline capsules highlighting work history, roles, and major engineering milestones.

### 5. 📬 Animated 3D Contact Form & Terminal CLI
- **Terminal CLI Simulator**: Interactive terminal command line interface supporting commands (`help`, `skills`, `projects`, `contact`, `clear`, `matrix`).
- **3D Glass Contact Form**: Form inputs with dynamic focus glow, audio click feedback, and instant email copy button.

### 🎛️ Liquid Glass Floating Control Dock
- **6 GraphicMama Designer Color Schemes**:
  - 🖤 **B&W Obsidian** (Pure White + Platinum + Deep Slate)
  - ⚡ **Vivid Neon** (Paradise Pink + Ultra Purple + Electric Cyan)
  - 🌊 **Ocean Turquoise** (Mint Teal + Moonstone Blue + Royal Sapphire)
  - 🌸 **Pastel Rose** (Rose Gold + Lavender Blush + Soft Purple)
  - 🍃 **Earthy Sage** (Turtle Green + Artichoke Sage + Golden Sand)
  - ☀️ **Sunset Tangerine** (Carrot Orange + Golden Poppy + Vermilion Red)
- **4 Dynamic Animation FX Modes**:
  - 🫧 **Fluid Metaballs** (Organic morphing metaballs)
  - 🌀 **Particle Vortex** (Swirling particle stream)
  - 🌊 **Plasma Waves** (Sinusoidal plasma wave blend)
  - 🕸️ **3D Constellation** (Interactive laser constellation lines)
- **Live Controls**: Glass Blur, Translucency, Fluid Motion Speed, and Liquid Cursor Trail toggle.

---

## 🛠️ Local Installation & Running Guide

### Requirements
- Python 3.8+ installed.

### Steps
1. Clone or open the workspace folder:
   ```bash
   cd "c:\Users\AYANGAJI\OneDrive\Desktop\web folder\my web salfe"
   ```

2. Launch the Python REST API server:
   ```bash
   python app.py
   ```

3. Open your web browser:
   ```bash
   http://localhost:5000
   ```

---

## 🌐 Deployment Instructions

### 1. Static Web Hosting (Netlify / Vercel / GitHub Pages)
- Upload `index.html`, `style.css`, `script.js`, `profile.jpg`, and assets to your hosting provider.
- `script.js` includes automatic API fallback: if the Python server is offline or serving statically, it seamlessly falls back to local data without breaking UI!

### 2. Full-Stack Hosting (Render / Railway / Heroku)
- Deploy `app.py` as a Web Service.
- Set environment variables or port binding (`PORT=5000`).

---

## 🎨 Customization Guide

- **Modifying Skills Database**: Edit `DEFAULT_SKILLS` in `script.js` or add/update rows via the live `/api/skills` modal inside the web dashboard.
- **Updating 3D Skill Cube**: Edit `.cube-face` elements in `index.html` to customize icons, titles, and descriptions.
- **Customizing Color Schemes**: Add new palette arrays in `palettes` inside `script.js` and corresponding `:root` CSS variables in `style.css`.
