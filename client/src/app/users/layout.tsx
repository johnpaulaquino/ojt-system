import UserSidebar from '@/src/components/layout/UserSidebar';
import { SidebarProvider } from '@/src/context/SidebarContext';
import Header from '@/src/components/layout/Header';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#0a0a0a]">
        
        <UserSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          
          <Header />

          <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
            {children}
          </main>
          
        </div>
      </div>
    </SidebarProvider>
  );
}