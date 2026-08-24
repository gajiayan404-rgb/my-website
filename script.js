/**
 * ==========================================================================
 * AYAN.DEV — Senior Full-Stack Portfolio Application Logic
 * Modern, Resilient, Interactive ES6+ Web Architecture (Executive White Theme)
 * ==========================================================================
 */

// Default Fallback Skills Database (12 Core Stacks)
const DEFAULT_SKILLS = [
  { id: 1, name: "Python 3 & REST APIs", category: "Backend", proficiency: 95, icon: "🐍", experience: "3+ Years" },
  { id: 2, name: "JavaScript (ES6+) & WebGL", category: "Frontend", proficiency: 94, icon: "⚡", experience: "3+ Years" },
  { id: 3, name: "HTML5 & CSS3 Architecture", category: "Frontend", proficiency: 96, icon: "🎨", experience: "3+ Years" },
  { id: 4, name: "SQLite3 & Relational Schemas", category: "Backend", proficiency: 90, icon: "🛢️", experience: "3+ Years" },
  { id: 5, name: "React.js & Component Design", category: "Frontend", proficiency: 88, icon: "⚛️", experience: "2+ Years" },
  { id: 6, name: "Git, GitHub & CI/CD Workflows", category: "Tools", proficiency: 92, icon: "🛠️", experience: "3+ Years" },
  { id: 7, name: "Glassmorphic UI / UX Design", category: "Design", proficiency: 92, icon: "✨", experience: "3+ Years" },
  { id: 8, name: "Netlify & Cloud Deployment", category: "Tools", proficiency: 88, icon: "☁️", experience: "2+ Years" },
  { id: 9, name: "TypeScript & Interface Systems", category: "Frontend", proficiency: 85, icon: "🔷", experience: "2+ Years" },
  { id: 10, name: "REST API Microservices", category: "Backend", proficiency: 93, icon: "⚙️", experience: "3+ Years" },
  { id: 11, name: "Responsive Design & Tokens", category: "Design", proficiency: 95, icon: "📱", experience: "3+ Years" },
  { id: 12, name: "Linux CLI & Dev Workstation", category: "Tools", proficiency: 86, icon: "💻", experience: "2+ Years" }
];

// Application Global State
let state = {
  skills: [...DEFAULT_SKILLS],
  currentCategory: 'All',
  levelFilter: 'All',
  searchQuery: '',
  editingSkillId: null,
  viewMode: 'grid'
};

// API Base URL Detection
const API_BASE = (window.location.protocol === 'file:' || !window.location.port || window.location.port === '5000')
  ? 'http://localhost:5000'
  : '';
const API_URL = `${API_BASE}/api/skills`;

// Code Studio Snippets
const CODE_SNIPPETS = {
  python: `<span class="code-keyword">import</span> http.server, json, sqlite3

<span class="code-keyword">class</span> <span class="code-func">CustomHandler</span>(http.server.SimpleHTTPRequestHandler):
    <span class="code-keyword">def</span> <span class="code-func">do_GET</span>(self):
        <span class="code-comment"># Fetch skills from SQLite database with Row mapping</span>
        conn = sqlite3.connect(<span class="code-string">"skills.db"</span>)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute(<span class="code-string">"SELECT * FROM skills ORDER BY id DESC"</span>)
        skills = [dict(row) <span class="code-keyword">for</span> row <span class="code-keyword">in</span> cursor.fetchall()]
        conn.close()
        
        self.send_response(<span class="code-string">200</span>)
        self.send_header(<span class="code-string">"Content-Type"</span>, <span class="code-string">"application/json"</span>)
        self.send_header(<span class="code-string">"Access-Control-Allow-Origin"</span>, <span class="code-string">"*"</span>)
        self.end_headers()
        self.wfile.write(json.dumps(skills).encode(<span class="code-string">'utf-8'</span>))`,
  js: `<span class="code-keyword">async function</span> <span class="code-func">fetchSkillsFromAPI</span>() {
  <span class="code-keyword">try</span> {
    <span class="code-keyword">const</span> response = <span class="code-keyword">await</span> fetch(<span class="code-string">'http://localhost:5000/api/skills'</span>);
    <span class="code-keyword">if</span> (!response.ok) <span class="code-keyword">throw new</span> Error(<span class="code-string">'API offline'</span>);
    <span class="code-keyword">const</span> data = <span class="code-keyword">await</span> response.json();
    renderSkillsGrid(data);
  } <span class="code-keyword">catch</span> (err) {
    console.warn(<span class="code-string">'Loading cached skills fallback'</span>, err);
    loadFromLocalStorage();
  }
}`,
  sql: `<span class="code-keyword">CREATE TABLE IF NOT EXISTS</span> <span class="code-func">skills</span> (
    id <span class="code-keyword">INTEGER PRIMARY KEY AUTOINCREMENT</span>,
    name <span class="code-keyword">TEXT NOT NULL</span>,
    category <span class="code-keyword">TEXT NOT NULL</span>,
    proficiency <span class="code-keyword">INTEGER NOT NULL</span>,
    icon <span class="code-keyword">TEXT NOT NULL</span>,
    experience <span class="code-keyword">TEXT NOT NULL</span>
);

<span class="code-comment">-- Fetch Top Expert Skills</span>
<span class="code-keyword">SELECT</span> * <span class="code-keyword">FROM</span> skills <span class="code-keyword">WHERE</span> proficiency >= <span class="code-string">85</span> <span class="code-keyword">ORDER BY</span> proficiency <span class="code-keyword">DESC</span>;`,
  css: `<span class="code-keyword">.glass-card</span> {
  <span class="code-func">background</span>: <span class="code-string">linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(248, 250, 252, 0.82) 100%)</span>;
  <span class="code-func">backdrop-filter</span>: <span class="code-string">blur(24px) saturate(190%)</span>;
  <span class="code-func">border</span>: <span class="code-string">1px solid rgba(226, 232, 240, 0.85)</span>;
  <span class="code-func">border-radius</span>: <span class="code-string">18px</span>;
  <span class="code-func">box-shadow</span>: <span class="code-string">0 20px 45px -10px rgba(15, 23, 42, 0.08)</span>;
}`
};

