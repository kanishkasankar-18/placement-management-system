import React from 'react';
import {
  BarChart3,
  Download,
  TrendingUp,
  Award,
  Building2,
  Users,
  CheckCircle2,
  PieChart,
  FileSpreadsheet
} from 'lucide-react';
import { Student, Company, PlacementDrive, Application, PlacementResult, DashboardStats } from '../types';

interface ReportsViewProps {
  stats: DashboardStats;
  students: Student[];
  companies: Company[];
  drives: PlacementDrive[];
  applications: Application[];
  results: PlacementResult[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  stats,
  students,
  companies,
  drives,
  applications,
  results
}) => {
  // Department aggregation
  const deptMap: Record<string, { total: number; placed: number; totalPkg: number; maxPkg: number }> = {};
  students.forEach((s) => {
    if (!deptMap[s.department]) {
      deptMap[s.department] = { total: 0, placed: 0, totalPkg: 0, maxPkg: 0 };
    }
    deptMap[s.department].total += 1;
    if (s.placementStatus === 'PLACED') {
      deptMap[s.department].placed += 1;
      const res = results.find((r) => r.studentId === s.id);
      if (res) {
        deptMap[s.department].totalPkg += res.salaryPackage;
        deptMap[s.department].maxPkg = Math.max(deptMap[s.department].maxPkg, res.salaryPackage);
      }
    }
  });

  // Salary tier brackets
  const tiers = {
    superDream: results.filter((r) => r.salaryPackage >= 15).length,
    dream: results.filter((r) => r.salaryPackage >= 9 && r.salaryPackage < 15).length,
    regular: results.filter((r) => r.salaryPackage < 9).length
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Placement Statistics & Reports</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            College placement performance metrics, branch-wise analysis, and salary package distributions.
          </p>
        </div>
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
        >
          <Download className="w-4 h-4" />
          Export / Print Report
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 uppercase">Overall Placement</span>
          <h3 className="text-2xl font-bold text-blue-600 mt-1">{stats.placementPercentage}%</h3>
          <p className="text-xs text-slate-500 mt-1">{stats.studentsPlaced} of {stats.totalStudents} placed</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 uppercase">Average CTC</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.averagePackage} LPA</h3>
          <p className="text-xs text-emerald-600 font-medium mt-1">Across all confirmed offers</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 uppercase">Highest CTC Offered</span>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">{stats.highestPackage} LPA</h3>
          <p className="text-xs text-slate-500 mt-1">Top tier campus record</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 uppercase">Active Recruiters</span>
          <h3 className="text-2xl font-bold text-purple-600 mt-1">{stats.totalCompanies}</h3>
          <p className="text-xs text-slate-500 mt-1">Participating corporate partners</p>
        </div>
      </div>

      {/* Salary Tiers Breakdown */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h3 className="font-bold text-slate-900 text-base mb-2">Salary Package Categorization</h3>
        <p className="text-xs text-slate-500 mb-5">Classification of offers rolled by annual package tiers</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Super Dream (≥ 15 LPA)</span>
              <span className="text-xs font-extrabold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded-full">
                Tier 1
              </span>
            </div>
            <h4 className="text-3xl font-extrabold text-indigo-950 mt-3">{tiers.superDream}</h4>
            <p className="text-xs text-slate-500 mt-1">High-end product engineering & cloud roles</p>
          </div>

          <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Dream Offer (9 - 14.9 LPA)</span>
              <span className="text-xs font-extrabold text-blue-900 bg-blue-100 px-2 py-0.5 rounded-full">
                Tier 2
              </span>
            </div>
            <h4 className="text-3xl font-extrabold text-blue-950 mt-3">{tiers.dream}</h4>
            <p className="text-xs text-slate-500 mt-1">Specialist developer & technology consulting</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Regular Offer (&lt; 9 LPA)</span>
              <span className="text-xs font-extrabold text-slate-900 bg-slate-200 px-2 py-0.5 rounded-full">
                Tier 3
              </span>
            </div>
            <h4 className="text-3xl font-extrabold text-slate-900 mt-3">{tiers.regular}</h4>
            <p className="text-xs text-slate-500 mt-1">Core & bulk campus recruitment pipelines</p>
          </div>
        </div>
      </div>

      {/* Detailed Department Performance Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <h3 className="font-bold text-slate-900 text-base">Department-Wise Placement Performance</h3>
          <p className="text-xs text-slate-500">Comprehensive comparative analysis of academic engineering branches</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
                <th className="py-3 px-4">Department / Branch</th>
                <th className="py-3 px-4 text-center">Total Students</th>
                <th className="py-3 px-4 text-center">Placed</th>
                <th className="py-3 px-4 text-center">Unplaced</th>
                <th className="py-3 px-4 text-center">Placement %</th>
                <th className="py-3 px-4 text-center">Highest Package</th>
                <th className="py-3 px-4 text-center">Avg Package</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {Object.entries(deptMap).map(([dept, data]) => {
                const pct = data.total > 0 ? Math.round((data.placed / data.total) * 100) : 0;
                const avg = data.placed > 0 ? (data.totalPkg / data.placed).toFixed(2) : '—';

                return (
                  <tr key={dept} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{dept}</td>
                    <td className="py-3 px-4 text-center text-xs">{data.total}</td>
                    <td className="py-3 px-4 text-center text-xs font-bold text-emerald-700">{data.placed}</td>
                    <td className="py-3 px-4 text-center text-xs font-medium text-slate-500">
                      {data.total - data.placed}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-bold text-xs">{pct}%</span>
                        <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-xs font-bold text-slate-900">
                      {data.maxPkg > 0 ? `${data.maxPkg} LPA` : '—'}
                    </td>
                    <td className="py-3 px-4 text-center text-xs font-bold text-blue-700">
                      {avg !== '—' ? `${avg} LPA` : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
