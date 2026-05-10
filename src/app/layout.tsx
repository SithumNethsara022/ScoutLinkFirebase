
'use client';

import { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { initializeFirebase, FirebaseClientProvider, useUser } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const { firebaseApp, firestore, auth } = initializeFirebase();

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user && pathname !== '/login') {
        router.push('/login');
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user && pathname !== '/login') {
    return null;
  }

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const isOnboardingPage = pathname === '/onboarding';

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <title>ScoutLink - Golden Troop Management</title>
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden">
        <FirebaseClientProvider firebaseApp={firebaseApp} firestore={firestore} auth={auth}>
          <AuthGuard>
            <div className="flex min-h-screen">
              {!isLoginPage && !isOnboardingPage && <Sidebar />}
              <main className={cn(
                "flex-1 transition-all duration-200",
                !isLoginPage && !isOnboardingPage && "md:pl-64"
              )}>
                <div className={cn(
                  "p-4 md:p-8 max-w-7xl mx-auto w-full",
                  (isLoginPage || isOnboardingPage) && "p-0 md:p-0 max-w-full"
                )}>
                  {children}
                </div>
              </main>
            </div>
          </AuthGuard>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}

import { cn } from '@/lib/utils';