// ==========================================================================
// Initialization
// ==========================================================================
function initApp() {
  initWebPreloader();
  fetchSkills();
  setupEventListeners();
  initTypewriter();
  initParticleMeshEngine();
  initCursorFollower();
  initScrollReveal();
  initTerminalSimulator();
  init3DSkillCubeDrag();
  initCodeStudio();
  initThemeEngine();
  initScrollHUD();
  init3DCardTilt();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// ==========================================================================
// Preloader Engine (White Luxury Theme)
// ==========================================================================
function initWebPreloader() {
  const preloader = document.getElementById('web-preloader');
  const percentTxt = document.getElementById('loader-percent');
  const statusTxt = document.getElementById('loader-status-txt');
  const progressBar = document.getElementById('loader-progress-bar');
  if (!preloader) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 14;
    if (progress > 100) progress = 100;

    if (percentTxt) percentTxt.textContent = `${progress}%`;
    if (progressBar) progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      if (statusTxt) statusTxt.textContent = '🟢 SYSTEM ONLINE • FULL-STACK CORE READY';
      setTimeout(() => {
        finishPreloaderInstantly();
      }, 180);
    }
  }, 40);

  setTimeout(() => {
    finishPreloaderInstantly();
  }, 900);
}

window.finishPreloaderInstantly = function () {
  const preloader = document.getElementById('web-preloader');
  if (preloader) {
    preloader.classList.add('loaded');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 400);
  }
};

window.replayWebPreloader = function () {
  const preloader = document.getElementById('web-preloader');
  if (!preloader) return;
  preloader.style.display = 'flex';
  preloader.classList.remove('loaded');
  initWebPreloader();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ==========================================================================
// Skills Database & API Sync
// ==========================================================================
async function fetchSkills() {
  try {
    const res = await fetch(API_URL, { signal: AbortSignal.timeout(2000) });
    if (!res.ok) throw new Error('API server unavailable');
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      state.skills = data;
      localStorage.setItem('ayan_skills_cache', JSON.stringify(data));
    }
  } catch (err) {
    const cached = localStorage.getItem('ayan_skills_cache');
    if (cached) {
      try {
        state.skills = JSON.parse(cached);
      } catch (e) {
        state.skills = [...DEFAULT_SKILLS];
      }
    } else {
      state.skills = [...DEFAULT_SKILLS];
    }
  }
  renderSkills();
}

function renderSkills() {
  const skillsGrid = document.getElementById('skills-grid');
  if (!skillsGrid) return;

  if (!Array.isArray(state.skills) || state.skills.length === 0) {
    state.skills = [...DEFAULT_SKILLS];
  }

  const filtered = state.skills.filter(skill => {
    if (!skill) return false;
    const cat = String(skill.category || 'Frontend').toLowerCase();
    const name = String(skill.name || '').toLowerCase();
    const matchCategory = (state.currentCategory === 'All' || cat === state.currentCategory.toLowerCase());
    const matchLevel = (state.levelFilter === 'All' || (skill.proficiency || 0) >= parseInt(state.levelFilter, 10));
    const matchSearch = (state.searchQuery === '' || name.includes(state.searchQuery) || cat.includes(state.searchQuery));
    return matchCategory && matchLevel && matchSearch;
  });

  const skillsToRender = (filtered.length > 0) ? filtered : state.skills;

  const statTotal = document.getElementById('stat-total');
  const statExpert = document.getElementById('stat-expert');
  const statCategories = document.getElementById('stat-categories');

  if (statTotal) statTotal.textContent = state.skills.length;
  if (statExpert) statExpert.textContent = state.skills.filter(s => (s.proficiency || 0) >= 90).length;
  if (statCategories) {
    const categories = new Set(state.skills.map(s => s.category || 'General'));
    statCategories.textContent = categories.size;
  }

  let html = '';
  skillsToRender.forEach(skill => {
    html += `
      <div class="skill-card glass-card" data-id="${skill.id}" onclick="openSkillDetailModal(${skill.id}, event)">
        <div class="skill-card-glow-bar"></div>
        <div class="skill-header">
          <div class="skill-icon-name">
            <div class="skill-icon-box"><span>${escapeHtml(skill.icon || '⚡')}</span></div>
            <div class="skill-title">
              <h4>${escapeHtml(skill.name || 'Skill')}</h4>
              <span class="skill-category-badge">${escapeHtml(skill.category || 'General')}</span>
            </div>
          </div>
          <div class="skill-actions">
            <button class="action-icon-btn edit-btn" onclick="editSkill(${skill.id}, event)" title="Edit Skill">
              <i class="ri-pencil-fill"></i>
            </button>
            <button class="action-icon-btn delete-btn" onclick="deleteSkill(${skill.id}, event)" title="Delete Skill">
              <i class="ri-delete-bin-6-line"></i>
            </button>
          </div>
        </div>
        <div class="progress-info">
          <span class="exp-label"><i class="ri-time-line"></i> ${escapeHtml(skill.experience || '2+ Years')}</span>
          <span class="proficiency-number">${skill.proficiency}%</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${skill.proficiency}%"></div>
        </div>
      </div>
    `;
  });

  html += `
    <div class="skill-card add-skill-dashed-card glass-card" onclick="openModal()" title="Register New Skill in Database">
      <div class="add-skill-content">
        <div class="add-skill-icon-circle">
          <i class="ri-add-line"></i>
        </div>
        <h4>+ Add New Skill</h4>
        <p>Register custom framework or backend stack</p>
      </div>
    </div>
  `;

  skillsGrid.innerHTML = html;
}

