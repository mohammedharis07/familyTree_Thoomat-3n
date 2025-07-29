// ===== GENERATIONS PAGE LOGIC =====

let currentGeneration = 1
let currentView = "grid"

const GENERATION_INFO = {
  1: { title: "First Generation", description: "The pioneers of our family.", icon: "fas fa-star" },
  2: { title: "Second Generation", description: "The builders of our legacy.", icon: "fas fa-star-half-alt" },
  3: { title: "Third Generation", description: "The leaders of our community.", icon: "fas fa-star-half-alt" },
  4: { title: "Fourth Generation", description: "The innovators of our times.", icon: "fas fa-star-half-alt" },
  5: { title: "Fifth Generation", description: "The future of our family.", icon: "fas fa-star-half-alt" },
}

const FAMILY_DATABASE = [
  {
    id: 1,
    name: "John Doe",
    profession: "Engineer",
    qualification: "B.Tech",
    contact: "1234567890",
    branch: "Branch 1",
    generation: 1,
    isFounder: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    profession: "Doctor",
    qualification: "MBBS",
    contact: "0987654321",
    branch: "Branch 2",
    generation: 2,
  },
  // More members here
]

document.addEventListener("DOMContentLoaded", () => {
  initializeGenerationsPage()
})

function initializeGenerationsPage() {
  createGenerationSelector()
  initializeViewControls()
  loadGeneration(currentGeneration)
  initializeAnimations()
  handleURLParams()
  initializeGenerationSearch()
}

// ===== GENERATION SELECTOR =====
function createGenerationSelector() {
  const selector = document.getElementById("generationSelector")
  if (!selector) return

  const generations = Object.entries(GENERATION_INFO)

  const buttonsHTML = generations
    .map(([gen, info]) => {
      const memberCount = getMembersByGeneration(Number.parseInt(gen)).length
      const isActive = Number.parseInt(gen) === currentGeneration ? "active" : ""

      return `
            <button class="gen-btn ${isActive}" data-generation="${gen}">
                <i class="${info.icon}"></i>
                <span class="gen-title">Generation ${gen}</span>
                <span class="gen-subtitle">${memberCount} members</span>
            </button>
        `
    })
    .join("")

  selector.innerHTML = buttonsHTML

  // Add event listeners
  selector.querySelectorAll(".gen-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const generation = Number.parseInt(this.dataset.generation)
      selectGeneration(generation)
    })
  })
}

function selectGeneration(generation) {
  if (generation === currentGeneration) return

  currentGeneration = generation

  // Update active button
  document.querySelectorAll(".gen-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  document.querySelector(`[data-generation="${generation}"]`).classList.add("active")

  // Load generation data
  loadGeneration(generation)

  // Update URL
  updateURL({ generation: generation })
}

// ===== VIEW CONTROLS =====
function initializeViewControls() {
  const viewButtons = document.querySelectorAll(".view-btn")

  viewButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const view = this.dataset.view
      switchView(view)
    })
  })
}

function switchView(view) {
  if (view === currentView) return

  currentView = view

  // Update active button
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  document.querySelector(`[data-view="${view}"]`).classList.add("active")

  // Re-render current generation with new view
  loadGeneration(currentGeneration)
}

// ===== GENERATION LOADING =====
function loadGeneration(generation) {
  const container = document.getElementById("membersContainer")
  const infoContainer = document.getElementById("generationInfo")

  if (!container || !infoContainer) return

  // Show loading
  showLoading(container)

  // Simulate loading delay for better UX
  setTimeout(() => {
    try {
      const members = getMembersByGeneration(generation)
      const generationInfo = GENERATION_INFO[generation]

      // Update generation info
      updateGenerationInfo(infoContainer, generationInfo, members)

      // Render members based on current view
      if (currentView === "grid") {
        renderMembersGrid(container, members)
      } else {
        renderMembersTree(container, members)
      }
    } catch (error) {
      console.error("Error loading generation:", error)
      showError(container, "Failed to load generation data. Please try again.")
    }
  }, 300)
}

