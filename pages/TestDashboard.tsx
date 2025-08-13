import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { DocsPage } from '../pages/DocsPage';

export function TestDashboard() {
  const [currentSection, setCurrentSection] = useState<'dashboard' | 'docs' | 'api-reference'>('docs');
  const [currentDoc, setCurrentDoc] = useState('/docs/quickstart');

  const handleSectionChange = (section: 'dashboard' | 'docs' | 'api-reference') => {
    setCurrentSection(section);
    
    // Set default docs when switching to docs section
    if (section === 'docs' && currentDoc.startsWith('/api-reference/')) {
      setCurrentDoc('/docs/quickstart');
    }
  };

  const handleDocChange = (docPath: string) => {
    setCurrentDoc(docPath);
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'docs':
        return <DocsPage currentDoc={currentDoc} />;
      case 'api-reference':
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">API Reference</h1>
            <p className="text-gray-600">API Reference content will be here...</p>
          </div>
        );
      default:
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="text-gray-600">Dashboard content will be here...</p>
          </div>
        );
    }
  };

  return (
    <MainLayout
      currentSection={currentSection}
      onSectionChange={handleSectionChange}
      onDocChange={handleDocChange}
      currentPage={currentDoc}
    >
      {renderContent()}
    </MainLayout>
  );
}
