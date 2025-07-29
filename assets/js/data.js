// ===== COMPLETE FAMILY DATABASE =====
let FAMILY_DATABASE = []

// Combine all branch data
const ALL_BRANCHES = [
  // Branch 1: A T Mohamed unny (Late) & P.M Kochu Rabiya
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
  {
    id: 6,
    name: "Thameema Sharaf",
    profession: "Textile Designer",
    qualification: "BDes",
    contact: "00974 50750432",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 3,
    gender: "female",
    status: "alive",
    location: "Qatar",
  },
  {
    id: 7,
    name: "Zayan Afdal",
    profession: "Student",
    qualification: "Young Learner",
    contact: "NA",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 4,
    gender: "male",
    status: "alive",
    location: "Qatar",
  },
  {
    id: 8,
    name: "Razan Afdal",
    profession: "Student",
    qualification: "Young Learner",
    contact: "NA",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 4,
    gender: "female",
    status: "alive",
    location: "Qatar",
  },
  {
    id: 9,
    name: "Adv. Aysha Nasrene",
    profession: "Lawyer (Practising)",
    qualification: "BSc, MA, LLB",
    contact: "0091 9746262558",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 3,
    gender: "female",
    status: "alive",
    location: "India",
  },
  {
    id: 10,
    name: "Aslam Abdullakutty",
    profession: "App Developer",
    qualification: "BA",
    contact: "0091 9995899402",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 3,
    gender: "male",
    status: "alive",
    location: "India",
  },
  {
    id: 11,
    name: "PM Nazir",
    profession: "Business",
    qualification: "B.A",
    contact: "00971 55 9484721",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 2,
    gender: "male",
    status: "alive",
    location: "UAE",
  },
  {
    id: 12,
    name: "Shainas Alamana Mohamed Haneefa",
    profession: "Homemaker",
    qualification: "B.A",
    contact: "00971 54 4890592",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 2,
    gender: "female",
    status: "alive",
    location: "UAE",
  },
  {
    id: 13,
    name: "Mohammed Abbas Nazir",
    profession: "Business",
    qualification: "B.Eng",
    contact: "00971 55 9484716",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 3,
    gender: "male",
    status: "alive",
    location: "UAE",
  },
  {
    id: 14,
    name: "Aysha Nazir",
    profession: "Strategy and Policy Consultant",
    qualification: "BSc Economics & M.S in DEDP",
    contact: "00971 50 9382699",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 3,
    gender: "female",
    status: "alive",
    location: "UAE",
  },
  {
    id: 15,
    name: "Naseema P.M.",
    profession: "Homemaker",
    qualification: "Pre-degree, Diploma in Home Sciences",
    contact: "0091 9746799307",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 2,
    gender: "female",
    status: "alive",
    location: "India",
  },
  {
    id: 16,
    name: "Abdul Majeed N.P",
    profession: "NA",
    qualification: "NA",
    contact: "NA",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 2,
    gender: "male",
    status: "alive",
    location: "India",
  },
  {
    id: 17,
    name: "Adeeb Abdul Majeed",
    profession: "Project Manager",
    qualification: "B.Tech, PMP",
    contact: "00971 56 9064860",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 3,
    gender: "male",
    status: "alive",
    location: "UAE",
  },
  {
    id: 18,
    name: "Dr Farhana Zakir",
    profession: "Student",
    qualification: "B.Tech, M.Tech, PhD",
    contact: "0044 7553795330",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 3,
    gender: "female",
    status: "alive",
    location: "UK",
  },
  {
    id: 19,
    name: "Adv. Adheela Nowrin",
    profession: "Lawyer (Presently Working As Junior Advocate at High Court Of Kerala)",
    qualification: "BA, LL.B & LL.M",
    contact: "0091 7558944646",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 3,
    gender: "female",
    status: "alive",
    location: "India",
  },
  {
    id: 20,
    name: "Najeeba PM",
    profession: "Homemaker",
    qualification: "B.A",
    contact: "0091 9946955299",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 2,
    gender: "female",
    status: "alive",
    location: "India",
  },
  {
    id: 21,
    name: "Mohammed Salim K.H",
    profession: "Retired Head Master",
    qualification: "MSc, B.Ed",
    contact: "0091 9447920072",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 2,
    gender: "male",
    status: "alive",
    location: "India",
  },
  {
    id: 22,
    name: "Salman Salim",
    profession: "Sales Representative",
    qualification: "BCA",
    contact: "00971 8891690013",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 3,
    gender: "male",
    status: "alive",
    location: "UAE",
  },
  {
    id: 23,
    name: "Shehzad Mehar",
    profession: "Student",
    qualification: "MA, BEd",
    contact: "0091 9633131204",
    branch: "A T Mohamed unny (Late) & P.M Kochu Rabiya",
    branchId: 1,
    generation: 3,
    gender: "male",
    status: "alive",
    location: "India",
  },

  // Branch 2: A T kunjupathumma (Late) & P.K Athakutty (Late)
  {
    id: 24,
    name: "A T kunjupathumma (Late)",
    profession: "Patriarch",
    qualification: "NA",
    contact: "NA",
    branch: "A T kunjupathumma (Late) & P.K Athakutty (Late)",
    branchId: 2,
    generation: 1,
    isFounder: true,
    gender: "female",
    status: "deceased",
  },
  {
    id: 25,
    name: "P.K Athakutty (Late)",
    profession: "Matriarch",
    qualification: "NA",
    contact: "NA",
    branch: "A T kunjupathumma (Late) & P.K Athakutty (Late)",
    branchId: 2,
    generation: 1,
    isFounder: true,
    gender: "male",
    status: "deceased",
  },
  {
    id: 26,
    name: "A T Mohammed Ali",
    profession: "Business",
    qualification: "BSc",
    contact: "0091 9847256752",
    branch: "A T kunjupathumma (Late) & P.K Athakutty (Late)",
    branchId: 2,
    generation: 2,
    gender: "male",
    status: "alive",
    location: "India",
  },
  {
    id: 27,
    name: "Valiyapurayil Mahin Ayshabi",
    profession: "Homemaker",
    qualification: "NA",
    contact: "0091 9645892011",
    branch: "A T kunjupathumma (Late) & P.K Athakutty (Late)",
    branchId: 2,
    generation: 2,
    gender: "female",
    status: "alive",
    location: "India",
  },
  {
    id: 28,
    name: "Sangeetha Karayil Mohammed Ali",
    profession: "Homemaker",
    qualification: "Bachelor of Arts",
    contact: "00968 91023993",
    branch: "A T kunjupathumma (Late) & P.K Athakutty (Late)",
    branchId: 2,
    generation: 3,
    gender: "female",
    status: "alive",
    location: "Oman",
  },
  {
    id: 29,
    name: "Fazlin Anam",
    profession: "Lawyer",
    qualification: "Bachelor of Arts, Legum Baccalaureus",
    contact: "00968 91011433",
    branch: "A T kunjupathumma (Late) & P.K Athakutty (Late)",
    branchId: 2,
    generation: 3,
    gender: "female",
    status: "alive",
    location: "Oman",
  },
  {
    id: 30,
    name: "Janainah Fazlin Anam",
    profession: "Sports Editor",
    qualification: "Bachelor of Arts",
    contact: "NA",
    branch: "A T kunjupathumma (Late) & P.K Athakutty (Late)",
    branchId: 2,
    generation: 4,
    gender: "female",
    status: "alive",
    location: "Oman",
  },

  // Branch 3: A T Pathavu (Late) & Veetiparambil Avvutty (Late)
  {
    id: 31,
    name: "A T Pathavu (Late)",
    profession: "Patriarch",
    qualification: "NA",
    contact: "NA",
    branch: "A T Pathavu (Late) & Veetiparambil Avvutty (Late)",
    branchId: 3,
    generation: 1,
    isFounder: true,
    gender: "male",
    status: "deceased",
  },
  {
    id: 32,
    name: "Veetiparambil Avvutty (Late)",
    profession: "Matriarch",
    qualification: "NA",
    contact: "NA",
    branch: "A T Pathavu (Late) & Veetiparambil Avvutty (Late)",
    branchId: 3,
    generation: 1,
    isFounder: true,
    gender: "female",
    status: "deceased",
  },
  {
    id: 33,
    name: "Abdul Rahman AT",
    profession: "Retired UAE Armed Force",
    qualification: "NA",
    contact: "0091 9746295768",
    branch: "A T Pathavu (Late) & Veetiparambil Avvutty (Late)",
    branchId: 3,
    generation: 2,
    gender: "male",
    status: "alive",
    location: "India",
  },
  {
    id: 34,
    name: "Asma Abdul Rahman",
    profession: "Homemaker",
    qualification: "SSLC",
    contact: "0091 9544377883",
    branch: "A T Pathavu (Late) & Veetiparambil Avvutty (Late)",
    branchId: 3,
    generation: 2,
    gender: "female",
    status: "alive",
    location: "India",
  },
  {
    id: 35,
    name: "Sajith AT",
    profession: "Head of Reservation Dept, Greyline",
    qualification: "BBA, IATA, MBA",
    contact: "00968 93000381",
    branch: "A T Pathavu (Late) & Veetiparambil Avvutty (Late)",
    branchId: 3,
    generation: 3,
    gender: "male",
    status: "alive",
    location: "Oman",
  },

  // Branch 4: A T Nafeesakutty & M.A Bappu Moulavi (Late)
  {
    id: 36,
    name: "A T Nafeesakutty",
    profession: "Matriarch",
    qualification: "NA",
    contact: "NA",
    branch: "A T Nafeesakutty & M.A Bappu Moulavi (Late)",
    branchId: 4,
    generation: 1,
    isFounder: true,
    gender: "female",
    status: "alive",
  },
  {
    id: 37,
    name: "M.A Bappu Moulavi (Late)",
    profession: "Patriarch",
    qualification: "NA",
    contact: "NA",
    branch: "A T Nafeesakutty & M.A Bappu Moulavi (Late)",
    branchId: 4,
    generation: 1,
    isFounder: true,
    gender: "male",
    status: "deceased",
  },
  {
    id: 38,
    name: "Abdul Salam",
    profession: "Accountant",
    qualification: "PDC",
    contact: "00974 66989496",
    branch: "A T Nafeesakutty & M.A Bappu Moulavi (Late)",
    branchId: 4,
    generation: 2,
    gender: "male",
    status: "alive",
    location: "Qatar",
  },
  {
    id: 39,
    name: "Sakeena",
    profession: "Homemaker",
    qualification: "School",
    contact: "00974 33660870",
    branch: "A T Nafeesakutty & M.A Bappu Moulavi (Late)",
    branchId: 4,
    generation: 2,
    gender: "female",
    status: "alive",
    location: "Qatar",
  },

  // Branch 5: A.T AliKunji (Late) & P.K Kunhipathunni
  {
    id: 40,
    name: "A.T AliKunji (Late)",
    profession: "Patriarch",
    qualification: "NA",
    contact: "NA",
    branch: "A.T AliKunji (Late) & P.K Kunhipathunni",
    branchId: 5,
    generation: 1,
    isFounder: true,
    gender: "male",
    status: "deceased",
  },
  {
    id: 41,
    name: "P.K Kunhipathunni",
    profession: "Matriarch",
    qualification: "NA",
    contact: "0091 9744380034",
    branch: "A.T AliKunji (Late) & P.K Kunhipathunni",
    branchId: 5,
    generation: 1,
    isFounder: true,
    gender: "female",
    status: "alive",
    location: "India",
  },

  // Branch 6: A.T Kunjaisu (Late) & R.V Mohammed Haji (Late)
  {
    id: 42,
    name: "A.T Kunjaisu (Late)",
    profession: "Patriarch",
    qualification: "NA",
    contact: "NA",
    branch: "A.T Kunjaisu (Late) & R.V Mohammed Haji (Late)",
    branchId: 6,
    generation: 1,
    isFounder: true,
    gender: "male",
    status: "deceased",
  },
  {
    id: 43,
    name: "R.V Mohammed Haji (Late)",
    profession: "Matriarch",
    qualification: "NA",
    contact: "NA",
    branch: "A.T Kunjaisu (Late) & R.V Mohammed Haji (Late)",
    branchId: 6,
    generation: 1,
    isFounder: true,
    gender: "male",
    status: "deceased",
  },

  // Branch 7: A.T Aminakutty (Late) & A.M Bavu (Late)
  {
    id: 44,
    name: "A.T Aminakutty (Late)",
    profession: "Matriarch",
    qualification: "NA",
    contact: "NA",
    branch: "A.T Aminakutty (Late) & A.M Bavu (Late)",
    branchId: 7,
    generation: 1,
    isFounder: true,
    gender: "female",
    status: "deceased",
  },
  {
    id: 45,
    name: "A.M Bavu (Late)",
    profession: "Patriarch",
    qualification: "NA",
    contact: "NA",
    branch: "A.T Aminakutty (Late) & A.M Bavu (Late)",
    branchId: 7,
    generation: 1,
    isFounder: true,
    gender: "male",
    status: "deceased",
  },

  // Branch 8: A T Aboobakker (Late) & Rasiya .P.N
  {
    id: 46,
    name: "A T Aboobakker (Late)",
    profession: "Patriarch",
    qualification: "NA",
    contact: "NA",
    branch: "A T Aboobakker (Late) & Rasiya .P.N",
    branchId: 8,
    generation: 1,
    isFounder: true,
    gender: "male",
    status: "deceased",
  },
  {
    id: 47,
    name: "Rasiya .P.N",
    profession: "Matriarch",
    qualification: "NA",
    contact: "NA",
    branch: "A T Aboobakker (Late) & Rasiya .P.N",
    branchId: 8,
    generation: 1,
    isFounder: true,
    gender: "female",
    status: "alive",
  },

  // Branch 9: A.T Zainba & Abdul Kadar
  {
    id: 48,
    name: "A.T Zainba",
    profession: "Matriarch",
    qualification: "NA",
    contact: "NA",
    branch: "A.T Zainba & Abdul Kadar",
    branchId: 9,
    generation: 1,
    isFounder: true,
    gender: "female",
    status: "alive",
  },
  {
    id: 49,
    name: "Abdul Kadar",
    profession: "Patriarch",
    qualification: "NA",
    contact: "NA",
    branch: "A.T Zainba & Abdul Kadar",
    branchId: 9,
    generation: 1,
    isFounder: true,
    gender: "male",
    status: "alive",
  },

  // Branch 10: A T Ibrahim Kutty & Zohra Ibrahim
  {
    id: 50,
    name: "A T Ibrahim Kutty",
    profession: "Farmer (Gulf Retired)",
    qualification: "SSLC",
    contact: "0091 9449671155",
    branch: "A T Ibrahim Kutty & Zohra Ibrahim",
    branchId: 10,
    generation: 1,
    isFounder: true,
    gender: "male",
    status: "alive",
    location: "India",
  },

  // Additional sample data for demonstration
  {
    id: 51,
    name: "Dr. Sanoj Mohammad Ali",
    profession: "Doctor",
    qualification: "MBBS, MD",
    contact: "00974 3308396",
    branch: "A T kunjupathumma (Late) & P.K Athakutty (Late)",
    branchId: 2,
    generation: 3,
    gender: "male",
    status: "alive",
    location: "Qatar",
  },
  {
    id: 52,
    name: "Engineer Rahman",
    profession: "Software Engineer",
    qualification: "B.Tech Computer Science",
    contact: "00971 50 1234567",
    branch: "A T Pathavu (Late) & Veetiparambil Avvutty (Late)",
    branchId: 3,
    generation: 3,
    gender: "male",
    status: "alive",
    location: "UAE",
  },
]

