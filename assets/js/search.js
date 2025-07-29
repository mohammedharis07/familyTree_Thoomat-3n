// ===== SEARCH PAGE LOGIC =====

let searchTimeout
let currentResults = []

document.addEventListener("DOMContentLoaded", () => {
  initializeSearchPage()
})

function initializeSearchPage() {
  initializeSearchInput()
  initializeFilters()
  initializeSuggestions()
  initializeKeyboardShortcuts()
  handleURLParams()
  updateSearchStats()
}

// ===== SEARCH INPUT =====
function initializeSearchInput() {
  const searchInput = document.getElementById("searchInput")
  const clearBtn = document.getElementById("clearBtn")

  if (!searchInput) return

  // Search input event listener
  searchInput.addEventListener("input", function () {
    const query = this.value.trim()

    // Show/hide clear button
    if (clearBtn) {
      clearBtn.style.display = query.length > 0 ? "block" : "none"
    }

    // Debounce search
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      performSearch()
    }, 300)
  })

  // Clear button event listener
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = ""
      clearBtn.style.display = "none"
      clearAllFilters()
      performSearch()
    })
  }

  // Focus search input on page load
  searchInput.focus()
}

// ===== FILTERS =====
function initializeFilters() {
  populateFilterOptions()

  const filters = ["branchFilter", "professionFilter", "generationFilter"]

  filters.forEach((filterId) => {
    const filter = document.getElementById(filterId)
    if (filter) {
      filter.addEventListener("change", performSearch)
    }
  })
}

function populateFilterOptions() {
  populateBranchFilter()
  populateProfessionFilter()
  populateGenerationFilter()
}

function populateBranchFilter() {
  const branchFilter = document.getElementById("branchFilter")
  if (!branchFilter) return

  const branches = [...new Set(FAMILY_DATABASE.map((member) => member.branch))]

  branches.forEach((branch) => {
    const option = document.createElement("option")
    option.value = branch
    option.textContent = getBranchShortName(branch)
    branchFilter.appendChild(option)
  })
}

function populateProfessionFilter() {
  const professionFilter = document.getElementById("professionFilter")
  if (!professionFilter) return

  const professions = Object.keys(PROFESSION_CATEGORIES)

  professions.forEach((profession) => {
    const option = document.createElement("option")
    option.value = profession
    option.textContent = profession
    professionFilter.appendChild(option)
  })
}

function populateGenerationFilter() {
  const generationFilter = document.getElementById("generationFilter")
  if (!generationFilter) return

  const generations = [...new Set(FAMILY_DATABASE.map((member) => member.generation))].sort()

  generations.forEach((generation) => {
    const option = document.createElement("option")
    option.value = generation
    option.textContent = `Generation ${generation}`
    generationFilter.appendChild(option)
  })
}

function clearAllFilters() {
  const filters = ["branchFilter", "professionFilter", "generationFilter"]

  filters.forEach((filterId) => {
    const filter = document.getElementById(filterId)
    if (filter) {
      filter.value = ""
    }
  })
}

// ===== SEARCH EXECUTION =====
function performSearch() {
  const query = document.getElementById("searchInput")?.value.trim() || ""
  const branchFilter = document.getElementById("branchFilter")?.value || ""
  const professionFilter = document.getElementById("professionFilter")?.value || ""
  const generationFilter = document.getElementById("generationFilter")?.value || ""

  const filters = {
    branch: branchFilter,
    profession: professionFilter,
    generation: generationFilter,
  }

  // Perform search
  const results = searchMembers(query, filters)
  currentResults = results

  // Display results
  displayResults(results, query || branchFilter || professionFilter || generationFilter)

  // Update URL
  updateURL({
    q: query || null,
    branch: branchFilter || null,
    profession: professionFilter || null,
    generation: generationFilter || null,
  })
}

function displayResults(results, hasQuery) {
  const resultsHeader = document.getElementById("resultsHeader")
  const resultsGrid = document.getElementById("resultsGrid")
  const noResults = document.getElementById("noResults")
  const searchSuggestions = document.getElementById("searchSuggestions")
  const resultsCount = document.getElementById("resultsCount")
  const filteredResults = document.getElementById("filteredResults")

  // Update counts
  if (resultsCount) resultsCount.textContent = results.length
  if (filteredResults) filteredResults.textContent = results.length

  if (hasQuery) {
    // Show results section
    if (searchSuggestions) searchSuggestions.style.display = "none"
    if (resultsHeader) resultsHeader.style.display = "block"

    if (results.length === 0) {
      // Show no results
      if (noResults) noResults.style.display = "block"
      if (resultsGrid) resultsGrid.innerHTML = ""
    } else {
      // Show results
      if (noResults) noResults.style.display = "none"
      renderResults(results)
    }
  } else {
    // Show suggestions
    if (searchSuggestions) searchSuggestions.style.display = "block"
    if (resultsHeader) resultsHeader.style.display = "none"
    if (noResults) noResults.style.display = "none"
    if (resultsGrid) resultsGrid.innerHTML = ""
  }
}

