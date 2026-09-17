import { Student, Company, PlacementDrive, Application, PlacementResult } from './types';

export const initialStudents: Student[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    registerNumber: "RA2111003010001",
    email: "aarav.sharma@college.edu",
    phone: "+91 98765 43210",
    department: "Computer Science",
    year: 4,
    cgpa: 8.92,
    backlogs: 0,
    graduationYear: 2025,
    placementStatus: "PLACED"
  },
  {
    id: 2,
    name: "Sneha Patel",
    registerNumber: "RA2111003010002",
    email: "sneha.patel@college.edu",
    phone: "+91 98765 43211",
    department: "Information Technology",
    year: 4,
    cgpa: 9.15,
    backlogs: 0,
    graduationYear: 2025,
    placementStatus: "PLACED"
  },
  {
    id: 3,
    name: "Rohan Verma",
    registerNumber: "RA2111003010003",
    email: "rohan.verma@college.edu",
    phone: "+91 98765 43212",
    department: "Electronics & Communication",
    year: 4,
    cgpa: 7.84,
    backlogs: 0,
    graduationYear: 2025,
    placementStatus: "UNPLACED"
  },
  {
    id: 4,
    name: "Priya Nair",
    registerNumber: "RA2111003010004",
    email: "priya.nair@college.edu",
    phone: "+91 98765 43213",
    department: "Computer Science",
    year: 4,
    cgpa: 8.65,
    backlogs: 0,
    graduationYear: 2025,
    placementStatus: "PLACED"
  },
  {
    id: 5,
    name: "Vikram Reddy",
    registerNumber: "RA2111003010005",
    email: "vikram.reddy@college.edu",
    phone: "+91 98765 43214",
    department: "Mechanical Engineering",
    year: 4,
    cgpa: 7.20,
    backlogs: 1,
    graduationYear: 2025,
    placementStatus: "UNPLACED"
  },
  {
    id: 6,
    name: "Ananya Iyer",
    registerNumber: "RA2111003010006",
    email: "ananya.iyer@college.edu",
    phone: "+91 98765 43215",
    department: "Computer Science",
    year: 4,
    cgpa: 9.40,
    backlogs: 0,
    graduationYear: 2025,
    placementStatus: "PLACED"
  },
  {
    id: 7,
    name: "Karthik Sundaram",
    registerNumber: "RA2111003010007",
    email: "karthik.sundaram@college.edu",
    phone: "+91 98765 43216",
    department: "Electrical & Electronics",
    year: 4,
    cgpa: 6.95,
    backlogs: 0,
    graduationYear: 2025,
    placementStatus: "UNPLACED"
  },
  {
    id: 8,
    name: "Diya Chatterjee",
    registerNumber: "RA2111003010008",
    email: "diya.chatterjee@college.edu",
    phone: "+91 98765 43217",
    department: "Information Technology",
    year: 4,
    cgpa: 8.45,
    backlogs: 0,
    graduationYear: 2025,
    placementStatus: "PLACED"
  },
  {
    id: 9,
    name: "Aditya Kulkarni",
    registerNumber: "RA2111003010009",
    email: "aditya.kulkarni@college.edu",
    phone: "+91 98765 43218",
    department: "Civil Engineering",
    year: 4,
    cgpa: 7.10,
    backlogs: 0,
    graduationYear: 2025,
    placementStatus: "UNPLACED"
  },
  {
    id: 10,
    name: "Meera Menon",
    registerNumber: "RA2111003010010",
    email: "meera.menon@college.edu",
    phone: "+91 98765 43219",
    department: "Computer Science",
    year: 4,
    cgpa: 8.80,
    backlogs: 0,
    graduationYear: 2025,
    placementStatus: "PLACED"
  },
  {
    id: 11,
    name: "Tanmay Deshmukh",
    registerNumber: "RA2111003010011",
    email: "tanmay.d@college.edu",
    phone: "+91 98765 43220",
    department: "Electronics & Communication",
    year: 3,
    cgpa: 7.60,
    backlogs: 0,
    graduationYear: 2026,
    placementStatus: "UNPLACED"
  },
  {
    id: 12,
    name: "Ishita Sen",
    registerNumber: "RA2111003010012",
    email: "ishita.sen@college.edu",
    phone: "+91 98765 43221",
    department: "Information Technology",
    year: 4,
    cgpa: 8.10,
    backlogs: 0,
    graduationYear: 2025,
    placementStatus: "UNPLACED"
  }
];

