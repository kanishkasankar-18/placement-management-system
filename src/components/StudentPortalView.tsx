import React, { useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Send,
  Building2,
  Award
} from 'lucide-react';
import { Student, PlacementDrive, Company, Application, PlacementResult } from '../types';

interface StudentPortalViewProps {
  students: Student[];
  drives: PlacementDrive[];
  companies: Company[];
  applications: Application[];
  results: PlacementResult[];
  onApplyDrive: (studentId: number, driveId: number) => { success: boolean; message: string };
}

export const StudentPortalView: React.FC<StudentPortalViewProps> = ({
  students,
  drives,
  companies,
  applications,
  results,
  onApplyDrive
}) => {
  // Current simulated student
  const [selectedStudentId, setSelectedStudentId] = useState<number>(students[2]?.id || students[0]?.id || 1);
  const [feedback, setFeedback] = useState<{ text: string; isError: boolean } | null>(null);

  const student = students.find((s) => s.id === selectedStudentId) || students[0];
  const myApplications = applications.filter((a) => a.studentId === student?.id);
  const myResults = results.filter((r) => r.studentId === student?.id && r.resultStatus === 'SELECTED');

  const checkEligibility = (drive: PlacementDrive) => {
    if (!student) return { eligible: false, reason: 'No student profile selected' };

    const cgpaOk = student.cgpa >= drive.eligibilityCgpa;
    const backlogsOk = student.backlogs <= drive.maximumBacklogs;
    const deptOk = drive.eligibleDepartments.includes(student.department);

    if (!cgpaOk) {
      return { eligible: false, reason: `Min CGPA required is ${drive.eligibilityCgpa} (Your CGPA: ${student.cgpa})` };
    }
    if (!backlogsOk) {
      return { eligible: false, reason: `Max backlogs allowed is ${drive.maximumBacklogs} (You have: ${student.backlogs})` };
    }
    if (!deptOk) {
      return { eligible: false, reason: `Branch ${student.department} is not in eligible departments list` };
    }

    return { eligible: true, reason: 'You meet all eligibility criteria!' };
  };

  const handleApply = (driveId: number) => {
    const res = onApplyDrive(student.id, driveId);
    setFeedback({
      text: res.message,
      isError: !res.success
    });
    setTimeout(() => {
      setFeedback(null);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Student Switcher & Profile Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-xl shadow-sm">
            {student?.name?.charAt(0) || 'S'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">{student?.name}</h2>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  student?.placementStatus === 'PLACED'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {student?.placementStatus}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              {student?.registerNumber} • {student?.department} • {student?.year}th Year
            </p>
          </div>
        </div>

        {/* Profile Details & Simulator Selector */}
        <div className="flex items-center gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Academic Standing</span>
            <span className="text-sm font-extrabold text-slate-800">
              CGPA: <strong className="text-blue-600">{student?.cgpa.toFixed(2)}</strong> | Backlogs: {student?.backlogs}
            </span>
          </div>

          <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
            <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
              Switch Simulated Student:
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(parseInt(e.target.value))}
              className="text-xs font-semibold bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.department} - {s.cgpa} CGPA)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
            feedback.isError
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}
        >
          {feedback.isError ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Offer Banner if placed */}
      {myResults.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-bold text-base">Congratulations on Your Placement Offer!</h3>
              <p className="text-xs text-emerald-100">
                You have been selected for <strong>{myResults[0].jobRole}</strong> with a package of{' '}
                <strong>{myResults[0].salaryPackage} LPA</strong>.
              </p>
            </div>
          </div>
          <span className="text-xs bg-white text-emerald-800 px-3 py-1.5 rounded-xl font-bold">
            CONFIRMED OFFER
          </span>
        </div>
      )}

      {/* Two Column Layout: Available Drives & My Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Drives for Student (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Campus Drives (Active & Upcoming)</h3>
              <p className="text-xs text-slate-500">Review eligibility criteria and apply before deadline</p>
            </div>
            <span className="text-xs font-semibold text-slate-500">{drives.length} total drives</span>
          </div>

          <div className="space-y-3.5">
            {drives.map((drive) => {
              const comp = companies.find((c) => c.id === drive.companyId);
              const { eligible, reason } = checkEligibility(drive);
              const alreadyApplied = myApplications.some((a) => a.placementDriveId === drive.id);

              return (
                <div
                  key={drive.id}
                  className={`bg-white rounded-2xl border p-5 transition-all shadow-xs ${
                    alreadyApplied
                      ? 'border-blue-200 bg-blue-50/20'
                      : eligible
                      ? 'border-slate-200 hover:border-blue-300'
                      : 'border-slate-200 opacity-80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-blue-600 uppercase">{comp?.companyName}</span>
                      <h4 className="text-base font-bold text-slate-900 mt-0.5">{drive.jobRole}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-1">{drive.jobDescription}</p>
                    </div>
                    <div className="text-right sm:flex-shrink-0">
                      <span className="text-base font-extrabold text-blue-700 block">{drive.salaryPackage} LPA</span>
                      <span className="text-[11px] text-slate-500">{drive.location}</span>
                    </div>
                  </div>

                  {/* Requirements bar */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs gap-2">
                    <div className="space-x-3 text-slate-600">
                      <span>Cutoff: <strong>{drive.eligibilityCgpa} CGPA</strong></span>
                      <span>Max Backlogs: <strong>{drive.maximumBacklogs}</strong></span>
                      <span>Deadline: <strong className="text-rose-600">{drive.applicationDeadline}</strong></span>
                    </div>

                    <div>
                      {alreadyApplied ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-xl">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Applied
                        </span>
                      ) : drive.status !== 'OPEN' ? (
                        <span className="text-xs text-slate-400 font-medium px-3 py-1.5 bg-slate-100 rounded-xl">
                          Drive {drive.status}
                        </span>
                      ) : eligible ? (
                        <button
                          type="button"
                          onClick={() => handleApply(drive.id)}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
                        >
                          <Send className="w-3.5 h-3.5" /> Apply Now
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                          <XCircle className="w-3.5 h-3.5 text-slate-400" /> Ineligible
                        </span>
                      )}
                    </div>
                  </div>

                  {!eligible && (
                    <div className="mt-2 text-[11px] text-rose-600 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {reason}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* My Applications Column */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">My Application History</h3>
            <p className="text-xs text-slate-500">Live progress tracking</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            {myApplications.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                No applications submitted yet. Click &quot;Apply Now&quot; on any eligible drive.
              </div>
            ) : (
              myApplications.map((app) => {
                const drive = drives.find((d) => d.id === app.placementDriveId);
                const comp = drive ? companies.find((c) => c.id === drive.companyId) : null;

                return (
                  <div key={app.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-blue-600">{comp?.companyName}</span>
                        <h5 className="font-bold text-slate-900 text-xs">{drive?.jobRole}</h5>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          app.status === 'SELECTED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'SHORTLISTED'
                            ? 'bg-amber-100 text-amber-800'
                            : app.status === 'REJECTED'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 flex justify-between">
                      <span>Applied: {app.applicationDate}</span>
                      <span>{drive?.salaryPackage} LPA</span>
                    </div>

                    {app.remarks && (
                      <p className="text-[11px] text-slate-600 italic bg-white p-1.5 rounded border border-slate-100">
                        &quot;{app.remarks}&quot;
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
