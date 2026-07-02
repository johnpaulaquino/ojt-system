import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextThemesProvider } from '@/src/context/ThemeProvider';
import { SidebarProvider } from '@/src/context/SidebarContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OJT Monitoring System',
  description: 'Manage and track On-the-Job Training progress securely.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <body className={`${inter.className} antialiased min-h-screen`}>
        <NextThemesProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}