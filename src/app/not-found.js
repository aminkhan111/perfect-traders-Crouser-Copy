import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found - PerfectTraders',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center p-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
      >
        Return to Home
      </Link>
    </main>
  );
} 