import { useState } from 'react';
import { Topbar } from './Topbar';
import { Sidebar } from './DynamicSidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  currentSection?: 'dashboard' | 'docs' | 'api-reference';
  onSectionChange?: (section: 'dashboard' | 'docs' | 'api-reference') => void;
  onDocChange?: (docPath: string) => void;
}

export function MainLayout({ 
  children, 
  currentPage, 
  currentSection = 'dashboard', 
  onSectionChange,
  onDocChange 
}: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSectionChange = (section: 'dashboard' | 'docs' | 'api-reference') => {
    if (onSectionChange) {
      onSectionChange(section);
    }
    // URL'yi güncelle
    const basePaths = {
      dashboard: '/dashboard',
      docs: '/docs',
      'api-reference': '/api-reference'
    };
    
    window.history.pushState({}, '', basePaths[section]);
  };

  const handleDocNavigation = (href: string) => {
    // Eğer docs bölümünde bir link tıklanırsa
    if (href.startsWith('/docs/') && onDocChange) {
      onDocChange(href);
      setSidebarOpen(false); // Mobile'da sidebar'ı kapat
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <Topbar
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
      />

      {/* Content Area with proper top padding */}
      <div className="pt-16 flex">
        {/* Dynamic Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentPage={currentPage}
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
          onDocChange={handleDocNavigation}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 transition-all duration-300 ease-in-out">
          <div className="min-h-[calc(100vh-4rem)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
