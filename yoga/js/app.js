// PranaDaily Main Web Application State & Logic Controller

class PranaDailyApp {
  constructor() {
    this.db = YOGA_DATABASE;
    this.categories = CATEGORY_META;
    
    // Application State
    this.currentTab = 'generator';
    this.favorites = JSON.parse(localStorage.getItem('prana_favorites')) || [];
    this.history = JSON.parse(localStorage.getItem('prana_history')) || [];
    this.savedRoutines = JSON.parse(localStorage.getItem('prana_routines')) || [];
    
    // Active Daily Routine
    this.activeRoutine = [];
    
    // Studio Player State
    this.studioPoseIndex = 0;
    this.studioTimer = 120; // Default 2 mins
    this.studioTimerInterval = null;
    this.isTimerRunning = false;
    this.isStudioMuted = false;
    
    // Library Search & Filter
    this.searchQuery = '';
    this.activeCategoryFilter = 'All';
    this.activeSpotlightCat = 'warmup_exercises';
    
    // Presets configuration
    this.presets = {
      'morning': {
        name: "🌞 Morning Energizer",
        desc: "An invigorating blend of warmups, Surya Namaskar, and gentle opening asanas to awaken your body and mind.",
        recipe: { "warmup_exercises": 3, "suryanamaskar_variants": 1, "Simple Asana": 3, "Pranayam & Dhyana": 1 }
      },
      'evening': {
        name: "🌙 Restorative Evening",
        desc: "A soothing, cooling sequence of gentle folds, sitting postures, and calming Pranayam to prepare for blissful deep sleep.",
        recipe: { "warmup_exercises": 2, "Simple Asana": 3, "Sitting Postures": 1, "Pranayam & Dhyana": 2 }
      },
      'balance': {
        name: "⚡ Full Body Balance",
        desc: "A completely holistic daily yoga session touching on strength, flexibility, breathwork, and deep relaxation.",
        recipe: { "warmup_exercises": 2, "suryanamaskar_variants": 1, "Simple Asana": 4, "Sitting Postures": 1, "Pranayam & Dhyana": 1, "Mudra": 1 }
      },
      'meditation': {
        name: "🧘 Breath & Mind Focus",
        desc: "A dedicated mindfulness routine focused intensely on Prana channeling, psychic mudras, and profound meditation.",
        recipe: { "warmup_exercises": 1, "Simple Asana": 1, "Pranayam & Dhyana": 3, "Sitting Postures": 1, "Mudra": 2 }
      },
      'power': {
        name: "🔥 Advanced Power Yogi",
        desc: "A vigorous, highly challenging athletic flow incorporating complex arm balances, deep wheel arches, and core bandhas.",
        recipe: { "warmup_exercises": 2, "suryanamaskar_variants": 2, "Simple Asana": 3, "Advanced Asana": 2, "Bandha": 1, "Pranayam & Dhyana": 1 }
      },
      'surprise': {
        name: "🎲 Pure Surprise Routine",
        desc: "Let the universe guide your journey today with a highly varied surprise selection across all 9 wonderful categories.",
        recipe: 'random'
      }
    };
  }

  init() {
    this.bindEvents();
    this.renderCategorySliders();
    this.renderSpotlightPicker();
    this.renderCatalogFilters();
    this.renderCatalog();
    this.renderJourneyStats();
    this.renderFavorites();
    
    // Generate an initial Morning Routine by default
    this.generatePresetRoutine('morning');
  }