function renderResults(results) {
  const resultsGrid = document.getElementById("resultsGrid")
  if (!resultsGrid) return

  // Clear previous results
  resultsGrid.innerHTML = ""

  // Create result cards
  results.forEach((member, index) => {
    const resultCard = createResultCard(member)
    resultCard.style.opacity = "0"
    resultCard.style.transform = "translateY(20px)"
    resultsGrid.appendChild(resultCard)

    // Animate card appearance
    setTimeout(() => {
      resultCard.style.opacity = "1"
      resultCard.style.transform = "translateY(0)"
    }, index * 50)
  })
}

function createResultCard(member) {
  const card = document.createElement("div")
  card.className = "result-card"
  card.style.transition = "all 0.6s ease"
  card.dataset.memberId = member.id

  const icon = getProfessionIcon(member.profession)
  const formattedContact = formatPhoneNumber(member.contact)
  const branchName = getBranchShortName(member.branch)
  const location = getLocationFromContact(member.contact)

  card.innerHTML = `
        <div class="result-header">
            <div class="result-avatar">
                <i class="${icon}"></i>
            </div>
            <div class="result-info">
                <h3>${highlightSearchTerm(member.name)}</h3>
                <div class="result-profession">${highlightSearchTerm(member.profession)}</div>
            </div>
        </div>
        <div class="result-details">
            <div class="result-detail">
                <i class="fas fa-graduation-cap"></i>
                <span class="result-qualification">${highlightSearchTerm(member.qualification)}</span>
            </div>
            <div class="result-detail">
                <i class="fas fa-phone"></i>
                <span class="result-contact">${formattedContact}</span>
            </div>
            <div class="result-detail">
                <i class="fas fa-map-marker-alt"></i>
                <span class="result-location">${location}</span>
            </div>
            <div class="result-detail">
                <i class="fas fa-sitemap"></i>
                <span class="result-branch">${branchName}</span>
            </div>
            <div class="result-detail">
                <i class="fas fa-layer-group"></i>
                <span class="result-generation">Generation ${member.generation}</span>
            </div>
        </div>
    `

  // Add click handler
  card.addEventListener("click", () => {
    showMemberDetails(member.id)
  })

  return card
}

