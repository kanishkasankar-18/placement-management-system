import React from 'react';
import {
  Users,
  Building2,
  Briefcase,
  CheckCircle2,
  XCircle,
  FileCheck,
  TrendingUp,
  Award,
  ArrowUpRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { Student, Company, PlacementDrive, Application, PlacementResult, DashboardStats } from '../types';

interface DashboardViewProps {
  stats: DashboardStats;
  students: Student[];
  companies: Company[];
  drives: PlacementDrive[];
  applications: Application[];
  results: PlacementResult[];
  onNavigate: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  students,
  companies,
  drives,
  applications,
  results,
  onNavigate
}) => {
  // Department breakdown
  const departmentCounts: Record<string, { total: number; placed: number }> = {};
  students.forEach((s) => {
    if (!departmentCounts[s.department]) {
      departmentCounts[s.department] = { total: 0, placed: 0 };
    }
    departmentCounts[s.department].total += 1;
    if (s.placementStatus === 'PLACED') {
      departmentCounts[s.department].placed += 1;
    }
  });

  // Application status distribution
  const statusCounts = {
    APPLIED: applications.filter(a => a.status === 'APPLIED').length,
    SHORTLISTED: applications.filter(a => a.status === 'SHORTLISTED').length,
    SELECTED: applications.filter(a => a.status === 'SELECTED').length,
    REJECTED: applications.filter(a => a.status === 'REJECTED').length,
    WAITLISTED: applications.filter(a => a.status === 'WAITLISTED').length,
  };

  // Company-wise selections
  const companySelections: Record<string, number> = {};
  results.filter(r => r.resultStatus === 'SELECTED').forEach(r => {
    const comp = companies.find(c => c.id === r.companyId);
    const cName = comp ? comp.companyName : `Company #${r.companyId}`;
    companySelections[cName] = (companySelections[cName] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-xs font-semibold tracking-wide mb-2 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Academic Year 2024-2025 Placement Season
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Placement Cell Overview</h2>
          <p className="text-blue-100 text-sm mt-1 max-w-2xl">
            Real-time management portal for campus recruitment drives, student eligibility tracking, and selection records.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('drives')}
            className="px-4 py-2.5 bg-white text-blue-800 font-semibold text-sm rounded-xl shadow hover:bg-blue-50 transition-all flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4" />
            View Active Drives
          </button>
          <button
            type="button"
            onClick={() => onNavigate('students')}
            className="px-4 py-2.5 bg-blue-600/60 hover:bg-blue-600 text-white font-semibold text-sm rounded-xl border border-white/20 transition-all flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Manage Students
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Students</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.totalStudents}</h3>
            <p className="text-xs text-slate-500 mt-1">Enrolled for placement</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Total Companies */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Partner Companies</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.totalCompanies}</h3>
            <p className="text-xs text-slate-500 mt-1">Active corporate recruiters</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        {/* Active Placement Drives */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Drives</p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1">{stats.activeDrives}</h3>
            <p className="text-xs text-slate-500 mt-1">Accepting applications</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        {/* Placement Percentage */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Placement Rate</p>
            <h3 className="text-2xl font-bold text-blue-600 mt-1">{stats.placementPercentage}%</h3>
            <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              {stats.studentsPlaced} / {stats.totalStudents} Placed
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Secondary Metric Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-center gap-3">
          <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500">Placed Students</span>
            <p className="text-lg font-bold text-slate-900">{stats.studentsPlaced} Candidates</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-center gap-3">
          <div className="p-2.5 bg-rose-100 text-rose-700 rounded-lg">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500">Unplaced Students</span>
            <p className="text-lg font-bold text-slate-900">{stats.studentsNotPlaced} Candidates</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-lg">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500">Total Applications</span>
            <p className="text-lg font-bold text-slate-900">{stats.totalApplications} Submissions</p>
          </div>
        </div>
      </div>

      {/* Charts and Distributions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department-wise Placement Bar Chart */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Department-Wise Placement Ratio</h3>
              <p className="text-xs text-slate-500">Placed students vs total registered per branch</p>
            </div>
            <button
              onClick={() => onNavigate('students')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View Students <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4 pt-2">
            {Object.entries(departmentCounts).map(([dept, data]) => {
              const pct = data.total > 0 ? Math.round((data.placed / data.total) * 100) : 0;
              return (
                <div key={dept} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-800">{dept}</span>
                    <span className="text-slate-600 font-semibold">
                      {data.placed} of {data.total} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Application Funnel & Status Breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Applications by Status</h3>
              <p className="text-xs text-slate-500">Live recruitment pipeline stages</p>
            </div>
            <button
              onClick={() => onNavigate('applications')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View Pipeline <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100">
              <span className="text-xs font-medium text-blue-700">Applied</span>
              <p className="text-xl font-bold text-blue-900 mt-1">{statusCounts.APPLIED}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-100">
              <span className="text-xs font-medium text-amber-700">Shortlisted</span>
              <p className="text-xl font-bold text-amber-900 mt-1">{statusCounts.SHORTLISTED}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100">
              <span className="text-xs font-medium text-emerald-700">Selected / Offers</span>
              <p className="text-xl font-bold text-emerald-900 mt-1">{statusCounts.SELECTED}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100">
              <span className="text-xs font-medium text-rose-700">Rejected</span>
              <p className="text-xl font-bold text-rose-900 mt-1">{statusCounts.REJECTED}</p>
            </div>
          </div>

          {/* Salary Summary */}
          <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Highest Package</span>
              <p className="text-lg font-extrabold text-slate-900 mt-0.5">{stats.highestPackage} LPA</p>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Average Package</span>
              <p className="text-lg font-extrabold text-blue-700 mt-0.5">{stats.averagePackage} LPA</p>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Offers Rolled</span>
              <p className="text-lg font-extrabold text-emerald-700 mt-0.5">{results.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Drives & Recruiter Summary */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Active & Upcoming Placement Drives</h3>
            <p className="text-xs text-slate-500">Companies conducting drives on campus</p>
          </div>
          <button
            onClick={() => onNavigate('drives')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            All Drives <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {drives.slice(0, 3).map((drive) => {
            const comp = companies.find((c) => c.id === drive.companyId);
            return (
              <div key={drive.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all bg-slate-50/50">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      {comp?.companyName || 'Company'}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-0.5">{drive.jobRole}</h4>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      drive.status === 'OPEN'
                        ? 'bg-emerald-100 text-emerald-800'
                        : drive.status === 'UPCOMING'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {drive.status}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                  <span>Package: <strong className="text-slate-900">{drive.salaryPackage} LPA</strong></span>
                  <span>Min CGPA: <strong className="text-slate-900">{drive.eligibilityCgpa}</strong></span>
                </div>
                <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Deadline: {drive.applicationDeadline}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
