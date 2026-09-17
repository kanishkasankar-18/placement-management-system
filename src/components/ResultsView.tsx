import React, { useState, useMemo } from 'react';
import {
  Award,
  Search,
  Plus,
  Edit2,
  Trash2,
  Filter,
  DollarSign,
  Calendar,
  X,
  AlertCircle
} from 'lucide-react';
import { PlacementResult, Student, Company, PlacementDrive, ResultStatus } from '../types';

interface ResultsViewProps {
  results: PlacementResult[];
  students: Student[];
  companies: Company[];
  drives: PlacementDrive[];
  onAddResult: (result: Omit<PlacementResult, 'id'>) => { success: boolean; message?: string };
  onUpdateResult: (id: number, result: Omit<PlacementResult, 'id'>) => { success: boolean; message?: string };
  onDeleteResult: (id: number) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  results,
  students,
  companies,
  drives,
  onAddResult,
  onUpdateResult,
  onDeleteResult
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [companyFilter, setCompanyFilter] = useState('ALL');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResult, setEditingResult] = useState<PlacementResult | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [validationError, setValidationError] = useState('');

  const [formData, setFormData] = useState({
    studentId: students[0]?.id || 1,
    companyId: companies[0]?.id || 1,
    placementDriveId: drives[0]?.id || 1,
    jobRole: 'Software Engineer',
    salaryPackage: 12.0,
    placementDate: '2025-11-10',
    resultStatus: 'SELECTED' as ResultStatus
  });

  const departments = [
    'Computer Science',
    'Information Technology',
    'Electronics & Communication',
    'Electrical & Electronics',
    'Mechanical Engineering',
    'Civil Engineering'
  ];

  const handleOpenAdd = () => {
    setEditingResult(null);
    setFormData({
      studentId: students[0]?.id || 1,
      companyId: companies[0]?.id || 1,
      placementDriveId: drives[0]?.id || 1,
      jobRole: 'Graduate Software Trainee',
      salaryPackage: 10.0,
      placementDate: new Date().toISOString().split('T')[0],
      resultStatus: 'SELECTED'
    });
    setValidationError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (res: PlacementResult) => {
    setEditingResult(res);
    setFormData({
      studentId: res.studentId,
      companyId: res.companyId,
      placementDriveId: res.placementDriveId,
      jobRole: res.jobRole,
      salaryPackage: res.salaryPackage,
      placementDate: res.placementDate,
      resultStatus: res.resultStatus
    });
    setValidationError('');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentId || !formData.companyId) {
      setValidationError('Student and company are required.');
      return;
    }
    if (formData.salaryPackage <= 0) {
      setValidationError('Salary package must be greater than 0.');
      return;
    }

    if (editingResult) {
      const res = onUpdateResult(editingResult.id, formData);
      if (!res.success) {
        setValidationError(res.message || 'Failed to update result');
        return;
      }
    } else {
      const res = onAddResult(formData);
      if (!res.success) {
        setValidationError(res.message || 'Failed to add placement result');
        return;
      }
    }
    setIsModalOpen(false);
  };

  const filteredResults = useMemo(() => {
    return results.filter((r) => {
      const student = students.find((s) => s.id === r.studentId);
      const company = companies.find((c) => c.id === r.companyId);

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        (student && student.name.toLowerCase().includes(q)) ||
        (student && student.registerNumber.toLowerCase().includes(q)) ||
        (company && company.companyName.toLowerCase().includes(q)) ||
        r.jobRole.toLowerCase().includes(q);

      const matchesDept = departmentFilter === 'ALL' || (student && student.department === departmentFilter);
      const matchesCompany = companyFilter === 'ALL' || r.companyId.toString() === companyFilter;

      return matchesSearch && matchesDept && matchesCompany;
    });
  }, [results, students, companies, searchQuery, departmentFilter, companyFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Placement Results & Offers</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Confirmed student recruitment offers, packages, and selection verifications.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          id="add-result-btn"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          Record Placement Result
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="results-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student, register number, or recruiter..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-800 placeholder-slate-400"
          />
        </div>

        <div>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-700"
          >
            <option value="ALL">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-700"
          >
            <option value="ALL">All Recruiters</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id.toString()}>
                {c.companyName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse" id="results-table">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Register Number</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Recruiter Company</th>
                <th className="py-3 px-4">Job Role</th>
                <th className="py-3 px-4 text-center">Package (LPA)</th>
                <th className="py-3 px-4">Placement Date</th>
                <th className="py-3 px-4 text-center">Result</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredResults.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    No placement results recorded yet.
                  </td>
                </tr>
              ) : (
                filteredResults.map((r) => {
                  const student = students.find((s) => s.id === r.studentId);
                  const company = companies.find((c) => c.id === r.companyId);
                  return (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">{student?.name || 'Student'}</td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-600">
                        {student?.registerNumber || '—'}
                      </td>
                      <td className="py-3 px-4 text-xs font-medium text-slate-700">{student?.department || '—'}</td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-blue-700">{company?.companyName || 'Recruiter'}</span>
                      </td>
                      <td className="py-3 px-4 text-xs font-medium text-slate-800">{r.jobRole}</td>
                      <td className="py-3 px-4 text-center font-extrabold text-emerald-700">
                        {r.salaryPackage} LPA
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-500">{r.placementDate}</td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                            r.resultStatus === 'SELECTED'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-rose-100 text-rose-800 border border-rose-200'
                          }`}
                        >
                          {r.resultStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(r)}
                            id={`edit-result-${r.id}`}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(r.id)}
                            id={`delete-result-${r.id}`}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingResult ? 'Edit Placement Result' : 'Record New Placement Offer'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {validationError && (
              <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Student Candidate *</label>
                <select
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.registerNumber} - {s.department})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Recruiter Company *</label>
                  <select
                    value={formData.companyId}
                    onChange={(e) => setFormData({ ...formData, companyId: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  >
                    {companies.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.companyName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Result Status *</label>
                  <select
                    value={formData.resultStatus}
                    onChange={(e) => setFormData({ ...formData, resultStatus: e.target.value as ResultStatus })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  >
                    <option value="SELECTED">SELECTED</option>
                    <option value="NOT_SELECTED">NOT_SELECTED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Job Role Offered *</label>
                <input
                  type="text"
                  required
                  value={formData.jobRole}
                  onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
                  placeholder="e.g. Associate Software Engineer"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Salary Package (LPA) *</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    required
                    value={formData.salaryPackage}
                    onChange={(e) => setFormData({ ...formData, salaryPackage: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Offer / Result Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.placementDate}
                    onChange={(e) => setFormData({ ...formData, placementDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="save-result-btn"
                  className="px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm"
                >
                  {editingResult ? 'Update Result' : 'Save Offer Result'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Delete Placement Result?</h3>
            <p className="text-xs text-slate-500 mt-2">
              Are you sure you want to remove this selection record?
            </p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                id="confirm-delete-result-btn"
                onClick={() => {
                  onDeleteResult(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-3.5 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
