import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { SidebarProvider } from '@/src/context/SidebarContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OJT Monitor System',
  description: 'Manage and track On-the-Job Training progress securely.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen bg-gray-50 text-gray-900 dark:bg-[#0a0a0a] dark:text-white`}>
        <Providers>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}