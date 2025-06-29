import OurPartners from "@/components/OurPartners";
import VariousInsurance from "@/components/VariousInsurance";

export const metadata = {
  title: "Insurance Services - PerfectTraders",
  description: "Explore our comprehensive insurance solutions - life, health, vehicle, home, and more. Get expert guidance and competitive premiums with PerfectTraders.",
};

export default function InsurancePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Insurance Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive insurance solutions for every need, at competitive premiums
          </p>
        </div>
      </div>

      <VariousInsurance />

      <OurPartners />
    </main>
  );
} 