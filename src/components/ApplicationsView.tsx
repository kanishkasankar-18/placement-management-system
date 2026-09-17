import React, { useState, useMemo } from 'react';
import {
  FileCheck,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Building2,
  User,
  Edit3,
  X
} from 'lucide-react';
import { Application, Student, PlacementDrive, Company, ApplicationStatus } from '../types';

interface ApplicationsViewProps {
  applications: Application[];
  students: Student[];
  drives: PlacementDrive[];
  companies: Company[];
  onUpdateStatus: (id: number, status: ApplicationStatus, remarks?: string) => void;
  onDeleteApplication: (id: number) => void;
}

export const ApplicationsView: React.FC<ApplicationsViewProps> = ({
  applications,
  students,
  drives,
  companies,
  onUpdateStatus,
  onDeleteApplication
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>('APPLIED');
  const [remarks, setRemarks] = useState('');

  const handleOpenStatusModal = (app: Application) => {
    setEditingApp(app);
    setSelectedStatus(app.status);
    setRemarks(app.remarks || '');
  };

  const handleSaveStatus = () => {
    if (editingApp) {
      onUpdateStatus(editingApp.id, selectedStatus, remarks);
      setEditingApp(null);
    }
  };

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const student = students.find((s) => s.id === app.studentId);
      const drive = drives.find((d) => d.id === app.placementDriveId);
      const company = drive ? companies.find((c) => c.id === drive.companyId) : null;

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        (student && student.name.toLowerCase().includes(q)) ||
        (student && student.registerNumber.toLowerCase().includes(q)) ||
        (company && company.companyName.toLowerCase().includes(q)) ||
        (drive && drive.jobRole.toLowerCase().includes(q));

      const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [applications, students, drives, companies, searchQuery, statusFilter]);

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'APPLIED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'SHORTLISTED':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'SELECTED':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'REJECTED':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'WAITLISTED':
        return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Student Applications</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Review drive candidacies, update shortlisting status, and record interviewer remarks.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="app-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student, register number, or company..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {['ALL', 'APPLIED', 'SHORTLISTED', 'SELECTED', 'WAITLISTED', 'REJECTED'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse" id="applications-table">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Candidate Student</th>
                <th className="py-3 px-4">Placement Drive</th>
                <th className="py-3 px-4">Applied Date</th>
                <th className="py-3 px-4">Remarks</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No applications match the search or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => {
                  const student = students.find((s) => s.id === app.studentId);
                  const drive = drives.find((d) => d.id === app.placementDriveId);
                  const company = drive ? companies.find((c) => c.id === drive.companyId) : null;

                  return (
                    <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 text-xs font-mono text-slate-400">APP-#{app.id}</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{student?.name || 'Unknown Student'}</div>
                        <div className="text-xs font-mono text-slate-500">{student?.registerNumber}</div>
                        <div className="text-[11px] text-slate-400">
                          {student?.department} • CGPA: <strong>{student?.cgpa}</strong>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-blue-700">{company?.companyName || 'Company'}</div>
                        <div className="text-xs text-slate-800">{drive?.jobRole}</div>
                        <div className="text-[11px] text-slate-500">Pkg: {drive?.salaryPackage} LPA</div>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-600">{app.applicationDate}</td>
                      <td className="py-3 px-4 text-xs text-slate-500 max-w-xs">
                        <p className="line-clamp-2 italic">{app.remarks || 'No remarks recorded'}</p>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleOpenStatusModal(app)}
                          id={`update-status-app-${app.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors text-slate-700"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          Update Status
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Application Status Modal */}
      {editingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Update Application Status</h3>
              <button
                type="button"
                onClick={() => setEditingApp(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Application Status *</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as ApplicationStatus)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                >
                  <option value="APPLIED">APPLIED</option>
                  <option value="SHORTLISTED">SHORTLISTED</option>
                  <option value="SELECTED">SELECTED (Offer Extended)</option>
                  <option value="WAITLISTED">WAITLISTED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Interview Remarks / Feedback</label>
                <textarea
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="e.g. Cleared technical interview with 8/10 score..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingApp(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  id="confirm-update-app-status-btn"
                  onClick={handleSaveStatus}
                  className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm"
                >
                  Confirm Status Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
