// ============================================================
// DETAIL PAGE – Populate project details
// Uses shared data from data.js
// ============================================================

// ============================================================
// GET PROJECT ID FROM URL
// ============================================================
function getProjectId() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    return isNaN(id) ? null : id;
}

// ============================================================
// HELPER – Set button state (enable/disable)
// ============================================================
function setButtonState(btn, enabled, href) {
    if (enabled) {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
        btn.style.cursor = 'pointer';
        btn.classList.remove('btn-disabled');
        btn.href = href || '#';
    } else {
        btn.disabled = true;
        btn.style.opacity = '0.5';
        btn.style.pointerEvents = 'none';
        btn.style.cursor = 'not-allowed';
        btn.classList.add('btn-disabled');
        btn.href = '#';
    }
}
// ============================================================
// ADD STATUS BADGE TO DETAIL PAGE
// ============================================================

function addStatusBadge(progress) {
    const metaContainer = document.querySelector('.detail-meta');
    if (!metaContainer) return;

    // Remove existing badge if any
    const oldBadge = metaContainer.querySelector('.detail-status-badge');
    if (oldBadge) oldBadge.remove();

    const badge = document.createElement('div');
    badge.className = 'detail-status-badge';

    if (progress >= 100) {
        badge.classList.add('complete');
        badge.innerHTML = `<i class="fas fa-check-circle"></i> Complete`;
    } else if (progress > 0) {
        badge.classList.add('in-progress');
        badge.innerHTML = `<i class="fas fa-spinner"></i> In Progress`;
    } else {
        badge.classList.add('planning');
        badge.innerHTML = `<i class="fas fa-lightbulb"></i> Planning`;
    }

    // Insert after subtitle
    const subtitle = metaContainer.querySelector('.detail-subtitle');
    if (subtitle) {
        subtitle.after(badge);
    }
}

// ============================================================
// POPULATE DETAIL
// ============================================================
function populateDetail(id) {
    const project = projectData.find(p => p.id === id);
    if (!project) {
        document.getElementById('detailTitle').textContent = 'Project not found';
        document.getElementById('detailSubtitle').textContent = 'Please go back and select a valid project.';
        return;
        addStatusBadge(progress);
    }

    // ----- Image -----
    document.getElementById('detailImage').src = project.image;
    document.getElementById('detailImage').alt = project.title;

    // ----- Tags -----
    const tagsContainer = document.getElementById('detailTags');
    tagsContainer.innerHTML = '';
    project.tags.forEach((tag, i) => {
        const cls = project.tagClasses[i] || '';
        const span = document.createElement('span');
        span.className = `tag ${cls}`;
        span.textContent = tag;
        tagsContainer.appendChild(span);
    });

    // ----- Title & Subtitle -----
    document.getElementById('detailTitle').textContent = project.title;
    document.getElementById('detailSubtitle').textContent = project.subtitle;

    // ----- Progress Bar -----
    const progressFill = document.getElementById('detailProgressFill');
    const progressText = document.getElementById('detailProgressText');
    const progress = project.progress;

    progressFill.style.width = progress + '%';
    progressText.textContent = progress + '%';

    // ----- Progress Status & Button Control -----
    const liveLink = document.getElementById('detailLiveLink');
    const codeLink = document.getElementById('detailCodeLink');

    // Determine per‑button flags – fallback to progress-based rule if not set
    const liveEnabled = project.liveEnabled !== undefined
        ? project.liveEnabled
        : (progress >= 100);
    const codeEnabled = project.codeEnabled !== undefined
        ? project.codeEnabled
        : (progress >= 100);

    // Apply button states
    setButtonState(liveLink, liveEnabled, project.liveLink);
    setButtonState(codeLink, codeEnabled, project.codeLink);

    // Update progress bar appearance and status message
    const progressContainer = document.querySelector('.detail-progress-large');
    let statusMessage = progressContainer.querySelector('.progress-status-msg');
    if (!statusMessage) {
        statusMessage = document.createElement('div');
        statusMessage.className = 'progress-status-msg';
        statusMessage.style.marginTop = '6px';
        statusMessage.style.fontSize = '0.9rem';
        statusMessage.style.fontWeight = '600';
        progressContainer.appendChild(statusMessage);
    }

    const isComplete = (progress >= 100);
    if (isComplete && liveEnabled && codeEnabled) {
        // Fully complete and both buttons enabled
        progressFill.style.background = 'linear-gradient(90deg, #34d399, #22c55e)';
        progressText.textContent = ' Complete';
        progressText.style.color = '#34d399';
        // statusMessage.textContent = ' Project is fully completed!';
        // statusMessage.style.color = '#34d399';
    } else if (isComplete && (!liveEnabled || !codeEnabled)) {
        // 100% but one or both buttons disabled – show "Complete" but warn about disabled buttons
        progressFill.style.background = 'linear-gradient(90deg, #34d399, #22c55e)';
        progressText.textContent = ' Complete';
        progressText.style.color = '#34d399';
        statusMessage.textContent = ' Project is complete, but data not uploded till now.';
        statusMessage.style.color = '#bababa';
    } else {
        // In progress
        progressFill.style.background = 'linear-gradient(90deg, #fbbf24, #f59e0b)';
        progressText.textContent = ' Work in Progress';
        progressText.style.color = '#fbbf24';
        // statusMessage.textContent = ' This project is currently under development. Some features may be incomplete.';
        statusMessage.style.color = '#bababa';
    }

    // ----- Description -----
    document.getElementById('detailFullDesc').textContent = project.description;

    // ----- Features -----
    const featureList = document.getElementById('detailFeatures');
    featureList.innerHTML = '';
    project.features.forEach(f => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check-circle"></i> ${f}`;
        featureList.appendChild(li);
    });
}

// ============================================================
// INIT
// ============================================================
const id = getProjectId();
if (id !== null) {
    populateDetail(id);
} else {
    document.getElementById('detailTitle').textContent = 'No project specified';
    document.getElementById('detailSubtitle').textContent = 'Please return to the home page and select a project.';
}

// Initialize shared utilities (if any)
if (typeof initUtils === 'function') {
    initUtils();
}

// Run scroll animations after content renders
setTimeout(() => {
    if (typeof initScrollAnimations === 'function') {
        initScrollAnimations();
    }
}, 150);

console.log(`🚀 Detail page loaded for project ID: ${id}`);
