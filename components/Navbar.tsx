"use client";

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../public/logo.png';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    const menuItems = [
    { label: "Home", href: "/", isRoute: true },
    { label: "APIs", href: "/apis", isRoute: true },
    { label: "Synapse", href: "/synapse", isRoute: true },
    { label: "Docs", href: "/docs", isRoute: true },
    { label: "Chat", href: "/chat", isRoute: true },
    { label: "About", href: "/about", isRoute: true },
    { label: "Pricing", href: "#pricing", isRoute: false },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-lg border-b border-border' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src={logoImg} 
              alt="Hashub Logo" 
              className="h-8 w-8"
            />
            <span className="text-xl font-extrabold">
              <span className="text-primary">Has</span>
              <span className="text-foreground">hub</span>
              <span className="text-muted-foreground">.dev</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              item.isRoute ? (
                <button
                  key={item.label}
                  onClick={() => navigate(item.href)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.label}
                </button>
              ) : (
                <a 
                  key={item.label}
                  href={item.href} 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.label}
                </a>
              )
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Let's Discuss Your Project
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                item.isRoute ? (
                  <button
                    key={item.label}
                    onClick={() => {
                      navigate(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              ))}
              <div className="px-3 py-2">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Let's Discuss Your Project
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}