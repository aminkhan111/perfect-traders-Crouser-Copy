import MutualFund from "@/components/MutualFund";

export const metadata = {
  title: "Mutual Fund Investment - PerfectTraders",
  description: "Start investing in Mutual Funds with expert guidance. Explore equity, debt and hybrid funds tailored to your financial goals and risk profile.",
};

export default function MutualFundPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mutual Fund Investment</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Expert guidance on mutual fund investments tailored to your financial goals
          </p>
        </div>
      </div>

      <MutualFund />
    </main>
  );
} 