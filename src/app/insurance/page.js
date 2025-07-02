import InsuranceHero from "@/components/InsuranceHero";
import InsuranceProducts from "@/components/InsuranceProducts";
import InsuranceFeatures from "@/components/InsuranceFeatures";
import InsurancePartners from "@/components/InsurancePartners";
import InsuranceCTA from "@/components/InsuranceCTA";

export const metadata = {
  title: "Insurance Services - PerfectTraders",
  description: "Explore our comprehensive insurance solutions - life, health, vehicle, home, and more. Get expert guidance and competitive premiums with PerfectTraders.",
};

export default function InsurancePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <InsuranceHero />
      <InsuranceProducts />
      <InsuranceFeatures />
      <InsurancePartners />
      <InsuranceCTA />
    </main>
  );
}