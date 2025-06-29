import IPOConsult from "@/components/IPOConsult";

export const metadata = {
  title: "IPO Consultation Services - PerfectTraders",
  description: "Expert guidance for investing in Initial Public Offerings (IPOs). Get personalized IPO investment strategies, application assistance, and performance analysis from PerfectTraders.",
};

export default function IPOConsultPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">IPO Consultation Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Strategic guidance to help you invest in high-potential Initial Public Offerings
          </p>
        </div>
      </div>

      <IPOConsult />
    </main>
  );
} 