function highlightSearchTerm(text) {
  const query = document.getElementById("searchInput")?.value.trim()
  if (!query || !text) return text

  const regex = new RegExp(`(${escapeRegExp(query)})`, "gi")
  return text.replace(regex, '<span class="search-highlight">$1</span>')
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
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

// ===== SUGGESTIONS =====
function initializeSuggestions() {
  const suggestionsGrid = document.getElementById("suggestionsGrid")
  if (!suggestionsGrid) return

  const suggestions = getSearchSuggestions()

  const suggestionsHTML = suggestions
    .map(
      (suggestion) => `
        <button class="suggestion-btn" onclick="searchFor('${suggestion.term}')">
            <i class="${suggestion.icon}"></i>
            <span>${suggestion.term}</span>
        </button>
    `,
    )
    .join("")

  suggestionsGrid.innerHTML = suggestionsHTML
}

function searchFor(term) {
  const searchInput = document.getElementById("searchInput")
  const professionFilter = document.getElementById("professionFilter")

  // Check if it's a profession category
  if (Object.keys(PROFESSION_CATEGORIES).includes(term)) {
    if (professionFilter) {
      professionFilter.value = term
      searchInput.value = ""
    }
  } else {
    // It's a search term
    if (searchInput) {
      searchInput.value = term
      if (professionFilter) professionFilter.value = ""
    }
  }

  // Trigger search
  performSearch()

  // Scroll to results
  const resultsSection = document.querySelector(".results-section")
  if (resultsSection) {
    resultsSection.scrollIntoView({
      behavior: "smooth",
    })
  }
}

// ===== MEMBER DETAILS MODAL =====
function showMemberDetails(memberId) {
  const member = FAMILY_DATABASE.find((m) => m.id === memberId)
  if (!member) return

  const modalHTML = `
        <div class="member-details-modal">
            <div class="modal-header">
                <div class="member-avatar-large">
                    <i class="${getProfessionIcon(member.profession)}"></i>
                </div>
                <div class="member-info-large">
                    <h2>${member.name}</h2>
                    <div class="member-profession-large">${member.profession}</div>
                </div>
                <button class="modal-close" onclick="closeMemberDetailsModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="member-details-grid">
                    <div class="detail-section">
                        <h4><i class="fas fa-user"></i> Personal Information</h4>
                        <div class="detail-items">
                            <div class="detail-item">
                                <span class="detail-label">Full Name:</span>
                                <span class="detail-value">${member.name}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Profession:</span>
                                <span class="detail-value">${member.profession}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Qualification:</span>
                                <span class="detail-value">${member.qualification}</span>
                            </div>
                            ${
                              member.gender
                                ? `
                                <div class="detail-item">
                                    <span class="detail-label">Gender:</span>
                                    <span class="detail-value">${capitalizeWords(member.gender)}</span>
                                </div>
                            `
                                : ""
                            }
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h4><i class="fas fa-phone"></i> Contact Information</h4>
                        <div class="detail-items">
                            <div class="detail-item">
                                <span class="detail-label">Phone:</span>
                                <span class="detail-value">${formatPhoneNumber(member.contact)}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Location:</span>
                                <span class="detail-value">${getLocationFromContact(member.contact)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h4><i class="fas fa-sitemap"></i> Family Information</h4>
                        <div class="detail-items">
                            <div class="detail-item">
                                <span class="detail-label">Branch:</span>
                                <span class="detail-value">${getBranchShortName(member.branch)}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Generation:</span>
                                <span class="detail-value">Generation ${member.generation}</span>
                            </div>
                            ${
                              member.isFounder
                                ? `
                                <div class="detail-item">
                                    <span class="detail-label">Status:</span>
                                    <span class="detail-value founder-badge">
                                        <i class="fas fa-crown"></i>
                                        Founder
                                    </span>
                                </div>
                            `
                                : ""
                            }
                        </div>
                    </div>
                </div>
                
                <div class="member-actions">
                    <button class="action-btn" onclick="viewBranchMembers(${member.branchId})">
                        <i class="fas fa-users"></i>
                        View Branch Members
                    </button>
                    <button class="action-btn" onclick="viewGenerationMembers(${member.generation})">
                        <i class="fas fa-layer-group"></i>
                        View Generation Members
                    </button>
                </div>
            </div>
        </div>
    `

  showModal(modalHTML)
}

function viewBranchMembers(branchId) {
  closeMemberDetailsModal()
  window.location.href = `branches.html?branch=${branchId}`
}

function viewGenerationMembers(generation) {
  closeMemberDetailsModal()
  window.location.href = `generations.html?generation=${generation}`
}

function showModal(content) {
  const modal = document.createElement("div")
  modal.className = "modal show"
  modal.id = "memberDetailsModal"
  modal.innerHTML = `<div class="modal-content">${content}</div>`

  document.body.appendChild(modal)
  document.body.style.overflow = "hidden"

  // Close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeMemberDetailsModal()
    }
  })
}

function closeMemberDetailsModal() {
  const modal = document.getElementById("memberDetailsModal")
  if (modal) {
    modal.remove()
    document.body.style.overflow = "auto"
  }
}

// ===== SEARCH STATISTICS =====
function updateSearchStats() {
  const totalResults = document.getElementById("totalResults")
  if (totalResults) {
    totalResults.textContent = FAMILY_DATABASE.length
  }
}

// ===== KEYBOARD SHORTCUTS =====
function initializeKeyboardShortcuts() {
  document.addEventListener("keydown", (event) => {
    // Focus search input with Ctrl+F or Cmd+F
    if ((event.ctrlKey || event.metaKey) && event.key === "f") {
      event.preventDefault()
      const searchInput = document.getElementById("searchInput")
      if (searchInput) {
        searchInput.focus()
        searchInput.select()
      }
    }

    // Clear search with Escape
    if (event.key === "Escape") {
      const searchInput = document.getElementById("searchInput")
      if (searchInput && searchInput.value) {
        searchInput.value = ""
        const clearBtn = document.getElementById("clearBtn")
        if (clearBtn) clearBtn.click()
      }
    }

    // Navigate results with arrow keys
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      navigateResults(event.key === "ArrowDown" ? 1 : -1)
      event.preventDefault()
    }

    // Enter to select highlighted result
    if (event.key === "Enter") {
      const highlighted = document.querySelector(".result-card.highlighted")
      if (highlighted) {
        highlighted.click()
      }
    }
  })
}

