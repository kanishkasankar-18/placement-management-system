export type UserRole = 'ADMIN' | 'STUDENT';

export interface Student {
  id: number;
  name: string;
  registerNumber: string;
  email: string;
  phone: string;
  department: string;
  year: number;
  cgpa: number;
  backlogs: number;
  graduationYear: number;
  placementStatus: 'PLACED' | 'UNPLACED';
}

export interface Company {
  id: number;
  companyName: string;
  industry: string;
  location: string;
  website: string;
  hrName: string;
  hrEmail: string;
  hrPhone: string;
  description: string;
}

export type DriveStatus = 'UPCOMING' | 'OPEN' | 'CLOSED' | 'COMPLETED';

export interface PlacementDrive {
  id: number;
  companyId: number;
  jobRole: string;
  jobDescription: string;
  eligibilityCgpa: number;
  maximumBacklogs: number;
  eligibleDepartments: string[]; // e.g. ["CSE", "IT", "ECE"]
  salaryPackage: number; // in LPA
  location: string;
  driveDate: string;
  applicationDeadline: string;
  numberOfOpenings: number;
  status: DriveStatus;
}

export type ApplicationStatus = 'APPLIED' | 'SHORTLISTED' | 'REJECTED' | 'SELECTED' | 'WAITLISTED';

export interface Application {
  id: number;
  studentId: number;
  placementDriveId: number;
  applicationDate: string;
  status: ApplicationStatus;
  remarks: string;
}

export type ResultStatus = 'SELECTED' | 'NOT_SELECTED';

export interface PlacementResult {
  id: number;
  studentId: number;
  companyId: number;
  placementDriveId: number;
  jobRole: string;
  salaryPackage: number;
  placementDate: string;
  resultStatus: ResultStatus;
}

export interface DashboardStats {
  totalStudents: number;
  totalCompanies: number;
  activeDrives: number;
  studentsPlaced: number;
  studentsNotPlaced: number;
  totalApplications: number;
  placementPercentage: number;
  averagePackage: number;
  highestPackage: number;
}
