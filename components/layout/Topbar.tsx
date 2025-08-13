import { useState } from 'react';
import { 
  Menu, 
  Search, 
  User, 
  Settings, 
  LogOut,
  ChevronDown,
  Bell,
  HelpCircle
} from 'lucide-react';

interface TopbarProps {
  onMenuClick: () => void;
  currentSection: 'dashboard' | 'docs' | 'api-reference';
  onSectionChange: (section: 'dashboard' | 'docs' | 'api-reference') => void;
}

export function Topbar({ onMenuClick, currentSection, onSectionChange }: TopbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    { id: 'docs', label: 'Guides', href: '/docs' },
    { id: 'api-reference', label: 'API Reference', href: '/api-reference' },
    { id: 'pricing', label: 'Pricing', href: '/pricing' }
  ];

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setSearchOpen(true);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
      <div className="h-full px-4 lg:px-6">
        <div className="flex items-center justify-between h-full">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                HashHub
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-1 ml-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'dashboard' || item.id === 'docs' || item.id === 'api-reference') {
                      onSectionChange(item.id as 'dashboard' | 'docs' | 'api-reference');
                    } else {
                      window.location.href = item.href;
                    }
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentSection === item.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation... (Ctrl+K)"
                onKeyDown={handleSearchKeyDown}
                onClick={() => setSearchOpen(true)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">⌘K</span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Mobile Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100 md:hidden"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            {/* Notifications */}
            <button className="p-2 rounded-md hover:bg-gray-100 relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Help */}
            <button className="p-2 rounded-md hover:bg-gray-100">
              <HelpCircle className="w-5 h-5 text-gray-600" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600 hidden sm:block" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">John Doe</p>
                    <p className="text-xs text-gray-500">john@company.com</p>
                  </div>
                  <div className="py-2">
                    <a
                      href="/settings"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </a>
                    <a
                      href="/logout"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation, guides, and API reference..."
                  autoFocus
                  className="w-full pl-12 pr-4 py-3 text-lg border-none outline-none"
                />
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Quick Links
                </div>
                <a href="/docs/quickstart" className="block p-2 hover:bg-gray-50 rounded">
                  <div className="font-medium text-gray-900">Quickstart Guide</div>
                  <div className="text-sm text-gray-500">Get started in 15 minutes</div>
                </a>
                <a href="/api-reference/doc/chat-ocr" className="block p-2 hover:bg-gray-50 rounded">
                  <div className="font-medium text-gray-900">Chat OCR API</div>
                  <div className="text-sm text-gray-500">AI-powered document analysis</div>
                </a>
                <a href="/dashboard/playground/search-lab" className="block p-2 hover:bg-gray-50 rounded">
                  <div className="font-medium text-gray-900">Search Lab</div>
                  <div className="text-sm text-gray-500">Test vector search with your data</div>
                </a>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Press <kbd className="bg-gray-200 px-2 py-1 rounded">Esc</kbd> to close</span>
                <span>Press <kbd className="bg-gray-200 px-2 py-1 rounded">Enter</kbd> to search</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Close search modal when clicking outside or pressing Esc */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setSearchOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setSearchOpen(false);
            }
          }}
        />
      )}

      {/* Close profile dropdown when clicking outside */}
      {profileOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setProfileOpen(false)}
        />
      )}
    </header>
  );
}
