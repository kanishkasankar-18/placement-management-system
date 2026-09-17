import React from 'react';
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  FileCheck,
  Award,
  BarChart3,
  Code2,
  GraduationCap,
  ShieldCheck,
  UserCheck,
  RotateCcw
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  onResetData: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  role,
  setRole,
  onResetData
}) => {
  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'companies', label: 'Companies', icon: Building2 },
    { id: 'drives', label: 'Placement Drives', icon: Briefcase },
    { id: 'applications', label: 'Applications', icon: FileCheck },
    { id: 'results', label: 'Placement Results', icon: Award },
    { id: 'reports', label: 'Reports & Statistics', icon: BarChart3 },
    { id: 'architecture', label: 'Spring Boot Docs', icon: Code2 }
  ];

  const studentNavItems = [
    { id: 'student-portal', label: 'My Student Portal', icon: GraduationCap },
    { id: 'drives', label: 'Explore Drives', icon: Briefcase },
    { id: 'companies', label: 'Companies List', icon: Building2 },
    { id: 'architecture', label: 'Spring Boot Docs', icon: Code2 }
  ];

  const navItems = role === 'ADMIN' ? adminNavItems : studentNavItems;

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col flex-shrink-0 min-h-screen border-r border-slate-800">
      {/* College Placement Branding */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-base tracking-tight text-white leading-tight">CampusPlacements</h1>
          <p className="text-xs text-slate-400 font-medium">Placement Cell Portal</p>
        </div>
      </div>

      {/* Role Switcher */}
      <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/40">
        <label className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1.5 block">
          Current Role Simulator
        </label>
        <div className="grid grid-cols-2 gap-1.5 bg-slate-800 p-1 rounded-lg">
          <button
            type="button"
            id="role-admin-btn"
            onClick={() => {
              setRole('ADMIN');
              if (currentTab === 'student-portal') setCurrentTab('dashboard');
            }}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-semibold transition-all ${
              role === 'ADMIN'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin
          </button>
          <button
            type="button"
            id="role-student-btn"
            onClick={() => {
              setRole('STUDENT');
              setCurrentTab('student-portal');
            }}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-semibold transition-all ${
              role === 'STUDENT'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Student
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {role === 'ADMIN' ? 'Placement Cell Admin' : 'Candidate Area'}
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600/90 text-white shadow-sm font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Controls */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/60 text-xs">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span>Spring Boot 3 + MySQL</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
            REST v1.0
          </span>
        </div>
        <button
          type="button"
          onClick={onResetData}
          id="reset-sample-data-btn"
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Demo Data
        </button>
      </div>
    </aside>
  );
};
