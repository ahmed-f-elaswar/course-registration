"use client";

import { useState } from "react";

const DEPARTMENTS = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Business Administration",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English Literature",
];

const COURSES = [
  { id: "cs101", name: "Introduction to Programming" },
  { id: "cs201", name: "Data Structures & Algorithms" },
  { id: "cs301", name: "Database Systems" },
  { id: "cs401", name: "Software Engineering" },
  { id: "math101", name: "Calculus I" },
  { id: "math201", name: "Linear Algebra" },
  { id: "phy101", name: "Physics I" },
  { id: "eng101", name: "Academic Writing" },
];

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  studentId: string;
  gender: string;
  yearOfStudy: string;
  department: string;
  courses: string[];
  schedulePreference: string;
  additionalNotes: string;
  agreedToTerms: boolean;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  studentId: "",
  gender: "",
  yearOfStudy: "",
  department: "",
  courses: [],
  schedulePreference: "",
  additionalNotes: "",
  agreedToTerms: false,
};

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && name === "agreedToTerms") {
      setFormData((prev) => ({
        ...prev,
        agreedToTerms: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCourseChange = (courseId: string) => {
    setFormData((prev) => ({
      ...prev,
      courses: prev.courses.includes(courseId)
        ? prev.courses.filter((c) => c !== courseId)
        : [...prev.courses, courseId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error });
      } else {
        setMessage({
          type: "success",
          text: "Registration submitted successfully!",
        });
        setFormData(initialFormData);
      }
    } catch {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {message && (
        <div
          className={`p-4 rounded-lg text-sm font-medium ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Personal Information */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 w-full">
          Personal Information
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@university.edu"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+1 (555) 000-0000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="studentId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Student ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
              placeholder="STU-2025-001"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
            />
          </div>
        </div>

        {/* Gender - Radio Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-6">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                  required
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{g}</span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      {/* Academic Information */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 w-full">
          Academic Information
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Department - Dropdown */}
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Department <span className="text-red-500">*</span>
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Year - Dropdown */}
          <div>
            <label
              htmlFor="yearOfStudy"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Year of Study <span className="text-red-500">*</span>
            </label>
            <select
              id="yearOfStudy"
              name="yearOfStudy"
              value={formData.yearOfStudy}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
            >
              <option value="">Select Year</option>
              {YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Courses - Checkboxes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Courses <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {COURSES.map((course) => (
              <label
                key={course.id}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                  formData.courses.includes(course.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.courses.includes(course.id)}
                  onChange={() => handleCourseChange(course.id)}
                  className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">
                    {course.name}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({course.id.toUpperCase()})
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      {/* Preferences */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 w-full">
          Preferences
        </legend>

        {/* Schedule Preference - Radio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Schedule Preference <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-4">
            {["Morning", "Afternoon", "Evening"].map((pref) => (
              <label
                key={pref}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition ${
                  formData.schedulePreference === pref
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name="schedulePreference"
                  value={pref}
                  checked={formData.schedulePreference === pref}
                  onChange={handleChange}
                  required
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm font-medium">{pref}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Notes - Textarea */}
        <div>
          <label
            htmlFor="additionalNotes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Additional Notes
          </label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            rows={3}
            placeholder="Any special requirements or comments..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-none"
          />
        </div>

        {/* Terms Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            required
            className="w-4 h-4 mt-0.5 rounded text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            I agree to the{" "}
            <span className="text-blue-600 font-medium">
              terms and conditions
            </span>{" "}
            and confirm that the information provided is accurate.{" "}
            <span className="text-red-500">*</span>
          </span>
        </label>
      </fieldset>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
      >
        {submitting ? "Submitting..." : "Submit Registration"}
      </button>
    </form>
  );
}
