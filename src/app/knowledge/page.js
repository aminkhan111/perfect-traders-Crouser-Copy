import StockMarketKnowledge from "@/components/StockMarketKnowledge";

export const metadata = {
  title: "Stock Market Knowledge - PerfectTraders",
  description: "Explore our comprehensive stock market knowledge resources, including technical analysis, fundamental analysis, market news interpretation, and more.",
};

export default function KnowledgePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Stock Market Knowledge</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Empowering investors with essential knowledge and skills for successful trading
          </p>
        </div>
      </div>

      <StockMarketKnowledge />
    </main>
  );
} 