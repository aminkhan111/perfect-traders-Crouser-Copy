import FreeDematAccount from "@/components/FreeDematAccount";

export const metadata = {
  title: "Free Demat Account - PerfectTraders",
  description: "Open a free Demat account with PerfectTraders. Experience secure electronic trading with zero opening costs, enhanced security, and real-time portfolio tracking.",
};

export default function FreeDematPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Demat Account</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Start your investment journey with zero account opening charges
          </p>
        </div>
      </div>

      <FreeDematAccount />
    </main>
  );
} 