// ==========================================================================
// Skill Form Add / Edit Handlers
// ==========================================================================
async function handleSkillFormSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById('skill-name');
  const catInput = document.getElementById('skill-category');
  const iconInput = document.getElementById('skill-icon');
  const expInput = document.getElementById('skill-experience');
  const profInput = document.getElementById('skill-proficiency');

  const newSkill = {
    name: nameInput ? nameInput.value.trim() : '',
    category: catInput ? catInput.value : 'Frontend',
    icon: iconInput ? iconInput.value.trim() : '⚡',
    experience: expInput ? expInput.value.trim() : '1+ Year',
    proficiency: profInput ? parseInt(profInput.value, 10) : 85
  };

  if (!newSkill.name) {
    showToast('Please enter a skill name.');
    return;
  }

  if (state.editingSkillId) {
    try {
      await fetch(`${API_URL}/${state.editingSkillId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill)
      });
    } catch (err) {}

    const idx = state.skills.findIndex(s => s.id === state.editingSkillId);
    if (idx !== -1) {
      state.skills[idx] = { ...state.skills[idx], ...newSkill };
    }
    showToast(`Skill "${newSkill.name}" updated successfully! ✨`);
  } else {
    let savedId = Date.now();
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill)
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.id) savedId = data.id;
      }
    } catch (err) {}

    state.skills.unshift({ id: savedId, ...newSkill });
    showToast(`Skill "${newSkill.name}" registered in database! 🚀`);
  }

  localStorage.setItem('ayan_skills_cache', JSON.stringify(state.skills));
  closeModal();
  renderSkills();
}

window.editSkill = function (id, e) {
  if (e) e.stopPropagation();
  const skill = state.skills.find(s => s.id === id);
  if (!skill) return;

  state.editingSkillId = id;
  const modalTitle = document.getElementById('modal-title');
  const nameInput = document.getElementById('skill-name');
  const catInput = document.getElementById('skill-category');
  const iconInput = document.getElementById('skill-icon');
  const expInput = document.getElementById('skill-experience');
  const profInput = document.getElementById('skill-proficiency');
  const profVal = document.getElementById('proficiency-val');

  if (modalTitle) modalTitle.innerHTML = '<i class="ri-pencil-fill"></i> Update Skill Card';
  if (nameInput) nameInput.value = skill.name;
  if (catInput) catInput.value = skill.category;
  if (iconInput) iconInput.value = skill.icon || '⚡';
  if (expInput) expInput.value = skill.experience || '2+ Years';
  if (profInput) profInput.value = skill.proficiency;
  if (profVal) profVal.textContent = skill.proficiency;

  openModal();
};

window.deleteSkill = async function (id, e) {
  if (e) e.stopPropagation();
  const skill = state.skills.find(s => s.id === id);
  if (!skill) return;

  if (!confirm(`Are you sure you want to remove "${skill.name}" from database?`)) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  } catch (err) {}

  state.skills = state.skills.filter(s => s.id !== id);
  localStorage.setItem('ayan_skills_cache', JSON.stringify(state.skills));
  renderSkills();
  showToast(`Skill "${skill.name}" removed. 🗑️`);
};

// ==========================================================================
// Modals Management
// ==========================================================================
window.openModal = function () {
  const modal = document.getElementById('modal-overlay');
  if (modal) modal.classList.remove('hidden');
};

window.closeModal = function () {
  const modal = document.getElementById('modal-overlay');
  if (modal) modal.classList.add('hidden');
  state.editingSkillId = null;
  const form = document.getElementById('skill-form');
  if (form) form.reset();
  const modalTitle = document.getElementById('modal-title');
  if (modalTitle) modalTitle.innerHTML = '<i class="ri-add-box-line"></i> Register New Skill Card';
  const profVal = document.getElementById('proficiency-val');
  if (profVal) profVal.textContent = '85';
};

window.openSkillDetailModal = function (id, e) {
  if (e) e.stopPropagation();
  const skill = state.skills.find(s => s.id === id);
  if (!skill) return;

  const modal = document.getElementById('skill-detail-modal');
  const name = document.getElementById('skill-detail-name');
  const icon = document.getElementById('skill-detail-icon');
  const category = document.getElementById('skill-detail-category');
  const exp = document.getElementById('skill-detail-exp');
  const profBadge = document.getElementById('skill-detail-prof-badge');
  const profVal = document.getElementById('skill-detail-prof-val');
  const profBar = document.getElementById('skill-detail-prof-bar');
  const desc = document.getElementById('skill-detail-desc');
  const code = document.getElementById('skill-detail-code');

  if (name) name.textContent = skill.name;
  if (icon) icon.textContent = skill.icon || '⚡';
  if (category) category.textContent = skill.category;
  if (exp) exp.innerHTML = `<i class="ri-time-line"></i> ${escapeHtml(skill.experience || '2+ Years')}`;
  if (profBadge) profBadge.textContent = `${skill.proficiency}% Proficiency`;
  if (profVal) profVal.textContent = `${skill.proficiency}%`;
  if (profBar) profBar.style.width = `${skill.proficiency}%`;

  if (desc) {
    desc.textContent = `Production-grade proficiency in ${skill.name}. Used extensively for building enterprise REST APIs, full-stack microservices, scalable database querying, and reactive frontend architectures.`;
  }
  if (code) {
    code.textContent = `# ${skill.name} Configuration & Usage Example\nimport sys\nprint("Active Technology Stack: ${skill.name}")`;
  }

  if (modal) modal.classList.remove('hidden');
};

window.closeSkillDetailModal = function () {
  const modal = document.getElementById('skill-detail-modal');
  if (modal) modal.classList.add('hidden');
};

window.openProjectDetailModal = function (projectKey, e) {
  if (e) e.stopPropagation();
  const modal = document.getElementById('project-detail-modal');
  const heading = document.getElementById('proj-modal-name');
  const desc = document.getElementById('proj-modal-desc');
  const icon = document.getElementById('proj-modal-icon');
  const liveLink = document.getElementById('proj-modal-live-link');

  const data = {
    'smart-color': {
      name: 'Smart Color World',
      icon: '🎨',
      desc: 'Room Paint Calculator, Color Shade Visualizer & Instant Quotation Generator app with multi-device real-time sync. Built with HTML5, CSS3, ES6+ JS, and Netlify continuous deployment.',
      link: 'https://clever-kangaroo-8abce3.netlify.app/'
    },
    'python-api': {
      name: 'Python Skill Manager API',
      icon: '🐍',
      desc: 'Zero-dependency Python REST HTTP server with SQLite database, Row factory dictionary mapping, and CORS preflight handling.',
      link: '#code-studio'
    },
    'glass-ui': {
      name: 'Glassmorphic UI Suite & WebGL Mesh',
      icon: '✨',
      desc: 'Liquid glass design system with real-time CSS custom property theme switcher, kinetic 3D WebGL particle canvas, and interactive control dock.',
      link: '#hero'
    }
  };

  const current = data[projectKey] || data['smart-color'];
  if (heading) heading.textContent = current.name;
  if (desc) desc.textContent = current.desc;
  if (icon) icon.textContent = current.icon;
  if (liveLink) liveLink.href = current.link;

  if (modal) modal.classList.remove('hidden');
};

window.closeProjectDetailModal = function () {
  const modal = document.getElementById('project-detail-modal');
  if (modal) modal.classList.add('hidden');
};

window.closeAllModals = function () {
  document.querySelectorAll('.modal-overlay').forEach(modal => modal.classList.add('hidden'));
};

// ==========================================================================
// Event Listeners Setup
// ==========================================================================
function setupEventListeners() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => navLinks.classList.toggle('mobile-open'));
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
    });
  }

  const viewGridBtn = document.getElementById('view-grid-btn');
  const viewListBtn = document.getElementById('view-list-btn');
  const skillsGrid = document.getElementById('skills-grid');

  if (viewGridBtn && viewListBtn) {
    viewGridBtn.addEventListener('click', () => {
      state.viewMode = 'grid';
      viewGridBtn.classList.add('active');
      viewListBtn.classList.remove('active');
      if (skillsGrid) skillsGrid.classList.remove('list-view');
    });

    viewListBtn.addEventListener('click', () => {
      state.viewMode = 'list';
      viewListBtn.classList.add('active');
      viewGridBtn.classList.remove('active');
      if (skillsGrid) skillsGrid.classList.add('list-view');
    });
  }

  const replayNavBtn = document.getElementById('replay-loader-btn');
  if (replayNavBtn) replayNavBtn.addEventListener('click', replayWebPreloader);

  const openModalBtn = document.getElementById('open-modal-btn');
  const openModalBtn2 = document.getElementById('open-modal-btn-2');
  if (openModalBtn) openModalBtn.addEventListener('click', openModal);
  if (openModalBtn2) openModalBtn2.addEventListener('click', openModal);

  const closeModalBtn = document.getElementById('close-modal-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeAllModals();
    });
  });

  const closeProjBtn = document.getElementById('close-proj-modal-btn');
  if (closeProjBtn) closeProjBtn.addEventListener('click', closeProjectDetailModal);

  const closeSkillDetailBtn = document.getElementById('close-skill-detail-btn');
  const skillDetailCloseBtn = document.getElementById('skill-detail-close-btn');
  if (closeSkillDetailBtn) closeSkillDetailBtn.addEventListener('click', closeSkillDetailModal);
  if (skillDetailCloseBtn) skillDetailCloseBtn.addEventListener('click', closeSkillDetailModal);

  const skillDetailEditBtn = document.getElementById('skill-detail-edit-btn');
  if (skillDetailEditBtn) {
    skillDetailEditBtn.addEventListener('click', () => {
      closeSkillDetailModal();
      const currentName = document.getElementById('skill-detail-name')?.textContent;
      const skill = state.skills.find(s => s.name === currentName);
      if (skill) editSkill(skill.id);
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  const profInput = document.getElementById('skill-proficiency');
  const profVal = document.getElementById('proficiency-val');
  if (profInput && profVal) {
    profInput.addEventListener('input', (e) => profVal.textContent = e.target.value);
  }

  const skillForm = document.getElementById('skill-form');
  if (skillForm) skillForm.addEventListener('submit', handleSkillFormSubmit);

  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      if (clearSearchBtn) clearSearchBtn.classList.toggle('hidden', state.searchQuery === '');
      renderSkills();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      state.searchQuery = '';
      clearSearchBtn.classList.add('hidden');
      renderSkills();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  const categoryTabs = document.getElementById('category-tabs');
  if (categoryTabs) {
    categoryTabs.addEventListener('click', (e) => {
      if (e.target.classList.contains('tab-btn')) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        state.currentCategory = e.target.dataset.category;
        renderSkills();
      }
    });
  }

  const levelFilter = document.getElementById('level-filter');
  if (levelFilter) {
    levelFilter.addEventListener('change', (e) => {
      state.levelFilter = e.target.value;
      renderSkills();
    });
  }

  const resetFilterBtn = document.getElementById('reset-filter-btn');
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      state.currentCategory = 'All';
      state.levelFilter = 'All';
      state.searchQuery = '';
      if (searchInput) searchInput.value = '';
      if (levelFilter) levelFilter.value = 'All';
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === 'All');
      });
      if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
      renderSkills();
    });
  }

  window.addEventListener('scroll', () => {
    updateActiveNavLink();
  });

  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('gajiayan404@gmail.com');
      showToast('Email copied to clipboard! (gajiayan404@gmail.com) ✉️');
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const message = document.getElementById('contact-msg')?.value.trim();
      const submitBtn = document.getElementById('contact-submit-btn');
      const btnText = document.getElementById('contact-btn-text');
      const btnIcon = document.getElementById('contact-btn-icon');
      const statusBox = document.getElementById('contact-status');

      if (!name || !email || !message) {
        showToast('Please fill out all fields.');
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Transmitting...';
      if (btnIcon) btnIcon.className = 'ri-loader-4-line ri-spin';
      if (statusBox) {
        statusBox.className = 'contact-status-msg info';
        statusBox.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Transmitting your inquiry securely to Ayan Gaji...';
        statusBox.classList.remove('hidden');
      }

      let sent = false;
      try {
        const res = await fetch('https://formsubmit.co/ajax/gajiayan404@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ name, email, message, _subject: `⚡ Portfolio Inquiry from ${name}` })
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok || data.success) sent = true;
      } catch (err) {}

      try {
        await fetch(`${API_BASE}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });
      } catch (e) {}

      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Send Message';
      if (btnIcon) btnIcon.className = 'ri-send-plane-fill';

      if (sent) {
        if (statusBox) {
          statusBox.className = 'contact-status-msg success';
          statusBox.innerHTML = `<i class="ri-checkbox-circle-fill" style="font-size: 1.2rem; color: #10b981;"></i> <div><strong>Message Delivered!</strong> Thank you, ${escapeHtml(name)}! Your message has been sent to <strong>gajiayan404@gmail.com</strong>. Ayan will respond shortly.</div>`;
        }
        showToast('Message transmitted successfully! 🚀');
        contactForm.reset();
      } else {
        if (statusBox) {
          statusBox.className = 'contact-status-msg error';
          statusBox.innerHTML = `<i class="ri-mail-send-fill" style="font-size: 1.2rem;"></i> <div>Direct API is offline. <a href="mailto:gajiayan404@gmail.com?subject=Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}" style="color: #2563EB; text-decoration: underline; font-weight: 700;">Click here to send direct via Email App</a></div>`;
        }
      }
    });
  }
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('header, section, footer');
  const scrollPos = window.scrollY + 220;

  sections.forEach(sec => {
    const id = sec.getAttribute('id');
    if (!id) return;
    const top = sec.offsetTop;
    const height = sec.offsetHeight;

    if (scrollPos >= top && scrollPos < top + height) {
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}

// ==========================================================================
// Typewriter Effect
// ==========================================================================
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const roles = [
    'Senior Full-Stack Engineer',
    'Python & SQLite Backend Architect',
    'Glassmorphic UI/UX Specialist',
    'High-Performance Web Developer',
    'REST API Microservices Builder'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const current = roles[roleIdx];
    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

// ==========================================================================
// Interactive 3D Particle Mesh Engine (White Theme Tuned)
// ==========================================================================
function initParticleMeshEngine() {
  const canvas = document.getElementById('particle-mesh-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 140 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const count = Math.min(Math.floor((width * height) / 18000), 65);
  const creamPalette = ['#B45309', '#D97706', '#C28E38', '#E6C587'];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      size: Math.random() * 2 + 1.2,
      color: creamPalette[Math.floor(Math.random() * creamPalette.length)]
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          let force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 3;
          p.y -= (dy / dist) * force * 3;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.color;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(180, 83, 9, ${0.16 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================================================
// Custom Glowing Cursor Follower
// ==========================================================================
function initCursorFollower() {
  const dot = document.getElementById('cursor-dot');
  const aura = document.getElementById('cursor-aura');
  if (!dot || !aura) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let auraX = mouseX;
  let auraY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderAura() {
    auraX += (mouseX - auraX) * 0.18;
    auraY += (mouseY - auraY) * 0.18;
    aura.style.transform = `translate(${auraX}px, ${auraY}px)`;
    requestAnimationFrame(renderAura);
  }
  renderAura();

  document.querySelectorAll('a, button, input, select, textarea, .glass-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      aura.style.width = '54px';
      aura.style.height = '54px';
      aura.style.borderColor = 'var(--accent-primary)';
    });
    el.addEventListener('mouseleave', () => {
      aura.style.width = '36px';
      aura.style.height = '36px';
      aura.style.borderColor = 'rgba(37, 99, 235, 0.45)';
    });
  });
}

// ==========================================================================
// Scroll Reveal Observer
// ==========================================================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => observer.observe(r));
}

// ==========================================================================
// 3D Skill Cube Drag & Rotation
// ==========================================================================
function init3DSkillCubeDrag() {
  const cube = document.getElementById('skill-cube-3d');
  if (!cube) return;

  let rotX = -20;
  let rotY = -30;
  let isDragging = false;
  let startX, startY;

  function updateTransform() {
    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  }

  setInterval(() => {
    if (!isDragging) {
      rotY = (rotY + 0.3) % 360;
      updateTransform();
    }
  }, 30);

  cube.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    rotY += dx * 0.6;
    rotX -= dy * 0.6;
    startX = e.clientX;
    startY = e.clientY;
    updateTransform();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  cube.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;
    rotY += dx * 0.6;
    rotX -= dy * 0.6;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    updateTransform();
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

// ==========================================================================
// 3D Interactive Card Tilt on Mouse Move
// ==========================================================================
function init3DCardTilt() {
  const cards = document.querySelectorAll('.hero-visualizer-card, .service-card-item, .project-card, .timeline-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
  });
}

// ==========================================================================
// Terminal Simulator
// ==========================================================================
function initTerminalSimulator() {
  const input = document.getElementById('terminal-input');
  const history = document.getElementById('terminal-history');
  const body = document.getElementById('terminal-body');
  if (!input || !history) return;

  const COMMANDS = {
    help: `Available Commands:
  • <span class="term-highlight">help</span>          - List available commands
  • <span class="term-highlight">cat profile</span>   - Display Ayan's bio & specs
  • <span class="term-highlight">ls skills</span>     - Print all active technologies
  • <span class="term-highlight">ls projects</span>   - View production projects
  • <span class="term-highlight">fetch api</span>     - Query live SQLite API payload
  • <span class="term-highlight">contact</span>       - Get direct contact info
  • <span class="term-highlight">hire</span>          - Request custom software build
  • <span class="term-highlight">whoami</span>        - Print current session user
  • <span class="term-highlight">clear</span>         - Clear the terminal screen`,

    'cat profile': `Engineering Profile:
  Name: Ayan Gaji
  Role: Senior Full-Stack Engineer & System Architect
  Experience: 3+ Years Professional
  Specializations: Python REST APIs, SQLite Schemas, Glassmorphic UI/UX, WebGL
  Status: 🟢 Available for Hire & Custom Projects
  Email: gajiayan404@gmail.com`,

    'ls skills': () => {
      return state.skills.map(s => `• ${s.icon || '⚡'} ${s.name} [${s.category}] - ${s.proficiency}% (${s.experience || '2+ Years'})`).join('\n');
    },

    'ls projects': `Featured Work:
  1. [Live App] Smart Color World - https://clever-kangaroo-8abce3.netlify.app/
  2. [Backend]  Python Skill Manager API (http.server + sqlite3)
  3. [Design]   Glassmorphic UI Suite & 3D WebGL Mesh
  4. [CLI]      Interactive Developer Sandbox Simulator`,

    'fetch api': () => {
      const top3 = state.skills.slice(0, 3);
      return `HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: *

` + JSON.stringify(top3, null, 2);
    },

    contact: `Direct Contact Channels:
  • Email: gajiayan404@gmail.com
  • GitHub: https://github.com
  • LinkedIn: https://linkedin.com
  • Base: Remote / Worldwide (Response < 24 Hours)`,

    hire: `⚡ Project Collaboration:
  Ayan Gaji is open for full-time engineering roles, freelance contracts, and API builds.
  Please reach out to gajiayan404@gmail.com or submit the Contact Form below.`,

    whoami: 'guest@ayan-dev-workstation (Access Granted: Level 1 Developer Sandbox)',
    date: () => new Date().toString(),
    matrix: '⚡ Wake up, Neo... The Matrix has you. Follow the white rabbit 🐇',
    clear: ''
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const raw = input.value.trim();
      const cmd = raw.toLowerCase();
      input.value = '';

      if (!cmd) return;

      if (cmd === 'clear') {
        history.innerHTML = '';
        return;
      }

      const userLine = document.createElement('div');
      userLine.className = 'terminal-line cmd-prompt';
      userLine.textContent = `ayan@dev-workstation:~$ ${raw}`;
      history.appendChild(userLine);

      const resLine = document.createElement('div');
      resLine.className = 'terminal-line';

      if (COMMANDS[cmd]) {
        const out = typeof COMMANDS[cmd] === 'function' ? COMMANDS[cmd]() : COMMANDS[cmd];
        resLine.innerHTML = `<pre style="font-family: inherit; margin: 0; white-space: pre-wrap;">${out}</pre>`;
      } else {
        resLine.innerHTML = `<span style="color: #f87171;">Command not found: '${escapeHtml(raw)}'. Type <span class="term-highlight">'help'</span> for list of commands.</span>`;
      }

      history.appendChild(resLine);
      if (body) body.scrollTop = body.scrollHeight;
    }
  });

  document.querySelectorAll('.term-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.dataset.cmd;
      if (input && cmd) {
        input.value = cmd;
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      }
    });
  });
}

// ==========================================================================
// Code Studio Tab Viewer & Runner
// ==========================================================================
function initCodeStudio() {
  const display = document.getElementById('code-snippet-display');
  const runBtn = document.getElementById('run-code-btn');
  const copyBtn = document.getElementById('copy-code-btn');
  const outputPanel = document.getElementById('code-output-panel');
  const outputJson = document.getElementById('output-json-display');
  const closeOutput = document.getElementById('close-output-btn');

  document.querySelectorAll('.code-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.code-tab-btn').forEach(b => b.classList.remove('active'));
      const target = e.target.closest('.code-tab-btn');
      if (!target) return;
      target.classList.add('active');
      const lang = target.dataset.lang;
      if (display && CODE_SNIPPETS[lang]) {
        display.innerHTML = `<code>${CODE_SNIPPETS[lang]}</code>`;
      }
      if (outputPanel) outputPanel.classList.add('hidden');
    });
  });

  if (runBtn && outputPanel && outputJson) {
    runBtn.addEventListener('click', () => {
      const sample = state.skills.slice(0, 3);
      outputJson.textContent = JSON.stringify(sample, null, 2);
      outputPanel.classList.remove('hidden');
      showToast('Executed! SQLite payload JSON response generated. ⚡');
    });
  }

  if (closeOutput && outputPanel) {
    closeOutput.addEventListener('click', () => outputPanel.classList.add('hidden'));
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const activeTab = document.querySelector('.code-tab-btn.active')?.dataset.lang || 'python';
      const textMap = {
        python: `import http.server, json, sqlite3\n\nclass CustomHandler(http.server.SimpleHTTPRequestHandler):\n    def do_GET(self):\n        conn = sqlite3.connect("skills.db")\n        conn.row_factory = sqlite3.Row\n        cursor = conn.cursor()\n        cursor.execute("SELECT * FROM skills ORDER BY id DESC")\n        skills = [dict(row) for row in cursor.fetchall()]\n        conn.close()\n        self.send_response(200)\n        self.send_header("Content-Type", "application/json")\n        self.send_header("Access-Control-Allow-Origin", "*")\n        self.end_headers()\n        self.wfile.write(json.dumps(skills).encode('utf-8'))`,
        js: `async function fetchSkillsFromAPI() {\n  try {\n    const response = await fetch('http://localhost:5000/api/skills');\n    if (!response.ok) throw new Error('API offline');\n    const data = await response.json();\n    renderSkillsGrid(data);\n  } catch (err) {\n    console.warn('Loading cached skills fallback', err);\n    loadFromLocalStorage();\n  }\n}`,
        sql: `CREATE TABLE IF NOT EXISTS skills (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    name TEXT NOT NULL,\n    category TEXT NOT NULL,\n    proficiency INTEGER NOT NULL,\n    icon TEXT NOT NULL,\n    experience TEXT NOT NULL\n);\n\nSELECT * FROM skills WHERE proficiency >= 85 ORDER BY proficiency DESC;`,
        css: `.glass-card {\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(248, 250, 252, 0.82) 100%);\n  backdrop-filter: blur(24px) saturate(190%);\n  border: 1px solid rgba(226, 232, 240, 0.85);\n  border-radius: 18px;\n  box-shadow: 0 20px 45px -10px rgba(15, 23, 42, 0.08);\n}`
      };
      navigator.clipboard.writeText(textMap[activeTab] || '');
      showToast('Code snippet copied to clipboard! 📋');
    });
  }
}

// ==========================================================================
// Theme Engine & Liquid Glass Controls (White Luxury Presets)
// ==========================================================================
function initThemeEngine() {
  const THEMES = {
    cyan: { primary: '#2563EB', secondary: '#7C3AED', gradient: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' },
    purple: { primary: '#7C3AED', secondary: '#EC4899', gradient: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)' },
    orange: { primary: '#EA580C', secondary: '#F59E0B', gradient: 'linear-gradient(135deg, #EA580C 0%, #F59E0B 100%)' },
    green: { primary: '#059669', secondary: '#06B6D4', gradient: 'linear-gradient(135deg, #059669 0%, #06B6D4 100%)' },
    gold: { primary: '#D97706', secondary: '#EF4444', gradient: 'linear-gradient(135deg, #D97706 0%, #EF4444 100%)' }
  };

  function applyTheme(colorKey) {
    const t = THEMES[colorKey] || THEMES.cyan;
    document.documentElement.style.setProperty('--accent-primary', t.primary);
    document.documentElement.style.setProperty('--accent-secondary', t.secondary);
    document.documentElement.style.setProperty('--accent-gradient', t.gradient);
    document.documentElement.style.setProperty('--border-glow', `${t.primary}55`);
    document.documentElement.style.setProperty('--glass-border-light', `${t.primary}70`);
    document.documentElement.style.setProperty('--glass-glow', `0 10px 30px ${t.primary}22`);
    localStorage.setItem('ayan_theme', colorKey);
  }

  document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      applyTheme(dot.dataset.color);
    });
  });

  const dockToggle = document.getElementById('dock-toggle-btn');
  const dockPanel = document.getElementById('dock-panel');
  const dockClose = document.getElementById('dock-close-btn');

  if (dockToggle && dockPanel) {
    dockToggle.addEventListener('click', () => dockPanel.classList.toggle('open'));
  }
  if (dockClose && dockPanel) {
    dockClose.addEventListener('click', () => dockPanel.classList.remove('open'));
  }

  const PRESET_MAP = {
    monochrome: 'cyan',
    vivid: 'purple',
    ocean: 'cyan',
    pastel: 'purple',
    sage: 'green',
    sunset: 'orange'
  };

  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const themeKey = PRESET_MAP[btn.dataset.preset] || 'cyan';
      applyTheme(themeKey);
    });
  });

  const blurSlider = document.getElementById('blur-slider');
  const blurVal = document.getElementById('blur-val');
  if (blurSlider && blurVal) {
    blurSlider.addEventListener('input', (e) => {
      blurVal.textContent = `${e.target.value}px`;
      document.documentElement.style.setProperty('--glass-blur', `${e.target.value}px`);
    });
  }

  const opacitySlider = document.getElementById('opacity-slider');
  const opacityVal = document.getElementById('opacity-val');
  if (opacitySlider && opacityVal) {
    opacitySlider.addEventListener('input', (e) => {
      opacityVal.textContent = `${e.target.value}%`;
      const alpha = (e.target.value / 100).toFixed(2);
      document.documentElement.style.setProperty('--glass-bg-card', `linear-gradient(135deg, rgba(255, 255, 255, ${alpha}) 0%, rgba(248, 250, 252, ${Math.min(1, parseFloat(alpha) + 0.05)}) 100%)`);
    });
  }

  const cursorToggle = document.getElementById('cursor-trail-toggle');
  if (cursorToggle) {
    cursorToggle.addEventListener('change', (e) => {
      document.body.classList.toggle('hide-cursor', !e.target.checked);
    });
  }

  const saved = localStorage.getItem('ayan_theme');
  if (saved && THEMES[saved]) {
    applyTheme(saved);
    document.querySelectorAll('.color-dot').forEach(d => d.classList.toggle('active', d.dataset.color === saved));
  }
}

// ==========================================================================
// Scroll Progress & Back to Top HUD
// ==========================================================================
function initScrollHUD() {
  const topProgressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top-hud');
  const ringFill = document.getElementById('scroll-ring-fill');

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? (window.scrollY / total) * 100 : 0;

    if (topProgressBar) topProgressBar.style.width = `${progress}%`;

    if (ringFill) {
      const circumference = 264;
      const offset = circumference - (progress / 100) * circumference;
      ringFill.style.strokeDashoffset = offset;
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ==========================================================================
// Toast Notifications
// ==========================================================================
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Helper: Escape HTML string
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==========================================================================
// Authentication Session State & Admin Status Handler
// ==========================================================================
function checkAuthStatus() {
  const loginBtn = document.getElementById('nav-login-btn');
  const loginText = document.getElementById('nav-login-text');
  const sessionData = localStorage.getItem('ayan_auth_session');

  if (sessionData) {
    try {
      const session = JSON.parse(sessionData);
      if (session && session.authenticated) {
        if (loginBtn) {
          loginBtn.classList.add('logged-in');
          loginBtn.href = '#';
          loginBtn.title = `Logged in as ${session.user} (Click to Logout)`;
          loginBtn.onclick = (e) => {
            e.preventDefault();
            if (confirm(`Logout from Developer Session (${session.user})?`)) {
              localStorage.removeItem('ayan_auth_session');
              window.location.reload();
            }
          };
        }
        if (loginText) {
          loginText.textContent = `Admin ⚡`;
        }

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('auth') === 'true') {
          showToast(`⚡ Developer Mode Active: Welcome ${session.user}`);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}

// Run auth check on initialization
document.addEventListener('DOMContentLoaded', checkAuthStatus);
checkAuthStatus();