export const initialCompanies: Company[] = [
  {
    id: 1,
    companyName: "Google Cloud Labs",
    industry: "Information Technology & Cloud",
    location: "Bengaluru, Karnataka",
    website: "https://cloud.google.com",
    hrName: "Siddharth Malhotra",
    hrEmail: "campus-recruitment@google.com",
    hrPhone: "+91 80 6789 1234",
    description: "Global cloud computing, data analytics, and enterprise systems engineering leader."
  },
  {
    id: 2,
    companyName: "Microsoft India R&D",
    industry: "Software & Services",
    location: "Hyderabad, Telangana",
    website: "https://careers.microsoft.com",
    hrName: "Ritu Singhania",
    hrEmail: "university-hires@microsoft.com",
    hrPhone: "+91 40 6655 4433",
    description: "Developing world-class developer platforms, Windows OS core, and AI services."
  },
  {
    id: 3,
    companyName: "Amazon Web Services",
    industry: "E-Commerce & Cloud",
    location: "Chennai, Tamil Nadu",
    website: "https://amazon.jobs",
    hrName: "Deepak Chawla",
    hrEmail: "aws-campus-india@amazon.com",
    hrPhone: "+91 44 4900 1122",
    description: "Leading e-commerce, cloud infrastructure, fulfillment, and distributed tech systems."
  },
  {
    id: 4,
    companyName: "Infosys Ltd",
    industry: "IT Consulting & Services",
    location: "Pune, Maharashtra",
    website: "https://infosys.com",
    hrName: "Nandini Rao",
    hrEmail: "talent.acquisition@infosys.com",
    hrPhone: "+91 20 2293 2800",
    description: "Global multinational consulting and next-generation digital services."
  },
  {
    id: 5,
    companyName: "Tata Consultancy Services",
    industry: "Information Technology",
    location: "Mumbai, Maharashtra",
    website: "https://tcs.com",
    hrName: "Arvind Joshi",
    hrEmail: "campus.connect@tcs.com",
    hrPhone: "+91 22 6778 9999",
    description: "Premier global IT services, consulting, and business solutions organization."
  },
  {
    id: 6,
    companyName: "Qualcomm India",
    industry: "Semiconductors & Wireless",
    location: "Bengaluru, Karnataka",
    website: "https://qualcomm.com",
    hrName: "Elena George",
    hrEmail: "india_university@qualcomm.com",
    hrPhone: "+91 80 4000 8888",
    description: "World leader in next-gen wireless technologies, 5G chipsets, and IoT processors."
  }
];

export const initialDrives: PlacementDrive[] = [
  {
    id: 1,
    companyId: 1,
    jobRole: "Associate Cloud Engineer",
    jobDescription: "Design, deploy, and monitor scalable cloud infrastructure and Kubernetes microservices.",
    eligibilityCgpa: 8.0,
    maximumBacklogs: 0,
    eligibleDepartments: ["Computer Science", "Information Technology"],
    salaryPackage: 18.5,
    location: "Bengaluru",
    driveDate: "2025-10-15",
    applicationDeadline: "2025-10-05",
    numberOfOpenings: 12,
    status: "COMPLETED"
  },
  {
    id: 2,
    companyId: 2,
    jobRole: "Software Engineer - Core",
    jobDescription: "Build high-performance algorithms, microservice APIs, and modern web application frontends.",
    eligibilityCgpa: 8.5,
    maximumBacklogs: 0,
    eligibleDepartments: ["Computer Science", "Information Technology", "Electronics & Communication"],
    salaryPackage: 24.0,
    location: "Hyderabad",
    driveDate: "2025-11-02",
    applicationDeadline: "2025-10-25",
    numberOfOpenings: 8,
    status: "COMPLETED"
  },
  {
    id: 3,
    companyId: 3,
    jobRole: "Systems Development Engineer",
    jobDescription: "Develop distributed backend storage architectures and automation pipelines.",
    eligibilityCgpa: 7.5,
    maximumBacklogs: 0,
    eligibleDepartments: ["Computer Science", "Information Technology", "Electronics & Communication", "Electrical & Electronics"],
    salaryPackage: 16.0,
    location: "Chennai",
    driveDate: "2025-11-20",
    applicationDeadline: "2025-11-10",
    numberOfOpenings: 15,
    status: "OPEN"
  },
  {
    id: 4,
    companyId: 4,
    jobRole: "Specialist Programmer",
    jobDescription: "Full stack Java/Spring Boot development, microservices, and AI-assisted cloud tools.",
    eligibilityCgpa: 7.0,
    maximumBacklogs: 1,
    eligibleDepartments: ["Computer Science", "Information Technology", "Electronics & Communication", "Mechanical Engineering", "Civil Engineering"],
    salaryPackage: 9.5,
    location: "Pune",
    driveDate: "2025-12-05",
    applicationDeadline: "2025-11-28",
    numberOfOpenings: 40,
    status: "OPEN"
  },
  {
    id: 5,
    companyId: 5,
    jobRole: "Digital Technology Innovator",
    jobDescription: "Data analytics, REST backend engineering, and digital transformation architectures.",
    eligibilityCgpa: 6.5,
    maximumBacklogs: 1,
    eligibleDepartments: ["Computer Science", "Information Technology", "Electronics & Communication", "Electrical & Electronics", "Mechanical Engineering", "Civil Engineering"],
    salaryPackage: 7.5,
    location: "Mumbai",
    driveDate: "2025-12-18",
    applicationDeadline: "2025-12-10",
    numberOfOpenings: 50,
    status: "UPCOMING"
  },
  {
    id: 6,
    companyId: 6,
    jobRole: "Embedded Software Engineer",
    jobDescription: "Low level C/C++ firmware and wireless hardware interfacing for 5G modem platforms.",
    eligibilityCgpa: 7.5,
    maximumBacklogs: 0,
    eligibleDepartments: ["Electronics & Communication", "Electrical & Electronics", "Computer Science"],
    salaryPackage: 15.0,
    location: "Bengaluru",
    driveDate: "2025-12-28",
    applicationDeadline: "2025-12-20",
    numberOfOpenings: 10,
    status: "UPCOMING"
  }
];

