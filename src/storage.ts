import { Student, Company, PlacementDrive, Application, PlacementResult, DashboardStats } from './types';
import { initialStudents, initialCompanies, initialDrives, initialApplications, initialResults } from './mockData';

const STORAGE_KEYS = {
  STUDENTS: 'pms_students',
  COMPANIES: 'pms_companies',
  DRIVES: 'pms_drives',
  APPLICATIONS: 'pms_applications',
  RESULTS: 'pms_results',
  ACTIVE_ROLE: 'pms_active_role',
  ACTIVE_STUDENT_ID: 'pms_active_student_id'
};

export const getStoredStudents = (): Student[] => {
  const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(initialStudents));
    return initialStudents;
  }
  return JSON.parse(data);
};

export const saveStudents = (students: Student[]) => {
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
};

export const getStoredCompanies = (): Company[] => {
  const data = localStorage.getItem(STORAGE_KEYS.COMPANIES);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(initialCompanies));
    return initialCompanies;
  }
  return JSON.parse(data);
};

export const saveCompanies = (companies: Company[]) => {
  localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(companies));
};

export const getStoredDrives = (): PlacementDrive[] => {
  const data = localStorage.getItem(STORAGE_KEYS.DRIVES);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.DRIVES, JSON.stringify(initialDrives));
    return initialDrives;
  }
  return JSON.parse(data);
};

export const saveDrives = (drives: PlacementDrive[]) => {
  localStorage.setItem(STORAGE_KEYS.DRIVES, JSON.stringify(drives));
};

export const getStoredApplications = (): Application[] => {
  const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(initialApplications));
    return initialApplications;
  }
  return JSON.parse(data);
};

export const saveApplications = (apps: Application[]) => {
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
};

export const getStoredResults = (): PlacementResult[] => {
  const data = localStorage.getItem(STORAGE_KEYS.RESULTS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(initialResults));
    return initialResults;
  }
  return JSON.parse(data);
};

export const saveResults = (results: PlacementResult[]) => {
  localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
};

export const resetToSampleData = () => {
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(initialStudents));
  localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(initialCompanies));
  localStorage.setItem(STORAGE_KEYS.DRIVES, JSON.stringify(initialDrives));
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(initialApplications));
  localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(initialResults));
};

export const computeDashboardStats = (
  students: Student[],
  companies: Company[],
  drives: PlacementDrive[],
  applications: Application[],
  results: PlacementResult[]
): DashboardStats => {
  const totalStudents = students.length;
  const totalCompanies = companies.length;
  const activeDrives = drives.filter(d => d.status === 'OPEN').length;
  const placedSet = new Set<number>();
  
  results.filter(r => r.resultStatus === 'SELECTED').forEach(r => placedSet.add(r.studentId));
  students.filter(s => s.placementStatus === 'PLACED').forEach(s => placedSet.add(s.id));

  const studentsPlaced = placedSet.size;
  const studentsNotPlaced = Math.max(0, totalStudents - studentsPlaced);
  const totalApplications = applications.length;
  const placementPercentage = totalStudents > 0 ? Math.round((studentsPlaced / totalStudents) * 100) : 0;

  const selectedResults = results.filter(r => r.resultStatus === 'SELECTED');
  const packages = selectedResults.map(r => r.salaryPackage);
  const highestPackage = packages.length > 0 ? Math.max(...packages) : 0;
  const averagePackage = packages.length > 0 ? Number((packages.reduce((a, b) => a + b, 0) / packages.length).toFixed(2)) : 0;

  return {
    totalStudents,
    totalCompanies,
    activeDrives,
    studentsPlaced,
    studentsNotPlaced,
    totalApplications,
    placementPercentage,
    averagePackage,
    highestPackage
  };
};
