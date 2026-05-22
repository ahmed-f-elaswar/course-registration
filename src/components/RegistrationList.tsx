"use client";

import { useEffect, useState, useCallback } from "react";

interface Registration {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  student_id: string;
  gender: string;
  year_of_study: string;
  department: string;
  courses: string[];
  schedule_preference: string;
  additional_notes: string;
  agreed_to_terms: number;
  created_at: string;
}

export default function RegistrationList() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = useCallback(async () => {
    try {
      const res = await fetch("/api/registrations");
      const data = await res.json();
      setRegistrations(data);
    } catch {
      console.error("Failed to fetch registrations");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this registration?")) return;

    try {
      const res = await fetch(`/api/registrations/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setRegistrations((prev) => prev.filter((r) => r.id !== id));
      }
    } catch {
      console.error("Failed to delete registration");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (registrations.length === 0) {
    return (
      <div className="text-center py-20">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          No registrations yet
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Registrations will appear here once students submit the form.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Total registrations: {registrations.length}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Courses</th>
              <th className="px-4 py-3">Schedule</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {registrations.map((reg, idx) => (
              <tr
                key={reg.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">
                    {reg.full_name}
                  </div>
                  <div className="text-xs text-gray-500">{reg.email}</div>
                  <div className="text-xs text-gray-400">
                    ID: {reg.student_id}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">{reg.department}</td>
                <td className="px-4 py-3 text-gray-700">
                  {reg.year_of_study}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {reg.courses.map((c) => (
                      <span
                        key={c}
                        className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full"
                      >
                        {c.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {reg.schedule_preference}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {new Date(reg.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(reg.id)}
                    className="text-red-600 hover:text-red-800 text-xs font-medium cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
