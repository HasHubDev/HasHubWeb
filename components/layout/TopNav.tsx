import { useState } from 'react';
import { 
  Search, 
  Settings, 
  User, 
  LogOut,
  Menu,
  X,
  Hash
} from 'lucide-react';

interface TopNavProps {
  onToggleSidebar?: () => void;
  currentUser?: {
    name: string;
    avatar?: string;
  };
}

export function TopNav({ onToggleSidebar, currentUser }: TopNavProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search:', searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ctrl+K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.getElementById('search-input');
      searchInput?.focus();
    }
  };

  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center px-4 sticky top-0 z-50">
      {/* Left Section - Logo & Mobile Menu */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Hash className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">HashHub</span>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-2xl mx-8">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="search-input"
              type="text"
              placeholder="Search documentation... (Ctrl+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
            />
          </div>
        </form>
      </div>

      {/* Right Section - Navigation & User */}
      <div className="flex items-center gap-6">
        {/* Main Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="/dashboard"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Dashboard
          </a>
          <a
            href="/docs/guides"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Guides
          </a>
          <a
            href="/docs/api-reference"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            API Reference
          </a>
          <a
            href="/pricing"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Pricing
          </a>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
            </div>
          </button>

          {/* User Dropdown */}
          {isUserMenuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsUserMenuOpen(false)}
              />
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {currentUser?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">Free Plan</p>
                </div>
                
                <a
                  href="/settings"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </a>
                
                <button
                  onClick={() => {
                    // TODO: Implement logout
                    console.log('Logout');
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