function updateGenerationInfo(container, info, members) {
  const professionStats = getGenerationProfessionStats(members)
  const locationStats = getGenerationLocationStats(members)

  container.innerHTML = `
        <h2>${info.title}</h2>
        <p>${info.description}</p>
        <div class="info-stats">
            <div class="info-stat">
                <span class="stat-number">${members.length}</span>
                <span class="stat-label">Total Members</span>
            </div>
            <div class="info-stat">
                <span class="stat-number">${Object.keys(professionStats).length}</span>
                <span class="stat-label">Professions</span>
            </div>
            <div class="info-stat">
                <span class="stat-number">${Object.keys(locationStats).length}</span>
                <span class="stat-label">Countries</span>
            </div>
        </div>
    `
}

function getGenerationProfessionStats(members) {
  const stats = {}
  members.forEach((member) => {
    const category = getProfessionCategory(member.profession)
    stats[category] = (stats[category] || 0) + 1
  })
  return stats
}

function getGenerationLocationStats(members) {
  const stats = {}
  members.forEach((member) => {
    const location = getLocationFromContact(member.contact)
    if (location !== "Unknown") {
      stats[location] = (stats[location] || 0) + 1
    }
  })
  return stats
}

// ===== GRID VIEW =====
function renderMembersGrid(container, members) {
  if (members.length === 0) {
    container.innerHTML = `
            <div class="no-members">
                <i class="fas fa-users"></i>
                <h3>No Members Found</h3>
                <p>This generation doesn't have any recorded members yet.</p>
            </div>
        `
    return
  }

  const gridHTML = `
        <div class="members-grid">
            ${members.map((member) => createMemberCard(member)).join("")}
        </div>
    `

  container.innerHTML = gridHTML

  // Add animation
  const grid = container.querySelector(".members-grid")
  setTimeout(() => {
    grid.classList.add("visible")
  }, 100)

  // Initialize card interactions
  initializeMemberCards(container)
}

function createMemberCard(member) {
  const cardClass = getMemberCardClass(member)
  const icon = getProfessionIcon(member.profession)
  const formattedContact = formatPhoneNumber(member.contact)
  const location = getLocationFromContact(member.contact)

  return `
        <div class="member-card ${cardClass}" data-member-id="${member.id}">
            <div class="member-header">
                <div class="member-avatar">
                    <i class="${icon}"></i>
                </div>
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <div class="member-role">${member.profession}</div>
                </div>
            </div>
            <div class="member-details">
                <div class="member-detail">
                    <i class="fas fa-graduation-cap"></i>
                    <span class="member-qualification">${member.qualification}</span>
                </div>
                <div class="member-detail">
                    <i class="fas fa-phone"></i>
                    <span class="member-contact">${formattedContact}</span>
                </div>
                <div class="member-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span class="member-location">${location}</span>
                </div>
                <div class="member-detail">
                    <i class="fas fa-sitemap"></i>
                    <span class="member-branch">${getBranchShortName(member.branch)}</span>
                </div>
                <div class="member-detail">
                    <i class="fas fa-layer-group"></i>
                    <span class="member-generation">Generation ${member.generation}</span>
                </div>
            </div>
        </div>
    `
}

function getMemberCardClass(member) {
  if (member.isFounder) return "founder"
  if (member.generation >= 4) return "young"
  return ""
}

function getBranchShortName(branchName) {
  const branchMap = {
    "A T Mohamed unny (Late) & P.M Kochu Rabiya": "Branch 1",
    "A T kunjupathumma (Late) & P.K Athakutty (Late)": "Branch 2",
    "A T Pathavu (Late) & Veetiparambil Avvutty (Late)": "Branch 3",
    "A T Nafeesakutty & M.A Bappu Moulavi (Late)": "Branch 4",
    "A.T AliKunji (Late) & P.K Kunhipathunni": "Branch 5",
    "A.T Kunjaisu (Late) & R.V Mohammed Haji (Late)": "Branch 6",
    "A.T Aminakutty (Late) & A.M Bavu (Late)": "Branch 7",
    "A T Aboobakker (Late) & Rasiya .P.N": "Branch 8",
    "A.T Zainba & Abdul Kadar": "Branch 9",
    "A T Ibrahim Kutty & Zohra Ibrahim": "Branch 10",
  }
  return branchMap[branchName] || branchName
}