FAMILY_DATABASE = ALL_BRANCHES

// ===== BRANCH INFORMATION =====
const BRANCH_INFO = {
  1: {
    name: "A T Mohamed unny & P.M Kochu Rabiya",
    count: 23,
    description:
      "The founding branch of our family tree, established by the patriarch A T Mohamed unny and matriarch P.M Kochu Rabiya. This branch has produced notable educators and professionals.",
    highlights: ["Educators", "Professionals", "International"],
    icon: "fas fa-crown",
    color: "#00f5ff",
  },
  2: {
    name: "A T kunjupathumma & P.K Athakutty",
    count: 147,
    description:
      "The largest branch with diverse professionals including doctors, engineers, and business leaders across multiple countries.",
    highlights: ["Doctors", "Engineers", "Business"],
    icon: "fas fa-tree",
    color: "#ff006e",
  },
  3: {
    name: "A T Pathavu & Veetiparambil Avvutty",
    count: 50,
    description:
      "Distinguished branch with strong presence in UAE and Gulf countries, known for business acumen and technology.",
    highlights: ["UAE Based", "Business", "Technology"],
    icon: "fas fa-users",
    color: "#8338ec",
  },
  4: {
    name: "A T Nafeesakutty & M.A Bappu Moulavi",
    count: 39,
    description: "Branch with strong religious and educational foundations, contributing to community development.",
    highlights: ["Education", "Engineering", "Healthcare"],
    icon: "fas fa-mosque",
    color: "#00ff88",
  },
  5: {
    name: "A.T AliKunji & P.K Kunhipathunni",
    count: 22,
    description: "Close-knit branch with successful business ventures, particularly strong in Qatar.",
    highlights: ["Business", "Management", "Qatar"],
    icon: "fas fa-handshake",
    color: "#ffaa00",
  },
  6: {
    name: "A.T Kunjaisu & R.V Mohammed Haji",
    count: 52,
    description: "Academically oriented branch with professionals in medicine, engineering, and education.",
    highlights: ["Medicine", "Engineering", "Education"],
    icon: "fas fa-graduation-cap",
    color: "#ff3366",
  },
  7: {
    name: "A.T Aminakutty & A.M Bavu",
    count: 29,
    description: "Creative and innovative branch with members in media, architecture, and technology.",
    highlights: ["Media", "Architecture", "Innovation"],
    icon: "fas fa-lightbulb",
    color: "#00ccff",
  },
  8: {
    name: "A T Aboobakker & Rasiya .P.N",
    count: 18,
    description: "Research-oriented branch with contributions to science and technology.",
    highlights: ["Research", "Academia", "Science"],
    icon: "fas fa-microscope",
    color: "#cc00ff",
  },
  9: {
    name: "A.T Zainba & Abdul Kadar",
    count: 25,
    description: "Business-focused branch with successful entrepreneurs in various industries.",
    highlights: ["Business", "Entrepreneurship", "Industry"],
    icon: "fas fa-chart-line",
    color: "#ff6600",
  },
  10: {
    name: "A T Ibrahim Kutty & Zohra Ibrahim",
    count: 16,
    description: "Professional branch with members in law, medicine, and international business.",
    highlights: ["Law", "Medicine", "International"],
    icon: "fas fa-globe",
    color: "#66ff00",
  },
}