let highlightedIndex = -1

function navigateResults(direction) {
  const results = document.querySelectorAll(".result-card")
  if (results.length === 0) return

  // Remove previous highlight
  results.forEach((card) => card.classList.remove("highlighted"))

  // Update index
  highlightedIndex += direction
  if (highlightedIndex < 0) highlightedIndex = results.length - 1
  if (highlightedIndex >= results.length) highlightedIndex = 0

  // Highlight new result
  const highlighted = results[highlightedIndex]
  highlighted.classList.add("highlighted")
  highlighted.scrollIntoView({ behavior: "smooth", block: "nearest" })
}

// ===== URL HANDLING =====
function handleURLParams() {
  const params = getURLParams()

  if (params.q) {
    const searchInput = document.getElementById("searchInput")
    if (searchInput) {
      searchInput.value = params.q
    }
  }

  if (params.branch) {
    const branchFilter = document.getElementById("branchFilter")
    if (branchFilter) {
      branchFilter.value = params.branch
    }
  }

  if (params.profession) {
    const professionFilter = document.getElementById("professionFilter")
    if (professionFilter) {
      professionFilter.value = params.profession
    }
  }

  if (params.generation) {
    const generationFilter = document.getElementById("generationFilter")
    if (generationFilter) {
      generationFilter.value = params.generation
    }
  }

  // Perform search if any parameters exist
  if (params.q || params.branch || params.profession || params.generation) {
    performSearch()
  }
}

// ===== HELPER FUNCTIONS =====

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

function capitalizeWords(str) {
  return str.replace(/\b\w/g, (l) => l.toUpperCase())
}

// ===== SEARCH FUNCTIONS FROM DATA.JS =====

function searchMembers(query, filters = {}) {
  let results = [...FAMILY_DATABASE]

  // Apply text search
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase().trim()
    results = results.filter(
      (member) =>
        member.name.toLowerCase().includes(searchTerm) ||
        member.profession.toLowerCase().includes(searchTerm) ||
        member.qualification.toLowerCase().includes(searchTerm) ||
        member.branch.toLowerCase().includes(searchTerm) ||
        member.contact.toLowerCase().includes(searchTerm) ||
        (member.location && member.location.toLowerCase().includes(searchTerm)),
    )
  }

  // Apply branch filter
  if (filters.branch) {
    results = results.filter((member) => member.branch === filters.branch)
  }

  // Apply profession filter
  if (filters.profession) {
    results = results.filter((member) => {
      const category = getProfessionCategory(member.profession)
      return category === filters.profession
    })
  }

  // Apply generation filter
  if (filters.generation) {
    results = results.filter((member) => member.generation === Number.parseInt(filters.generation))
  }

  return results
}

function getSearchSuggestions() {
  return [
    { term: "Doctor", icon: "fas fa-user-md", type: "profession" },
    { term: "Engineer", icon: "fas fa-cogs", type: "profession" },
    { term: "Business", icon: "fas fa-briefcase", type: "profession" },
    { term: "Education", icon: "fas fa-chalkboard-teacher", type: "profession" },
    { term: "Legal", icon: "fas fa-balance-scale", type: "profession" },
    { term: "UAE", icon: "fas fa-map-marker-alt", type: "location" },
    { term: "Qatar", icon: "fas fa-globe", type: "location" },
    { term: "India", icon: "fas fa-map-marker-alt", type: "location" },
  ]
}

function getProfessionCategory(profession) {
  const categories = {
    Medical: ["Doctor", "Dentist", "Surgeon", "Physician", "Medical", "Healthcare"],
    Engineering: ["Engineer", "Engineering", "Technical", "Technology", "IT"],
    Education: ["Teacher", "Professor", "Principal", "Head Master", "Education", "Academic"],
    Legal: ["Lawyer", "Advocate", "Legal", "Attorney"],
    Business: ["Business", "Manager", "Executive", "Entrepreneur", "Sales", "Marketing"],
    Government: ["Officer", "Administrator", "Civil Service", "Armed Force"],
    Creative: ["Designer", "Artist", "Media", "Creative", "Architect"],
    Student: ["Student", "Learner"],
    Homemaker: ["Homemaker", "Housewife"],
    Other: ["Retired", "NA", "Patriarch", "Matriarch"],
  }

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some((keyword) => profession.toLowerCase().includes(keyword.toLowerCase()))) {
      return category
    }
  }
  return "Other"
}

