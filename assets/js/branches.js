// ===== BRANCHES PAGE LOGIC =====

let selectedBranch = null
const BRANCH_INFO = {
  1: { name: "Branch 1", description: "Description of Branch 1", icon: "fas fa-tree", count: 50 },
  2: { name: "Branch 2", description: "Description of Branch 2", icon: "fas fa-tree", count: 75 },
  // ... other branches
}
const FAMILY_DATABASE = [
  { id: 1, name: "John Doe", profession: "Engineer", qualification: "BSc", contact: "1234567890", generation: 1 },
  { id: 2, name: "Jane Smith", profession: "Doctor", qualification: "MD", contact: "0987654321", generation: 2 },
  // ... other members
]

document.addEventListener("DOMContentLoaded", () => {
  initializeBranchesPage()
})

function initializeBranchesPage() {
  renderBranchesGrid()
  initializeAnimations()
  handleURLParams()
  initializeModalHandlers()
  initializeBranchSearch()
}

// ===== BRANCHES GRID =====
function renderBranchesGrid() {
  const container = document.getElementById("branchesGrid")
  if (!container) return

  showLoading(container)

  setTimeout(() => {
    try {
      const branchesHTML = Object.entries(BRANCH_INFO)
        .map(([id, branch]) => createBranchCard(id, branch))
        .join("")

      container.innerHTML = branchesHTML

      // Initialize interactions
      initializeBranchCards(container)

      // Animate cards
      animateBranchCards(container)
    } catch (error) {
      console.error("Error rendering branches:", error)
      showError(container, "Failed to load family branches. Please refresh the page.")
    }
  }, 300)
}

function createBranchCard(id, branch) {
  const members = getMembersByBranch(Number.parseInt(id))
  const actualCount = members.length
  const percentage = (actualCount / Math.max(...Object.values(BRANCH_INFO).map((b) => b.count))) * 100

  // Get some statistics
  const professionStats = getBranchProfessionStats(members)
  const locationStats = getBranchLocationStats(members)
  const topProfessions = Object.entries(professionStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([prof]) => prof)

  return `
        <div class="branch-card" data-branch-id="${id}">
            <div class="branch-header">
                <div class="branch-icon">
                    <i class="${branch.icon}"></i>
                </div>
                <div class="branch-info">
                    <h3>${branch.name}</h3>
                    <div class="branch-meta">
                        <span class="member-count">${actualCount} members</span>
                        <span class="branch-id">Branch ${id}</span>
                    </div>
                </div>
            </div>
            
            <div class="branch-progress">
                <div class="progress-bar">
                    <div class="progress-fill" data-width="${percentage}%"></div>
                </div>
                <div class="progress-text">${percentage.toFixed(1)}% of largest branch</div>
            </div>
            
            <div class="branch-details">
                <p>${branch.description}</p>
            </div>
            
            <div class="branch-highlights">
                ${topProfessions.map((prof) => `<span class="highlight">${prof}</span>`).join("")}
                ${Object.keys(locationStats)
                  .slice(0, 2)
                  .map((location) => `<span class="highlight">${location}</span>`)
                  .join("")}
            </div>
            
            <button class="view-branch-btn" onclick="openBranchModal(${id})">
                <span>View Branch Details</span>
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `
}

function getBranchProfessionStats(members) {
  const stats = {}
  members.forEach((member) => {
    const category = getProfessionCategory(member.profession)
    stats[category] = (stats[category] || 0) + 1
  })
  return stats
}

function getBranchLocationStats(members) {
  const stats = {}
  members.forEach((member) => {
    const location = getLocationFromContact(member.contact)
    if (location !== "Unknown") {
      stats[location] = (stats[location] || 0) + 1
    }
  })
  return stats
}

