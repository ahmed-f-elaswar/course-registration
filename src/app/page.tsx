import RegistrationForm from "@/components/RegistrationForm";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Student Course Registration
        </h1>
        <p className="mt-2 text-gray-600">
          Fill out the form below to register for your courses this semester.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <RegistrationForm />
      </div>
    </div>
  );
}
