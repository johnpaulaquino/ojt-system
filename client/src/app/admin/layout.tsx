import Sidebar from '@/src/components/layout/Sidebar';
import Header from '@/src/components/layout/Header';
import { SidebarProvider } from '@/src/context/SidebarContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
        
        <Sidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          
          <Header />
          
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
          
        </div>
      </div>
    </SidebarProvider>
  );
}