// ===== TREE VIEW =====
function renderMembersTree(container, members) {
  if (members.length === 0) {
    container.innerHTML = `
            <div class="no-members">
                <i class="fas fa-sitemap"></i>
                <h3>No Members Found</h3>
                <p>This generation doesn't have any recorded members yet.</p>
            </div>
        `
    return
  }

  // Group members by branch
  const membersByBranch = groupBy(members, "branchId")

  const treeHTML = `
        <div class="members-tree">
            ${Object.entries(membersByBranch)
              .map(([branchId, branchMembers]) => createBranchTree(branchId, branchMembers))
              .join("")}
        </div>
    `

  container.innerHTML = treeHTML

  // Add animation
  const tree = container.querySelector(".members-tree")
  setTimeout(() => {
    tree.classList.add("visible")
  }, 100)
}

function createBranchTree(branchId, members) {
  const branchInfo = getBranchById(Number.parseInt(branchId))
  const branchName = branchInfo ? branchInfo.name : `Branch ${branchId}`

  return `
        <div class="tree-branch" data-branch="${branchId}">
            <div class="branch-header">
                <h4>${branchName}</h4>
                <span class="member-count">${members.length} members</span>
            </div>
            <div class="tree-level">
                ${members.map((member) => createTreeNode(member)).join("")}
            </div>
        </div>
    `
}

function createTreeNode(member) {
  const icon = getProfessionIcon(member.profession)
  const nodeClass = member.isFounder ? "root" : "leaf"

  return `
        <div class="tree-node ${nodeClass}" data-member-id="${member.id}">
            <div class="node-avatar">
                <i class="${icon}"></i>
            </div>
            <h4>${member.name}</h4>
            <div class="node-role">${member.profession}</div>
        </div>
    `
}

// ===== MEMBER CARD INTERACTIONS =====
function initializeMemberCards(container) {
  const cards = container.querySelectorAll(".member-card, .tree-node")

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const memberId = Number.parseInt(this.dataset.memberId)
      showMemberDetails(memberId)
    })

    // Add hover effects
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
}

function showMemberDetails(memberId) {
  const member = FAMILY_DATABASE.find((m) => m.id === memberId)
  if (!member) return

  // Create modal content
  const modalHTML = `
        <div class="member-modal">
            <div class="modal-header">
                <div class="member-avatar-large">
                    <i class="${getProfessionIcon(member.profession)}"></i>
                </div>
                <div class="member-info-large">
                    <h2>${member.name}</h2>
                    <div class="member-profession-large">${member.profession}</div>
                </div>
                <button class="modal-close" onclick="closeMemberModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="member-details-grid">
                    <div class="detail-item">
                        <i class="fas fa-graduation-cap"></i>
                        <span class="detail-label">Qualification:</span>
                        <span class="detail-value">${member.qualification}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-phone"></i>
                        <span class="detail-label">Contact:</span>
                        <span class="detail-value">${formatPhoneNumber(member.contact)}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span class="detail-label">Location:</span>
                        <span class="detail-value">${getLocationFromContact(member.contact)}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-sitemap"></i>
                        <span class="detail-label">Branch:</span>
                        <span class="detail-value">${getBranchShortName(member.branch)}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-layer-group"></i>
                        <span class="detail-label">Generation:</span>
                        <span class="detail-value">Generation ${member.generation}</span>
                    </div>
                    ${
                      member.gender
                        ? `
                        <div class="detail-item">
                            <i class="${getGenderIcon(member.gender)}"></i>
                            <span class="detail-label">Gender:</span>
                            <span class="detail-value">${capitalizeWords(member.gender)}</span>
                        </div>
                    `
                        : ""
                    }
                </div>
            </div>
        </div>
    `

  // Show modal
  showModal(modalHTML)
}

