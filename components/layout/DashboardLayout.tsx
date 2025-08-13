import { useState } from 'react';
import { Topbar } from './Topbar';
import { Sidebar } from './DynamicSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  currentSection?: 'dashboard' | 'docs' | 'api-reference';
  onSectionChange?: (section: 'dashboard' | 'docs' | 'api-reference') => void;
  currentUser?: {
    name: string;
    avatar?: string;
  };
}

export function DashboardLayout({ children, currentPage, currentSection, onSectionChange, currentUser }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <Topbar 
        onMenuClick={toggleSidebar}
        currentSection={currentSection || 'dashboard'}
        onSectionChange={onSectionChange || (() => {})}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          currentPage={currentPage}
          currentSection={currentSection || 'dashboard'}
          onSectionChange={onSectionChange || (() => {})}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="h-[calc(100vh-4rem)] overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