// ===== BRANCH CARDS INTERACTIONS =====
function initializeBranchCards(container) {
  const cards = container.querySelectorAll(".branch-card")

  cards.forEach((card) => {
    // Hover effects
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })

    // Click to open modal
    card.addEventListener("click", function (e) {
      if (!e.target.closest(".view-branch-btn")) {
        const branchId = Number.parseInt(this.dataset.branchId)
        openBranchModal(branchId)
      }
    })
  })
}

function animateBranchCards(container) {
  const cards = container.querySelectorAll(".branch-card")

  // Animate progress bars
  const observer = createIntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressFill = entry.target.querySelector(".progress-fill")
        if (progressFill) {
          const targetWidth = progressFill.dataset.width
          setTimeout(() => {
            progressFill.style.width = targetWidth
          }, 300)
        }
        observer.unobserve(entry.target)
      }
    })
  })

  cards.forEach((card, index) => {
    // Stagger card animations
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "all 0.6s ease"

    setTimeout(() => {
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, index * 100)

    observer.observe(card)
  })
}

// ===== BRANCH MODAL =====
function openBranchModal(branchId) {
  selectedBranch = branchId
  const branch = BRANCH_INFO[branchId]
  const members = getMembersByBranch(branchId)

  if (!branch) {
    console.error("Branch not found:", branchId)
    return
  }

  const modal = document.getElementById("branchModal")
  const modalTitle = document.getElementById("modalTitle")
  const modalBody = document.getElementById("modalBody")

  if (!modal || !modalTitle || !modalBody) {
    console.error("Modal elements not found")
    return
  }

  // Set modal title
  modalTitle.textContent = branch.name

  // Create modal content
  const modalContent = createBranchModalContent(branch, members)
  modalBody.innerHTML = modalContent

  // Show modal
  modal.classList.add("show")
  document.body.style.overflow = "hidden"

  // Initialize modal interactions
  initializeModalInteractions()

  // Update URL
  updateURL({ branch: branchId })
}

function createBranchModalContent(branch, members) {
  const professionStats = getBranchProfessionStats(members)
  const locationStats = getBranchLocationStats(members)
  const generationStats = getGenerationStats(members)

  return `
        <div class="branch-description">
            <p>${branch.description}</p>
        </div>
        
        <div class="branch-stats-grid">
            <div class="branch-stat-card">
                <span class="stat-number">${members.length}</span>
                <span class="stat-label">Total Members</span>
            </div>
            <div class="branch-stat-card">
                <span class="stat-number">${Object.keys(professionStats).length}</span>
                <span class="stat-label">Professions</span>
            </div>
            <div class="branch-stat-card">
                <span class="stat-number">${Object.keys(locationStats).length}</span>
                <span class="stat-label">Countries</span>
            </div>
            <div class="branch-stat-card">
                <span class="stat-number">${Object.keys(generationStats).length}</span>
                <span class="stat-label">Generations</span>
            </div>
        </div>
        
        <h3 class="modal-section-title">
            <i class="fas fa-users"></i>
            Branch Members
        </h3>
        
        <div class="branch-members-grid">
            ${members.map((member) => createModalMemberCard(member)).join("")}
        </div>
        
        <h3 class="modal-section-title">
            <i class="fas fa-chart-pie"></i>
            Professional Distribution
        </h3>
        
        <div class="profession-stats">
            ${Object.entries(professionStats)
              .sort(([, a], [, b]) => b - a)
              .map(
                ([profession, count]) => `
                    <div class="stat-bar">
                        <div class="stat-label">${profession}</div>
                        <div class="stat-bar-container">
                            <div class="stat-bar-fill" style="width: ${(count / members.length) * 100}%"></div>
                            <span class="stat-count">${count}</span>
                        </div>
                    </div>
                `,
              )
              .join("")}
        </div>
        
        <h3 class="modal-section-title">
            <i class="fas fa-globe"></i>
            Geographic Distribution
        </h3>
        
        <div class="location-stats">
            ${Object.entries(locationStats)
              .sort(([, a], [, b]) => b - a)
              .map(
                ([location, count]) => `
                    <div class="location-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span class="location-name">${location}</span>
                        <span class="location-count">${count} members</span>
                    </div>
                `,
              )
              .join("")}
        </div>
    `
}

