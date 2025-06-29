import GSTTaxation from "@/components/GSTTaxation";

export const metadata = {
  title: "GST & Taxation Services - PerfectTraders",
  description: "Professional GST and taxation services including tax filing, planning, compliance, and business registrations. Get expert assistance for all your tax needs.",
};

export default function GSTTaxationPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">GST & Taxation Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Professional tax solutions to optimize your finances and ensure compliance
          </p>
        </div>
      </div>

      <GSTTaxation />
    </main>
  );
} 