function showModal(content) {
  const modal = document.createElement("div")
  modal.className = "modal show"
  modal.id = "memberModal"
  modal.innerHTML = `<div class="modal-content">${content}</div>`

  document.body.appendChild(modal)
  document.body.style.overflow = "hidden"

  // Close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeMemberModal()
    }
  })
}

function closeMemberModal() {
  const modal = document.getElementById("memberModal")
  if (modal) {
    modal.remove()
    document.body.style.overflow = "auto"
  }
}

// ===== ANIMATIONS =====
function initializeAnimations() {
  // Animate generation info on load
  const generationInfo = document.getElementById("generationInfo")
  if (generationInfo) {
    const observer = createIntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in")

          // Animate stat numbers
          const statNumbers = entry.target.querySelectorAll(".stat-number")
          statNumbers.forEach((stat) => {
            const target = Number.parseInt(stat.textContent)
            animateCounter(stat, target, 1500)
          })

          observer.unobserve(entry.target)
        }
      })
    })

    observer.observe(generationInfo)
  }
}

// ===== URL HANDLING =====
function handleURLParams() {
  const params = getURLParams()

  if (params.generation) {
    const generation = Number.parseInt(params.generation)
    if (generation >= 1 && generation <= 5) {
      selectGeneration(generation)
    }
  }

  if (params.view && ["grid", "tree"].includes(params.view)) {
    switchView(params.view)
  }
}

// ===== SEARCH WITHIN GENERATION =====
function initializeGenerationSearch() {
  const searchInput = document.getElementById("generationSearch")
  if (!searchInput) return

  searchInput.addEventListener(
    "input",
    debounce(function () {
      const query = this.value.trim().toLowerCase()
      filterCurrentGeneration(query)
    }, 300),
  )
}

function filterCurrentGeneration(query) {
  const members = getMembersByGeneration(currentGeneration)

  let filteredMembers = members
  if (query) {
    filteredMembers = members.filter(
      (member) =>
        member.name.toLowerCase().includes(query) ||
        member.profession.toLowerCase().includes(query) ||
        member.qualification.toLowerCase().includes(query),
    )
  }

  const container = document.getElementById("membersContainer")
  if (currentView === "grid") {
    renderMembersGrid(container, filteredMembers)
  } else {
    renderMembersTree(container, filteredMembers)
  }
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener("keydown", (event) => {
  // Number keys 1-5 to switch generations
  if (event.key >= "1" && event.key <= "5") {
    event.preventDefault()
    selectGeneration(Number.parseInt(event.key))
  }

  // G key to toggle between grid and tree view
  if (event.key.toLowerCase() === "g" && !event.ctrlKey && !event.altKey) {
    event.preventDefault()
    switchView(currentView === "grid" ? "tree" : "grid")
  }
})

// ===== HELPER FUNCTIONS =====

function showLoading(container) {
  container.innerHTML = `
        <div class="loading-members">
            <div class="loading-spinner"></div>
            <p>Loading generation data...</p>
        </div>
    `
}

function showError(container, message) {
  container.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Error</h3>
            <p>${message}</p>
            <button onclick="loadGeneration(${currentGeneration})" class="retry-btn">
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

function groupBy(array, key) {
  return array.reduce((groups, item) => {
    const group = item[key]
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {})
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, (l) => l.toUpperCase())
}

function getMembersByGeneration(generation) {
  return FAMILY_DATABASE.filter((member) => member.generation === generation)
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

function getBranchById(branchId) {
  // Example implementation
  return { name: `Branch ${branchId}` }
}

function getGenderIcon(gender) {
  // Example implementation
  return gender === "male" ? "fas fa-male" : "fas fa-female"
}

function formatPhoneNumber(phoneNumber) {
  // Example implementation
  return phoneNumber
}