  bindEvents() {
    // Navigation Tabs
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        if (tab) this.switchTab(tab);
      });
    });

    // Mobile Navigation Button
    const btnMobile = document.getElementById('btnMobileMenu');
    if (btnMobile) {
      btnMobile.addEventListener('click', () => {
        const sidebar = document.querySelector('.app-sidebar');
        if (sidebar) sidebar.classList.toggle('open');
      });
    }

    // Ambient Audio Toggle Widget
    const btnAudio = document.getElementById('btnAudioToggle');
    const selectAudio = document.getElementById('ambientSoundSelect');
    if (btnAudio) {
      btnAudio.addEventListener('click', () => {
        const type = selectAudio ? selectAudio.value : 'singing_bowl';
        const isPlaying = audioStudio.toggleAmbient(type);
        const icon = btnAudio.querySelector('svg');
        const waves = document.querySelector('.sound-waves');
        
        if (isPlaying) {
          icon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`; // Volume mute/playing style
          if (waves) waves.classList.add('playing');
          this.showToast("🎶 Soothing ambient sound playing");
        } else {
          icon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>`;
          if (waves) waves.classList.remove('playing');
          this.showToast("Ambient sound paused");
        }
      });
    }

    if (selectAudio) {
      selectAudio.addEventListener('change', (e) => {
        if (audioStudio.isPlayingAmbient) {
          audioStudio.startAmbient(); // Refresh with new type
        }
      });
    }

    // Preset Cards Click
    document.querySelectorAll('.preset-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const presetKey = e.currentTarget.dataset.preset;
        if (presetKey) {
          this.generatePresetRoutine(presetKey);
          this.showToast(`✨ Loaded Preset: ${this.presets[presetKey].name}`);
        }
      });
    });

    // Custom Routine Builder Button
    const btnGenCustom = document.getElementById('btnGenerateCustom');
    if (btnGenCustom) {
      btnGenCustom.addEventListener('click', () => {
        this.generateCustomRoutine();
        this.showToast("✨ Custom Routine Generated!");
      });
    }

    // Spotlight Generator Button
    const btnSpotlight = document.getElementById('btnGenerateSpotlight');
    if (btnSpotlight) {
      btnSpotlight.addEventListener('click', () => {
        const count = parseInt(document.getElementById('spotlightCountSelect').value) || 3;
        this.generateCategorySpotlight(this.activeSpotlightCat, count);
        this.showToast(`🎲 Generated Spotlight for ${this.categories[this.activeSpotlightCat]?.name || 'Category'}`);
      });
    }

    // Modal Close Button
    const btnModalClose = document.getElementById('btnPoseModalClose');
    if (btnModalClose) {
      btnModalClose.addEventListener('click', () => this.closePoseModal());
    }
    document.getElementById('poseDetailsModal')?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) this.closePoseModal();
    });

    // Studio Setup Events
    document.getElementById('btnStartStudio')?.addEventListener('click', () => {
      if (this.activeRoutine.length === 0) {
        this.showToast("⚠️ Please generate a routine first!");
        return;
      }
      this.startStudioSession();
    });

    document.getElementById('btnStudioPlayPause')?.addEventListener('click', () => this.toggleStudioTimer());
    document.getElementById('btnStudioNext')?.addEventListener('click', () => this.nextStudioPose());
    document.getElementById('btnStudioPrev')?.addEventListener('click', () => this.prevStudioPose());
    
    document.querySelectorAll('.btn-time-adj').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const delta = parseInt(e.currentTarget.dataset.delta);
        if (!isNaN(delta)) this.adjustStudioTimer(delta);
      });
    });

    // Catalog Search & Filter
    const searchInput = document.getElementById('catalogSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderCatalog();
      });
    }

    // Save Routine Button
    document.getElementById('btnSaveActiveRoutine')?.addEventListener('click', () => {
      if (this.activeRoutine.length === 0) return;
      const name = prompt("Name your daily custom routine:", "My Peaceful Routine");
      if (!name) return;
      
      const newRoutine = {
        id: 'rt-' + Date.now(),
        name: name,
        date: new Date().toLocaleDateString(),
        items: [...this.activeRoutine]
      };
      
      this.savedRoutines.push(newRoutine);
      localStorage.setItem('prana_routines', JSON.stringify(this.savedRoutines));
      this.renderFavorites();
      this.showToast(`💾 Routine saved to your Favorites!`);
    });
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.tab === tabId);
    });
    
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === `tab-${tabId}`);
    });
    
    // Close mobile sidebar if open
    document.querySelector('.app-sidebar')?.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // If we leave studio, pause timer
    if (tabId !== 'studio' && this.isTimerRunning) {
      this.toggleStudioTimer();
    }
  }

  showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="font-size: 1.25rem;">🌿</span> <div>${message}</div>`;
    
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ==========================================
  // ROUTINE GENERATION LOGIC
  // ==========================================
  
  getRandomItems(category, count) {
    const pool = this.db.filter(item => item.category === category);
    if (pool.length === 0) return [];
    
    // Shuffle pool flawlessly
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, pool.length)).map(item => ({
      ...item,
      duration: 120, // 2 mins default per practice
      sequenceId: 'seq-' + Math.random().toString(36).substr(2, 9)
    }));
  }

  generatePresetRoutine(presetKey) {
    const preset = this.presets[presetKey];
    if (!preset) return;

    let newRoutine = [];
    if (preset.recipe === 'random') {
      // Pick 7 random unique items from anywhere
      const shuffled = [...this.db].sort(() => 0.5 - Math.random());
      newRoutine = shuffled.slice(0, 7).map(item => ({
        ...item,
        duration: 120,
        sequenceId: 'seq-' + Math.random().toString(36).substr(2, 9)
      }));
    } else {
      // Sample exactly according to the structured recipe
      for (const [cat, count] of Object.entries(preset.recipe)) {
        newRoutine.push(...this.getRandomItems(cat, count));
      }
    }

    this.activeRoutine = newRoutine;
    this.renderActiveRoutineSequence();
  }

  generateCustomRoutine() {
    let newRoutine = [];
    
    for (const catKey of Object.keys(this.categories)) {
      const slider = document.getElementById(`slider-${catKey}`);
      if (!slider) continue;
      const count = parseInt(slider.value) || 0;
      if (count > 0) {
        newRoutine.push(...this.getRandomItems(catKey, count));
      }
    }

    if (newRoutine.length === 0) {
      this.showToast("⚠️ Please select at least 1 exercise from the sliders!");
      return;
    }

    this.activeRoutine = newRoutine;
    this.renderActiveRoutineSequence();
  }

  generateCategorySpotlight(category, count) {
    const items = this.getRandomItems(category, count);
    if (items.length === 0) {
      this.showToast("⚠️ Could not generate practices for this category.");
      return;
    }
    this.activeRoutine = items;
    this.renderActiveRoutineSequence();
  }

  swapSequenceItem(sequenceId) {
    const idx = this.activeRoutine.findIndex(item => item.sequenceId === sequenceId);
    if (idx === -1) return;
    
    const currentItem = this.activeRoutine[idx];
    const pool = this.db.filter(item => item.category === currentItem.category && item.id !== currentItem.id);
    
    if (pool.length === 0) {
      this.showToast("⚠️ No other alternative practice available in this category.");
      return;
    }

    const nextRandom = pool[Math.floor(Math.random() * pool.length)];
    this.activeRoutine[idx] = {
      ...nextRandom,
      duration: currentItem.duration,
      sequenceId: currentItem.sequenceId
    };

    this.renderActiveRoutineSequence();
    this.showToast(`🔄 Swapped with: ${nextRandom.title}`);
  }

  removeSequenceItem(sequenceId) {
    this.activeRoutine = this.activeRoutine.filter(item => item.sequenceId !== sequenceId);
    this.renderActiveRoutineSequence();
    this.showToast("🗑️ Removed exercise from routine");
  }

  // ==========================================
  // RENDERING BUILDER & SEQUENCE
  // ==========================================
  
  renderCategorySliders() {
    const container = document.getElementById('categorySlidersContainer');
    if (!container) return;
    container.innerHTML = '';

    for (const [catKey, meta] of Object.entries(this.categories)) {
      const group = document.createElement('div');
      group.className = 'slider-group';
      group.innerHTML = `
        <div class="slider-top">
          <span class="slider-label">${meta.icon} ${meta.name}</span>
          <span class="slider-value" id="val-${catKey}">0</span>
        </div>
        <input type="range" class="custom-range" id="slider-${catKey}" min="0" max="6" value="0">
      `;
      
      const input = group.querySelector('input');
      const valDisplay = group.querySelector('.slider-value');
      
      input.addEventListener('input', (e) => {
        valDisplay.textContent = e.target.value;
      });
      
      container.appendChild(group);
    }
  }

  renderSpotlightPicker() {
    const container = document.getElementById('spotlightCategoryCards');
    if (!container) return;
    container.innerHTML = '';

    for (const [catKey, meta] of Object.entries(this.categories)) {
      const card = document.createElement('div');
      card.className = `cat-select-card ${this.activeSpotlightCat === catKey ? 'active' : ''}`;
      card.innerHTML = `
        <div class="cat-select-icon">${meta.icon}</div>
        <div class="cat-select-name">${meta.name}</div>
      `;
      
      card.addEventListener('click', () => {
        this.activeSpotlightCat = catKey;
        document.querySelectorAll('.cat-select-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });

      container.appendChild(card);
    }
  }

  renderActiveRoutineSequence() {
    const container = document.getElementById('generatedRoutineList');
    const countDisplay = document.getElementById('routineTotalCount');
    const timeDisplay = document.getElementById('routineTotalTime');
    if (!container) return;

    container.innerHTML = '';

    if (this.activeRoutine.length === 0) {
      container.innerHTML = `<div class="text-center py-10 text-muted">No exercises generated yet. Choose a preset or adjust sliders above!</div>`;
      if (countDisplay) countDisplay.textContent = '0 exercises';
      if (timeDisplay) timeDisplay.textContent = '0 mins';
      return;
    }

    let totalSeconds = 0;

    this.activeRoutine.forEach((item, idx) => {
      totalSeconds += item.duration;
      const catMeta = this.categories[item.category] || { name: item.category, color: 'cat-simple' };

      const div = document.createElement('div');
      div.className = 'routine-item';
      div.innerHTML = `
        <div class="routine-item-index">${idx + 1}</div>
        <img src="${item.imageUrl}" class="routine-item-img" alt="${item.title}" onerror="this.src='https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800';">
        <div class="routine-item-info">
          <span class="category-badge ${catMeta.color}">${catMeta.name}</span>
          <div class="routine-item-title mt-2">${item.title}</div>
          <span class="routine-item-sanskrit">${item.sanskrit}</span>
          <div class="routine-item-benefits">${item.benefits.join(' • ')}</div>
        </div>
        <div class="routine-item-actions">
          <select class="duration-select" data-seqid="${item.sequenceId}">
            <option value="60" ${item.duration === 60 ? 'selected' : ''}>1 min</option>
            <option value="120" ${item.duration === 120 ? 'selected' : ''}>2 mins</option>
            <option value="180" ${item.duration === 180 ? 'selected' : ''}>3 mins</option>
            <option value="300" ${item.duration === 300 ? 'selected' : ''}>5 mins</option>
          </select>
          <button class="btn-icon btn-swap" title="Swap with another ${catMeta.name}" data-seqid="${item.sequenceId}">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
          </button>
          <button class="btn-icon btn-remove" title="Remove" data-seqid="${item.sequenceId}">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      `;

      // Duration Selector
      const select = div.querySelector('.duration-select');
      select.addEventListener('change', (e) => {
        const val = parseInt(e.target.value);
        const seqId = e.target.dataset.seqid;
        const routineItem = this.activeRoutine.find(i => i.sequenceId === seqId);
        if (routineItem) routineItem.duration = val;
        this.renderActiveRoutineSequence(); // Refreshes total time
      });

      // Swap Action
      div.querySelector('.btn-swap').addEventListener('click', (e) => {
        this.swapSequenceItem(e.currentTarget.dataset.seqid);
      });

      // Remove Action
      div.querySelector('.btn-remove').addEventListener('click', (e) => {
        this.removeSequenceItem(e.currentTarget.dataset.seqid);
      });

      container.appendChild(div);
    });

    if (countDisplay) countDisplay.textContent = `${this.activeRoutine.length} exercises`;
    if (timeDisplay) timeDisplay.textContent = `${Math.ceil(totalSeconds / 60)} mins total`;
  }

  // ==========================================
  // PRACTICE STUDIO PLAYER
  // ==========================================
  
  startStudioSession() {
    this.switchTab('studio');
    this.studioPoseIndex = 0;
    this.loadStudioPose(0);
    this.showCompletionScreen(false);
  }

  loadStudioPose(index) {
    if (index < 0 || index >= this.activeRoutine.length) return;
    
    // Play soothing start chime
    if (!this.isStudioMuted) {
      audioStudio.playChime();
    }

    const item = this.activeRoutine[index];
    this.studioTimer = item.duration;
    this.updateStudioTimerDisplay();

    // Update Progress
    const progText = document.getElementById('studioProgressText');
    if (progText) progText.textContent = `Practice ${index + 1} of ${this.activeRoutine.length}`;

    // Update Poses Info
    const img = document.getElementById('studioMainImg');
    const title = document.getElementById('studioPoseTitle');
    const sanskrit = document.getElementById('studioPoseSanskrit');
    const desc = document.getElementById('studioInstructionsText');
    const catBadge = document.getElementById('studioCatBadge');

    const catMeta = this.categories[item.category] || { name: item.category, color: 'cat-simple' };

    if (img) img.src = item.imageUrl;
    if (title) title.textContent = item.title;
    if (sanskrit) sanskrit.textContent = item.sanskrit;
    if (desc) desc.textContent = item.description;
    
    if (catBadge) {
      catBadge.className = `category-badge ${catMeta.color}`;
      catBadge.textContent = catMeta.name;
    }

    // Up Next Preview
    const nextElem = document.getElementById('studioNextPreview');
    const nextItem = this.activeRoutine[index + 1];
    if (nextElem) {
      if (nextItem) {
        nextElem.innerHTML = `<span class="next-label">Up Next (${Math.ceil(nextItem.duration / 60)}m):</span> <span class="next-pose-name">✨ ${nextItem.title}</span>`;
      } else {
        nextElem.innerHTML = `<span class="next-label">Up Next:</span> <span class="next-pose-name">🎉 Grand Final Completion!</span>`;
      }
    }

    // Start Timer automatically
    if (this.isTimerRunning) {
      this.pauseStudioTimer();
    }
    this.startStudioTimer();
  }

  updateStudioTimerDisplay() {
    const disp = document.getElementById('studioTimerDisplay');
    if (!disp) return;

    const mins = Math.floor(this.studioTimer / 60);
    const secs = this.studioTimer % 60;
    disp.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  startStudioTimer() {
    if (this.isTimerRunning) return;
    this.isTimerRunning = true;
    
    const playBtnIcon = document.getElementById('btnStudioPlayPause')?.querySelector('svg');
    if (playBtnIcon) {
      playBtnIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>`; // Pause icon
    }

    this.studioTimerInterval = setInterval(() => {
      this.studioTimer--;
      if (this.studioTimer <= 0) {
        this.completeStudioPose();
      } else {
        this.updateStudioTimerDisplay();
      }
    }, 1000);
  }

  pauseStudioTimer() {
    if (!this.isTimerRunning) return;
    this.isTimerRunning = false;
    clearInterval(this.studioTimerInterval);

    const playBtnIcon = document.getElementById('btnStudioPlayPause')?.querySelector('svg');
    if (playBtnIcon) {
      playBtnIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"/>`; // Play icon
    }
  }

  toggleStudioTimer() {
    if (this.isTimerRunning) {
      this.pauseStudioTimer();
    } else {
      this.startStudioTimer();
    }
  }

  adjustStudioTimer(delta) {
    this.studioTimer = Math.max(10, this.studioTimer + delta);
    this.updateStudioTimerDisplay();
  }

  completeStudioPose() {
    this.pauseStudioTimer();
    
    // Ring end chime
    if (!this.isStudioMuted) {
      audioStudio.playChime();
    }

    if (this.studioPoseIndex + 1 < this.activeRoutine.length) {
      this.studioPoseIndex++;
      this.loadStudioPose(this.studioPoseIndex);
    } else {
      this.finishSessionSuccessfully();
    }
  }

  nextStudioPose() {
    this.pauseStudioTimer();
    if (this.studioPoseIndex + 1 < this.activeRoutine.length) {
      this.studioPoseIndex++;
      this.loadStudioPose(this.studioPoseIndex);
    } else {
      this.finishSessionSuccessfully();
    }
  }

  prevStudioPose() {
    this.pauseStudioTimer();
    if (this.studioPoseIndex > 0) {
      this.studioPoseIndex--;
      this.loadStudioPose(this.studioPoseIndex);
    }
  }

  finishSessionSuccessfully() {
    this.pauseStudioTimer();
    this.showCompletionScreen(true);
    
    if (!this.isStudioMuted) {
      setTimeout(() => audioStudio.playChime(), 500);
    }

    // Log to History & LocalStorage
    const totalMins = this.activeRoutine.reduce((acc, curr) => acc + curr.duration, 0) / 60;
    const sessionRecord = {
      id: 'hs-' + Date.now(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      routineName: "Cohesive Daily Yoga Practice",
      minutes: Math.ceil(totalMins),
      exerciseCount: this.activeRoutine.length
    };

    this.history.unshift(sessionRecord);
    localStorage.setItem('prana_history', JSON.stringify(this.history));

    // Update active Streak
    let streak = parseInt(localStorage.getItem('prana_streak')) || 0;
    const lastPracticed = localStorage.getItem('prana_last_date');
    const today = new Date().toLocaleDateString();
    
    if (lastPracticed !== today) {
      streak++;
      localStorage.setItem('prana_streak', streak);
      localStorage.setItem('prana_last_date', today);
    }

    this.renderJourneyStats();
    this.showToast("🎉 Spectacular! You have completed your daily session!");
  }

  showCompletionScreen(show) {
    const mainStudioCard = document.getElementById('mainStudioCard');
    const upNextBar = document.getElementById('studioNextPreview');
    const completionScreen = document.getElementById('completionScreen');
    
    const summaryMins = document.getElementById('summaryTotalMins');
    const summaryCount = document.getElementById('summaryTotalPoses');
    const summaryStreak = document.getElementById('summaryCurrentStreak');

    if (show) {
      if (mainStudioCard) mainStudioCard.style.display = 'none';
      if (upNextBar) upNextBar.style.display = 'none';
      if (completionScreen) completionScreen.style.display = 'block';

      const totalMins = this.activeRoutine.reduce((acc, curr) => acc + curr.duration, 0) / 60;
      if (summaryMins) summaryMins.textContent = Math.ceil(totalMins);
      if (summaryCount) summaryCount.textContent = this.activeRoutine.length;
      if (summaryStreak) summaryStreak.textContent = localStorage.getItem('prana_streak') || 1;
    } else {
      if (mainStudioCard) mainStudioCard.style.display = 'grid';
      if (upNextBar) upNextBar.style.display = 'flex';
      if (completionScreen) completionScreen.style.display = 'none';
    }
  }

  // ==========================================
  // YOGA LIBRARY CATALOG
  // ==========================================
  
  renderCatalogFilters() {
    const container = document.getElementById('catalogFilterCategories');
    if (!container) return;
    container.innerHTML = '';

    const allCats = ['All', ...Object.keys(this.categories)];

    allCats.forEach(catKey => {
      const btn = document.createElement('button');
      btn.className = `btn-filter ${this.activeCategoryFilter === catKey ? 'active' : ''}`;
      
      const name = catKey === 'All' ? '🌟 All 150 Practices' : (this.categories[catKey]?.name || catKey);
      btn.textContent = name;
      
      btn.addEventListener('click', () => {
        this.activeCategoryFilter = catKey;
        document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderCatalog();
      });

      container.appendChild(btn);
    });
  }

  renderCatalog() {
    const container = document.getElementById('catalogGridContainer');
    if (!container) return;
    container.innerHTML = '';

    let filtered = this.db;

    // Apply Category Filter
    if (this.activeCategoryFilter !== 'All') {
      filtered = filtered.filter(item => item.category === this.activeCategoryFilter);
    }

    // Apply Search Query
    if (this.searchQuery.trim() !== '') {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.sanskrit.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.benefits.some(b => b.toLowerCase().includes(q))
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `<div class="col-span-full py-16 text-center text-muted">No yoga practices matched your specific search. Try searching another pose!</div>`;
      return;
    }

    filtered.forEach(item => {
      const isFav = this.favorites.includes(item.id);
      const catMeta = this.categories[item.category] || { name: item.category, color: 'cat-simple' };

      const card = document.createElement('div');
      card.className = 'pose-card';
      card.innerHTML = `
        <div class="pose-card-img-box">
          <img src="${item.imageUrl}" class="pose-card-img" alt="${item.title}" onerror="this.src='https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800';">
          <div class="pose-card-overlay">
            <span class="category-badge ${catMeta.color}">${catMeta.name}</span>
            <button class="btn-icon btn-fav-toggle ${isFav ? 'active' : ''}" data-poseid="${item.id}" title="${isFav ? 'Remove Favorite' : 'Add Favorite'}">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </button>
          </div>
        </div>
        <div class="pose-card-body">
          <div>
            <div class="pose-card-title">${item.title}</div>
            <div class="pose-card-sanskrit">${item.sanskrit}</div>
            <p class="pose-card-desc">${item.description}</p>
          </div>
          <div class="pose-card-footer mt-4">
            <button class="btn-secondary btn-sm btn-open-modal" data-poseid="${item.id}">
              <span>View Guide</span>
            </button>
            <button class="btn-primary btn-sm btn-add-routine" data-poseid="${item.id}">
              <span>+ Add to Daily</span>
            </button>
          </div>
        </div>
      `;

      // Favorite Event
      card.querySelector('.btn-fav-toggle').addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleFavorite(item.id, e.currentTarget);
      });

      // View Guide Modal Event
      card.querySelector('.btn-open-modal').addEventListener('click', () => {
        this.openPoseModal(item.id);
      });

      // Add to Daily Routine Event
      card.querySelector('.btn-add-routine').addEventListener('click', () => {
        this.activeRoutine.push({
          ...item,
          duration: 120,
          sequenceId: 'seq-' + Math.random().toString(36).substr(2, 9)
        });
        this.renderActiveRoutineSequence();
        this.showToast(`🌿 Added ${item.title} to your active daily routine!`);
      });

      container.appendChild(card);
    });
  }

  // ==========================================
  // POSE DETAILS MODAL
  // ==========================================
  
  openPoseModal(poseId) {
    const item = this.db.find(i => i.id === poseId);
    if (!item) return;

    const modal = document.getElementById('poseDetailsModal');
    const img = document.getElementById('modalHeaderImg');
    const title = document.getElementById('modalPoseTitle');
    const sanskrit = document.getElementById('modalPoseSanskrit');
    const desc = document.getElementById('modalPoseDesc');
    const benefitsGrid = document.getElementById('modalBenefitsGrid');
    const catBadge = document.getElementById('modalCatBadge');

    const catMeta = this.categories[item.category] || { name: item.category, color: 'cat-simple' };

    if (img) img.src = item.imageUrl;
    if (title) title.textContent = item.title;
    if (sanskrit) sanskrit.textContent = item.sanskrit;
    if (desc) desc.textContent = item.description;
    
    if (catBadge) {
      catBadge.className = `category-badge ${catMeta.color}`;
      catBadge.textContent = catMeta.name;
    }

    if (benefitsGrid) {
      benefitsGrid.innerHTML = '';
      item.benefits.forEach(ben => {
        const p = document.createElement('div');
        p.className = 'benefit-pill';
        p.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg> <span>${ben}</span>`;
        benefitsGrid.appendChild(p);
      });
    }

    if (modal) {
      modal.classList.add('active');
    }
  }

  closePoseModal() {
    const modal = document.getElementById('poseDetailsModal');
    if (modal) modal.classList.remove('active');
  }

  // ==========================================
  // FAVORITES & JOURNEY
  // ==========================================
  
  toggleFavorite(poseId, btnElem = null) {
    const idx = this.favorites.indexOf(poseId);
    const item = this.db.find(i => i.id === poseId);

    if (idx === -1) {
      this.favorites.push(poseId);
      this.showToast(`⭐ Added "${item?.title}" to your Favorites`);
      if (btnElem) {
        btnElem.classList.add('active');
        btnElem.querySelector('svg').setAttribute('fill', 'currentColor');
      }
    } else {
      this.favorites.splice(idx, 1);
      this.showToast(`Removed "${item?.title}" from Favorites`);
      if (btnElem) {
        btnElem.classList.remove('active');
        btnElem.querySelector('svg').setAttribute('fill', 'none');
      }
    }

    localStorage.setItem('prana_favorites', JSON.stringify(this.favorites));
    this.renderFavorites();
  }

  renderFavorites() {
    const favGrid = document.getElementById('myFavoritesGrid');
    const savedRoutinesList = document.getElementById('savedRoutinesContainer');

    if (favGrid) {
      favGrid.innerHTML = '';
      const favItems = this.db.filter(item => this.favorites.includes(item.id));

      if (favItems.length === 0) {
        favGrid.innerHTML = `<div class="col-span-full py-12 text-center text-muted">You haven't added any practices to your specific Favorites yet. Browse the Yoga Library tab and click the star icon!</div>`;
      } else {
        favItems.forEach(item => {
          const catMeta = this.categories[item.category] || { name: item.category, color: 'cat-simple' };

          const card = document.createElement('div');
          card.className = 'pose-card';
          card.innerHTML = `
            <div class="pose-card-img-box" style="height: 140px;">
              <img src="${item.imageUrl}" class="pose-card-img" alt="${item.title}">
              <div class="pose-card-overlay">
                <span class="category-badge ${catMeta.color}">${catMeta.name}</span>
                <button class="btn-icon btn-fav-toggle active" data-poseid="${item.id}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </button>
              </div>
            </div>
            <div class="pose-card-body p-4">
              <div class="pose-card-title" style="font-size: 1.1rem;">${item.title}</div>
              <div class="pose-card-sanskrit mt-1">${item.sanskrit}</div>
              <div class="mt-3 flex gap-2">
                <button class="btn-primary btn-sm flex-1 btn-play-fav" data-poseid="${item.id}">
                  <span>Play Practice</span>
                </button>
              </div>
            </div>
          `;

          card.querySelector('.btn-fav-toggle').addEventListener('click', () => {
            this.toggleFavorite(item.id);
            this.renderCatalog(); // keep synced
          });

          card.querySelector('.btn-play-fav').addEventListener('click', () => {
            this.activeRoutine = [{
              ...item,
              duration: 180,
              sequenceId: 'seq-1'
            }];
            this.startStudioSession();
          });

          favGrid.appendChild(card);
        });
      }
    }

    // Render Saved Custom Daily Routines
    if (savedRoutinesList) {
      savedRoutinesList.innerHTML = '';
      if (this.savedRoutines.length === 0) {
        savedRoutinesList.innerHTML = `<div class="py-8 text-muted">No custom daily routines saved yet. Build one in the Daily Generator and hit "Save Daily Routine"!</div>`;
      } else {
        this.savedRoutines.forEach((rt, idx) => {
          const div = document.createElement('div');
          div.className = 'history-item';
          div.innerHTML = `
            <div class="history-item-left">
              <span class="stat-icon-big" style="width:48px;height:48px;font-size:1.5rem;">🧘</span>
              <div>
                <div class="history-routine-name">${rt.name}</div>
                <div class="history-date mt-1">${rt.items?.length || 0} exercises • Saved on ${rt.date}</div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <button class="btn-primary btn-sm btn-load-saved">
                <span>▶️ Start Session</span>
              </button>
              <button class="btn-icon btn-del-saved" title="Delete">
                <span>🗑️</span>
              </button>
            </div>
          `;

          div.querySelector('.btn-load-saved').addEventListener('click', () => {
            this.activeRoutine = rt.items.map(i => ({ ...i, sequenceId: 'seq-' + Math.random() }));
            this.renderActiveRoutineSequence();
            this.startStudioSession();
          });

          div.querySelector('.btn-del-saved').addEventListener('click', () => {
            if (confirm(`Delete saved routine "${rt.name}"?`)) {
              this.savedRoutines.splice(idx, 1);
              localStorage.setItem('prana_routines', JSON.stringify(this.savedRoutines));
              this.renderFavorites();
            }
          });

          savedRoutinesList.appendChild(div);
        });
      }
    }
  }

  renderJourneyStats() {
    const totalSessionsElem = document.getElementById('statTotalSessions');
    const totalMinutesElem = document.getElementById('statTotalMinutes');
    const streakElem = document.getElementById('statCurrentStreak');
    const historyListElem = document.getElementById('journeyHistoryList');

    if (totalSessionsElem) totalSessionsElem.textContent = this.history.length;
    if (totalMinutesElem) {
      const totalMins = this.history.reduce((sum, h) => sum + (h.minutes || 0), 0);
      totalMinutesElem.textContent = totalMins;
    }
    if (streakElem) {
      streakElem.textContent = localStorage.getItem('prana_streak') || 0;
    }

    if (historyListElem) {
      historyListElem.innerHTML = '';
      if (this.history.length === 0) {
        historyListElem.innerHTML = `<div class="py-10 text-center text-muted">No completed sessions logged yet. Head over to the Practice Studio and complete your daily sequence!</div>`;
      } else {
        this.history.forEach(item => {
          const div = document.createElement('div');
          div.className = 'history-item';
          div.innerHTML = `
            <div class="history-item-left">
              <span style="font-size: 1.5rem;">✨</span>
              <div>
                <div class="history-routine-name">${item.routineName || 'Cohesive Yoga Flow'}</div>
                <div class="history-date mt-1">${item.date} at ${item.time}</div>
              </div>
            </div>
            <div>
              <span class="history-duration">${item.minutes} mins • ${item.exerciseCount} Poses</span>
            </div>
          `;
          historyListElem.appendChild(div);
        });
      }
    }
  }
}

// Bootstrap Application when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  window.pranaApp = new PranaDailyApp();
  window.pranaApp.init();
});