// ===== GENERATION INFORMATION =====
const GENERATION_INFO = {
  1: {
    title: "Generation 1 - The Founders",
    description: "The patriarchs and matriarchs who established our family legacy",
    icon: "fas fa-crown",
    color: "#ff006e",
  },
  2: {
    title: "Generation 2 - The Builders",
    description: "The first generation who expanded and built the family foundation",
    icon: "fas fa-users",
    color: "#00f5ff",
  },
  3: {
    title: "Generation 3 - The Achievers",
    description: "The expanding generation with diverse professions and achievements",
    icon: "fas fa-user-friends",
    color: "#8338ec",
  },
  4: {
    title: "Generation 4 - The Innovators",
    description: "The new generation carrying forward the family legacy",
    icon: "fas fa-baby",
    color: "#00ff88",
  },
  5: {
    title: "Generation 5 - The Future",
    description: "The youngest members representing the future",
    icon: "fas fa-child",
    color: "#ffaa00",
  },
}

// ===== PROFESSION CATEGORIES =====
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

// ===== LOCATION MAPPING =====
const LOCATION_MAPPING = {
  India: ["0091", "91"],
  UAE: ["00971", "971"],
  Qatar: ["00974", "974"],
  Oman: ["00968", "968"],
  UK: ["0044", "44"],
  Germany: ["0049", "49"],
  "New Zealand": ["0064", "64"],
  Bhutan: ["00975", "975"],
}

