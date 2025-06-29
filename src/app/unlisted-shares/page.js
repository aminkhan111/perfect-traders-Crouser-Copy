import UnlistedShares from "@/components/UnlistedShares";

export const metadata = {
  title: "Unlisted Shares Investment - PerfectTraders",
  description: "Explore investment opportunities in unlisted shares. Get expert guidance on pre-IPO investments and portfolio diversification with PerfectTraders.",
};

export default function UnlistedSharesPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Unlisted Shares Investment</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover exclusive investment opportunities in pre-IPO companies
          </p>
        </div>
      </div>

      <UnlistedShares />
    </main>
  );
} 