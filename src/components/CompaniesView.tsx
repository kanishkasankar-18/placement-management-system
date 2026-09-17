import React, { useState, useMemo } from 'react';
import {
  Building2,
  Search,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  Mail,
  Phone,
  MapPin,
  X,
  AlertCircle
} from 'lucide-react';
import { Company, PlacementDrive } from '../types';

interface CompaniesViewProps {
  companies: Company[];
  drives: PlacementDrive[];
  onAddCompany: (company: Omit<Company, 'id'>) => { success: boolean; message?: string };
  onUpdateCompany: (id: number, company: Omit<Company, 'id'>) => { success: boolean; message?: string };
  onDeleteCompany: (id: number) => void;
}

export const CompaniesView: React.FC<CompaniesViewProps> = ({
  companies,
  drives,
  onAddCompany,
  onUpdateCompany,
  onDeleteCompany
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [viewingCompany, setViewingCompany] = useState<Company | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [validationError, setValidationError] = useState('');

  const [formData, setFormData] = useState({
    companyName: '',
    industry: 'Software & Technology',
    location: '',
    website: '',
    hrName: '',
    hrEmail: '',
    hrPhone: '',
    description: ''
  });

  const handleOpenAdd = () => {
    setEditingCompany(null);
    setFormData({
      companyName: '',
      industry: 'Software & Technology',
      location: 'Bengaluru, Karnataka',
      website: 'https://',
      hrName: '',
      hrEmail: '',
      hrPhone: '+91 80 ',
      description: ''
    });
    setValidationError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (comp: Company) => {
    setEditingCompany(comp);
    setFormData({
      companyName: comp.companyName,
      industry: comp.industry,
      location: comp.location,
      website: comp.website,
      hrName: comp.hrName,
      hrEmail: comp.hrEmail,
      hrPhone: comp.hrPhone,
      description: comp.description
    });
    setValidationError('');
    setIsModalOpen(true);
  };

  const validateForm = () => {
    if (!formData.companyName.trim()) return 'Company name is required.';
    if (!formData.location.trim()) return 'Location is required.';
    if (!formData.hrEmail.trim() || !formData.hrEmail.includes('@')) return 'A valid HR email is required.';
    if (!formData.hrPhone.trim()) return 'HR phone is required.';
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setValidationError(error);
      return;
    }

    if (editingCompany) {
      const res = onUpdateCompany(editingCompany.id, formData);
      if (!res.success) {
        setValidationError(res.message || 'Failed to update company');
        return;
      }
    } else {
      const res = onAddCompany(formData);
      if (!res.success) {
        setValidationError(res.message || 'Failed to add company');
        return;
      }
    }
    setIsModalOpen(false);
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      const q = searchQuery.toLowerCase();
      return (
        c.companyName.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.hrName.toLowerCase().includes(q)
      );
    });
  }, [companies, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Partner Companies</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Recruiting organizations, industry domains, and college HR liaisons.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          id="add-company-btn"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Company
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="company-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by company name, industry, or city..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-800 placeholder-slate-400"
          />
        </div>
        <div className="text-xs text-slate-500">
          Total: <strong className="text-slate-800">{filteredCompanies.length}</strong> Companies
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse" id="companies-table">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Company Name</th>
                <th className="py-3 px-4">Industry</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">HR Contact</th>
                <th className="py-3 px-4">Website</th>
                <th className="py-3 px-4 text-center">Active Drives</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredCompanies.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No companies found matching your search.
                  </td>
                </tr>
              ) : (
                filteredCompanies.map((c) => {
                  const companyDrives = drives.filter((d) => d.companyId === c.id);
                  return (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{c.companyName}</div>
                        <div className="text-xs text-slate-500 line-clamp-1">{c.description}</div>
                      </td>
                      <td className="py-3 px-4 text-xs font-medium text-slate-700">
                        <span className="px-2.5 py-1 bg-slate-100 rounded-md text-slate-800">
                          {c.industry}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          <span>{c.location}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-xs">
                        <div className="font-semibold text-slate-800">{c.hrName}</div>
                        <div className="text-slate-500">{c.hrEmail}</div>
                      </td>
                      <td className="py-3 px-4 text-xs">
                        {c.website ? (
                          <a
                            href={c.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 font-medium"
                          >
                            Visit <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                          {companyDrives.length} Drives
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setViewingCompany(c)}
                            title="View Details"
                            className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(c)}
                            id={`edit-company-${c.id}`}
                            title="Edit Company"
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(c.id)}
                            id={`delete-company-${c.id}`}
                            title="Delete Company"
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md"
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
                {editingCompany ? 'Edit Partner Company' : 'Register New Company'}
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. Acme Innovations"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Industry Sector *</label>
                  <input
                    type="text"
                    required
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g. Information Technology"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location / HQ *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Bengaluru, Karnataka"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://company.com"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Campus HR Liaison Info
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">HR Name</label>
                    <input
                      type="text"
                      required
                      value={formData.hrName}
                      onChange={(e) => setFormData({ ...formData, hrName: e.target.value })}
                      placeholder="HR Lead"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">HR Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.hrEmail}
                      onChange={(e) => setFormData({ ...formData, hrEmail: e.target.value })}
                      placeholder="hr@company.com"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">HR Phone *</label>
                    <input
                      type="text"
                      required
                      value={formData.hrPhone}
                      onChange={(e) => setFormData({ ...formData, hrPhone: e.target.value })}
                      placeholder="+91..."
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description / Profile</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Overview of company operations and core hiring areas..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
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
                  id="save-company-btn"
                  className="px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm"
                >
                  {editingCompany ? 'Update Company' : 'Save Company'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Company Details Modal */}
      {viewingCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{viewingCompany.companyName}</h3>
                <span className="text-xs text-blue-600 font-semibold">{viewingCompany.industry}</span>
              </div>
              <button
                type="button"
                onClick={() => setViewingCompany(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs text-slate-700">
              <p className="text-slate-600 leading-relaxed">{viewingCompany.description}</p>
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span><strong>Location:</strong> {viewingCompany.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span><strong>HR Email:</strong> {viewingCompany.hrEmail} ({viewingCompany.hrName})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span><strong>HR Phone:</strong> {viewingCompany.hrPhone}</span>
                </div>
                {viewingCompany.website && (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                    <a
                      href={viewingCompany.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline font-medium"
                    >
                      {viewingCompany.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setViewingCompany(null)}
                className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Delete Company?</h3>
            <p className="text-xs text-slate-500 mt-2">
              Are you sure you want to remove this company from the database? Associated placement drives and statistics will be updated.
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
                id="confirm-delete-company-btn"
                onClick={() => {
                  onDeleteCompany(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-3.5 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm"
              >
                Delete Company
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
