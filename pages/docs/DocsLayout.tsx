"use client";

import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import logoImg from '../../public/logo.png';
import { 
  LayoutGrid, 
  FlaskConical, 
  KeyRound, 
  BarChart3, 
  BookOpen, 
  Code2, 
  Settings, 
  LogOut,
  Moon,
  Sun,
  ChevronDown,
  ChevronRight
} from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon: any;
  group?: string;
}

export function DocsLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isDocsExpanded, setIsDocsExpanded] = useState(true);

  const navItems: NavItem[] = [
    { label: "Dashboard", path: "/docs/dashboard", icon: LayoutGrid },
    { label: "Playground", path: "/docs/playground", icon: FlaskConical },
    { label: "API Keys", path: "/docs/api-keys", icon: KeyRound },
    { label: "Usage", path: "/docs/usage", icon: BarChart3 },
    { label: "Guides", path: "/docs/guides", icon: BookOpen, group: "docs" },
    { label: "API Reference", path: "/docs/api-reference", icon: Code2, group: "docs" },
  ];

  const mainNavItems = navItems.filter(item => !item.group);
  const docsNavItems = navItems.filter(item => item.group === "docs");

  const isActive = (path: string) => {
    if (path === "/docs/dashboard" && location.pathname === "/docs") return true;
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-background text-foreground ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <div className="w-60 bg-[#1A1A1A] border-r border-border flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-border/20">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <img src={logoImg} alt="Hashub" className="w-8 h-8" />
              <span className="text-xl font-bold text-white">Hashub.dev</span>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 p-4 space-y-2">
            {mainNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}

            {/* Documentation Group */}
            <div className="pt-4">
              <button
                onClick={() => setIsDocsExpanded(!isDocsExpanded)}
                className="w-full flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white transition-colors"
              >
                {isDocsExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <span className="text-sm font-semibold uppercase tracking-wider">Documentation</span>
              </button>
              
              {isDocsExpanded && (
                <div className="mt-2 space-y-1">
                  {docsNavItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ml-2 ${
                        isActive(item.path)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="p-4 border-t border-border/20 space-y-3">
            {/* User Info */}
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-foreground">H</span>
              </div>
              <div>
                <div className="text-sm font-medium text-white">Hasan</div>
                <div className="text-xs text-gray-400">hasan@hashub.dev</div>
              </div>
            </div>

            {/* Settings & Theme */}
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings & Billing</span>
              </button>
              
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span className="font-medium">Theme</span>
              </button>
              
              <button 
                onClick={() => navigate('/')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Back to Site</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
