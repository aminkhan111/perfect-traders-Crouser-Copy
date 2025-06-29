import ResearchReport from "@/components/ResearchReport";

export const metadata = {
  title: "Stock Market Research Reports - PerfectTraders",
  description: "Access expert stock market research reports to make informed investment decisions. Get analysis on market trends, sectors, and stocks from PerfectTraders.",
};

export default function ResearchReportPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Stock Market Research Reports</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive analysis and insights to guide your investment decisions
          </p>
        </div>
      </div>

      <ResearchReport />
    </main>
  );
} 