export const initialApplications: Application[] = [
  {
    id: 1,
    studentId: 1,
    placementDriveId: 1,
    applicationDate: "2025-10-01",
    status: "SELECTED",
    remarks: "Cleared technical rounds 1 & 2 with exceptional DSA marks."
  },
  {
    id: 2,
    studentId: 2,
    placementDriveId: 2,
    applicationDate: "2025-10-20",
    status: "SELECTED",
    remarks: "Top performer in coding test and system design interview."
  },
  {
    id: 3,
    studentId: 4,
    placementDriveId: 1,
    applicationDate: "2025-10-02",
    status: "SELECTED",
    remarks: "Excellent grasp of distributed systems and Kubernetes."
  },
  {
    id: 4,
    studentId: 6,
    placementDriveId: 2,
    applicationDate: "2025-10-21",
    status: "SELECTED",
    remarks: "Offered highest package candidate with clean code test."
  },
  {
    id: 5,
    studentId: 8,
    placementDriveId: 1,
    applicationDate: "2025-10-03",
    status: "SELECTED",
    remarks: "Strong algorithmic problem-solving and cloud fundamentals."
  },
  {
    id: 6,
    studentId: 10,
    placementDriveId: 2,
    applicationDate: "2025-10-22",
    status: "SELECTED",
    remarks: "Excellent behavioral and tech round ratings."
  },
  {
    id: 7,
    studentId: 3,
    placementDriveId: 3,
    applicationDate: "2025-11-05",
    status: "SHORTLISTED",
    remarks: "Scheduled for technical interview round on 20th Nov."
  },
  {
    id: 8,
    studentId: 5,
    placementDriveId: 4,
    applicationDate: "2025-11-12",
    status: "APPLIED",
    remarks: "Eligibility confirmed. Online assessment invite sent."
  },
  {
    id: 9,
    studentId: 7,
    placementDriveId: 4,
    applicationDate: "2025-11-14",
    status: "APPLIED",
    remarks: "Pending review of academic transcripts."
  },
  {
    id: 10,
    studentId: 9,
    placementDriveId: 4,
    applicationDate: "2025-11-15",
    status: "APPLIED",
    remarks: "Eligible for general aptitude assessment."
  },
  {
    id: 11,
    studentId: 11,
    placementDriveId: 3,
    applicationDate: "2025-11-06",
    status: "WAITLISTED",
    remarks: "On waiting list pending round 1 slot availability."
  },
  {
    id: 12,
    studentId: 12,
    placementDriveId: 3,
    applicationDate: "2025-11-07",
    status: "REJECTED",
    remarks: "Did not meet required cut-off in coding assessment."
  }
];

export const initialResults: PlacementResult[] = [
  {
    id: 1,
    studentId: 1,
    companyId: 1,
    placementDriveId: 1,
    jobRole: "Associate Cloud Engineer",
    salaryPackage: 18.5,
    placementDate: "2025-10-18",
    resultStatus: "SELECTED"
  },
  {
    id: 2,
    studentId: 2,
    companyId: 2,
    placementDriveId: 2,
    jobRole: "Software Engineer - Core",
    salaryPackage: 24.0,
    placementDate: "2025-11-05",
    resultStatus: "SELECTED"
  },
  {
    id: 3,
    studentId: 4,
    companyId: 1,
    placementDriveId: 1,
    jobRole: "Associate Cloud Engineer",
    salaryPackage: 18.5,
    placementDate: "2025-10-18",
    resultStatus: "SELECTED"
  },
  {
    id: 4,
    studentId: 6,
    companyId: 2,
    placementDriveId: 2,
    jobRole: "Software Engineer - Core",
    salaryPackage: 24.0,
    placementDate: "2025-11-05",
    resultStatus: "SELECTED"
  },
  {
    id: 5,
    studentId: 8,
    companyId: 1,
    placementDriveId: 1,
    jobRole: "Associate Cloud Engineer",
    salaryPackage: 18.5,
    placementDate: "2025-10-18",
    resultStatus: "SELECTED"
  },
  {
    id: 6,
    studentId: 10,
    companyId: 2,
    placementDriveId: 2,
    jobRole: "Software Engineer - Core",
    salaryPackage: 24.0,
    placementDate: "2025-11-05",
    resultStatus: "SELECTED"
  }
];