function getProfessionIcon(profession) {
  const professionLower = profession.toLowerCase()

  if (professionLower.includes("doctor") || professionLower.includes("medical")) {
    return "fas fa-user-md"
  } else if (professionLower.includes("dentist")) {
    return "fas fa-tooth"
  } else if (professionLower.includes("engineer")) {
    return "fas fa-cogs"
  } else if (professionLower.includes("business") || professionLower.includes("manager")) {
    return "fas fa-briefcase"
  } else if (professionLower.includes("teacher") || professionLower.includes("professor")) {
    return "fas fa-chalkboard-teacher"
  } else if (professionLower.includes("lawyer") || professionLower.includes("advocate")) {
    return "fas fa-balance-scale"
  } else if (professionLower.includes("student")) {
    return "fas fa-graduation-cap"
  } else if (professionLower.includes("designer")) {
    return "fas fa-palette"
  } else if (professionLower.includes("homemaker")) {
    return "fas fa-home"
  } else if (professionLower.includes("patriarch") || professionLower.includes("matriarch")) {
    return "fas fa-crown"
  }

  return "fas fa-user"
}

function formatPhoneNumber(contact) {
  if (!contact || contact === "NA") return "Not available"

  // Format international numbers
  if (contact.startsWith("00")) {
    const cleaned = contact.replace(/^00/, "+")
    return cleaned.replace(/(\+\d{2,3})(\d{2})(\d{7,8})/, "$1 $2 $3")
  }

  return contact
}

function getLocationFromContact(contact) {
  if (!contact || contact === "NA") return "Unknown"

  const locationMapping = {
    India: ["0091", "91"],
    UAE: ["00971", "971"],
    Qatar: ["00974", "974"],
    Oman: ["00968", "968"],
    UK: ["0044", "44"],
    Germany: ["0049", "49"],
    "New Zealand": ["0064", "64"],
    Bhutan: ["00975", "975"],
  }

  for (const [location, codes] of Object.entries(locationMapping)) {
    if (codes.some((code) => contact.startsWith(code))) {
      return location
    }
  }
  return "Unknown"
}

// Sample family database for search functionality
const FAMILY_DATABASE = [
  {
    id: 1,
    name: "A T Mohamed unny (Late)",
    profession: "Patriarch",
    qualification: "NA",
    contact: "NA",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 1,
    isFounder: true,
    gender: "male",
    status: "deceased",
  },
  {
    id: 2,
    name: "P.M Kochu Rabiya",
    profession: "Matriarch",
    qualification: "NA",
    contact: "NA",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 1,
    isFounder: true,
    gender: "female",
    status: "alive",
  },
  {
    id: 3,
    name: "Najuma PM",
    profession: "Retired Head Mistress",
    qualification: "BSc, B.Ed",
    contact: "0091 9497824025",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 2,
    gender: "female",
    status: "alive",
    location: "India",
  },
  {
    id: 4,
    name: "Dr CV Abdulla Kutty",
    profession: "Retired Principal",
    qualification: "MA, PhD",
    contact: "0091 9447944198",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 2,
    gender: "male",
    status: "alive",
    location: "India",
  },
  {
    id: 5,
    name: "Afdal Abdulla",
    profession: "Information Security Officer",
    qualification: "BE",
    contact: "00974 70002766",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 3,
    gender: "male",
    status: "alive",
    location: "Qatar",
  },
  // Add more members as needed
]

const PROFESSION_CATEGORIES = {
  Medical: ["Doctor", "Dentist", "Surgeon", "Physician", "Medical", "Healthcare"],
  Engineering: ["Engineer", "Engineering", "Technical", "Technology", "IT"],
  Education: ["Teacher", "Professor", "Principal", "Head Master", "Education", "Academic"],
  Legal: ["Lawyer", "Advocate", "Legal", "Attorney"],
  Business: ["Business", "Manager", "Executive", "Entrepreneur", "Sales", "Marketing"],
  Government: ["Officer", "Administrator", "Civil Service", "Armed Force"],
  Creative: ["Designer", "Artist", "Media", "Creative", "Architect"],
  Student: ["Student", "Learner"],
  Homemaker: ["Homemaker", "Housewife"],
  Other: ["Retired", "NA", "Patriarch", "Matriarch"],
}
