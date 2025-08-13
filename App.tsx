import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './components/AboutPage';
import { ChatPage } from './components/ChatPage';
import { SynapsePage } from './pages/SynapsePage';
import { ApiProductsPage } from './pages/ApiProductsPage';
import { TestDashboard } from './pages/TestDashboard';
import { ApiReferencePage } from './pages/ApiReferencePage';
// Legacy docs imports for fallback routes
import { DocsLayout } from './pages/docs/DocsLayout';
import { Dashboard } from './pages/docs/Dashboard';
import { Playground } from './pages/docs/Playground';
import { ApiKeys } from './pages/docs/ApiKeys';
import { Usage } from './pages/docs/Usage';

function App() {
  return (
    <BrowserRouter basename="/HasHubWeb">
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/synapse" element={<SynapsePage />} />
        <Route path="/apis" element={<ApiProductsPage />} />
        
        {/* New unified dashboard with all sections */}
        <Route path="/dashboard" element={<TestDashboard />} />
        <Route path="/docs" element={<TestDashboard />} />
        <Route path="/api-reference" element={<TestDashboard />} />
        
        {/* Legacy docs pages for backward compatibility */}
        <Route path="/app" element={<DocsLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="playground" element={<Playground />} />
          <Route path="api-keys" element={<ApiKeys />} />
          <Route path="usage" element={<Usage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;