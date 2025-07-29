// ===== MAIN APPLICATION LOGIC =====

document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Initialize loading screen
  initializeLoadingScreen()

  // Initialize navigation
  initializeNavigation()

  // Initialize hero section
  initializeHeroSection()

  // Initialize animations
  initializeAnimations()

  // Initialize family overview
  initializeFamilyOverview()

  // Initialize scroll effects
  initializeScrollEffects()

  // Initialize responsive handlers
  initializeResponsiveHandlers()
}

// ===== LOADING SCREEN =====
function initializeLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen")

  if (loadingScreen) {
    // Simulate loading time
    setTimeout(() => {
      loadingScreen.classList.add("hidden")

      // Remove from DOM after animation
      setTimeout(() => {
        loadingScreen.remove()
      }, 500)
    }, 1500)
  }
}

// ===== NAVIGATION =====
function initializeNavigation() {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.querySelector(".nav-menu")
  const navbar = document.getElementById("navbar")

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      }
    })
  }

  // Navbar scroll effect
  if (navbar) {
    window.addEventListener(
      "scroll",
      throttle(() => {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled")
        } else {
          navbar.classList.remove("scrolled")
        }
      }, 100),
    )
  }
}

// ===== HERO SECTION =====
function initializeHeroSection() {
  // Animate statistics counters
  const statItems = document.querySelectorAll(".stat-item")

  if (statItems.length > 0) {
    const observer = createIntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumber = entry.target.querySelector(".stat-number")
          const targetCount = Number.parseInt(entry.target.dataset.count)

          if (statNumber && targetCount) {
            animateCounter(statNumber, targetCount, 2000)
          }

          observer.unobserve(entry.target)
        }
      })
    })

    statItems.forEach((item) => observer.observe(item))
  }

  // Initialize tree visualization
  initializeTreeVisualization()
}

// ===== TREE VISUALIZATION =====
function initializeTreeVisualization() {
  const treeContainer = document.getElementById("treeVisualization")

  if (treeContainer) {
    createInteractiveTree(treeContainer)
  }
}

function createInteractiveTree(container) {
  // Create a simple animated tree structure
  const treeHTML = `
        <div class="tree-root">
            <div class="tree-node root-node" data-tooltip="Family Root">
                <i class="fas fa-users"></i>
            </div>
            <div class="tree-branches">
                ${Array.from(
                  { length: 10 },
                  (_, i) => `
                    <div class="tree-branch branch-${i + 1}">
                        <div class="branch-line"></div>
                        <div class="tree-node branch-node" data-tooltip="Branch ${i + 1}" data-branch="${i + 1}">
                            <i class="${getBranchIcon(i + 1)}"></i>
                        </div>
                    </div>
                `,
                ).join("")}
            </div>
        </div>
    `

  container.innerHTML = treeHTML

  // Add interactivity
  const nodes = container.querySelectorAll(".tree-node")
  nodes.forEach((node) => {
    node.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.2)"
      this.style.boxShadow = "0 0 30px rgba(0, 245, 255, 0.6)"
    })

    node.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
      this.style.boxShadow = "0 0 20px rgba(0, 245, 255, 0.3)"
    })

    node.addEventListener("click", function () {
      const branchId = this.dataset.branch
      if (branchId) {
        window.location.href = `branches.html?branch=${branchId}`
      }
    })
  })

  // Animate tree on load
  setTimeout(() => {
    container.classList.add("animated")
  }, 500)
}

function getBranchIcon(branchId) {
  const icons = [
    "fas fa-crown",
    "fas fa-tree",
    "fas fa-users",
    "fas fa-mosque",
    "fas fa-handshake",
    "fas fa-graduation-cap",
    "fas fa-lightbulb",
    "fas fa-microscope",
    "fas fa-chart-line",
    "fas fa-globe",
  ]
  return icons[branchId - 1] || "fas fa-users"
}

