// ===== UTILITY FUNCTIONS =====

// Animation utilities
function animateCounter(element, target, duration = 2000) {
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

// Intersection Observer for animations
function createIntersectionObserver(callback, options = {}) {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observerOptions = { ...defaultOptions, ...options }

  return new IntersectionObserver(callback, observerOptions)
}

// Debounce function for search
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

// Throttle function for scroll events
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

// Local storage utilities
const storage = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.warn("Failed to save to localStorage:", e)
    }
  },

  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (e) {
      console.warn("Failed to read from localStorage:", e)
      return defaultValue
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.warn("Failed to remove from localStorage:", e)
    }
  },
}

// URL utilities
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

// DOM utilities
function createElement(tag, className = "", content = "") {
  const element = document.createElement(tag)
  if (className) element.className = className
  if (content) element.innerHTML = content
  return element
}

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

// String utilities
function highlightText(text, query) {
  if (!query) return text
  const regex = new RegExp(`(${query})`, "gi")
  return text.replace(regex, '<span class="search-highlight">$1</span>')
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, (l) => l.toUpperCase())
}

// Array utilities
function groupBy(array, key) {
  return array.reduce((groups, item) => {
    const group = item[key]
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {})
}

function sortBy(array, key, direction = "asc") {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]

    if (direction === "asc") {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })
}

// Date utilities
function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

// Loading utilities
function showLoading(container) {
  container.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
        </div>
    `
}

function hideLoading(container) {
  const loading = container.querySelector(".loading")
  if (loading) {
    loading.remove()
  }
}

// Error handling utilities
function showError(container, message) {
  container.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
        </div>
    `
}

// Modal utilities
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("show")
    document.body.style.overflow = "hidden"
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove("show")
    document.body.style.overflow = "auto"
  }
}

// Responsive utilities
function isMobile() {
  return window.innerWidth <= 768
}

function isTablet() {
  return window.innerWidth > 768 && window.innerWidth <= 1024
}

function isDesktop() {
  return window.innerWidth > 1024
}

// Performance utilities
function requestIdleCallback(callback) {
  if (window.requestIdleCallback) {
    return window.requestIdleCallback(callback)
  } else {
    return setTimeout(callback, 1)
  }
}

// Export utilities
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    animateCounter,
    createIntersectionObserver,
    debounce,
    throttle,
    storage,
    updateURL,
    getURLParams,
    createElement,
    removeAllChildren,
    highlightText,
    truncateText,
    capitalizeWords,
    groupBy,
    sortBy,
    formatDate,
    showLoading,
    hideLoading,
    showError,
    openModal,
    closeModal,
    isMobile,
    isTablet,
    isDesktop,
    requestIdleCallback,
  }
}
