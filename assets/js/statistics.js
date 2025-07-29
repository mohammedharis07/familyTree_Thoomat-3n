import { Chart } from "@/components/ui/chart"
// ===== STATISTICS PAGE LOGIC =====

let chartsInitialized = false
let observer // Declare the observer variable

document.addEventListener("DOMContentLoaded", () => {
  initializeStatisticsPage()
})

function initializeStatisticsPage() {
  renderStatisticsOverview()
  initializeCharts()
  initializeAnimations()
}

// ===== STATISTICS OVERVIEW =====
function renderStatisticsOverview() {
  const statsGrid = document.getElementById("statsGrid")
  if (!statsGrid) return

  const stats = getFamilyStatistics()

  const statsHTML = `
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-users"></i>
            </div>
            <h3>Total Members</h3>
            <div class="stat-value" data-count="${stats.totalMembers}">0</div>
            <div class="stat-description">Across all generations and branches</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-code-branch"></i>
            </div>
            <h3>Family Branches</h3>
            <div class="stat-value" data-count="${stats.totalBranches}">0</div>
            <div class="stat-description">Distinct family lineages</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-layer-group"></i>
            </div>
            <h3>Generations</h3>
            <div class="stat-value" data-count="${stats.totalGenerations}">0</div>
            <div class="stat-description">From founders to present</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-globe"></i>
            </div>
            <h3>Countries</h3>
            <div class="stat-value" data-count="${stats.totalCountries}">0</div>
            <div class="stat-description">Global family presence</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-user-md"></i>
            </div>
            <h3>Medical Professionals</h3>
            <div class="stat-value" data-count="${stats.professionDistribution.Medical || 0}">0</div>
            <div class="stat-description">Doctors, dentists, and healthcare workers</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-cogs"></i>
            </div>
            <h3>Engineers</h3>
            <div class="stat-value" data-count="${stats.professionDistribution.Engineering || 0}">0</div>
            <div class="stat-description">Technical and engineering professionals</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-briefcase"></i>
            </div>
            <h3>Business Professionals</h3>
            <div class="stat-value" data-count="${stats.professionDistribution.Business || 0}">0</div>
            <div class="stat-description">Entrepreneurs and business leaders</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-graduation-cap"></i>
            </div>
            <h3>Educators</h3>
            <div class="stat-value" data-count="${stats.professionDistribution.Education || 0}">0</div>
            <div class="stat-description">Teachers, professors, and academics</div>
        </div>
    `

  statsGrid.innerHTML = statsHTML
}

// ===== CHARTS INITIALIZATION =====
function initializeCharts() {
  // Wait for Chart.js to load
  if (typeof Chart === "undefined") {
    setTimeout(initializeCharts, 100)
    return
  }

  if (chartsInitialized) return
  chartsInitialized = true

  const stats = getFamilyStatistics()

  createBranchChart(stats.branchDistribution)
  createProfessionChart(stats.professionDistribution)
  createLocationChart(stats.locationDistribution)
  createGenerationChart(stats.generationDistribution)
}

function createBranchChart(branchData) {
  const ctx = document.getElementById("branchChart")
  if (!ctx) return

  const labels = Object.keys(branchData).map((branch) => getBranchShortName(branch))
  const data = Object.values(branchData)
  const colors = generateColors(labels.length)

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: colors,
          borderColor: colors.map((color) => color.replace("0.8", "1")),
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#ffffff",
            padding: 20,
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#00f5ff",
          bodyColor: "#ffffff",
          borderColor: "#00f5ff",
          borderWidth: 1,
        },
      },
    },
  })
}

function createProfessionChart(professionData) {
  const ctx = document.getElementById("professionChart")
  if (!ctx) return

  const labels = Object.keys(professionData)
  const data = Object.values(professionData)
  const colors = generateColors(labels.length)

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Number of Members",
          data: data,
          backgroundColor: colors,
          borderColor: colors.map((color) => color.replace("0.8", "1")),
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#00f5ff",
          bodyColor: "#ffffff",
          borderColor: "#00f5ff",
          borderWidth: 1,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#ffffff",
            stepSize: 1,
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
        x: {
          ticks: {
            color: "#ffffff",
            maxRotation: 45,
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
    },
  })
}

function createLocationChart(locationData) {
  const ctx = document.getElementById("locationChart")
  if (!ctx) return

  const labels = Object.keys(locationData)
  const data = Object.values(locationData)
  const colors = generateColors(labels.length)

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: colors,
          borderColor: colors.map((color) => color.replace("0.8", "1")),
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#ffffff",
            padding: 20,
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#00f5ff",
          bodyColor: "#ffffff",
          borderColor: "#00f5ff",
          borderWidth: 1,
        },
      },
    },
  })
}

