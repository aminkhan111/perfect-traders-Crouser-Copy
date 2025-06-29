import './globals.css';
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import NavigationLoading from "@/components/NavigationLoading";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: 'Perfect Traders - Stock Watchlist',
  description: 'Track your favorite stocks and stay updated with the latest market trends.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <NavigationBar />
        <NavigationLoading />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