// ===== ANIMATIONS =====
function initializeAnimations() {
  // Fade in animation for cards
  const cards = document.querySelectorAll(".feature-card, .update-card, .stat-item")

  if (cards.length > 0) {
    const observer = createIntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("fade-in")
          }, index * 100)

          observer.unobserve(entry.target)
        }
      })
    })

    cards.forEach((card) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(30px)"
      card.style.transition = "all 0.6s ease"
      observer.observe(card)
    })
  }

  // Parallax effect for hero section
  const heroVisual = document.querySelector(".hero-visual")
  if (heroVisual) {
    window.addEventListener(
      "scroll",
      throttle(() => {
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.5
        heroVisual.style.transform = `translateY(${rate}px)`
      }, 16),
    )
  }
}

// ===== FAMILY OVERVIEW =====
function initializeFamilyOverview() {
  const branchesPreview = document.getElementById("branchesPreview")

  if (branchesPreview) {
    renderBranchesPreview(branchesPreview)
  }
}

function renderBranchesPreview(container) {
  // Get top 5 branches by member count
  const topBranches = Object.entries(BRANCH_INFO)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 5)

  const maxCount = Math.max(...topBranches.map(([, branch]) => branch.count))

  const branchesHTML = topBranches
    .map(([id, branch]) => {
      const percentage = (branch.count / maxCount) * 100

      return `
            <div class="branch-preview-item" data-branch="${id}">
                <div class="branch-preview-header">
                    <div class="branch-preview-icon">
                        <i class="${branch.icon}"></i>
                    </div>
                    <div class="branch-preview-info">
                        <h3>${branch.name}</h3>
                        <span class="member-count">${branch.count} members</span>
                    </div>
                </div>
                <div class="branch-preview-bar">
                    <div class="branch-preview-fill" style="width: 0%" data-width="${percentage}%"></div>
                </div>
                <div class="branch-preview-highlights">
                    ${branch.highlights.map((highlight) => `<span class="highlight">${highlight}</span>`).join("")}
                </div>
            </div>
        `
    })
    .join("")

  container.innerHTML = branchesHTML

  // Animate progress bars
  const observer = createIntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressFill = entry.target.querySelector(".branch-preview-fill")
        if (progressFill) {
          const targetWidth = progressFill.dataset.width
          setTimeout(() => {
            progressFill.style.width = targetWidth
          }, 200)
        }
        observer.unobserve(entry.target)
      }
    })
  })

  container.querySelectorAll(".branch-preview-item").forEach((item) => {
    observer.observe(item)

    // Add click handler
    item.addEventListener("click", function () {
      const branchId = this.dataset.branch
      window.location.href = `branches.html?branch=${branchId}`
    })
  })
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add scroll-to-top button
  createScrollToTopButton()
}