function createGenerationChart(generationData) {
  const ctx = document.getElementById("generationChart")
  if (!ctx) return

  const labels = Object.keys(generationData).map((gen) => `Generation ${gen}`)
  const data = Object.values(generationData)

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Number of Members",
          data: data,
          borderColor: "#00f5ff",
          backgroundColor: "rgba(0, 245, 255, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#00f5ff",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#00f5ff",
          bodyColor: "#ffffff",
          borderColor: "#00f5ff",
          borderWidth: 1,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#ffffff",
            stepSize: 1,
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
        x: {
          ticks: {
            color: "#ffffff",
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
    },
  })
}

// ===== ANIMATIONS =====
function initializeAnimations() {
  // Animate stat cards
  const statCards = document.querySelectorAll(".stat-card")

  if (statCards.length > 0) {
    observer = createIntersectionObserver((entries) => {
      // Assign observer here
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Animate card appearance
          setTimeout(() => {
            entry.target.classList.add("fade-in")
          }, index * 100)

          // Animate counter
          const statValue = entry.target.querySelector(".stat-value")
          if (statValue) {
            const targetCount = Number.parseInt(statValue.dataset.count)
            if (targetCount) {
              setTimeout(
                () => {
                  animateCounter(statValue, targetCount, 2000)
                },
                index * 100 + 300,
              )
            }
          }

          observer.unobserve(entry.target)
        }
      })
    })

    statCards.forEach((card) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(30px)"
      card.style.transition = "all 0.6s ease"
      observer.observe(card)
    })
  }

  // Animate charts when they come into view
  const chartCards = document.querySelectorAll(".chart-card")

  if (chartCards.length > 0) {
    const chartObserver = createIntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("loaded")
          chartObserver.unobserve(entry.target)
        }
      })
    })

    chartCards.forEach((card) => chartObserver.observe(card)) // Use chartObserver here
  }
}

// ===== HELPER FUNCTIONS =====

function getFamilyStatistics() {
  const stats = {
    totalMembers: FAMILY_DATABASE.length,
    totalBranches: new Set(FAMILY_DATABASE.map((m) => m.branch)).size,
    totalGenerations: Math.max(...FAMILY_DATABASE.map((m) => m.generation)),
    totalCountries: new Set(
      FAMILY_DATABASE.map((m) => getLocationFromContact(m.contact)).filter((l) => l !== "Unknown"),
    ).size,

    branchDistribution: {},
    generationDistribution: {},
    professionDistribution: {},
    locationDistribution: {},
    genderDistribution: { male: 0, female: 0 },
  }

  // Calculate distributions
  FAMILY_DATABASE.forEach((member) => {
    // Branch distribution
    stats.branchDistribution[member.branch] = (stats.branchDistribution[member.branch] || 0) + 1

    // Generation distribution
    stats.generationDistribution[member.generation] = (stats.generationDistribution[member.generation] || 0) + 1

    // Profession distribution
    const professionCategory = getProfessionCategory(member.profession)
    stats.professionDistribution[professionCategory] = (stats.professionDistribution[professionCategory] || 0) + 1

    // Location distribution
    const location = getLocationFromContact(member.contact)
    if (location !== "Unknown") {
      stats.locationDistribution[location] = (stats.locationDistribution[location] || 0) + 1
    }

    // Gender distribution
    if (member.gender) {
      stats.genderDistribution[member.gender]++
    }
  })

  return stats
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

function generateColors(count) {
  const baseColors = [
    "rgba(0, 245, 255, 0.8)", // Cyan
    "rgba(255, 0, 110, 0.8)", // Pink
    "rgba(131, 56, 236, 0.8)", // Purple
    "rgba(0, 255, 136, 0.8)", // Green
    "rgba(255, 170, 0, 0.8)", // Orange
    "rgba(255, 51, 102, 0.8)", // Red
    "rgba(0, 204, 255, 0.8)", // Light Blue
    "rgba(204, 0, 255, 0.8)", // Magenta
    "rgba(255, 102, 0, 0.8)", // Dark Orange
    "rgba(102, 255, 0, 0.8)", // Lime
  ]

  const colors = []
  for (let i = 0; i < count; i++) {
    colors.push(baseColors[i % baseColors.length])
  }

  return colors
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

// Sample family database for statistics
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
  // Add more sample data as needed for demonstration
]
