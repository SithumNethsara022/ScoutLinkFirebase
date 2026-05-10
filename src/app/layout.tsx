import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'ScoutLink - Golden Troop Management',
  description: 'Complete scouting management system for awards, badges, and attendance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 md:pl-64 transition-all duration-200">
            <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}