function createScrollToTopButton() {
  const scrollButton = createElement("button", "scroll-to-top", '<i class="fas fa-arrow-up"></i>')
  document.body.appendChild(scrollButton)

  // Show/hide button based on scroll position
  window.addEventListener(
    "scroll",
    throttle(() => {
      if (window.pageYOffset > 300) {
        scrollButton.classList.add("visible")
      } else {
        scrollButton.classList.remove("visible")
      }
    }, 100),
  )

  // Scroll to top on click
  scrollButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// ===== RESPONSIVE HANDLERS =====
function initializeResponsiveHandlers() {
  // Handle window resize
  window.addEventListener(
    "resize",
    throttle(() => {
      handleResponsiveChanges()
    }, 250),
  )

  // Initial responsive setup
  handleResponsiveChanges()
}

function handleResponsiveChanges() {
  const isMobileView = isMobile()
  const isTabletView = isTablet()

  // Adjust hero stats layout
  const heroStats = document.querySelector(".hero-stats")
  if (heroStats) {
    if (isMobileView) {
      heroStats.style.gridTemplateColumns = "1fr"
    } else if (isTabletView) {
      heroStats.style.gridTemplateColumns = "repeat(2, 1fr)"
    } else {
      heroStats.style.gridTemplateColumns = "repeat(4, 1fr)"
    }
  }

  // Adjust tree visualization for mobile
  const treeContainer = document.getElementById("treeVisualization")
  if (treeContainer && isMobileView) {
    treeContainer.classList.add("mobile-view")
  } else if (treeContainer) {
    treeContainer.classList.remove("mobile-view")
  }
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener("keydown", (event) => {
  // Alt + H: Go to home
  if (event.altKey && event.key === "h") {
    event.preventDefault()
    window.location.href = "index.html"
  }

  // Alt + G: Go to generations
  if (event.altKey && event.key === "g") {
    event.preventDefault()
    window.location.href = "generations.html"
  }

  // Alt + B: Go to branches
  if (event.altKey && event.key === "b") {
    event.preventDefault()
    window.location.href = "branches.html"
  }

  // Alt + S: Go to search
  if (event.altKey && event.key === "s") {
    event.preventDefault()
    window.location.href = "search.html"
  }
})

// ===== HELPER FUNCTIONS =====

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

function createIntersectionObserver(callback) {
  return new IntersectionObserver(callback, {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  })
}

function animateCounter(element, targetCount, duration) {
  let startCount = 0
  const increment = targetCount / (duration / 100)
  const timer = setInterval(() => {
    startCount += increment
    element.textContent = Math.floor(startCount)
    if (startCount >= targetCount) {
      clearInterval(timer)
      element.textContent = targetCount
    }
  }, 100)
}

function createElement(tag, className, innerHTML) {
  const element = document.createElement(tag)
  element.className = className
  element.innerHTML = innerHTML
  return element
}

function isMobile() {
  return window.innerWidth <= 768
}

function isTablet() {
  return window.innerWidth > 768 && window.innerWidth <= 1024
}

// Branch information - this should be available globally
const BRANCH_INFO = {
  1: {
    name: "A T Mohamed unny & P.M Kochu Rabiya",
    count: 23,
    icon: "fas fa-crown",
    highlights: ["Educators", "Professionals", "International"],
  },
  2: {
    name: "A T kunjupathumma & P.K Athakutty",
    count: 147,
    icon: "fas fa-tree",
    highlights: ["Doctors", "Engineers", "Business"],
  },
  3: {
    name: "A T Pathavu & Veetiparambil Avvutty",
    count: 50,
    icon: "fas fa-users",
    highlights: ["UAE Based", "Business", "Technology"],
  },
  4: {
    name: "A T Nafeesakutty & M.A Bappu Moulavi",
    count: 39,
    icon: "fas fa-mosque",
    highlights: ["Education", "Engineering", "Healthcare"],
  },
  5: {
    name: "A.T AliKunji & P.K Kunhipathunni",
    count: 22,
    icon: "fas fa-handshake",
    highlights: ["Business", "Management", "Qatar"],
  },
  6: {
    name: "A.T Kunjaisu & R.V Mohammed Haji",
    count: 52,
    icon: "fas fa-graduation-cap",
    highlights: ["Medicine", "Engineering", "Education"],
  },
  7: {
    name: "A.T Aminakutty & A.M Bavu",
    count: 29,
    icon: "fas fa-lightbulb",
    highlights: ["Media", "Architecture", "Innovation"],
  },
  8: {
    name: "A T Aboobakker & Rasiya .P.N",
    count: 18,
    icon: "fas fa-microscope",
    highlights: ["Research", "Academia", "Science"],
  },
  9: {
    name: "A.T Zainba & Abdul Kadar",
    count: 25,
    icon: "fas fa-chart-line",
    highlights: ["Business", "Entrepreneurship", "Industry"],
  },
  10: {
    name: "A T Ibrahim Kutty & Zohra Ibrahim",
    count: 16,
    icon: "fas fa-globe",
    highlights: ["Law", "Medicine", "International"],
  },
}