// ===== UTILITY FUNCTIONS =====
function getBranchById(branchId) {
  return BRANCH_INFO[branchId] || null
}

function getMembersByBranch(branchId) {
  return FAMILY_DATABASE.filter((member) => member.branchId === branchId)
}

function getMembersByGeneration(generation) {
  return FAMILY_DATABASE.filter((member) => member.generation === generation)
}

function getLocationFromContact(contact) {
  if (!contact || contact === "NA") return "Unknown"

  for (const [location, codes] of Object.entries(LOCATION_MAPPING)) {
    if (codes.some((code) => contact.startsWith(code))) {
      return location
    }
  }
  return "Unknown"
}

function getProfessionCategory(profession) {
  for (const [category, keywords] of Object.entries(PROFESSION_CATEGORIES)) {
    if (keywords.some((keyword) => profession.toLowerCase().includes(keyword.toLowerCase()))) {
      return category
    }
  }
  return "Other"
}

function formatPhoneNumber(contact) {
  if (!contact || contact === "NA") return "Not available"

  if (contact.startsWith("00")) {
    const cleaned = contact.replace(/^00/, "+")
    return cleaned.replace(/(\+\d{2,3})(\d{2})(\d{7,8})/, "$1 $2 $3")
  }

  return contact
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

function searchMembers(query, filters = {}) {
  let results = [...FAMILY_DATABASE]

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

  if (filters.branch) {
    results = results.filter((member) => member.branch === filters.branch)
  }

  if (filters.profession) {
    results = results.filter((member) => member.profession.toLowerCase().includes(filters.profession.toLowerCase()))
  }

  if (filters.generation) {
    results = results.filter((member) => member.generation === Number.parseInt(filters.generation))
  }

  return results
}

function getFamilyStatistics() {
  const stats = {
    totalMembers: FAMILY_DATABASE.length,
    totalBranches: Object.keys(BRANCH_INFO).length,
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

  FAMILY_DATABASE.forEach((member) => {
    const branchName = getBranchById(member.branchId)?.name || member.branch
    stats.branchDistribution[branchName] = (stats.branchDistribution[branchName] || 0) + 1

    stats.generationDistribution[member.generation] = (stats.generationDistribution[member.generation] || 0) + 1

    const professionCategory = getProfessionCategory(member.profession)
    stats.professionDistribution[professionCategory] = (stats.professionDistribution[professionCategory] || 0) + 1

    const location = getLocationFromContact(member.contact)
    if (location !== "Unknown") {
      stats.locationDistribution[location] = (stats.locationDistribution[location] || 0) + 1
    }

    if (member.gender) {
      stats.genderDistribution[member.gender]++
    }
  })

  return stats
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    FAMILY_DATABASE,
    BRANCH_INFO,
    GENERATION_INFO,
    PROFESSION_CATEGORIES,
    LOCATION_MAPPING,
    getBranchById,
    getMembersByBranch,
    getMembersByGeneration,
    getLocationFromContact,
    getProfessionCategory,
    formatPhoneNumber,
    getProfessionIcon,
    searchMembers,
    getFamilyStatistics,
  }
}
