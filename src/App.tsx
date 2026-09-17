import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { StudentsView } from './components/StudentsView';
import { CompaniesView } from './components/CompaniesView';
import { DrivesView } from './components/DrivesView';
import { ApplicationsView } from './components/ApplicationsView';
import { ResultsView } from './components/ResultsView';
import { ReportsView } from './components/ReportsView';
import { StudentPortalView } from './components/StudentPortalView';
import { ArchitectureViewer } from './components/ArchitectureViewer';
import {
  Student,
  Company,
  PlacementDrive,
  Application,
  PlacementResult,
  UserRole,
  ApplicationStatus
} from './types';
import {
  getStoredStudents,
  saveStudents,
  getStoredCompanies,
  saveCompanies,
  getStoredDrives,
  saveDrives,
  getStoredApplications,
  saveApplications,
  getStoredResults,
  saveResults,
  resetToSampleData,
  computeDashboardStats
} from './storage';
import { CheckCircle2, AlertCircle, Bell, Search, ShieldCheck, UserCheck } from 'lucide-react';

export default function App() {
  const [role, setRole] = useState<UserRole>('ADMIN');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  // Datasets
  const [students, setStudents] = useState<Student[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [drives, setDrives] = useState<PlacementDrive[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [results, setResults] = useState<PlacementResult[]>([]);

  // Toast feedback
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Initial load
  useEffect(() => {
    setStudents(getStoredStudents());
    setCompanies(getStoredCompanies());
    setDrives(getStoredDrives());
    setApplications(getStoredApplications());
    setResults(getStoredResults());
  }, []);

  const handleResetData = () => {
    if (window.confirm('Reset all databases to sample records? (10+ students, 6 companies, 6 drives, 12 applications, 6 results)')) {
      resetToSampleData();
      setStudents(getStoredStudents());
      setCompanies(getStoredCompanies());
      setDrives(getStoredDrives());
      setApplications(getStoredApplications());
      setResults(getStoredResults());
      showToast('Database reset to fresh sample college records.');
    }
  };

  // ==================== Student CRUD ====================
  const handleAddStudent = (studentData: Omit<Student, 'id'>) => {
    // Check unique register number
    if (students.some((s) => s.registerNumber.toLowerCase() === studentData.registerNumber.toLowerCase())) {
      return { success: false, message: `Register number ${studentData.registerNumber} already exists.` };
    }
    // Check unique email
    if (students.some((s) => s.email.toLowerCase() === studentData.email.toLowerCase())) {
      return { success: false, message: `Email ${studentData.email} is already registered.` };
    }

    const nextId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
    const newStudent: Student = { ...studentData, id: nextId };
    const updated = [newStudent, ...students];
    setStudents(updated);
    saveStudents(updated);
    showToast(`Student ${newStudent.name} registered successfully.`);
    return { success: true };
  };

  const handleUpdateStudent = (id: number, studentData: Omit<Student, 'id'>) => {
    // Check unique reg number (excluding self)
    if (
      students.some(
        (s) => s.id !== id && s.registerNumber.toLowerCase() === studentData.registerNumber.toLowerCase()
      )
    ) {
      return { success: false, message: `Register number ${studentData.registerNumber} already exists.` };
    }
    // Check unique email (excluding self)
    if (
      students.some((s) => s.id !== id && s.email.toLowerCase() === studentData.email.toLowerCase())
    ) {
      return { success: false, message: `Email ${studentData.email} is already registered.` };
    }

    const updated = students.map((s) => (s.id === id ? { ...studentData, id } : s));
    setStudents(updated);
    saveStudents(updated);
    showToast(`Updated profile for ${studentData.name}.`);
    return { success: true };
  };

  const handleDeleteStudent = (id: number) => {
    const studentToDelete = students.find((s) => s.id === id);
    const updatedStudents = students.filter((s) => s.id !== id);
    setStudents(updatedStudents);
    saveStudents(updatedStudents);

    // Also remove applications & results for this student
    const updatedApps = applications.filter((a) => a.studentId !== id);
    setApplications(updatedApps);
    saveApplications(updatedApps);

    const updatedResults = results.filter((r) => r.studentId !== id);
    setResults(updatedResults);
    saveResults(updatedResults);

    showToast(`Deleted student ${studentToDelete?.name || ''} and associated records.`);
  };

  // ==================== Company CRUD ====================
  const handleAddCompany = (companyData: Omit<Company, 'id'>) => {
    if (companies.some((c) => c.companyName.toLowerCase() === companyData.companyName.toLowerCase())) {
      return { success: false, message: `Company "${companyData.companyName}" is already registered.` };
    }
    const nextId = companies.length > 0 ? Math.max(...companies.map((c) => c.id)) + 1 : 1;
    const newComp: Company = { ...companyData, id: nextId };
    const updated = [...companies, newComp];
    setCompanies(updated);
    saveCompanies(updated);
    showToast(`Partner company "${newComp.companyName}" added.`);
    return { success: true };
  };

  const handleUpdateCompany = (id: number, companyData: Omit<Company, 'id'>) => {
    if (
      companies.some(
        (c) => c.id !== id && c.companyName.toLowerCase() === companyData.companyName.toLowerCase()
      )
    ) {
      return { success: false, message: `Company "${companyData.companyName}" already exists.` };
    }
    const updated = companies.map((c) => (c.id === id ? { ...companyData, id } : c));
    setCompanies(updated);
    saveCompanies(updated);
    showToast(`Updated company "${companyData.companyName}".`);
    return { success: true };
  };

  const handleDeleteCompany = (id: number) => {
    const compToDelete = companies.find((c) => c.id === id);
    const updated = companies.filter((c) => c.id !== id);
    setCompanies(updated);
    saveCompanies(updated);
    showToast(`Removed company ${compToDelete?.companyName || ''}.`);
  };

  // ==================== Placement Drive CRUD ====================
  const handleAddDrive = (driveData: Omit<PlacementDrive, 'id'>) => {
    const nextId = drives.length > 0 ? Math.max(...drives.map((d) => d.id)) + 1 : 1;
    const newDrive: PlacementDrive = { ...driveData, id: nextId };
    const updated = [newDrive, ...drives];
    setDrives(updated);
    saveDrives(updated);
    showToast(`Created drive for ${newDrive.jobRole}.`);
    return { success: true };
  };

  const handleUpdateDrive = (id: number, driveData: Omit<PlacementDrive, 'id'>) => {
    const updated = drives.map((d) => (d.id === id ? { ...driveData, id } : d));
    setDrives(updated);
    saveDrives(updated);
    showToast(`Updated drive details for ${driveData.jobRole}.`);
    return { success: true };
  };

  const handleDeleteDrive = (id: number) => {
    const updated = drives.filter((d) => d.id !== id);
    setDrives(updated);
    saveDrives(updated);
    showToast(`Deleted placement drive.`);
  };

  // ==================== Application Pipeline ====================
  const handleUpdateApplicationStatus = (id: number, status: ApplicationStatus, remarks?: string) => {
    const updated = applications.map((a) => (a.id === id ? { ...a, status, remarks: remarks || a.remarks } : a));
    setApplications(updated);
    saveApplications(updated);

    // If marked SELECTED, automatically update student placementStatus to PLACED
    if (status === 'SELECTED') {
      const app = applications.find((a) => a.id === id);
      if (app) {
        const studentUpdated = students.map((s) => (s.id === app.studentId ? { ...s, placementStatus: 'PLACED' as const } : s));
        setStudents(studentUpdated);
        saveStudents(studentUpdated);
      }
    }

    showToast(`Application #${id} status changed to ${status}.`);
  };

  const handleApplyDrive = (studentId: number, driveId: number) => {
    // Prevent duplicate applications
    const existing = applications.find((a) => a.studentId === studentId && a.placementDriveId === driveId);
    if (existing) {
      return {
        success: false,
        message: 'You have already applied for this placement drive. Duplicate submissions are prevented.'
      };
    }

    const drive = drives.find((d) => d.id === driveId);
    const student = students.find((s) => s.id === studentId);

    if (!drive || !student) {
      return { success: false, message: 'Invalid drive or student.' };
    }

    // Server-side / business logic validation check
    if (student.cgpa < drive.eligibilityCgpa) {
      return { success: false, message: `Ineligible: CGPA ${student.cgpa} is below minimum requirement of ${drive.eligibilityCgpa}.` };
    }
    if (student.backlogs > drive.maximumBacklogs) {
      return { success: false, message: `Ineligible: You have ${student.backlogs} backlogs, maximum allowed is ${drive.maximumBacklogs}.` };
    }
    if (!drive.eligibleDepartments.includes(student.department)) {
      return { success: false, message: `Ineligible: Your department (${student.department}) is not eligible for this drive.` };
    }

    const nextId = applications.length > 0 ? Math.max(...applications.map((a) => a.id)) + 1 : 1;
    const newApp: Application = {
      id: nextId,
      studentId,
      placementDriveId: driveId,
      applicationDate: new Date().toISOString().split('T')[0],
      status: 'APPLIED',
      remarks: 'Application submitted via student portal.'
    };

    const updated = [newApp, ...applications];
    setApplications(updated);
    saveApplications(updated);
    showToast(`Application for "${drive.jobRole}" submitted successfully!`);
    return { success: true, message: `Application submitted successfully for ${drive.jobRole}!` };
  };

  // ==================== Placement Results CRUD ====================
  const handleAddResult = (resultData: Omit<PlacementResult, 'id'>) => {
    const nextId = results.length > 0 ? Math.max(...results.map((r) => r.id)) + 1 : 1;
    const newRes: PlacementResult = { ...resultData, id: nextId };
    const updated = [newRes, ...results];
    setResults(updated);
    saveResults(updated);

    // Sync student placement status
    if (resultData.resultStatus === 'SELECTED') {
      const updatedStudents = students.map((s) =>
        s.id === resultData.studentId ? { ...s, placementStatus: 'PLACED' as const } : s
      );
      setStudents(updatedStudents);
      saveStudents(updatedStudents);
    }

    showToast(`Placement offer recorded successfully.`);
    return { success: true };
  };

  const handleUpdateResult = (id: number, resultData: Omit<PlacementResult, 'id'>) => {
    const updated = results.map((r) => (r.id === id ? { ...resultData, id } : r));
    setResults(updated);
    saveResults(updated);
    showToast(`Placement offer updated.`);
    return { success: true };
  };

  const handleDeleteResult = (id: number) => {
    const updated = results.filter((r) => r.id !== id);
    setResults(updated);
    saveResults(updated);
    showToast(`Placement result removed.`);
  };

  // Live calculated stats
  const stats = computeDashboardStats(students, companies, drives, applications, results);

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-900 antialiased">
      {/* Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        role={role}
        setRole={setRole}
        onResetData={handleResetData}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-800 uppercase tracking-wide">
              {role === 'ADMIN' ? 'Placement Cell Administration' : 'Student Candidate Space'}
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">|</span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Active Term: <strong>2024-2025</strong>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Role Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
              {role === 'ADMIN' ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Admin Mode</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Student Mode</span>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setCurrentTab('architecture')}
              className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
            >
              Spring Docs & Structure
            </button>
          </div>
        </header>

        {/* Dynamic Toast Message */}
        {toast && (
          <div className="fixed top-5 right-5 z-50 animate-bounce">
            <div
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium ${
                toast.type === 'error'
                  ? 'bg-rose-50 border-rose-200 text-rose-800'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}
            >
              {toast.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-600" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              )}
              <span>{toast.message}</span>
            </div>
          </div>
        )}

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-6 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <DashboardView
              stats={stats}
              students={students}
              companies={companies}
              drives={drives}
              applications={applications}
              results={results}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'students' && (
            <StudentsView
              students={students}
              onAddStudent={handleAddStudent}
              onUpdateStudent={handleUpdateStudent}
              onDeleteStudent={handleDeleteStudent}
            />
          )}

          {currentTab === 'companies' && (
            <CompaniesView
              companies={companies}
              drives={drives}
              onAddCompany={handleAddCompany}
              onUpdateCompany={handleUpdateCompany}
              onDeleteCompany={handleDeleteCompany}
            />
          )}

          {currentTab === 'drives' && (
            <DrivesView
              drives={drives}
              companies={companies}
              onAddDrive={handleAddDrive}
              onUpdateDrive={handleUpdateDrive}
              onDeleteDrive={handleDeleteDrive}
            />
          )}

          {currentTab === 'applications' && (
            <ApplicationsView
              applications={applications}
              students={students}
              drives={drives}
              companies={companies}
              onUpdateStatus={handleUpdateApplicationStatus}
              onDeleteApplication={() => {}}
            />
          )}

          {currentTab === 'results' && (
            <ResultsView
              results={results}
              students={students}
              companies={companies}
              drives={drives}
              onAddResult={handleAddResult}
              onUpdateResult={handleUpdateResult}
              onDeleteResult={handleDeleteResult}
            />
          )}

          {currentTab === 'reports' && (
            <ReportsView
              stats={stats}
              students={students}
              companies={companies}
              drives={drives}
              applications={applications}
              results={results}
            />
          )}

          {currentTab === 'student-portal' && (
            <StudentPortalView
              students={students}
              drives={drives}
              companies={companies}
              applications={applications}
              results={results}
              onApplyDrive={handleApplyDrive}
            />
          )}

          {currentTab === 'architecture' && <ArchitectureViewer />}
        </main>
      </div>
    </div>
  );
}
