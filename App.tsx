import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './components/AboutPage';
import { ChatPage } from './components/ChatPage';
import { SynapsePage } from './pages/SynapsePage';
import { ApiProductsPage } from './pages/ApiProductsPage';
import { DocsLayout } from './pages/docs/DocsLayout';
import { Dashboard } from './pages/docs/Dashboard';
import { Playground } from './pages/docs/Playground';
import { ApiKeys } from './pages/docs/ApiKeys';
import { Usage } from './pages/docs/Usage';
import { ApiReference } from './pages/docs/ApiReference';
import { Guides } from './pages/docs/Guides';

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
        
        {/* Docs/App pages */}
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="playground" element={<Playground />} />
          <Route path="api-keys" element={<ApiKeys />} />
          <Route path="usage" element={<Usage />} />
          <Route path="api-reference" element={<ApiReference />} />
          <Route path="guides" element={<Guides />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;