function createModalMemberCard(member) {
  const icon = getProfessionIcon(member.profession)
  const formattedContact = formatPhoneNumber(member.contact)
  const location = getLocationFromContact(member.contact)

  return `
        <div class="modal-member-card" data-member-id="${member.id}">
            <div class="member-avatar-small">
                <i class="${icon}"></i>
            </div>
            <div class="member-info-small">
                <h4>${member.name}</h4>
                <div class="member-profession">${member.profession}</div>
                <div class="member-qualification">${member.qualification}</div>
                <div class="member-contact">${formattedContact}</div>
                <div class="member-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${location}
                </div>
            </div>
        </div>
    `
}

function getGenerationStats(members) {
  const stats = {}
  members.forEach((member) => {
    stats[member.generation] = (stats[member.generation] || 0) + 1
  })
  return stats
}

// ===== MODAL HANDLERS =====
function initializeModalHandlers() {
  const modal = document.getElementById("branchModal")
  if (!modal) return

  // Close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeBranchModal()
    }
  })

  // Close on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeBranchModal()
    }
  })
}

function initializeModalInteractions() {
  const memberCards = document.querySelectorAll(".modal-member-card")

  memberCards.forEach((card) => {
    card.addEventListener("click", function () {
      const memberId = Number.parseInt(this.dataset.memberId)
      showMemberQuickView(memberId)
    })

    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Animate stat numbers
  const statNumbers = document.querySelectorAll(".branch-stat-card .stat-number")
  statNumbers.forEach((stat) => {
    const target = Number.parseInt(stat.textContent)
    animateCounter(stat, target, 1000)
  })
}

function showMemberQuickView(memberId) {
  const member = FAMILY_DATABASE.find((m) => m.id === memberId)
  if (!member) return

  // Create quick view tooltip
  const quickView = document.createElement("div")
  quickView.className = "member-quick-view"
  quickView.innerHTML = `
        <div class="quick-view-header">
            <div class="member-avatar-tiny">
                <i class="${getProfessionIcon(member.profession)}"></i>
            </div>
            <div>
                <h5>${member.name}</h5>
                <div class="quick-profession">${member.profession}</div>
            </div>
        </div>
        <div class="quick-view-details">
            <div><i class="fas fa-graduation-cap"></i> ${member.qualification}</div>
            <div><i class="fas fa-phone"></i> ${formatPhoneNumber(member.contact)}</div>
            <div><i class="fas fa-layer-group"></i> Generation ${member.generation}</div>
        </div>
    `

  document.body.appendChild(quickView)

  // Position near cursor
  const rect = event.target.getBoundingClientRect()
  quickView.style.left = rect.right + 10 + "px"
  quickView.style.top = rect.top + "px"

  // Remove after delay
  setTimeout(() => {
    if (quickView.parentElement) {
      quickView.remove()
    }
  }, 3000)
}

function closeBranchModal() {
  const modal = document.getElementById("branchModal")
  if (modal) {
    modal.classList.remove("show")
    document.body.style.overflow = "auto"
    selectedBranch = null

    // Update URL
    updateURL({ branch: null })
  }
}

// ===== ANIMATIONS =====
function initializeAnimations() {
  // Animate page header stats
  const statItems = document.querySelectorAll(".branch-stats .stat-item")

  if (statItems.length > 0) {
    const observer = createIntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumber = entry.target.querySelector(".stat-number")
          const targetCount = Number.parseInt(statNumber.textContent)

          if (statNumber && targetCount) {
            animateCounter(statNumber, targetCount, 2000)
          }

          observer.unobserve(entry.target)
        }
      })
    })

    statItems.forEach((item) => observer.observe(item))
  }
}

