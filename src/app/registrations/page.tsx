import RegistrationList from "@/components/RegistrationList";

export default function RegistrationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          All Registrations
        </h1>
        <p className="mt-2 text-gray-600">
          View and manage all student course registrations.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <RegistrationList />
      </div>
    </div>
  );
}
