import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  X,
  AlertCircle,
  Building2
} from 'lucide-react';
import { PlacementDrive, Company, DriveStatus } from '../types';

interface DrivesViewProps {
  drives: PlacementDrive[];
  companies: Company[];
  onAddDrive: (drive: Omit<PlacementDrive, 'id'>) => { success: boolean; message?: string };
  onUpdateDrive: (id: number, drive: Omit<PlacementDrive, 'id'>) => { success: boolean; message?: string };
  onDeleteDrive: (id: number) => void;
}

export const DrivesView: React.FC<DrivesViewProps> = ({
  drives,
  companies,
  onAddDrive,
  onUpdateDrive,
  onDeleteDrive
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDrive, setEditingDrive] = useState<PlacementDrive | null>(null);
  const [viewingDrive, setViewingDrive] = useState<PlacementDrive | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [validationError, setValidationError] = useState('');

  const allDepartments = [
    'Computer Science',
    'Information Technology',
    'Electronics & Communication',
    'Electrical & Electronics',
    'Mechanical Engineering',
    'Civil Engineering'
  ];

  const [formData, setFormData] = useState({
    companyId: companies[0]?.id || 1,
    jobRole: '',
    jobDescription: '',
    eligibilityCgpa: 7.5,
    maximumBacklogs: 0,
    eligibleDepartments: ['Computer Science', 'Information Technology'],
    salaryPackage: 12.0,
    location: 'Bengaluru',
    driveDate: '2025-11-15',
    applicationDeadline: '2025-11-05',
    numberOfOpenings: 10,
    status: 'OPEN' as DriveStatus
  });

  const handleOpenAdd = () => {
    setEditingDrive(null);
    setFormData({
      companyId: companies[0]?.id || 1,
      jobRole: '',
      jobDescription: '',
      eligibilityCgpa: 7.0,
      maximumBacklogs: 0,
      eligibleDepartments: ['Computer Science', 'Information Technology'],
      salaryPackage: 10.0,
      location: 'Bengaluru',
      driveDate: '2025-12-10',
      applicationDeadline: '2025-12-01',
      numberOfOpenings: 15,
      status: 'OPEN'
    });
    setValidationError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (drive: PlacementDrive) => {
    setEditingDrive(drive);
    setFormData({
      companyId: drive.companyId,
      jobRole: drive.jobRole,
      jobDescription: drive.jobDescription,
      eligibilityCgpa: drive.eligibilityCgpa,
      maximumBacklogs: drive.maximumBacklogs,
      eligibleDepartments: drive.eligibleDepartments,
      salaryPackage: drive.salaryPackage,
      location: drive.location,
      driveDate: drive.driveDate,
      applicationDeadline: drive.applicationDeadline,
      numberOfOpenings: drive.numberOfOpenings,
      status: drive.status
    });
    setValidationError('');
    setIsModalOpen(true);
  };

  const validateForm = () => {
    if (!formData.companyId) return 'Company is required.';
    if (!formData.jobRole.trim()) return 'Job role is required.';
    if (formData.eligibilityCgpa < 0 || formData.eligibilityCgpa > 10) return 'Minimum CGPA must be between 0 and 10.';
    if (formData.maximumBacklogs < 0) return 'Maximum backlogs cannot be negative.';
    if (formData.salaryPackage <= 0) return 'Salary package must be greater than zero.';
    if (formData.numberOfOpenings <= 0) return 'Number of openings must be greater than zero.';
    if (!formData.driveDate) return 'Drive date is required.';
    if (!formData.applicationDeadline) return 'Application deadline is required.';
    if (formData.eligibleDepartments.length === 0) return 'Select at least one eligible department.';
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setValidationError(error);
      return;
    }

    if (editingDrive) {
      const res = onUpdateDrive(editingDrive.id, formData);
      if (!res.success) {
        setValidationError(res.message || 'Failed to update drive');
        return;
      }
    } else {
      const res = onAddDrive(formData);
      if (!res.success) {
        setValidationError(res.message || 'Failed to create drive');
        return;
      }
    }
    setIsModalOpen(false);
  };

  const toggleDepartment = (dept: string) => {
    if (formData.eligibleDepartments.includes(dept)) {
      setFormData({
        ...formData,
        eligibleDepartments: formData.eligibleDepartments.filter((d) => d !== dept)
      });
    } else {
      setFormData({
        ...formData,
        eligibleDepartments: [...formData.eligibleDepartments, dept]
      });
    }
  };

  const filteredDrives = useMemo(() => {
    return drives.filter((d) => {
      const comp = companies.find((c) => c.id === d.companyId);
      const cName = comp ? comp.companyName.toLowerCase() : '';
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        d.jobRole.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q) ||
        cName.includes(q);

      const matchesStatus = statusFilter === 'ALL' || d.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [drives, companies, searchQuery, statusFilter]);

  const getStatusBadge = (status: DriveStatus) => {
    switch (status) {
      case 'OPEN':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'UPCOMING':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CLOSED':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'COMPLETED':
        return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Placement Drives</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Campus recruitment schedules, eligibility criteria, and job profiles.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          id="add-drive-btn"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          Create Placement Drive
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="drive-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by company, role, or location..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {['ALL', 'OPEN', 'UPCOMING', 'CLOSED', 'COMPLETED'].map((st) => (
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

      {/* Drives Grid / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDrives.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
            No placement drives found.
          </div>
        ) : (
          filteredDrives.map((drive) => {
            const comp = companies.find((c) => c.id === drive.companyId);
            return (
              <div
                key={drive.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                        {comp?.companyName || 'Corporate Partner'}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">{drive.jobRole}</h3>
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${getStatusBadge(
                        drive.status
                      )}`}
                    >
                      {drive.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {drive.jobDescription || 'Full-time campus hiring drive for graduating engineering batch.'}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Package:</span>
                      <span className="font-extrabold text-blue-700 text-sm">{drive.salaryPackage} LPA</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Min CGPA / Max Backlogs:</span>
                      <span className="font-medium text-slate-900">
                        {drive.eligibilityCgpa}+ CGPA / {drive.maximumBacklogs} Backlogs
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Openings:</span>
                      <span className="font-semibold text-slate-800">{drive.numberOfOpenings} Positions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Location:</span>
                      <span className="font-medium text-slate-800">{drive.location}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                      <span className="text-slate-500">Drive Date:</span>
                      <span className="font-semibold text-slate-700">{drive.driveDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-rose-600 font-medium">Apply Before:</span>
                      <span className="font-bold text-rose-700">{drive.applicationDeadline}</span>
                    </div>
                  </div>

                  {/* Department Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {drive.eligibleDepartments.map((dept) => (
                      <span
                        key={dept}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600"
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setViewingDrive(drive)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> Details
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(drive)}
                      id={`edit-drive-${drive.id}`}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(drive.id)}
                      id={`delete-drive-${drive.id}`}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingDrive ? 'Edit Placement Drive' : 'Create New Placement Drive'}
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company *</label>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Drive Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as DriveStatus })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  >
                    <option value="OPEN">OPEN (Accepting Applications)</option>
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="CLOSED">CLOSED</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Job Role / Title *</label>
                <input
                  type="text"
                  required
                  value={formData.jobRole}
                  onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
                  placeholder="e.g. Associate Software Engineer"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Job Description</label>
                <textarea
                  rows={2}
                  value={formData.jobDescription}
                  onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                  placeholder="Key responsibilities and qualifications required..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Package (LPA) *</label>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Min CGPA (0-10) *</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    required
                    value={formData.eligibilityCgpa}
                    onChange={(e) => setFormData({ ...formData, eligibilityCgpa: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Max Backlogs *</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.maximumBacklogs}
                    onChange={(e) => setFormData({ ...formData, maximumBacklogs: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Openings *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.numberOfOpenings}
                    onChange={(e) => setFormData({ ...formData, numberOfOpenings: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Drive Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.driveDate}
                    onChange={(e) => setFormData({ ...formData, driveDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Deadline *</label>
                  <input
                    type="date"
                    required
                    value={formData.applicationDeadline}
                    onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Work Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Bengaluru / Hyderabad / Remote"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Eligible Academic Departments *
                </label>
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  {allDepartments.map((dept) => {
                    const checked = formData.eligibleDepartments.includes(dept);
                    return (
                      <label key={dept} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleDepartment(dept)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span>{dept}</span>
                      </label>
                    );
                  })}
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
                  id="save-drive-btn"
                  className="px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm"
                >
                  {editingDrive ? 'Update Drive' : 'Publish Drive'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Drive Details Modal */}
      {viewingDrive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            {(() => {
              const comp = companies.find((c) => c.id === viewingDrive.companyId);
              return (
                <div>
                  <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-bold text-blue-600 uppercase">{comp?.companyName}</span>
                      <h3 className="text-lg font-bold text-slate-900 mt-0.5">{viewingDrive.jobRole}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setViewingDrive(null)}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mt-4 space-y-3 text-xs text-slate-700">
                    <p className="text-slate-600 leading-relaxed">{viewingDrive.jobDescription}</p>
                    <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Package:</span>
                        <strong className="text-slate-900">{viewingDrive.salaryPackage} LPA</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Eligibility CGPA:</span>
                        <strong className="text-slate-900">{viewingDrive.eligibilityCgpa} minimum</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Allowed Backlogs:</span>
                        <strong className="text-slate-900">{viewingDrive.maximumBacklogs} maximum</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Drive Date:</span>
                        <strong className="text-slate-900">{viewingDrive.driveDate}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Application Cutoff:</span>
                        <strong className="text-rose-600">{viewingDrive.applicationDeadline}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setViewingDrive(null)}
                      className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                    >
                      Close
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Delete Placement Drive?</h3>
            <p className="text-xs text-slate-500 mt-2">
              Are you sure you want to delete this placement drive? Associated applications will also be removed.
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
                id="confirm-delete-drive-btn"
                onClick={() => {
                  onDeleteDrive(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-3.5 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm"
              >
                Delete Drive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