// ===== URL HANDLING =====
function handleURLParams() {
  const params = getURLParams()

  if (params.branch) {
    const branchId = Number.parseInt(params.branch)
    if (branchId >= 1 && branchId <= 10) {
      // Delay to ensure DOM is ready
      setTimeout(() => {
        openBranchModal(branchId)
      }, 500)
    }
  }
}

// ===== SEARCH AND FILTER =====
function initializeBranchSearch() {
  const searchInput = document.getElementById("branchSearch")
  if (!searchInput) return

  searchInput.addEventListener(
    "input",
    debounce(function () {
      const query = this.value.trim().toLowerCase()
      filterBranches(query)
    }, 300),
  )
}

function filterBranches(query) {
  const cards = document.querySelectorAll(".branch-card")

  cards.forEach((card) => {
    const branchId = Number.parseInt(card.dataset.branchId)
    const branch = BRANCH_INFO[branchId]
    const members = getMembersByBranch(branchId)

    const matchesQuery =
      !query ||
      branch.name.toLowerCase().includes(query) ||
      branch.description.toLowerCase().includes(query) ||
      branch.highlights.some((h) => h.toLowerCase().includes(query)) ||
      members.some((m) => m.name.toLowerCase().includes(query) || m.profession.toLowerCase().includes(query))

    if (matchesQuery) {
      card.style.display = "block"
      card.classList.add("fade-in")
    } else {
      card.style.display = "none"
    }
  })
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener("keydown", (event) => {
  // Number keys 1-9, 0 to open branch modals
  if (event.key >= "1" && event.key <= "9") {
    const branchId = Number.parseInt(event.key)
    if (BRANCH_INFO[branchId]) {
      event.preventDefault()
      openBranchModal(branchId)
    }
  } else if (event.key === "0") {
    if (BRANCH_INFO[10]) {
      event.preventDefault()
      openBranchModal(10)
    }
  }

  // Arrow keys to navigate between branches in modal
  if (selectedBranch && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
    event.preventDefault()
    const direction = event.key === "ArrowLeft" ? -1 : 1
    const newBranchId = selectedBranch + direction

    if (newBranchId >= 1 && newBranchId <= 10 && BRANCH_INFO[newBranchId]) {
      openBranchModal(newBranchId)
    }
  }
})

// ===== HELPER FUNCTIONS =====

function showLoading(container) {
  container.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <p>Loading family branches...</p>
        </div>
    `
}

function showError(container, message) {
  container.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Error</h3>
            <p>${message}</p>
            <button onclick="renderBranchesGrid()" class="retry-btn">
                <i class="fas fa-redo"></i>
                Try Again
            </button>
        </div>
    `
}

function updateURL(params) {
  const url = new URL(window.location)
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value)
    } else {
      url.searchParams.delete(key)
    }
  })
  window.history.replaceState({}, "", url)
}

function getURLParams() {
  const params = new URLSearchParams(window.location.search)
  const result = {}
  for (const [key, value] of params) {
    result[key] = value
  }
  return result
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function createIntersectionObserver(callback) {
  return new IntersectionObserver(callback, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  })
}

function animateCounter(element, target, duration) {
  const start = Number.parseInt(element.textContent) || 0
  const increment = (target - start) / (duration / 16)
  let current = start

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      element.textContent = target
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(current)
    }
  }, 16)
}

function getMembersByBranch(branchId) {
  return FAMILY_DATABASE.filter((member) => member.branchId === branchId)
}

function getProfessionCategory(profession) {
  // Example implementation
  return profession.split(" ")[0]
}

function getLocationFromContact(contact) {
  // Example implementation
  return "Unknown"
}

function getProfessionIcon(profession) {
  // Example implementation
  return "fas fa-user"
}

function formatPhoneNumber(contact) {
  // Example implementation
  return contact
}
